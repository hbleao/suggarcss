import { useState, useCallback } from "react";

/**
 * Hook para copiar texto para a área de transferência (clipboard).
 * Fornece feedback sobre o status da operação de cópia.
 * 
 * @returns Um objeto contendo:
 * - `copiedText`: O texto que foi copiado (ou null se nenhum texto foi copiado)
 * - `copy`: Função para copiar texto para a área de transferência
 * - `error`: Erro que ocorreu durante a operação de cópia (ou null se não houve erro)
 * - `success`: Booleano indicando se a operação de cópia foi bem-sucedida
 * 
 * @example
 * // Botão para copiar um texto
 * function CopyButton() {
 *   const { copy, success, error } = useCopyToClipboard();
 *   
 *   const handleCopy = () => {
 *     copy('Texto a ser copiado');
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={handleCopy}>
 *         {success ? 'Copiado!' : 'Copiar texto'}
 *       </button>
 *       {error && <p>Erro ao copiar: {error.message}</p>}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Copiar código com feedback visual
 * function CodeSnippet({ code }) {
 *   const { copy, success } = useCopyToClipboard();
 *   
 *   return (
 *     <div className="code-snippet">
 *       <pre>{code}</pre>
 *       <button 
 *         onClick={() => copy(code)}
 *         className={success ? 'copied' : ''}
 *       >
 *         {success ? '✓ Copiado' : 'Copiar'}
 *       </button>
 *     </div>
 *   );
 * }
 */
export function useCopyToClipboard() {
	const [copiedText, setCopiedText] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	const copy = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			setSuccess(true);
			setError(null);

			// Resetar o status de sucesso após 2 segundos
			setTimeout(() => {
				setSuccess(false);
			}, 2000);

			return true;
		} catch (err) {
			setCopiedText(null);
			setSuccess(false);
			setError(err as Error);
			return false;
		}
	}, []);

	return { copiedText, copy, error, success };
}

export default useCopyToClipboard;
