import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";

/**
 * Tipo para funções de validação de formulário
 * @template T - Tipo dos valores do formulário
 * @returns Um objeto com mensagens de erro para cada campo inválido
 */
type ValidationFunction<T> = (values: T) => Partial<Record<keyof T, string>>;

/**
 * Hook para gerenciamento de formulários com validação e controle de estado.
 * Simplifica a manipulação de formulários em React, fornecendo funcionalidades
 * como validação, rastreamento de campos tocados e gerenciamento de submissão.
 *
 * Suporta diversos tipos de campos de formulário:
 * - Input (text, email, password, number, etc)
 * - Textarea
 * - Select (dropdown simples e múltiplo)
 * - Radio buttons
 * - Checkbox (único ou múltiplos)
 *
 * @template T - Tipo dos valores do formulário (deve ser um objeto)
 * @param initialValues - Valores iniciais do formulário
 * @param validate - Função opcional para validar os valores do formulário
 * @param onSubmit - Função opcional a ser executada na submissão do formulário
 *
 * @returns Um objeto contendo:
 * - `values`: Estado atual dos valores do formulário
 * - `errors`: Erros de validação para cada campo
 * - `touched`: Indica quais campos foram tocados pelo usuário
 * - `isSubmitting`: Indica se o formulário está sendo submetido
 * - `isValid`: Indica se o formulário não possui erros de validação
 * - `handleChange`: Função para lidar com mudanças em qualquer tipo de campo
 * - `handleBlur`: Função para lidar com o evento de perda de foco
 * - `handleSubmit`: Função para lidar com a submissão do formulário
 * - `resetForm`: Função para resetar o formulário para os valores iniciais
 * - `setValues`: Função para definir valores do formulário programaticamente
 * - `handleRadioChange`: Função específica para campos de rádio
 * - `handleSelectChange`: Função específica para campos de seleção (dropdown)
 * - `handleTextChange`: Função específica para campos de texto e textarea
 * - `handleCheckboxChange`: Função específica para checkboxes individuais
 * - `handleMultiCheckboxChange`: Função para grupos de checkboxes que compartilham o mesmo nome
 *
 * @example
 * // Exemplo de uso do hook useForm em um formulário completo:
 *
 * import React from 'react';
 * import { useForm } from '@sugarcss/hooks';
 * import { Input, Textarea, Select, Radio, Checkbox, Button } from '@sugarcss/components';
 *
 * function RegistrationForm() {
 *   // Função de validação
 *   const validate = (values) => {
 *     const errors = {};
 *     if (!values.name) errors.name = 'Nome é obrigatório';
 *     if (!values.email) errors.email = 'Email é obrigatório';
 *     if (!values.gender) errors.gender = 'Gênero é obrigatório';
 *     if (!values.plan) errors.plan = 'Plano é obrigatório';
 *     if (!values.terms) errors.terms = 'Você deve aceitar os termos';
 *     if (values.interests.length === 0) errors.interests = 'Selecione pelo menos um interesse';
 *     return errors;
 *   };
 *
 *   // Inicialização do hook
 *   const {
 *     values,
 *     errors,
 *     touched,
 *     handleChange,
 *     handleBlur,
 *     handleSubmit,
 *     handleRadioChange,
 *     handleSelectChange,
 *     handleTextChange,
 *     handleCheckboxChange,
 *     handleMultiCheckboxChange,
 *     isSubmitting,
 *     isValid
 *   } = useForm(
 *     {
 *       name: '',
 *       email: '',
 *       bio: '',
 *       gender: '',
 *       plan: '',
 *       terms: false,
 *       interests: []
 *     },
 *     validate,
 *     (formValues) => console.log('Form submitted:', formValues)
 *   );
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <div className="form-group">
 *         <label htmlFor="name">Nome</label>
 *         <Input
 *           id="name"
 *           name="name"
 *           type="text"
 *           value={values.name}
 *           onChange={handleChange}
 *           onBlur={handleBlur}
 *           error={touched.name && errors.name}
 *         />
 *         {touched.name && errors.name && <div className="error">{errors.name}</div>}
 *       </div>
 *
 *       <div className="form-group">
 *         <label htmlFor="email">Email</label>
 *         <Input
 *           id="email"
 *           name="email"
 *           type="email"
 *           value={values.email}
 *           onChange={handleChange}
 *           onBlur={handleBlur}
 *           error={touched.email && errors.email}
 *         />
 *         {touched.email && errors.email && <div className="error">{errors.email}</div>}
 *       </div>
 *
 *       <div className="form-group">
 *         <label htmlFor="bio">Biografia</label>
 *         <Textarea
 *           id="bio"
 *           name="bio"
 *           value={values.bio}
 *           onChange={handleChange}
 *           onBlur={handleBlur}
 *         />
 *       </div>
 *
 *       <div className="form-group">
 *         <label>Gênero</label>
 *         <div className="radio-group">
 *           <Radio
 *             name="gender"
 *             value="masculino"
 *             checked={values.gender === 'masculino'}
 *             onChange={() => handleRadioChange('gender', 'masculino')}
 *             label="Masculino"
 *           />
 *           <Radio
 *             name="gender"
 *             value="feminino"
 *             checked={values.gender === 'feminino'}
 *             onChange={() => handleRadioChange('gender', 'feminino')}
 *             label="Feminino"
 *           />
 *           <Radio
 *             name="gender"
 *             value="outro"
 *             checked={values.gender === 'outro'}
 *             onChange={() => handleRadioChange('gender', 'outro')}
 *             label="Outro"
 *           />
 *         </div>
 *         {touched.gender && errors.gender && <div className="error">{errors.gender}</div>}
 *       </div>
 *
 *       <div className="form-group">
 *         <label htmlFor="plan">Plano</label>
 *         <Select
 *           id="plan"
 *           name="plan"
 *           value={values.plan}
 *           onChange={(e) => handleSelectChange('plan', e.target.value)}
 *           onBlur={handleBlur}
 *           error={touched.plan && errors.plan}
 *         >
 *           <option value="">Selecione um plano</option>
 *           <option value="basic">Básico</option>
 *           <option value="premium">Premium</option>
 *           <option value="enterprise">Empresarial</option>
 *         </Select>
 *         {touched.plan && errors.plan && <div className="error">{errors.plan}</div>}
 *       </div>
 *
 *       <div className="form-group">
 *         <Checkbox
 *           name="terms"
 *           checked={values.terms}
 *           onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
 *           label="Aceito os termos e condições"
 *           error={touched.terms && errors.terms}
 *         />
 *         {touched.terms && errors.terms && <div className="error">{errors.terms}</div>}
 *       </div>
 *
 *       <div className="form-group">
 *         <label>Interesses</label>
 *         <div className="checkbox-group">
 *           <Checkbox
 *             name="interests"
 *             value="sports"
 *             checked={values.interests.includes('sports')}
 *             onChange={(e) => handleMultiCheckboxChange('interests', 'sports', e.target.checked)}
 *             label="Esportes"
 *           />
 *           <Checkbox
 *             name="interests"
 *             value="music"
 *             checked={values.interests.includes('music')}
 *             onChange={(e) => handleMultiCheckboxChange('interests', 'music', e.target.checked)}
 *             label="Música"
 *           />
 *           <Checkbox
 *             name="interests"
 *             value="technology"
 *             checked={values.interests.includes('technology')}
 *             onChange={(e) => handleMultiCheckboxChange('interests', 'technology', e.target.checked)}
 *             label="Tecnologia"
 *           />
 *         </div>
 *         {touched.interests && errors.interests && <div className="error">{errors.interests}</div>}
 *       </div>
 *
 *       <Button type="submit" disabled={isSubmitting || !isValid}>
 *         {isSubmitting ? 'Enviando...' : 'Enviar'}
 *       </Button>
 *     </form>
 *   );
 * }
 *
 * // Exemplos de uso de cada handler individualmente:
 * //
 * // 1. Para campos de texto e textarea:
 * // <Input
 * //   name="name"
 * //   value={values.name}
 * //   onChange={handleChange} // Método genérico
 * // />
 * //
 * // // OU usando o handler específico:
 * // <Input
 * //   name="name"
 * //   value={values.name}
 * //   onChange={(e) => handleTextChange('name', e.target.value)}
 * // />
 * //
 * // 2. Para campos de rádio:
 * // <Radio
 * //   name="gender"
 * //   value="masculino"
 * //   checked={values.gender === 'masculino'}
 * //   onChange={() => handleRadioChange('gender', 'masculino')}
 * // />
 * //
 * // 3. Para selects/dropdowns:
 * // <Select
 * //   name="plan"
 * //   value={values.plan}
 * //   onChange={(e) => handleSelectChange('plan', e.target.value)}
 * // />
 * //
 * // 4. Para checkboxes individuais:
 * // <Checkbox
 * //   name="terms"
 * //   checked={values.terms}
 * //   onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
 * // />
 * //
 * // 5. Para grupos de checkboxes:
 * // <Checkbox
 * //   name="interests"
 * //   value="sports"
 * //   checked={values.interests.includes('sports')}
 * //   onChange={(e) => handleMultiCheckboxChange('interests', 'sports', e.target.checked)}
 * // />
 */
