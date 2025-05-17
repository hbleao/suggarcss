import './styles.scss';

import type { CheckboxProps } from './types';

/**
 * Componente Checkbox para seleção de opções múltiplas.
 *
 * O componente Checkbox fornece uma interface para seleção de opções múltiplas em formulários
 * ou listas de opções. Suporta diferentes estados visuais (padrão, selecionado, desabilitado) e
 * pode incluir um texto descritivo ao lado da caixa de seleção.
 *
 * @component
 * @example
 * ```tsx
 * // Grupo de checkboxes
 * const [opcoes, setOpcoes] = useState({
 *   opcao1: false,
 *   opcao2: true,
 *   opcao3: false
 * });
 * 
 * const handleChange = (opcao) => {
 *   setOpcoes(prev => ({
 *     ...prev,
 *     [opcao]: !prev[opcao]
 *   }));
 * };
 * 
 * return (
 *   <div>
 *     <Checkbox 
 *       variant={opcoes.opcao1 ? 'checked' : 'default'}
 *       label="Opção 1"
 *       onClick={() => handleChange('opcao1')}
 *     />
 *     <Checkbox 
 *       variant={opcoes.opcao2 ? 'checked' : 'default'}
 *       label="Opção 2"
 *       onClick={() => handleChange('opcao2')}
 *     />
 *     <Checkbox 
 *       variant="disabled"
 *       label="Opção Desabilitada"
 *     />
 *   </div>
 * );
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {'default' | 'checked' | 'disabled'} [props.variant='default'] - Estado visual do checkbox
 *   - "default": Checkbox não selecionado
 *   - "checked": Checkbox selecionado
 *   - "disabled": Checkbox desabilitado e não interativo
 * @param {string} [props.label=''] - Texto descritivo exibido ao lado do checkbox
 *   Suporta HTML através de dangerouslySetInnerHTML
 * @param {string} [props.className=''] - Classes CSS adicionais para o componente
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento raiz,
 *   incluindo manipuladores de eventos como onClick para controlar a seleção
 *
 * @returns {JSX.Element} O componente Checkbox renderizado
 */

export const Checkbox = ({
	className = '',
	variant = 'default',
	label = '',
	...restProps
}: CheckboxProps) => {
	return (
		<div className={`checkbox__root --${variant} ${className}`} {...restProps}>
			<div className="checkbox__input">
				<svg
					width="21"
					height="20"
					viewBox="0 0 21 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="checkbox__svg"
				>
					<title>checkbox</title>
					<path
						d="M15.5 6.66676L9.61714 13.3334L5.5 9.16604"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<label
				htmlFor={`checkbox-${label}`}
				className="checkbox__label"
				dangerouslySetInnerHTML={{ __html: label }}
			/>
		</div>
	);
};
