import type { Plan } from '@/services/plansService/types';
import { formatGtmText } from '@/utils';

export type DataLayerErrorProps = {
  endpoint?: string;
  status?: boolean;
  code?: number;
  message?: string;
  backendErrorMessage?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: any;
};

export function pushPlansToDataLayer(plans: Plan[], petType: string) {
  const items = plans.map((plan) => ({
    item_id: plan.planId,
    item_name: 'petlove-saude',
    item_category: formatGtmText(plan.name),
    item_brand: 'porto',
    item_variant: petType === 'cat' ? 'gato' : 'cachorro',
    price: plan.annual_price.toFixed(2),
    quantity: 1,
    affiliation: 'pet-love',
  }));

  window.dataLayer.push({
    event: 'view-item',
    ev_action: 'ecommerce:visualizar:produto:sucesso',
    items,
  });
}

export function pushErrorPlansToDataLayer(error: DataLayerErrorProps) {
  window.dataLayer.push({
    event: 'alert',
    ev_action: 'ecommerce:visualizar:produto:alert',
    ev_label: 'Poxa, nosso sistema está em manutenção',
    alert_event: 'view_item',
    alert_type: 'error',
    alert_code: error?.status,
    error_service: error?.endpoint,
    alert_service_message: `${error?.backendErrorMessage}:${error?.endpoint}`,
    client_id: '',
    client_bcp: '',
  });
}
