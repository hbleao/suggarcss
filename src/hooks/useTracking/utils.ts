// Função utilitária para formatação de texto para GTM
export const formatGtmText = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};
