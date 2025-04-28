'use client';
import Image from 'next/image';
import NextLink from 'next/link';

import { Link } from '@/components';
import { Carousel } from '@/components/ui/Carousel';
import { Typography } from '@/components/ui/Typography';

import { settings } from './caroselSettings';
import s from './styles.module.scss';

import CheckSVG from '@/assets/icons/ic-check.svg';

const plans = [
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
				text: 'Vacinas obrigatórias',
				hasIcon: true,
			},
			{
				text: 'Consultas em horário normal',
				hasIcon: true,
			},
			{
				text: 'Microchipagem gratuita',
				hasIcon: true,
			},
			{
				text: 'Clínico geral em domicílio ',
				hasIcon: true,
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
				text: 'Todas coberturas do plano Petlove leve +',
				hasIcon: false,
			},
			{
				text: 'Consultas em horário de plantão',
				hasIcon: true,
			},
			{
				text: 'Procedimentos clínicos',
				hasIcon: true,
			},
			{
				text: 'Exames laboratoriais simples e complexos',
				hasIcon: true,
			},
			{
				text: 'Exames de imagem',
				hasIcon: true,
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
				text: 'Todas coberturas do plano Petlove leve +',
				hasIcon: false,
			},
			{
				text: 'Consultas em horário de plantão',
				hasIcon: true,
			},
			{
				text: 'Procedimentos clínicos',
				hasIcon: true,
			},
			{
				text: 'Exames laboratoriais simples e complexos',
				hasIcon: true,
			},
			{
				text: 'Exames de imagem',
				hasIcon: true,
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
				text: 'Todas as coberturas do plano Petlove Ideal +',
				hasIcon: false,
			},
			{
				text: 'Fisioterapia e Acupuntura',
				hasIcon: true,
			},
			{
				text: 'Exames de alta complexidade',
				hasIcon: true,
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
				text: 'Todas as coberturas do plano Petlove Essencial + Rede Premium',
				hasIcon: false,
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
		<div className="plans-carousel">
			<Carousel className={s.carrouselCustom} settings={settings}>
				{plans.map((card) => (
					<div key={card.title}>
						<div className={s.container}>
							<div>
								<Typography variant="title6" weight="bold" className={s.title}>
									{card.title}
								</Typography>

								<Typography
									variant="title4"
									weight="bold"
									className={s.monthPrice}
								>
									R${formatTitle(card.price.monthValue).numeral}
									<span className={s.decimal}>
										,{formatTitle(card.price.monthValue).decimal}
									</span>
									<span className={s.lowerText}>/mês</span>
								</Typography>

								<Typography
									variant="body2"
									weight="bold"
									className={s.monthYear}
								>
									<span className={s.lowerText}>ou</span> {card.price.yearValue}{' '}
									<span className={s.lowerText}>anual</span>
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
								<Typography variant="body2" color="portoSeguros100">
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
