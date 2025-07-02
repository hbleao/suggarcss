export type Link = {
	label: string;
	url: string;
	target: "_self" | "_blank";
};

export type Category = {
	label: string;
	logo: {
		alt: string;
		target: "_self" | "_blank";
		url: string;
		image: string;
	};
	categories: {
		name: string;
		links: Link[];
	}[];
};

export type HeaderDrawerProps = {
	isOpenMenu: boolean;
	links: Link[];
	categories: Category[];
	subcategory: {
		links: Link[];
	};
	selectedCategory: Category;
	indexSubcategory: number;
	handleCategory: (subCategory: Category) => void;
	handleSubcategory: (indexCategory: number) => void;
};
