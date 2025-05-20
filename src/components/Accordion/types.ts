export interface AccordionProps {
	title: string;
	variant?: "default" | "negative";
	border?: "top" | "none" | "base";
	width?: "fluid" | "contain";
	children?: React.ReactNode;
}
