import { useState } from 'react';

import './styles.scss';

import type { InputProps } from './types';

/**
 * Componente Input para campos de entrada de texto com diversos estados e variações.
 *
 * O componente Input oferece uma interface consistente para entrada de dados textuais,
 * com suporte a diferentes estados (normal, foco, preenchido, erro, desabilitado) e
 * variações de estilo. Inclui recursos como texto auxiliar, mensagens de erro e
 * indicador de carregamento.
 *
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="Nome completo"
 *   value={nome}
 *   onChange={(valor) => setNome(valor)}
 *   helperText="Digite seu nome completo"
 * />
 * ```
 *
 * @example
 * // Input com mensagem de erro
 * ```tsx
 * <Input
 *   label="Email"
 *   value={email}
 *   onChange={(valor) => setEmail(valor)}
 *   errorMessage={emailValido ? '' : 'Email inválido'}
 *   variant="outlined"
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.label=''] - Rótulo do campo de entrada
 * @param {string} [props.value=''] - Valor atual do campo de entrada
 * @param {'outlined' | 'default'} [props.variant='default'] - Variante visual do campo
 *   - "outlined": Campo com apenas borda inferior e fundo levemente colorido
 *   - "default": Campo com borda completa e cantos arredondados
 * @param {'fluid' | 'contain'} [props.width='contain'] - Largura do campo
 *   - "fluid": Ocupa 100% da largura disponível
 *   - "contain": Largura ajustada ao conteúdo (max-content)
 * @param {boolean} [props.disabled=false] - Define se o campo está desabilitado
 * @param {boolean} [props.isLoading=false] - Exibe um indicador de carregamento quando verdadeiro
 * @param {string} [props.helperText=''] - Texto auxiliar exibido abaixo do campo
 * @param {string} [props.errorMessage=''] - Mensagem de erro exibida abaixo do campo (substitui helperText quando presente)
 * @param {(value: string) => void} [props.onChange] - Função chamada quando o valor do campo muda
 * @param {string} [props.className=''] - Classes CSS adicionais para o componente
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento raiz
 *
 * @returns {JSX.Element} O componente Input renderizado
 */

export const Input = ({
	className = '',
	variant = 'default',
	width = 'contain',
	disabled = false,
	value = '',
	isLoading = false,
	helperText = '',
	errorMessage = '',
	label = '',
	children,
	onChange,
	...restProps
}: InputProps) => {
	const [focused, setFocused] = useState('');
	const disabledClass = disabled ? '--disabled' : '';
	const errorClass = errorMessage.length > 0 ? '--error' : '';
	const filledClass = value?.length > 0 ? '--filled' : '';

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage.length > 0) return;
		isFocus ? setFocused('--focused') : setFocused('');
	};

	const handleInputChange = (value: string) => {
		onChange?.(value);
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`input__root --${variant} ${width} ${filledClass} ${focused} ${disabledClass} ${errorClass} ${className}`.trim()}
			{...restProps}
		>
			<div className="input__box">
				{label && (
					<label htmlFor={`input-${label}`} className="input__label">
						{label}
					</label>
				)}
				<input
					id={`input-${label}`}
					name={`input-${label}`}
					type="text"
					className="input__field"
					value={value}
					onChange={(e) => handleInputChange(e.target.value)}
				/>
			</div>

			{isLoading && <span className="utils-loader input__loader" />}

			{helperText && !errorMessage && (
				<p className={'input__helper-text'}>{helperText}</p>
			)}
			{errorMessage && <p className={'input__error-message'}>{errorMessage}</p>}
		</div>
	);
};
