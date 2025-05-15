import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@porto-ocean/icon';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { DialogProps } from './types';

/**
 * Componente Dialog - Modal de diálogo para exibir informações e ações
 * 
 * @component
 * @example
 * ```tsx
 * <Dialog
 *   isOpen={isDialogOpen}
 *   onClose={() => setIsDialogOpen(false)}
 *   variant="medium"
 *   theme="light"
 *   title="Título do Diálogo"
 *   subtitle="Subtítulo opcional"
 *   description="Descrição detalhada do diálogo"
 *   icon={{ iconName: "info", color: "portoSeguros100" }}
 *   footer={
 *     <>
 *       <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
 *     </>
 *   }
 * >
 *   <p>Conteúdo principal do diálogo</p>
 * </Dialog>
 * ```
 */
export const Dialog = ({
  isOpen,
  onClose,
  variant = 'small',
  theme = 'light',
  title,
  subtitle,
  description,
  icon,
  children,
  footer,
  footerVariant = 'row',
  className = '',
  ...restProps
}: DialogProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={joinClasses([
        'dialog dialog__overlay',
        isOpen ? 'dialog__overlay--open' : '',
        `--${theme}`,
        className,
      ])}
      onClick={handleOverlayClick}
      {...restProps}
    >
      <div
        className={joinClasses(['dialog__box', `--${variant}`])}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        {(title || subtitle || icon) && (
          <div className="dialog__header">
            {/* Icon */}
            {icon && (
              <Icon
                iconName={icon.iconName}
                size={icon.size || 'md'}
                color={icon.color}
                className="dialog__icon"
                {...icon}
              />
            )}

            {/* Title Container */}
            {(title || subtitle) && (
              <div className="dialog__title-container">
                {/* Title */}
                {title && (
                  <h2 className="dialog__title">{title}</h2>
                )}

                {/* Subtitle */}
                {subtitle && (
                  <h3 className="dialog__subtitle">{subtitle}</h3>
                )}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="dialog__description">{description}</div>
        )}

        {/* Body Content */}
        {children && (
          <div className="dialog__body">{children}</div>
        )}

        {/* Footer */}
        {footer && (
          <div className={joinClasses(['dialog__footer', `--${footerVariant}`])}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
