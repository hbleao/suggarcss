import React, { useState } from 'react';
import { joinClasses } from '@porto-ocean/utils';

import './styles.scss';
import type { TooltipProps } from './types';

/**
 * Componente Tooltip - Exibe informações adicionais ao passar o mouse sobre um elemento
 * 
 * @component
 * @example
 * ```tsx
 * <Tooltip content="Esta é uma dica útil" position="top">
 *   <button>Passe o mouse aqui</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  content,
  children,
  position = 'top',
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  className = '',
  contentClassName = '',
  triggerClassName = '',
  ...restProps
}: TooltipProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Determina se o componente é controlado ou não
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const handleMouseEnter = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }
  };

  const handleMouseLeave = () => {
    if (!isControlled) {
      setUncontrolledIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={joinClasses(['tooltip', className])}
      {...restProps}
    >
      {/* Trigger Element */}
      <div 
        className={joinClasses(['tooltip__trigger', triggerClassName])}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {/* Tooltip Content */}
      <div 
        className={joinClasses([
          'tooltip__content',
          `--${position}`,
          isOpen ? '--visible' : '',
          contentClassName
        ])}
      >
        {content}
      </div>
    </div>
  );
};
