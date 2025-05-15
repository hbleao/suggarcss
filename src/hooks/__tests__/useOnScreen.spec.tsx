import { renderHook } from '@testing-library/react';
import { useOnScreen } from '../useOnScreen';
import { useRef } from 'react';

describe('useOnScreen', () => {
  // Mock para IntersectionObserver
  const mockIntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }
    
    callback: IntersectionObserverCallback;
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    
    // Método para simular uma interseção
    simulateIntersection(isIntersecting: boolean) {
      this.callback([{
        isIntersecting,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: {} as Element,
        time: Date.now()
      }], this as unknown as IntersectionObserver);
    }
  };
  
  beforeEach(() => {
    // Configurar o mock do IntersectionObserver antes de cada teste
    global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('deve inicializar com isIntersecting como false', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      const isVisible = useOnScreen(ref);
      return { ref, isVisible };
    });
    
    expect(result.current.isVisible).toBe(false);
  });

  it('deve atualizar isIntersecting quando o elemento entra na viewport', () => {
    let observer: any;
    
    // Spy no construtor do IntersectionObserver para capturar a instância
    const constructorSpy = jest.spyOn(global, 'IntersectionObserver').mockImplementation(
      (callback, options) => {
        observer = new mockIntersectionObserver(callback);
        return observer;
      }
    );
    
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement('div'));
      const isVisible = useOnScreen(ref);
      return { ref, isVisible };
    });
    
    // Verificar estado inicial
    expect(result.current.isVisible).toBe(false);
    
    // Verificar se observe foi chamado com o elemento
    expect(observer.observe).toHaveBeenCalledWith(result.current.ref.current);
    
    // Simular o elemento entrando na viewport
    observer.simulateIntersection(true);
    
    // Verificar se o estado foi atualizado
    expect(result.current.isVisible).toBe(true);
    
    // Simular o elemento saindo da viewport
    observer.simulateIntersection(false);
    
    // Verificar se o estado foi atualizado
    expect(result.current.isVisible).toBe(false);
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });

  it('deve aceitar opções personalizadas', () => {
    const options = {
      rootMargin: '10px',
      threshold: 0.5,
      root: document.createElement('div')
    };
    
    // Spy no construtor do IntersectionObserver para verificar as opções
    const constructorSpy = jest.spyOn(global, 'IntersectionObserver');
    
    renderHook(() => {
      const ref = useRef(document.createElement('div'));
      const isVisible = useOnScreen(ref, options);
      return { ref, isVisible };
    });
    
    // Verificar se o IntersectionObserver foi criado com as opções corretas
    expect(constructorSpy).toHaveBeenCalledWith(expect.any(Function), options);
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });

  it('deve limpar o observer quando o componente é desmontado', () => {
    let observer: any;
    
    // Spy no construtor do IntersectionObserver para capturar a instância
    const constructorSpy = jest.spyOn(global, 'IntersectionObserver').mockImplementation(
      (callback, options) => {
        observer = new mockIntersectionObserver(callback);
        return observer;
      }
    );
    
    const { unmount } = renderHook(() => {
      const ref = useRef(document.createElement('div'));
      const isVisible = useOnScreen(ref);
      return { ref, isVisible };
    });
    
    // Verificar se observe foi chamado
    expect(observer.observe).toHaveBeenCalled();
    
    // Desmontar o hook
    unmount();
    
    // Verificar se unobserve e disconnect foram chamados
    expect(observer.unobserve).toHaveBeenCalled();
    expect(observer.disconnect).toHaveBeenCalled();
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });

  it('não deve observar se o elemento de referência for null', () => {
    let observer: any;
    
    // Spy no construtor do IntersectionObserver para capturar a instância
    const constructorSpy = jest.spyOn(global, 'IntersectionObserver').mockImplementation(
      (callback, options) => {
        observer = new mockIntersectionObserver(callback);
        return observer;
      }
    );
    
    renderHook(() => {
      const ref = useRef(null);
      const isVisible = useOnScreen(ref);
      return { ref, isVisible };
    });
    
    // Verificar que observe não foi chamado
    expect(observer.observe).not.toHaveBeenCalled();
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });
});
