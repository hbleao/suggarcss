import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../useDebounce';

describe('useDebouncedValue', () => {
  // Mock do temporizador para controlar o tempo nos testes
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve inicializar com o valor inicial', () => {
    const { result } = renderHook(() => useDebouncedValue('initial value', 500));
    
    expect(result.current).toBe('initial value');
  });

  it('não deve atualizar o valor imediatamente quando o valor de entrada mudar', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Mudar o valor de entrada
    rerender({ value: 'updated value', delay: 500 });
    
    // O valor debounced não deve mudar imediatamente
    expect(result.current).toBe('initial value');
  });

  it('deve atualizar o valor após o atraso especificado', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Mudar o valor de entrada
    rerender({ value: 'updated value', delay: 500 });
    
    // Avançar o tempo menos que o atraso
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // O valor ainda não deve ter mudado
    expect(result.current).toBe('initial value');
    
    // Avançar o tempo para completar o atraso
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Agora o valor deve ter sido atualizado
    expect(result.current).toBe('updated value');
  });

  it('deve cancelar o debounce anterior se o valor mudar novamente antes do atraso', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Primeira mudança
    rerender({ value: 'first update', delay: 500 });
    
    // Avançar o tempo parcialmente
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Segunda mudança antes do primeiro debounce completar
    rerender({ value: 'second update', delay: 500 });
    
    // Avançar o tempo para completar o primeiro debounce
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // O valor não deve ser o da primeira mudança
    expect(result.current).not.toBe('first update');
    expect(result.current).toBe('initial value');
    
    // Avançar o tempo para completar o segundo debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Agora o valor deve ser o da segunda mudança
    expect(result.current).toBe('second update');
  });

  it('deve usar o atraso padrão se não for especificado', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value),
      { initialProps: { value: 'initial value' } }
    );
    
    // Mudar o valor de entrada
    rerender({ value: 'updated value' });
    
    // Avançar o tempo menos que o atraso padrão (500ms)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // O valor ainda não deve ter mudado
    expect(result.current).toBe('initial value');
    
    // Avançar o tempo para completar o atraso padrão
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Agora o valor deve ter sido atualizado
    expect(result.current).toBe('updated value');
  });

  it('deve limpar o timeout ao desmontar', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Mudar o valor para iniciar o debounce
    rerender({ value: 'updated value', delay: 500 });
    
    // Desmontar antes do debounce completar
    unmount();
    
    // Deve ter chamado clearTimeout
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    // Avançar o tempo além do atraso
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // O valor não deve ter sido atualizado (mas não podemos verificar diretamente após unmount)
  });
});
