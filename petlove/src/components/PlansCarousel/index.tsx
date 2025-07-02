'use client';
import Image from 'next/image';
import NextLink from 'next/link';

import { Carousel, Link, Typography } from '@/components';

import s from './styles.module.scss';

import CheckSVG from '@/assets/icons/ic-check.svg';

export const plans = [
	{
		title: 'Leve',
		price: {
			monthValue: 'R$ 14,90',
			yearValue: 'R$ 178,80',
		},
		badge: {
			bgColor: '',
			label: '',
		},
		button: {
			label: 'Quero este',
			href: '/loja/petlove/dados-pessoais',
		},
		benefits: [
			{
				title: 'Coberturas',
				list: [
					'Roubo e furto com vestígios',
					'Quebra Acidental',
					'Perda e pagamento de aluguel',
				],
			},
			{
				title: 'Vantagens',
				list: [
					'Sem carência, após a emissão da apólice',
					'Reembolso rápido e em dinheiro',
					'Cobertura internacional',
				],
			},
		],
		coverageFile:
			'https://www.portoseguro.com.br/content/dam/petlove/coberturas-plano-leve.pdf',
	},
	{
		title: 'Tranquilo',
		price: {
			monthValue: 'R$ 39,90',
			yearValue: 'R$ 478,80',
		},
		badge: {
			bgColor: '',
			label: '',
		},
		button: {
			label: 'Quero este',
			href: '/loja/petlove/dados-pessoais',
		},
		benefits: [
			{
				title: 'Coberturas',
				list: [
					'Roubo e furto com vestígios',
					'Quebra Acidental',
					'Perda e pagamento de aluguel',
				],
			},
			{
				title: 'Vantagens',
				list: [
					'Sem carência, após a emissão da apólice',
					'Reembolso rápido e em dinheiro',
					'Cobertura internacional',
				],
			},
		],
		coverageFile:
			'https://www.portoseguro.com.br/content/dam/petlove/coberturas-plano-tranquilo.pdf',
	},
	{
		title: 'Ideal',
		price: {
			monthValue: 'R$ 99,90',
			yearValue: 'R$ 1.198,80',
		},
		badge: {
			bgColor: '#404040',
			label: 'Melhor custo benefício',
		},
		button: {
			label: 'Quero este',
			href: '/loja/petlove/dados-pessoais',
		},
		benefits: [
			{
				title: 'Coberturas',
				list: [
					'Roubo e furto com vestígios',
					'Quebra Acidental',
					'Perda e pagamento de aluguel',
				],
			},
			{
				title: 'Vantagens',
				list: [
					'Sem carência, após a emissão da apólice',
					'Reembolso rápido e em dinheiro',
					'Cobertura internacional',
				],
			},
		],
		coverageFile:
			'https://www.portoseguro.com.br/content/dam/petlove/coberturas-plano-ideal.pdf',
	},
	{
		title: 'Essencial',
		price: {
			monthValue: 'R$ 189,90',
			yearValue: 'R$ 2278,80',
		},
		badge: {
			bgColor: '',
			label: '',
		},
		button: {
			label: 'Quero este',
			href: '/loja/petlove/dados-pessoais',
		},
		benefits: [
			{
				title: 'Coberturas',
				list: [
					'Roubo e furto com vestígios',
					'Quebra Acidental',
					'Perda e pagamento de aluguel',
				],
			},
			{
				title: 'Vantagens',
				list: [
					'Sem carência, após a emissão da apólice',
					'Reembolso rápido e em dinheiro',
					'Cobertura internacional',
				],
			},
		],
		coverageFile:
			'https://www.portoseguro.com.br/content/dam/petlove/coberturas-plano-essencial.pdf',
	},
	{
		title: 'Completo',
		price: {
			monthValue: 'R$ 399,90',
			yearValue: 'R$ 4798,90',
		},
		badge: {
			bgColor: '',
			label: '',
		},
		button: {
			label: 'Quero este',
			href: '/loja/petlove/dados-pessoais',
		},
		benefits: [
			{
				title: 'Coberturas',
				list: [
					'Roubo e furto com vestígios',
					'Quebra Acidental',
					'Perda e pagamento de aluguel',
				],
			},
			{
				title: 'Vantagens',
				list: [
					'Sem carência, após a emissão da apólice',
					'Reembolso rápido e em dinheiro',
					'Cobertura internacional',
				],
			},
		],
		coverageFile:
			'https://www.portoseguro.com.br/content/dam/petlove/coberturas-plano-completo.pdf',
	},
];

function formatTitle(value: string) {
	return {
		numeral: value.replace('R$', '').split(',')[0],
		decimal: value.replace('R$', '').split(',')[1],
	};
}

export const PlansCarousel = () => {
	return (
		<div className={s['plans-carousel']}>
			<Carousel slidesToShow={1.5} slidesToScroll={1.5}>
				{plans.map((card) => (
					<div key={card.title}>
						<div className={s.container}>
							<div>
								<Typography variant="title6" weight="bold" className={s.title}>
									{card.title}
								</Typography>

								<div className={s.badge}>
									<span>Melhor custo-benefício</span>
								</div>

								<Typography
									variant="title4"
									weight="bold"
									className={s['month-price']}
								>
									R${formatTitle(card.price.monthValue).numeral}
									<span className={s.decimal}>
										,{formatTitle(card.price.monthValue).decimal}
									</span>
									<span className={s['lower-text']}>/mês</span>
								</Typography>

								<Typography variant="body2" weight="bold" className="monthYear">
									<span className={s['lower-text']}>ou</span>{' '}
									{card.price.yearValue}{' '}
									<span className={s['lower-text']}>anual</span>
								</Typography>

								<Link
									href={card.button?.href}
									width="fluid"
									className={s.button}
								>
									{card.button?.label}
								</Link>

								{card.benefits.map((benefit) => (
									<div key={benefit.text} className={s.benefit}>
										<Typography variant="body2">{benefit.text}</Typography>
										{benefit.hasIcon && <Image src={CheckSVG} alt="" />}
									</div>
								))}
							</div>

							<NextLink
								href={card.coverageFile}
								target="_blank"
								className={s.link}
							>
								<Typography variant="body2" color="brand-insurance-900">
									Ver mais coberturas
								</Typography>
							</NextLink>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
};
