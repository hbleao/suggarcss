'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const acquitionPath = env('NEXT_PUBLIC_ACQUISITION_SERVICE_PATH');

import type { ProposalServiceProps } from './type';

export async function ProposalService(data: ProposalServiceProps) {
  const endpoint = `${basePath}/${acquitionPath}/petlove/propostas`;

  try {
    const { access_token } = await AuthorizationService();

    const response = await api.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw { message: 'Erro inesperado no serviço de PostalCepService:', error };
  }
}
