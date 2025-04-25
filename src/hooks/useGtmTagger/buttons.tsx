import { formatGtmText } from "@/utils";

export function buttons(): void {
	const buttons = document.querySelectorAll("button");

	// biome-ignore lint/complexity/noForEach: <explanation>
	buttons.forEach((button: HTMLButtonElement) => {
		const titleElement = document.querySelector("#gtm-title");
		const titleText = titleElement?.textContent?.trim() ?? "sem-titulo";
		const buttonLabel = button?.title.trim() ?? "sem-label";

		button.setAttribute("data-gtm-name", "click");
		button.setAttribute("data-gtm-clicktype", "button");
		button.setAttribute("data-gtm-name", formatGtmText(titleText));
		button.setAttribute("data-gtm-subname", formatGtmText(buttonLabel));
	});
}
