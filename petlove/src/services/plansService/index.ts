'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

export const PlansService = async (data: { ibgeCode: string }) => {
  const endpoint = `${env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL')}/${env('NEXT_PUBLIC_ACQUISITION_SERVICE_PATH')}/petlove/planos`;

  try {
    const { access_token } = await AuthorizationService();

    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200 || !response.data) {
      throw { message: 'Resposta inesperada da API de planos:', response };
    }

    return response.data;
  } catch (error) {
    throw error
  }
};
