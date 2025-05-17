import "./styles.scss";

import type { AccordionProps } from "./types";

/**
 * Componente Accordion para exibição de seções de conteúdo retráteis.
 *
 * O componente Accordion oferece uma maneira de alternar a visibilidade de seções
 * de conteúdo, ajudando a organizar e apresentar informações em um formato compacto.
 * Quando um usuário clica no cabeçalho do accordion, a seção de conteúdo expande ou recolhe.
 *
 * @component
 * @example
 * ```tsx
 * <Accordion
 *   variant="default"
 *   border="base"
 *   title="Perguntas Frequentes"
 * >
 *   <p>Este é o conteúdo do accordion que pode ser alternado.</p>
 * </Accordion>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {"default" | "negative"} [props.variant="default"] - Variante de estilo visual do accordion
 *   - "default": Fundo claro com texto escuro
 *   - "negative": Fundo escuro (portoSeguros100) com texto claro
 * @param {"top" | "none" | "base"} [props.border="base"] - Estilo de borda do accordion
 *   - "top": Cantos arredondados no topo (0.4rem)
 *   - "none": Sem cantos arredondados
 *   - "base": Cantos arredondados na parte inferior (0.4rem)
 * @param {React.ReactNode} props.children - Conteúdo a ser exibido dentro do accordion quando expandido
 * @param {string} props.title - Texto do título exibido no cabeçalho do accordion
 *
 * @returns {JSX.Element} O componente Accordion renderizado
 */
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
				<div className="accordion__icon">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="dropdown__icon"
					>
						<title>arrow</title>
						<path
							d="M9.98337 13.9503C9.88337 13.9503 9.7667 13.917 9.68337 13.8337L2.6167 6.78366C2.45003 6.61699 2.45003 6.35033 2.6167 6.20033C2.78337 6.03366 3.03337 6.03366 3.20003 6.20033L9.9667 12.9503L16.7667 6.16699C16.9334 6.00033 17.2 6.00033 17.35 6.16699C17.5167 6.33366 17.5167 6.60033 17.35 6.75033L10.25 13.8337C10.25 13.8337 10.0667 13.9503 9.95003 13.9503"
							fill="#808080"
						/>
					</svg>
				</div>
				<div className="accordion__content">{children}</div>
			</div>
		</div>
	);
};
