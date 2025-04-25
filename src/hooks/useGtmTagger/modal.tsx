"use client";

import { useEffect } from "react";

export function useSelectTagTracker(modalId = "modal") {
	useEffect(() => {
		if (typeof window === "undefined") return;

		window.dataLayer = window.dataLayer || [];

		let observer: MutationObserver | null = null;

		const setupListeners = (modal: HTMLElement) => {
			const handleClick = (e: Event) => {
				const target = (e.target as HTMLElement).closest(".select__option");
				if (!target) return;

				const label = target.getAttribute("data-label");
				const value = target.getAttribute("data-value");
				if (!label || !value) return;

				window.dataLayer?.push({
					event: "select_content",
					ev_action: "consultou",
					ev_label: `${label}:${value}`,
				});

				console.log("📊 Evento enviado:", `${label}:${value}`);
			};

			// Adiciona listeners nas opções já existentes
			const options = modal.querySelectorAll(".select__option");
			options.forEach((el) => {
				el.removeEventListener("click", handleClick);
				el.addEventListener("click", handleClick);
			});

			// Observa futuras mutações
			observer = new MutationObserver(() => {
				const options = modal.querySelectorAll(".select__option");
				options.forEach((el) => {
					el.removeEventListener("click", handleClick);
					el.addEventListener("click", handleClick);
				});
			});

			observer.observe(modal, {
				childList: true,
				subtree: true,
			});
		};

		// Aguardar o modal aparecer
		const interval = setInterval(() => {
			const modal = document.getElementById(modalId);
			if (modal) {
				console.log("✅ Modal encontrado!");
				setupListeners(modal);
				clearInterval(interval);
			}
		}, 100);

		return () => {
			clearInterval(interval);
			observer?.disconnect();
		};
	}, [modalId]);
}
