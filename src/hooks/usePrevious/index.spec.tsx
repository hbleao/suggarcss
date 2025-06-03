import { renderHook } from "@testing-library/react";
import { usePrevious } from "./index";
import { useState } from "react";
import { act } from "@testing-library/react";

describe("usePrevious", () => {
	it("deve retornar undefined na primeira renderização", () => {
		const { result } = renderHook(() => usePrevious("initial"));
		expect(result.current).toBeUndefined();
	});

	it("deve retornar o valor anterior após uma atualização", () => {
		const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
			initialProps: { value: "initial" },
		});

		expect(result.current).toBeUndefined();

		rerender({ value: "updated" });

		expect(result.current).toBe("initial");

		rerender({ value: "updated again" });

		expect(result.current).toBe("updated");
	});

	it("deve funcionar com diferentes tipos de dados", () => {
		// Usando um tipo mais simples para o teste
		const { result, rerender } = renderHook(
			(props: { value: number }) => usePrevious(props.value),
			{
				initialProps: { value: 42 }
			}
		);

		expect(result.current).toBeUndefined();
		
		rerender({ value: 100 });
		expect(result.current).toBe(42);
		
		rerender({ value: 200 });
		expect(result.current).toBe(100);
		
		rerender({ value: 300 });
		expect(result.current).toBe(200);
	});

	it("deve funcionar em um cenário de componente com useState", () => {
		const { result } = renderHook(() => {
			const [count, setCount] = useState(0);
			const prevCount = usePrevious(count);
			return { count, setCount, prevCount };
		});

		expect(result.current.prevCount).toBeUndefined();
		expect(result.current.count).toBe(0);

		act(() => {
			result.current.setCount(1);
		});

		expect(result.current.prevCount).toBe(0);
		expect(result.current.count).toBe(1);

		act(() => {
			result.current.setCount(2);
		});

		expect(result.current.prevCount).toBe(1);
		expect(result.current.count).toBe(2);
	});
});
