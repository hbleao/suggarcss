export interface FooterProps {
  variant?: 'default' | 'negative';
  children?: React.ReactNode;
  columns?: FooterColumn[];
  brand?: FooterBrand;
  partners?: FooterPartner[];
  stores?: FooterStore[];
  bottomLinks?: FooterBottomLink[];
  className?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterBrand {
  title: string;
  socialLinks?: FooterSocialLink[];
}

export interface FooterSocialLink {
  icon: React.ReactNode;
  href: string;
}

export interface FooterPartner {
  name: string;
  logo: React.ReactNode;
  href: string;
}

export interface FooterStore {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export interface FooterBottomLink {
  label: string;
  href: string;
}
