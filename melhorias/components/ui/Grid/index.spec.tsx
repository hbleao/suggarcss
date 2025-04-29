// __tests__/Grid.test.tsx
import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";
import React from "react";

describe("Grid", () => {
	it("renders children correctly", () => {
		render(
			<Grid data-testid="grid">
				<div>Child 1</div>
				<div>Child 2</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass("grid");
		expect(grid.childElementCount).toBe(2);
		expect(grid).toHaveTextContent("Child 1");
		expect(grid).toHaveTextContent("Child 2");
	});

	it("applies custom className", () => {
		render(<Grid className="custom-class">Test</Grid>);
		expect(screen.getByText("Test")).toHaveClass("grid custom-class");
	});

	it("forwards additional props", () => {
		render(
			<Grid data-testid="grid-test" aria-label="test-label">
				Child
			</Grid>,
		);
		const grid = screen.getByTestId("grid-test");
		expect(grid).toHaveAttribute("aria-label", "test-label");
	});
});
