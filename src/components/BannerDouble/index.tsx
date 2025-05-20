import s from "./styles.module.scss";

import { Link } from "../Link";
import { Typography } from "../Typography";

import type { BannerDoubleProps } from "./types";

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
