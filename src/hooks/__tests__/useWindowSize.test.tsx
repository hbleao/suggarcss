import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  // Armazenar as dimensões originais da janela
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  // Restaurar as dimensões originais após os testes
  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight });
  });

  it('deve retornar as dimensões iniciais da janela', () => {
    // Definir dimensões específicas para o teste
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
    
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('deve atualizar as dimensões quando a janela for redimensionada', () => {
    // Iniciar com dimensões específicas
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
    
    const { result } = renderHook(() => useWindowSize());
    
    // Simular o redimensionamento da janela
    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 1280 });
      Object.defineProperty(window, 'innerHeight', { value: 800 });
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(800);
  });

  it('deve remover o event listener ao desmontar', () => {
    // Espionar o addEventListener e removeEventListener
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useWindowSize());
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    // Desmontar o hook
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
