import { ReactNode } from 'react';
import { TypographyProps } from '@porto-ocean/typography';
import { ButtonProps } from '@porto-ocean/button';
import { RowProps } from '@porto-ocean/row';

export type Color =
  | 'portoSeguros100'
  | 'portoSeguros85'
  | 'portoSeguros75'
  | 'portoSegurosPrimary'
  | 'portoSeguros65'
  | 'portoSeguros60'
  | 'portoSeguros45'
  | 'portoSeguros30'
  | 'portoSeguros15'
  | 'portoSeguros05'
  | 'portoBanking100'
  | 'portoBanking85'
  | 'portoBanking75'
  | 'portoBankingPrimary'
  | 'portoBanking65'
  | 'portoBanking60'
  | 'portoBanking45'
  | 'portoBanking30'
  | 'portoBanking15'
  | 'portoBanking05'
  | 'portoSaude100'
  | 'portoSaude85'
  | 'portoSaude75'
  | 'portoSaudePrimary'
  | 'portoSaude65'
  | 'portoSaude60'
  | 'portoSaude45'
  | 'portoSaude30'
  | 'portoSaude15'
  | 'portoSaude05'
  | 'black100'
  | 'black85'
  | 'black75'
  | 'black70'
  | 'black65'
  | 'black60'
  | 'black45'
  | 'black30'
  | 'black15'
  | 'black05'
  | 'white'
  | 'offWhite05'
  | 'offWhite'
  | 'semiWhite'
  | 'violet100'
  | 'violetPrimary'
  | 'violet60'
  | 'violet30'
  | 'pink100'
  | 'pinkPrimary'
  | 'pink60'
  | 'pink30'
  | 'yellow100'
  | 'yellow80'
  | 'yellowPrimary'
  | 'yellow60'
  | 'yellow30'
  | 'green100'
  | 'green85'
  | 'green80'
  | 'greenPrimary'
  | 'green60'
  | 'green30'
  | 'red100'
  | 'red85'
  | 'red80'
  | 'redPrimary'
  | 'red60'
  | 'red30'
  | 'alpha'
  | 'alpha10'
  | 'alpha30'
  | 'alpha50'
  | 'alpha70'
  | 'alphaChannel';

export interface BannerHeroProps {
  theme?: 'light' | 'dark';
  bgColor?: Color;
  title?: ReactNode;
  subtitle?: ReactNode;
  text?: ReactNode;
  logo?: ReactNode;
  image?: ReactNode;
  buttons?: BannerHeroButton[];
  stores?: BannerHeroStore[];
  contentProps?: RowProps;
  className?: string;
}

export interface BannerHeroButton extends ButtonProps {
  label: ReactNode;
}

export interface BannerHeroStore {
  icon: ReactNode;
  href: string;
  name?: string;
}
