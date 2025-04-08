import { joinClasses } from '@porto-ocean/utils';
import React from 'react';

import './styles.scss';

export type ImageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Image = ({
  className = '',
  children,
  ...restProps
}: ImageProps) => {
  return (
    <div
      className={joinClasses(['banner-hero__image', className])}
      {...restProps}
    >
      {children}
    </div>
  )
}
