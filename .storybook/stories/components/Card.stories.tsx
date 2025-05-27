import React from "react";
import { Card, Typography } from "../../../src/components";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultCard = () => (
  <Card>
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card Padrão</Typography>
      <Typography variant="body1">Este é um card básico com conteúdo simples.</Typography>
    </div>
  </Card>
);

export const WithShadow = () => (
  <Card shadow>
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Sombra</Typography>
      <Typography variant="body1">Este card possui uma sombra para dar efeito de elevação.</Typography>
    </div>
  </Card>
);

export const WithBorder = () => (
  <Card border>
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Borda</Typography>
      <Typography variant="body1">Este card possui uma borda para delimitar seu conteúdo.</Typography>
    </div>
  </Card>
);

export const WithCustomBorderRadius = () => (
  <Card borderRadius="16px">
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Borda Arredondada Personalizada</Typography>
      <Typography variant="body1">Este card possui um raio de borda personalizado de 16px.</Typography>
    </div>
  </Card>
);

export const WithCustomBackground = () => (
  <Card backgroundColor="#f0f7ff">
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Fundo Personalizado</Typography>
      <Typography variant="body1">Este card possui uma cor de fundo personalizada.</Typography>
    </div>
  </Card>
);

export const WithCustomWidth = () => (
  <Card width="300px">
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Largura Fixa</Typography>
      <Typography variant="body1">Este card possui uma largura fixa de 300px.</Typography>
    </div>
  </Card>
);

export const WithCustomHeight = () => (
  <Card height="200px">
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Altura Fixa</Typography>
      <Typography variant="body1">Este card possui uma altura fixa de 200px.</Typography>
    </div>
  </Card>
);

export const WithHoverEffect = () => (
  <Card hoverEffect>
    <div style={{ padding: "20px" }}>
      <Typography variant="title3">Card com Efeito Hover</Typography>
      <Typography variant="body1">Passe o mouse sobre este card para ver o efeito de hover.</Typography>
    </div>
  </Card>
);

export const WithCustomStyles = () => (
  <Card 
    style={{ 
      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      color: "white",
      transition: "transform 0.3s ease",
      cursor: "pointer"
    }}
    onClick={() => alert("Card clicado!")}
  >
    <div style={{ padding: "20px" }}>
      <Typography variant="title3" style={{ color: "white" }}>Card Personalizado</Typography>
      <Typography variant="body1" style={{ color: "white" }}>Este card possui estilos personalizados e é clicável.</Typography>
    </div>
  </Card>
);
