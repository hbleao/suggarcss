import "./styles.scss";

import type { HeaderProps } from "./types";

export const Header = ({ className = "", children }: HeaderProps) => {
	return <div className="modal__header">{children}</div>;
};
