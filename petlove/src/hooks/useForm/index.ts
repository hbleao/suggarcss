import { useState, type ChangeEvent, type FormEvent } from "react";

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
 * - `handleChange`: Função para lidar com mudanças nos campos
 * - `handleBlur`: Função para lidar com o evento de perda de foco
 * - `handleSubmit`: Função para lidar com a submissão do formulário
 * - `resetForm`: Função para resetar o formulário para os valores iniciais
 * - `setValues`: Função para definir valores do formulário programaticamente
 *
 * @example
 * // Formulário de login com validação
 * function LoginForm() {
 *   const validate = (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Email é obrigatório';
 *     if (!values.password) errors.password = 'Senha é obrigatória';
 *     return errors;
 *   };
 *
 *   const handleLogin = async (values) => {
 *     try {
 *       await api.login(values.email, values.password);
 *       // Redirecionar após login
 *     } catch (error) {
 *       alert('Falha no login: ' + error.message);
 *     }
 *   };
 *
 *   const {
 *     values,
 *     errors,
 *     touched,
 *     handleChange,
 *     handleBlur,
 *     handleSubmit,
 *     isSubmitting
 *   } = useForm(
 *     { email: '', password: '' },
 *     validate,
 *     handleLogin
 *   );
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <div>
 *         <label>Email</label>
 *         <input
 *           type="email"
 *           name="email"
 *           value={values.email}
 *           onChange={handleChange}
 *           onBlur={handleBlur}
 *         />
 *         {touched.email && errors.email && <div className="error">{errors.email}</div>}
 *       </div>
 *
 *       <div>
 *         <label>Senha</label>
 *         <input
 *           type="password"
 *           name="password"
 *           value={values.password}
 *           onChange={handleChange}
 *           onBlur={handleBlur}
 *         />
 *         {touched.password && errors.password && <div className="error">{errors.password}</div>}
 *       </div>
 *
 *       <button type="submit" disabled={isSubmitting}>
 *         {isSubmitting ? 'Entrando...' : 'Entrar'}
 *       </button>
 *     </form>
 *   );
 * }
 */
export function useForm<T extends Record<string, unknown>>(
	initialValues: T,
	validate?: ValidationFunction<T>,
	onSubmit?: (values: T) => void | Promise<void>,
) {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>(
		validate ? validate(initialValues) : {},
	);
	const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type } = e.target;
		const fieldValue =
			type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

		const newValues = {
			...values,
			[name]: fieldValue,
		};

		setValues(newValues);

		if (validate) {
			const validationErrors = validate(newValues);
			setErrors(validationErrors);
		}
	};

	const handleBlur = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name } = e.target;

		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		if (validate) {
			const validationErrors = validate(values);
			setErrors(validationErrors);
		}
	};

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
				{} as Record<keyof T, boolean>,
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

	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
		setTouched({});
		setIsSubmitting(false);
	};

	const isValid = Object.keys(errors).length === 0;

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
	};
}
