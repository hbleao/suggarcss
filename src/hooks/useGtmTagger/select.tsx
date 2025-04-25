export function selects(): void {
	const selectList = document.querySelectorAll(
		'.dropdown__root',
	) as NodeListOf<HTMLDivElement>;

	// biome-ignore lint/complexity/noForEach: <explanation>
	selectList.forEach((selectEl: HTMLDivElement) => {
		const liEl = selectEl.querySelector('.dropdown__item') as HTMLLIElement;

		// const handler = () => {
		// 	setTimeout(() => {
		// 		console.log('Tagging select');
		// 	}, 0);
		// 	const labelEl = selectEl.querySelector(
		// 		'.dropdown__label',
		// 	) as HTMLLabelElement;

		// 	const label = labelEl?.innerText || 'Sem label';
		// 	const field = liEl?.innerText || 'Sem field';

		// 	const ev_label = `${formatGtmText(label)}:${formatGtmText(field)}`;
		// 	console.log(ev_label);
		// 	window.dataLayer.push({
		// 		event: 'auto.event',
		// 		ev_action: 'selecionou',
		// 		ev_label,
		// 	});
		// };

		liEl?.addEventListener('click', () => {
			console.log('element');
		});
	});
}
