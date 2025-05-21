import { render, screen, fireEvent } from "@testing-library/react";
import { CardIcon } from "./index";

describe("<CardIcon />", () => {
	it("deve renderizar o componente base corretamente com variante padrão", () => {
		const { container } = render(<CardIcon />);
		const rootElement = container.querySelector(".card-icon__root");
		expect(rootElement).toBeInTheDocument();
		expect(rootElement).toHaveClass("--withoutLink");
	});

	it("deve renderizar com a variante link quando especificado", () => {
		const { container } = render(<CardIcon variant="link" />);
		const rootElement = container.querySelector(".card-icon__root");
		expect(rootElement).toBeInTheDocument();
		expect(rootElement).toHaveClass("--link");
	});

	it("deve renderizar o ícone quando fornecido", () => {
		const { container } = render(
			<CardIcon icon={<span data-testid="test-icon">🔍</span>} />
		);
		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
		expect(container.querySelector(".card-icon__icon")).toBeInTheDocument();
	});

	it("não deve renderizar o ícone quando não fornecido", () => {
		const { container } = render(<CardIcon />);
		expect(container.querySelector(".card-icon__icon")).not.toBeInTheDocument();
	});

	it("deve renderizar o pré-título corretamente", () => {
		render(<CardIcon preTitle="Pré-título" />);
		expect(screen.getByText("Pré-título")).toBeInTheDocument();
		expect(screen.getByText("Pré-título")).toHaveClass("card-icon__pretitle");
	});

	it("não deve renderizar o pré-título quando não fornecido", () => {
		const { container } = render(<CardIcon />);
		expect(container.querySelector(".card-icon__pretitle")).not.toBeInTheDocument();
	});

	it("deve renderizar o título corretamente", () => {
		render(<CardIcon title="Título do Card" />);
		expect(screen.getByText("Título do Card")).toBeInTheDocument();
		expect(screen.getByText("Título do Card")).toHaveClass("card-icon__title");
	});

	it("não deve renderizar o título quando não fornecido", () => {
		const { container } = render(<CardIcon />);
		expect(container.querySelector(".card-icon__title")).not.toBeInTheDocument();
	});

	it("deve renderizar a descrição corretamente", () => {
		render(<CardIcon description="Descrição do card" />);
		expect(screen.getByText("Descrição do card")).toBeInTheDocument();
		expect(screen.getByText("Descrição do card")).toHaveClass(
			"card-icon__description"
		);
	});

	it("não deve renderizar a descrição quando não fornecida", () => {
		const { container } = render(<CardIcon />);
		expect(container.querySelector(".card-icon__description")).not.toBeInTheDocument();
	});

	it("deve aplicar propriedades adicionais ao título", () => {
		render(
			<CardIcon 
				title="Título Personalizado" 
				titleProps={{ 
					"data-testid": "custom-title",
					className: "custom-title-class" 
				}} 
			/>
		);
		const titleElement = screen.getByTestId("custom-title");
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveClass("typography");
		expect(titleElement).toHaveClass("custom-title-class");
	});

	it("deve aplicar propriedades adicionais à descrição", () => {
		render(
			<CardIcon 
				description="Descrição Personalizada" 
				descriptionProps={{ 
					"data-testid": "custom-description",
					className: "custom-description-class" 
				}} 
			/>
		);
		const descriptionElement = screen.getByTestId("custom-description");
		expect(descriptionElement).toBeInTheDocument();
		expect(descriptionElement).toHaveClass("typography");
		expect(descriptionElement).toHaveClass("custom-description-class");
	});

	it("deve chamar onClick quando clicado", () => {
		const mockOnClick = jest.fn();
		render(<CardIcon onClick={mockOnClick} title="Card Clicável" />);

		fireEvent.click(screen.getByText("Card Clicável"));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it("deve renderizar todos os elementos quando fornecidos", () => {
		render(
			<CardIcon 
				icon={<span data-testid="test-icon">🔍</span>}
				preTitle="Pré-título"
				title="Título do Card"
				description="Descrição do card"
			/>
		);

		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
		expect(screen.getByText("Pré-título")).toBeInTheDocument();
		expect(screen.getByText("Título do Card")).toBeInTheDocument();
		expect(screen.getByText("Descrição do card")).toBeInTheDocument();
	});

	it("deve passar props adicionais para o elemento raiz", () => {
		render(
			<CardIcon 
				data-testid="card-root"
				className="custom-class"
				title="Título"
			/>
		);

		const rootElement = screen.getByTestId("card-root");
		// Verificar se a classe personalizada foi aplicada
		expect(rootElement).toHaveClass("custom-class");
		// Verificar se o elemento existe
		expect(rootElement).toBeInTheDocument();
	});
});
