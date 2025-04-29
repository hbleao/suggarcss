import { render, screen } from "@testing-library/react";
import { Notification } from "./Notification";

describe("Notification Component", () => {
	it("should render the title and description", () => {
		render(
			<Notification
				title="Success!"
				description="Your action was successful."
				variant="success"
			/>,
		);

		expect(screen.getByText("Success!")).toBeInTheDocument();
		expect(screen.getByText("Your action was successful.")).toBeInTheDocument();
	});

	it("should render the icon when provided", () => {
		render(
			<Notification
				title="Information"
				description="Some info"
				variant="information"
				icon={<svg data-testid="test-icon" />}
			/>,
		);

		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
	});

	it("should render the link when provided", () => {
		render(
			<Notification
				title="More info"
				description="Click here"
				variant="attention"
				link={{ label: "Learn more", href: "/learn-more" }}
			/>,
		);

		const link = screen.getByRole("link", { name: "Learn more" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/learn-more");
	});

	it("should apply the correct variant class", () => {
		const { container } = render(
			<Notification
				title="Warning"
				description="Cuidado!"
				variant="attention"
			/>,
		);

		expect(container.firstChild).toHaveClass(
			"notification__root",
			"--attention",
		);
	});

	it("should support additional className", () => {
		const { container } = render(
			<Notification
				title="Extra class"
				description="Extra"
				className="my-custom-class"
			/>,
		);

		expect(container.firstChild).toHaveClass("my-custom-class");
	});
});
