'use client';

import { AddressList } from './AddressList';
import { FieldCity } from './FieldCity';
import { FieldState } from './FieldState';
import { FieldStreet } from './FieldStreet';
import s from './styles.module.scss';

import { Button, Modal } from '@/components';

import type { ModalWithoutCepProps } from './types';

export const ModalWithoutCep = ({
  title = '',
  subtitle = '',
  buttonLabel,
  state,
  dispatch,
  handleCloseModal,
}: ModalWithoutCepProps) => {

  function handleSelectedAddress() {
    dispatch({
      type: 'setSearchField',
      fieldName: 'cep',
      payload: state.postalGuide.cep
    });
    handleCloseModal();
  }
  return (
    <Modal name="modal-nao-sei-o-cep" title={title} subtitle={subtitle}>
      <div className={s.container}>
        <FieldState state={state} dispatch={dispatch} />
        <FieldCity state={state} dispatch={dispatch} />
        <FieldStreet state={state} dispatch={dispatch} />
        <AddressList state={state} dispatch={dispatch} />
        <div>
          <Button
            width="fluid"
            variant={state.postalGuide?.cep?.length > 0 ? 'insurance' : 'disabled'}
            styles="primary"
            key={buttonLabel}
            onClick={handleSelectedAddress}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
