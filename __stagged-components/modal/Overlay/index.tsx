import "./styles.scss";

import type { OverlayProps } from "./types";

export const Overlay = ({ className = "", children }: OverlayProps) => {
	return <div className="modal__overlay">{children}</div>;
};
