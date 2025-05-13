export function modals() {
	let currentModal: string | null = null;

	const getModalNameFromURL = (): string => {
		const searchParams = new URLSearchParams(window.location.search);
		return searchParams.get('modal') || '';
	};

	const triggerEvent = (action: 'open' | 'close', name: string) => {
		window.dataLayer.push({
			event: 'modal',
			action,
			name,
		});
	};

	const checkModalChange = () => {
		const newModal = getModalNameFromURL();
		if (newModal !== currentModal) {
			currentModal = newModal;
			triggerEvent('open', currentModal);
		}

		if (!newModal && currentModal) {
			triggerEvent('close', currentModal);
			currentModal = null;
		}
	};

	checkModalChange();

	window.addEventListener('popstate', checkModalChange);
	window.addEventListener('pushstate', checkModalChange);
	window.addEventListener('replacestate', checkModalChange);

	// biome-ignore lint/complexity/noForEach: <explanation>
	['pushstate', 'replacestate'].forEach((type) => {
		const original = history[type as 'pushstate'];

		history[type as 'pushstate'] = function (...args) {
			const result = original.apply(this, args);
			window.dispatchEvent(new Event(type.toLocaleLowerCase()));
			return result;
		};
	});
}
