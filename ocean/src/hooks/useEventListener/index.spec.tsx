import { renderHook, act } from "@testing-library/react";
import useEventListener from "./index";
import { useRef } from "react";

describe("useEventListener", () => {
	it("Deve adicionar um event listener ao document por padrão", () => {
		// Criar um handler mockado
		const handler = jest.fn();

		// Criar um spy para o addEventListener do window
		const windowAddEventListenerSpy = jest.spyOn(window, "addEventListener");
		const windowRemoveEventListenerSpy = jest.spyOn(window, "removeEventListener");

		// Limpar os spies antes do teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Renderizar o hook
		const { unmount } = renderHook(() => useEventListener("click", handler));

		// Verificar se o event listener foi adicionado ao window (comportamento padrão)
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function), undefined);

		// Simular um clique no window
		act(() => {
			window.dispatchEvent(new MouseEvent("click"));
		});

		// Verificar se o handler foi chamado
		expect(handler).toHaveBeenCalledTimes(1);

		// Desmontar o hook
		unmount();

		// Verificar se o event listener foi removido
		expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function), undefined);

		// Restaurar os spies
		windowAddEventListenerSpy.mockRestore();
		windowRemoveEventListenerSpy.mockRestore();
	});

	it("deve adicionar um event listener a um elemento específico", () => {
		const element = document.createElement("div");
		const addEventListenerSpy = jest.spyOn(element, "addEventListener");
		const removeEventListenerSpy = jest.spyOn(element, "removeEventListener");

		const handler = jest.fn();

		const { result, unmount } = renderHook(() => {
			const ref = useRef(element);
			useEventListener("click", handler, ref);
			return ref;
		});

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"click",
			expect.any(Function),
			undefined,
		);

		result.current.current.dispatchEvent(new MouseEvent("click"));

		expect(handler).toHaveBeenCalledTimes(1);
		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"click",
			expect.any(Function),
			undefined,
		);

		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});

	it("deve adicionar event listeners com opções", () => {
		// Criar um handler mockado
		const handler = jest.fn();
		const options = { capture: true, passive: true };

		// Criar um spy para o addEventListener do window
		const windowAddEventListenerSpy = jest.spyOn(window, "addEventListener");
		const windowRemoveEventListenerSpy = jest.spyOn(window, "removeEventListener");

		// Limpar os spies antes do teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Renderizar o hook
		const { unmount } = renderHook(() =>
			useEventListener("scroll", handler, null, options),
		);

		// Verificar se o event listener foi adicionado com as opções corretas
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), options);

		// Desmontar o hook
		unmount();

		// Verificar se o event listener foi removido
		expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), options);

		// Restaurar os spies
		windowAddEventListenerSpy.mockRestore();
		windowRemoveEventListenerSpy.mockRestore();
	});

	it("deve lidar com diferentes tipos de eventos", () => {
		// Criar um handler mockado
		const handler = jest.fn();

		// Criar um spy para o addEventListener do window
		const windowAddEventListenerSpy = jest.spyOn(window, "addEventListener");
		const windowRemoveEventListenerSpy = jest.spyOn(window, "removeEventListener");

		// Limpar os spies antes do teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Testar mousedown
		const { unmount: unmount1 } = renderHook(() =>
			useEventListener("mousedown", handler),
		);
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function), undefined);
		unmount1();
		
		// Limpar os spies para o próximo teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Testar keypress
		const { unmount: unmount2 } = renderHook(() =>
			useEventListener("keypress", handler),
		);
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("keypress", expect.any(Function), undefined);
		unmount2();
		
		// Limpar os spies para o próximo teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Testar focus
		const { unmount: unmount3 } = renderHook(() =>
			useEventListener("focus", handler),
		);
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("focus", expect.any(Function), undefined);
		unmount3();
		
		// Limpar os spies para o próximo teste
		windowAddEventListenerSpy.mockClear();
		windowRemoveEventListenerSpy.mockClear();

		// Testar touchstart
		const { unmount: unmount4 } = renderHook(() =>
			useEventListener("touchstart", handler),
		);
		expect(windowAddEventListenerSpy).toHaveBeenCalledWith("touchstart", expect.any(Function), undefined);
		unmount4();

		// Restaurar os spies
		windowAddEventListenerSpy.mockRestore();
		windowRemoveEventListenerSpy.mockRestore();
	});

	it("não deve adicionar event listener se o elemento for null", () => {
		const addEventListenerSpy = jest.spyOn(document, "addEventListener");
		const handler = jest.fn();

		const { unmount } = renderHook(() => {
			// Corrigindo a tipagem para ser compatível com o hook
			const ref = useRef<HTMLDivElement | null>(null);
			useEventListener("click", handler, ref);
			return ref;
		});

		expect(addEventListenerSpy).not.toHaveBeenCalled();

		unmount();

		addEventListenerSpy.mockRestore();
	});
});
