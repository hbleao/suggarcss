import { encryptValue } from "@/services";

export type ErrorProps = {
  endpoint?: string;
  status?: boolean;
  code?: number;
  message?: string;
  backendErrorMessage?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: any;
};

export function pushLeadToDataLayer(cpf: string, pescod: number) {
  window.dataLayer.push({
    event: 'lead',
    ev_action: 'lead:form:enviar:sucesso',
    ev_label: 'tipo-pessoa:pf',
    client_id: encryptValue(cpf),
    client_bcp: pescod,
  });
}

export function pushErrorLeadToDataLayer(cpf: string, error: ErrorProps) {
  window.dataLayer.push({
    event: 'alert',
    ev_action: 'lead:alert',
    ev_label: 'Poxa, nosso sistema está em manutenção',
    alert_event: 'lead',
    alert_type: 'error',
    alert_code: error?.status,
    error_service: error?.endpoint,
    alert_service_message: `${error?.backendErrorMessage}:${error?.endpoint}`,
    client_id: encryptValue(cpf),
    client_bcp: '',
  });
}

type pushPromoMktComunicationToDataLayerProps = {
  acceptTerms: boolean;
  cpf: string;
}

export function pushPromoMktComunicationToDataLayer({
  acceptTerms,
  cpf
}: pushPromoMktComunicationToDataLayerProps) {
  const hasCheck = acceptTerms ? 'sim' : 'nao';
  window.dataLayer.push({
    event: 'promo_mkt_communication',
    ev_action: `receber-comunicacoes:${hasCheck}:sucesso`,
    ev_label: 'pf',
    client_id: cpf,
    client_bcp: '',
  });
}
