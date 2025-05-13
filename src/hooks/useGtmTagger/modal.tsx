let modalListenersInitialized = false;
let currentModal: string | null = null;

export function modals() {
	if (modalListenersInitialized) return;
	modalListenersInitialized = true;

	const getModalNameFromURL = (): string => {
		const searchParams = new URLSearchParams(window.location.search);
		return searchParams.get("modal") || "";
	};

	const triggerEvent = (action: "open" | "close", name: string) => {
		if (!name) return;
		window.dataLayer.push({
			event: "modal",
			action,
			name,
		});
	};

	const checkModalChange = () => {
		const newModal = getModalNameFromURL();

		if (currentModal && !newModal) {
			triggerEvent("close", currentModal);
			currentModal = null;
		} else if (!currentModal && newModal) {
			currentModal = newModal;
			triggerEvent("open", currentModal);
		} else if (currentModal !== newModal) {
			triggerEvent("close", currentModal);
			currentModal = newModal;
			triggerEvent("open", currentModal);
		}
	};

	// Executa imediatamente
	checkModalChange();

	// Observa mudanças de rota
	window.addEventListener("popstate", checkModalChange);
	window.addEventListener("pushstate", checkModalChange);
	window.addEventListener("replacestate", checkModalChange);

	["pushState", "replaceState"].forEach((type) => {
		const original = history[type as "pushState"];
		history[type as "pushState"] = function (...args) {
			const result = original.apply(this, args);
			window.dispatchEvent(new Event(type.toLowerCase()));
			return result;
		};
	});
}
