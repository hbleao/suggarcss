import type { ReactNode, HTMLAttributes } from "react";

export type Media =
	| "mobile"
	| "tabletPortrait"
	| "tabletLandscape"
	| "desktop"
	| "wide";

export type ShowOnDeviceProps = HTMLAttributes<HTMLDivElement> & {
	orientation: "greaterThan" | "lessThan";
	media: Media;
	children: ReactNode;
};
