'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, Input, Typography } from '@/components';

import s from './styles.module.scss';

import { PetSelection, Spacing } from '@/components';
import { useTracking } from '@/hooks';
import { useAquisitionStore } from '@/store';
import { sanitize } from '@/utils';

export const FormPetSelection = () => {
  const { setPet, data } = useAquisitionStore((state) => state);
  const [petName, setName] = useState('');
  const [petType, setPetType] = useState('cat');
  const router = useRouter();
  useTracking();

  function getInitialDataFromSessionStorage() {
    setName(data.pet.name);
    setPetType(data.pet.type);
  }

  function handleNextScreen() {
    setPet({
      name: petName,
      type: petType
    });
    router.push('/loja/petlove/cep');
  }

  useEffect(() => {
    getInitialDataFromSessionStorage();
  }, [data]);

  return (
    <div className={s.form}>
      <Spacing top={3.2} />
      <Typography
        id="gtm-title"
        variant="title3"
        weight="bold"
        className={s.title}
      >
        Proteja agora quem você ama!
      </Typography>
      <Spacing top={1.6} />
      <Typography
        variant="body1"
        color="neutral-600"
        weight="regular"
        className={s.subtitle}
      >
        Para encontrar o plano ideal, precisamos de alguns dados do seu pet.
      </Typography>
      <Spacing top={3.2} />
      <Input
        name="petName"
        label="Nome do pet"
        autoFocus
        className={s.input}
        value={petName}
        onChange={e => setName(sanitize(e.target.value))}
        width="fluid"
      />
      <Spacing top={4} />
      <PetSelection
        title="Seu pet é gato ou cachorro?"
        petType={petType}
        onClick={(value) => setPetType(value)}
      />
      <Button
        title="continuar"
        variant="insurance"
        width="fluid"
        disabled={petName.length < 3}
        onClick={handleNextScreen}
      >
        Continuar
      </Button>
    </div>
  );
};
