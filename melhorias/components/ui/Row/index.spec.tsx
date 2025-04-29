import { render, screen } from "@testing-library/react";
import { Row } from "./Row";

describe("Row Component", () => {
	it("should render correctly with default props", () => {
		render(<Row>Row Content</Row>);

		const rowElement = screen.getByText("Row Content");

		expect(rowElement).toBeInTheDocument();
		expect(rowElement.className).toContain("row");
		expect(rowElement.className).toContain("startMobile-1");
		expect(rowElement.className).toContain("endMobile-9");
		expect(rowElement.className).toContain("startPortrait-1");
		expect(rowElement.className).toContain("endPortrait-9");
		expect(rowElement.className).toContain("startLandscape-1");
		expect(rowElement.className).toContain("endLandscape-13");
		expect(rowElement.className).toContain("startDesktop-1");
		expect(rowElement.className).toContain("endDesktop-13");
		expect(rowElement.className).toContain("startWide-1");
		expect(rowElement.className).toContain("endWide-13");
	});

	it("should apply custom grid positions", () => {
		render(
			<Row
				mobile={[2, 8]}
				portrait={[3, 7]}
				landscape={[4, 10]}
				desktop={[5, 11]}
				wide={[6, 12]}
			>
				Custom Row
			</Row>,
		);

		const rowElement = screen.getByText("Custom Row");

		expect(rowElement.className).toContain("startMobile-2");
		expect(rowElement.className).toContain("endMobile-8");
		expect(rowElement.className).toContain("startPortrait-3");
		expect(rowElement.className).toContain("endPortrait-7");
		expect(rowElement.className).toContain("startLandscape-4");
		expect(rowElement.className).toContain("endLandscape-10");
		expect(rowElement.className).toContain("startDesktop-5");
		expect(rowElement.className).toContain("endDesktop-11");
		expect(rowElement.className).toContain("startWide-6");
		expect(rowElement.className).toContain("endWide-12");
	});

	it("should accept and append extra className", () => {
		render(<Row className="custom-class">Row with Class</Row>);

		const rowElement = screen.getByText("Row with Class");

		expect(rowElement.className).toContain("custom-class");
	});
});
