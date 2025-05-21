import { renderHook, act } from "@testing-library/react";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
	it("deve inicializar com o valor padrão (false)", () => {
		const { result } = renderHook(() => useToggle());
		expect(result.current[0]).toBe(false);
	});

	it("deve inicializar com o valor fornecido", () => {
		const { result } = renderHook(() => useToggle(true));
		expect(result.current[0]).toBe(true);
	});

	it("deve alternar entre true e false", () => {
		const { result } = renderHook(() => useToggle(false));

		expect(result.current[0]).toBe(false);

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe(false);
	});

	it("deve alternar entre dois valores personalizados", () => {
		const { result } = renderHook(() => useToggle("light", "dark"));

		expect(result.current[0]).toBe("light");

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe("dark");

		act(() => {
			result.current[1]();
		});
		expect(result.current[0]).toBe("light");
	});

	it("deve permitir definir o valor diretamente", () => {
		const { result } = renderHook(() => useToggle(false));

		act(() => {
			result.current[2](true);
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[2](false);
		});
		expect(result.current[0]).toBe(false);
	});
});
