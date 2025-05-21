import { useState, useCallback } from "react";

/**
 * Hook para copiar texto para a área de transferência (clipboard).
 * Fornece feedback sobre o status da operação de cópia.
 * 
 * @returns Um array contendo:
 * - [0]: O texto que foi copiado (ou null se nenhum texto foi copiado)
 * - [1]: Função para copiar texto para a área de transferência
 * 
 * @example
 * // Botão para copiar um texto
 * function CopyButton() {
 *   const [copiedText, copy] = useCopyToClipboard();
 *   const [success, setSuccess] = useState(false);
 *   
 *   const handleCopy = async () => {
 *     const result = await copy('Texto a ser copiado');
 *     setSuccess(result);
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={handleCopy}>
 *         {success ? 'Copiado!' : 'Copiar texto'}
 *       </button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Copiar código com feedback visual
 * function CodeSnippet({ code }) {
 *   const [copiedText, copy] = useCopyToClipboard();
 *   const [success, setSuccess] = useState(false);
 *   
 *   const handleCopy = async () => {
 *     const result = await copy(code);
 *     setSuccess(result);
 *   };
 *   
 *   return (
 *     <div className="code-snippet">
 *       <pre>{code}</pre>
 *       <button 
 *         onClick={handleCopy}
 *         className={success ? 'copied' : ''}
 *       >
 *         {success ? '✓ Copiado' : 'Copiar'}
 *       </button>
 *     </div>
 *   );
 * }
 */
export function useCopyToClipboard(): [string | null, (text: string) => Promise<boolean>] {
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
			const error = err as Error;
			setError(error);
			console.error('Erro ao copiar para a área de transferência:', error);
			return false;
		}
	}, []);

	return [copiedText, copy];
}

export default useCopyToClipboard;
