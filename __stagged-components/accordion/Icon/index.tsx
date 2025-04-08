import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";

import type { IconProps } from "./types";

/**
 * Accordion Icon Component
 *
 * @component
 * @example
 * <Accordion.Icon isOpen={true} />
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS class
 * @param {boolean} [props.isOpen=false] - Controls icon direction (up/down)
 * @param {React.ReactNode} props.children - Icon content
 * @returns {JSX.Element} Accordion icon with animated arrow
 */

export const Icon = ({
	isOpen,
	className = "",
	children,
	...restProps
}: IconProps) => {
	const iconClass = isOpen ? "--up" : "--down";

	return (
		<div
			className={joinClasses(["accordion__icon", iconClass, className])}
			{...restProps}
		>
			<p>icon</p>
		</div>
	);
};
