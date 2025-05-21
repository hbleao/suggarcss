import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
	beforeEach(() => {
		window.localStorage.clear();
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("deve usar o valor inicial quando não há valor no localStorage", () => {
		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue"),
		);

		expect(result.current[0]).toBe("initialValue");
	});

	it("deve recuperar o valor existente do localStorage", () => {
		window.localStorage.setItem("testKey", JSON.stringify("storedValue"));

		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue"),
		);

		expect(result.current[0]).toBe("storedValue");
	});

	it("deve atualizar o valor no estado e no localStorage", () => {
		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue"),
		);

		act(() => {
			result.current[1]("newValue");
		});

		expect(result.current[0]).toBe("newValue");

		expect(JSON.parse(window.localStorage.getItem("testKey") || "")).toBe(
			"newValue",
		);
	});

	it("deve aceitar uma função para atualizar o valor", () => {
		const { result } = renderHook(() => useLocalStorage<number>("counter", 0));

		act(() => {
			result.current[1]((prev) => prev + 1);
		});

		expect(result.current[0]).toBe(1);

		expect(JSON.parse(window.localStorage.getItem("counter") || "")).toBe(1);
	});

	it("deve lidar com objetos complexos", () => {
		const initialObject = { name: "John", age: 30 };
		const { result } = renderHook(() => useLocalStorage("user", initialObject));

		const updatedObject = { name: "Jane", age: 25 };

		act(() => {
			result.current[1](updatedObject);
		});

		expect(result.current[0]).toEqual(updatedObject);

		expect(JSON.parse(window.localStorage.getItem("user") || "")).toEqual(
			updatedObject,
		);
	});

	it("deve lidar com erros ao ler do localStorage", () => {
		jest.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
			throw new Error("getItem error");
		});

		const { result } = renderHook(() =>
			useLocalStorage("testKey", "fallbackValue"),
		);

		expect(result.current[0]).toBe("fallbackValue");
		expect(console.error).toHaveBeenCalled();
	});

	it("deve lidar com erros ao escrever no localStorage", () => {
		jest.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
			throw new Error("setItem error");
		});

		const { result } = renderHook(() =>
			useLocalStorage("testKey", "initialValue"),
		);

		act(() => {
			result.current[1]("newValue");
		});

		expect(result.current[0]).toBe("newValue");
		expect(console.error).toHaveBeenCalled();
	});
});
