import "./styles.scss";

import type { ShowOnDeviceProps } from "./types";

export const ShowOnDevice = ({
	orientation,
	media,
	children,
}: ShowOnDeviceProps) => {
	const orientationClass =
		orientation === "greaterThan" ? "greaterThan" : "lessThan";

	return (
		<div className={`show-on-device ${orientationClass} ${media}`}>
			{children}
		</div>
	);
};
