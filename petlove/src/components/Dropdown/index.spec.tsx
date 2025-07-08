import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./index";

jest.mock("./styles.scss", () => ({}));

jest.mock("./Arrow", () => ({
	ArrowSvg: ({ isOpen }: { isOpen: boolean }) => (
		<div data-testid="arrow-svg">{isOpen ? "Aberto" : "Fechado"}</div>
	),
}));

jest.mock("../Loader", () => ({
	Loader: () => <div data-testid="loader">Carregando...</div>,
}));

describe("Dropdown", () => {
	const mockOptions = [
		{ value: "option1", label: "Opção 1" },
		{ value: "option2", label: "Opção 2" },
		{ value: "option3", label: "Opção 3" },
	];

	it("deve renderizar corretamente", () => {
		render(<Dropdown data-testid="dropdown" />);

		const dropdown = screen.getByTestId("dropdown");
		expect(dropdown).toBeInTheDocument();
		expect(dropdown).toHaveClass("dropdown__root");
		expect(dropdown).toHaveClass("--default");
		expect(dropdown).toHaveClass("--contain");
	});

	it("deve renderizar com label", () => {
		render(<Dropdown label="Selecione uma opção" name="test-dropdown" />);

		const label = screen.getByText("Selecione uma opção");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("dropdown__label");
		expect(label).toHaveAttribute("for", "test-dropdown");
	});

	it("deve renderizar com valor selecionado", () => {
		render(<Dropdown value="Valor selecionado" />);

		const input = screen.getByDisplayValue("Valor selecionado");
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass("dropdown__field");
		expect(input).toHaveAttribute("readOnly");
	});

	it("deve renderizar como desabilitado", () => {
		render(<Dropdown disabled />);

		const dropdown = screen.getByRole("textbox", { hidden: true });
		expect(dropdown.closest(".dropdown__root")).toHaveClass("--disabled");
	});

	it("deve renderizar com mensagem de erro", () => {
		const errorMessage = "Este campo é obrigatório";
		render(<Dropdown errorMessage={errorMessage} />);

		const error = screen.getByText(errorMessage);
		expect(error).toBeInTheDocument();
		expect(error).toHaveClass("dropdown__error-message");
		expect(error.closest(".dropdown__root")).toHaveClass("--error");
	});

	it("deve renderizar com texto de ajuda", () => {
		const helperText = "Selecione uma das opções disponíveis";
		render(<Dropdown helperText={helperText} />);

		const helper = screen.getByText(helperText);
		expect(helper).toBeInTheDocument();
		expect(helper).toHaveClass("dropdown__helper-text");
	});

	it("deve priorizar mensagem de erro sobre texto de ajuda", () => {
		const helperText = "Selecione uma das opções disponíveis";
		const errorMessage = "Este campo é obrigatório";

		render(<Dropdown helperText={helperText} errorMessage={errorMessage} />);

		const error = screen.getByText(errorMessage);
		expect(error).toBeInTheDocument();

		const helper = screen.queryByText(helperText);
		expect(helper).not.toBeInTheDocument();
	});

	it("deve renderizar com loader quando isLoading=true", () => {
		render(<Dropdown isLoading />);

		const loader = screen.getByTestId("loader");
		expect(loader).toBeInTheDocument();

		const arrow = screen.queryByTestId("arrow-svg");
		expect(arrow).not.toBeInTheDocument();
	});

	it("deve renderizar com arrow quando isLoading=false", () => {
		render(<Dropdown />);

		const arrow = screen.getByTestId("arrow-svg");
		expect(arrow).toBeInTheDocument();

		const loader = screen.queryByTestId("loader");
		expect(loader).not.toBeInTheDocument();
	});

	it("deve abrir a lista de opções ao clicar no trigger", () => {
		render(<Dropdown options={mockOptions} />);

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

		const trigger = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__trigger");
		fireEvent.click(trigger!);

		const listbox = screen.getByRole("listbox");
		expect(listbox).toBeInTheDocument();
		expect(listbox).toHaveClass("dropdown__list");
		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(3);
		expect(options[0]).toHaveTextContent("Opção 1");
		expect(options[1]).toHaveTextContent("Opção 2");
		expect(options[2]).toHaveTextContent("Opção 3");
	});

	it("deve fechar a lista ao selecionar uma opção", () => {
		const handleChange = jest.fn();
		render(<Dropdown options={mockOptions} onChange={handleChange} />);

		// Abre a lista
		const trigger = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__trigger");
		fireEvent.click(trigger!);

		const option = screen.getByText("Opção 2");
		fireEvent.click(option);

		expect(handleChange).toHaveBeenCalledWith("option2");

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("deve marcar a opção selecionada com aria-selected", () => {
		render(<Dropdown options={mockOptions} value="option2" />);

		const trigger = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__trigger");
		fireEvent.click(trigger!);

		const options = screen.getAllByRole("option");
		expect(options[0]).toHaveAttribute("aria-selected", "false");
		expect(options[1]).toHaveAttribute("aria-selected", "true");
		expect(options[2]).toHaveAttribute("aria-selected", "false");
	});

	it("não deve abrir o dropdown quando desabilitado", () => {
		render(<Dropdown options={mockOptions} disabled />);

		const trigger = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__trigger");
		fireEvent.click(trigger!);

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("deve aplicar classes de variante corretamente", () => {
		render(<Dropdown variant="outlined" />);

		const dropdown = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__root");
		expect(dropdown).toHaveClass("--outlined");
		expect(dropdown).not.toHaveClass("--default");
	});

	it("deve aplicar classes de largura corretamente", () => {
		render(<Dropdown width="fluid" />);

		const dropdown = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__root");
		expect(dropdown).toHaveClass("--fluid");
		expect(dropdown).not.toHaveClass("--contain");
	});

	it("deve aplicar classe personalizada", () => {
		render(<Dropdown className="custom-class" />);

		const dropdown = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__root");
		expect(dropdown).toHaveClass("custom-class");
	});

	it("deve aplicar classe --filled quando tem valor", () => {
		render(<Dropdown value="option1" />);

		const dropdown = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__root");
		expect(dropdown).toHaveClass("--filled");
	});

	it("deve aplicar classe --readonly quando readOnly=true", () => {
		render(<Dropdown readOnly />);

		const input = screen.getByRole("textbox", { hidden: true });
		expect(input).toHaveClass("--readonly");
	});

	it("deve permitir selecionar opção usando teclado", () => {
		const handleChange = jest.fn();
		render(<Dropdown options={mockOptions} onChange={handleChange} />);

		const trigger = screen
			.getByRole("textbox", { hidden: true })
			.closest(".dropdown__trigger");
		fireEvent.click(trigger!);

		const option = screen.getByText("Opção 3");
		fireEvent.keyDown(option, { key: "Enter" });

		expect(handleChange).toHaveBeenCalledWith("option3");

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});
});
