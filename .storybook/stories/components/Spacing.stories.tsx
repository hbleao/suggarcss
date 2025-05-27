import React from "react";
import { Spacing } from "../../../src/components";

export default {
  title: "Components/Spacing",
  component: Spacing,
  parameters: {
    layout: 'padded',
  },
};

// Componente auxiliar para demonstrar o espaçamento
const Box = ({ children, color = "#e0e0ff" }) => (
  <div 
    style={{ 
      padding: "1rem", 
      background: color, 
      borderRadius: "4px",
      textAlign: "center" 
    }}
  >
    {children}
  </div>
);

export const VerticalSpacing = () => (
  <div>
    <Box>Primeiro elemento</Box>
    <Spacing top="1rem" />
    <Box>Segundo elemento</Box>
    <Spacing top="2rem" />
    <Box>Terceiro elemento</Box>
    <Spacing top="3rem" />
    <Box>Quarto elemento</Box>
  </div>
);

export const HorizontalSpacing = () => (
  <div style={{ display: "flex" }}>
    <Box>Primeiro</Box>
    <Spacing left="1rem" />
    <Box>Segundo</Box>
    <Spacing left="2rem" />
    <Box>Terceiro</Box>
    <Spacing left="3rem" />
    <Box>Quarto</Box>
  </div>
);

export const CombinedSpacing = () => (
  <div>
    <Box>Elemento superior</Box>
    <Spacing top="2rem" bottom="2rem" />
    <div style={{ display: "flex" }}>
      <Box>Esquerda</Box>
      <Spacing left="2rem" right="2rem" />
      <Box>Direita</Box>
    </div>
    <Spacing top="2rem" bottom="2rem" />
    <Box>Elemento inferior</Box>
  </div>
);

export const InlineSpacing = () => (
  <div>
    <span>Texto inicial</span>
    <Spacing inline left="1rem" right="1rem" />
    <span>Texto com espaçamento lateral</span>
    <Spacing inline left="1rem" right="1rem" />
    <span>Texto final</span>
  </div>
);

export const NumericValues = () => (
  <div>
    <Box>Elemento com valor numérico</Box>
    <Spacing top={1.5} />
    <Box>Espaçamento de 1.5rem acima</Box>
    <Spacing top={3} />
    <Box>Espaçamento de 3rem acima</Box>
  </div>
);

export const WithCustomStyles = () => (
  <div>
    <Box>Primeiro elemento</Box>
    <Spacing 
      top="2rem" 
      style={{ 
        border: "1px dashed #ccc", 
        background: "#f5f5f5" 
      }} 
    />
    <Box>Segundo elemento</Box>
  </div>
);

export const SpacingInGrid = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
    <Box>Item 1</Box>
    <Spacing left="1rem" right="1rem" />
    <Box>Item 2</Box>
    <Spacing left="1rem" right="1rem" />
    <Box>Item 3</Box>
    <Spacing top="1rem" />
    <Box>Item 4</Box>
    <Spacing left="1rem" right="1rem" top="1rem" />
    <Box>Item 5</Box>
    <Spacing left="1rem" right="1rem" top="1rem" />
    <Box>Item 6</Box>
  </div>
);
