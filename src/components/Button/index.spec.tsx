import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
	it("should render the button with text", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Click me");
	});

	it("should render loader when isLoading is true", () => {
		render(<Button isLoading>Loading</Button>);
		expect(
			screen.getByRole("button").querySelector(".btn__loader"),
		).toBeInTheDocument();
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("should apply the correct variant and style classes", () => {
		render(
			<Button variant="banking" styles="secondary">
				Bank Secondary
			</Button>,
		);
		const button = screen.getByRole("button");
		expect(button.className).toMatch(/--banking-secondary/);
	});

	it("should apply size and width classes", () => {
		render(
			<Button size="small" width="fluid">
				Sized
			</Button>,
		);
		const button = screen.getByRole("button");
		expect(button.className).toMatch(/--small/);
		expect(button.className).toMatch(/--fluid/);
	});

	it("should call onClick when clicked", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should not call onClick when disabled", () => {
		const handleClick = jest.fn();
		render(
			<Button onClick={handleClick} disabled>
				Can't click
			</Button>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});
});
