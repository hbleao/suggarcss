import { useEffect, useRef, type RefObject } from "react";

// Simplificando a tipagem para evitar erros de compatibilidade
type EventType = Event;

/**
 * Hook para adicionar event listeners com limpeza automática.
 * Simplifica a adição e remoção de event listeners em elementos, documento ou window.
 * 
 * @param eventName - Nome do evento a ser escutado (ex: 'click', 'scroll')
 * @param handler - Função callback a ser executada quando o evento ocorrer
 * @param element - Referência opcional ao elemento que receberá o event listener (default: window)
 * @param options - Opções do addEventListener
 * 
 * @example
 * // Escutar cliques em todo o documento
 * useEventListener('click', (e) => {
 *   console.log('Clique detectado em:', e.target);
 * });
 * 
 * @example
 * // Escutar eventos de scroll em um elemento específico
 * const scrollContainerRef = useRef<HTMLDivElement>(null);
 * useEventListener('scroll', (e) => {
 *   console.log('Posição de scroll:', (e.target as HTMLElement).scrollTop);
 * }, scrollContainerRef);
 * 
 * @example
 * // Escutar eventos de teclado com opções
 * useEventListener('keydown', (e) => {
 *   if (e.key === 'Escape') closeModal();
 * }, null, { capture: true });
 */
export function useEventListener<T extends HTMLElement = HTMLDivElement>(
	eventName: string,
	handler: (event: EventType) => void,
	element?: RefObject<T | null> | null,
	options?: boolean | AddEventListenerOptions,
) {
	// Criar uma ref que armazena o handler
	const savedHandler = useRef(handler);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		// Definir o elemento alvo
		const targetElement: T | Window | Document = element?.current || window;

		if (!targetElement?.addEventListener) {
			return;
		}

		// Criar um event listener que chama o handler armazenado na ref
		const eventListener = (event: Event) => {
			savedHandler.current(event as EventType);
		};

		targetElement.addEventListener(eventName, eventListener, options);

		// Remover event listener ao desmontar
		return () => {
			targetElement.removeEventListener(eventName, eventListener, options);
		};
	}, [eventName, element, options]);
}

export default useEventListener;
