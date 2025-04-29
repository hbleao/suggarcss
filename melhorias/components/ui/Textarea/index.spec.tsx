import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";

describe("Textarea Component", () => {
	it("should render the label if provided", () => {
		render(<Textarea label="Description" name="desc" />);
		expect(screen.getByLabelText("Description")).toBeInTheDocument();
	});

	it("should render the helper text if no errorMessage", () => {
		render(<Textarea helperText="Helper text" />);
		expect(screen.getByText("Helper text")).toBeInTheDocument();
	});

	it("should render the error message if provided", () => {
		render(<Textarea errorMessage="Required field" name="desc" />);
		expect(screen.getByText("Required field")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
	});

	it("should call onChange when typing", () => {
		const handleChange = jest.fn();
		render(<Textarea value="" onChange={handleChange} />);
		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "Hello" },
		});
		expect(handleChange).toHaveBeenCalledWith("Hello");
	});

	it("should display the correct character count", () => {
		render(<Textarea value="Test" maxLength={50} />);
		expect(screen.getByText("4 / 50")).toBeInTheDocument();
	});

	it("should be disabled if disabled prop is passed", () => {
		render(<Textarea disabled value="Cannot edit" />);
		expect(screen.getByRole("textbox")).toBeDisabled();
	});

	it("should apply custom classes correctly", () => {
		render(<Textarea className="custom-class" />);
		expect(screen.getByRole("textbox").parentElement).toHaveClass(
			"custom-class",
		);
	});

	it("should add --focused class on focus", () => {
		render(<Textarea name="desc" />);
		const wrapper = screen.getByRole("textbox").parentElement!;
		expect(wrapper.className).not.toContain("--focused");

		fireEvent.focus(screen.getByRole("textbox"));
		expect(wrapper.className).toContain("--focused");
	});

	it("should remove --focused class on blur", () => {
		render(<Textarea name="desc" />);
		const textarea = screen.getByRole("textbox");
		const wrapper = textarea.parentElement!;

		fireEvent.focus(textarea);
		expect(wrapper.className).toContain("--focused");

		fireEvent.blur(textarea);
		expect(wrapper.className).not.toContain("--focused");
	});

	it("should not add --focused if disabled", () => {
		render(<Textarea disabled name="desc" />);
		const textarea = screen.getByRole("textbox");
		const wrapper = textarea.parentElement!;

		fireEvent.focus(textarea);
		expect(wrapper.className).not.toContain("--focused");
	});

	it("should not add --focused if errorMessage exists", () => {
		render(<Textarea errorMessage="Error" name="desc" />);
		const textarea = screen.getByRole("textbox");
		const wrapper = textarea.parentElement!;

		fireEvent.focus(textarea);
		expect(wrapper.className).not.toContain("--focused");
	});
});
