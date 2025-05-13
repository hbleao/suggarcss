import { formatGtmText } from '@/utils';

export function selects(): void {
	const dropdowns = document.querySelectorAll(
		'.dropdown__root',
	) as NodeListOf<HTMLDivElement>;
	const titleElement = document.querySelector('#gtm-title');
	const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';

	// biome-ignore lint/complexity/noForEach: <explanation>
	dropdowns.forEach((dropdown: HTMLElement) => {
		dropdown.addEventListener('click', () => {
			setTimeout(() => {
				const dropdownItems = dropdown.querySelectorAll('.dropdown__item');

				// biome-ignore lint/complexity/noForEach: <explanation>
				dropdownItems.forEach((item) => {
					item?.addEventListener('click', () => {
						const labelElement = dropdown.querySelector('.dropdown__label');
						const labelText = labelElement?.textContent?.trim() ?? 'sem-valor';

						window.dataLayer.push({
							event: 'auto.event',
							ev_action: `selecionou:${formatGtmText(titleText)}`,
							ev_label: `${formatGtmText(labelText)}:${formatGtmText(item.innerHTML)}`,
						});
					});
				});
			}, 0);
		});
	});
}
