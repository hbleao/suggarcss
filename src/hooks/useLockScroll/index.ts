import { useEffect, useRef } from "react";

/**
 * `useLockScroll` — Hook React para bloquear o scroll da página ou de um elemento específico.
 *
 * Muito útil em contextos de UI com modais, drawers, sidebars ou overlays onde se deseja impedir
 * a rolagem da página ao fundo enquanto o componente está visível.
 *
 * Também oferece uma opção para preservar a largura da barra de rolagem, evitando saltos de layout.
 *
 * @param {boolean} isLocked - Define se o scroll deve ser bloqueado (`true`) ou liberado (`false`)
 * @param {Object} [options] - Opções adicionais de configuração
 * @param {boolean} [options.reserveScrollBarWidth=false] - Se verdadeiro, adiciona `padding-right` ao `body` para compensar a largura da barra de rolagem
 * @param {HTMLElement|null} [options.targetElement=document.body] - Elemento alvo cujo scroll será bloqueado (padrão: `document.body`)
 *
 * @example
 * // Bloquear scroll ao abrir um modal
 * useLockScroll(isModalOpen);
 *
 * // Com reserva de barra de rolagem
 * useLockScroll(isDrawerOpen, { reserveScrollBarWidth: true });
 *
 * @returns {void}
 */

interface UseLockScrollOptions {
	reserveScrollBarWidth?: boolean;
	targetElement?: HTMLElement | null;
}

export function useLockScroll(
	isLocked: boolean,
	options: UseLockScrollOptions = {},
): void {
	const {
		reserveScrollBarWidth = false,
		targetElement = typeof document !== "undefined" ? document.body : null,
	} = options;

	const originalStylesRef = useRef<{
		overflow: string;
		paddingRight: string;
		scrollY: number;
	}>({
		overflow: "",
		paddingRight: "",
		scrollY: 0,
	});

	useEffect(() => {
		if (!targetElement) return;

		const getScrollbarWidth = (): number => {
			return window.innerWidth - document.documentElement.clientWidth;
		};

		if (isLocked) {
			originalStylesRef.current = {
				overflow: targetElement.style.overflow,
				paddingRight: targetElement.style.paddingRight,
				scrollY: window.scrollY,
			};

			targetElement.style.overflow = "hidden";

			if (reserveScrollBarWidth) {
				const scrollbarWidth = getScrollbarWidth();
				if (scrollbarWidth > 0) {
					targetElement.style.paddingRight = `${scrollbarWidth}px`;
				}
			}

			window.scrollTo(0, originalStylesRef.current.scrollY);
		} else {
			targetElement.style.overflow = originalStylesRef.current.overflow;
			targetElement.style.paddingRight = originalStylesRef.current.paddingRight;
		}

		return () => {
			if (targetElement && isLocked) {
				targetElement.style.overflow = originalStylesRef.current.overflow;
				targetElement.style.paddingRight =
					originalStylesRef.current.paddingRight;
			}
		};
	}, [isLocked, reserveScrollBarWidth, targetElement]);
}

export default useLockScroll;
