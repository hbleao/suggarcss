export type RadioProps = {
	className?: string;
	variant?: string;
	description?: string;
	checked?: boolean;
	disabled?: boolean;
	onChange?: (checked: boolean) => void; // <-- aqui o fix
};
