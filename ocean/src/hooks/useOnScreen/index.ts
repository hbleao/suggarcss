import { useState, useEffect, type RefObject } from "react";

/**
 * Opções para configuração do IntersectionObserver
 */
interface UseOnScreenOptions {
	/**
	 * Margem ao redor do elemento alvo
	 * @default '0px'
	 */
	rootMargin?: string;

	/**
	 * Valor entre 0 e 1 indicando a porcentagem de visibilidade necessária
	 * @default 0.1
	 */
	threshold?: number | number[];

	/**
	 * Elemento que será usado como viewport para checar visibilidade
	 * @default null (viewport do navegador)
	 */
	root?: Element | null;
}

/**
 * Hook para detectar quando um elemento entra ou sai da viewport.
 * Útil para implementar lazy loading, animações de entrada, infinite scroll,
 * e outros efeitos baseados na visibilidade de elementos.
 *
 * @param ref - Referência para o elemento a ser observado
 * @param options - Opções de configuração do IntersectionObserver
 * @returns Um booleano indicando se o elemento está visível na viewport
 *
 * @example
 * // Lazy loading de imagem
 * function LazyImage({ src, alt }) {
 *   const ref = useRef(null);
 *   const isVisible = useOnScreen(ref);
 *
 *   return (
 *     <div ref={ref}>
 *       {isVisible ? (
 *         <img src={src} alt={alt} />
 *       ) : (
 *         <div className="placeholder" />
 *       )}
 *     </div>
 *   );
 * }
 *
 * @example
 * // Animação de entrada
 * function FadeInSection({ children }) {
 *   const ref = useRef(null);
 *   const isVisible = useOnScreen(ref);
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 *
 * @example
 * // Infinite scroll
 * function InfiniteList() {
 *   const [items, setItems] = useState([...initialItems]);
 *   const [page, setPage] = useState(1);
 *   const [loading, setLoading] = useState(false);
 *
 *   const loaderRef = useRef(null);
 *   const isLoaderVisible = useOnScreen(loaderRef);
 *
 *   useEffect(() => {
 *     if (isLoaderVisible && !loading) {
 *       setLoading(true);
 *       fetchMoreItems(page).then(newItems => {
 *         setItems(prev => [...prev, ...newItems]);
 *         setPage(prev => prev + 1);
 *         setLoading(false);
 *       });
 *     }
 *   }, [isLoaderVisible, loading, page]);
 *
 *   return (
 *     <div className="list">
 *       {items.map(item => (
 *         <div key={item.id} className="list-item">
 *           {item.content}
 *         </div>
 *       ))}
 *       <div ref={loaderRef} className="loader">
 *         {loading && <p>Carregando mais itens...</p>}
 *       </div>
 *     </div>
 *   );
 * }
 */
export function useOnScreen<T extends Element>(
	ref: RefObject<T | null>,
	options: UseOnScreenOptions = {},
): boolean {
	// Estado para armazenar se o elemento está visível
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	useEffect(() => {
		// Verificar se o elemento de referência existe
		const element = ref.current;
		if (!element) return;

		// Extrair opções com valores padrão
		const { rootMargin = "0px", threshold = 0.1, root = null } = options;

		// Callback para o IntersectionObserver
		const observer = new IntersectionObserver(
			([entry]) => {
				// Atualizar o estado baseado na interseção
				setIntersecting(entry.isIntersecting);
			},
			{ rootMargin, threshold, root },
		);

		// Iniciar a observação
		observer.observe(element);

		// Limpar o observer ao desmontar o componente
		return () => {
			observer.unobserve(element);
			observer.disconnect();
		};
	}, [ref, options]); // Simplificando para usar apenas options como dependência

	return isIntersecting;
}

export default useOnScreen;
