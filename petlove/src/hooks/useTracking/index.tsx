"use client";
import { useEffect } from "react";

import { buttons } from "./buttons";
import { checkbox } from "./checkbox";
import { inputs } from "./inputs";
import { link } from "./link";
import { modals } from "./modals";
import { selects } from "./select";

// Estender a interface Window para incluir dataLayer
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export const useTracking = () => {
	// Verificar se window existe (para compatibilidade com SSR)
	if (typeof window === "undefined") return;
	
	// Garantir que dataLayer seja um array vazio se não existir
	if (!window.dataLayer) window.dataLayer = [];
	
	// Garantir que dataLayer seja um array
	if (!Array.isArray(window.dataLayer)) window.dataLayer = [];

	useEffect(() => {
		buttons();
		inputs();
		checkbox();
		selects();
		link();
		modals();

		const observer = new MutationObserver(() => {
			buttons();
			inputs();
			checkbox();
			link();
			modals();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			observer.disconnect();
		};
	}, []);
};
