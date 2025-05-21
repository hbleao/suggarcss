import { useState, useCallback } from 'react';

/**
 * Interface para o estado retornado pelo hook useTryCatch
 * @template TData - Tipo do resultado da operação
 * @template TError - Tipo do erro (padrão: Error)
 */
interface TryCatchState<TData, TError = Error> {
  /** Resultado da operação bem-sucedida */
  data: TData | null;
  /** Erro capturado, se houver */
  error: TError | null;
  /** Indica se a operação está em andamento */
  isLoading: boolean;
  /** Indica se a operação foi completada (com sucesso ou erro) */
  isComplete: boolean;
}

/**
 * Hook para encapsular operações try-catch, facilitando o tratamento de erros em componentes React.
 * Fornece estados para controlar dados, erros e loading, além de uma função para executar operações com tratamento automático de erros.
 * 
 * @template TData - Tipo do resultado da operação
 * @template TError - Tipo do erro (padrão: Error)
 * @returns Um objeto contendo:
 * - execute: Função para executar uma operação com tratamento de erros
 * - data: Resultado da operação bem-sucedida
 * - error: Erro capturado, se houver
 * - isLoading: Indica se a operação está em andamento
 * - isComplete: Indica se a operação foi completada (com sucesso ou erro)
 * - reset: Função para resetar os estados para os valores iniciais
 * - executeWithCallback: Função para executar uma operação com callbacks de sucesso e erro
 */
export function useTryCatch<TData, TError = Error>() {
  const [state, setState] = useState<TryCatchState<TData, TError>>({
    data: null,
    error: null,
    isLoading: false,
    isComplete: false,
  });

  /**
   * Executa uma função com tratamento automático de erros
   * @param fn - Função a ser executada (pode ser assíncrona)
   * @returns O resultado da função ou null em caso de erro
   */
  const execute = useCallback(async <R extends TData>(
    fn: () => Promise<R> | R
  ): Promise<R | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null, isComplete: false }));

    try {
      const result = await fn();
      setState({ data: result, error: null, isLoading: false, isComplete: true });
      return result;
    } catch (error) {
      setState({ 
        data: null, 
        error: error as TError, 
        isLoading: false,
        isComplete: true 
      });
      return null;
    }
  }, []);

  /**
   * Reseta os estados para os valores iniciais
   */
  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false, isComplete: false });
  }, []);

  /**
   * Executa uma função com callbacks específicos para sucesso e erro
   * @param fn - Função a ser executada (pode ser assíncrona)
   * @param onSuccess - Callback executado em caso de sucesso
   * @param onError - Callback executado em caso de erro
   * @returns O resultado da função ou null em caso de erro
   */
  const executeWithCallback = useCallback(async <R extends TData>(
    fn: () => Promise<R> | R,
    onSuccess?: (data: R) => void,
    onError?: (error: TError) => void
  ): Promise<R | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null, isComplete: false }));

    try {
      const result = await fn();
      setState({ data: result, error: null, isLoading: false, isComplete: true });
      onSuccess?.(result);
      return result;
    } catch (error) {
      const typedError = error as TError;
      setState({ 
        data: null, 
        error: typedError, 
        isLoading: false,
        isComplete: true 
      });
      onError?.(typedError);
      return null;
    }
  }, []);

  return {
    ...state,
    execute,
    executeWithCallback,
    reset,
  };
}

export default useTryCatch;
