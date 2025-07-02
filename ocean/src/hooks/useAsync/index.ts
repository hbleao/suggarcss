import { useState, useCallback, useEffect } from "react";

/**
 * `useAsync` — Hook personalizado para lidar com operações assíncronas em React.
 *
 * Gerencia automaticamente os estados de carregamento, sucesso e erro ao executar uma função assíncrona,
 * simplificando chamadas a APIs, submissão de formulários e qualquer lógica assíncrona baseada em promessa.
 *
 * @template T - Tipo do valor de retorno da função assíncrona
 * @template E - Tipo do erro esperado (padrão: string)
 *
 * @param {() => Promise<T>} asyncFunction - Função assíncrona que será executada
 * @param {boolean} [immediate=true] - Se `true`, a função será executada automaticamente ao montar o componente
 *
 * @returns {{
 *   execute: () => Promise<T>;
 *   status: 'idle' | 'pending' | 'success' | 'error';
 *   value: T | null;
 *   error: E | null;
 *   isLoading: boolean;
 * }} Objeto com os estados e a função `execute`
 *
 * @example
 * // Uso básico com chamada a API
 * const { execute, status, value, error } = useAsync(fetchUser);
 *
 * @example
 * // Uso manual com envio de formulário
 * const { execute: sendForm, status, error } = useAsync(() => api.submit(data), false);
 * const handleSubmit = () => sendForm().then(() => alert('Sucesso')).catch(() => {});
 */

export function useAsync<T, E = string>(
	asyncFunction: () => Promise<T>,
	immediate = true,
) {
	const [status, setStatus] = useState<
		"idle" | "pending" | "success" | "error"
	>("idle");
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const execute = useCallback(async () => {
		setStatus("pending");
		setValue(null);
		setError(null);

		try {
			const result = await asyncFunction();
			setValue(result);
			setStatus("success");
			return result;
		} catch (error) {
			setError(error as E);
			setStatus("error");
			throw error;
		}
	}, [asyncFunction]);

	useEffect(() => {
		if (immediate) {
			execute().catch(() => {});
		}
	}, [execute, immediate]);

	return { execute, status, value, error, isLoading: status === "pending" };
}

export default useAsync;
