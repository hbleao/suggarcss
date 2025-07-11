'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import './styles.scss';

import {
  Button,
  Checkbox,
  CustomData,
  HeaderAcquisitionFlow,
  Input,
  ProgressBar,
  Typography,
} from '@/components';
import { useTracking } from '@/hooks/useTracking';
import { useAquisitionStore } from '@/store';
import { sanitize } from '@/utils';

export default function ScreenAddress() {
  useTracking();
  const router = useRouter();
  const { address } = useAquisitionStore((state) => state.data);
  const setAddress = useAquisitionStore((state) => state.setAddress);
  const [number, setNumber] = useState<string>('');
  const [addressWhitoutNumber, setAddressWhitoutNumber] =
    useState<boolean>(false);
  const [complement, setComplement] = useState<string>('');
  const MAX_NUMBER_LENGTH = 6;
  const maxNumberLengthError = number.length > MAX_NUMBER_LENGTH;

  function getInitialDataFromSessionStorage() {
    setComplement(address.complement);
    setNumber(address.number);
  }

  function handleNextStep() {
    setAddress({
      ...address,
      number: number,
      complement: complement,
    });
    router.push('/loja/petlove/planos');
  }

  function handleSetNumber(value: string) {
    const sanitizedValue = sanitize.number(value);
    setNumber(sanitizedValue);
  }

  function handleCheckBox() {
    setNumber('');
    setAddressWhitoutNumber((oldState) => !oldState);
  }

  useEffect(() => {
    getInitialDataFromSessionStorage();
  }, [address]);

  return (
    <>
      <CustomData
        pageName="Cuidamos do seu pet onde ele estiver"
        category='aquisicao'
        product='petlove-saude'
        subproduct=''
        funnel='short-form'
        vertical='servico'
        cpf=''
      />
      <HeaderAcquisitionFlow
        goBackLink="/loja/petlove/cep"
        hasShoppingCart={false}
      />
      <ProgressBar initialValue={40} value={60} />
      <main className="container">
        <Typography
          id="gtm-title"
          variant="title4"
          weight="bold"
          className="title"
        >
          Cuidamos do seu pet onde ele estiver
        </Typography>
        <Typography variant="body1" color="neutral-800" className="subtitle">
          Agora, informe a região onde seu pet mora para encontrarmos o plano
          ideal.
        </Typography>

        <Input
          name="cep"
          width="fluid"
          label="CEP"
          disabled
          value={address.cep}
        />
        <Input
          name=""
          width="fluid"
          label="Rua, Avenida, alameda"
          disabled
          value={address.street}
        />
        <Input
          name="numero"
          width="fluid"
          label="Número"
          disabled={addressWhitoutNumber}
          value={number}
          onChange={(e) => handleSetNumber(e.target.value)}
          errorMessage={maxNumberLengthError ? 'Limite de 6 caracteres atingido' : ''}
        />
        <Checkbox
          title="meu-endereco-nao-tem-numero"
          label="Meu endereço não tem número"
          variant={addressWhitoutNumber ? 'checked' : 'default'}
          onClick={() => handleCheckBox()}
        />
        <Input
          name="complemento (opcional)"
          width="fluid"
          label="Complemento"
          value={complement}
          onChange={(e) => setComplement(sanitize.string(e.target.value))}
        />
        <Input
          name="cidade"
          width="fluid"
          label="Cidade"
          disabled
          value={address.city}
        />
        <Input
          name="estado"
          width="fluid"
          label="Estado"
          disabled
          value={address.state}
        />

        <Button
          variant='insurance'
          disabled={addressWhitoutNumber || maxNumberLengthError ? !addressWhitoutNumber : number.length < 1}
          width="fluid"
          onClick={handleNextStep}
        >
          Continuar
        </Button>
      </main>
    </>
  );
}
