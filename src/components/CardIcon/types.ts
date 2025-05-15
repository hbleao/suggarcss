import { ReactNode } from 'react';
import { TypographyProps } from '@porto-ocean/typography';
import { IconProps } from '@porto-ocean/icon';

export interface CardIconProps {
  theme?: 'light' | 'dark';
  variant?: 'link' | 'withoutLink';
  icon?: IconProps;
  preTitle?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  onClick?: () => void;
  titleProps?: TypographyProps;
  preTitleProps?: TypographyProps;
  descriptionProps?: TypographyProps;
  className?: string;
}
