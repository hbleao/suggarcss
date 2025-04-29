import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion Component", () => {
	it("should render the accordion with title", () => {
		render(<Accordion title="Accordion Title">Content</Accordion>);
		expect(screen.getByText("Accordion Title")).toBeInTheDocument();
	});

	it("should not show the content by default", () => {
		render(<Accordion title="Accordion Title">Hidden Content</Accordion>);
		const content = screen.getByText("Hidden Content");
		expect(content.parentElement).toHaveStyle("height: 0px");
	});

	it("should open the accordion when clicked", () => {
		render(<Accordion title="Accordion Title">Opened Content</Accordion>);
		const button = screen.getByRole("button");

		fireEvent.click(button);

		const content = screen.getByText("Opened Content");
		expect(content.parentElement).not.toHaveStyle("height: 0px");
	});

	it("should call onToggle callback when toggled", () => {
		const onToggle = jest.fn();
		render(
			<Accordion title="Accordion Title" onToggle={onToggle}>
				Content
			</Accordion>,
		);
		const button = screen.getByRole("button");

		fireEvent.click(button);

		expect(onToggle).toHaveBeenCalledWith(true); // Primeiro clique abre
	});

	it("should respect the defaultOpen prop", () => {
		render(
			<Accordion title="Accordion Title" defaultOpen>
				Initially Opened
			</Accordion>,
		);
		const content = screen.getByText("Initially Opened");
		expect(content.parentElement).not.toHaveStyle("height: 0px");
	});

	it("should add aria-expanded attribute correctly", () => {
		render(<Accordion title="Accordion Title">Content</Accordion>);
		const button = screen.getByRole("button");

		expect(button).toHaveAttribute("aria-expanded", "false");

		fireEvent.click(button);

		expect(button).toHaveAttribute("aria-expanded", "true");
	});
});
