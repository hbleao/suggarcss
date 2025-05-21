import { renderHook } from "@testing-library/react";
import { useTracking } from "./index";

// Mock das funções de rastreamento
jest.mock("./buttons", () => ({
	buttons: jest.fn(),
}));

jest.mock("./inputs", () => ({
	inputs: jest.fn(),
}));

jest.mock("./checkbox", () => ({
	checkbox: jest.fn(),
}));

jest.mock("./select", () => ({
	selects: jest.fn(),
}));

jest.mock("./link", () => ({
	link: jest.fn(),
}));

jest.mock("./modals", () => ({
	modals: jest.fn(),
}));

describe("useTracking", () => {
	// Salvar o MutationObserver original
	const originalMutationObserver = global.MutationObserver;

	beforeEach(() => {
		// Configurar o mock do dataLayer
		window.dataLayer = [];

		// Mock do MutationObserver
		global.MutationObserver = jest.fn().mockImplementation(() => ({
			observe: jest.fn(),
			disconnect: jest.fn(),
			takeRecords: jest.fn(),
		})) as unknown as typeof MutationObserver;

		// Resetar os mocks
		jest.clearAllMocks();
	});

	afterEach(() => {
		// Restaurar o MutationObserver original
		global.MutationObserver = originalMutationObserver;
	});

	it("deve inicializar o dataLayer", () => {
		renderHook(() => useTracking());
		expect(window.dataLayer).toBeDefined();
	});

	it("deve chamar todas as funções de rastreamento na montagem", () => {
		renderHook(() => useTracking());

		expect(require("./buttons").buttons).toHaveBeenCalled();
		expect(require("./inputs").inputs).toHaveBeenCalled();
		expect(require("./checkbox").checkbox).toHaveBeenCalled();
		expect(require("./select").selects).toHaveBeenCalled();
		expect(require("./link").link).toHaveBeenCalled();
		expect(require("./modals").modals).toHaveBeenCalled();
	});

	it("deve configurar o MutationObserver corretamente", () => {
		renderHook(() => useTracking());

		expect(MutationObserver).toHaveBeenCalled();
		const mockObserverInstance = (MutationObserver as jest.Mock).mock.instances[0];
		expect(mockObserverInstance.observe).toHaveBeenCalledWith(
			document.body,
			expect.objectContaining({
				childList: true,
				subtree: true,
			})
		);
	});

	it("deve desconectar o observer quando o componente é desmontado", () => {
		const { unmount } = renderHook(() => useTracking());

		unmount();

		const mockObserverInstance = (MutationObserver as jest.Mock).mock.instances[0];
		expect(mockObserverInstance.disconnect).toHaveBeenCalled();
	});

	it("não deve fazer nada se window não estiver definido", () => {
		// Salvar a referência original de window
		const originalWindow = global.window;

		// Simular um ambiente sem window (SSR)
		// @ts-ignore
		global.window = undefined;

		renderHook(() => useTracking());

		// Verificar que nenhuma função de rastreamento foi chamada
		expect(require("./buttons").buttons).not.toHaveBeenCalled();

		// Restaurar window
		global.window = originalWindow;
	});
});
