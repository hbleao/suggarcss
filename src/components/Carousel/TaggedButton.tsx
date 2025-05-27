import type { MouseEvent } from 'react';
import { Button } from '../Button';
import { useCardContext } from './CardContext';
import type { ButtonProps } from '../Button/types';
import type { CardTaggingData } from './types';

interface TaggedButtonProps extends ButtonProps {
  onTaggedClick?: (cardData: CardTaggingData, buttonText: string) => void;
}

/**
 * Botão que automaticamente captura os dados do card pai quando clicado
 * 
 * @example
 * // Dentro de um card no carousel
 * <TaggedButton 
 *   onTaggedClick={(cardData, buttonText) => {
 *     console.log(`Botão '${buttonText}' clicado no card: ${cardData.title}`);
 *     // Enviar para analytics
 *   }}
 * >
 *   Quero este
 * </TaggedButton>
 */
export const TaggedButton = ({
  children,
  onClick,
  onTaggedClick,
  ...props
}: TaggedButtonProps) => {
  const { cardData } = useCardContext();
  const buttonText = typeof children === 'string' ? children : 'botão';
  
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Executa o callback original se existir
    if (onClick) {
      onClick(e);
    }
    
    // Executa o callback de tagueamento com os dados do card
    if (onTaggedClick && cardData) {
      onTaggedClick(cardData, buttonText);
    }
  };
  
  return (
    <Button 
      {...props} 
      onClick={handleClick}
      data-title={cardData.title}
      data-label={cardData.label}
      data-id={cardData.id}
      data-button-text={buttonText}
    >
      {children}
    </Button>
  );
};
