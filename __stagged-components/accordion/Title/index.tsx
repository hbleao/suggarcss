import { joinClasses } from "@porto-ocean/utils";

import type { TitleProps } from "./types";

/**
 * Accordion Title Component
 *
 * @component
 * @example
 * <Accordion.Title as="h2" variant="body1" weight="bold">
 *   Section Title
 * </Accordion.Title>
 *
 * @param {Object} props - Component props
 * @param {string} [props.as='h2'] - HTML tag to render
 * @param {'light' | 'regular' | 'bold'} [props.weight='bold'] - Font weight
 * @param {string} [props.variant='body1'] - Typography variant
 * @param {string} [props.className] - Additional CSS class
 * @param {React.ReactNode} props.children - Title content
 * @returns {JSX.Element} Accordion section title
 */

export const Title = ({
	as = "h2",
	weight = "bold",
	variant = "body1",
	className = "",
	children,
	...restProps
}: TitleProps) => {
	return (
		<p className={joinClasses(["accordion__title", className])} {...restProps}>
			{children}
		</p>
	);
};
