import { useEffect, useState } from "react";

import { useMediaQuery, useWindowSize } from "@/hooks";

import type { ColumnProps } from "./types";

/**
 * Componente de coluna baseado em Grid CSS responsivo com suporte a breakpoints, aplica classes como `col-6`, `col-desktop-3`, etc .
 *
 * @param children - Conteúdo do componente.
 * @param span - Quantidade de colunas a ocupar no layout padrão (mobile-first), Varia de 1 a 12.
 * @param tabletPortrait - Quantidade de colunas no breakpoint `tablet-portrait` (≥ 768px), Varia de 1 a 12.
 * @param tabletLandscape - Quantidade de colunas no breakpoint `tablet-landscape` (≥ 1024px), Varia de 1 a 12.
 * @param desktop - Quantidade de colunas no breakpoint `desktop` (≥ 1224px), Varia de 1 a 12.
 * @param wide - Quantidade de colunas no breakpoint `wide` (≥ 1600px), Varia de 1 a 12
 *
 */

export function Column({
	children,
	mobile = [1, 9],
	tabletPortrait = [1, 9],
	tabletLandscape = [1, 13],
	desktop = [1, 13],
	wide = [1, 13],
	...props
}: ColumnProps) {
	const isMobile = useMediaQuery("(min-width: 600px)");
	const isPortrait = useMediaQuery("(min-width: 1024px)");
	const isLandScape = useMediaQuery("(min-width: 1240px)");
	const isDesktop = useMediaQuery("(min-width: 1440px)");
	const isWide = useMediaQuery("(min-width: 1600px)");
	const { width } = useWindowSize();
	const [gridColumn, setGridColumn] = useState(isMobile ? [1, 9] : [1, 13]);

	function handleCurrentMedia() {
		if (isWide) {
			setGridColumn(wide);
			return;
		}

		if (isDesktop) {
			setGridColumn(desktop);
			return;
		}

		if (isLandScape) {
			setGridColumn(tabletLandscape);
			return;
		}

		if (isPortrait) {
			setGridColumn(tabletPortrait);
			return;
		}

		if (isMobile) {
			setGridColumn(mobile);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		handleCurrentMedia();
	}, [width]);

	return (
		<div
			style={{
				gridColumnStart: gridColumn[0],
				gridColumnEnd: gridColumn[1],
				scrollbarWidth: "none",
			}}
			{...props}
		>
			{children}
		</div>
	);
}
