import "./styles.scss";

import type { RadioProps } from "./types";

/**
 * Componente Radio para seleção única em grupos de opções.
 *
 * O componente Radio oferece uma interface para seleção de uma única opção entre várias alternativas.
 * Suporta diferentes estados visuais (padrão, selecionado, desabilitado) e pode incluir um texto
 * descritivo ao lado do botão de rádio.
 *
 * @component
 * @example
 * ```tsx
 * // Grupo de opções de rádio
 * const [opcaoSelecionada, setOpcaoSelecionada] = useState('opcao1');
 * 
 * return (
 *   <div>
 *     <Radio 
 *       variant={opcaoSelecionada === 'opcao1' ? 'checked' : 'default'}
 *       description="Opção 1"
 *       onClick={() => setOpcaoSelecionada('opcao1')}
 *     />
 *     <Radio 
 *       variant={opcaoSelecionada === 'opcao2' ? 'checked' : 'default'}
 *       description="Opção 2"
 *       onClick={() => setOpcaoSelecionada('opcao2')}
 *     />
 *     <Radio 
 *       variant="disabled"
 *       description="Opção Desabilitada"
 *     />
 *   </div>
 * );
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {'default' | 'checked' | 'disabled'} [props.variant='default'] - Estado visual do botão de rádio
 *   - "default": Botão de rádio não selecionado
 *   - "checked": Botão de rádio selecionado
 *   - "disabled": Botão de rádio desabilitado e não interativo
 * @param {string} [props.description=''] - Texto descritivo exibido ao lado do botão de rádio
 * @param {string} [props.className=''] - Classes CSS adicionais para o componente
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento raiz,
 *   incluindo manipuladores de eventos como onClick para controlar a seleção
 *
 * @returns {JSX.Element} O componente Radio renderizado
 */

export const Radio = ({
	className = "",
	variant = "default",
	description = "",
	children,
	...restProps
}: RadioProps) => {
	return (
		<div className={`radio__root --${variant} ${className}`} {...restProps}>
			<div className="radio__input">
				<svg
					width="21"
					height="20"
					viewBox="0 0 21 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="radio__svg"
				>
					<title>radio</title>
					<path
						d="M15.5 6.66676L9.61714 13.3334L5.5 9.16604"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<p className="radio__label">{description}</p>
		</div>
	);
};
