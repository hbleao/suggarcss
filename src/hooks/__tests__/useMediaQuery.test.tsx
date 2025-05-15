import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;
  
  // Mock da função matchMedia
  const mockMatchMedia = (matches: boolean) => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('deve retornar true quando a media query corresponder', () => {
    mockMatchMedia(true);
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
  });

  it('deve retornar false quando a media query não corresponder', () => {
    mockMatchMedia(false);
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(false);
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
  });

  it('deve atualizar o resultado quando a media query mudar', () => {
    // Iniciar com match = false
    mockMatchMedia(false);
    
    const { result, rerender } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
    
    // Mudar para match = true e re-renderizar
    mockMatchMedia(true);
    rerender();
    
    expect(result.current).toBe(true);
  });
});
