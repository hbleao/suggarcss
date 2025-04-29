import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";
import { act } from "react-dom/test-utils";

describe("ProgressBar Component", () => {
	beforeEach(() => {
		jest.useFakeTimers(); // Ativa fake timers
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers(); // Reseta timers depois dos testes
	});

	it("should render correctly with default props", () => {
		render(<ProgressBar value={50} />);
		const progressBar = screen.getByRole("progressbar", { hidden: true });
		expect(progressBar).toBeInTheDocument();
	});

	it("should start at initialValue", () => {
		render(<ProgressBar value={80} initialValue={20} />);
		const fill = screen.getByTestId("progress-bar-fill");

		expect(fill).toHaveStyle("width: 20%");
	});

	it("should update width after delay", () => {
		render(<ProgressBar value={70} initialValue={10} />);
		const fill = screen.getByTestId("progress-bar-fill");

		// Antes do timeout
		expect(fill).toHaveStyle("width: 10%");

		// Simula passar do tempo
		act(() => {
			jest.advanceTimersByTime(20);
		});

		expect(fill).toHaveStyle("width: 70%");
	});

	it("should apply custom color if provided", () => {
		render(<ProgressBar value={60} color="#ff0000" />);
		const fill = screen.getByTestId("progress-bar-fill");

		act(() => {
			jest.advanceTimersByTime(20);
		});

		expect(fill).toHaveStyle("background-color: #ff0000");
	});
});
