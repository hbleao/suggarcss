'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const assistantPath = env('NEXT_PUBLIC_ASSISTANT_SERVICE_PATH');

import { PostalCepServiceProps } from './types';

export async function PostalCepService({
  stateName,
  cityName,
  addressName,
}: PostalCepServiceProps) {
  const endpoint = `${basePath}/${assistantPath}/guia-postal/logradouro?perPage=5&stateAcronym=${encodeURIComponent(
    stateName
  )}&locationName=${encodeURIComponent(cityName)}&addressName=${encodeURIComponent(addressName)}`;

  try {
    const { access_token } = await AuthorizationService();

    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response || response.status !== 200 || !Array.isArray(response?.data?.logradouros)) {
      console.warn('Resposta inesperada da API de logradouro:', response);
      return { logradouros: [] };
    }

    return response.data;
  } catch (error) {
    console.error('Erro inesperado no serviço de PostalCepService:', error);
    throw error;
  }
}
