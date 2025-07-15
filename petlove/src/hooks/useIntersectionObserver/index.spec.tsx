import { act, renderHook } from "@testing-library/react";
import { useRef } from "react";
import { useIntersectionObserver } from ".";

describe("useIntersectionObserver", () => {
	class MockIntersectionObserver {
		callback: IntersectionObserverCallback;
		observe: jest.Mock;
		unobserve: jest.Mock;
		disconnect: jest.Mock;

		constructor(callback: IntersectionObserverCallback) {
			this.callback = callback;
			this.observe = jest.fn();
			this.unobserve = jest.fn();
			this.disconnect = jest.fn();
		}

		simulateIntersection(
			isIntersecting: boolean,
			entry?: Partial<IntersectionObserverEntry>,
		) {
			const defaultEntry = {
				isIntersecting,
				boundingClientRect: {} as DOMRectReadOnly,
				intersectionRatio: isIntersecting ? 1 : 0,
				intersectionRect: {} as DOMRectReadOnly,
				rootBounds: null,
				target: {} as Element,
				time: Date.now(),
			};

			this.callback(
				[
					{
						...defaultEntry,
						...entry,
					},
				] as IntersectionObserverEntry[],
				this as unknown as IntersectionObserver,
			);
		}
	}

	let mockObserver: MockIntersectionObserver;

	beforeEach(() => {
		mockObserver = null as unknown as MockIntersectionObserver;

		global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
			mockObserver = new MockIntersectionObserver(callback);
			return mockObserver;
		});
	});

	it("deve inicializar com valores padrão", () => {
		const { result } = renderHook(() => {
			const ref = useRef(null);
			return useIntersectionObserver(ref);
		});

		expect(result.current.isIntersecting).toBe(false);
		expect(result.current.entry).toBeNull();
	});

	it("deve atualizar o estado quando o elemento entra na viewport", () => {
		const { result } = renderHook(() => {
			const ref = useRef(document.createElement("div"));
			return useIntersectionObserver(ref);
		});

		expect(result.current.isIntersecting).toBe(false);
		expect(result.current.entry).toBeNull();

		expect(mockObserver.observe).toHaveBeenCalledWith(expect.any(Element));

		const mockTarget = document.createElement("div");
		const mockEntry = {
			isIntersecting: true,
			intersectionRatio: 0.8,
			target: mockTarget,
		};

		act(() => {
			mockObserver.simulateIntersection(true, mockEntry);
		});

		expect(result.current.isIntersecting).toBe(true);
		expect(result.current.entry).toEqual(
			expect.objectContaining({
				isIntersecting: true,
				intersectionRatio: 0.8,
				target: mockTarget,
			}),
		);
	});

	it("deve aceitar opções personalizadas", () => {
		const options = {
			rootMargin: "20px",
			threshold: [0, 0.5, 1],
			root: document.createElement("div"),
		};

		const constructorSpy = jest.spyOn(global, "IntersectionObserver");

		renderHook(() => {
			const ref = useRef(document.createElement("div"));
			return useIntersectionObserver(ref, options);
		});

		expect(constructorSpy).toHaveBeenCalledWith(expect.any(Function), options);
	});

	it("deve limpar o observer quando o componente é desmontado", () => {
		const { unmount } = renderHook(() => {
			const ref = useRef(document.createElement("div"));
			return useIntersectionObserver(ref);
		});

		expect(mockObserver.observe).toHaveBeenCalled();

		unmount();

		expect(mockObserver.disconnect).toHaveBeenCalled();
	});

	it("deve lidar com diferentes valores de threshold", () => {
		jest.clearAllMocks();

		renderHook(() => {
			const ref = useRef(document.createElement("div"));
			return useIntersectionObserver(ref, { threshold: 0.5 });
		});

		expect(global.IntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			expect.objectContaining({ threshold: 0.5 }),
		);

		jest.clearAllMocks();

		renderHook(() => {
			const ref = useRef(document.createElement("div"));
			return useIntersectionObserver(ref, {
				threshold: [0, 0.25, 0.5, 0.75, 1],
			});
		});

		expect(global.IntersectionObserver).toHaveBeenCalledWith(
			expect.any(Function),
			expect.objectContaining({ threshold: [0, 0.25, 0.5, 0.75, 1] }),
		);
	});

	it("não deve observar se o elemento de referência for null", () => {
		jest.clearAllMocks();

		const testMockObserver = new MockIntersectionObserver(() => { });
		global.IntersectionObserver = jest
			.fn()
			.mockImplementation(() => testMockObserver);

		renderHook(() => {
			const ref = useRef(null);
			return useIntersectionObserver(ref);
		});

		expect(testMockObserver.observe).not.toHaveBeenCalled();
	});
});
