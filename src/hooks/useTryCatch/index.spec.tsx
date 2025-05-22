import { act, renderHook } from "@testing-library/react";

import { useTryCatch } from "../useTryCatch";

describe("useTryCatch", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("deve inicializar com valores padrão", () => {
		const { result } = renderHook(() => useTryCatch());

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it("deve retornar dados e atualizar estado após execução bem-sucedida", async () => {
		const { result } = renderHook(() => useTryCatch<string>());

		let executeResult: string | null = null;

		await act(async () => {
			executeResult = await result.current.execute(() =>
				Promise.resolve("success"),
			);
		});

		expect(executeResult).toBe("success");
		expect(result.current.data).toBe("success");
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it("deve capturar erro e atualizar estado após execução com falha", async () => {
		const { result } = renderHook(() => useTryCatch<string>());

		const testError = new Error("test error");
		let executeResult: string | null = null;

		await act(async () => {
			executeResult = await result.current.execute(() =>
				Promise.reject(testError),
			);
		});

		expect(executeResult).toBeNull();
		expect(result.current.data).toBeNull();
		expect(result.current.error).toBe(testError);
		expect(result.current.isLoading).toBe(false);
	});

	it("deve definir isLoading como true durante a execução", async () => {
		const { result } = renderHook(() => useTryCatch<string>());

		let resolvePromise: (value: string) => void;
		const promise = new Promise<string>((resolve) => {
			resolvePromise = resolve;
		});

		act(() => {
			result.current.execute(() => promise);
		});

		expect(result.current.isLoading).toBe(true);

		await act(async () => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			resolvePromise!("success");
			await promise;
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.data).toBe("success");
	});

	it("deve limpar o erro anterior ao iniciar uma nova execução", async () => {
		const { result } = renderHook(() => useTryCatch<string>());

		await act(async () => {
			await result.current.execute(() =>
				Promise.reject(new Error("first error")),
			);
		});

		expect(result.current.error).not.toBeNull();

		await act(async () => {
			await result.current.execute(() => Promise.resolve("success"));
		});

		expect(result.current.error).toBeNull();
		expect(result.current.data).toBe("success");
	});

	it("deve funcionar com funções síncronas", async () => {
		const { result } = renderHook(() => useTryCatch<number>());

		await act(async () => {
			await result.current.execute(() => 42);
		});

		expect(result.current.data).toBe(42);
		expect(result.current.error).toBeNull();
	});

	it("deve funcionar com funções asíncronas", async () => {
		const { result } = renderHook(() => useTryCatch<number>());

		await act(async () => {
			await result.current.executeWithCallback(() => 42);
		});

		expect(result.current.data).toBe(42);
		expect(result.current.error).toBeNull();
	});

	it("deve capturar erros de funções síncronas com errors", async () => {
		const { result } = renderHook(() => useTryCatch<number>());

		await act(async () => {
			await result.current.execute(() => {
				throw new Error("sync error");
			});
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeInstanceOf(Error);
		expect(result.current.error?.message).toBe("sync error");
	});

	it("deve capturar erros de funções asíncronas", async () => {
		const { result } = renderHook(() => useTryCatch<number>());

		await act(async () => {
			await result.current.executeWithCallback(() => {
				throw new Error("sync error");
			});
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeInstanceOf(Error);
		expect(result.current.error?.message).toBe("sync error");
	});

	it("deve resetar o estado quando reset é chamado", async () => {
		const { result } = renderHook(() => useTryCatch<string>());

		await act(async () => {
			await result.current.execute(() => Promise.resolve("success"));
		});

		expect(result.current.data).toBe("success");

		act(() => {
			result.current.reset();
		});

		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});
});
