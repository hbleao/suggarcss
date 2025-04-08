import type { LabelProps } from "./types";

export const Label = ({ children }: LabelProps) => {
	return <p className="radio__label">{children}</p>;
};
