'use client';

import { useEffect, useState } from 'react';

import { carouselSettings } from './carouselConfig';
import './styles.scss';

import {
  Button,
  Carousel,
  Dialog,
  HeaderAcquisitionFlow,
  ProgressBar,
  Typography
} from '@/components';
import { useWindowSize } from '@/hooks';
import { PlansService } from '@/services';
import { Plan as PlanType } from '@/services/plansService/types';
import { useAquisitionStore } from '@/store';
import { LoaderPlans } from './LoaderPlans';
import { Plan } from './Plan';

export default function Plans() {
  const { width } = useWindowSize();
  const [carouselConfig, setCarouselConfit] = useState({});
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isErrorFetchPlans, setIsErrorFetchPlans] = useState(false);
  const state = useAquisitionStore(state => state);

  const fetchPlans = async () => {
    try {
      setIsErrorFetchPlans(false);
      setIsLoadingPlans(true);
      const body = { ibgeCode: state.data.address.ibgeCode };
      const { data } = await PlansService(body);
      setPlans(data);
    } catch (error) {
      console.error('Erro na API de fetchPlans:', error);
      setIsErrorFetchPlans(true)
    } finally {
      setIsLoadingPlans(false);
    }
  };

  useEffect(() => {
    setCarouselConfit(carouselSettings(width));
  }, [width]);

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/endereco"
        hasShoppingCart={false}
      />
      <ProgressBar value={80} initialValue={60} />
      <main className="page__plans">
        <Typography variant="title4" weight="bold" className="plans__title">
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
              <Plan plan={plan} firstItem={index === 0} />
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
              <LoaderPlans />
            ))}

          </Carousel>
        )}

        <Dialog isOpen={isErrorFetchPlans}
          title="Poxa, nosso sistema está em manutenção"
          subtitle="Estamos trabalhando para que volte a funcionar o quanto antes."
          description="Por favor, tente de novo mais tarde."
          footer={<Button size='small' onClick={fetchPlans}>Tentar novamente</Button>}
        />
      </main>
    </>
  );
}
