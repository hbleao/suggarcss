"use client";

import { useEffect } from "react";
import { formatGtmText } from "@/utils";

// Utilitario: busca o contexto de titulo dinamicamente
function getTitleContext(el: HTMLElement): string {
	const container = el.closest(".modal__root, .section, body");
	const title =
		container
			?.querySelector("#gtm-title, .modal__title, h1, h2")
			?.textContent?.trim() ?? "sem-titulo";
	return formatGtmText(title);
}

// Tagueamento dos botoes
function tagButtons(): void {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button: HTMLButtonElement) => {
		const titleText = getTitleContext(button);
		const buttonLabel =
			button?.title.trim() || button?.innerText.trim() || "sem-label";

		button.setAttribute("data-gtm-name", formatGtmText(titleText));
		button.setAttribute("data-gtm-clicktype", "button");
		button.setAttribute("data-gtm-subname", formatGtmText(buttonLabel));
	});
}

// Tagueamento dos inputs
function tagInputs(): void {
	const inputs = document.querySelectorAll(
		".input__field",
	) as NodeListOf<HTMLInputElement>;
	inputs.forEach((input) => {
		const titleText = getTitleContext(input);
		const inputName =
			input?.name?.trim() || input?.placeholder?.trim() || "sem-label";

		input.setAttribute("data-gtm-name", formatGtmText(titleText));
		input.setAttribute("data-gtm-clicktype", "input");
		input.setAttribute("data-gtm-subname", formatGtmText(inputName));
	});
}

// Tagueamento dos checkboxes
function tagCheckboxes(): void {
	const checkboxes = document.querySelectorAll(
		".checkbox__input",
	) as NodeListOf<HTMLInputElement>;
	checkboxes.forEach((checkbox) => {
		const titleText = getTitleContext(checkbox);
		const checkboxLabel =
			checkbox?.title?.trim() || checkbox?.name?.trim() || "sem-label";

		checkbox.setAttribute("data-gtm-name", formatGtmText(titleText));
		checkbox.setAttribute("data-gtm-clicktype", "checkbox");
		checkbox.setAttribute("data-gtm-subname", formatGtmText(checkboxLabel));
	});
}

// Tagueamento dos links
function tagLinks(): void {
	const links = document.querySelectorAll(
		".link",
	) as NodeListOf<HTMLAnchorElement>;
	links.forEach((link) => {
		const titleText = getTitleContext(link);
		const linkLabel =
			link?.innerText?.trim() || link?.title?.trim() || "sem-label";

		link.setAttribute("data-gtm-name", formatGtmText(titleText));
		link.setAttribute("data-gtm-clicktype", "link");
		link.setAttribute("data-gtm-subname", formatGtmText(linkLabel));
	});
}

// Hook principal
export function useGtmTagger(): void {
	useEffect(() => {
		if (typeof window === "undefined") return;

		window.dataLayer = window.dataLayer || [];

		function applyTagging() {
			tagButtons();
			tagInputs();
			tagCheckboxes();
			tagLinks();
		}

		applyTagging();

		const observer = new MutationObserver(() => {
			applyTagging();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		const modalObserver = new MutationObserver(() => {
			const modals = document.querySelectorAll(".modal__root");

			modals.forEach((modal) => {
				const isVisible = getComputedStyle(modal).display !== "none";
				const title = modal.querySelector(".modal__title, h2")?.textContent?.trim() ?? "sem-titulo";
		
				if (isVisible) {
					window.dataLayer.push({
						event: "modal",
						action: "open",
						name: formatGtmText(title),
					});
					console.log("🔓 Modal aberto:", title);
				} else {
					window.dataLayer.push({
						event: "modal",
						action: "close",
						name: formatGtmText(title),
					});
					console.log("🔒 Modal fechado:", title);
				}
			});

		modalObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["class", "style"],
		});

		return () => {
			observer.disconnect();
			modalObserver.disconnect();
		};
	}, []);
}
