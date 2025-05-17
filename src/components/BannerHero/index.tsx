import React from "react";
import { Grid } from "@porto-ocean/grid";
import { Row } from "@porto-ocean/row";
import { Typography } from "@porto-ocean/typography";
import { Button } from "@porto-ocean/button";
import { joinClasses } from "@porto-ocean/utils";

import "./styles.scss";
import type { BannerHeroProps } from "./types";

/**
 * Componente BannerHero para exibição de banners principais com imagem e conteúdo.
 *
 * O componente BannerHero é projetado para criar banners de destaque (hero banners) 
 * que podem incluir título, subtítulo, texto descritivo, botões de ação, links para 
 * lojas de aplicativos e uma imagem principal. É ideal para seções de destaque em 
 * páginas iniciais, landing pages e cabeçalhos de campanha.
 *
 * @component
 * @example
 * ```tsx
 * <BannerHero
 *   theme="light"
 *   bgColor="portoSaudePrimary"
 *   title="Título Principal"
 *   subtitle="Subtítulo do Banner"
 *   text="Texto descritivo do banner que explica mais detalhes sobre o conteúdo."
 *   logo={<img src="/logo.svg" alt="Logo" />}
 *   image={<img src="/hero-image.jpg" alt="Imagem do Banner" />}
 *   buttons={[
 *     { label: "Saiba mais", variant: "primary" },
 *     { label: "Contato", variant: "secondary" }
 *   ]}
 *   stores={[
 *     { icon: <img src="/app-store.svg" alt="App Store" />, href: "https://apple.com" },
 *     { icon: <img src="/play-store.svg" alt="Play Store" />, href: "https://play.google.com" }
 *   ]}
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {"light" | "dark"} [props.theme="light"] - Tema de cores do banner
 *   - "light": Fundo colorido com texto escuro
 *   - "dark": Fundo colorido com texto claro
 * @param {Color} [props.bgColor="portoSaudePrimary"] - Cor de fundo do banner (do tipo Color)
 * @param {ReactNode} [props.title] - Título principal do banner
 * @param {ReactNode} [props.subtitle] - Subtítulo do banner (exibido em posições diferentes no mobile e desktop)
 * @param {ReactNode} [props.text] - Texto descritivo do banner
 * @param {ReactNode} [props.logo] - Logo a ser exibido no topo do conteúdo
 * @param {ReactNode} [props.image] - Imagem principal do banner
 * @param {BannerHeroButton[]} [props.buttons=[]] - Array de botões de ação
 *   - Cada botão estende ButtonProps e requer um label
 * @param {BannerHeroStore[]} [props.stores=[]] - Array de links para lojas de aplicativos
 *   - Cada store contém um ícone, URL e nome opcional
 * @param {RowProps} [props.contentProps] - Props adicionais para o componente Row que envolve o conteúdo
 * @param {string} [props.className=""] - Classes CSS adicionais para o banner
 *
 * @returns {JSX.Element} O componente BannerHero renderizado
 */

export const BannerHero = ({
	theme = "light",
	bgColor = "portoSaudePrimary",
	title,
	subtitle,
	text,
	logo,
	image,
	buttons = [],
	stores = [],
	contentProps,
	className = "",
}: BannerHeroProps) => {
	return (
		<section
			className={joinClasses([
				"banner-hero__root",
				`--bg-${bgColor}`,
				`--${theme}`,
				className,
			])}
		>
			<Grid>
				{/* Content Section */}
				<Row
					className="banner-hero__content"
					mobile={[1, 9]}
					portrait={[1, 9]}
					landscape={[1, 13]}
					desktop={[1, 13]}
					wide={[1, 13]}
					{...contentProps}
				>
					{/* Logo */}
					{logo && <div className="banner-hero__logo">{logo}</div>}

					{/* Subtitle (Mobile) */}
					{subtitle && (
						<Typography
							className="banner-hero__subtitle mobile"
							as="p"
							variant="overline"
							weight="bold"
						>
							{subtitle}
						</Typography>
					)}

					{/* Title */}
					{title && (
						<Typography
							className="banner-hero__title"
							as="h2"
							variant="title2"
							weight="bold"
						>
							{title}
						</Typography>
					)}

					{/* Subtitle (Desktop) */}
					{subtitle && (
						<Typography
							className="banner-hero__subtitle desktop"
							as="p"
							variant="overline"
							weight="bold"
						>
							{subtitle}
						</Typography>
					)}

					{/* Text */}
					{text && (
						<Typography className="banner-hero__text" as="p" variant="body1">
							{text}
						</Typography>
					)}

					{/* Buttons */}
					{buttons.length > 0 && (
						<div className="banner-hero__buttons">
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

					{/* Stores */}
					{stores.length > 0 && (
						<div className="banner-hero__stores">
							{stores.map((store, index) => (
								<a
									key={`store-${index}`}
									href={store.href}
									className="banner-hero__store"
									target="_blank"
									rel="noopener noreferrer"
								>
									{store.icon}
									{store.name && (
										<span className="banner-hero__store-name">
											{store.name}
										</span>
									)}
								</a>
							))}
						</div>
					)}
				</Row>

				{/* Image Section */}
				{image && <div className="banner-hero__image">{image}</div>}
			</Grid>
		</section>
	);
};
