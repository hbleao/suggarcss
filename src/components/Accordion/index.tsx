import { useState } from "react";
import "./styles.scss";

import type { AccordionProps } from "./types";

export const Accordion = ({
	title,
	width = "fluid",
	variant = "default",
	border = "base",
	children,
}: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={`accordion__root --${variant} --border-${border} --${width}`}
		>
			<div
				className="accordion__trigger"
				onClick={() => setIsOpen((oldState) => !oldState)}
				onKeyDown={() => setIsOpen((oldState) => !oldState)}
			>
				<div className="accordion__title">{title}</div>
				<div className="accordion__icon">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={`accordion__icon --${isOpen ? "up" : "down"}`}
					>
						<title>arrow</title>
						<path d="M9.98337 13.9503C9.88337 13.9503 9.7667 13.917 9.68337 13.8337L2.6167 6.78366C2.45003 6.61699 2.45003 6.35033 2.6167 6.20033C2.78337 6.03366 3.03337 6.03366 3.20003 6.20033L9.9667 12.9503L16.7667 6.16699C16.9334 6.00033 17.2 6.00033 17.35 6.16699C17.5167 6.33366 17.5167 6.60033 17.35 6.75033L10.25 13.8337C10.25 13.8337 10.0667 13.9503 9.95003 13.9503" />
					</svg>
				</div>
			</div>
			{isOpen && <div className="accordion__content">{children}</div>}
		</div>
	);
};
