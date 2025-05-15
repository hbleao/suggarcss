import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('deve inicializar com o valor padrão (false)', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('deve inicializar com o valor fornecido', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('deve alternar entre true e false', () => {
    const { result } = renderHook(() => useToggle(false));
    
    // Valor inicial é false
    expect(result.current[0]).toBe(false);
    
    // Alternar para true
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    
    // Alternar de volta para false
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('deve alternar entre dois valores personalizados', () => {
    const { result } = renderHook(() => useToggle('light', 'dark'));
    
    // Valor inicial é 'light'
    expect(result.current[0]).toBe('light');
    
    // Alternar para 'dark'
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('dark');
    
    // Alternar de volta para 'light'
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('light');
  });

  it('deve permitir definir o valor diretamente', () => {
    const { result } = renderHook(() => useToggle(false));
    
    // Definir como true
    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);
    
    // Definir como false
    act(() => {
      result.current[2](false);
    });
    expect(result.current[0]).toBe(false);
  });
});
