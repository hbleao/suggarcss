export type CepHttpResponse = {
  bairro: string;
  cep: string;
  estado: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export type CepResult = {
  hasCoverage: boolean;
  ibgeCode: string;
  cep: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  street: string;
  stateCode: string;
}
