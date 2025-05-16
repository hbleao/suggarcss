// components/Grid.tsx

import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./grid.module.scss";

/**
 * Props para o componente Grid.
 */
interface GridProps {
	/**
	 * Elementos filhos a serem posicionados dentro do grid.
	 */
	children: ReactNode;

	/**
	 * Número de colunas na grid.
	 * Valor padrão é 12.
	 * @example
	 * ```tsx
	 * <Grid columns={6}>...</Grid>
	 * ```
	 */
	columns?: number;

	/**
	 * Espaçamento entre os itens do grid (gap).
	 * Pode usar valores como `"16px"`, `"1rem"` ou variáveis CSS como `"var(--space-md)"`.
	 */
	gap?: string;

	/**
	 * Classe CSS adicional para personalização do grid.
	 */
	className?: string;
}

/**
 * Componente Grid baseado em CSS Grid Layout.
 *
 * Responsável por definir o número de colunas e o espaçamento entre os elementos.
 *
 * @example
 * ```tsx
 * <Grid columns={12} gap="2rem">
 *   <Column span={6}>Coluna 1</Column>
 *   <Column span={6}>Coluna 2</Column>
 * </Grid>
 * ```
 */
export function Grid({
	children,
	columns = 12,
	gap = "1rem",
	className,
}: GridProps) {
	return (
		<div
			className={clsx(styles.grid, className)}
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}
		>
			{children}
		</div>
	);
}
