import React from 'react';
import { Typography } from '@porto-ocean/typography';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { CardTestimonialProps } from './types';

/**
 * Componente CardTestimonial - Card para exibição de depoimentos
 * 
 * @component
 * @example
 * ```tsx
 * <CardTestimonial
 *   theme="light"
 *   image={<img src="/avatar.jpg" alt="João Silva" />}
 *   name="João Silva"
 *   position="Diretor de Marketing"
 *   date="Janeiro 2025"
 *   text="Este produto superou todas as minhas expectativas. Recomendo fortemente para todos que buscam qualidade e eficiência."
 * />
 * ```
 */
export const CardTestimonial = ({
  theme = 'light',
  image,
  name,
  nameProps,
  position,
  positionProps,
  date,
  dateProps,
  text,
  textProps,
  showSeparator = true,
  className = '',
  ...restProps
}: CardTestimonialProps) => {
  return (
    <div
      className={joinClasses(['card-testimonial__root', `--${theme}`, className])}
      {...restProps}
    >
      {/* Header Section */}
      <div className="card-testimonial__header">
        {/* Author Image */}
        {image && (
          <div className="card-testimonial__image">
            {image}
          </div>
        )}

        {/* Author Info */}
        <div className="card-testimonial__info">
          {/* Author Name */}
          {name && (
            <Typography
              as="h3"
              variant="subtitle1"
              weight="bold"
              className="card-testimonial__name"
              {...nameProps}
            >
              {name}
            </Typography>
          )}

          {/* Author Position */}
          {position && (
            <Typography
              as="p"
              variant="body2"
              className="card-testimonial__position"
              {...positionProps}
            >
              {position}
            </Typography>
          )}

          {/* Testimonial Date */}
          {date && (
            <Typography
              as="span"
              variant="caption"
              className="card-testimonial__date"
              {...dateProps}
            >
              {date}
            </Typography>
          )}
        </div>
      </div>

      {/* Separator */}
      {showSeparator && (
        <hr className="card-testimonial__separator" />
      )}

      {/* Content Section */}
      <div className="card-testimonial__content">
        {/* Testimonial Text */}
        {text && (
          <Typography
            as="p"
            variant="body1"
            className="card-testimonial__text"
            {...textProps}
          >
            {text}
          </Typography>
        )}
      </div>
    </div>
  );
};
