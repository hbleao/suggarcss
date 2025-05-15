import { renderHook } from '@testing-library/react';
import { usePrevious } from '../usePrevious';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

describe('usePrevious', () => {
  it('deve retornar undefined na primeira renderização', () => {
    const { result } = renderHook(() => usePrevious('initial'));
    expect(result.current).toBeUndefined();
  });

  it('deve retornar o valor anterior após uma atualização', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'initial' } }
    );
    
    // Primeira renderização - não há valor anterior
    expect(result.current).toBeUndefined();
    
    // Atualizar o valor
    rerender({ value: 'updated' });
    
    // Agora o valor anterior deve ser 'initial'
    expect(result.current).toBe('initial');
    
    // Atualizar novamente
    rerender({ value: 'updated again' });
    
    // Agora o valor anterior deve ser 'updated'
    expect(result.current).toBe('updated');
  });

  it('deve funcionar com diferentes tipos de dados', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 42 } }
    );
    
    // Primeira renderização - não há valor anterior
    expect(result.current).toBeUndefined();
    
    // Atualizar para um objeto
    const obj = { name: 'test' };
    rerender({ value: obj });
    expect(result.current).toBe(42);
    
    // Atualizar para um array
    const arr = [1, 2, 3];
    rerender({ value: arr });
    expect(result.current).toBe(obj);
    
    // Atualizar para um booleano
    rerender({ value: true });
    expect(result.current).toBe(arr);
  });

  it('deve funcionar em um cenário de componente com useState', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const prevCount = usePrevious(count);
      return { count, setCount, prevCount };
    });
    
    // Inicialmente, prevCount é undefined
    expect(result.current.prevCount).toBeUndefined();
    expect(result.current.count).toBe(0);
    
    // Incrementar o contador
    act(() => {
      result.current.setCount(1);
    });
    
    // Agora prevCount deve ser 0
    expect(result.current.prevCount).toBe(0);
    expect(result.current.count).toBe(1);
    
    // Incrementar novamente
    act(() => {
      result.current.setCount(2);
    });
    
    // Agora prevCount deve ser 1
    expect(result.current.prevCount).toBe(1);
    expect(result.current.count).toBe(2);
  });
});
