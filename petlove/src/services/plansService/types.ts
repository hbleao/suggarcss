export type Plan = {
  name: string;
  subtitle: string;
  contractFile: string;
  discounts: {
    lifetime_discount: number;
    first_payment_discount: number;
  },
  first_payment_price: number;
  price: number;
  annual_price: number;
  planId: number;
  plan_is_migrable: number;
  productType: number;
  coverage: {
    title: string;
  }[];
  coverage_diference: {
    title: string;
  }[];
  coverage_diference_description: string;
  default: boolean;
  installments: {
    price: number;
    annual_price: number;
  };
  discounts_porto: {
    coupon_description: string;
    porto_card_discount_percentage: string;
  }
}

export type PlansResult = Plan[];
