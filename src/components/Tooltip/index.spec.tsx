import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip } from "./index";

describe("<Tooltip />", () => {
	it("renderiza o trigger e o conteúdo corretamente", () => {
		render(
			<Tooltip content="Dica visível">
				<button type="button">Trigger</button>
			</Tooltip>,
		);

		expect(screen.getByText("Trigger")).toBeInTheDocument();
		expect(screen.getByText("Dica visível")).toBeInTheDocument();
	});

	it("exibe o tooltip ao passar o mouse (modo não controlado)", () => {
		const { container } = render(
			<Tooltip content="Tooltip visível">
				<button type="button">Hover me</button>
			</Tooltip>,
		);

		const trigger = screen.getByText("Hover me").closest(".tooltip__trigger");
		const content = container.querySelector(".tooltip__content");

		expect(content).not.toHaveClass("--visible");

		fireEvent.mouseEnter(trigger!);
		expect(content).toHaveClass("--visible");

		fireEvent.mouseLeave(trigger!);
		expect(content).not.toHaveClass("--visible");
	});

	it("usa a posição correta especificada", () => {
		const { container } = render(
			<Tooltip content="Posicionado" position="left">
				<button type="button">Check</button>
			</Tooltip>,
		);

		expect(container.querySelector(".tooltip__content")).toHaveClass("--left");
	});

	it("usa posição padrão top se nenhuma for passada", () => {
		const { container } = render(
			<Tooltip content="Padrao">
				<button type="button">Check</button>
			</Tooltip>,
		);

		expect(container.querySelector(".tooltip__content")).toHaveClass("--top");
	});

	it("chama onOpen quando o mouse entra", () => {
		const onOpen = jest.fn();

		render(
			<Tooltip content="Tooltip" onOpen={onOpen}>
				<button type="button">Hover</button>
			</Tooltip>,
		);

		const trigger = screen.getByText("Hover").closest(".tooltip__trigger");

		fireEvent.mouseEnter(trigger!);
		expect(onOpen).toHaveBeenCalledTimes(1);
	});

	it("chama onClose quando o mouse sai", () => {
		const onClose = jest.fn();

		render(
			<Tooltip content="Tooltip" onClose={onClose}>
				<button type="button">Hover</button>
			</Tooltip>,
		);

		const trigger = screen.getByText("Hover").closest(".tooltip__trigger");

		fireEvent.mouseEnter(trigger!);
		fireEvent.mouseLeave(trigger!);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("respeita estado controlado via isOpen", () => {
		const { container, rerender } = render(
			<Tooltip content="Controlado" isOpen>
				<button type="button">Click</button>
			</Tooltip>,
		);

		const content = container.querySelector(".tooltip__content");
		expect(content).toHaveClass("--visible");

		rerender(
			<Tooltip content="Controlado" isOpen={false}>
				<button type="button">Click</button>
			</Tooltip>,
		);
		expect(content).not.toHaveClass("--visible");
	});
});
