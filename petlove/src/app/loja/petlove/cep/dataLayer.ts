import { formatGtmText } from '@/utils';

export type ErrorProps = {
  endpoint?: string;
  status?: boolean;
  code?: number;
  message?: string;
  backendErrorMessage?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: any;
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function pushCoverageCepToDataLayer(state: any) {
  window.dataLayer.push({
    event: 'select_content',
    ev_action: 'verificar-disponibilidade-regiao:sucesso',
    ev_label: `localizacao:${formatGtmText(state?.neighborhood)}:${formatGtmText(state?.state)}`,
    status: state?.hasCoverage ? 'valido' : 'invalido',
  });
}

export function pushErrorCoverageCepToDataLayer(error: ErrorProps) {
  window.dataLayer.push({
    event: 'alert',
    ev_action: 'verificar-disponibilidade-regiao:alert',
    ev_label:
      'ainda-nao-chegamos-na-sua-regiao-clique-aqui-para-ser-avisado-quando-chegarmos',
    alert_event: 'select_content',
    alert_type: error?.backendErrorMessage,
    alert_code: error?.status,
    error_service: error?.endpoint,
    alert_service_message: `${error?.backendErrorMessage}:${error?.endpoint}`,
    client_id: '',
    client_bcp: '',
  });
}

export function pushCoveragePostalGuideToDataLayer() {
  window.dataLayer.push({
    event: 'select_content',
    ev_action: 'consultou:pesquisa-de-cep:sucesso',
    ev_label: 'selecionar-cep',
  });
}

export function pushErrorCoveragePostalGuideToDataLayer(error: ErrorProps) {
  window.dataLayer.push({
    event: 'alert',
    ev_action: 'consultou:pesquisa-de-cep:alert',
    ev_label: 'Informe um logradouro válido',
    alert_event: 'select_content',
    alert_type: 'error',
    alert_code: error?.status,
    error_service: error?.endpoint,
    alert_service_message: `${error?.backendErrorMessage}:${error?.endpoint}`,
    client_id: '',
    client_bcp: '',
  });
}
