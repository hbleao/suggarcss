import { useState } from "react";
import "./styles.scss";

import type { AccordionProps } from "./types";

/**
 * Componente Accordion que permite exibir e ocultar conteúdo em seções expansíveis.
 *
 * @component
 * @param {Object} props - As propriedades do componente Accordion
 * @param {string} props.title - Título do accordion que será sempre visível
 * @param {"fluid" | "contain"} [props.width="fluid"] - Largura do accordion (fluid: ocupa todo o espaço disponível, contain: ajustado ao conteúdo)
 * @param {"default" | "negative"} [props.variant="default"] - Variante visual do accordion
 * @param {"base" | "top" | "none"} [props.border="base"] - Estilo da borda do accordion
 * @param {React.ReactNode} props.children - Conteúdo que será exibido quando o accordion estiver expandido
 *
 * @example
 * // Accordion básico
 * <Accordion title="Título do Accordion">
 *   <p>Conteúdo do accordion que será exibido quando expandido.</p>
 * </Accordion>
 *
 * @example
 * // Accordion com variante e borda personalizadas
 * <Accordion title="Perguntas Frequentes" variant="negative" border="top">
 *   <div>
 *     <h3>Como funciona?</h3>
 *     <p>Explicação detalhada aqui...</p>
 *   </div>
 * </Accordion>
 *
 * @returns {JSX.Element} Componente Accordion renderizado
 */

export const Accordion = ({
	title,
	width = "fluid",
	variant = "default",
	border = "base",
	children,
	...props
}: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={`accordion__root --${variant} --border-${border} --${width}`}
			{...props}
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
						data-testid="arrow-icon"
					>
						<path 
							d="M9.98337 13.9503C9.88337 13.9503 9.7667 13.917 9.68337 13.8337L2.6167 6.78366C2.45003 6.61699 2.45003 6.35033 2.6167 6.20033C2.78337 6.03366 3.03337 6.03366 3.20003 6.20033L9.9667 12.9503L16.7667 6.16699C16.9334 6.00033 17.2 6.00033 17.35 6.16699C17.5167 6.33366 17.5167 6.60033 17.35 6.75033L10.25 13.8337C10.25 13.8337 10.0667 13.9503 9.95003 13.9503" 
						/>
					</svg>
					{/* Elemento para os testes */}
					<span 
						className={isOpen ? "--up" : "--down"} 
						title="arrow" 
					/>
				</div>
			</div>
			{isOpen && <div className="accordion__content">{children}</div>}
		</div>
	);
};
