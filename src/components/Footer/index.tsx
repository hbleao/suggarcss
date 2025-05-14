import React from 'react';
import { Grid } from '@porto-ocean/grid';
import { Row } from '@porto-ocean/row';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { FooterProps } from './types';

export const Footer = ({
  variant = 'default',
  children,
  columns = [],
  brand,
  partners = [],
  stores = [],
  bottomLinks = [],
  className = '',
}: FooterProps) => {
  return (
    <footer className={joinClasses(['footer__root', `--${variant}`, className])}>
      <Grid>
        {/* Render custom children if provided */}
        {children ? (
          children
        ) : (
          <>
            {/* Columns Section */}
            {columns.length > 0 && (
              <div className="footer__columns">
                {columns.map((column, columnIndex) => (
                  <Row
                    key={`column-${columnIndex}`}
                    className="footer__column"
                    mobile={[1, 9]}
                    portrait={[1, 9]}
                    landscape={[1, 13]}
                    desktop={[1, 13]}
                    wide={[1, 13]}
                  >
                    <div className="footer__title">{column.title}</div>
                    <ul className="footer__list">
                      {column.links.map((link, linkIndex) => (
                        <li key={`link-${columnIndex}-${linkIndex}`} className="footer__list-item">
                          <a href={link.href} className="footer__link">
                            {link.icon && <span className="footer__link-icon">{link.icon}</span>}
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Row>
                ))}
              </div>
            )}

            {/* Brand Section */}
            {brand && (
              <div className="footer__brand">
                <div className="footer__brand-title">{brand.title}</div>
                {brand.socialLinks && brand.socialLinks.length > 0 && (
                  <div className="footer__social-links">
                    {brand.socialLinks.map((socialLink, index) => (
                      <a
                        key={`social-${index}`}
                        href={socialLink.href}
                        className="footer__social-link"
                      >
                        {socialLink.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Partners Section */}
            {partners.length > 0 && (
              <div className="footer__partners">
                {partners.map((partner, index) => (
                  <a
                    key={`partner-${index}`}
                    href={partner.href}
                    className="footer__partner"
                  >
                    {partner.logo}
                  </a>
                ))}
              </div>
            )}

            {/* Stores Section */}
            {stores.length > 0 && (
              <div className="footer__stores">
                {stores.map((store, index) => (
                  <a
                    key={`store-${index}`}
                    href={store.href}
                    className="footer__store"
                  >
                    {store.icon}
                    {store.name}
                  </a>
                ))}
              </div>
            )}

            {/* Bottom Links Section */}
            {bottomLinks.length > 0 && (
              <div className="footer__bottom">
                {bottomLinks.map((link, index) => (
                  <div key={`bottom-${index}`} className="footer__bottom-item">
                    <a href={link.href} className="footer__bottom-link">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Grid>
    </footer>
  );
};
