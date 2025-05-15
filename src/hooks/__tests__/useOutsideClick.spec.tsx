import { renderHook, act } from '@testing-library/react';
import { useOutsideClick } from '../useOutsideClick';

describe('useOutsideClick', () => {
  let container: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    // Configurar os elementos para os testes
    container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    
    outsideElement = document.createElement('div');
    outsideElement.setAttribute('data-testid', 'outside');
    
    // Adicionar os elementos ao body
    document.body.appendChild(container);
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    // Limpar os elementos após cada teste
    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('deve chamar o callback quando ocorre um clique fora do elemento', () => {
    const callback = jest.fn();
    
    const { result } = renderHook(() => useOutsideClick(callback));
    
    // Anexar a ref retornada ao elemento container
    Object.defineProperty(result.current, 'current', {
      value: container
    });
    
    // Simular um clique fora do elemento
    act(() => {
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    
    // Verificar se o callback foi chamado
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando ocorre um clique dentro do elemento', () => {
    const callback = jest.fn();
    
    const { result } = renderHook(() => useOutsideClick(callback));
    
    // Anexar a ref retornada ao elemento container
    Object.defineProperty(result.current, 'current', {
      value: container
    });
    
    // Simular um clique dentro do elemento
    act(() => {
      container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    
    // Verificar que o callback não foi chamado
    expect(callback).not.toHaveBeenCalled();
  });

  it('deve responder a eventos de toque', () => {
    const callback = jest.fn();
    
    const { result } = renderHook(() => useOutsideClick(callback));
    
    // Anexar a ref retornada ao elemento container
    Object.defineProperty(result.current, 'current', {
      value: container
    });
    
    // Simular um toque fora do elemento
    act(() => {
      outsideElement.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    });
    
    // Verificar se o callback foi chamado
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve remover os event listeners quando o componente é desmontado', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const callback = jest.fn();
    
    const { unmount } = renderHook(() => useOutsideClick(callback));
    
    // Desmontar o hook
    unmount();
    
    // Verificar se os event listeners foram removidos
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    
    // Restaurar o spy
    removeEventListenerSpy.mockRestore();
  });

  it('deve funcionar com a implementação alternativa useOutsideClickAlt', () => {
    // Importar a implementação alternativa
    const { useOutsideClickAlt } = require('../useOutsideClick');
    
    const callback = jest.fn();
    
    const { result } = renderHook(() => useOutsideClickAlt(callback));
    
    // Anexar a ref retornada ao elemento container
    Object.defineProperty(result.current, 'current', {
      value: container
    });
    
    // Simular um clique fora do elemento
    act(() => {
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    
    // Verificar se o callback foi chamado
    expect(callback).toHaveBeenCalledTimes(1);
    
    // Simular um clique dentro do elemento
    act(() => {
      container.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });
    
    // Verificar que o callback não foi chamado novamente
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
