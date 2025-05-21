import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./index";

// Mock para os estilos do módulo SCSS
jest.mock("./styles.module.scss", () => ({
	progressBar: "progress-bar-class",
	progressBarFill: "progress-bar-fill-class",
}));

describe("ProgressBar", () => {
	it("deve renderizar corretamente com valores padrão", () => {
		render(<ProgressBar value={50} data-testid="progress-bar" />);

		const progressBar = screen.getByTestId("progress-bar");
		const progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("role", "progressbar");
		expect(progressBar).toHaveAttribute("aria-valuenow", "50");
		expect(progressBar).toHaveAttribute("aria-valuemin", "0");
		expect(progressBar).toHaveAttribute("aria-valuemax", "100");
		expect(progressBar).toHaveAttribute("aria-valuetext", "50%");
		expect(progressBar).toHaveAttribute("aria-label", "Progresso");
		expect(progressBar).toHaveAttribute("tabindex", "0");

		expect(progressBarFill).toHaveStyle({
			width: "50%",
			backgroundColor: "#0046c0",
		});
	});

	it("deve renderizar com valor inicial personalizado", () => {
		render(
			<ProgressBar initialValue={20} value={80} data-testid="progress-bar" />,
		);

		const progressBar = screen.getByTestId("progress-bar");
		const progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("aria-valuenow", "80");
		expect(progressBarFill).toHaveStyle({
			width: "80%",
			backgroundColor: "#0046c0",
		});
	});

	it("deve renderizar com cor personalizada", () => {
		render(
			<ProgressBar value={50} color="#FF0000" data-testid="progress-bar" />,
		);

		const progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBarFill).toHaveStyle({
			width: "50%",
			backgroundColor: "#FF0000",
		});
	});

	it("deve normalizar valores fora do intervalo 0-100", () => {
		const { rerender } = render(
			<ProgressBar value={120} data-testid="progress-bar" />,
		);

		let progressBar = screen.getByTestId("progress-bar");
		let progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("aria-valuenow", "100");
		expect(progressBarFill).toHaveStyle({
			width: "100%",
			backgroundColor: "#0046c0",
		});

		rerender(<ProgressBar value={-20} data-testid="progress-bar" />);

		progressBar = screen.getByTestId("progress-bar");
		progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("aria-valuenow", "0");
		expect(progressBarFill).toHaveStyle({
			width: "0%",
			backgroundColor: "#0046c0",
		});
	});

	it("deve aceitar classes e estilos personalizados", () => {
		render(
			<ProgressBar
				value={50}
				className="custom-class"
				style={{ margin: "10px" }}
				data-testid="progress-bar"
			/>,
		);

		const progressBar = screen.getByTestId("progress-bar");
		expect(progressBar).toHaveClass("custom-class");
		expect(progressBar).toHaveStyle({ margin: "10px" });
	});

	it("deve atualizar o valor quando a prop value muda", () => {
		const { rerender } = render(
			<ProgressBar value={30} data-testid="progress-bar" />,
		);

		let progressBar = screen.getByTestId("progress-bar");
		let progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("aria-valuenow", "30");
		expect(progressBarFill).toHaveStyle({
			width: "30%",
			backgroundColor: "#0046c0",
		});

		rerender(<ProgressBar value={70} data-testid="progress-bar" />);

		progressBar = screen.getByTestId("progress-bar");
		progressBarFill = screen.getByTestId("progress-bar-fill");

		expect(progressBar).toHaveAttribute("aria-valuenow", "70");
		expect(progressBarFill).toHaveStyle({
			width: "70%",
			backgroundColor: "#0046c0",
		});
	});

	it("deve permitir a personalização do data-testid", () => {
		render(<ProgressBar value={50} data-testid="custom-test-id" />);

		expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
		expect(screen.getByTestId("custom-test-id-fill")).toBeInTheDocument();
	});
});
