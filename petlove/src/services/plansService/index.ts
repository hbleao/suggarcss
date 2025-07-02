'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

export const PlansService = async (data: { ibgeCode: string }) => {
  try {
    const endpoint = `${env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL')}/${env('NEXT_PUBLIC_ACQUISITION_SERVICE_PATH')}/petlove/planos`;

    const { access_token } = await AuthorizationService();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    }

    const response = await api.post(endpoint, data, {
      headers,
    });

    if (response.status !== 200 || !response.data) {
      throw { message: 'Resposta inesperada da API de planos:', response };
    }

    return response.data;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch ({ status, config, message }: any) {
    throw {
      endpoint: config?.url,
      status: status,
      backendErrorMessage: message,
    };
  }
};
