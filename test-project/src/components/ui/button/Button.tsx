import styles from "./button.module.scss";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
	return (
		<button className={`${styles.button} ${className}`} {...props}>
			{children}
		</button>
	);
}
