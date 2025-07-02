import { formatGtmText } from './utils';

function handleButtonTagging(button: any, titleElement: any, carouselItemName: any, index: any) {
  const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
  const carouselItemText = carouselItemName?.textContent?.trim() ?? 'sem-carousel-item-name';
  const value = button.getAttribute('data-gtm-value') || 'sem-label';

  button.setAttribute('data-gtm-name', formatGtmText(titleText));
  button.setAttribute('data-gtm-clicktype', 'button');
  button.setAttribute('data-gtm-type', 'click');
  button.setAttribute('data-gtm-subname', `${formatGtmText(carouselItemText)}:${formatGtmText(value)}${index}`);
}

function handleLinkTagging(link: any, titleElement: any, carouselItemName: any, index: any) {
  const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
  const carouselItemText = carouselItemName?.textContent?.trim() ?? 'sem-carousel-item-name';
  const value = link.getAttribute('data-gtm-value') || 'sem-label';

  link.setAttribute('data-gtm-name', formatGtmText(titleText));
  link.setAttribute('data-gtm-clicktype', 'link');
  link.setAttribute('data-gtm-type', 'click');
  link.setAttribute('data-gtm-subname', `${formatGtmText(carouselItemText)}:${formatGtmText(value)}${index}`);
}

export function carousel(): void {
  const carouselElement = document.querySelector('.carousel__track');
  const titleElement = document.querySelector('#gtm-title');

  if (carouselElement?.children) {
    const carousel = Array.from(carouselElement.children);
    carousel.forEach((carouselItem, index) => {
      const carouselItemName = carouselItem.querySelector('#carousel-title');
      const buttons = carouselItem.querySelectorAll('button');
      const links = carouselItem.querySelectorAll('a');

      buttons.forEach((button: HTMLButtonElement) =>
        handleButtonTagging(button, titleElement, carouselItemName, index)
      );

      links.forEach((link: any) =>
        handleLinkTagging(link, titleElement, carouselItemName, index)
      );
    });
  }
}
