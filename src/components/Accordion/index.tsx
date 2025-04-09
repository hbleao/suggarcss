import "./styles.scss";

import type { AccordionProps } from "./types";

export const Accordion = ({
	variant = "default",
	border = "base",
	children,
	title,
}: AccordionProps) => {
	return (
		<div className={`accordion__root --${variant} --border-${border}`}>
			<div className="accordion__trigger">
				<div className="accordion__title">{title}</div>
				<div className="accordion__icon">icon</div>
				<div className="accordion__content">{children}</div>
			</div>
		</div>
	);
};
