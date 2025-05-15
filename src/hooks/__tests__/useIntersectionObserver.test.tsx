import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

describe('useIntersectionObserver', () => {
  // Mock do IntersectionObserver
  const mockIntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    callback: IntersectionObserverCallback;
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };

  // Salvar a implementação original
  const originalIntersectionObserver = global.IntersectionObserver;

  beforeEach(() => {
    // Substituir o IntersectionObserver pelo mock
    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  afterEach(() => {
    // Restaurar o IntersectionObserver original
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('deve observar o elemento de referência quando disponível', () => {
    // Criar um elemento de referência
    const element = document.createElement('div');
    const ref = { current: element };
    
    renderHook(() => useIntersectionObserver(ref));
    
    // Verificar se observe foi chamado com o elemento
    expect(mockIntersectionObserver.prototype.observe).toHaveBeenCalledWith(element);
  });

  it('não deve observar quando o elemento de referência é null', () => {
    // Referência sem elemento
    const ref = { current: null };
    
    renderHook(() => useIntersectionObserver(ref));
    
    // Verificar que observe não foi chamado
    expect(mockIntersectionObserver.prototype.observe).not.toHaveBeenCalled();
  });

  it('deve desconectar o observer ao desmontar', () => {
    // Criar um elemento de referência
    const element = document.createElement('div');
    const ref = { current: element };
    
    const { unmount } = renderHook(() => useIntersectionObserver(ref));
    
    // Desmontar o hook
    unmount();
    
    // Verificar se disconnect foi chamado
    expect(mockIntersectionObserver.prototype.disconnect).toHaveBeenCalled();
  });

  it('deve retornar isIntersecting=false inicialmente', () => {
    // Criar um elemento de referência
    const element = document.createElement('div');
    const ref = { current: element };
    
    const { result } = renderHook(() => useIntersectionObserver(ref));
    
    // Verificar o valor inicial
    expect(result.current.isIntersecting).toBe(false);
  });

  it('deve atualizar isIntersecting quando o callback é chamado', () => {
    // Criar um elemento de referência
    const element = document.createElement('div');
    const ref = { current: element };
    
    let observerCallback: IntersectionObserverCallback;
    
    // Capturar o callback passado para o IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
    
    const { result } = renderHook(() => useIntersectionObserver(ref));
    
    // Inicialmente isIntersecting deve ser false
    expect(result.current.isIntersecting).toBe(false);
    
    // Simular uma entrada na viewport
    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry;
    observerCallback!([mockEntry], {} as IntersectionObserver);
    
    // Agora isIntersecting deve ser true
    expect(result.current.isIntersecting).toBe(true);
  });

  it('deve passar as opções para o IntersectionObserver', () => {
    // Criar um elemento de referência
    const element = document.createElement('div');
    const ref = { current: element };
    
    // Opções personalizadas
    const options = {
      root: document.body,
      rootMargin: '10px',
      threshold: 0.5,
    };
    
    // Espionar o construtor do IntersectionObserver
    const intersectionObserverSpy = jest.spyOn(global, 'IntersectionObserver');
    
    renderHook(() => useIntersectionObserver(ref, options));
    
    // Verificar se as opções foram passadas corretamente
    expect(intersectionObserverSpy).toHaveBeenCalledWith(
      expect.any(Function),
      options
    );
  });
});
