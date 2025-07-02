import React, { useState } from "react";
import { Dropdown } from "../../../src/components";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
};

const options = [
  { label: "Seguro Auto", value: "auto" },
  { label: "Seguro Residencial", value: "residencial" },
  { label: "Seguro Vida", value: "vida" },
  { label: "Seguro Viagem", value: "viagem" },
  { label: "Seguro Empresarial", value: "empresarial" },
];

export const DefaultDropdown = () => {
  const [value, setValue] = useState("");
  return (
    <Dropdown
      label="Selecione um produto"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
};

export const OutlinedDropdown = () => {
  const [value, setValue] = useState("");
  return (
    <Dropdown
      label="Selecione um produto"
      variant="outlined"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithHelperText = () => {
  const [value, setValue] = useState("");
  return (
    <Dropdown
      label="Selecione um produto"
      helperText="Escolha o produto que melhor atende suas necessidades"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState("");
  return (
    <Dropdown
      label="Selecione um produto"
      errorMessage="Este campo é obrigatório"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
};

export const DisabledDropdown = () => (
  <Dropdown
    label="Selecione um produto"
    options={options}
    disabled
    value=""
  />
);

export const LoadingDropdown = () => (
  <Dropdown
    label="Selecione um produto"
    options={options}
    isLoading
    value=""
  />
);

export const ReadOnlyDropdown = () => (
  <Dropdown
    label="Produto selecionado"
    options={options}
    readOnly
    value="vida"
  />
);

export const FluidWidthDropdown = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%" }}>
      <Dropdown
        label="Selecione um produto"
        width="fluid"
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
