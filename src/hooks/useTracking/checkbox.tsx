import { formatGtmText } from './utils';

export function checkbox(): void {
	const checkboxs = document.querySelectorAll(
		'.checkbox__input',
	) as NodeListOf<HTMLDivElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	checkboxs.forEach((checkbox: HTMLDivElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		const checkboxElement = checkbox?.title?.trim() ?? 'sem-label';

		checkbox.setAttribute('data-gtm-name', 'form');
		checkbox.setAttribute('data-gtm-clicktype', 'input');
		checkbox.setAttribute('data-gtm-name', formatGtmText(titleText));
		checkbox.setAttribute('data-gtm-subname', formatGtmText(checkboxElement));
	});
}
