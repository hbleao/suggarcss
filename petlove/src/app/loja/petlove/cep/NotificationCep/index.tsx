import Image from 'next/image';

import './styles.scss';

import IcAlertSVG from '@/assets/icons/ic-alert.svg';
import IcResidenceSVG from '@/assets/icons/ic-residence.svg';
import IcSadSVG from '@/assets/icons/ic-sad.svg';
import { Notification } from '@/components';

import type { NotificationCepProps } from './types';

export const NotificationCep = ({
  cep,
  street,
  neighborhood,
  stateCode,
  error,
  coverage,
}: NotificationCepProps) => {
  let notificationType: 'eligible' | 'notEligible' | 'outService' =
    'notEligible';
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const notification: any = {
    eligible: {
      variant: 'outlined',
      icon: IcResidenceSVG,
      message: {
        title: `${street}`,
        description: `${cep} - ${neighborhood}/${stateCode}`,
      },
    },
    notEligible: {
      variant: 'attention',
      icon: IcSadSVG,
      message: {
        title: 'Ainda não chegamos na sua região',
        description:
          'Clique no para ser avisado quando chegarmos.',
      },
      link: {
        label: 'Clique aqui',
        href: "https://materiais.petlove.com.br/estamos-chegando"
      }
    },
    outService: {
      variant: 'error',
      icon: IcAlertSVG,
      message: {
        title: 'Serviço indisponível',
        description:
          'No momento nosso serviço está indíponivel, tente novamente mais tarde.',
      },
    },
  };

  if (error) {
    notificationType = 'outService';
  } else if (!error && coverage) {
    notificationType = 'eligible';
  } else if (!error && !coverage) {
    notificationType = 'notEligible';
  } else if (!error && !cep) {
    notificationType = 'notEligible';
  }

  return (
    <Notification
      className="notificationContainer"
      variant={notification[notificationType].variant}
      icon={
        <Image
          src={notification[notificationType].icon}
          width={24}
          height={24}
          alt=""
        />
      }
      title={notification[notificationType].message.title}
      description={notification[notificationType].message.description}
      link={{
        label: notification[notificationType]?.link?.label,
        href: notification[notificationType]?.link?.href
      }}
    />
  );
};
