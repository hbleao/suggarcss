'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import s from './styles.module.scss';

import ArrowLeftSVG from '@/assets/icons/ic-arrow-left.svg';
import ShoppingCartSVG from '@/assets/icons/ic-shopping-cart.svg';
import LogoPortoSVG from '../../assets/icons/ic-logo-porto.svg';
import { Button } from '../ui/Button';

export type HeaderProps = {
	goBackLink: string;
};

export const Header = ({ goBackLink }: HeaderProps) => {
	const router = useRouter();

	return (
		<div className={s.container}>
			<Button title="voltar" variant="negative" styles="ghost">
				<Image
					src={ArrowLeftSVG}
					height={24}
					width={24}
					className={s.button}
					alt=""
					onClick={() => router.push(goBackLink)}
				/>
			</Button>

			<Image
				className={s.button}
				src={LogoPortoSVG}
				height={24}
				width={100}
				alt="Logo da porto"
				onClick={() => router.push('/')}
			/>
			<Button title="carrinho" variant="negative" styles="ghost">
				<Image
					className={s.button}
					src={ShoppingCartSVG}
					height={24}
					width={24}
					alt=""
				/>
			</Button>
		</div>
	);
};
