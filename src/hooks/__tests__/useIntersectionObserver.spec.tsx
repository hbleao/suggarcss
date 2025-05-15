import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';
import { useRef } from 'react';

describe('useIntersectionObserver', () => {
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
    simulateIntersection(isIntersecting: boolean, entry?: Partial<IntersectionObserverEntry>) {
      const defaultEntry = {
        isIntersecting,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: isIntersecting ? 1 : 0,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: {} as Element,
        time: Date.now()
      };
      
      this.callback([{
        ...defaultEntry,
        ...entry
      }], this as unknown as IntersectionObserver);
    }
  };
  
  beforeEach(() => {
    // Configurar o mock do IntersectionObserver antes de cada teste
    global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useIntersectionObserver(ref);
    });
    
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeNull();
  });

  it('deve atualizar o estado quando o elemento entra na viewport', () => {
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
      return useIntersectionObserver(ref);
    });
    
    // Verificar estado inicial
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeNull();
    
    // Verificar se observe foi chamado com o elemento
    expect(observer.observe).toHaveBeenCalledWith(expect.any(Element));
    
    // Criar um mock para a entrada do IntersectionObserver
    const mockTarget = document.createElement('div');
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.8,
      target: mockTarget
    };
    
    // Simular o elemento entrando na viewport
    observer.simulateIntersection(true, mockEntry);
    
    // Verificar se o estado foi atualizado
    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toEqual(expect.objectContaining({
      isIntersecting: true,
      intersectionRatio: 0.8,
      target: mockTarget
    }));
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });

  it('deve aceitar opções personalizadas', () => {
    const options = {
      rootMargin: '20px',
      threshold: [0, 0.5, 1],
      root: document.createElement('div')
    };
    
    // Spy no construtor do IntersectionObserver para verificar as opções
    const constructorSpy = jest.spyOn(global, 'IntersectionObserver');
    
    renderHook(() => {
      const ref = useRef(document.createElement('div'));
      return useIntersectionObserver(ref, options);
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
      return useIntersectionObserver(ref);
    });
    
    // Verificar se observe foi chamado
    expect(observer.observe).toHaveBeenCalled();
    
    // Desmontar o hook
    unmount();
    
    // Verificar se disconnect foi chamado
    expect(observer.disconnect).toHaveBeenCalled();
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });

  it('deve lidar com diferentes valores de threshold', () => {
    // Testar com threshold único
    const thresholdSpy1 = jest.spyOn(global, 'IntersectionObserver');
    renderHook(() => {
      const ref = useRef(document.createElement('div'));
      return useIntersectionObserver(ref, { threshold: 0.5 });
    });
    expect(thresholdSpy1).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({
      threshold: 0.5
    }));
    thresholdSpy1.mockRestore();
    
    // Testar com array de thresholds
    const thresholdSpy2 = jest.spyOn(global, 'IntersectionObserver');
    renderHook(() => {
      const ref = useRef(document.createElement('div'));
      return useIntersectionObserver(ref, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    });
    expect(thresholdSpy2).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }));
    thresholdSpy2.mockRestore();
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
      return useIntersectionObserver(ref);
    });
    
    // Verificar que observe não foi chamado
    expect(observer.observe).not.toHaveBeenCalled();
    
    // Restaurar o spy
    constructorSpy.mockRestore();
  });
});
