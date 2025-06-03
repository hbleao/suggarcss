import { formatGtmText } from './utils';

export function buttons(): void {
	const buttons = document.querySelectorAll('button');
	const titleElement = document.querySelector('#gtm-title');

	// biome-ignore lint/complexity/noForEach: <explanation>
	buttons.forEach((button: HTMLButtonElement) => {
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		// Corrigindo a lógica para garantir que buttonLabel seja 'sem-label' quando o título estiver vazio
		const buttonTitle = button?.title || '';
		const buttonLabel = buttonTitle.trim() || 'sem-label';
		// Define o atributo data-gtm-name apenas uma vez com o valor formatado do título
		button.setAttribute('data-gtm-name', formatGtmText(titleText));
		button.setAttribute('data-gtm-clicktype', 'button');
		button.setAttribute('data-gtm-subname', formatGtmText(buttonLabel));
	});
}
