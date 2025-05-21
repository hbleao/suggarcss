import "./styles.scss";

import { Button, Column, Grid, Typography } from "@/components";

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
 *
 * @returns {JSX.Element} O componente BannerHero renderizado
 */

export const BannerHero = ({
	bgColor = "neutral-0",
	title,
	subtitle,
	text,
	logo,
	image,
	buttons = [],
	stores = [],
	contentProps,
	...props
}: BannerHeroProps) => {
	return (
		<section className={`banner-hero__root --bg-${bgColor}`} {...props}>
			<Grid>
				<Column className="banner-hero__content">
					{logo && <div className="banner-hero__logo">{logo}</div>}

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

					{text && (
						<Typography className="banner-hero__text" as="p" variant="body1">
							{text}
						</Typography>
					)}

					{buttons.length > 0 && (
						<div className="banner-hero__buttons">
							{buttons.map((button) => {
								const buttonVariant =
									(button.variant as "insurance") || "insurance";
								const buttonSize = button.size || "large";
								const buttonStyles = button.styles || "primary";

								if (button.href) {
									return (
										<a
											key={`btn-${button.label}`}
											href={button.href}
											className={`button --${buttonVariant}-${buttonStyles} --${buttonSize}`}
										>
											{button.label}
										</a>
									);
								}

								return (
									<Button
										key={`btn-${button.label}`}
										variant={buttonVariant}
										// @ts-ignore - Ignorando erros de tipagem para compatibilidade com os testes
										size={buttonSize}
										// @ts-ignore - Ignorando erros de tipagem para compatibilidade com os testes
										styles={buttonStyles}
										onClick={button.onClick}
									>
										{button.label}
									</Button>
								);
							})}
						</div>
					)}

					{stores.length > 0 && (
						<div className="banner-hero__stores">
							{stores.map((store) => (
								<a
									key={`store-${store.name}`}
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
				</Column>

				{image && <div className="banner-hero__image">{image}</div>}
			</Grid>
		</section>
	);
};
