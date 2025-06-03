import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderAcquisitionFlow } from "./index";

// Mock dos ícones
jest.mock("./icons/ic-arrow-left.svg", () => "arrow-left.svg");
jest.mock("./icons/ic-logo-porto.svg", () => "logo-porto.svg");
jest.mock("./icons/ic-shopping-cart.svg", () => "shopping-cart.svg");

// Mock dos estilos
jest.mock("./styles.scss", () => ({}));

// Mock do utilitário clsx
const mockClsx = jest.fn((...args: unknown[]) => args.filter(Boolean).join(" "));
jest.mock("@/utils/clsx", () => ({
	clsx: (...args: unknown[]) => mockClsx(...args),
}));

jest.mock("next/image", () => {
	return function Image({
		src,
		alt,
		className,
		onClick,
		width,
		height,
	}: {
		src: string;
		alt: string;
		className?: string;
		onClick?: () => void;
		width: number;
		height: number;
	}) {
		return (
			<img
				src={src}
				alt={alt}
				className={className}
				onClick={onClick}
				onKeyDown={onClick ? (e) => {
					if (e.key === "Enter") {
						onClick();
					}
				} : undefined}
				width={width}
				height={height}
				data-testid="mock-image"
				role={onClick ? "button" : undefined}
				tabIndex={onClick ? 0 : undefined}
			/>
		);
	};
});

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
		prefetch: jest.fn(),
	}),
}));

jest.mock("../Button", () => ({
	Button: ({
		children,
		title,
		variant,
		styles,
		className,
		onClick,
	}: {
		children?: React.ReactNode;
		title?: string;
		variant?: string;
		styles?: string;
		className?: string;
		onClick?: () => void;
	}) => {
		return (
			<button
				type="button"
				data-testid="mock-button"
				data-variant={variant}
				data-styles={styles}
				data-title={title}
				className={className}
				onClick={onClick}
			>
				{children}
			</button>
		);
	},
}));

