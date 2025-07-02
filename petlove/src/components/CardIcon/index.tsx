import "./styles.scss";

import { Typography } from "../Typography";

import type { CardIconProps } from "./types";

/**
 * Componente `CardIcon` que exibe um card com ícone, título, pré-título e descrição.
 *
 * Pode atuar como um link clicável quando a propriedade `href` é fornecida.
 *
 * @component
 * @param {Object} props - As propriedades do componente CardIcon
 * @param {React.ReactNode} [props.icon] - Ícone a ser exibido no topo do card
 * @param {React.ReactNode} [props.preTitle] - Texto auxiliar exibido antes do título
 * @param {React.ReactNode} [props.title] - Título principal do card
 * @param {React.ReactNode} [props.description] - Descrição complementar
 * @param {'link' | 'static'} [props.variant='link'] - Variante visual (interativa ou estática)
 * @param {'light' | 'dark'} [props.theme='light'] - Tema visual do card
 * @param {string} [props.href] - URL para tornar o card clicável
 * @param {object} [props.titleProps] - Propriedades adicionais para o título
 * @param {object} [props.descriptionProps] - Propriedades adicionais para a descrição
 * @returns {JSX.Element} O componente CardIcon renderizado
 */
export const CardIcon = ({
	icon,
	preTitle,
	title,
	description,
	variant = "static",
	href,
	titleProps,
	descriptionProps,
	...restProps
}: CardIconProps) => {
	const rootClassName = `card-icon__root --${variant === "link" ? "link" : "withoutLink"}`;

	return (
		<div className={rootClassName} {...restProps}>
			{icon && <div className="card-icon__icon">{icon}</div>}

			{preTitle && (
				<Typography
					as="span"
					variant="body2"
					weight="regular"
					className="card-icon__pretitle"
				>
					{preTitle}
				</Typography>
			)}

			{title && (
				<Typography
					as="h3"
					variant="body1"
					weight="bold"
					className="card-icon__title"
					{...titleProps}
				>
					{title}
				</Typography>
			)}

			{description && (
				<Typography
					as="p"
					variant="body2"
					weight="regular"
					className="card-icon__description"
					{...descriptionProps}
				>
					{description}
				</Typography>
			)}
		</div>
	);
};
