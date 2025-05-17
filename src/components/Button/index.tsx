import './styles.scss';

import type { ButtonProps } from './types';

/**
 * Componente Button para ações interativas na interface.
 *
 * O componente Button fornece uma interface para ações do usuário, como enviar formulários,
 * confirmar ações ou navegar entre páginas. Suporta diferentes variantes visuais, estilos,
 * tamanhos e estados, permitindo adaptação a diversos contextos de uso.
 *
 * @component
 * @example
 * ```tsx
 * // Botão primário padrão
 * <Button onClick={() => console.log('Clicado!')}>
 *   Clique aqui
 * </Button>
 * 
 * // Botão secundário de saúde
 * <Button 
 *   variant="health" 
 *   styles="secondary" 
 *   size="small"
 *   onClick={() => console.log('Botão de saúde clicado!')}
 * >
 *   Saúde
 * </Button>
 * 
 * // Botão de largura total com estado de carregamento
 * <Button 
 *   variant="banking" 
 *   width="fluid" 
 *   isLoading={true}
 * >
 *   Processando...
 * </Button>
 * ```
 *
 * @param {Object} props - Propriedades do componente
 * @param {'insurance' | 'banking' | 'health' | 'danger' | 'negative' | 'disabled'} [props.variant='insurance'] - Variante visual do botão
 *   - "insurance": Tema de seguros (padrão)
 *   - "banking": Tema bancário
 *   - "health": Tema de saúde
 *   - "danger": Tema de alerta/perigo
 *   - "negative": Tema negativo (ideal para fundos escuros)
 *   - "disabled": Tema desabilitado
 * @param {'primary' | 'secondary' | 'ghost'} [props.styles='primary'] - Estilo visual do botão
 *   - "primary": Botão com preenchimento de cor
 *   - "secondary": Botão com borda e sem preenchimento
 *   - "ghost": Botão sem borda e sem preenchimento
 * @param {'small' | 'large'} [props.size='large'] - Tamanho do botão
 *   - "small": Botão de tamanho reduzido
 *   - "large": Botão de tamanho normal
 * @param {'contain' | 'fluid'} [props.width='contain'] - Largura do botão
 *   - "contain": Largura ajustada ao conteúdo
 *   - "fluid": Largura de 100% do container
 * @param {boolean} [props.isLoading=false] - Indica se o botão está em estado de carregamento
 * @param {string} [props.className=''] - Classes CSS adicionais para o componente
 * @param {ReactNode} props.children - Conteúdo do botão
 * @param {HTMLAttributes<HTMLButtonElement>} props.restProps - Outras propriedades HTML válidas para o elemento button
 *
 * @returns {JSX.Element} O componente Button renderizado
 */

export const Button = ({
	variant = 'insurance',
	styles = 'primary',
	size = 'large',
	width = 'contain',
	isLoading = false,
	className = '',
	children,
	...restProps
}: ButtonProps) => {
	const custom_className = `btn --${variant}-${styles} --${width} --${size}`;

	return (
		<button className={custom_className} {...restProps}>
			{isLoading ? <span className="utils-loader btn__loader" /> : children}
		</button>
	);
};
