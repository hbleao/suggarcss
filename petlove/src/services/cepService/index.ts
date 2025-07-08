// 'use server';
import axios from 'axios';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

import { CepHttpResponse, CepResult } from './types';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const assistantPath = env('NEXT_PUBLIC_ASSISTANT_SERVICE_PATH');
const acquisitionPath = env('NEXT_PUBLIC_ACQUISITION_SERVICE_PATH');

export async function CepService(cep: string): Promise<CepResult> {
  try {
    const endpoint = `${basePath}/${assistantPath}/guia-postal/cep?zipCode=${encodeURIComponent(cep)}`;
    const coverageEndpoint = `${basePath}/${acquisitionPath}/petlove/cobertura`;

    const { access_token } = await AuthorizationService();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }

    const { data: httpResponse, status: statusCep } = await api.get<CepHttpResponse>(endpoint, { headers });

    const body = {
      locality: httpResponse?.localidade,
      state: httpResponse?.uf
    };

    if (!httpResponse || !httpResponse.localidade || !httpResponse.estado) {
      throw { message: 'Informe um cep válido' }
    }

    const { data: httpCoverageResponse, status: statusCepCoverage } = await api.post(coverageEndpoint, body, { headers });

    if (statusCep > 499 || statusCepCoverage > 499) {
      throw { message: 'Algo deu errado. Tente novamente mais tarde.' }
    }

    return {
      hasCoverage: httpCoverageResponse?.coverage || false,
      ibgeCode: httpCoverageResponse?.ibge || '',
      cep,
      address: `${cep} - ${httpResponse?.localidade ?? 'Cidade desconhecida'}/${httpResponse?.estado ?? 'Estado desconhecido'}`,
      neighborhood: httpResponse?.bairro ?? '',
      city: httpResponse?.localidade ?? '',
      state: httpResponse?.estado ?? '',
      street: httpResponse?.logradouro ?? '',
      stateCode: httpResponse?.uf ?? ''
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.error('A requisição excedeu o tempo limite.');
    }

    throw { message: 'Algo deu errado. Tente novamente mais tarde.' }
  }
}
