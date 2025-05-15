import React from 'react';
import { Grid } from '@porto-ocean/grid';
import { Row } from '@porto-ocean/row';
import { Typography } from '@porto-ocean/typography';
import { Button } from '@porto-ocean/button';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { BannerHeroProps } from './types';

export const BannerHero = ({
  theme = 'light',
  bgColor = 'portoSaudePrimary',
  title,
  subtitle,
  text,
  logo,
  image,
  buttons = [],
  stores = [],
  contentProps,
  className = '',
}: BannerHeroProps) => {
  return (
    <section
      className={joinClasses([
        'banner-hero__root',
        `--bg-${bgColor}`,
        `--${theme}`,
        className,
      ])}
    >
      <Grid>
        {/* Content Section */}
        <Row
          className="banner-hero__content"
          mobile={[1, 9]}
          portrait={[1, 9]}
          landscape={[1, 13]}
          desktop={[1, 13]}
          wide={[1, 13]}
          {...contentProps}
        >
          {/* Logo */}
          {logo && (
            <div className="banner-hero__logo">
              {logo}
            </div>
          )}

          {/* Subtitle (Mobile) */}
          {subtitle && (
            <Typography
              className="banner-hero__subtitle mobile"
              as="p"
              variant="overline"
              weight="bold"
            >
              {subtitle}
            </Typography>
          )}

          {/* Title */}
          {title && (
            <Typography
              className="banner-hero__title"
              as="h2"
              variant="title2"
              weight="bold"
            >
              {title}
            </Typography>
          )}

          {/* Subtitle (Desktop) */}
          {subtitle && (
            <Typography
              className="banner-hero__subtitle desktop"
              as="p"
              variant="overline"
              weight="bold"
            >
              {subtitle}
            </Typography>
          )}

          {/* Text */}
          {text && (
            <Typography
              className="banner-hero__text"
              as="p"
              variant="body1"
            >
              {text}
            </Typography>
          )}

          {/* Buttons */}
          {buttons.length > 0 && (
            <div className="banner-hero__buttons">
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

          {/* Stores */}
          {stores.length > 0 && (
            <div className="banner-hero__stores">
              {stores.map((store, index) => (
                <a
                  key={`store-${index}`}
                  href={store.href}
                  className="banner-hero__store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {store.icon}
                  {store.name && (
                    <span className="banner-hero__store-name">{store.name}</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </Row>

        {/* Image Section */}
        {image && (
          <div className="banner-hero__image">
            {image}
          </div>
        )}
      </Grid>
    </section>
  );
};
