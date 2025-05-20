import { clsx } from "@/utils";
import styles from "./styles.module.scss";
import type { FlexProps } from "./types";

/**
 * Componente Flexível baseado em CSS Flexbox.
 *
 * Permite configurar direção, alinhamento, espaçamento, wrap e outros comportamentos.
 * Inspirado em APIs de layout como Chakra UI e ShadCN.
 *
 * @example
 * ```tsx
 * <Flex direction="column" align="center" justify="space-between" gap="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
export const Flex = ({
	/**
	 * Elementos filhos que serão renderizados dentro do contêiner flexível.
	 */
	children,

	/**
	 * Classe CSS adicional para customização.
	 */
	className,

	/**
	 * Estilo inline opcional.
	 */
	style,

	/**
	 * Tipo de elemento HTML a ser renderizado (padrão: div).
	 */
	as: Tag = "div",

	/**
	 * Direção dos itens no layout flexível.
	 * Pode ser `row`, `column`, `row-reverse` ou `column-reverse`.
	 */
	direction = "row",

	/**
	 * Alinhamento dos itens ao longo do eixo transversal.
	 * Exemplo: `stretch`, `center`, `flex-start`, `flex-end`, etc.
	 */
	align = "stretch",

	/**
	 * Justificação dos itens no eixo principal.
	 * Exemplo: `flex-start`, `center`, `space-between`, etc.
	 */
	justify = "flex-start",

	/**
	 * Quebra de linha dos itens.
	 * Pode ser `nowrap`, `wrap`, ou `wrap-reverse`.
	 */
	wrap = "nowrap",

	/**
	 * Espaçamento entre os itens.
	 * Exemplo: `1rem`, `8px`, `0.5ch`, etc.
	 */
	gap,

	/**
	 * Define se o contêiner será `display: inline-flex` ao invés de `flex`.
	 */
	inline = false,
}: FlexProps) => {
	return (
		<Tag
			className={clsx(styles.flex, inline && styles.inline, className)}
			style={{
				flexDirection: direction,
				alignItems: align,
				justifyContent: justify,
				flexWrap: wrap,
				gap,
				...style,
			}}
		>
			{children}
		</Tag>
	);
};
