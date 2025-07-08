'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const assistantPath = env('NEXT_PUBLIC_ASSISTANT_SERVICE_PATH');

let controller: AbortController | null = null;

import type { PostalCepServiceProps } from './types';

export async function PostalCepService({
  stateName,
  cityName,
  addressName,
}: PostalCepServiceProps) {
  const endpoint = `${basePath}/${assistantPath}/guia-postal/logradouro?perPage=5&stateAcronym=${encodeURIComponent(
    stateName,
  )}&locationName=${encodeURIComponent(cityName)}&addressName=${encodeURIComponent(addressName)}`;

  try {
    const { access_token } = await AuthorizationService();

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (
      !response ||
      response.status !== 200 ||
      !Array.isArray(response?.data?.logradouros)
    ) {
      console.warn('Resposta inesperada da API de logradouro:', response);
      return { logradouros: [] };
    }

    return response.data;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch ({ status, code, config, message }: any) {
    throw {
      endpoint: config?.url,
      status: status,
      backendErrorMessage: message,
    };
  }
}
