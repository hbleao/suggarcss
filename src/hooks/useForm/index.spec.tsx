import { renderHook, act, waitFor } from "@testing-library/react";
import { useForm } from "../useForm";

describe("useForm", () => {
	it("deve inicializar com os valores fornecidos", () => {
		const initialValues = { name: "John", email: "john@example.com", age: 30 };

		const { result } = renderHook(() => useForm(initialValues));

		expect(result.current.values).toEqual(initialValues);
		expect(result.current.errors).toEqual({});
		expect(result.current.touched).toEqual({});
		expect(result.current.isValid).toBe(true);
		expect(result.current.isSubmitting).toBe(false);
	});

	it("deve atualizar um único valor corretamente", () => {
		const initialValues = { name: "John", email: "john@example.com" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleChange({
				target: { name: "name", value: "Jane" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.values).toEqual({
			name: "Jane",
			email: "john@example.com",
		});
	});

	it("deve marcar um campo como tocado ao perder o foco", () => {
		const initialValues = { name: "", email: "" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleBlur({
				target: { name: "name" },
			} as React.FocusEvent<HTMLInputElement>);
		});

		expect(result.current.touched).toEqual({ name: true });
		expect(result.current.touched.email).toBeUndefined();
	});

	it("deve validar os campos usando a função de validação fornecida", () => {
		const initialValues = { name: "", email: "invalid" };

		const validate = (values: typeof initialValues) => {
			const errors: Record<string, string> = {};

			if (!values.name) {
				errors.name = "Nome é obrigatório";
			}

			if (typeof values.email === "string" && !values.email.includes("@")) {
				errors.email = "Email inválido";
			}

			return errors;
		};

		const { result } = renderHook(() => useForm(initialValues, validate));

		expect(result.current.errors).toEqual({
			name: "Nome é obrigatório",
			email: "Email inválido",
		});
		expect(result.current.isValid).toBe(false);

		act(() => {
			result.current.handleChange({
				target: { name: "email", value: "valid@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.errors).toEqual({
			name: "Nome é obrigatório",
		});
		expect(result.current.isValid).toBe(false);

		act(() => {
			result.current.handleChange({
				target: { name: "name", value: "John" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.errors).toEqual({});
		expect(result.current.isValid).toBe(true);
	});

	it("deve executar onSubmit quando o formulário é válido", async () => {
		const initialValues = { name: "John", email: "john@example.com" };
		const onSubmit = jest.fn();

		const { result } = renderHook(() =>
			useForm(initialValues, undefined, onSubmit),
		);

		act(() => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as unknown as React.FormEvent);
		});

		await waitFor(() => {
			expect(result.current.isSubmitting).toBe(false);
		});

		expect(onSubmit).toHaveBeenCalledWith(initialValues);
	});

	it("não deve executar onSubmit quando o formulário é inválido", () => {
		const initialValues = { name: "", email: "invalid" };
		const onSubmit = jest.fn();

		const validate = (values: typeof initialValues) => {
			const errors: Record<string, string> = {};

			if (!values.name) {
				errors.name = "Nome é obrigatório";
			}

			if (!values.email.includes("@")) {
				errors.email = "Email inválido";
			}

			return errors;
		};

		const { result } = renderHook(() =>
			useForm(initialValues, validate, onSubmit),
		);

		act(() => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as unknown as React.FormEvent);
		});

		expect(onSubmit).not.toHaveBeenCalled();

		expect(result.current.touched).toEqual({
			name: true,
			email: true,
		});
	});

	it("deve permitir definir valores programaticamente", () => {
		const initialValues = { name: "", email: "" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.setValues({
				name: "John",
				email: "john@example.com",
			});
		});

		expect(result.current.values).toEqual({
			name: "John",
			email: "john@example.com",
		});
	});

	it("deve permitir redefinir o formulário para os valores iniciais", () => {
		const initialValues = { name: "Initial", email: "initial@example.com" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleChange({
				target: { name: "name", value: "Modified" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		act(() => {
			result.current.handleChange({
				target: { name: "email", value: "modified@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.values).toEqual({
			name: "Modified",
			email: "modified@example.com",
		});

		act(() => {
			result.current.resetForm();
		});
		expect(result.current.values).toEqual(initialValues);
		expect(result.current.touched).toEqual({});
		expect(result.current.errors).toEqual({});
	});

	it("deve lidar com submissões assíncronas", async () => {
		const initialValues = { name: "John", email: "john@example.com" };
		const onSubmit = jest.fn().mockImplementation(() => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 100);
			});
		});

		const { result } = renderHook(() =>
			useForm(initialValues, undefined, onSubmit),
		);

		act(() => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as unknown as React.FormEvent);
		});

		expect(result.current.isSubmitting).toBe(true);

		await waitFor(
			() => {
				expect(result.current.isSubmitting).toBe(false);
			},
			{ timeout: 1000 },
		);

		expect(onSubmit).toHaveBeenCalledWith(initialValues);
	});
});
