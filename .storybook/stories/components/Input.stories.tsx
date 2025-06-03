import React, { useState } from "react";
import { Input } from "../../../src/components";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Nome completo"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const OutlinedInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Nome completo"
      variant="outlined"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithHelperText = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Email"
      helperText="Digite seu email principal"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Senha"
      errorMessage="A senha deve ter pelo menos 8 caracteres"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const DisabledInput = () => (
  <Input
    label="CPF"
    disabled
    value="123.456.789-00"
  />
);

export const LoadingInput = () => (
  <Input
    label="CEP"
    isLoading
    value="12345-678"
  />
);

export const FluidWidthInput = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%" }}>
      <Input
        label="Endereço completo"
        width="fluid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const BasicInputs = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Input label="Texto" />
    <Input label="Email" />
    <Input label="Senha" />
    <Input label="Número" />
    <Input label="Telefone" />
    <Input label="Data" />
  </div>
);
