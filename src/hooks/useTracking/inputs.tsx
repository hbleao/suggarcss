import { formatGtmText } from './utils';

export function inputs(): void {
	const inputs = document.querySelectorAll(
		'.input__field',
	) as NodeListOf<HTMLInputElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	inputs.forEach((input: HTMLInputElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		
		// Corrigindo a lógica para garantir que inputname seja 'sem-label' quando o nome estiver vazio
		const inputName = input?.name || '';
		const inputValue = inputName.trim() || 'sem-valor';

		// Define o atributo data-gtm-name apenas uma vez com o valor formatado do título
		input.setAttribute('data-gtm-name', formatGtmText(titleText));
		input.setAttribute('data-gtm-inputtype', input.type || 'text');
		input.setAttribute('data-gtm-subname', formatGtmText(inputValue));
	});
}
