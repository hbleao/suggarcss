import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@porto-ocean/icon";
import { joinClasses } from "@porto-ocean/utils";

import './styles.scss';
import type { DialogProps } from './types';

/**
 * Componente Dialog para exibir modais de diálogo interativos.
 *
 * O componente Dialog fornece uma interface para exibir conteúdo em um modal sobreposto à página,
 * ideal para confirmações, alertas, formulários ou qualquer conteúdo que requeira atenção imediata
 * do usuário. Suporta diferentes tamanhos, temas e estruturas flexíveis com cabeçalho, corpo e rodapé.
 *
 * @component
 * @example
 * ```tsx
 * // Diálogo básico com título e botões
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * return (
 *   <>
 *     <Button onClick={() => setIsOpen(true)}>Abrir Diálogo</Button>
 *     
 *     <Dialog
 *       isOpen={isOpen}
 *       onClose={() => setIsOpen(false)}
 *       title="Confirmação"
 *       description="Tem certeza que deseja continuar com esta ação?"
 *       footer={
 *         <>
 *           <Button variant="insurance" styles="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
 *           <Button variant="insurance" styles="primary" onClick={() => { alert('Confirmado!'); setIsOpen(false); }}>Confirmar</Button>
 *         </>
 *       }
 *     />
 *   </>
 * );
 * ```
 * 
 * @example
 * ```tsx
 * // Diálogo com ícone, título, subtítulo e conteúdo personalizado
 * <Dialog
 *   isOpen={isDialogOpen}
 *   onClose={() => setIsDialogOpen(false)}
 *   variant="medium"
 *   theme="light"
 *   title="Detalhes do Plano"
 *   subtitle="Plano Premium"
 *   icon={{ iconName: "info", color: "portoSeguros100" }}
 *   footer={
 *     <Button variant="insurance" styles="primary" onClick={() => setIsDialogOpen(false)}>Entendi</Button>
 *   }
 * >
 *   <div>
 *     <p>Este plano inclui as seguintes coberturas:</p>
 *     <ul>
 *       <li>Cobertura básica</li>
 *       <li>Assistência 24h</li>
 *       <li>Proteção contra terceiros</li>
 *     </ul>
 *   </div>
 * </Dialog>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.isOpen - Controla se o diálogo está aberto ou fechado
 * @param {() => void} [props.onClose] - Função chamada quando o diálogo é fechado (clique no overlay)
 * @param {'small' | 'medium' | 'large'} [props.variant='small'] - Tamanho do diálogo
 *   - "small": Diálogo de tamanho reduzido, ideal para mensagens simples
 *   - "medium": Diálogo de tamanho médio, adequado para a maioria dos casos
 *   - "large": Diálogo amplo, ideal para conteúdos extensos
 * @param {'light' | 'dark'} [props.theme='light'] - Tema visual do diálogo
 *   - "light": Tema claro com fundo branco
 *   - "dark": Tema escuro com fundo escuro
 * @param {ReactNode} [props.title] - Título principal do diálogo
 * @param {ReactNode} [props.subtitle] - Subtítulo ou informação secundária do diálogo
 * @param {ReactNode} [props.description] - Descrição ou texto explicativo do diálogo
 * @param {IconProps} [props.icon] - Configuração do ícone exibido no cabeçalho do diálogo
 *   Inclui propriedades como iconName, size e color
 * @param {ReactNode} [props.children] - Conteúdo principal do diálogo
 * @param {ReactNode} [props.footer] - Conteúdo do rodapé do diálogo, geralmente botões de ação
 * @param {'column' | 'row'} [props.footerVariant='row'] - Orientação dos elementos no rodapé
 *   - "row": Elementos dispostos horizontalmente
 *   - "column": Elementos dispostos verticalmente
 * @param {string} [props.className=''] - Classes CSS adicionais para personalização
 * @param {HTMLAttributes<HTMLDivElement>} props.restProps - Outras propriedades HTML válidas para o elemento div raiz
 *
 * @returns {JSX.Element | null} O componente Dialog renderizado ou null se não estiver montado
 */
export const Dialog = ({
  isOpen,
  onClose,
  variant = "small",
  theme = "light",
  title,
  subtitle,
  description,
  icon,
  children,
  footer,
  footerVariant = "row",
  className = "",
  ...restProps
}: DialogProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const handleOverlayClick = () => {
		if (onClose) {
			onClose();
		}
	};

	if (!mounted) {
		return null;
	}

	return createPortal(
		<div
			className={joinClasses([
				"dialog dialog__overlay",
				isOpen ? "dialog__overlay--open" : "",
				`--${theme}`,
				className,
			])}
			onClick={handleOverlayClick}
			{...restProps}
		>
			<div
				className={joinClasses(["dialog__box", `--${variant}`])}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header Section */}
				{(title || subtitle || icon) && (
					<div className="dialog__header">
						{/* Icon */}
						{icon && (
							<Icon
								iconName={icon.iconName}
								size={icon.size || "md"}
								color={icon.color}
								className="dialog__icon"
								{...icon}
							/>
						)}

						{/* Title Container */}
						{(title || subtitle) && (
							<div className="dialog__title-container">
								{/* Title */}
								{title && <h2 className="dialog__title">{title}</h2>}

								{/* Subtitle */}
								{subtitle && <h3 className="dialog__subtitle">{subtitle}</h3>}
							</div>
						)}
					</div>
				)}

				{/* Description */}
				{description && (
					<div className="dialog__description">{description}</div>
				)}

				{/* Body Content */}
				{children && <div className="dialog__body">{children}</div>}

				{/* Footer */}
				{footer && (
					<div
						className={joinClasses(["dialog__footer", `--${footerVariant}`])}
					>
						{footer}
					</div>
				)}
			</div>
		</div>,
		document.body,
	);
};
