import { renderHook } from '@testing-library/react';
import { useEventListener } from '../useEventListener';
import { useRef } from 'react';

describe('useEventListener', () => {
  it('deve adicionar um event listener ao document por padrão', () => {
    // Spy no método addEventListener do document
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const handler = jest.fn();
    
    const { unmount } = renderHook(() => useEventListener('click', handler));
    
    // Verificar se o event listener foi adicionado ao document
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    // Simular um clique no document
    document.dispatchEvent(new MouseEvent('click'));
    
    // Verificar se o handler foi chamado
    expect(handler).toHaveBeenCalledTimes(1);
    
    // Desmontar o hook
    unmount();
    
    // Verificar se o event listener foi removido
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    // Restaurar os spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('deve adicionar um event listener a um elemento específico', () => {
    // Criar um elemento para testar
    const element = document.createElement('div');
    const addEventListenerSpy = jest.spyOn(element, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(element, 'removeEventListener');
    
    const handler = jest.fn();
    
    // Usar o hook com uma ref para o elemento
    const { result, unmount } = renderHook(() => {
      const ref = useRef(element);
      useEventListener('click', handler, ref);
      return ref;
    });
    
    // Verificar se o event listener foi adicionado ao elemento
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    // Simular um clique no elemento
    result.current.current.dispatchEvent(new MouseEvent('click'));
    
    // Verificar se o handler foi chamado
    expect(handler).toHaveBeenCalledTimes(1);
    
    // Desmontar o hook
    unmount();
    
    // Verificar se o event listener foi removido
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    // Restaurar os spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('deve adicionar event listeners com opções', () => {
    const options = { capture: true, passive: true };
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    const handler = jest.fn();
    
    const { unmount } = renderHook(() => useEventListener('scroll', handler, null, options));
    
    // Verificar se o event listener foi adicionado com as opções corretas
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), options);
    
    // Desmontar o hook
    unmount();
    
    // Verificar se o event listener foi removido com as mesmas opções
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), options);
    
    // Restaurar os spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('deve lidar com diferentes tipos de eventos', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const handler = jest.fn();
    
    // Testar com evento de mouse
    const { unmount: unmount1 } = renderHook(() => useEventListener('mousedown', handler));
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), undefined);
    unmount1();
    
    // Testar com evento de teclado
    const { unmount: unmount2 } = renderHook(() => useEventListener('keypress', handler));
    expect(addEventListenerSpy).toHaveBeenCalledWith('keypress', expect.any(Function), undefined);
    unmount2();
    
    // Testar com evento de foco
    const { unmount: unmount3 } = renderHook(() => useEventListener('focus', handler));
    expect(addEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function), undefined);
    unmount3();
    
    // Testar com evento de toque
    const { unmount: unmount4 } = renderHook(() => useEventListener('touchstart', handler));
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), undefined);
    unmount4();
    
    // Restaurar o spy
    addEventListenerSpy.mockRestore();
  });

  it('não deve adicionar event listener se o elemento for null', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const handler = jest.fn();
    
    // Usar o hook com uma ref que é null
    const { unmount } = renderHook(() => {
      const ref = useRef(null);
      useEventListener('click', handler, ref);
      return ref;
    });
    
    // Verificar que addEventListener não foi chamado no document
    expect(addEventListenerSpy).not.toHaveBeenCalled();
    
    // Desmontar o hook
    unmount();
    
    // Restaurar o spy
    addEventListenerSpy.mockRestore();
  });
});
