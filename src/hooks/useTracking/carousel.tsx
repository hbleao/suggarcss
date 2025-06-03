import { formatGtmText } from './utils';

export function carousel(): void {
  // Seleciona todos os elementos do carousel
  const carouselWrappers = document.querySelectorAll('[data-testid="carousel-wrapper"]');
  
  carouselWrappers.forEach((wrapper: Element) => {
    // Encontra o título da página ou seção para contexto
    const titleElement = document.querySelector('#gtm-title');
    const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
    const formattedTitle = formatGtmText(titleText);
    
    // Adiciona atributos ao wrapper do carousel
    wrapper.setAttribute('data-gtm-name', formattedTitle);
    wrapper.setAttribute('data-gtm-component', 'carousel');
    
    // Seleciona os slides dentro deste carousel
    const slides = wrapper.querySelectorAll('.carousel__slide');
    slides.forEach((slide: Element, index: number) => {
      slide.setAttribute('data-gtm-name', formattedTitle);
      slide.setAttribute('data-gtm-component', 'carousel');
      slide.setAttribute('data-gtm-subname', `slide-${index + 1}`);
      slide.setAttribute('data-gtm-position', `${index + 1}`);
    });
    
    // Seleciona os botões de navegação (setas)
    const navButtons = wrapper.parentElement?.querySelectorAll('.carousel__button');
    navButtons?.forEach((button: Element, index: number) => {
      const direction = index === 0 ? 'anterior' : 'proximo';
      button.setAttribute('data-gtm-name', formattedTitle);
      button.setAttribute('data-gtm-component', 'carousel');
      button.setAttribute('data-gtm-clicktype', 'carousel-navigation');
      button.setAttribute('data-gtm-subname', `navegacao-${direction}`);
    });
    
    // Seleciona os pontos de navegação (dots)
    const dots = wrapper.parentElement?.querySelectorAll('.carousel__dot');
    dots?.forEach((dot: Element, index: number) => {
      dot.setAttribute('data-gtm-name', formattedTitle);
      dot.setAttribute('data-gtm-component', 'carousel');
      dot.setAttribute('data-gtm-clicktype', 'carousel-dot');
      dot.setAttribute('data-gtm-subname', `ponto-${index + 1}`);
      dot.setAttribute('data-gtm-position', `${index + 1}`);
    });
  });
}
