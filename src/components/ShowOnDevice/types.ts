import type { ReactNode } from "react";

export type Media =
	| "mobile"
	| "tabletPortrait"
	| "tabletLandscape"
	| "desktop"
	| "wide";

export type ShowOnDeviceProps = {
	orientation: "greaterThan" | "lessThan";
	media: Media;
	children: ReactNode;
};
