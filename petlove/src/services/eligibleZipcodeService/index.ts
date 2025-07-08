'use server';
import { env } from 'next-runtime-env';

import { authorizedApi } from '@/lib';

import type { ScopeAndEligibilityServiceResponse } from './types';

export const EligibleZipcodeService = async (
  cep: string,
): Promise<ScopeAndEligibilityServiceResponse> => {
  const endpoint = `${env('NEXT_PUBLIC_CARBON_BASE_ENDPOINT')}/abrangencia/elegibilidade`;

  const data = {
    postalCode: cep.replace('-', ''),
  };

  const httpResponse = await authorizedApi.post(endpoint, JSON.stringify(data));
  if (httpResponse.status === 200) {
    return {
      ...httpResponse.data,
      statusCode: httpResponse.status,
    };
  }

  return {
    statusCode: httpResponse.status,
    coverage: false,
    addressData: httpResponse.data,
  };
};
