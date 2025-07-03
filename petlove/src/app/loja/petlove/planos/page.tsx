'use client';

import { useEffect, useState } from 'react';

import { type CarouselConfig, carouselSettings } from './carouselConfig';
import './styles.scss';

import {
  Button,
  Carousel,
  Dialog,
  HeaderAcquisitionFlow,
  ProgressBar,
  Typography,
} from '@/components';
import { useTracking, useWindowSize } from '@/hooks';
import { PlansService } from '@/services';
import type { Plan as PlanType } from '@/services/plansService/types';
import { useAquisitionStore } from '@/store';
import { LoaderPlans } from './LoaderPlans';
import { Plan } from './Plan';
import {
  pushErrorPlansToDataLayer,
  pushPlansToDataLayer
} from './dataLayer';

export default function Plans() {
  useTracking();
  const { width } = useWindowSize();
  const [carouselConfig, setCarouselConfit] = useState({} as CarouselConfig);
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isErrorFetchPlans, setIsErrorFetchPlans] = useState(false);
  const state = useAquisitionStore((state: any) => state);

  const fetchPlans = async () => {
    try {
      if (!state.data?.address?.ibgeCode) return;
      setIsErrorFetchPlans(false);
      setIsLoadingPlans(true);
      const body = { ibgeCode: state.data.address.ibgeCode };
      const { data } = await PlansService(body);
      setPlans(data);
      pushPlansToDataLayer(data, state?.data?.pet?.type);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error('Error in fetchPlans API:', error);
      setIsErrorFetchPlans(true);
      pushErrorPlansToDataLayer({
        endpoint: error?.url,
        status: error?.status,
        backendErrorMessage: error?.backendErrorMessage,
      });
    } finally {
      setIsLoadingPlans(false);
    }
  };

  useEffect(() => {
    setCarouselConfit(carouselSettings(width));
  }, [width]);

  useEffect(() => {
    fetchPlans();
  }, [state.data?.address?.ibgeCode]);

  return (
    <>
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/endereco"
        hasShoppingCart={false}
      />
      <ProgressBar value={80} initialValue={60} />
      <main className="page__plans">
        <Typography
          id="gtm-title"
          variant="title4"
          weight="bold"
          className="plans__title"
        >
          O <span className="plans__highlight">melhor plano</span> para o seu
          pet está aqui!
        </Typography>
        <Typography
          variant="body1"
          color="neutral-700"
          className="plans__subtitle"
        >
          Com base no seu perfil, encontramos as melhores opções. Agora é só
          escolher:
        </Typography>

        {!isLoadingPlans && plans?.length > 0 && (
          <Carousel
            slidesToShow={carouselConfig.slidesToShow}
            slidesToScroll={carouselConfig.slidesToScroll}
            gap={carouselConfig.gap}
            arrows={carouselConfig.arrows}
          >
            {plans?.map((plan, index) => (
              <Plan key={plan.planId} plan={plan} firstItem={index === 0} />
            ))}
          </Carousel>
        )}

        {isLoadingPlans && (
          <Carousel
            slidesToShow={carouselConfig.slidesToShow}
            slidesToScroll={carouselConfig.slidesToScroll}
            gap={carouselConfig.gap}
            arrows={carouselConfig.arrows}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <LoaderPlans key={`shadow-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                i}`} />
            ))}
          </Carousel>
        )}

        <Dialog
          isOpen={isErrorFetchPlans}
          title="Poxa, nosso sistema está em manutenção"
          subtitle="Estamos trabalhando para que volte a funcionar o quanto antes."
          description="Por favor, tente de novo mais tarde."
          footer={
            <Button size="small" onClick={fetchPlans}>
              Tentar novamente
            </Button>
          }
        />
      </main>
    </>
  );
}
