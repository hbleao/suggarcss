import { render, screen } from "@testing-library/react";
import { Chip } from "./Chip";

describe("Chip", () => {
	it("should render with default props", () => {
		render(<Chip>Default Chip</Chip>);
		expect(screen.getByText("Default Chip")).toBeInTheDocument();
		expect(screen.getByText("Default Chip").parentElement).toHaveClass(
			"chip --light --default",
		);
	});

	it("should render with dark theme", () => {
		render(<Chip theme="dark">Dark Chip</Chip>);
		expect(screen.getByText("Dark Chip").parentElement).toHaveClass("--dark");
	});

	it("should render with selected variant", () => {
		render(<Chip variant="selected">Selected Chip</Chip>);
		expect(screen.getByText("Selected Chip").parentElement).toHaveClass(
			"--selected",
		);
	});

	it("should combine theme and variant correctly", () => {
		render(
			<Chip theme="dark" variant="selected">
				Combined Chip
			</Chip>,
		);
		const chip = screen.getByText("Combined Chip").parentElement;
		expect(chip).toHaveClass("chip");
		expect(chip).toHaveClass("--dark");
		expect(chip).toHaveClass("--selected");
	});

	it("should apply custom className via HTMLAttributes", () => {
		render(<Chip className="custom-class">With Custom Class</Chip>);
		expect(screen.getByText("With Custom Class").parentElement).toHaveClass(
			"custom-class",
		);
	});
});
