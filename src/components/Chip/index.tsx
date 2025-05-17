import type { HTMLAttributes } from "react";

import "./styles.scss";

/**
 * Componente Chip para exibir opções selecionáveis ou tags compactas.
 *
 * O componente Chip fornece uma interface visual compacta para representar informações, categorias,
 * filtros ou opções selecionáveis. É ideal para interfaces que necessitam de elementos de seleção
 * ou categorização que ocupem pouco espaço visual.
 *
 * @component
 * @example
 * ```tsx
 * // Chip padrão com tema claro
 * <Chip>
 *   Categoria
 * </Chip>
 * 
 * // Chip selecionado com tema claro
 * <Chip 
 *   theme="light" 
 *   variant="selected"
 * >
 *   Selecionado
 * </Chip>
 * 
 * // Chip com tema escuro e ícone
 * <Chip theme="dark">
 *   <i className="icon-star"></i>
 *   Com ícone
 * </Chip>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {'light' | 'dark'} [props.theme='light'] - Tema de cor do chip
 *   - "light": Tema claro, adequado para fundos claros (padrão)
 *   - "dark": Tema escuro, adequado para fundos escuros
 * @param {'default' | 'selected'} [props.variant='default'] - Variante visual do chip
 *   - "default": Estado padrão, não selecionado
 *   - "selected": Estado selecionado, com destaque visual
 * @param {React.ReactNode} props.children - Conteúdo do chip, pode incluir texto e/ou ícones
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento div
 *
 * @returns {JSX.Element} O componente Chip renderizado
 */

export type RootProps = HTMLAttributes<HTMLDivElement> & {
	theme?: "light" | "dark";
	variant?: "default" | "selected";
};

export const Chip = ({
	theme = "light",
	variant = "default",
	children,
}: RootProps) => {
	return (
		<div className={`chip --${theme} --${variant}`}>
			<div className="chip__text">{children}</div>
		</div>
	);
};
