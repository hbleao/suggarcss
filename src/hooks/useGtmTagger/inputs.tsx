import { formatGtmText } from '@/utils';

export function inputs(): void {
	const inputs = document.querySelectorAll(
		'.input__field',
	) as NodeListOf<HTMLInputElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	inputs.forEach((input: HTMLInputElement) => {
		const titleElement = document.querySelector('#gtm-title');
		const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';
		const inputname = input?.name?.trim() ?? 'sem-label';

		input.setAttribute('data-gtm-name', 'form');
		input.setAttribute('data-gtm-clicktype', 'input');
		input.setAttribute('data-gtm-name', formatGtmText(titleText));
		input.setAttribute('data-gtm-subname', formatGtmText(inputname));
	});
}
