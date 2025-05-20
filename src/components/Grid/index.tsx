import styles from "./styles.module.scss";

import { clsx } from "@/utils/clsx";

import { useMediaQuery } from "@/hooks";
import type { GridProps } from "./types";

/**
 * Componente Grid baseado em CSS Grid Layout.
 *
 * Responsável por definir o número de colunas e o espaçamento entre os elementos.
 *
 * @param children - Elementos filhos a serem posicionados dentro do grid.
 * @param columns - Número de colunas na grid
 * @param gap - Espaçamento entre os itens do grid (gap), pode usar valores como `"16px"`, `"1rem"` ou variáveis CSS como `"var(--space-md)"`
 * @param className - Classe CSS adicional para personalização do grid.
 *
 * @example
 * ```tsx
 * <Grid columns={12} gap="2rem">
 *   <Column span={[1,6]}>Coluna 1</Column>
 *   <Column span={[1,6]}>Coluna 2</Column>
 * </Grid>
 * ```
 */

export function Grid({
	background = "",
	children,
	gap = "1rem",
	className,
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
		>
			{children}
		</div>
	);
}
