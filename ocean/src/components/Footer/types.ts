export interface FooterProps {
	titleAboutUs: string;
	aboutUs: Link[];
	titleQuickLinks: string;
	quickLinks: Link[];
	bottomLinks: Link[];
	titleSocialMedia: string;
	socialMedia: Href[];
	titleAppStore: string;
	partners: FooterPartner[];
	buttonsAppStore: Link[];
}

export interface FooterPartner {
	name: string;
	logo: React.ReactNode;
	href: string;
}

export interface Href {
	url: string;
	icon:
		| "icon-porto-ic-facebook"
		| "icon-porto-ic-instagram"
		| "icon-porto-ic-linkedin"
		| "icon-porto-ic-youtube"
		| "icon-porto-ic-twitter"
		| "icon-porto-ic-tik-tok";
	name: string;
}

export interface Link {
	name: string;
	url: string;
	icon: string;
}
