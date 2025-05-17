import { useState } from "react";

import "./styles.scss";

import type { TextareaProps } from "./types";

/**
 * Componente Textarea para campos de entrada de texto com múltiplas linhas.
 *
 * O componente Textarea oferece uma interface para entrada de textos mais longos,
 * com suporte a diferentes estados (normal, foco, preenchido, erro, desabilitado) e
 * variações de estilo. Inclui recursos como contador de caracteres, texto auxiliar
 * e mensagens de erro.
 *
 * @component
 * @example
 * ```tsx
 * <Textarea
 *   label="Descrição"
 *   value={descricao}
 *   onChange={(e) => setDescricao(e.target.value)}
 *   helperText="Descreva com detalhes"
 *   rows={4}
 * />
 * ```
 *
 * @example
 * // Textarea com mensagem de erro
 * ```tsx
 * <Textarea
 *   label="Comentário"
 *   value={comentario}
 *   onChange={(e) => setComentario(e.target.value)}
 *   errorMessage={comentario.length < 10 ? 'O comentário deve ter pelo menos 10 caracteres' : ''}
 *   variant="outlined"
 *   width="fluid"
 * />
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {string} [props.label=''] - Rótulo do campo de texto
 * @param {string} [props.value=''] - Valor atual do campo de texto
 * @param {'outlined' | 'default'} [props.variant='default'] - Variante visual do campo
 *   - "outlined": Campo com apenas borda inferior e fundo levemente colorido
 *   - "default": Campo com borda completa e cantos arredondados
 * @param {'fluid' | 'contain'} [props.width='contain'] - Largura do campo
 *   - "fluid": Ocupa 100% da largura disponível
 *   - "contain": Largura ajustada ao conteúdo (max-content)
 * @param {number} [props.rows=5] - Número de linhas visíveis do campo de texto
 * @param {boolean} [props.disabled=false] - Define se o campo está desabilitado
 * @param {string} [props.helperText=''] - Texto auxiliar exibido abaixo do campo
 * @param {string} [props.errorMessage=''] - Mensagem de erro exibida abaixo do campo (substitui helperText quando presente)
 * @param {(e: ChangeEvent<HTMLTextAreaElement>) => void} [props.onChange] - Função chamada quando o valor do campo muda
 * @param {string} [props.className=''] - Classes CSS adicionais para o componente
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento raiz
 *
 * @returns {JSX.Element} O componente Textarea renderizado
 */

export const Textarea = ({
	className = "",
	variant = "default",
	width = "contain",
	value = "",
	label = "",
	onChange,
	disabled = false,
	rows = 5,
	helperText = "",
	errorMessage = "",
	children,
	...restProps
}: TextareaProps) => {
	const [focused, setFocused] = useState("");
	const disabledClass = disabled ? "--disabled" : "";
	const errorClass = errorMessage.length > 0 ? "--error" : "";
	const filledClass = value.length > 0 ? "--filled" : "";

	const handleFocus = (isFocus: boolean) => {
		if (disabled || errorMessage.length > 0) return;
		isFocus ? setFocused("--focused") : setFocused("");
	};

	return (
		<div
			onFocus={() => handleFocus(true)}
			onBlur={() => handleFocus(false)}
			className={`textarea__root --${variant} --${width} ${filledClass} ${focused} ${disabledClass} ${errorClass}`}
			{...restProps}
		>
			{label && (
				<label htmlFor="" className="textarea__label">
					{label}
				</label>
			)}
			<textarea className="textarea__field" rows={rows} onChange={onChange} />
			<span className="textarea__counter">{value.length} / 200</span>
			{helperText && !errorMessage && (
				<p className={"input__helper-text"}>{helperText}</p>
			)}
			{errorMessage && <p className={"input__error-message"}>{errorMessage}</p>}
		</div>
	);
};
