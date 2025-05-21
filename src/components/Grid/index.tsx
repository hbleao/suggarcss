import styles from "./styles.module.scss";

import { clsx } from "@/utils/clsx";
import { useMediaQuery } from "@/hooks";

import type { GridProps } from "./types";

/**
 * `Grid` — Componente de layout baseado em CSS Grid.
 *
 * Define a estrutura de colunas e o espaçamento entre os elementos filhos,
 * adaptando-se responsivamente entre 8 colunas (mobile/tablet) e 12 colunas (desktop).
 *
 * Ideal para composições flexíveis com o componente `Column`, permitindo posicionamentos variados conforme o span.
 *
 * @component
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.background=''] - Cor de fundo aplicada ao grid (pode ser hex, nome de cor ou variável CSS)
 * @param {React.ReactNode} props.children - Elementos filhos a serem posicionados dentro do grid
 * @param {string} [props.gap='1rem'] - Espaçamento entre colunas e linhas. Pode usar unidades como `"1rem"`, `"16px"`, `"var(--space-md)"`, etc.
 * @param {string} [props.className] - Classe CSS adicional para estilização externa
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Outras props HTML válidas aplicáveis à `div` raiz
 *
 * @example
 * <Grid gap="2rem">
 *   <Column span={[1, 6]}>Coluna 1</Column>
 *   <Column span={[1, 6]}>Coluna 2</Column>
 * </Grid>
 *
 * @example
 * <Grid background="#f0f0f0" gap="1rem">
 *   <Column span={[1, 12]}>Conteúdo centralizado</Column>
 * </Grid>
 *
 * @returns {JSX.Element} Elemento JSX representando o grid renderizado
 */

export function Grid({
	background = "",
	children,
	gap = "1rem",
	className,
	...props
}: GridProps) {
	const isPortrait = useMediaQuery("(max-width: 1024px)");

	return (
		<div
			className={clsx(styles.grid, className)}
			style={{
				gridTemplateColumns: `repeat(${isPortrait ? 8 : 12}, 1fr)`,
				gap,
				background,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
