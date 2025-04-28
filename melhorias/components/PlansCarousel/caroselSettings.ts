export const settings = {
	speed: 500,
	infinite: false,
	slidesToShow: 2.4,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1367,
			settings: {
				slidesToShow: 2.4,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2.35,
				slidesToScroll: 2,
				arrows: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1.1,
				slidesToScroll: 1.1,
				arrows: false,
			},
		},
		{
			breakpoint: 450,
			settings: {
				slidesToShow: 1.27,
				slidesToScroll: 1,
				arrows: false,
			},
		},
		{
			breakpoint: 375,
			settings: {
				slidesToShow: 1.1,
				slidesToScroll: 1,
				arrows: false,
			},
		},
		{
			breakpoint: 360,
			settings: {
				slidesToShow: 0.7,
				slidesToScroll: 0.74,
				arrows: false,
			},
		},
	],
};
