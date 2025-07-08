type Config = {
	slidesToShow: number;
	slidesToScroll: number;
	gap: number;
	arrows: boolean;
};

let config: Config = {
	slidesToShow: 2.95,
	slidesToScroll: 1,
	gap: 0,
	arrows: true,
};

export function carouselSettings(width: number) {
	if (width <= 1600) {
		config = {
			slidesToShow: 2.95,
			slidesToScroll: 1,
			gap: 0,
			arrows: true,
		};
	}

	if (width <= 1240) {
		config = {
			slidesToShow: 2.96,
			slidesToScroll: 1,
			gap: 0,
			arrows: false,
		};
	}

	if (width <= 1024) {
		config = {
			slidesToShow: 2.2,
			slidesToScroll: 1,
			gap: 0,
			arrows: false,
		};
	}
	if (width <= 768) {
		config = {
			slidesToShow: 1.22,
			slidesToScroll: 1,
			gap: 0,
			arrows: false,
		};
	}
	if (width <= 425) {
		config = {
			slidesToShow: 1.08,
			slidesToScroll: 1,
			gap: 0,
			arrows: false,
		};
	}
	if (width <= 375) {
		config = {
			slidesToShow: 0.92,
			slidesToScroll: 1,
			gap: 0,
			arrows: false,
		};
	}

	return { ...config };
}
