type Banner = {
	title: string;
	subtitle?: string;
	link: {
		label: string;
		href: string;
	};
	image: {
		src: string;
		alt: string;
	};
	// @ts-ignore
	bgColor?: ColorToken;
	// @ts-ignore
	titleColor?: ColorToken;
	// @ts-ignore
	subtitleColor?: ColorToken;
};

export type BannerDoubleProps = {
	banners: Banner[];
};
