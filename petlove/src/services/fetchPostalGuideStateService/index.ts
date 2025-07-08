'use server';
import { env } from 'next-runtime-env';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

const basePath = env('NEXT_PUBLIC_SENSEDIA_CLOUD_URL');
const assistantPath = env('NEXT_PUBLIC_ASSISTANT_SERVICE_PATH');

let controller: AbortController | null = null;

export async function fetchPostalGuideStateService(state: string) {
  const endpoint = `${basePath}/${assistantPath}/guia-postal/localidade?stateAcronym=${state}&page=0&perPage=999`;

  try {
    const { access_token } = await AuthorizationService();

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }

    const response = await api.get(endpoint, {
      headers,
      signal: controller.signal,
    });

    if (!response) throw new Error('Error fetching data');
    return response.data;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Request was aborted');
    } else {
      console.error('Failed to fetch postal guide data:', error);
    }
    throw error;
  }
}
