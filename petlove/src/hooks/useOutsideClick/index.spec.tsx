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

	it("should call the callback when a click occurs outside the element", () => {
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

	it("should not call the callback when a click occurs inside the element", () => {
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

	it("should respond to touch events", () => {
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

	it("should remove event listeners when the component is unmounted", () => {
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

	it("should work with the alternative implementation useOutsideClickAlt", () => {
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
