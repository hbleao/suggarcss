import React from "react";
import { render, screen } from "@testing-library/react";
import { Grid } from "./index";

jest.mock("./styles.module.scss", () => ({
	grid: "grid-class",
}));

jest.mock("@/hooks", () => ({
	useMediaQuery: jest.fn().mockReturnValue(false),
}));

jest.mock("@/utils/clsx", () => ({
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	clsx: (...args: any[]) => args.filter(Boolean).join(" "),
}));

describe("Grid", () => {
	it("should render correctly with default values", () => {
		render(
			<Grid data-testid="grid">
				<div>Item 1</div>
				<div>Item 2</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass("grid-class");

		expect(grid).toHaveStyle({
			gridTemplateColumns: "repeat(12, 1fr)",
			gap: "1rem",
			background: "",
		});
		expect(grid).toHaveTextContent("Item 1");
		expect(grid).toHaveTextContent("Item 2");
	});

	it("should render with custom gap", () => {
		render(
			<Grid gap="2rem" data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveStyle({
			gap: "2rem",
		});
	});

	it("should render with custom background", () => {
		render(
			<Grid background="#f5f5f5" data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveStyle({
			background: "#f5f5f5",
		});
	});

	it("should apply additional CSS classes", () => {
		render(
			<Grid className="custom-class" data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("custom-class");
		expect(grid).toHaveClass("grid-class");
	});

	it("should render with 8 columns in portrait mode", () => {
		const { useMediaQuery } = require("@/hooks");
		useMediaQuery.mockReturnValue(true);

		render(
			<Grid data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveStyle({
			gridTemplateColumns: "repeat(8, 1fr)",
		});

		useMediaQuery.mockReturnValue(false);
	});

	it("should render with 12 columns in landscape mode", () => {
		const { useMediaQuery } = require("@/hooks");
		useMediaQuery.mockReturnValue(false);

		render(
			<Grid data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveStyle({
			gridTemplateColumns: "repeat(12, 1fr)",
		});
	});

	it("should combine multiple custom properties", () => {
		render(
			<Grid
				gap="3rem"
				background="#e0e0e0"
				className="custom-class"
				data-testid="grid"
			>
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("custom-class");
		expect(grid).toHaveStyle({
			gap: "3rem",
			background: "#e0e0e0",
			gridTemplateColumns: "repeat(12, 1fr)",
		});
	});

	it("should render without children", () => {
		render(<Grid data-testid="grid" />);

		const grid = screen.getByTestId("grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toBeEmptyDOMElement();
	});

	it("should render with CSS variables as gap", () => {
		render(
			<Grid gap="var(--spacing-md)" data-testid="grid">
				<div>Item 1</div>
			</Grid>,
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveStyle({
			gap: "var(--spacing-md)",
		});
	});
});
