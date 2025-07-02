import { renderHook, act } from "@testing-library/react";
import { useOnScreen } from "./index";
import { useRef } from "react";

describe("useOnScreen", () => {
	// Definir a classe e o tipo do mock
	class MockIntersectionObserver {
		callback: IntersectionObserverCallback;
		observe = jest.fn();
		unobserve = jest.fn();
		disconnect = jest.fn();

		constructor(callback: IntersectionObserverCallback) {
			this.callback = callback;
		}

		simulateIntersection(isIntersecting: boolean) {
			this.callback(
				[
					{
						isIntersecting,
						boundingClientRect: {} as DOMRectReadOnly,
						intersectionRatio: isIntersecting ? 1 : 0,
						intersectionRect: {} as DOMRectReadOnly,
						rootBounds: null,
						target: {} as Element,
						time: Date.now(),
					},
				],
				this as unknown as IntersectionObserver,
			);
		}
	}

	beforeEach(() => {
		global.IntersectionObserver =
			MockIntersectionObserver as unknown as typeof IntersectionObserver;
	});

	it("deve inicializar com isIntersecting como false", () => {
		const { result } = renderHook(() => {
			// Corrigindo a tipagem para ser compatível com o hook
			const ref = useRef<HTMLDivElement | null>(null);
			const isVisible = useOnScreen(ref as React.RefObject<HTMLDivElement>);
			return { ref, isVisible };
		});

		expect(result.current.isVisible).toBe(false);
	});

	it("deve atualizar isIntersecting quando o elemento entra na viewport", () => {
		// Inicializar a variável observer com um valor padrão
		let observer = new MockIntersectionObserver(() => {});

		// Limpar todos os mocks antes do teste
		jest.clearAllMocks();

		// Usar uma implementação mais direta do IntersectionObserver
		const originalIntersectionObserver = global.IntersectionObserver;
		global.IntersectionObserver = jest.fn((callback) => {
			observer = new MockIntersectionObserver(callback);
			return observer as unknown as IntersectionObserver;
		}) as unknown as typeof IntersectionObserver;

		const { result, rerender } = renderHook(() => {
			const ref = useRef(document.createElement("div"));
			const isVisible = useOnScreen(ref);
			return { ref, isVisible };
		});

		// Verificar estado inicial
		expect(result.current.isVisible).toBe(false);
		expect(observer.observe).toHaveBeenCalledWith(result.current.ref.current);

		// Simular entrada na viewport e verificar atualização do estado
		act(() => {
			observer.simulateIntersection(true);
		});
		
		// Forçar uma re-renderização para garantir que o estado foi atualizado
		rerender();
		expect(result.current.isVisible).toBe(true);

		// Simular saída da viewport
		act(() => {
			observer.simulateIntersection(false);
		});
		
		// Forçar uma re-renderização para garantir que o estado foi atualizado
		rerender();
		expect(result.current.isVisible).toBe(false);

		// Restaurar o IntersectionObserver original
		global.IntersectionObserver = originalIntersectionObserver;
	});

	it("deve aceitar opções personalizadas", () => {
		const options = {
			rootMargin: "10px",
			threshold: 0.5,
			root: document.createElement("div"),
		};

		// Limpar todos os mocks antes do teste
		jest.clearAllMocks();

		// Usar uma implementação mais direta do IntersectionObserver
		const originalIntersectionObserver = global.IntersectionObserver;
		const mockIntersectionObserverConstructor = jest.fn();
		
		// Criar um mock que retorna um objeto com os métodos necessários
		global.IntersectionObserver = mockIntersectionObserverConstructor as unknown as typeof IntersectionObserver;
		mockIntersectionObserverConstructor.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn(),
		}));

		renderHook(() => {
			const ref = useRef(document.createElement("div"));
			const isVisible = useOnScreen(ref, options);
			return { ref, isVisible };
		});

		// Verificar se o IntersectionObserver foi chamado com as opções corretas
		expect(mockIntersectionObserverConstructor).toHaveBeenCalled();
		const callOptions = mockIntersectionObserverConstructor.mock.calls[0][1];
		expect(callOptions).toEqual(options);

		// Restaurar o IntersectionObserver original
		global.IntersectionObserver = originalIntersectionObserver;
	});

	it("deve limpar o observer quando o componente é desmontado", () => {
		// Inicializar a variável observer com um valor padrão
		let observer = new MockIntersectionObserver(() => {});

		const constructorSpy = jest
			.spyOn(global, "IntersectionObserver")
			.mockImplementation((callback, options) => {
				observer = new MockIntersectionObserver(callback);
				return observer as unknown as IntersectionObserver;
			});

		const { unmount } = renderHook(() => {
			const ref = useRef(document.createElement("div"));
			const isVisible = useOnScreen(ref);
			return { ref, isVisible };
		});

		expect(observer.observe).toHaveBeenCalled();

		unmount();

		expect(observer.unobserve).toHaveBeenCalled();
		expect(observer.disconnect).toHaveBeenCalled();

		constructorSpy.mockRestore();
	});

	it("não deve observar se o elemento de referência for null", () => {
		// Inicializar a variável observer com um valor padrão
		let observer = new MockIntersectionObserver(() => {});

		const constructorSpy = jest
			.spyOn(global, "IntersectionObserver")
			.mockImplementation((callback, options) => {
				observer = new MockIntersectionObserver(callback);
				return observer as unknown as IntersectionObserver;
			});

		renderHook(() => {
			// Corrigindo a tipagem para ser compatível com o hook
			const ref = useRef<HTMLDivElement | null>(null);
			const isVisible = useOnScreen(ref as React.RefObject<HTMLDivElement>);
			return { ref, isVisible };
		});

		expect(observer.observe).not.toHaveBeenCalled();

		constructorSpy.mockRestore();
	});
});
