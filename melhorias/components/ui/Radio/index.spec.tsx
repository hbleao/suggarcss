import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from "./Radio";

describe("Radio Component", () => {
	it("should render correctly with default props", () => {
		render(<Radio description="Option A" />);

		const radioElement = screen.getByRole("radio");

		expect(radioElement).toBeInTheDocument();
		expect(radioElement).toHaveAttribute("aria-checked", "false");
		expect(screen.getByText("Option A")).toBeInTheDocument();
	});

	it("should be checked when checked prop is true", () => {
		render(<Radio description="Option B" checked />);

		const radioElement = screen.getByRole("radio");

		expect(radioElement).toHaveAttribute("aria-checked", "true");
		expect(radioElement.className).toContain("--checked");
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Radio description="Option C" disabled />);

		const radioElement = screen.getByRole("radio");

		expect(radioElement).toHaveAttribute("aria-disabled", "true");
		expect(radioElement).toHaveAttribute("tabIndex", "-1");
		expect(radioElement.className).toContain("--disabled");
	});

	it("should call onChange when clicked if not disabled", () => {
		const onChangeMock = jest.fn();
		render(<Radio description="Option D" onChange={onChangeMock} />);

		const radioElement = screen.getByRole("radio");
		fireEvent.click(radioElement);

		expect(onChangeMock).toHaveBeenCalledWith(true);
	});

	it("should NOT call onChange if disabled", () => {
		const onChangeMock = jest.fn();
		render(<Radio description="Option E" disabled onChange={onChangeMock} />);

		const radioElement = screen.getByRole("radio");
		fireEvent.click(radioElement);

		expect(onChangeMock).not.toHaveBeenCalled();
	});

	it("should toggle when pressing Enter or Space", () => {
		const onChangeMock = jest.fn();
		render(<Radio description="Option F" onChange={onChangeMock} />);

		const radioElement = screen.getByRole("radio");

		fireEvent.keyDown(radioElement, { key: "Enter" });
		expect(onChangeMock).toHaveBeenCalledTimes(1);

		fireEvent.keyDown(radioElement, { key: " " });
		expect(onChangeMock).toHaveBeenCalledTimes(2);
	});
});
