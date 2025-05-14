import React, { useState } from 'react';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { HeaderProps, MenuItem, ToolbarItem, DrawerItem } from './types';

export const Header = ({
  variant = 'default',
  logo,
  menuItems = [],
  toolbarItems = [],
  drawerItems = [],
  isDrawerOpen = false,
  onDrawerToggle,
  className = '',
}: HeaderProps) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const handleTooltipToggle = (index: number) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  const closeAllTooltips = () => {
    setActiveTooltip(null);
  };

  return (
    <header className={joinClasses(['header__root', `--${variant}`, className])}>
      <div className="header__container">
        {/* Menu Section */}
        <div className="header__menu">
          {/* Logo */}
          {logo && (
            <a href="/" className="header__logo">
              {logo}
            </a>
          )}

          {/* Mobile Menu Icon */}
          <div 
            className="header__menu-icon-mobile"
            onClick={onDrawerToggle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Navigation */}
          <nav className="header__nav">
            {menuItems.map((item, index) => (
              <div key={`menu-item-${index}`} className="header__menu-link-container">
                <a
                  href={item.href}
                  className={joinClasses([
                    'header__menu-link',
                    item.isActive ? '--active' : '',
                  ])}
                  onClick={(e) => {
                    if (item.tooltip) {
                      e.preventDefault();
                      handleTooltipToggle(index);
                    }
                    item.onClick?.();
                  }}
                >
                  {item.label}
                  {item.icon && <span className="header__menu-link-icon">{item.icon}</span>}
                </a>

                {/* Tooltip */}
                {item.tooltip && (
                  <>
                    <div 
                      className={joinClasses([
                        'header__tooltip',
                        activeTooltip === index ? '--visible' : '',
                      ])}
                    >
                      {/* Tooltip Header */}
                      {item.tooltip.header && (
                        <div className="header__tooltip-header">
                          {item.tooltip.header.logo && (
                            <div className="header__tooltip-logo">
                              {item.tooltip.header.logo}
                            </div>
                          )}
                          
                          {item.tooltip.header.categories && item.tooltip.header.categories.length > 0 && (
                            <div className="header__tooltip-categories">
                              {item.tooltip.header.categories.map((category, catIndex) => (
                                <a 
                                  key={`tooltip-category-${catIndex}`}
                                  href={category.href}
                                  className="header__tooltip-category-link"
                                >
                                  {category.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tooltip Cards */}
                      {item.tooltip.cards && item.tooltip.cards.length > 0 && (
                        <div className="header__tooltip-cards">
                          {item.tooltip.cards.map((card, cardIndex) => (
                            <div key={`tooltip-card-${cardIndex}`} className="header__tooltip-card">
                              <div className="header__tooltip-card-title">{card.title}</div>
                              {card.subtitle && (
                                <div className="header__tooltip-card-subtitle">{card.subtitle}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tooltip Content List */}
                      {item.tooltip.contentList && item.tooltip.contentList.length > 0 && (
                        <ul className="header__tooltip-content-list">
                          {item.tooltip.contentList.map((listItem, listIndex) => (
                            <li key={`tooltip-list-item-${listIndex}`} className="header__tooltip-content-item">
                              <a href={listItem.href} className="header__tooltip-content-link">
                                {listItem.label}
                              </a>
                              {listItem.badge && (
                                <span className="header__tooltip-content-badge">{listItem.badge}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    {/* Tooltip Overlay */}
                    <div 
                      className={joinClasses([
                        'header__tooltip-overlay',
                        activeTooltip === index ? '--visible' : '',
                      ])}
                      onClick={closeAllTooltips}
                    />
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Toolbar Section */}
        {toolbarItems.length > 0 && (
          <nav className="header__toolbar">
            <ul className="header__toolbar-list">
              {toolbarItems.map((item, index) => (
                <li key={`toolbar-item-${index}`} className="header__toolbar-item">
                  <a 
                    href={item.href || '#'}
                    className="header__toolbar-icon"
                    onClick={(e) => {
                      if (!item.href) e.preventDefault();
                      item.onClick?.();
                    }}
                  >
                    {item.icon}
                    {item.label && <span className="header__toolbar-label">{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Drawer */}
      <div className={joinClasses(['header__drawer', isDrawerOpen ? '--opened' : ''])}>
        <div className="header__drawer-categories">
          {drawerItems.map((item, index) => (
            <div key={`drawer-item-${index}`}>
              <a 
                href={item.href || '#'}
                className="header__drawer-label"
                onClick={(e) => {
                  if (!item.href) e.preventDefault();
                  item.onClick?.();
                }}
              >
                {item.icon && <span className="header__drawer-label-icon">{item.icon}</span>}
                {item.label}
              </a>

              {item.categories && item.categories.length > 0 && (
                <div className="header__drawer-category">
                  {item.categories.map((category, catIndex) => (
                    <div key={`drawer-category-${catIndex}`} className="header__drawer-subcategory">
                      <div className="header__drawer-category-header">{category.label}</div>
                      
                      {category.subcategories && category.subcategories.length > 0 && (
                        <>
                          {category.subcategories.map((subcategory, subIndex) => (
                            <div key={`drawer-subcategory-${subIndex}`} className="header__drawer-subcategory">
                              <div className="header__drawer-subcategory-header">{subcategory.label}</div>
                              
                              <ul className="header__drawer-subcategory-list">
                                {subcategory.items.map((item, itemIndex) => (
                                  <li 
                                    key={`drawer-subcategory-item-${itemIndex}`}
                                    className="header__drawer-subcategory-list-item"
                                  >
                                    <a href={item.href} className="header__drawer-subcategory-item">
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {index < drawerItems.length - 1 && <div className="header__drawer-line" />}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
