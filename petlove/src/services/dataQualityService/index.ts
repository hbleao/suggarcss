'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';

import { AuthorizationService } from '../authorizationService';
import type {
  DataQualityServiceProps,
  DataQualityServiceResponse,
} from './types';

type DataQualityServiceResult = {
  isValid: boolean
  message: string
}
const sensedia = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');

let controller: AbortController | null = null;

export const DataQualityService = async ({
  type,
  param,
}: DataQualityServiceProps): Promise<DataQualityServiceResult> => {

  const endpoint = `${sensedia}/hub-vendas-carbon/cliente/v1/validacoes/${param}/${type}`;

  const { access_token } = await AuthorizationService();

  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }

  const httpResponse =
    await api.get<DataQualityServiceResponse>(endpoint, {
      headers,
      signal: controller.signal,
    });

  if (httpResponse.status !== 200) {
    return {
      isValid: false,
      message: 'Serviço indísponivel',
    };
  }

  return {
    ...httpResponse.data,
    message: httpResponse.data.isValid ? '' : 'Valor inválido',
  };
};
