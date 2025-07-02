export type IPet = {
  name: string;
  type: string;
};

export type IPlan = {
  id: number;
  name: string;
  price: number;
  coverage: {
    title: string;
  }[]
};

export type IAddress = {
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
  stateCode: string;
  complement: string;
  neighborhood: string;
  ibgeCode: string;
};

export type IUser = {
  cpf: string;
  fullName: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
  mktCommunication: boolean;
};

export type IData = {
  pet: IPet;
  address: IAddress;
  plan: IPlan;
  user: IUser;
};

export type UserProps = {
  data: IData;
  setPet: (pet: IPet) => void;
  setAddress: (address: IAddress) => void;
  setPlan: (plan: IPlan) => void;
  setUser: (user: IUser) => void;
  cleanData: () => void;
};
