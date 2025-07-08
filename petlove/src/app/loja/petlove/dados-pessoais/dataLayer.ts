import { encryptValue } from '@/services';
import type { IPlan } from '@/store/aquisitionSlice/types';
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
};

export function pushPromoMktComunicationToDataLayer({
  acceptTerms,
  cpf,
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

export function pushAddToCartToDataLayer(plan: IPlan, petType: string) {
  const item = {
    item_id: plan?.id,
    item_name: 'petlove-saude',
    item_category: formatGtmText(plan?.name),
    item_brand: 'porto',
    item_variant: petType === 'cat' ? 'gato' : 'cachorro',
    price: plan?.price?.toFixed(2),
    quantity: 1,
    affiliation: 'pet-love',
  };

  window.dataLayer.push({
    event: 'add_to_cart',
    ev_action: 'ecommerce:add:carrinho:sucesso',
    ev_label: formatGtmText(item?.item_category),
    value: item?.price,
    currency: 'BRL',
    items: item,
  });
}
