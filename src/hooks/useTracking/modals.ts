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
	window.addEventListener('pushState', checkModalChange);
	window.addEventListener('replaceState', checkModalChange);

	// Criar versões monitoradas dos métodos history.pushState e history.replaceState
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;

	// Sobrescrever pushState
	history.pushState = function(data: Record<string, unknown>, unused: string, url?: string | URL | null) {
		const result = originalPushState.apply(this, [data, unused, url]);
		window.dispatchEvent(new Event('pushState'));
		return result;
	};

	// Sobrescrever replaceState
	history.replaceState = function(data: Record<string, unknown>, unused: string, url?: string | URL | null) {
		const result = originalReplaceState.apply(this, [data, unused, url]);
		window.dispatchEvent(new Event('replaceState'));
		return result;
	};
}
