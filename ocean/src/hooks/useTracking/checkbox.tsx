import { formatGtmText } from './utils';

export function checkbox(): void {
	const checkboxs = document.querySelectorAll(
		'.checkbox__input',
	) as NodeListOf<HTMLDivElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	checkboxs.forEach((checkbox: HTMLDivElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		
		// Corrigindo a lógica para garantir que checkboxLabel seja 'sem-label' quando o título estiver vazio
		const checkboxTitle = checkbox?.title || '';
		const checkboxLabel = checkboxTitle.trim() || 'sem-label';

		// Define o atributo data-gtm-name apenas uma vez com o valor formatado do título
		checkbox.setAttribute('data-gtm-name', formatGtmText(titleText));
		checkbox.setAttribute('data-gtm-clicktype', 'checkbox');
		checkbox.setAttribute('data-gtm-subname', formatGtmText(checkboxLabel));
	});
}
