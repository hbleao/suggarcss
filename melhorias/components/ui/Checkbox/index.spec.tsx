// __tests__/Checkbox.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
	const defaultProps = {
		name: "test-checkbox",
		label: "Test Label",
		onChange: jest.fn(),
	};

	it("should render correctly", () => {
		render(<Checkbox {...defaultProps} />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	it("should trigger onChange when clicked", () => {
		render(<Checkbox {...defaultProps} />);

		fireEvent.click(screen.getByRole("checkbox"));

		expect(defaultProps.onChange).toHaveBeenCalledWith(true);
	});

	it("should not trigger onChange when disabled", () => {
		render(<Checkbox {...defaultProps} disabled />);

		fireEvent.click(screen.getByRole("checkbox"));

		expect(defaultProps.onChange).not.toHaveBeenCalled();
	});

	it("should call onChange with false if checked initially", () => {
		render(<Checkbox {...defaultProps} checked />);

		fireEvent.click(screen.getByRole("checkbox"));

		expect(defaultProps.onChange).toHaveBeenCalledWith(false);
	});

	it("should apply correct classes based on props", () => {
		render(<Checkbox {...defaultProps} checked disabled variant="default" />);

		const checkbox = screen.getByRole("checkbox");

		expect(checkbox.className).toContain("--checked");
		expect(checkbox.className).toContain("--disabled");
		expect(checkbox.className).toContain("--default");
	});

	it("should handle keyboard events (Enter and Space)", () => {
		render(<Checkbox {...defaultProps} />);

		fireEvent.keyDown(screen.getByRole("checkbox"), { key: "Enter" });
		expect(defaultProps.onChange).toHaveBeenCalledWith(true);

		fireEvent.keyDown(screen.getByRole("checkbox"), { key: " " });
		expect(defaultProps.onChange).toHaveBeenCalledWith(true);
	});

	it("should not toggle if disabled on keyboard", () => {
		render(<Checkbox {...defaultProps} disabled />);

		fireEvent.keyDown(screen.getByRole("checkbox"), { key: "Enter" });
		expect(defaultProps.onChange).not.toHaveBeenCalled();
	});

	it("should manage focus state", () => {
		render(<Checkbox {...defaultProps} />);

		const checkbox = screen.getByRole("checkbox");

		fireEvent.focus(checkbox);
		expect(checkbox.className).toContain("--focused");

		fireEvent.blur(checkbox);
		expect(checkbox.className).not.toContain("--focused");
	});
});
