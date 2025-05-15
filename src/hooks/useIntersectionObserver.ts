import { useState, useEffect, type RefObject } from "react";

/**
 * Opções estendidas para o IntersectionObserver
 */
interface IntersectionOptions extends IntersectionObserverInit {
	/**
	 * Se true, uma vez que o elemento se torna visível, o estado é "congelado" e
	 * não muda mesmo se o elemento sair da viewport.
	 */
	freezeOnceVisible?: boolean;
}

/**
 * Hook para detectar quando um elemento se torna visível na viewport.
 * Perfeito para implementar lazy loading de imagens, animações de entrada e
 * carregamento infinito de conteúdo.
 * 
 * @param elementRef - Referência para o elemento a ser observado
 * @param options - Opções para o IntersectionObserver
 * @returns O objeto IntersectionObserverEntry ou undefined se o elemento não estiver disponível
 * 
 * @example
 * // Lazy loading de imagem
 * function LazyImage({ src, alt }) {
 *   const ref = useRef(null);
 *   const entry = useIntersectionObserver(ref, { threshold: 0.1 });
 *   const isVisible = !!entry?.isIntersecting;
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
 * // Animação de entrada quando elemento se torna visível
 * function FadeInSection({ children }) {
 *   const ref = useRef(null);
 *   const entry = useIntersectionObserver(ref, { threshold: 0.1 });
 *   const isVisible = !!entry?.isIntersecting;
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
 * // Carregamento infinito
 * function InfiniteList() {
 *   const [items, setItems] = useState([]);
 *   const [page, setPage] = useState(1);
 *   const loadMoreRef = useRef(null);
 *   
 *   const entry = useIntersectionObserver(loadMoreRef, { 
 *     threshold: 0.5,
 *     freezeOnceVisible: false
 *   });
 *   
 *   useEffect(() => {
 *     if (entry?.isIntersecting) {
 *       loadMoreItems(page).then(newItems => {
 *         setItems(prev => [...prev, ...newItems]);
 *         setPage(prev => prev + 1);
 *       });
 *     }
 *   }, [entry?.isIntersecting, page]);
 *   
 *   return (
 *     <div>
 *       {items.map(item => <ItemCard key={item.id} item={item} />)}
 *       <div ref={loadMoreRef}>Carregando mais...</div>
 *     </div>
 *   );
 * }
 */
export function useIntersectionObserver(
	elementRef: RefObject<Element>,
	options: IntersectionOptions = {},
) {
	const {
		threshold = 0,
		root = null,
		rootMargin = "0%",
		freezeOnceVisible = false,
	} = options;

	const [entry, setEntry] = useState<IntersectionObserverEntry>();
	const frozen = entry?.isIntersecting && freezeOnceVisible;

	useEffect(() => {
		const element = elementRef?.current;
		if (!element || frozen) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setEntry(entry);
			},
			{ threshold, root, rootMargin },
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [elementRef, threshold, root, rootMargin, frozen]);

	return entry;
}

export default useIntersectionObserver;
