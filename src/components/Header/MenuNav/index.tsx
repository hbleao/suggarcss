import Image from "next/image";

import IcLogoPorto from "../icons/ic-logo-porto.svg";

import { Column, Grid, Link, ShowOnDevice } from "@/components";
import * as Header from "../components";

export type MenuNavProps = {
	menuLinks: { url: string; label: string }[];
	loginButton?: { url: string; label: string };
};

export const MenuNav = ({ menuLinks, loginButton }: MenuNavProps) => {
	return (
		<Grid>
			<Column>
				<Header.MenuNav>
					<Header.MenuLinks>
						<ShowOnDevice orientation="greaterThan" media="tabletLandscape">
							<Image src={IcLogoPorto} alt="" width={87} height={20} />
						</ShowOnDevice>

						{menuLinks.map((link) => (
							<Header.MenuLink key={`${link.label}`}>
								<Header.MenuLinkItem
									href={link.url}
									data-gtm-type="click"
									data-gtm-clicktype="header"
									data-gtm-name={link.label}
								>
									{link.label}
								</Header.MenuLinkItem>
							</Header.MenuLink>
						))}

						{loginButton && (
							<Link
								style={{ marginLeft: "auto" }}
								width="contain"
								styles="secondary"
								size="small"
								href={loginButton.url}
							>
								{loginButton.label}
							</Link>
						)}
					</Header.MenuLinks>
				</Header.MenuNav>
			</Column>
		</Grid>
	);
};
