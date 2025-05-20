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
	bgColor?: ColorToken;
	titleColor?: ColorToken;
	subtitleColor?: ColorToken;
};

export type BannerDoubleProps = {
	banners: Banner[];
};
