import { ActionDispatch } from "react";
import { ActionProps, InitialStateProps } from "../reducer/types";

type IAddress = {
  cep: string;
  street: string;
  address?: string;
  selectedState: string;
  selectedCity: string;
};

export interface ModalWithoutCepProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  state: any;
  dispatch: ActionDispatch<[action: ActionProps]>
  handleCloseModal: (address?: IAddress) => void;
}

export interface StateProps {
  ativo: boolean;
  codigoEstado: number;
  nomeEstado: string;
  siglaEstado: string;
  siglaEstadoOrigemExterna: string;
}

export interface CepProps {
  isChecked: boolean;
  codigoLogradouro: number;
  nomeLogradouro: string;
  nomeAbreviadoLogradouro: string;
  numeroCepLogradouro: string;
  numeroCepComplementoLogradouro: string;
  textoComplementoLogradouro?: string;
  codigoLogradouroOrigemExterna: number;
  tipoEnderecamentoPostal: {
    codigoTipoEnderecamentoPostal: number;
    nomeTipoEnderecamentoPostal: string;
  };
  tipoLogradouro: {
    codigoTipoLogradouro: number;
    nomeTipoLogradouro: string;
    siglaTipoLogradouro: string;
  };
  bairro: {
    codigoBairro: number;
    nomeBairro: string;
  };
  localidade: {
    codigoLocalidade: number;
    nomeLocalidade: string;
    nomeAbreviadoLocalidade: string;
    codigoLocalidadeOrigemExterna: number;
    tipoSituacaoLocalidade: {
      codigoTipoSituacaoLocalidade: number;
      descricaoTipoSituacaoLocalidade: string;
      ativo: boolean;
    };
    estado: {
      codigoEstado: number;
      nomeEstado: string;
      siglaEstado: string;
      siglaEstadoOrigemExterna: string;
      ativo: boolean;
    };
    codigoLocalidadeMunicipioIbge: string;
    tipoLocalidade: {
      codigoTipoLocalidade: number;
      nomeTipoLocalidade: string;
      codigoTipoLocalidadeOrigemExterna: string;
      ativo: true;
    };
    ativo: true;
  };
  ativo: boolean;
  codigoTipoEnderecamentoPostal: number;
}


export type ReducerStateProps = {
  state: InitialStateProps; dispatch: ActionDispatch<[action: ActionProps]>
};
