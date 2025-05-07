import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
	const setup = (props = {}) => {
		const handleCloseModal = jest.fn();
		render(
			<Modal
				title="Test Title"
				subtitle="Test Subtitle"
				isOpen
				handleCloseModal={handleCloseModal}
				{...props}
			>
				<div>Modal Content</div>
			</Modal>,
		);
		return { handleCloseModal };
	};

	it("should not render when isOpen is false", () => {
		const { container } = render(
			<Modal
				title="Test Title"
				subtitle="Test Subtitle"
				isOpen={false}
				handleCloseModal={jest.fn()}
			>
				<div>Hidden Modal</div>
			</Modal>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("should render modal with title, subtitle and children", () => {
		setup();
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
		expect(screen.getByText("Modal Content")).toBeInTheDocument();
	});

	it("should call handleCloseModal when overlay is clicked", () => {
		const { handleCloseModal } = setup();
		fireEvent.click(screen.getByRole("dialog").parentElement!);
		expect(handleCloseModal).toHaveBeenCalled();
	});

	it("should call handleCloseModal when close button is clicked", () => {
		const { handleCloseModal } = setup();
		fireEvent.click(screen.getByRole("button", { name: /fechar modal/i }));
		expect(handleCloseModal).toHaveBeenCalled();
	});

	it("should call handleCloseModal when Escape key is pressed", () => {
		const { handleCloseModal } = setup();
		fireEvent.keyDown(screen.getByRole("dialog"), {
			key: "Escape",
			code: "Escape",
		});
		expect(handleCloseModal).toHaveBeenCalled();
	});

	it("should not call handleCloseModal on other key presses", () => {
		const { handleCloseModal } = setup();
		fireEvent.keyDown(screen.getByRole("dialog"), {
			key: "Enter",
			code: "Enter",
		});
		expect(handleCloseModal).not.toHaveBeenCalled();
	});

	it("should have correct aria attributes", () => {
		setup();
		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveAttribute("aria-modal", "true");
		expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
		expect(dialog).toHaveAttribute("aria-describedby", "modal-subtitle");
	});
});
