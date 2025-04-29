import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
	const defaultProps = {
		name: "testInput",
		label: "Test Label",
		value: "",
		onChange: jest.fn(),
	};

	it("should render input with label", () => {
		render(<Input {...defaultProps} />);
		expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
	});

	it("should call onChange when typing", () => {
		const onChange = jest.fn();
		render(<Input {...defaultProps} onChange={onChange} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "Hello" } });
		expect(onChange).toHaveBeenCalled();
	});

	it("should apply helper text when no error", () => {
		render(<Input {...defaultProps} helperText="Helpful info" />);
		expect(screen.getByText("Helpful info")).toBeInTheDocument();
	});

	it("should apply error message when errorMessage is set", () => {
		render(<Input {...defaultProps} errorMessage="Erro encontrado" />);
		expect(screen.getByText("Erro encontrado")).toBeInTheDocument();
	});

	it("should render loader when isLoading is true", () => {
		render(<Input {...defaultProps} isLoading />);
		expect(screen.getByRole("status")).toBeInTheDocument(); // utils-loader should have role=status
	});

	it("should apply disabled attribute", () => {
		render(<Input {...defaultProps} disabled />);
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("should apply --filled class if value is present", () => {
		render(<Input {...defaultProps} value="filled" />);
		const container = screen.getByRole("textbox").closest(".input__root");
		expect(container?.className).toMatch(/--filled/);
	});

	it("should apply --focused class on focus", () => {
		render(<Input {...defaultProps} />);
		const input = screen.getByRole("textbox");
		fireEvent.focus(input);
		const container = input.closest(".input__root");
		expect(container?.className).toMatch(/--focused/);
		fireEvent.blur(input);
		expect(container?.className).not.toMatch(/--focused/);
	});
});
