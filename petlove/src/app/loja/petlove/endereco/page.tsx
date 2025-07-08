'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import './styles.scss';

import {
  Button,
  Checkbox,
  HeaderAcquisitionFlow,
  Input,
  ProgressBar,
  Typography,
} from '@/components';
import { useTracking } from '@/hooks/useTracking';
import { useAquisitionStore } from '@/store';
import { onlyNumbers, sanitize } from '@/utils';

export default function ScreenAddress() {
  useTracking();
  const router = useRouter();
  const { address } = useAquisitionStore((state) => state.data);
  const setAddress = useAquisitionStore((state) => state.setAddress);
  const [number, setNumber] = useState<string>('');
  const [addressWhitoutNumber, setAddressWhitoutNumber] =
    useState<boolean>(false);
  const [complement, setComplement] = useState<string>('');

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

  function handleCheckBox() {
    setNumber('');
    setAddressWhitoutNumber((oldState) => !oldState);
  }

  useEffect(() => {
    getInitialDataFromSessionStorage();
  }, [address]);

  return (
    <>
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
          value={sanitize(address.cep)}
        />
        <Input
          name=""
          width="fluid"
          label="Rua, Avenida, alameda"
          disabled
          value={sanitize(address.street)}
        />
        <Input
          name="numero"
          width="fluid"
          label="Número"
          disabled={addressWhitoutNumber}
          value={number}
          onChange={(e) => setNumber(sanitize(onlyNumbers(e.target.value)))}
        />
        <Checkbox
          title="meu-endereco-nao-tem-numero"
          label="Meu endereço não tem número"
          variant={addressWhitoutNumber ? 'checked' : 'default'}
          onClick={() => handleCheckBox()}
        />
        <Input
          name="complemento"
          width="fluid"
          label="Complemento"
          value={complement}
          onChange={(e) => setComplement(sanitize(e.target.value))}
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
          disabled={addressWhitoutNumber ? !addressWhitoutNumber : number.length < 1}
          width="fluid"
          onClick={handleNextStep}
        >
          Continuar
        </Button>
      </main>
    </>
  );
}
