'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import './styles.scss';

import { Button } from '../Button';
import ArrowLeftSVG from './icons/ic-arrow-left.svg';
import LogoPortoSVG from './icons/ic-logo-porto.svg';
import CartSVG from './icons/ic-shopping-cart.svg';

export type HeaderProps = {
	goBackLink?: string;
	hasShoppingCart?: boolean;
	hasGoBackLink?: boolean;
};

export const HeaderAcquisitionFlow = ({
	goBackLink = '',
	hasGoBackLink = true,
	hasShoppingCart = true,
}: HeaderProps) => {
	const router = useRouter();

	return (
		<div className="header-acquisition-flow">
			{hasGoBackLink && (
				<Button
					title="voltar"
					variant="negative"
					styles="ghost"
					className="header-acquisition-flow__item-left"
				>
					<Image
						src={ArrowLeftSVG}
						height={24}
						width={24}
						className="header-acquisition-flow__button"
						alt="Icone de seta para esquerda"
						onClick={() => router.push(goBackLink)}
					/>
				</Button>
			)}

			<Image
				className="header-acquisition-flow__button header-acquisition-flow__item-center"
				src={LogoPortoSVG}
				height={28}
				width={120}
				alt="Logo da porto"
				onClick={() => router.push('/')}
			/>

			{hasShoppingCart && (
				<Button
					title="voltar"
					variant="negative"
					styles="ghost"
					className="header-acquisition-flow__item-right"
				>
					<Image
						src={CartSVG}
						height={24}
						width={24}
						className="header-acquisition-flow__button"
						alt="Icone shopping de compras"
						onClick={() => router.push(goBackLink)}
					/>
				</Button>
			)}
		</div>
	);
};
