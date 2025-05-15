import React from 'react';
import { Typography } from '@porto-ocean/typography';
import { Button } from '@porto-ocean/button';
import { Icon } from '@porto-ocean/icon';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { BannerBodyProps } from './types';

/**
 * Componente BannerBody - Banner com conteúdo e imagem lado a lado
 * 
 * @component
 * @example
 * ```tsx
 * <BannerBody
 *   theme="light"
 *   bgColor="offWhite05"
 *   imageDesktopPosition="right"
 *   imageMobilePosition="down"
 *   preTitle="Novo"
 *   title="Título do Banner"
 *   subtitle="Subtítulo do Banner"
 *   benefits={[
 *     { text: "Benefício 1", icon: { iconName: "check" } },
 *     { text: "Benefício 2", icon: { iconName: "check" } }
 *   ]}
 *   buttons={[
 *     { label: "Saiba mais", variant: "primary" }
 *   ]}
 *   textNote="*Consulte o regulamento"
 *   image={<img src="/banner.jpg" alt="Banner" />}
 * />
 * ```
 */
export const BannerBody = ({
  theme = 'light',
  bgColor = 'offWhite05',
  imageMobilePosition = 'down',
  imageDesktopPosition = 'left',
  preTitle,
  title,
  subtitle,
  benefits = [],
  buttons = [],
  textNote,
  image,
  preTitleProps,
  titleProps,
  subtitleProps,
  className = '',
}: BannerBodyProps) => {
  return (
    <section
      className={joinClasses([
        'banner-body__root',
        `--${theme}`,
        `--bg-${bgColor}`,
        imageMobilePosition,
        imageDesktopPosition,
        className,
      ])}
    >
      {/* Content Section */}
      <div className="banner-body__content">
        {/* Pre Title */}
        {preTitle && (
          <Typography
            as="span"
            variant="overline"
            weight="bold"
            className="banner-body__pretitle"
            {...preTitleProps}
          >
            {preTitle}
          </Typography>
        )}

        {/* Title */}
        {title && (
          <Typography
            as="h2"
            variant="title3"
            weight="bold"
            className="banner-body__title"
            {...titleProps}
          >
            {title}
          </Typography>
        )}

        {/* Subtitle */}
        {subtitle && (
          <Typography
            as="p"
            variant="subtitle1"
            weight="semibold"
            className="banner-body__subtitle"
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <ul className="banner-body__benefits">
            {benefits.map((benefit, index) => (
              <li key={`benefit-${index}`} className="banner-body__benefit">
                {benefit.icon && (
                  <Icon
                    iconName={benefit.icon.iconName}
                    size="text-md"
                    {...benefit.icon}
                  />
                )}
                <p className="banner-body__text">{benefit.text}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="banner-body__buttons">
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

        {/* Text Note */}
        {textNote && (
          <div className="banner-body__text-note">
            {textNote}
          </div>
        )}
      </div>

      {/* Image Section */}
      {image && (
        <div className="banner-body__image">
          {image}
        </div>
      )}
    </section>
  );
};
