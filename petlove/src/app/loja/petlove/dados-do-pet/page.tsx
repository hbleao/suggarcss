'use client';

import {
  CustomData,
  FormPetSelection,
  HeaderAcquisitionFlow,
  ProgressBar
} from '@/components';
import { useTracking } from '@/hooks';

export default function ScreenPetSelection() {
  useTracking();
  return (
    <>
      <CustomData
        pageName="O melhor plano para o seu pet está aqui"
        category='aquisicao'
        product='petlove-saude'
        subproduct=''
        funnel='short-form'
        vertical='servico'
        cpf=''
      />
      <HeaderAcquisitionFlow goBackLink="/" hasShoppingCart={false} />
      <ProgressBar initialValue={0} value={20} />
      <FormPetSelection />
    </>
  );
}
