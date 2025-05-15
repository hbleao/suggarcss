import React from 'react';
import { Typography } from '@porto-ocean/typography';
import { Icon } from '@porto-ocean/icon';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { CardIconProps } from './types';

export const CardIcon = ({
  theme = 'light',
  variant = 'link',
  icon,
  preTitle,
  title,
  description,
  href,
  onClick,
  titleProps,
  preTitleProps,
  descriptionProps,
  className = '',
}: CardIconProps) => {
  const CardContainer = variant === 'link' && href ? 'a' : 'div';
  
  const containerProps = {
    className: joinClasses([
      'card-icon__root',
      className,
      `--${theme}`,
      `--${variant}`,
    ]),
    ...(href && { href }),
    ...(onClick && { onClick }),
  };

  return (
    <CardContainer {...containerProps}>
      {/* Icon */}
      {icon && (
        <Icon
          className="card-icon__icon"
          size="text-6xl"
          iconName={icon.iconName}
          color={icon.color}
          {...icon}
        />
      )}

      {/* Pre Title */}
      {preTitle && (
        <Typography
          as="span"
          variant="body2"
          weight="regular"
          className="card-icon__pretitle"
          {...preTitleProps}
        >
          {preTitle}
        </Typography>
      )}

      {/* Title */}
      {title && (
        <Typography
          as="h3"
          variant="body1"
          weight="bold"
          className="card-icon__title"
          {...titleProps}
        >
          {title}
        </Typography>
      )}

      {/* Description */}
      {description && (
        <Typography
          as="p"
          variant="body2"
          weight="regular"
          className="card-icon__description"
          {...descriptionProps}
        >
          {description}
        </Typography>
      )}
    </CardContainer>
  );
};
