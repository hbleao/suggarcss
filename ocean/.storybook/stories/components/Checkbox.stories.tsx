import React from "react";
import { Checkbox } from "../../../src/components";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
};

export const DefaultCheckbox = () => (
  <Checkbox label="Opção não marcada" />
);

export const CheckedCheckbox = () => (
  <Checkbox variant="checked" label="Opção marcada" />
);

export const DisabledCheckbox = () => (
  <Checkbox variant="disabled" label="Opção desabilitada" />
);

export const WithHTMLLabel = () => (
  <Checkbox label="Aceito os <strong>termos</strong> e <a href='#'>condições</a>" />
);

export const CheckboxGroup = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Checkbox label="Opção 1" />
    <Checkbox variant="checked" label="Opção 2 (selecionada)" />
    <Checkbox label="Opção 3" />
    <Checkbox variant="disabled" label="Opção 4 (desabilitada)" />
  </div>
);
