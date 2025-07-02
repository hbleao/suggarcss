import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsync } from "../useAsync";

describe("useAsync", () => {
	const originalConsoleError = console.error;
	beforeAll(() => {
		console.error = jest.fn(); // suprime erros esperados de promessas rejeitadas
	});

	afterAll(() => {
		console.error = originalConsoleError;
	});

	it("inicializa com status 'idle'", () => {
		const asyncFn = jest.fn().mockResolvedValue("data");
		const { result } = renderHook(() => useAsync(asyncFn, false));

		expect(result.current.status).toBe("idle");
		expect(result.current.value).toBeNull();
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
		expect(asyncFn).not.toHaveBeenCalled();
	});

	it("executa a função imediatamente quando 'immediate' é true", async () => {
		const asyncFn = jest.fn().mockResolvedValue("data");
		renderHook(() => useAsync(asyncFn, true));

		expect(asyncFn).toHaveBeenCalledTimes(1);
	});

	it("executa com sucesso e atualiza os estados", async () => {
		const asyncFn = jest.fn().mockResolvedValue("ok");
		const { result } = renderHook(() => useAsync(asyncFn, false));

		await act(async () => {
			await result.current.execute();
		});

		expect(result.current.status).toBe("success");
		expect(result.current.value).toBe("ok");
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it("captura erro corretamente ao executar função com falha", async () => {
		const err = new Error("Erro de teste");
		const asyncFn = jest.fn().mockRejectedValue(err);
		const { result } = renderHook(() => useAsync(asyncFn, false));

		await act(async () => {
			try {
				await result.current.execute();
			} catch {}
		});

		expect(result.current.status).toBe("error");
		expect(result.current.value).toBeNull();
		expect(result.current.error).toBe(err);
		expect(result.current.isLoading).toBe(false);
	});

	it("limpa estados ao executar novamente", async () => {
		const asyncFn = jest.fn().mockResolvedValue("reloaded");
		const { result } = renderHook(() => useAsync(asyncFn, true));

		await waitFor(() => {
			expect(result.current.status).toBe("success");
		});

		expect(result.current.value).toBe("reloaded");

		await act(async () => {
			await result.current.execute();
		});

		expect(result.current.status).toBe("success");
		expect(result.current.value).toBe("reloaded");
		expect(result.current.error).toBeNull();
	});

	it("aceita qualquer tipo de retorno assíncrono", async () => {
		const fnString = jest.fn().mockResolvedValue("texto");
		const fnObj = jest.fn().mockResolvedValue({ id: 42 });
		const fnArray = jest.fn().mockResolvedValue([1, 2, 3]);

		const { result: res1 } = renderHook(() => useAsync(fnString, true));
		await waitFor(() => expect(res1.current.value).toBe("texto"));

		const { result: res2 } = renderHook(() => useAsync(fnObj, true));
		await waitFor(() => expect(res2.current.value).toEqual({ id: 42 }));

		const { result: res3 } = renderHook(() => useAsync(fnArray, true));
		await waitFor(() => expect(res3.current.value).toEqual([1, 2, 3]));
	});
});
