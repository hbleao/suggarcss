import { renderHook, act } from '@testing-library/react';
import { useOutsideClick } from '../useOutsideClick';
import { useRef } from 'react';

// Mock para o useRef
const mockUseRef = () => {
  const ref = {
    current: document.createElement('div')
  };
  return ref;
};

describe('useOutsideClick', () => {
  beforeEach(() => {
    // Configurar o DOM para os testes
    document.body.innerHTML = `
      <div id="container">
        <div id="element"></div>
        <div id="outside"></div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('deve chamar o callback quando clicar fora do elemento', () => {
    const mockCallback = jest.fn();
    const element = document.getElementById('element');
    const outside = document.getElementById('outside');
    
    const { result } = renderHook(() => {
      const ref = useRef(element);
      useOutsideClick(mockCallback, ref.current);
      return ref;
    });

    // Simular um clique fora do elemento
    act(() => {
      const mouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      outside?.dispatchEvent(mouseEvent);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o callback quando clicar dentro do elemento', () => {
    const mockCallback = jest.fn();
    const element = document.getElementById('element');
    
    const { result } = renderHook(() => {
      const ref = useRef(element);
      useOutsideClick(mockCallback, ref.current);
      return ref;
    });

    // Simular um clique dentro do elemento
    act(() => {
      const mouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      element?.dispatchEvent(mouseEvent);
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('deve remover o event listener ao desmontar', () => {
    const mockCallback = jest.fn();
    const element = document.getElementById('element');
    
    // Espionar o addEventListener e removeEventListener
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => {
      const ref = useRef(element);
      useOutsideClick(mockCallback, ref.current);
      return ref;
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    
    // Desmontar o hook
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});
