import { createContext, useContext, type ReactNode } from 'react';
import type { CardTaggingData } from './types';

// Contexto para compartilhar dados do card com componentes filhos
interface CardContextType {
  cardData: CardTaggingData;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ 
  children, 
  value 
}: {
  children: ReactNode;
  value: CardTaggingData;
}) => {
  return (
    <CardContext.Provider value={{ cardData: value }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = (): CardContextType => {
  const context = useContext(CardContext);
  if (context === undefined) {
    return { cardData: {} };
  }
  return context;
};
