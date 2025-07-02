import { formatGtmText } from './utils';

export function selects(): void {
	if (typeof window === "undefined") return;
	
	const dropdowns = document.querySelectorAll(
		'.dropdown__root',
	) as NodeListOf<HTMLDivElement>;
	const titleElement = document.querySelector('#gtm-title');
	const titleText = titleElement?.textContent?.trim() ?? 'sem-titulo';

	// biome-ignore lint/complexity/noForEach: <explanation>
	dropdowns.forEach((dropdown: HTMLElement) => {
		// Garantir que o elemento dropdown existe
		if (!dropdown) return;
		
		dropdown.addEventListener('click', () => {
			setTimeout(() => {
				const dropdownItems = dropdown.querySelectorAll('.dropdown__item');

				// biome-ignore lint/complexity/noForEach: <explanation>
				dropdownItems.forEach((item) => {
					// Garantir que o item existe
					if (!item) return;
					
					item.addEventListener('click', () => {
						const labelElement = dropdown.querySelector('.dropdown__label');
						
						// Garantir que window.dataLayer existe
						if (!window.dataLayer) {
							window.dataLayer = [];
						}
						
						// Obter o texto do label ou usar valor padrão
						const labelContent = labelElement?.textContent || '';
						const labelText = labelContent.trim() || 'sem-valor';
						
						// Obter o conteúdo do item ou usar valor padrão
						const itemContent = item.innerHTML || '';
						const itemText = itemContent.trim() || 'sem-texto';

						window.dataLayer.push({
							event: 'auto.event',
							ev_action: `selecionou:${formatGtmText(titleText)}`,
							ev_label: `${formatGtmText(labelText)}:${formatGtmText(itemText)}`,
						});
					});
				});
			}, 0);
		});
	});
}
