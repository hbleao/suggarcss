export interface AccordionProps {
	variant?: "default" | "negative";
	border?: "base" | "top" | "none";
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
	onToggle?: (isOpen: boolean) => void;
}
