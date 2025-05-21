import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "../useCopyToClipboard";

describe("useCopyToClipboard", () => {
	const mockClipboard = {
		writeText: jest.fn(),
	};

	beforeEach(() => {
		Object.defineProperty(navigator, "clipboard", {
			value: mockClipboard,
			writable: true,
		});
		jest.clearAllMocks();
	});

	it("deve inicializar com valores padrão", () => {
		const { result } = renderHook(() => useCopyToClipboard());

		expect(result.current[0]).toBeNull();
		expect(typeof result.current[1]).toBe("function");
	});

	it("deve copiar texto para a área de transferência com sucesso", async () => {
		mockClipboard.writeText.mockResolvedValueOnce(undefined);

		const { result } = renderHook(() => useCopyToClipboard());

		await act(async () => {
			await result.current[1]("Texto a ser copiado");
		});

		expect(mockClipboard.writeText).toHaveBeenCalledWith("Texto a ser copiado");

		expect(result.current[0]).toBe("Texto a ser copiado");
	});

	it("deve lidar com erros ao copiar para a área de transferência", async () => {
		const mockError = new Error("Erro ao copiar");
		mockClipboard.writeText.mockRejectedValueOnce(mockError);

		jest.spyOn(console, "error").mockImplementation(() => {});

		const { result } = renderHook(() => useCopyToClipboard());

		await act(async () => {
			await result.current[1]("Texto que falhará");
		});
		expect(mockClipboard.writeText).toHaveBeenCalledWith("Texto que falhará");

		expect(result.current[0]).toBeNull();

		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});

	it("deve copiar diferentes tipos de texto", async () => {
		mockClipboard.writeText.mockResolvedValue(undefined);

		const { result } = renderHook(() => useCopyToClipboard());

		await act(async () => {
			await result.current[1]("Texto simples");
		});
		expect(mockClipboard.writeText).toHaveBeenLastCalledWith("Texto simples");
		expect(result.current[0]).toBe("Texto simples");

		const jsonObject = { name: "Test", value: 42 };
		const jsonString = JSON.stringify(jsonObject);

		await act(async () => {
			await result.current[1](jsonString);
		});
		expect(mockClipboard.writeText).toHaveBeenLastCalledWith(jsonString);
		expect(result.current[0]).toBe(jsonString);

		const codeSnippet = "const x = 42; console.log(x);";

		await act(async () => {
			await result.current[1](codeSnippet);
		});
		expect(mockClipboard.writeText).toHaveBeenLastCalledWith(codeSnippet);
		expect(result.current[0]).toBe(codeSnippet);
	});
});
