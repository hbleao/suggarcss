'use client';

import { ProgressBar } from '@/components';

import { HeaderAcquisitionFlow } from '@/components';
import { FormPetSelection } from '@/components/FormPetSelection';
import { useTracking } from '@/hooks';

export default function ScreenPetSelection() {
  useTracking();
  return (
    <>
      <HeaderAcquisitionFlow goBackLink="/" hasShoppingCart={false} />
      <ProgressBar initialValue={0} value={20} />
      <FormPetSelection />
    </>
  );
}
