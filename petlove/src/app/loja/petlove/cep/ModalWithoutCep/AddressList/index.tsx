'use client';

import './styles.scss';

import { Radio, Typography } from '@/components';
import { ReducerStateProps } from '../types';
import { LoaderAddressList } from './LoaderAddressList';

export const AddressList = ({ state, dispatch }: ReducerStateProps) => {
  function handleSelectedAddress(index: number) {
    const addressList = state.postalGuide?.addressList.map(
      (item: any, i: number) => {
        return {
          ...item,
          isChecked: i === index,
        };
      },
    );
    const selectedAddress = addressList[index];
    dispatch({
      type: 'setPostalGuideField',
      fieldName: 'cep',
      payload: `${selectedAddress?.numeroCepLogradouro}-${selectedAddress?.numeroCepComplementoLogradouro}`
    });
    dispatch({
      type: 'setPostalGuideField',
      fieldName: 'addressList',
      payload: addressList
    });
  }

  return (
    <div className="cep__address-container">
      {state.postalGuide?.addressList?.length > 0 && !state.postalGuide.isFetchingFullAddress && (
        <Typography as="h5" variant="title6" color="neutral-900">
          Resultados:
        </Typography>
      )}

      {state.postalGuide?.addressList?.length > 0 && !state.postalGuide.isFetchingFullAddress && (
        <div className="cep__address-list">
          {state.postalGuide.addressList.map((item: any, index: number) => (
            <Radio
              variant={item.isChecked ? 'checked' : 'default'}
              className="cep__address-item"
              key={item.codigoLogradouro}
              onClick={() => handleSelectedAddress(index)}
              description={`
          ${item?.nomeLogradouro},${' '}
              ${item?.bairro?.nomeBairro}, ${item?.localidade?.estado?.siglaEstado} - ${' '}
              ${item?.numeroCepLogradouro}-${item?.numeroCepComplementoLogradouro}
              `}
            />
          ))}
        </div>
      )}

      {state.postalGuide.isFetchingFullAddress && <LoaderAddressList />}
    </div>
  );
};
