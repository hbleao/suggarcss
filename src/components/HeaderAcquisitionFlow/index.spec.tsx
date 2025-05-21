import { render, screen, fireEvent } from "@testing-library/react";

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
	}),
}));

jest.mock("../Button", () => ({
	Button: ({
		children,
		title,
		variant,
		styles,
		className,
	}: {
		children?: React.ReactNode;
		title?: string;
		variant?: string;
		styles?: string;
		className?: string;
	}) => (
		<button
			type="button"
			data-testid="mock-button"
			data-title={title}
			data-variant={variant}
			data-styles={styles}
			className={className}
		>
			{children}
		</button>
	),
}));

describe("HeaderAcquisitionFlow", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockClsx.mockClear();
	});

	it("deve renderizar corretamente com valores padrão", () => {
		const { container } = render(<HeaderAcquisitionFlow />);

		// Verificar se o componente foi renderizado
		const header = container.querySelector(".header-acquisition-flow");
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass("header-acquisition-flow");

		// Verificar se as imagens foram renderizadas corretamente
		const images = screen.getAllByTestId("mock-image");
		const logo = images.find(
			(img) => img.getAttribute("src") === "logo-porto.svg",
		);
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveClass("header-acquisition-flow__item-center");
		expect(logo).toHaveAttribute("alt", "Logo da porto");

		// Verificar se os botões foram renderizados corretamente
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(2);
		
		// Verificar botão de voltar
		const backButton = buttons[0];
		expect(backButton).toHaveAttribute("data-variant", "negative");
		expect(backButton).toHaveAttribute("data-styles", "ghost");
		expect(backButton).toHaveClass("header-acquisition-flow__item-left");

		// Verificar ícone de voltar
		const backIcon = images.find(
			(img) => img.getAttribute("src") === "arrow-left.svg",
		);
		expect(backIcon).toBeInTheDocument();

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
		const logo = images.find(
			(img) => img.getAttribute("src") === "logo-porto.svg",
		);

		expect(logo).toBeDefined();
		if (logo) {
			fireEvent.click(logo);
			// Verificar se a navegação foi chamada corretamente
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith("/");
		}
	});

	it("deve navegar para o link de voltar ao clicar no botão de voltar", () => {
		render(<HeaderAcquisitionFlow goBackLink="/previous-page" />);

		const images = screen.getAllByTestId("mock-image");
		const backIcon = images.find(
			(img) => img.getAttribute("src") === "arrow-left.svg",
		);

		expect(backIcon).toBeDefined();
		if (backIcon) {
			fireEvent.click(backIcon);
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith("/previous-page");
		}
	});

	it("deve navegar para o link de voltar ao clicar no botão do carrinho", () => {
		render(<HeaderAcquisitionFlow goBackLink="/cart" />);

		const images = screen.getAllByTestId("mock-image");
		const cartIcon = images.find(
			(img) => img.getAttribute("src") === "shopping-cart.svg",
		);

		expect(cartIcon).toBeDefined();
		if (cartIcon) {
			fireEvent.click(cartIcon);
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith("/cart");
		}
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
		const images = screen.getAllByTestId("mock-image");
		const cartIcon = images.find(
			(img) => img.getAttribute("src") === "shopping-cart.svg",
		);
		expect(cartIcon).toBeUndefined();
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
		expect(images[0]).toHaveAttribute("src", "logo-porto.svg");
		expect(images[0]).toHaveClass("header-acquisition-flow__item-center");
	});

	it("deve usar o goBackLink fornecido", () => {
		render(<HeaderAcquisitionFlow goBackLink="/custom-back-link" />);

		const images = screen.getAllByTestId("mock-image");
		const backIcon = images.find(
			(img) => img.getAttribute("src") === "arrow-left.svg",
		);

		expect(backIcon).toBeDefined();
		if (backIcon) {
			fireEvent.click(backIcon);
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith("/custom-back-link");
		}
	});

	it("deve ter atributos de acessibilidade adequados", () => {
		render(<HeaderAcquisitionFlow />);

		// Verificar atributos de acessibilidade do logo
		const images = screen.getAllByTestId("mock-image");
		const logo = images.find(
			(img) => img.getAttribute("src") === "logo-porto.svg",
		);
		expect(logo).toBeDefined();
		if (logo) {
			expect(logo).toHaveAttribute("alt", "Logo da porto");
		}

		// Verificar atributos de acessibilidade dos botões
		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons[0]).toHaveAttribute("data-title", "voltar");
		expect(buttons[1]).toHaveAttribute("data-title", "voltar");
	});
});
