import { useState, useCallback, useEffect } from "react";

/**
 * Hook para gerenciar operações assíncronas com estados de loading, erro e sucesso.
 * Simplifica o tratamento de chamadas de API e outras operações assíncronas em componentes React.
 * 
 * @template T - Tipo do resultado da operação assíncrona
 * @template E - Tipo do erro (padrão: string)
 * @param asyncFunction - Função assíncrona a ser executada
 * @param immediate - Se verdadeiro, executa a função imediatamente ao montar o componente
 * @returns Um objeto contendo:
 * - execute: Função para executar a operação assíncrona
 * - status: Estado atual da operação ('idle', 'pending', 'success', 'error')
 * - value: Resultado da operação assíncrona (se bem-sucedida)
 * - error: Erro da operação assíncrona (se falhou)
 * 
 * @example
 * // Carregar dados de uma API
 * function UserProfile() {
 *   const { execute, status, value: user, error } = useAsync(fetchUserData);
 *   
 *   return (
 *     <div>
 *       {status === 'idle' && <p>Clique para carregar os dados</p>}
 *       {status === 'pending' && <p>Carregando...</p>}
 *       {status === 'error' && <p>Erro: {error}</p>}
 *       {status === 'success' && (
 *         <div>
 *           <h2>{user.name}</h2>
 *           <p>{user.email}</p>
 *         </div>
 *       )}
 *       <button onClick={execute} disabled={status === 'pending'}>
 *         Recarregar
 *       </button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Enviar dados de formulário
 * function ContactForm() {
 *   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
 *   const { execute: submitForm, status, error } = useAsync(
 *     () => sendFormData(formData),
 *     false
 *   );
 *   
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     submitForm()
 *       .then(() => {
 *         // Limpar formulário ou navegar para outra página
 *       })
 *       .catch(() => {
 *         // Erro já tratado no hook
 *       });
 *   };
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {/* Campos do formulário */}
 *       <button type="submit" disabled={status === 'pending'}>
 *         {status === 'pending' ? 'Enviando...' : 'Enviar'}
 *       </button>
 *       {error && <p className="error">{error instanceof Error ? error.message : error}</p>}
 *     </form>
 *   );
 * }
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  // Função para executar a operação assíncrona
  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const result = await asyncFunction();
      setValue(result);
      setStatus('success');
      return result;
    } catch (error) {
      setError(error as E);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  // Executar a função imediatamente se solicitado
  useEffect(() => {
    if (immediate) {
      execute().catch(() => {
        // Erro já tratado no execute
      });
    }
  }, [execute, immediate]);

  return { execute, status, value, error, isLoading: status === 'pending' };
}

export default useAsync;
