import React, { useState } from "react";
import { Textarea } from "../../../src/components";

export default {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultTextarea = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Descrição"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const OutlinedTextarea = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Descrição"
      variant="outlined"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithHelperText = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Descrição"
      helperText="Descreva com detalhes o seu problema"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Descrição"
      errorMessage="A descrição deve ter pelo menos 10 caracteres"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const DisabledTextarea = () => (
  <Textarea
    label="Descrição"
    disabled
    value="Este campo está desabilitado e não pode ser editado."
  />
);

export const CustomRows = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Descrição longa"
      rows={10}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const FluidWidthTextarea = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "100%" }}>
      <Textarea
        label="Descrição"
        width="fluid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
