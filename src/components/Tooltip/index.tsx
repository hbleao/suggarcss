import { useState } from "react";

import "./styles.scss";

import type { TooltipProps } from "./types";

/**
 * `Tooltip` — Componente de dica visual para exibir informações contextuais ao interagir com um elemento.
 *
 * Ideal para fornecer explicações curtas ou metadados sem ocupar espaço fixo na interface.
 * Pode ser usado tanto de forma controlada (via `isOpen`) quanto não controlada (hover padrão).
 *
 * @component
 *
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.content - Conteúdo exibido no tooltip (pode conter HTML, texto ou ícones)
 * @param {React.ReactNode} props.children - Elemento disparador (trigger) que ativa a exibição do tooltip
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.position='top'] - Posição do tooltip em relação ao trigger
 * @param {boolean} [props.isOpen] - Se fornecido, o tooltip se torna controlado externamente
 * @param {() => void} [props.onOpen] - Função chamada quando o tooltip é aberto
 * @param {() => void} [props.onClose] - Função chamada quando o tooltip é fechado
 * @param {string} [props.className=''] - Classe CSS adicional aplicada ao wrapper externo do tooltip
 * @param {string} [props.contentClassName=''] - Classe CSS adicional aplicada ao conteúdo do tooltip
 * @param {string} [props.triggerClassName=''] - Classe CSS adicional aplicada ao elemento trigger
 * @param {React.HTMLAttributes<HTMLDivElement>} props.restProps - Atributos HTML extras para o wrapper principal
 *
 * @example
 * <Tooltip content="Este campo é obrigatório">
 *   <input type="text" />
 * </Tooltip>
 *
 * @example
 * <Tooltip
 *   content="Informação adicional"
 *   position="right"
 *   isOpen={isTooltipVisible}
 *   onOpen={() => console.log('aberto')}
 *   onClose={() => console.log('fechado')}
 * >
 *   <button>Hover ou clique</button>
 * </Tooltip>
 *
 * @returns {JSX.Element} Elemento JSX contendo o trigger e o tooltip posicionado
 */

export const Tooltip = ({
	content,
	children,
	position = "top",
	isOpen: controlledIsOpen,
	onOpen,
	onClose,
	className = "",
	...props
}: TooltipProps) => {
	const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

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
		<div className="tooltip" {...props}>
			<div
				className="tooltip__trigger"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{children}
			</div>

			<div
				className={`tooltip__content --${position} ${isOpen ? "--visible" : ""}`}
			>
				{content}
			</div>
		</div>
	);
};
