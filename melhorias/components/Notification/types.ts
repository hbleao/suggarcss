export type NotificationProps = {
	variant?:
		| "default"
		| "outlined"
		| "information"
		| "attention"
		| "success"
		| "error";

	title: string;
	icon: React.ReactNode;
	description: string;
	className?: string;
	link?: {
		label: string;
		href: string;
	};
};
