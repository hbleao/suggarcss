import { Button } from "@/components";

import "./styles.scss";

export const MenuButton = ({ className = "", children, ...restProps }: any) => {
	return (
		<Button
			variant="insurance"
			styles="secondary"
			className="menu__button"
			{...restProps}
		>
			{children}
		</Button>
	);
};
