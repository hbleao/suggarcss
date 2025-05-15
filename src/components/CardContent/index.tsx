import React from 'react';
import { Typography } from '@porto-ocean/typography';
import { Button } from '@porto-ocean/button';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { CardContentProps } from './types';

/**
 * Componente CardContent - Card com imagem, título, descrição e botões
 * 
 * @component
 * @example
 * ```tsx
 * <CardContent
 *   theme="light"
 *   title="Título do Card"
 *   description="Descrição detalhada do card com informações relevantes."
 *   image={<img src="/card-image.jpg" alt="Card" />}
 *   buttons={[
 *     { label: "Saiba mais", variant: "primary" },
 *     { label: "Cancelar", variant: "secondary" }
 *   ]}
 * />
 * ```
 */
export const CardContent = ({
  theme = 'light',
  title,
  titleProps,
  description,
  descriptionProps,
  image,
  buttons = [],
  className = '',
  ...restProps
}: CardContentProps) => {
  return (
    <div
      className={joinClasses(['card-content__root', `--${theme}`, className])}
      {...restProps}
    >
      {/* Image Section */}
      {image && (
        <div className="card-content__image">
          {image}
        </div>
      )}

      {/* Content Section */}
      <div className="card-content__content">
        {/* Title */}
        {title && (
          <Typography
            as="h3"
            variant="title5"
            weight="bold"
            className="card-content__title"
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
            className="card-content__description"
            {...descriptionProps}
          >
            {description}
          </Typography>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="card-content__buttons">
            {buttons.map((button, index) => (
              <Button
                key={`button-${index}`}
                variant={button.variant}
                size={button.size}
                onClick={button.onClick}
                href={button.href}
                {...button}
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
