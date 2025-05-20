import React from "react";
import { Typography } from "@porto-ocean/typography";
import { Button } from "@porto-ocean/button";
import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";
import type { CardContentProps } from "./types";

/**
 * Componente CardContent para exibir informações em formato de cartão.
 *
 * O componente CardContent fornece uma estrutura visual para apresentar conteúdo em formato de cartão,
 * incluindo imagem, título, descrição e botões de ação. É ideal para listagens de produtos,
 * serviços, artigos ou qualquer conteúdo que se beneficie de uma apresentação visual estruturada.
 *
 * @component
 * @example
 * ```tsx
 * // Card básico com título e descrição
 * <CardContent
 *   title="Seguro Auto"
 *   description="Proteção completa para seu veículo com as melhores coberturas."
 * />
 * 
 * // Card com imagem e botões
 * <CardContent
 *   theme="light"
 *   title="Plano de Saúde"
 *   description="Cuidado completo para você e sua família com a melhor rede credenciada."
 *   image={<img src="/images/saude.jpg" alt="Plano de Saúde" />}
 *   buttons={[
 *     {
 *       label: "Saiba mais",
 *       variant: "health",
 *       styles: "secondary",
 *       size: "small"
 *     },
 *     {
 *       label: "Contratar",
 *       variant: "health",
 *       styles: "primary",
 *       size: "small"
 *     }
 *   ]}
 * />
 * 
 * // Card com tema escuro e propriedades personalizadas para título
 * <CardContent
 *   theme="dark"
 *   title="Investimentos"
 *   titleProps={{ variant: "title4", color: "portoSeguros100" }}
 *   description="As melhores opções de investimento para seu perfil."
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {'light' | 'dark'} [props.theme='light'] - Tema visual do cartão
 *   - "light": Tema claro com fundo branco (padrão)
 *   - "dark": Tema escuro com fundo preto
 * @param {ReactNode} [props.title] - Título do cartão
 * @param {TypographyProps} [props.titleProps] - Propriedades adicionais para personalizar o componente Typography do título
 * @param {ReactNode} [props.description] - Descrição ou conteúdo principal do cartão
 * @param {TypographyProps} [props.descriptionProps] - Propriedades adicionais para personalizar o componente Typography da descrição
 * @param {ReactNode} [props.image] - Elemento de imagem a ser exibido no topo do cartão
 * @param {CardContentButton[]} [props.buttons=[]] - Array de configurações para botões de ação
 *   Cada botão pode incluir: label, variant, styles, size, onClick, href, etc.
 * @param {string} [props.className=''] - Classes CSS adicionais para personalização
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento div raiz
 *
 * @returns {JSX.Element} O componente CardContent renderizado
 */

export const CardContent = ({
	theme = "light",
	title,
	titleProps,
	description,
	descriptionProps,
	image,
	buttons = [],
	className = "",
	...restProps
}: CardContentProps) => {
	return (
		<div
			className={joinClasses(["card-content__root", `--${theme}`, className])}
			{...restProps}
		>
			{/* Image Section */}
			{image && <div className="card-content__image">{image}</div>}

			{/* Content Section */}
			<div className="card-content__content">
				{/* Title */}
				{title && (
					<Typography
						as="h3"
						variant="title5"
						weight="bold"
						className="card-content__title"
						{...titleProps}
					>
						{title}
					</Typography>
				)}

				{/* Description */}
				{description && (
					<Typography
						as="p"
						variant="body2"
						className="card-content__description"
						{...descriptionProps}
					>
						{description}
					</Typography>
				)}

				{/* Buttons */}
				{buttons.length > 0 && (
					<div className="card-content__buttons">
						{buttons.map((button, index) => (
							<Button
								key={`button-${index}`}
								variant={button.variant}
								size={button.size}
								onClick={button.onClick}
								href={button.href}
								{...button}
							>
								{button.label}
							</Button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
