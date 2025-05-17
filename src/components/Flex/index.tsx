// components/Flex.tsx

import styles from "./styles.module.scss";
import clsx from "clsx";
import type { FlexProps } from "./types";

/**
 * Componente Flex para layouts flexíveis e responsivos.
 *
 * O componente Flex fornece uma interface para criar layouts flexíveis baseados em CSS Flexbox,
 * permitindo configurar facilmente direção, alinhamento, espaçamento, quebra de linha e outros
 * comportamentos. Inspirado em APIs de layout modernas como Chakra UI e ShadCN.
 *
 * @component
 * @example
 * ```tsx
 * // Layout básico em coluna com alinhamento centralizado
 * <Flex direction="column" align="center" justify="space-between" gap="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * 
 * // Layout em linha com quebra para dispositivos menores
 * <Flex 
 *   wrap="wrap" 
 *   justify="center" 
 *   gap="16px"
 * >
 *   <Card />
 *   <Card />
 *   <Card />
 * </Flex>
 * 
 * // Container inline-flex para uso em linha com texto
 * <p>
 *   Texto com <Flex inline align="center" gap="4px">um ícone <Icon name="star" /></Flex> no meio.
 * </p>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Elementos filhos que serão renderizados dentro do contêiner flexível
 * @param {string} [props.className] - Classe CSS adicional para customização
 * @param {CSSProperties} [props.style] - Estilo inline opcional para customizações adicionais
 * @param {keyof React.JSX.IntrinsicElements} [props.as='div'] - Tipo de elemento HTML a ser renderizado
 * @param {CSSProperties['flexDirection']} [props.direction='row'] - Direção dos itens no layout flexível
 *   - "row": Itens dispostos horizontalmente (padrão)
 *   - "column": Itens dispostos verticalmente
 *   - "row-reverse": Itens dispostos horizontalmente em ordem inversa
 *   - "column-reverse": Itens dispostos verticalmente em ordem inversa
 * @param {CSSProperties['alignItems']} [props.align='stretch'] - Alinhamento dos itens ao longo do eixo transversal
 *   - "stretch": Itens esticados para preencher o contêiner (padrão)
 *   - "center": Itens centralizados
 *   - "flex-start": Itens alinhados ao início
 *   - "flex-end": Itens alinhados ao fim
 *   - "baseline": Itens alinhados pela linha de base do texto
 * @param {CSSProperties['justifyContent']} [props.justify='flex-start'] - Justificação dos itens no eixo principal
 *   - "flex-start": Itens alinhados ao início (padrão)
 *   - "center": Itens centralizados
 *   - "flex-end": Itens alinhados ao fim
 *   - "space-between": Espaço distribuído entre os itens
 *   - "space-around": Espaço distribuído ao redor dos itens
 *   - "space-evenly": Espaço distribuído uniformemente
 * @param {CSSProperties['flexWrap']} [props.wrap='nowrap'] - Quebra de linha dos itens
 *   - "nowrap": Sem quebra de linha (padrão)
 *   - "wrap": Quebra para a próxima linha quando necessário
 *   - "wrap-reverse": Quebra para a linha anterior quando necessário
 * @param {CSSProperties['gap']} [props.gap] - Espaçamento entre os itens (ex: "1rem", "8px")
 * @param {boolean} [props.inline=false] - Define se o contêiner será `display: inline-flex` ao invés de `flex`
 *
 * @returns {JSX.Element} O componente Flex renderizado
 */
export const Flex = ({
	children,
	className,
	style,
	as: Tag = "div",
	direction = "row",
	align = "stretch",
	justify = "flex-start",
	wrap = "nowrap",
	gap,
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
