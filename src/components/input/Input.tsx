import styles from "./input.module.scss";
import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = "", error, label, id, ...props }, ref) => {
		const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

		return (
			<div className={styles.inputContainer}>
				{label && (
					<label htmlFor={inputId} className={styles.label}>
						{label}
					</label>
				)}
				<input
					id={inputId}
					ref={ref}
					className={`${styles.input} ${error ? styles.error : ""} ${className}`}
					{...props}
				/>
				{error && <p className={styles.errorMessage}>{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";
