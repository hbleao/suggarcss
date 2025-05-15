import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../useDebounce';

describe('useDebouncedValue', () => {
  // Mock para o temporizador
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('deve atualizar o valor após o tempo de debounce', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    // Valor inicial
    expect(result.current).toBe('initial');
    
    // Atualizar o valor
    rerender({ value: 'updated', delay: 500 });
    
    // O valor não deve mudar imediatamente
    expect(result.current).toBe('initial');
    
    // Avançar o tempo em 250ms (metade do delay)
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    // O valor ainda não deve ter mudado
    expect(result.current).toBe('initial');
    
    // Avançar o tempo para completar o delay
    act(() => {
      jest.advanceTimersByTime(250);
    });
    
    // Agora o valor deve ter sido atualizado
    expect(result.current).toBe('updated');
  });

  it('deve cancelar o debounce anterior quando o valor muda rapidamente', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    // Valor inicial
    expect(result.current).toBe('initial');
    
    // Atualizar o valor pela primeira vez
    rerender({ value: 'update 1', delay: 500 });
    
    // Avançar o tempo em 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // O valor ainda não deve ter mudado
    expect(result.current).toBe('initial');
    
    // Atualizar o valor novamente antes do primeiro debounce terminar
    rerender({ value: 'update 2', delay: 500 });
    
    // Avançar o tempo em mais 300ms (total: 500ms desde a primeira atualização)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // O valor ainda não deve ter mudado para 'update 2'
    expect(result.current).toBe('initial');
    
    // Avançar o tempo para completar o segundo debounce
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Agora o valor deve ser 'update 2'
    expect(result.current).toBe('update 2');
  });

  it('deve funcionar com diferentes tipos de dados', () => {
    // Testar com número
    const { result: resultNumber, rerender: rerenderNumber } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 0, delay: 200 } }
    );
    
    expect(resultNumber.current).toBe(0);
    
    rerenderNumber({ value: 42, delay: 200 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(resultNumber.current).toBe(42);
    
    // Testar com objeto
    const initialObj = { name: 'initial' };
    const updatedObj = { name: 'updated' };
    
    const { result: resultObj, rerender: rerenderObj } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: initialObj, delay: 200 } }
    );
    
    expect(resultObj.current).toBe(initialObj);
    
    rerenderObj({ value: updatedObj, delay: 200 });
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(resultObj.current).toBe(updatedObj);
  });

  it('deve respeitar diferentes tempos de delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'initial', delay: 1000 } }
    );
    
    // Valor inicial
    expect(result.current).toBe('initial');
    
    // Atualizar o valor com um delay maior
    rerender({ value: 'slow update', delay: 1000 });
    
    // Avançar o tempo em 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // O valor ainda não deve ter mudado
    expect(result.current).toBe('initial');
    
    // Avançar o tempo para completar o delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Agora o valor deve ter sido atualizado
    expect(result.current).toBe('slow update');
    
    // Testar com um delay menor
    rerender({ value: 'fast update', delay: 200 });
    
    // Avançar o tempo em 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // O valor deve ter sido atualizado mais rapidamente
    expect(result.current).toBe('fast update');
  });
});
