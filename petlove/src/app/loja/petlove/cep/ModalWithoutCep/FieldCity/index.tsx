'use client';

import { Dropdown } from '@/components';
import { ReducerStateProps } from '../types';

export const FieldCity = ({ state, dispatch }: ReducerStateProps) => {

  const citiesWithDropdownModel = state?.postalGuide?.availableCities?.map(
    (item) => ({
      value: item,
      label: item,
    }),
  );

  return (
    <div>
      <Dropdown
        disabled={!state.postalGuide?.selectedState}
        label="Cidade"
        value={state.postalGuide?.selectedCity}
        readOnly
        options={citiesWithDropdownModel}
        onChange={(item) => dispatch({
          type: 'setPostalGuideField',
          fieldName: 'selectedCity',
          payload: item
        })}
        isLoading={state.postalGuide.isFetchingCity}
        errorMessage={
          state.postalGuide.errors.city ? 'Serviço indisponivel no momento.' : ''
        }
      />
    </div>
  );
};
