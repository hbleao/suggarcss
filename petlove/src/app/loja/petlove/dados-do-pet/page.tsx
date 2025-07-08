'use client';

import { ProgressBar } from '@/components';

import { HeaderAcquisitionFlow } from '@/components';
import { FormPetSelection } from '@/components/FormPetSelection';

export default function ScreenPetSelection() {
  return (
    <>
      <HeaderAcquisitionFlow goBackLink="/" hasShoppingCart={false} />
      <ProgressBar initialValue={0} value={20} />
      <FormPetSelection />
    </>
  );
}
