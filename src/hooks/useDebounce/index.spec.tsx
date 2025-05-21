import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from "./index";

describe("useDebouncedValue", () => {
	// Configuração de timers falsos para controlar o tempo nos testes
	jest.useFakeTimers();

	beforeEach(() => {
		// Limpa qualquer mock ou timer antes de cada teste
		jest.clearAllMocks();
	});

	afterEach(() => {
		// Limpa todos os timers após cada teste
		jest.clearAllTimers();
	});

	it("deve retornar o valor inicial imediatamente", () => {
		// Arrange - Preparação
		const initialValue = "initial";
		const delay = 500;

		// Act - Ação
		const { result } = renderHook(() => useDebouncedValue(initialValue, delay));

		// Assert - Verificação
		expect(result.current).toBe(initialValue);
	});

	it("deve atualizar o valor após o tempo de debounce", () => {
		// Arrange - Preparação
		const initialValue = "initial";
		const updatedValue = "updated";
		const delay = 500;

		// Act & Assert - Ação e Verificação
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialValue, delay } },
		);

		// Verifica se o valor inicial é retornado imediatamente
		expect(result.current).toBe(initialValue);

		// Atualiza o valor
		rerender({ value: updatedValue, delay });

		// Verifica se o valor ainda não foi atualizado
		expect(result.current).toBe(initialValue);

		// Avança metade do tempo de debounce
		act(() => {
			jest.advanceTimersByTime(delay / 2);
		});

		// Verifica se o valor ainda não foi atualizado
		expect(result.current).toBe(initialValue);

		// Avança o restante do tempo de debounce
		act(() => {
			jest.advanceTimersByTime(delay / 2);
		});

		// Verifica se o valor foi atualizado após o tempo completo
		expect(result.current).toBe(updatedValue);
	});

	it("deve cancelar o debounce anterior quando o valor muda rapidamente", () => {
		// Arrange - Preparação
		const initialValue = "initial";
		const firstUpdate = "update 1";
		const secondUpdate = "update 2";
		const delay = 500;

		// Act & Assert - Ação e Verificação
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialValue, delay } },
		);

		// Verifica se o valor inicial é retornado
		expect(result.current).toBe(initialValue);

		// Primeira atualização
		rerender({ value: firstUpdate, delay });

		// Avança parte do tempo de debounce
		act(() => {
			jest.advanceTimersByTime(200);
		});

		// Verifica se o valor ainda não foi atualizado
		expect(result.current).toBe(initialValue);

		// Segunda atualização antes do primeiro debounce completar
		rerender({ value: secondUpdate, delay });

		// Avança tempo suficiente para completar o segundo debounce
		act(() => {
			jest.advanceTimersByTime(delay);
		});

		// Verifica se o valor foi atualizado para a segunda atualização
		// (o primeiro debounce foi cancelado e apenas o segundo foi aplicado)
		expect(result.current).toBe(secondUpdate);
	});

	it("deve funcionar com diferentes tipos de dados", () => {
		// Teste com números
		const initialNumber = 0;
		const updatedNumber = 42;
		const delay = 200;

		// Act & Assert para números
		const { result: resultNumber, rerender: rerenderNumber } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialNumber, delay } },
		);

		// Verifica o valor numérico inicial
		expect(resultNumber.current).toBe(initialNumber);

		// Atualiza o valor numérico
		rerenderNumber({ value: updatedNumber, delay });

		// Avança o tempo completo de debounce
		act(() => {
			jest.advanceTimersByTime(delay);
		});

		// Verifica se o valor numérico foi atualizado
		expect(resultNumber.current).toBe(updatedNumber);

		// Teste com objetos
		const initialObj = { name: "initial" };
		const updatedObj = { name: "updated" };

		// Act & Assert para objetos
		const { result: resultObj, rerender: rerenderObj } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialObj, delay } },
		);

		// Verifica o objeto inicial
		expect(resultObj.current).toBe(initialObj);

		// Atualiza o objeto
		rerenderObj({ value: updatedObj, delay });

		// Avança o tempo completo de debounce
		act(() => {
			jest.advanceTimersByTime(delay);
		});

		// Verifica se o objeto foi atualizado
		expect(resultObj.current).toBe(updatedObj);
	});

	it("deve respeitar diferentes tempos de delay", () => {
		// Arrange - Preparação
		const initialValue = "initial";
		const slowUpdate = "slow update";
		const fastUpdate = "fast update";
		const longDelay = 1000;
		const shortDelay = 200;

		// Act & Assert - Ação e Verificação
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebouncedValue(value, delay),
			{ initialProps: { value: initialValue, delay: longDelay } },
		);

		// Verifica o valor inicial
		expect(result.current).toBe(initialValue);

		// Atualiza o valor com delay longo
		rerender({ value: slowUpdate, delay: longDelay });

		// Avança metade do tempo de debounce longo
		act(() => {
			jest.advanceTimersByTime(longDelay / 2);
		});

		// Verifica se o valor ainda não foi atualizado
		expect(result.current).toBe(initialValue);

		// Avança o restante do tempo de debounce longo
		act(() => {
			jest.advanceTimersByTime(longDelay / 2);
		});

		// Verifica se o valor foi atualizado após o tempo completo
		expect(result.current).toBe(slowUpdate);

		// Atualiza o valor com delay curto
		rerender({ value: fastUpdate, delay: shortDelay });

		// Avança o tempo completo de debounce curto
		act(() => {
			jest.advanceTimersByTime(shortDelay);
		});

		// Verifica se o valor foi atualizado após o tempo curto
		expect(result.current).toBe(fastUpdate);
	});

	// Teste adicional para verificar o valor padrão do delay
	it("deve usar o valor padrão de delay (500ms) quando não especificado", () => {
		// Arrange - Preparação
		const initialValue = "initial";
		const updatedValue = "updated";
		const defaultDelay = 500; // Valor padrão definido no hook

		// Act & Assert - Ação e Verificação
		const { result, rerender } = renderHook(
			({ value }) => useDebouncedValue(value), // Sem especificar o delay
			{ initialProps: { value: initialValue } },
		);

		// Verifica o valor inicial
		expect(result.current).toBe(initialValue);

		// Atualiza o valor
		rerender({ value: updatedValue });

		// Avança menos que o tempo padrão
		act(() => {
			jest.advanceTimersByTime(defaultDelay - 100);
		});

		// Verifica se o valor ainda não foi atualizado
		expect(result.current).toBe(initialValue);

		// Avança o restante do tempo padrão
		act(() => {
			jest.advanceTimersByTime(100);
		});

		// Verifica se o valor foi atualizado após o tempo padrão completo
		expect(result.current).toBe(updatedValue);
	});
});
