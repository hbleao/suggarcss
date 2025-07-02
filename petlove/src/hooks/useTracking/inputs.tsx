import { formatGtmText } from './utils';

export function inputs(): void {
	const inputs = document.querySelectorAll(
		'.input__field',
	) as NodeListOf<HTMLInputElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	inputs.forEach((input: HTMLInputElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';

		const inputName = input?.name || '';
		const inputValue = inputName.trim() || 'sem-valor';

		input.setAttribute('data-gtm-name', formatGtmText(titleText));
		input.setAttribute('data-gtm-inputtype', input.type || 'text');
		input.setAttribute('data-gtm-subname', formatGtmText(inputValue));
	});
}
