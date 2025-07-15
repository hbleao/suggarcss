import { renderHook } from "@testing-library/react";
import { useMediaQuery } from ".";

describe("useMediaQuery", () => {
	const mockMatchMedia = (matches: boolean) => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches,
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	};

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllMocks();
	});

	it("deve retornar true quando a media query corresponde", () => {
		mockMatchMedia(true);
		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
		expect(result.current).toBe(true);
	});

	it("deve retornar false quando a media query não corresponde", () => {
		mockMatchMedia(false);
		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
		expect(result.current).toBe(false);
	});

	it("deve chamar matchMedia com a query correta", () => {
		mockMatchMedia(true);
		renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"));
		expect(window.matchMedia).toHaveBeenCalledWith(
			"(prefers-color-scheme: dark)",
		);
	});

	it("deve lidar com diferentes tipos de media queries", () => {
		mockMatchMedia(true);
		const { result: result1 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)"),
		);
		expect(result1.current).toBe(true);
		expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");

		mockMatchMedia(false);
		const { result: result2 } = renderHook(() =>
			useMediaQuery("(max-width: 480px)"),
		);
		expect(result2.current).toBe(false);
		expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 480px)");

		mockMatchMedia(true);
		const { result: result3 } = renderHook(() =>
			useMediaQuery("(prefers-color-scheme: dark)"),
		);
		expect(result3.current).toBe(true);
		expect(window.matchMedia).toHaveBeenCalledWith(
			"(prefers-color-scheme: dark)",
		);

		mockMatchMedia(false);
		const { result: result4 } = renderHook(() =>
			useMediaQuery("(orientation: landscape)"),
		);
		expect(result4.current).toBe(false);
		expect(window.matchMedia).toHaveBeenCalledWith("(orientation: landscape)");
	});
});
