'use client';
import Image from 'next/image';
import NextLink from 'next/link';

import CheckSVG from '@/assets/icons/ic-check.svg';
import TicketSVG from '@/assets/icons/ic-ticket.svg';
import { Button, Flex, Spacing, Typography } from "@/components";
import CreditCardSVG from './icons/ic_credit_card.svg';

import { Plan as PlanType } from '@/services/plansService/types';
import { useAquisitionStore } from '@/store';
import { redirect } from 'next/navigation';

export const Plan = ({ plan, firstItem }: { plan: PlanType, firstItem: boolean }) => {
  const { setPlan } = useAquisitionStore(state => state);

  function formatValue(value: string) {
    return {
      numeral: value.split('.')[0],
      decimal: value.split('.')[1] || '00',
    };
  }

  function handleSelectPlan(plan: PlanType) {
    setPlan({
      id: plan.planId,
      name: plan.name,
      price: plan.price,
      coverage: plan.coverage
    });
    redirect("/loja/petlove/dados-pessoais");
  }

  return (
    <div key={plan.name}>
      <div className="plans__carousel">
        <div className="carousel__badge">
          <span>{plan.subtitle}</span>
        </div>
        <div>
          <Typography
            variant="body1"
            weight="bold"
            className="carousel__title"
          >
            {plan.name}
          </Typography>

          <div className="carousel__installment">
            <span className="carousel__text-highlight">
              12x sem juros{' '}
            </span>
            <span>com cartões de crédito:</span>
          </div>

          <Typography
            variant="title4"
            weight="bold"
            className="carousel__month-price"
          >
            R$ {formatValue(String(plan.installments.price)).numeral}
            <span className="carousel__decimal">
              ,{formatValue(String(plan.installments.price.toFixed(2))).decimal}
            </span>
            <span className="carousel__lower-text">/mês</span>
          </Typography>

          <Typography
            variant="body1"
            weight="bold"
            className="carousel__month-year"
          >
            <span className="carousel__lower-text">ou</span>{' '}
            R$ {plan.installments.annual_price.toFixed(2).toString().replace('.', ',')}{' '}
            <span className="carousel__lower-text">anual</span>
          </Typography>

          <Button
            width="fluid"
            className="carousel__btn"
            onClick={() => handleSelectPlan(plan)}
          >
            Quero este
          </Button>

          <Flex direction='column'>
            <div className="carousel__discount">
              <Image
                src={CreditCardSVG}
                alt="asdf"
                width={16}
                height={16}
              />
              <p>
                <span className="carousel__discount-highlight">
                  +{plan.discounts_porto.porto_card_discount_percentage}% OFF
                </span>{' '}
                com o Cartão Porto Bank
              </p>
            </div>

            <div className="carousel__discount">
              <Image
                src={TicketSVG}
                alt="asdf"
                width={16}
                height={16}
              />{' '}
              <p>
                <span className="carousel__discount-highlight">
                  +100% OFF
                </span>{' '}
                na primeira mensalidade
              </p>
            </div>
          </Flex>

          <Spacing bottom="1rem" />

          <Typography
            variant="body2"
            weight="bold"
            className="carousel__benefit-title"
          >
            Cobertura
          </Typography>

          {plan?.coverage_diference_description && (
            <Typography
              variant="body2"
              className="carousel__benefit-title"
            >
              {plan.coverage_diference_description}
            </Typography>
          )}

          {firstItem && plan.coverage.map(coverage => (
            <div key={coverage.title} className="carousel__benefit">
              <div className="carousel__item">
                <Typography variant="body2">{coverage.title}</Typography>
                <Image src={CheckSVG} alt="" />
              </div>
            </div>
          ))}

          {plan.coverage_diference?.map((coverage, index) => (
            <div key={coverage.title} className="carousel__benefit">
              <div className="carousel__item">
                <Typography variant="body2">{coverage.title}</Typography>
                <Image src={CheckSVG} alt="" />
              </div>
            </div>
          ))}
        </div>

        <NextLink
          href={plan.contractFile}
          target="_blank"
          className="carousel__link"
        >
          <Typography variant="body2" color="brand-insurance-900">
            Ver mais coberturas
          </Typography>
        </NextLink>
      </div>
    </div>
  )
}
