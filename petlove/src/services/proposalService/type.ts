export type ProposalServiceProps = {
  pet: {
    name: string;
    type: string;
  };
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    stateCode: string;
    neighborhood: string;
  };
  plan: {
    id: number;
    name: string;
    price: number;
  };
  user: {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    acceptTerms: boolean;
    mktCommunication: boolean;
  };
  cartCommerceId: string;
  customerCommerceToken: string;
  marketingOptInFlag: boolean;
  sessionId: string;
  userAgent: string;
  ipAddress: string;
}
