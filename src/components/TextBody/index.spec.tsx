import { render, screen, fireEvent } from "@testing-library/react";
import { TextBody } from "./index";
import type { Button } from "./types";

jest.mock("@/components", () => ({
	Typography: ({ children, variant, weight, as, color, className }: {
		children: React.ReactNode;
		variant?: string;
		weight?: string;
		as?: string;
		color?: string;
		className?: string;
	}) => (
		<div
			data-testid="mock-typography"
			data-variant={variant}
			data-weight={weight}
			data-as={as}
			data-color={color}
			className={className}
		>
			{children}
		</div>
	),
}));

jest.mock("../Button", () => ({
	Button: ({
		children,
		size,
		styles,
		variant,
		width,
		disabled,
		isLoading,
		onClick,
		...props
	}: {
		children: React.ReactNode;
		size?: string;
		styles?: string;
		variant?: string;
		width?: string;
		disabled?: boolean;
		isLoading?: boolean;
		onClick?: () => void;
		[key: string]: any;
	}) => (
		<button
			data-testid="mock-button"
			data-size={size}
			data-styles={styles}
			data-variant={variant}
			data-width={width}
			data-disabled={disabled ? "true" : "false"}
			data-loading={isLoading ? "true" : "false"}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	),
}));

jest.mock("./styles.scss", () => ({}));

describe("<TextBody />", () => {
	it("renderiza corretamente com valores padrão", () => {
		render(<TextBody buttons={[]} data-testid="text-body" />);
		const container = screen.getByTestId("text-body");
		expect(container).toHaveClass("text-body__root");

		const title = screen.getByTestId("mock-typography");
		expect(title).toHaveTextContent("title");
		expect(title).toHaveAttribute("data-variant", "title4");
		expect(title).toHaveClass("text-body__title");
	});

	it("renderiza título personalizado", () => {
		render(<TextBody title="Meu Título" buttons={[]} />);
		expect(screen.getByText("Meu Título")).toBeInTheDocument();
	});

	it("renderiza subtítulo quando fornecido", () => {
		render(<TextBody subtitle="Subtítulo" buttons={[]} />);
		const subtitle = screen.getAllByTestId("mock-typography")[1];
		expect(subtitle).toHaveTextContent("Subtítulo");
		expect(subtitle).toHaveClass("text-body__subtitle");
		expect(subtitle).toHaveAttribute("data-variant", "body1");
	});

	it("não renderiza subtítulo quando não fornecido", () => {
		render(<TextBody buttons={[]} />);
		const subtitles = screen.getAllByTestId("mock-typography");
		expect(subtitles).toHaveLength(1); // Apenas o título
	});

	it("renderiza texto com HTML quando fornecido", () => {
		render(<TextBody text="<strong>Texto</strong>" buttons={[]} />);
		const textWrapper = screen.getAllByTestId("mock-typography")[1];
		expect(textWrapper).toHaveClass("text-body__text");
		expect(textWrapper.innerHTML).toContain("<strong>Texto</strong>");
	});

	it("renderiza botões quando fornecidos", () => {
		const mockButtons: Button[] = [
			{ label: "Confirmar", variant: "insurance", styles: "primary" },
			{ label: "Cancelar", variant: "insurance", styles: "secondary", disabled: true },
		];
		render(<TextBody buttons={mockButtons} />);

		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(2);
		expect(buttons[0]).toHaveTextContent("Confirmar");
		expect(buttons[0]).toHaveAttribute("data-variant", "insurance");
		expect(buttons[0]).toHaveAttribute("data-styles", "primary");
		expect(buttons[1]).toHaveTextContent("Cancelar");
		expect(buttons[1]).toHaveAttribute("data-disabled", "true");
		expect(buttons[1]).toHaveAttribute("data-styles", "secondary");
	});

	it("não renderiza container de botões se lista estiver vazia", () => {
		render(<TextBody buttons={[]} />);
		expect(screen.queryByTestId("mock-button")).not.toBeInTheDocument();
	});

	it("renderiza todos os elementos quando fornecidos", () => {
		render(
			<TextBody
				title="Título"
				subtitle="Sub"
				text="Texto <b>html</b>"
				buttons={[{ label: "Ação", variant: "insurance" }]}
			/>,
		);
		expect(screen.getAllByTestId("mock-typography")).toHaveLength(3);
		expect(screen.getByText("Ação")).toBeInTheDocument();
	});

	it("aceita e propaga atributos HTML adicionais", () => {
		render(
			<TextBody
				title="Teste"
				buttons={[]}
				data-testid="text-body"
				role="region"
				aria-label="Seção"
				className="custom-class"
				id="text-body-id"
			/>,
		);
		const el = screen.getByTestId("text-body");
		expect(el).toHaveAttribute("role", "region");
		expect(el).toHaveAttribute("aria-label", "Seção");
		expect(el).toHaveAttribute("id", "text-body-id");
		expect(el).toHaveClass("text-body__root");
	});

	it("manipula eventos de clique nos botões", () => {
		const onClickPrimary = jest.fn();
		const onClickSecondary = jest.fn();

		const mockButtons: Button[] = [
			{ label: "Primário", onClick: onClickPrimary },
			{ label: "Secundário", onClick: onClickSecondary },
		];

		render(<TextBody buttons={mockButtons} />);

		const buttons = screen.getAllByTestId("mock-button");
		fireEvent.click(buttons[0]);
		fireEvent.click(buttons[1]);

		expect(onClickPrimary).toHaveBeenCalledTimes(1);
		expect(onClickSecondary).toHaveBeenCalledTimes(1);
	});

	it("renderiza corretamente com texto HTML complexo", () => {
		const complexHtml = `
			<p>Parágrafo com <strong>texto em negrito</strong> e <em>itálico</em>.</p>
			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
			</ul>
		`;

		render(<TextBody text={complexHtml} buttons={[]} />);

		const textElement = screen.getAllByTestId("mock-typography")[1];
		expect(textElement).toHaveClass("text-body__text");
		expect(textElement.innerHTML).toContain("<strong>texto em negrito</strong>");
		expect(textElement.innerHTML).toContain("<em>itálico</em>");
		expect(textElement.innerHTML).toContain("<li>Item 1</li>");
	});

	it("renderiza botões com diferentes variantes e estilos", () => {
		const mockButtons: Button[] = [
			{ label: "Seguro", variant: "insurance", styles: "primary" },
			{ label: "Saúde", variant: "health", styles: "secondary" },
			{ label: "Banco", variant: "banking", styles: "ghost" },
			{ label: "Desabilitado", variant: "disabled", disabled: true },
		];

		render(<TextBody buttons={mockButtons} />);

		const buttons = screen.getAllByTestId("mock-button");
		expect(buttons).toHaveLength(4);

		expect(buttons[0]).toHaveAttribute("data-variant", "insurance");
		expect(buttons[0]).toHaveAttribute("data-styles", "primary");

		expect(buttons[1]).toHaveAttribute("data-variant", "health");
		expect(buttons[1]).toHaveAttribute("data-styles", "secondary");

		expect(buttons[2]).toHaveAttribute("data-variant", "banking");
		expect(buttons[2]).toHaveAttribute("data-styles", "ghost");

		expect(buttons[3]).toHaveAttribute("data-variant", "disabled");
		expect(buttons[3]).toHaveAttribute("data-disabled", "true");
	});
});
