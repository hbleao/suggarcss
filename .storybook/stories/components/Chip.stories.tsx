import React from "react";
import { Chip } from "../../../src/components";

export default {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: 'centered',
  },
};

export const DefaultChip = () => (
  <Chip>Chip padrão</Chip>
);

export const SelectedChip = () => (
  <Chip variant="selected">Chip selecionado</Chip>
);

export const ChipGroup = () => (
  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <Chip>Seguro Auto</Chip>
    <Chip>Seguro Vida</Chip>
    <Chip variant="selected">Seguro Residencial</Chip>
    <Chip>Seguro Viagem</Chip>
  </div>
);
