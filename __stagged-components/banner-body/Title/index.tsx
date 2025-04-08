import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";

/**
 * Componente Title - Exibe o título principal do Banner Body
 *
 * @component
 * @example
 * ```tsx
 * <Title className="custom-class">
 *   Título principal
 * </Title>
 * ```
 *
 * @param {string} [className=''] - Classes CSS adicionais
 * @param {ReactNode} children - Texto do título
 * @param {TypographyProps} restProps - Propriedades do componente Typography
 *
 * @returns {JSX.Element} Componente Typography configurado como título
 */
export const Title = ({ className = "", children, ...restProps }: any) => {
	return (
		<p
			variant="title3"
			weight="bold"
			as="h2"
			color="black100"
			className={joinClasses(["banner-body__title", className])}
			{...restProps}
		>
			{children}
		</p>
	);
};
