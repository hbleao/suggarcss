import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

const options = [
	{ label: "Option 1", value: "1" },
	{ label: "Option 2", value: "2" },
];

describe("Dropdown", () => {
	it("renders with label and helperText", () => {
		render(
			<Dropdown
				name="test"
				label="Test Label"
				helperText="Helpful message"
				options={options}
				value=""
			/>,
		);

		expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
		expect(screen.getByText("Helpful message")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(
			<Dropdown
				name="test"
				label="Test Label"
				errorMessage="Something went wrong"
				options={options}
				value=""
			/>,
		);
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});

	it("toggles dropdown on click", () => {
		render(<Dropdown name="test" options={options} value="" />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});

	it("selects an option", () => {
		const handleChange = jest.fn();
		render(
			<Dropdown
				name="test"
				options={options}
				value=""
				onChange={handleChange}
			/>,
		);
		fireEvent.click(screen.getByRole("button"));
		fireEvent.click(screen.getByText("Option 2"));
		expect(handleChange).toHaveBeenCalledWith("2");
	});

	it("does not open when disabled", () => {
		render(<Dropdown name="test" disabled options={options} value="" />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("does not toggle if readonly", () => {
		render(<Dropdown name="test" readOnly options={options} value="" />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("supports keyboard toggle", () => {
		render(<Dropdown name="test" options={options} value="" />);
		const trigger = screen.getByRole("button");
		fireEvent.keyDown(trigger, { key: "Enter" });
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});
});
