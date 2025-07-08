'use client';

import { Input } from '@/components';
import { sanitize } from '@/utils';

import { ReducerStateProps } from '../types';

export const FieldStreet = ({ state, dispatch }: ReducerStateProps) => {
  return (
    <Input
      width="fluid"
      variant="default"
      disabled={!state.postalGuide.selectedCity}
      isLoading={state.postalGuide.isFetchingFullAddress}
      label="Rua, avenida, alameda"
      value={state.postalGuide?.addressInput}
      onChange={(e) => dispatch({
        type: 'setPostalGuideField',
        fieldName: 'addressInput',
        payload: sanitize(e.target.value)
      })}
      helperText="Ex: Rio Branco (apenas o nome)"
      errorMessage={state.postalGuide?.errors?.addressInput ? 'Informe um logradouro válido' : ''}
    />
  );
};
