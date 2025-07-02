import s from "./styles.module.scss";

import { Link } from "../Link";
import { Typography } from "../Typography";

import type { BannerDoubleProps } from "./types";

/**
 * BannerDouble é um componente que exibe dois banners promocionais lado a lado.
 * Cada banner contém título, subtítulo opcional, link e imagem de fundo.
 * 
 * @component
 * @example
 * ```tsx
 * <BannerDouble 
 *   banners={[
 *     {
 *       title: "Oferta Especial",
 *       subtitle: "Até 50% de desconto",
 *       link: { label: "Ver ofertas", href: "/ofertas" },
 *       image: { src: "url-da-imagem.jpg", alt: "Imagem promocional" },
 *       bgColor: "primary",
 *       titleColor: "white",
 *       subtitleColor: "light"
 *     },
 *     {
 *       title: "Novos Produtos",
 *       subtitle: "Confira os lançamentos",
 *       link: { label: "Explorar", href: "/lancamentos" },
 *       image: { src: "url-da-imagem-2.jpg", alt: "Novos produtos" },
 *       bgColor: "secondary",
 *       titleColor: "dark",
 *       subtitleColor: "dark"
 *     }
 *   ]}
 * />
 * ```
 * 
 * @param {Object} props - As propriedades do componente
 * @param {Array<Banner>} props.banners - Array contendo os dados dos banners a serem exibidos (máximo de 2 banners recomendado)
 * @returns {JSX.Element} Componente BannerDouble renderizado
 */
export const BannerDouble = ({ banners }: BannerDoubleProps) => {
	return (
		<section className={s["banner-double"]}>
			<div className={s["banner-double__slider"]}>
				{banners.map((banner) => (
					<article
						key={banner.title}
						className={`${s["banner-double__card"]} --bg-${banner.bgColor}`}
						style={{ backgroundImage: banner.image.src }}
					>
						<Typography
							variant="title5"
							color={banner.titleColor}
							weight="bold"
							className={s["banner-double__title"]}
						>
							{banner.title}
						</Typography>
						{banner.subtitle && (
							<Typography
								variant="body1"
								color={banner.subtitleColor}
								className={s["banner-double__subtitle"]}
							>
								{banner.subtitle}
							</Typography>
						)}
						<Link variant="negative" size="small" herf={banner.link.href}>
							{banner.link.label}
						</Link>
						{/* <Image
							className={s["banner-double__image"]}
							src={banner.image.src}
							alt={banner.image.alt}
							width={400}
							height={400}
						/> */}
					</article>
				))}
			</div>
		</section>
	);
};
