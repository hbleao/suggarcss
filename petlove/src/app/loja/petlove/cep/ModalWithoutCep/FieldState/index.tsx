import { Dropdown } from '@/components';
import { states } from '@/constants';
import { ReducerStateProps } from '../types';

export const FieldState = ({ state, dispatch }: ReducerStateProps) => {

  const stateWithDropdownModel = states.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div>
      <Dropdown
        label="Estado / UF"
        value={state.postalGuide?.selectedState}
        options={stateWithDropdownModel}
        onChange={(item) => dispatch({
          type: 'setPostalGuideField',
          fieldName: 'selectedState',
          payload: item
        })}
        readOnly
        errorMessage={
          state.postalGuide.errors.selectedState ? 'Serviço indisponivel no momento.' : ''
        }
      />
    </div>
  );
};
