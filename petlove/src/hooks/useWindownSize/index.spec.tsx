import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from ".";

describe("useWindowSize", () => {
	const originalInnerWidth = window.innerWidth;
	const originalInnerHeight = window.innerHeight;

	const fireResize = (width: number, height: number) => {
		window.innerWidth = width;
		window.innerHeight = height;
		window.dispatchEvent(new Event("resize"));
	};

	afterEach(() => {
		window.innerWidth = originalInnerWidth;
		window.innerHeight = originalInnerHeight;
	});

	it("deve retornar as dimensões iniciais da janela", () => {
		const { result } = renderHook(() => useWindowSize());

		expect(result.current.width).toBe(window.innerWidth);
		expect(result.current.height).toBe(window.innerHeight);
	});

	it("deve atualizar as dimensões quando a janela é redimensionada", () => {
		act(() => {
			fireResize(500, 500);
		});

		const { result } = renderHook(() => useWindowSize());

		const initialWidth = result.current.width;
		const initialHeight = result.current.height;

		expect(initialWidth).toBe(500);
		expect(initialHeight).toBe(500);

		act(() => {
			fireResize(1024, 768);
		});

		expect(result.current.width).toBe(1024);
		expect(result.current.height).toBe(768);
		expect(result.current.width).not.toBe(initialWidth);
		expect(result.current.height).not.toBe(initialHeight);
		act(() => {
			fireResize(800, 600);
		});

		expect(result.current.width).toBe(800);
		expect(result.current.height).toBe(600);
	});

	it("deve lidar com múltiplos redimensionamentos", () => {
		const { result } = renderHook(() => useWindowSize());

		act(() => {
			fireResize(1280, 720);
		});
		expect(result.current.width).toBe(1280);
		expect(result.current.height).toBe(720);

		act(() => {
			fireResize(1920, 1080);
		});
		expect(result.current.width).toBe(1920);
		expect(result.current.height).toBe(1080);

		act(() => {
			fireResize(375, 667);
		});
		expect(result.current.width).toBe(375);
		expect(result.current.height).toBe(667);
	});
});
