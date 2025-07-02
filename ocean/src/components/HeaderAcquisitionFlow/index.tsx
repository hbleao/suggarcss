"use client";
import { clsx } from "@/utils/clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./styles.scss";

import ArrowLeftSVG from "./icons/ic-arrow-left.svg";
import LogoPortoSVG from "./icons/ic-logo-porto.svg";
import CartSVG from "./icons/ic-shopping-cart.svg";

export type HeaderProps = {
	goBackLink?: string;
	hasShoppingCart?: boolean;
	hasGoBackLink?: boolean;
};

export const HeaderAcquisitionFlow = ({
	goBackLink = "",
	hasGoBackLink = true,
	hasShoppingCart = true,
}: HeaderProps) => {
	const router = useRouter();

	return (
		<div className="header-acquisition-flow">
			{hasGoBackLink && (
				<Image
					src={ArrowLeftSVG}
					height={24}
					width={24}
					className={clsx(
						"header-acquisition-flow__button",
						"header-acquisition-flow__item-left",
					)}
					alt=""
					onClick={() => router.push(goBackLink)}
				/>
			)}

			<Image
				className={clsx(
					"header-acquisition-flow__button",
					"header-acquisition-flow__item-center",
				)}
				src={LogoPortoSVG}
				height={28}
				width={120}
				alt="Logo da porto"
				onClick={() => router.push("/")}
			/>

			{hasShoppingCart && (
				<Image
					src={CartSVG}
					height={24}
					width={24}
					className={clsx(
						"header-acquisition-flow__button",
						"header-acquisition-flow__item-right",
					)}
					alt=""
					onClick={() => router.push(goBackLink)}
				/>
			)}
		</div>
	);
};
