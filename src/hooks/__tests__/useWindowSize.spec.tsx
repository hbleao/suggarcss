import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  
  // Mock para o evento de redimensionamento
  const fireResize = (width: number, height: number) => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
  };
  
  // Restaurar as dimensões originais após cada teste
  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });
  
  it('deve retornar as dimensões iniciais da janela', () => {
    const { result } = renderHook(() => useWindowSize());
    
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });
  
  it('deve atualizar as dimensões quando a janela é redimensionada', () => {
    const { result } = renderHook(() => useWindowSize());
    
    // Dimensões iniciais
    const initialWidth = result.current.width;
    const initialHeight = result.current.height;
    
    // Simular redimensionamento
    act(() => {
      fireResize(1024, 768);
    });
    
    // Verificar se as dimensões foram atualizadas
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
    expect(result.current.width).not.toBe(initialWidth);
    expect(result.current.height).not.toBe(initialHeight);
    
    // Simular outro redimensionamento
    act(() => {
      fireResize(800, 600);
    });
    
    // Verificar se as dimensões foram atualizadas novamente
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
  
  it('deve lidar com múltiplos redimensionamentos', () => {
    const { result } = renderHook(() => useWindowSize());
    
    // Simular uma série de redimensionamentos
    act(() => {
      fireResize(1280, 720);
    });
    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(720);
    
    act(() => {
      fireResize(1920, 1080);
    });
    expect(result.current.width).toBe(1920);
    expect(result.current.height).toBe(1080);
    
    act(() => {
      fireResize(375, 667); // Dimensões de iPhone
    });
    expect(result.current.width).toBe(375);
    expect(result.current.height).toBe(667);
  });
});
