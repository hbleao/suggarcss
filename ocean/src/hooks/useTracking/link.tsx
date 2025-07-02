import { formatGtmText } from './utils';

export function link(): void {
	const links = document.querySelectorAll(
		'.link',
	) as NodeListOf<HTMLAnchorElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	links.forEach((link: HTMLAnchorElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		
		// Corrigindo a lógica para garantir que linkLabel seja 'sem-label' quando o conteúdo estiver vazio
		const linkContent = link?.innerHTML || '';
		const linkLabel = linkContent.trim() || 'sem-label';

		// Define o atributo data-gtm-name apenas uma vez com o valor formatado do título
		link.setAttribute('data-gtm-name', formatGtmText(titleText));
		link.setAttribute('data-gtm-clicktype', 'link');
		link.setAttribute('data-gtm-subname', formatGtmText(linkLabel));
	});
}
