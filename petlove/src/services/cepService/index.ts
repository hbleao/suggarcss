'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

import type { CepHttpResponse, CepResult } from './types';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const assistantPath = env('NEXT_PUBLIC_ASSISTANT_SERVICE_PATH');
const acquisitionPath = env('NEXT_PUBLIC_ACQUISITION_SERVICE_PATH');

let controller: AbortController | null = null;

export async function CepService(cep: string): Promise<CepResult> {
  try {
    const endpoint = `${basePath}/${assistantPath}/guia-postal/cep?zipCode=${encodeURIComponent(cep)}`;
    const coverageEndpoint = `${basePath}/${acquisitionPath}/petlove/cobertura`;

    const { access_token } = await AuthorizationService();

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    const { data: httpResponse, status: statusCep } =
      await api.get<CepHttpResponse>(endpoint, {
        headers,
        signal: controller.signal,
      });

    const body = {
      locality: httpResponse?.localidade,
      state: httpResponse?.uf,
    };

    if (!httpResponse) {
      throw { message: 'Please enter a valid zip code' };
    }
    
    if (!httpResponse.localidade || !httpResponse.estado) {
      console.warn('Incomplete response from ZIP code API:', httpResponse);
      throw { message: 'Please enter a valid zip code' };
    }

    const { data: httpCoverageResponse, status: statusCepCoverage } =
      await api.post(coverageEndpoint, body, {
        headers,
        signal: controller.signal,
      });

    if (statusCep >= 400 || statusCepCoverage > 499) {
      throw { message: 'Something went wrong. Please try again later.' };
    }

    return {
      hasCoverage: httpCoverageResponse?.coverage || false,
      ibgeCode: httpCoverageResponse?.ibge || '',
      cep,
      address: `${cep} - ${httpResponse?.localidade ?? 'Unknown city'}/${httpResponse?.estado ?? 'Unknown state'}`,
      neighborhood: httpResponse?.bairro ?? '',
      city: httpResponse?.localidade ?? '',
      state: httpResponse?.estado ?? '',
      street: httpResponse?.logradouro ?? '',
      stateCode: httpResponse?.uf ?? '',
    };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch ({ status, code, config, message }: any) {
    throw {
      endpoint: config?.url,
      status: status,
      code: code,
      message: 'Something went wrong. Please try again later.',
      backendErrorMessage: message,
      body: config?.data,
    };
  }
}
