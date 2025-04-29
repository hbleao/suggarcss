import "./styles.scss";
import { useState, useRef, useEffect } from "react";
import { clsx } from "@/utils/clsx";
import type { AccordionProps } from "./types";

export const Accordion = ({
	variant = "default",
	border = "base",
	title,
	children,
	defaultOpen = false,
	onToggle,
}: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
		onToggle?.(!isOpen);
	};

	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		if (isOpen) {
			content.style.display = "block";
			const height = content.scrollHeight;
			content.style.height = "0px";

			requestAnimationFrame(() => {
				content.style.transition = "height 0.4s ease";
				content.style.height = `${height}px`;
			});

			const clearHeight = () => {
				content.style.height = "auto";
				content.removeEventListener("transitionend", clearHeight);
			};

			content.addEventListener("transitionend", clearHeight);
		} else {
			const height = content.scrollHeight;
			content.style.height = `${height}px`;

			requestAnimationFrame(() => {
				content.style.transition = "height 0.4s ease";
				content.style.height = "0px";
			});
		}
	}, [isOpen]);

	return (
		<div
			className={clsx("accordion__root", `--${variant}`, `--border-${border}`)}
		>
			<button
				className="accordion__trigger"
				onClick={toggleAccordion}
				aria-expanded={isOpen}
				aria-controls="accordion-content"
				type="button"
			>
				<div className="accordion__title">{title}</div>
				<div
					className={clsx("accordion__icon", {
						"accordion__icon--open": isOpen,
					})}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>arrow</title>
						<path
							d="M9.98337 13.9503C9.88337 13.9503 9.7667 13.917 9.68337 13.8337L2.6167 6.78366C2.45003 6.61699 2.45003 6.35033 2.6167 6.20033C2.78337 6.03366 3.03337 6.03366 3.20003 6.20033L9.9667 12.9503L16.7667 6.16699C16.9334 6.00033 17.2 6.00033 17.35 6.16699C17.5167 6.33366 17.5167 6.60033 17.35 6.75033L10.25 13.8337C10.25 13.8337 10.0667 13.9503 9.95003 13.9503"
							fill="#808080"
						/>
					</svg>
				</div>
			</button>
			<div
				ref={contentRef}
				id="accordion-content"
				className="accordion__content"
				style={{
					overflow: "hidden",
					height: "0px",
				}}
			>
				{children}
			</div>
		</div>
	);
};
