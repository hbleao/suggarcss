import { formatGtmText } from './utils';

export function buttons(): void {
  const buttons = document.querySelectorAll('button');
  const titleElement = document.querySelector('#gtm-title');

  buttons.forEach((button: HTMLButtonElement) => {
    const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
    const buttonTitle = button?.title || '';
    const buttonLabel = buttonTitle.trim() || 'sem-label';

    button.setAttribute('data-gtm-name', formatGtmText(titleText));
    button.setAttribute('data-gtm-clicktype', 'button');
    button.setAttribute('data-gtm-type', 'click');
    button.setAttribute('data-gtm-subname', formatGtmText(buttonLabel));
  });
}
