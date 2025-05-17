import "./styles.scss";

import type { TypographyProps } from "./types";

/**
 * Componente Typography para exibição de textos com estilos consistentes.
 *
 * O componente Typography é a base do sistema tipográfico, permitindo a exibição de
 * textos com diferentes estilos, tamanhos, pesos e cores. Ele garante consistência
 * visual em toda a aplicação e segue as diretrizes de design do sistema.
 *
 * @component
 * @example
 * ```tsx
 * <Typography
 *   variant="title1"
 *   as="h1"
 *   color="portoSegurosPrimary"
 *   weight="bold"
 * >
 *   Título da Página
 * </Typography>
 * 
 * <Typography
 *   variant="body1"
 *   as="p"
 *   color="black70"
 * >
 *   Este é um parágrafo de texto com estilo body1 e cor black70.
 * </Typography>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} [props.children="Typography"] - Conteúdo de texto a ser exibido
 * @param {HeadingTypes} [props.variant="title1"] - Variante tipográfica que define o tamanho e estilo do texto
 *   - "title1" a "title6": Estilos para títulos em ordem decrescente de tamanho
 *   - "body1", "body2": Estilos para texto de parágrafo
 *   - "caption": Estilo para legendas e textos secundários menores
 *   - "label": Estilo para rótulos de formulários
 *   - "overline": Estilo para textos pequenos acima de títulos
 *   - "button": Estilo para textos em botões
 * @param {HeadingTags} [props.as="h1"] - Tag HTML a ser utilizada para renderizar o texto
 *   - "h1" a "h6": Tags para títulos com diferentes níveis semânticos
 *   - "p": Tag para parágrafos
 *   - "span": Tag para textos em linha
 *   - "label": Tag para rótulos de formulários
 * @param {Color} [props.color="black100"] - Cor do texto (do tipo Color)
 * @param {Weight} [props.weight="regular"] - Peso da fonte
 *   - "light": Fonte leve (300)
 *   - "regular": Fonte normal (400)
 *   - "medium": Fonte média (500)
 *   - "semibold": Fonte semi-negrito (600)
 *   - "bold": Fonte negrito (700)
 * @param {FontStyle} [props.fontStyle="normal"] - Estilo da fonte
 *   - "normal": Estilo normal
 *   - "italic": Estilo itálico
 * @param {string} [props.className=""] - Classes CSS adicionais
 * @param {React.HTMLAttributes<HTMLElement>} props.restProps - Outras propriedades HTML válidas
 *
 * @returns {JSX.Element} O componente Typography renderizado com a tag HTML especificada
 */

export const Typography = ({
	children = "Typography",
	variant = "title1",
	as = "h1",
	color = "black100",
	weight = "regular",
	fontStyle = "normal",
	className = "",
	...restProps
}: TypographyProps) => {
	const Component = as;

	return (
		<Component
			className={`typography --${variant} --color-${color} --font-weight-${weight} --font-style-${fontStyle} ${className}`}
			{...restProps}
		>
			{children}
		</Component>
	);
};
