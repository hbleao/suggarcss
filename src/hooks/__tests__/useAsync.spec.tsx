import { renderHook, act } from '@testing-library/react';
import { useAsync } from '../useAsync';

describe('useAsync', () => {
  // Mock para o console.error para evitar logs de erro nos testes
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  
  afterAll(() => {
    console.error = originalConsoleError;
  });
  
  it('deve inicializar com o estado idle', () => {
    const asyncFunction = jest.fn().mockResolvedValue('result');
    
    const { result } = renderHook(() => useAsync(asyncFunction, false));
    
    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(asyncFunction).not.toHaveBeenCalled();
  });

  it('deve executar a função assíncrona imediatamente quando immediate é true', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('result');
    
    renderHook(() => useAsync(asyncFunction, true));
    
    // Verificar se a função foi chamada imediatamente
    expect(asyncFunction).toHaveBeenCalledTimes(1);
  });

  it('deve atualizar o estado corretamente durante a execução bem-sucedida', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('success result');
    
    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction, false));
    
    // Estado inicial
    expect(result.current.status).toBe('idle');
    
    // Executar a função assíncrona
    let executePromise;
    act(() => {
      executePromise = result.current.execute();
    });
    
    // Verificar o estado de loading
    expect(result.current.status).toBe('pending');
    expect(result.current.isLoading).toBe(true);
    
    // Esperar a conclusão da operação assíncrona
    await waitForNextUpdate();
    
    // Verificar o estado de sucesso
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('success result');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    
    // Verificar se a promessa retornada resolve com o resultado
    await expect(executePromise).resolves.toBe('success result');
  });

  it('deve atualizar o estado corretamente quando ocorre um erro', async () => {
    const testError = new Error('Test error');
    const asyncFunction = jest.fn().mockRejectedValue(testError);
    
    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction, false));
    
    // Estado inicial
    expect(result.current.status).toBe('idle');
    
    // Executar a função assíncrona
    let executePromise;
    act(() => {
      executePromise = result.current.execute().catch(() => {
        // Capturar o erro para evitar que ele seja propagado para o teste
      });
    });
    
    // Verificar o estado de loading
    expect(result.current.status).toBe('pending');
    expect(result.current.isLoading).toBe(true);
    
    // Esperar a conclusão da operação assíncrona
    await waitForNextUpdate();
    
    // Verificar o estado de erro
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBe(testError);
    expect(result.current.isLoading).toBe(false);
    
    // Verificar se a promessa retornada rejeita com o erro
    await expect(result.current.execute()).rejects.toBe(testError);
  });

  it('deve redefinir o estado ao executar novamente', async () => {
    const asyncFunction = jest.fn().mockResolvedValue('result');
    
    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction, true));
    
    // Esperar a conclusão da primeira execução
    await waitForNextUpdate();
    
    // Verificar o estado de sucesso
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('result');
    
    // Executar novamente
    act(() => {
      result.current.execute();
    });
    
    // Verificar se o estado foi redefinido para pending
    expect(result.current.status).toBe('pending');
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
    
    // Esperar a conclusão da segunda execução
    await waitForNextUpdate();
    
    // Verificar o estado de sucesso novamente
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('result');
  });

  it('deve permitir executar funções assíncronas com diferentes tipos de retorno', async () => {
    // Testar com string
    const stringFunction = jest.fn().mockResolvedValue('string result');
    const { result: stringResult, waitForNextUpdate: waitString } = renderHook(() => useAsync(stringFunction, true));
    await waitString();
    expect(stringResult.current.value).toBe('string result');
    
    // Testar com objeto
    const objectFunction = jest.fn().mockResolvedValue({ id: 1, name: 'test' });
    const { result: objectResult, waitForNextUpdate: waitObject } = renderHook(() => useAsync(objectFunction, true));
    await waitObject();
    expect(objectResult.current.value).toEqual({ id: 1, name: 'test' });
    
    // Testar com array
    const arrayFunction = jest.fn().mockResolvedValue([1, 2, 3]);
    const { result: arrayResult, waitForNextUpdate: waitArray } = renderHook(() => useAsync(arrayFunction, true));
    await waitArray();
    expect(arrayResult.current.value).toEqual([1, 2, 3]);
  });
});
