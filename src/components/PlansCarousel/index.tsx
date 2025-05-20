'use client';
import Image from 'next/image';
import NextLink from 'next/link';

import { Link } from '@/components';
import { Typography } from '@/components/Typography';

import './styles.scss';

import { Carousel } from '../Carousel';

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
			{/* <Carousel className={s.carrouselCustom} settings={settings}> */}
			<Carousel slidesToShow={1.5} slidesToScroll={1.5}>
				{plans.map((card) => (
					<div key={card.title}>
						<div className="container">
							<div>
								<Typography variant="title6" weight="bold" className="title">
									{card.title}
								</Typography>

								<Typography
									variant="title4"
									weight="bold"
									className="monthPrice"
								>
									R${formatTitle(card.price.monthValue).numeral}
									<span className="decimal">
										,{formatTitle(card.price.monthValue).decimal}
									</span>
									<span className="lowerText">/mês</span>
								</Typography>

								<Typography variant="body2" weight="bold" className="monthYear">
									<span className="lowerText">ou</span> {card.price.yearValue}{' '}
									<span className="lowerText">anual</span>
								</Typography>

								<Link href={card.button?.href} width="fluid" className="button">
									{card.button?.label}
								</Link>

								{card.benefits.map((benefit) => (
									<div key={benefit.text} className="benefit">
										<Typography variant="body2">{benefit.text}</Typography>
										{benefit.hasIcon && <Image src={CheckSVG} alt="" />}
									</div>
								))}
							</div>

							<NextLink
								href={card.coverageFile}
								target="_blank"
								className="link"
							>
								<Typography variant="body2" color="brand-insurance-900">
									Ver mais coberturas
								</Typography>
							</NextLink>
						</div>
					</div>
				))}
			</Carousel>

			{/* </Carousel> */}
		</div>
	);
};
