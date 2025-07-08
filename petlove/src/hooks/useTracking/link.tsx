import { formatGtmText } from './utils';

export function link(): void {
  const links = document.querySelectorAll(
    '.link',
  ) as NodeListOf<HTMLAnchorElement>;

  links.forEach((link: HTMLAnchorElement) => {
    const titleElement = document.querySelector('#gtm-title');
    const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
    const linkContent = link?.innerHTML || '';
    const linkLabel = linkContent.trim() || 'sem-label';

    link.setAttribute('data-gtm-name', formatGtmText(titleText));
    link.setAttribute('data-gtm-clicktype', 'link');
    link.setAttribute('data-gtm-type', 'click');
    link.setAttribute('data-gtm-subname', formatGtmText(linkLabel));
  });
}
