export interface AccordionProps {
	variant: "default" | "negative";
	border: "top" | "none" | "base";
	children: React.ReactNode;
	title: string;
}
