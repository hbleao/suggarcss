import { useEffect, useState } from "react";

/**
 * Hook para detectar se uma media query CSS corresponde ao estado atual da tela.
 * Útil para implementar comportamentos responsivos em componentes React.
 *
 * @param query - A media query CSS a ser verificada (ex: '(max-width: 768px)')
 * @returns boolean - Retorna true se a media query corresponder, false caso contrário
 *
 * @example
 * // Verificar se o dispositivo está em modo mobile
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * // Verificar se o dispositivo está em modo landscape
 * const isLandscape = useMediaQuery('(orientation: landscape)');
 *
 * // Verificar se o usuário prefere o tema escuro
 * const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
	// Estado para armazenar se a media query corresponde
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		// Criar o objeto MediaQueryList
		const mediaQuery = window.matchMedia(query);

		// Função para atualizar o estado com base na correspondência da media query
		const updateMatches = (event: MediaQueryListEvent | MediaQueryList) => {
			setMatches(event.matches);
		};

		// Definir o estado inicial
		updateMatches(mediaQuery);

		// Adicionar listener para mudanças na media query
		if (mediaQuery.addEventListener) {
			// Abordagem moderna
			mediaQuery.addEventListener("change", updateMatches);

			// Cleanup: remover o listener quando o componente for desmontado
			return () => {
				mediaQuery.removeEventListener("change", updateMatches);
			};
		}

		mediaQuery.addListener(updateMatches);

		// Cleanup: remover o listener quando o componente for desmontado
		return () => {
			mediaQuery.removeListener(updateMatches);
		};
	}, [query]); // Re-executar o efeito se a query mudar

	return matches;
}

export default useMediaQuery;
