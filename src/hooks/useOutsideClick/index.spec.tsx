import { renderHook, act } from "@testing-library/react";
import { useOutsideClick } from "./index";

describe("useOutsideClick", () => {
	let container: HTMLDivElement;
	let outsideElement: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement("div");
		container.setAttribute("data-testid", "container");

		outsideElement = document.createElement("div");
		outsideElement.setAttribute("data-testid", "outside");

		document.body.appendChild(container);
		document.body.appendChild(outsideElement);
	});

	afterEach(() => {
		if (document.body.contains(container)) {
			document.body.removeChild(container);
		}
		if (document.body.contains(outsideElement)) {
			document.body.removeChild(outsideElement);
		}
	});

	it("deve chamar o callback quando ocorre um clique fora do elemento", () => {
		const callback = jest.fn();

		const { result } = renderHook(() => useOutsideClick(callback));

		Object.defineProperty(result.current, "current", {
			value: container,
		});
		act(() => {
			outsideElement.dispatchEvent(
				new MouseEvent("mousedown", { bubbles: true }),
			);
		});

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("não deve chamar o callback quando ocorre um clique dentro do elemento", () => {
		const callback = jest.fn();

		const { result } = renderHook(() => useOutsideClick(callback));

		Object.defineProperty(result.current, "current", {
			value: container,
		});
		act(() => {
			container.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
		});

		expect(callback).not.toHaveBeenCalled();
	});

	it("deve responder a eventos de toque", () => {
		const callback = jest.fn();

		const { result } = renderHook(() => useOutsideClick(callback));

		Object.defineProperty(result.current, "current", {
			value: container,
		});
		act(() => {
			outsideElement.dispatchEvent(
				new TouchEvent("touchstart", { bubbles: true }),
			);
		});

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("deve remover os event listeners quando o componente é desmontado", () => {
		const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
		const callback = jest.fn();

		const { unmount } = renderHook(() => useOutsideClick(callback));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"mousedown",
			expect.any(Function),
		);
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"touchstart",
			expect.any(Function),
		);

		removeEventListenerSpy.mockRestore();
	});

	it("deve funcionar com a implementação alternativa useOutsideClickAlt", () => {
		const { useOutsideClickAlt } = require("./index");

		const callback = jest.fn();

		const { result } = renderHook(() => useOutsideClickAlt(callback));

		Object.defineProperty(result.current, "current", {
			value: container,
		});
		act(() => {
			outsideElement.dispatchEvent(
				new MouseEvent("mousedown", { bubbles: true }),
			);
		});

		expect(callback).toHaveBeenCalledTimes(1);

		act(() => {
			container.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
		});

		expect(callback).toHaveBeenCalledTimes(1);
	});
});
