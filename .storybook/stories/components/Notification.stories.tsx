import React from "react";
import { Notification } from "../../../src/components";

export default {
  title: "Components/Notification",
  component: Notification,
  parameters: {
    layout: 'padded',
  },
};

// Ícones para os exemplos
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <title>Ícone de informação</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <title>Ícone de sucesso</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13l-2 2 5 5 7-7-2-2-5 5-3-3z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <title>Ícone de atenção</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v6h2V7h-2zm0 8v2h2v-2h-2z"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <title>Ícone de erro</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.71-9.71l2.12-2.12L12 10.59l2.59-2.59 2.12 2.12L14.12 12l2.59 2.59-2.12 2.12L12 14.12l-2.59 2.59-2.12-2.12L9.88 12 7.29 9.41z"/>
  </svg>
);

export const DefaultNotification = () => (
  <Notification
    variant="default"
    icon={<InfoIcon />}
    title="Notificação padrão"
    description="Esta é uma notificação padrão com informações importantes."
  />
);

export const OutlinedNotification = () => (
  <Notification
    variant="outlined"
    icon={<InfoIcon />}
    title="Notificação com borda"
    description="Esta é uma notificação com estilo outlined."
  />
);

export const InformationNotification = () => (
  <Notification
    variant="information"
    icon={<InfoIcon />}
    title="Informação"
    description="Esta é uma notificação informativa com detalhes importantes."
  />
);

export const AttentionNotification = () => (
  <Notification
    variant="attention"
    icon={<WarningIcon />}
    title="Atenção"
    description="Esta notificação alerta sobre algo que requer sua atenção."
  />
);

export const SuccessNotification = () => (
  <Notification
    variant="success"
    icon={<SuccessIcon />}
    title="Sucesso"
    description="Operação realizada com sucesso!"
  />
);

export const ErrorNotification = () => (
  <Notification
    variant="error"
    icon={<ErrorIcon />}
    title="Erro"
    description="Ocorreu um erro ao processar sua solicitação."
  />
);

export const NotificationWithLink = () => (
  <Notification
    variant="information"
    icon={<InfoIcon />}
    title="Notificação com link"
    description="Esta notificação contém um link para mais informações."
    link={{
      label: "Saiba mais",
      href: "https://example.com"
    }}
  />
);

export const MultipleNotifications = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Notification
      variant="information"
      icon={<InfoIcon />}
      title="Informação"
      description="Notificação informativa."
    />
    <Notification
      variant="success"
      icon={<SuccessIcon />}
      title="Sucesso"
      description="Notificação de sucesso."
    />
    <Notification
      variant="attention"
      icon={<WarningIcon />}
      title="Atenção"
      description="Notificação de atenção."
    />
    <Notification
      variant="error"
      icon={<ErrorIcon />}
      title="Erro"
      description="Notificação de erro."
    />
  </div>
);
