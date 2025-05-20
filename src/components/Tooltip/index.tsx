import { useState } from "react";

import "./styles.scss";

import type { TooltipProps } from "./types";

/**
 * Componente Tooltip para exibir informações adicionais ao passar o mouse sobre um elemento.
 *
 * O componente Tooltip permite adicionar dicas contextuais que são exibidas quando o usuário
 * passa o mouse sobre um elemento. É útil para fornecer informações extras, explicações ou
 * instruções sem sobrecarregar a interface. O tooltip pode ser posicionado em quatro direções
 * diferentes em relação ao elemento trigger e pode ser controlado externamente se necessário.
 *
 * @component
 * @example
 * ```tsx
 * <Tooltip
 *   content="Esta é uma dica útil sobre o campo"
 *   position="top"
 * >
 *   <button>Passe o mouse aqui</button>
 * </Tooltip>
 * ```
 *
 * @example
 * // Tooltip controlado externamente
 * ```tsx
 * const [isTooltipOpen, setTooltipOpen] = useState(false);
 *
 * return (
 *   <Tooltip
 *     content="Tooltip controlado por estado externo"
 *     position="bottom"
 *     isOpen={isTooltipOpen}
 *     onOpen={() => console.log('Tooltip aberto')}
 *     onClose={() => console.log('Tooltip fechado')}
 *   >
 *     <button
 *       onClick={() => setTooltipOpen(!isTooltipOpen)}
 *     >
 *       Clique para {isTooltipOpen ? 'esconder' : 'mostrar'} o tooltip
 *     </button>
 *   </Tooltip>
 * );
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.content - Conteúdo que será exibido no tooltip
 * @param {ReactNode} props.children - Elemento que acionará o tooltip (elemento trigger)
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.position='top'] - Posição do tooltip em relação ao elemento trigger
 *   - "top": Exibe o tooltip acima do elemento trigger
 *   - "right": Exibe o tooltip à direita do elemento trigger
 *   - "bottom": Exibe o tooltip abaixo do elemento trigger
 *   - "left": Exibe o tooltip à esquerda do elemento trigger
 * @param {boolean} [props.isOpen] - Define se o tooltip está visível (para uso controlado)
 *   - Se fornecido, o componente se torna controlado externamente
 *   - Se omitido, o componente gerencia seu próprio estado internamente
 * @param {() => void} [props.onOpen] - Callback chamado quando o tooltip é aberto
 * @param {() => void} [props.onClose] - Callback chamado quando o tooltip é fechado
 * @param {string} [props.className=''] - Classe CSS adicional para o componente raiz
 * @param {string} [props.contentClassName=''] - Classe CSS adicional para o conteúdo do tooltip
 * @param {string} [props.triggerClassName=''] - Classe CSS adicional para o elemento trigger
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento raiz
 *
 * @returns {JSX.Element} O componente Tooltip renderizado
 */
export const Tooltip = ({
	content,
	children,
	position = "top",
	isOpen: controlledIsOpen,
	onOpen,
	onClose,
	className = "",
	contentClassName = "",
	triggerClassName = "",
	...restProps
}: TooltipProps) => {
	const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

	// Determina se o componente é controlado ou não
	const isControlled = controlledIsOpen !== undefined;
	const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

	const handleMouseEnter = () => {
		if (!isControlled) {
			setUncontrolledIsOpen(true);
		}
		if (onOpen) {
			onOpen();
		}
	};

	const handleMouseLeave = () => {
		if (!isControlled) {
			setUncontrolledIsOpen(false);
		}
		if (onClose) {
			onClose();
		}
	};

	return (
		<div className="tooltip" {...restProps}>
			<div
				className={`tooltip__trigger ${triggerClassName}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{children}
			</div>

			<div
				className={`tooltip__content --${position} ${isOpen ? "--visible" : ""} ${contentClassName}`}
			>
				{content}
			</div>
		</div>
	);
};
