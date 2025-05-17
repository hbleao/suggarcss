import React from "react";
import { Typography } from "@porto-ocean/typography";
import { Button } from "@porto-ocean/button";
import { Icon } from "@porto-ocean/icon";
import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";
import type { BannerBodyProps } from "./types";

/**
 * Componente BannerBody para exibição de conteúdo e imagem lado a lado ou empilhados.
 *
 * O componente BannerBody é um banner versátil que pode exibir vários elementos de conteúdo
 * incluindo título, subtítulo, lista de benefícios, botões e uma imagem. Suporta diferentes
 * layouts para visualizações em dispositivos móveis e desktop, com posicionamento personalizável da imagem.
 *
 * @component
 * @example
 * ```tsx
 * <BannerBody
 *   theme="light"
 *   bgColor="offWhite05"
 *   imageDesktopPosition="right"
 *   imageMobilePosition="down"
 *   preTitle="Novo"
 *   title="Título do Banner"
 *   subtitle="Subtítulo do Banner"
 *   benefits={[
 *     { text: "Benefício 1", icon: { iconName: "check" } },
 *     { text: "Benefício 2", icon: { iconName: "check" } }
 *   ]}
 *   buttons={[
 *     { label: "Saiba mais", variant: "primary" }
 *   ]}
 *   textNote="*Consulte o regulamento"
 *   image={<img src="/banner.jpg" alt="Banner" />}
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {"light" | "dark"} [props.theme="light"] - Tema de cores do banner
 *   - "light": Fundo claro com texto escuro
 *   - "dark": Fundo escuro com texto claro
 * @param {Color} [props.bgColor="offWhite05"] - Cor de fundo do banner (do tipo Color)
 * @param {"up" | "down"} [props.imageMobilePosition="down"] - Posição da imagem em dispositivos móveis
 *   - "up": Imagem aparece acima do conteúdo
 *   - "down": Imagem aparece abaixo do conteúdo
 * @param {"left" | "right"} [props.imageDesktopPosition="left"] - Posição da imagem em dispositivos desktop
 *   - "left": Imagem aparece à esquerda do conteúdo
 *   - "right": Imagem aparece à direita do conteúdo
 * @param {ReactNode} [props.preTitle] - Texto pequeno exibido acima do título
 * @param {ReactNode} [props.title] - Título principal do banner
 * @param {ReactNode} [props.subtitle] - Subtítulo exibido abaixo do título
 * @param {BannerBodyBenefit[]} [props.benefits=[]] - Array de benefícios para exibir como lista
 *   - Cada benefício pode ter texto e um ícone opcional
 * @param {BannerBodyButton[]} [props.buttons=[]] - Array de botões para exibir
 *   - Cada botão estende ButtonProps e requer um label
 * @param {ReactNode} [props.textNote] - Pequena nota de texto exibida na parte inferior do conteúdo
 * @param {ReactNode} [props.image] - Imagem para exibir no banner
 * @param {TypographyProps} [props.preTitleProps] - Props adicionais para o componente Typography do preTitle
 * @param {TypographyProps} [props.titleProps] - Props adicionais para o componente Typography do título
 * @param {TypographyProps} [props.subtitleProps] - Props adicionais para o componente Typography do subtítulo
 * @param {string} [props.className=""] - Nomes de classes CSS adicionais para o banner
 *
 * @returns {JSX.Element} O componente BannerBody renderizado
 */

export const BannerBody = ({
	theme = "light",
	bgColor = "offWhite05",
	imageMobilePosition = "down",
	imageDesktopPosition = "left",
	preTitle,
	title,
	subtitle,
	benefits = [],
	buttons = [],
	textNote,
	image,
	preTitleProps,
	titleProps,
	subtitleProps,
	className = "",
}: BannerBodyProps) => {
	return (
		<section
			className={joinClasses([
				"banner-body__root",
				`--${theme}`,
				`--bg-${bgColor}`,
				imageMobilePosition,
				imageDesktopPosition,
				className,
			])}
		>
			{/* Content Section */}
			<div className="banner-body__content">
				{/* Pre Title */}
				{preTitle && (
					<Typography
						as="span"
						variant="overline"
						weight="bold"
						className="banner-body__pretitle"
						{...preTitleProps}
					>
						{preTitle}
					</Typography>
				)}

				{/* Title */}
				{title && (
					<Typography
						as="h2"
						variant="title3"
						weight="bold"
						className="banner-body__title"
						{...titleProps}
					>
						{title}
					</Typography>
				)}

				{/* Subtitle */}
				{subtitle && (
					<Typography
						as="p"
						variant="subtitle1"
						weight="semibold"
						className="banner-body__subtitle"
						{...subtitleProps}
					>
						{subtitle}
					</Typography>
				)}

				{/* Benefits */}
				{benefits.length > 0 && (
					<ul className="banner-body__benefits">
						{benefits.map((benefit, index) => (
							<li key={`benefit-${index}`} className="banner-body__benefit">
								{benefit.icon && (
									<Icon
										iconName={benefit.icon.iconName}
										size="text-md"
										{...benefit.icon}
									/>
								)}
								<p className="banner-body__text">{benefit.text}</p>
							</li>
						))}
					</ul>
				)}

				{/* Buttons */}
				{buttons.length > 0 && (
					<div className="banner-body__buttons">
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

				{/* Text Note */}
				{textNote && <div className="banner-body__text-note">{textNote}</div>}
			</div>

			{/* Image Section */}
			{image && <div className="banner-body__image">{image}</div>}
		</section>
	);
};
