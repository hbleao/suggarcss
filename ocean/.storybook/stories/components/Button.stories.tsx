import React from "react";
import { Button } from "../../../src/components";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export const BasicButton = () => (
  <Button>Botão Básico</Button>
);

export const PrimaryButton = () => (
  <Button variant="insurance" styles="primary">Primário</Button>
);

export const SecondaryButton = () => (
  <Button variant="insurance" styles="secondary">Secundário</Button>
);

export const GhostButton = () => (
  <Button variant="insurance" styles="ghost">Ghost</Button>
);

export const SmallButton = () => (
  <Button variant="insurance" size="small">Pequeno</Button>
);

export const LargeButton = () => (
  <Button variant="insurance" size="large">Grande</Button>
);

export const DisabledButton = () => (
  <Button variant="insurance" disabled>Desabilitado</Button>
);

export const LoadingButton = () => (
  <Button variant="insurance" isLoading>Carregando</Button>
);

export const FluidButton = () => (
  <div style={{ width: "100%" }}>
    <Button variant="insurance" width="fluid">Fluido (100% largura)</Button>
  </div>
);

export const InsuranceButton = () => (
  <Button variant="insurance">Seguro</Button>
);

export const BankingButton = () => (
  <Button variant="banking">Banco</Button>
);

export const HealthButton = () => (
  <Button variant="health">Saúde</Button>
);

export const NegativeButton = () => (
  <Button variant="negative">Negativo</Button>
);

export const ButtonShowcase = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", gap: "16px" }}>
      <Button variant="insurance" styles="primary">Primário</Button>
      <Button variant="insurance" styles="secondary">Secundário</Button>
      <Button variant="insurance" styles="ghost">Ghost</Button>
    </div>
    <div style={{ display: "flex", gap: "16px" }}>
      <Button variant="insurance">Seguro</Button>
      <Button variant="banking">Banco</Button>
      <Button variant="health">Saúde</Button>
      <Button variant="negative">Negativo</Button>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Button variant="insurance" size="small">Pequeno</Button>
      <Button variant="insurance" size="large">Grande</Button>
    </div>
    <div style={{ display: "flex", gap: "16px" }}>
      <Button variant="insurance" disabled>Desabilitado</Button>
      <Button variant="insurance" isLoading>Carregando</Button>
    </div>
  </div>
);