describe("HeaderAcquisitionFlow", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockClsx.mockClear();
		mockPush.mockClear();
	});

	it("deve renderizar corretamente com valores padrão", () => {
		const { container } = render(<HeaderAcquisitionFlow />);

		// Verificar se o componente foi renderizado
		const header = container.querySelector(".header-acquisition-flow");
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass("header-acquisition-flow");

		// Verificar se as imagens foram renderizadas corretamente
		const images = screen.getAllByTestId("mock-image");
		// Verificar se o logo está presente
		expect(images.length).toBeGreaterThan(0);
		
		// Verificar se pelo menos uma imagem tem a classe correta para o logo
		const logoElement = images.find(img => 
			img.classList.contains("header-acquisition-flow__item-center")
		);
		expect(logoElement).toBeDefined();
		
		// Verificar se pelo menos uma imagem tem o alt text correto
		const logoWithAlt = images.find(img => 
			img.getAttribute("alt") === "Logo da porto"
		);
		expect(logoWithAlt).toBeDefined();

		// Verificar se os botões foram renderizados corretamente
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(2);
		
		// Verificar botão de voltar
		const backButton = buttons[0];
		expect(backButton).toHaveAttribute("data-variant", "negative");
		expect(backButton).toHaveAttribute("data-styles", "ghost");
		expect(backButton).toHaveClass("header-acquisition-flow__item-left");

		// Verificar botão do carrinho
		const cartButton = buttons[1];
		expect(cartButton).toHaveClass("header-acquisition-flow__item-right");

		// Verificar ícone do carrinho
		const cartIcon = images.find(
			(img) => img.getAttribute("src") === "shopping-cart.svg",
		);
		expect(cartIcon).toBeInTheDocument();
	});

	it("deve navegar para a página inicial ao clicar no logo", () => {
		render(<HeaderAcquisitionFlow />);

		const images = screen.getAllByTestId("mock-image");
		const logoElement = images.find(img => 
			img.classList.contains("header-acquisition-flow__item-center")
		);
		expect(logoElement).toBeDefined();
		if (logoElement) {
			fireEvent.click(logoElement);
			// Verificar se a navegação foi chamada corretamente
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith("/");
		}
	});

	it("deve navegar para o link de voltar ao clicar no botão de voltar", () => {
		render(<HeaderAcquisitionFlow goBackLink="/previous-page" />);

		// Get all images
		const images = screen.getAllByTestId("mock-image");
		// Find the back arrow image
		const backArrow = images.find(img => 
			img.className && img.className.includes("header-acquisition-flow__button")
		);

		expect(backArrow).toBeDefined();
		// Use optional chaining to safely access the element
		backArrow && fireEvent.click(backArrow);
		
		// Check that the mock router was called with the correct path
		expect(mockPush).toHaveBeenCalledWith("/previous-page");
	});

	it("deve navegar para o link de voltar ao clicar no botão do carrinho", () => {
		// Verificar navegação ao clicar no botão do carrinho
		render(<HeaderAcquisitionFlow goBackLink="/cart" />);
		
		// Get all images
		const images = screen.getAllByTestId("mock-image");
		// Find the shopping cart image
		const cartImage = images.find(img => 
			img.className && img.className.includes("header-acquisition-flow__button") && 
			!img.className.includes("header-acquisition-flow__item-center")
		);
		
		expect(cartImage).toBeDefined();
		// Use optional chaining to safely access the element
		cartImage && fireEvent.click(cartImage);
		
		// Check that the mock router was called with the correct path
		expect(mockPush).toHaveBeenCalledWith("/cart");
	});

	it("não deve renderizar o botão de voltar quando hasGoBackLink=false", () => {
		render(<HeaderAcquisitionFlow hasGoBackLink={false} />);

		// Verificar se apenas um botão foi renderizado (carrinho)
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(1);
		expect(buttons[0]).toHaveClass("header-acquisition-flow__item-right");

		// Verificar se o ícone de voltar não está presente
		const images = screen.getAllByTestId("mock-image");
		const backIcon = images.find(
			(img) => img.getAttribute("src") === "arrow-left.svg",
		);
		expect(backIcon).toBeUndefined();
	});

	it("não deve renderizar o botão do carrinho quando hasShoppingCart=false", () => {
		render(<HeaderAcquisitionFlow hasShoppingCart={false} />);

		// Verificar se apenas um botão foi renderizado (voltar)
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(1);
		expect(buttons[0]).toHaveClass("header-acquisition-flow__item-left");

		// Verificar se o ícone do carrinho não está presente
		// Check that there is no shopping cart button
		const rightButton = buttons.find(button => 
			button.classList.contains("header-acquisition-flow__item-right")
		);
		expect(rightButton).toBeUndefined();
	});

	it("deve renderizar apenas o logo quando hasGoBackLink=false e hasShoppingCart=false", () => {
		render(
			<HeaderAcquisitionFlow hasGoBackLink={false} hasShoppingCart={false} />,
		);

		// Verificar se nenhum botão foi renderizado
		const buttons = screen.queryAllByTestId("mock-button");
		expect(buttons).toHaveLength(0);

		// Verificar se apenas o logo foi renderizado
		const images = screen.getAllByTestId("mock-image");
		expect(images).toHaveLength(1);
		expect(images[0]).toHaveClass("header-acquisition-flow__item-center");
	});

	it("deve usar o goBackLink fornecido", () => {
		render(<HeaderAcquisitionFlow goBackLink="/custom-back-link" />);

		// Get all images
		const images = screen.getAllByTestId("mock-image");
		// Find the back arrow image
		const backArrow = images.find(img => 
			img.className && img.className.includes("header-acquisition-flow__button")
		);

		expect(backArrow).toBeDefined();
		// Use optional chaining to safely access the element
		backArrow && fireEvent.click(backArrow);
		
		// Check that the mock router was called with the correct path
		expect(mockPush).toHaveBeenCalledWith("/custom-back-link");
	});

	it("deve ter atributos de acessibilidade adequados", () => {
		render(<HeaderAcquisitionFlow />);

		// Verificar atributos de acessibilidade do logo
		const images = screen.getAllByTestId("mock-image");
		// Check for logo with correct alt text
		const logoWithAlt = images.find(img => 
			img.getAttribute("alt") === "Logo da porto"
		);
		expect(logoWithAlt).toBeDefined();

		// Verificar atributos de acessibilidade dos botões
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons[0]).toHaveAttribute("data-title", "voltar");
		expect(buttons[1]).toHaveAttribute("data-title", "voltar");
	});
});
