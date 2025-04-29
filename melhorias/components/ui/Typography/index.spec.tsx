import { render, screen } from "@testing-library/react";
import { Typography } from "./Typography";

describe("Typography Component", () => {
	it("should render the children correctly", () => {
		render(<Typography>Test Text</Typography>);
		expect(screen.getByText("Test Text")).toBeInTheDocument();
	});

	it("should render with the correct HTML element", () => {
		render(<Typography as="h2">Heading 2</Typography>);
		const element = screen.getByText("Heading 2");
		expect(element.tagName.toLowerCase()).toBe("h2");
	});

	it("should apply the correct default classes", () => {
		render(<Typography>Default Classes</Typography>);
		const element = screen.getByText("Default Classes");
		expect(element).toHaveClass(
			"typography",
			"--title1",
			"--color-black100",
			"--font-weight-regular",
			"--font-style-normal",
		);
	});

	it("should apply custom variant, color, weight, and fontStyle classes", () => {
		render(
			<Typography
				variant="body1"
				color="redPrimary"
				weight="bold"
				fontStyle="italic"
			>
				Custom Classes
			</Typography>,
		);
		const element = screen.getByText("Custom Classes");
		expect(element).toHaveClass(
			"--body1",
			"--color-redPrimary",
			"--font-weight-bold",
			"--font-style-italic",
		);
	});

	it("should merge additional className", () => {
		render(<Typography className="custom-class">Custom Class Name</Typography>);
		const element = screen.getByText("Custom Class Name");
		expect(element).toHaveClass("custom-class");
	});
});
