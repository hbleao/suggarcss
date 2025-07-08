export type CustomDataProps = {
  pageName: string;
  product: string;
  vertical: 'servico' | 'bank' | 'saude' | 'holding' | 'seguro';
  subproduct: string;
  funnel?: string;
  category:
  | 'produto'
  | 'institucional'
  | 'aquisicao'
  | 'area-do-cliente'
  | 'checkout'
  | 'autenticacao'
  | 'atendimento'
  | 'sinistro'
  | 'aquisicao';
  cpf?: string;
};
