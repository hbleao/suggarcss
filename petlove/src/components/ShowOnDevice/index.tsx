import { clsx } from "@/utils/clsx";
import "./styles.scss";

import type { ShowOnDeviceProps } from "./types";

/**
 * `ShowOnDevice` — Componente utilitário para exibir conteúdo condicionalmente com base em media queries.
 *
 * Usado para renderizar elementos somente em determinados tamanhos de tela (como mobile, tablet ou desktop)
 * ou para criar condições de visibilidade baseadas em breakpoints definidos por CSS.
 *
 * A lógica de exibição depende de classes CSS (`lessThan`, `greaterThan`) e da combinação com o nome do media breakpoint.
 * Exige configuração prévia no CSS com os breakpoints correspondentes.
 *
 * @component
 *
 * @param {Object} props - Propriedades do componente
 * @param {'lessThan' | 'greaterThan'} props.orientation - Define a direção da visibilidade:
 * - `"lessThan"`: o conteúdo será visível **abaixo** do breakpoint
 * - `"greaterThan"`: o conteúdo será visível **acima** do breakpoint
 * @param {string} props.media - Nome do breakpoint (ex: `'mobile'`, `'tablet'`, `'desktop'`)
 * @param {React.ReactNode} props.children - Elementos filhos que serão exibidos condicionalmente
 *
 * @example
 * // Exibe conteúdo somente em telas menores que "tablet"
 * <ShowOnDevice orientation="lessThan" media="tablet">
 *   <MobileNavigation />
 * </ShowOnDevice>
 *
 * @example
 * // Exibe conteúdo somente em telas maiores que "desktop"
 * <ShowOnDevice orientation="greaterThan" media="desktop">
 *   <Sidebar />
 * </ShowOnDevice>
 *
 * @returns {JSX.Element} Elemento que encapsula o conteúdo com classes condicionais de visibilidade
 */

export const ShowOnDevice = ({
	orientation,
	media,
	children,
	...props
}: ShowOnDeviceProps) => {
	const orientationClass = orientation === "greaterThan" ? "greaterThan" : "lessThan";

	const classes = clsx(
		"show-on-device",
		orientationClass,
		media
	);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
};
