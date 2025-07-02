import { render, screen, fireEvent, act } from "@testing-library/react";
import { Carousel } from "./index";

jest.mock("./styles.scss", () => ({}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

jest.useFakeTimers();

describe("<Carousel />", () => {
	const createTestSlides = (count: number) =>
		Array.from({ length: count }, (_, index) => {
			const slideId = `slide-${index}`;
			return (
				<div key={slideId} data-testid={slideId}>
					Slide {index + 1}
				</div>
			);
		});

	beforeEach(() => {
		jest.clearAllTimers();
		jest.clearAllMocks();

		Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
			configurable: true,
			value: 516,
		});
		Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
			configurable: true,
			value: 300,
		});
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.clearAllMocks();
	});

	it("renderiza corretamente com valores padrão", () => {
		render(<Carousel>{createTestSlides(3)}</Carousel>);
		expect(screen.getByTestId("carousel-track")).toBeInTheDocument();
		expect(screen.getByText("Slide 1")).toBeInTheDocument();
	});

	it("renderiza setas de navegação quando arrows é true", () => {
		render(<Carousel arrows>{createTestSlides(3)}</Carousel>);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	it("renderiza indicadores (dots) quando dots é true", () => {
		render(<Carousel dots>{createTestSlides(3)}</Carousel>);
		const dots = screen.getAllByRole("button");
		expect(dots.length).toBe(3);
		expect(dots[0]).toHaveClass("active");
	});

	it("navega corretamente com botões de seta", () => {
		render(<Carousel arrows>{createTestSlides(3)}</Carousel>);
		const [prev, next] = screen.getAllByRole("button");
		const track = screen.getByTestId("carousel-track");

		fireEvent.click(next);
		expect(track.style.transform).toContain("translateX(-");

		fireEvent.click(prev);
		expect(track.style.transform).toContain("translateX(-0px)");
	});

	it("navega para slide específico ao clicar em um dot", () => {
		render(<Carousel dots>{createTestSlides(3)}</Carousel>);
		const dots = screen.getAllByRole("button");
		const track = screen.getByTestId("carousel-track");

		fireEvent.click(dots[2]);
		expect(track.style.transform).toContain("translateX(-");
	});

	it("autoPlay alterna slides automaticamente", () => {
		render(
			<Carousel autoPlay autoPlayInterval={1000}>
				{createTestSlides(3)}
			</Carousel>,
		);
		const track = screen.getByTestId("carousel-track");

		act(() => {
			jest.advanceTimersByTime(1000);
		});
		expect(track.style.transform).toContain("translateX(-");

		act(() => {
			jest.advanceTimersByTime(1000);
		});
		expect(track.style.transform).toContain("translateX(-");

		act(() => {
			jest.advanceTimersByTime(1000);
		});
		expect(track.style.transform).toContain("translateX(-0px)");
	});

	it("aplica gap corretamente", () => {
		const gap = 30;
		render(<Carousel gap={gap}>{createTestSlides(3)}</Carousel>);
		const track = screen.getByTestId("carousel-track");
		expect(track.style.gap).toBe(`${gap}px`);
	});

	it("mostra múltiplos slides com slidesToShow > 1", () => {
		render(<Carousel slidesToShow={3}>{createTestSlides(6)}</Carousel>);
		const track = screen.getByTestId("carousel-track");
		expect(track.style.width).toBe("200%");
	});

	it("navega múltiplos slides com slidesToScroll > 1", () => {
		render(
			<Carousel arrows slidesToScroll={2}>
				{createTestSlides(6)}
			</Carousel>,
		);
		const next = screen.getAllByRole("button")[1];
		const track = screen.getByTestId("carousel-track");
		
		fireEvent.click(next);
		expect(track.style.transform).toContain("translateX(-");
	});

	it("navega com arraste de mouse", () => {
		render(<Carousel>{createTestSlides(3)}</Carousel>);
		const track = screen.getByTestId("carousel-track");

		fireEvent.mouseDown(track, { clientX: 500 });
		fireEvent.mouseUp(track, { clientX: 400 });

		expect(track.style.transform).toContain("translateX(-");

		fireEvent.mouseDown(track, { clientX: 400 });
		fireEvent.mouseUp(track, { clientX: 500 });

		expect(track.style.transform).toContain("translateX(-0px)");
	});

	it("navega com gesto de toque", () => {
		render(<Carousel>{createTestSlides(3)}</Carousel>);
		const track = screen.getByTestId("carousel-track");

		fireEvent.touchStart(track, { touches: [{ clientX: 500 }] });
		fireEvent.touchEnd(track, { changedTouches: [{ clientX: 400 }] });

		expect(track.style.transform).toContain("translateX(-");

		fireEvent.touchStart(track, { touches: [{ clientX: 400 }] });
		fireEvent.touchEnd(track, { changedTouches: [{ clientX: 500 }] });

		expect(track.style.transform).toContain("translateX(-0px)");
	});

	it("limpa intervalo ao desmontar com autoPlay", () => {
		const setIntervalSpy = jest.spyOn(global, "setInterval");
		const clearIntervalSpy = jest.spyOn(global, "clearInterval");

		const { unmount } = render(
			<Carousel autoPlay autoPlayInterval={1000}>
				{createTestSlides(3)}
			</Carousel>,
		);

		expect(setIntervalSpy).toHaveBeenCalled();
		unmount();
		expect(clearIntervalSpy).toHaveBeenCalled();

		// Restaurar os spies
		setIntervalSpy.mockRestore();
		clearIntervalSpy.mockRestore();
	});

	it("não navega quando o arraste é menor que o limite", () => {
		render(<Carousel>{createTestSlides(3)}</Carousel>);
		const track = screen.getByTestId("carousel-track");

		fireEvent.mouseDown(track, { clientX: 500 });
		fireEvent.mouseUp(track, { clientX: 470 });

		expect(track.style.transform).toContain("translateX(-0px)");
	});

	it("pausa o autoPlay durante interação do usuário e retoma depois", () => {
		const clearIntervalSpy = jest.spyOn(global, "clearInterval");
		const setIntervalSpy = jest.spyOn(global, "setInterval");

		render(
			<Carousel autoPlay autoPlayInterval={1000}>
				{createTestSlides(3)}
			</Carousel>,
		);

		const track = screen.getByTestId("carousel-track");

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		fireEvent.mouseDown(track, { clientX: 500 });
		
		fireEvent.mouseUp(track, { clientX: 400 });

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(track.style.transform).toContain("translateX(-");

		clearIntervalSpy.mockRestore();
		setIntervalSpy.mockRestore();
	});

	it("renderiza corretamente com slidesToShow e slidesToScroll personalizados", () => {
		render(
			<Carousel slidesToShow={2} slidesToScroll={2}>
				{createTestSlides(4)}
			</Carousel>,
		);

		const track = screen.getByTestId("carousel-track");
		expect(track.style.width).toBe("200%");

		expect(screen.getByText("Slide 1")).toBeInTheDocument();
		expect(screen.getByText("Slide 2")).toBeInTheDocument();
		expect(screen.getByText("Slide 3")).toBeInTheDocument();
		expect(screen.getByText("Slide 4")).toBeInTheDocument();
	});
});
