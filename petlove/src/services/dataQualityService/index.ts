// 'use server';
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

export const DataQualityService = async ({
  type,
  param,
}: DataQualityServiceProps): Promise<DataQualityServiceResult> => {
  const controller = new AbortController();
  const signal = controller.signal;

  const endpoint = `${sensedia}/hub-vendas-carbon/cliente/v1/validacoes/${param}/${type}`;
  // https://portoapicloud-hml.portoseguro.com.br/hub-vendas-carbon/cliente/v1/validacoes/51999998888/telefone'

  // https://portoapicloud-hml.portoseguro.com.br/hub-vendas-carbon/cliente/v1/validacoes/51999999999/telefone

  const { access_token } = await AuthorizationService();

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  }

  const httpResponse =
    await api.get<DataQualityServiceResponse>(endpoint, { signal, headers });

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