export function useForm<T extends Record<string, unknown>>(
	initialValues: T,
	validate?: ValidationFunction<T>,
	onSubmit?: (values: T) => void | Promise<void>
) {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>(
		validate ? validate(initialValues) : {}
	);
	const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Manipula mudanças em qualquer tipo de campo de formulário
	 */
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
			const { name, value, type } = e.target;
			let fieldValue: unknown;

			// Determina o valor apropriado com base no tipo de campo
			switch (type) {
				case "checkbox":
					fieldValue = (e.target as HTMLInputElement).checked;
					break;
				case "radio":
					fieldValue = value;
					break;
				case "number":
					fieldValue = value === "" ? "" : Number(value);
					break;
				case "select-multiple":
					fieldValue = Array.from(
						(e.target as HTMLSelectElement).selectedOptions,
						(option) => option.value
					);
					break;
				default:
					fieldValue = value;
			}

			const newValues = {
				...values,
				[name]: fieldValue,
			};

			setValues(newValues);

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula o evento de perda de foco em qualquer campo
	 */
	const handleBlur = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
			const { name } = e.target;

			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (validate) {
				const validationErrors = validate(values);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula a submissão do formulário
	 */
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (validate) {
			const validationErrors = validate(values);
			setErrors(validationErrors);

			const allTouched = Object.keys(values).reduce(
				(acc, key) => {
					acc[key as keyof T] = true;
					return acc;
				},
				{} as Record<keyof T, boolean>
			);

			setTouched(allTouched);

			if (Object.keys(validationErrors).length > 0) {
				return;
			}
		}

		setIsSubmitting(true);

		if (onSubmit) {
			try {
				await onSubmit(values);
			} catch (error) {
				console.error("Erro ao enviar formulário:", error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setIsSubmitting(false);
		}
	};

	/**
	 * Reseta o formulário para os valores iniciais
	 */
	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
		setTouched({});
		setIsSubmitting(false);
	};

	const isValid = Object.keys(errors).length === 0;

	/**
	 * Manipula a seleção de um valor em um campo de rádio
	 */
	const handleRadioChange = useCallback(
		(name: string, value: string | number | boolean) => {
			const newValues = {
				...values,
				[name]: value,
			};

			setValues(newValues);
			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula a seleção de um valor em um dropdown
	 */
	const handleSelectChange = useCallback(
		(name: string, value: string | string[]) => {
			const newValues = {
				...values,
				[name]: value,
			};

			setValues(newValues);
			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula a alteração de um valor em um campo de texto ou textarea
	 */
	const handleTextChange = useCallback(
		(name: string, value: string) => {
			const newValues = {
				...values,
				[name]: value,
			};

			setValues(newValues);

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula a alteração de um checkbox
	 */
	const handleCheckboxChange = useCallback(
		(name: string, checked: boolean) => {
			const newValues = {
				...values,
				[name]: checked,
			};

			setValues(newValues);
			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	/**
	 * Manipula a alteração de múltiplos checkboxes que compartilham o mesmo nome
	 * Útil para grupos de checkboxes onde você quer armazenar os valores selecionados em um array
	 */
	const handleMultiCheckboxChange = useCallback(
		(name: string, value: string, checked: boolean) => {
			const currentValues = (values[name] as string[]) || [];
			let newValues;

			if (checked) {
				// Adiciona o valor ao array se o checkbox foi marcado
				newValues = {
					...values,
					[name]: [...currentValues, value],
				};
			} else {
				// Remove o valor do array se o checkbox foi desmarcado
				newValues = {
					...values,
					[name]: currentValues.filter((item) => item !== value),
				};
			}

			setValues(newValues);
			setTouched((prev) => ({
				...prev,
				[name]: true,
			}));

			if (validate) {
				const validationErrors = validate(newValues);
				setErrors(validationErrors);
			}
		},
		[values, validate]
	);

	return {
		values,
		errors,
		touched,
		isSubmitting,
		isValid,
		handleChange,
		handleBlur,
		handleSubmit,
		resetForm,
		setValues,
		// Métodos específicos para diferentes tipos de campos
		handleRadioChange,
		handleSelectChange,
		handleTextChange,
		handleCheckboxChange,
		handleMultiCheckboxChange,
	};
}
