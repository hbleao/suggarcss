type Breakpoints = "tabletPortrait" | "tabletLandscape" | "desktop" | "wide";

interface ColumnProps {
	children: React.ReactNode;
	span?: number;
	tabletPortrait?: number;
	tabletLandscape?: number;
	desktop?: number;
	wide?: number;
	className?: string;
}
