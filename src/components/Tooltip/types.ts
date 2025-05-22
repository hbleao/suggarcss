import type { HTMLAttributes, ReactNode } from "react";

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
	content: ReactNode;
	children: ReactNode;
	position?: "top" | "right" | "bottom" | "left";
	isOpen?: boolean;
	className?: string;
	contentClassName?: string;
	triggerClassName?: string;
	onOpen?: () => void;
	onClose?: () => void;
};
