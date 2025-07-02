import { act, renderHook, waitFor } from "@testing-library/react";
import { useForm } from ".";

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

	it("deve manipular campos de rádio corretamente", () => {
		const initialValues = { gender: "" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleRadioChange("gender", "masculino");
		});

		expect(result.current.values).toEqual({
			gender: "masculino",
		});
		expect(result.current.touched).toEqual({ gender: true });

		act(() => {
			result.current.handleRadioChange("gender", "feminino");
		});

		expect(result.current.values).toEqual({
			gender: "feminino",
		});
	});

	it("deve manipular campos de select corretamente", () => {
		const initialValues = { plan: "" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleSelectChange("plan", "basic");
		});

		expect(result.current.values).toEqual({
			plan: "basic",
		});
		expect(result.current.touched).toEqual({ plan: true });

		act(() => {
			result.current.handleSelectChange("plan", "premium");
		});

		expect(result.current.values).toEqual({
			plan: "premium",
		});
	});

	it("deve manipular múltiplos selects corretamente", () => {
		const initialValues = { categories: [] as string[] };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleSelectChange("categories", ["sports", "music"]);
		});

		expect(result.current.values).toEqual({
			categories: ["sports", "music"],
		});
		expect(result.current.touched).toEqual({ categories: true });
	});

	it("deve manipular campos de texto corretamente", () => {
		const initialValues = { bio: "" };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleTextChange("bio", "Minha biografia");
		});

		expect(result.current.values).toEqual({
			bio: "Minha biografia",
		});

		act(() => {
			result.current.handleTextChange("bio", "Biografia atualizada");
		});

		expect(result.current.values).toEqual({
			bio: "Biografia atualizada",
		});
	});

	it("deve manipular checkboxes individuais corretamente", () => {
		const initialValues = { terms: false };

		const { result } = renderHook(() => useForm(initialValues));

		act(() => {
			result.current.handleCheckboxChange("terms", true);
		});

		expect(result.current.values).toEqual({
			terms: true,
		});
		expect(result.current.touched).toEqual({ terms: true });

		act(() => {
			result.current.handleCheckboxChange("terms", false);
		});

		expect(result.current.values).toEqual({
			terms: false,
		});
	});

	it("deve manipular múltiplos checkboxes corretamente", () => {
		const initialValues = { interests: [] as string[] };

		const { result } = renderHook(() => useForm(initialValues));

		// Adiciona um valor
		act(() => {
			result.current.handleMultiCheckboxChange("interests", "sports", true);
		});

		expect(result.current.values).toEqual({
			interests: ["sports"],
		});
		expect(result.current.touched).toEqual({ interests: true });

		// Adiciona outro valor
		act(() => {
			result.current.handleMultiCheckboxChange("interests", "music", true);
		});

		expect(result.current.values).toEqual({
			interests: ["sports", "music"],
		});

		// Remove um valor
		act(() => {
			result.current.handleMultiCheckboxChange("interests", "sports", false);
		});

		expect(result.current.values).toEqual({
			interests: ["music"],
		});
	});

	it("deve validar campos após usar handlers específicos", () => {
		const initialValues = {
			gender: "",
			plan: "",
			bio: "",
			terms: false,
			interests: [] as string[]
		};

		const validate = (values: typeof initialValues) => {
			const errors: Record<string, string> = {};

			if (!values.gender) {
				errors.gender = "Gênero é obrigatório";
			}

			if (!values.plan) {
				errors.plan = "Plano é obrigatório";
			}

			if (!values.bio) {
				errors.bio = "Biografia é obrigatória";
			}

			if (!values.terms) {
				errors.terms = "Você deve aceitar os termos";
			}

			if (values.interests.length === 0) {
				errors.interests = "Selecione pelo menos um interesse";
			}

			return errors;
		};

		const { result } = renderHook(() => useForm(initialValues, validate));

		// Inicialmente todos os campos têm erro
		expect(Object.keys(result.current.errors).length).toBe(5);
		expect(result.current.isValid).toBe(false);

		// Corrige um campo por vez usando os handlers específicos
		act(() => {
			result.current.handleRadioChange("gender", "masculino");
		});
		expect(Object.keys(result.current.errors).length).toBe(4);

		act(() => {
			result.current.handleSelectChange("plan", "basic");
		});
		expect(Object.keys(result.current.errors).length).toBe(3);

		act(() => {
			result.current.handleTextChange("bio", "Minha biografia");
		});
		expect(Object.keys(result.current.errors).length).toBe(2);

		act(() => {
			result.current.handleCheckboxChange("terms", true);
		});
		expect(Object.keys(result.current.errors).length).toBe(1);

		act(() => {
			result.current.handleMultiCheckboxChange("interests", "sports", true);
		});

		// Agora o formulário deve ser válido
		expect(Object.keys(result.current.errors).length).toBe(0);
		expect(result.current.isValid).toBe(true);
	});
});
