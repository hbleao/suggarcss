// components/Column.tsx

import styles from "./column.module.scss";
import clsx from "clsx";

export interface ColumnProps {
	/**
	 * Conteúdo do componente.
	 */
	children: React.ReactNode;

	/**
	 * Quantidade de colunas a ocupar no layout padrão (mobile-first).
	 * Varia de 1 a 12.
	 */
	span?: number;

	/**
	 * Quantidade de colunas no breakpoint `tablet-portrait` (≥ 768px).
	 * Varia de 1 a 12.
	 */
	tabletPortrait?: number;

	/**
	 * Quantidade de colunas no breakpoint `tablet-landscape` (≥ 1024px).
	 * Varia de 1 a 12.
	 */
	tabletLandscape?: number;

	/**
	 * Quantidade de colunas no breakpoint `desktop` (≥ 1224px).
	 * Varia de 1 a 12.
	 */
	desktop?: number;

	/**
	 * Quantidade de colunas no breakpoint `wide` (≥ 1600px).
	 * Varia de 1 a 12.
	 */
	wide?: number;

	/**
	 * Classe adicional para estilização customizada.
	 */
	className?: string;
}

/**
 * Componente de coluna baseado em Grid CSS responsivo com suporte a breakpoints.
 *
 * Aplica classes como `col-6`, `col-desktop-3`, etc.
 */
export function Column({
	children,
	span,
	tabletPortrait,
	tabletLandscape,
	desktop,
	wide,
	className,
}: ColumnProps) {
	const classes = clsx(
		className,
		span && `col-${span}`,
		tabletPortrait && `col-tablet-portrait-${tabletPortrait}`,
		tabletLandscape && `col-tablet-landscape-${tabletLandscape}`,
		desktop && `col-desktop-${desktop}`,
		wide && `col-wide-${wide}`,
	);

	return <div className={classes}>{children}</div>;
}
