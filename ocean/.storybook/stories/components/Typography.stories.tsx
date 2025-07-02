import React from "react";
import { Typography } from "../../../src/components";

export default {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: 'padded',
  },
};

export const TitleVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="title1" as="h1">Title 1 - Título principal</Typography>
    <Typography variant="title2" as="h2">Title 2 - Título secundário</Typography>
    <Typography variant="title3" as="h3">Title 3 - Título terciário</Typography>
    <Typography variant="title4" as="h4">Title 4 - Título quaternário</Typography>
    <Typography variant="title5" as="h5">Title 5 - Título quinário</Typography>
    <Typography variant="title6" as="h6">Title 6 - Título senário</Typography>
  </div>
);

export const BodyVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="body1" as="p">
      Body 1 - Texto de corpo principal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    </Typography>
    <Typography variant="body2" as="p">
      Body 2 - Texto de corpo secundário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    </Typography>
  </div>
);

export const OtherVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="caption" as="span">Caption - Texto de legenda</Typography>
    <Typography variant="label" as="label">Label - Texto de etiqueta</Typography>
    <Typography variant="overline" as="span">OVERLINE - TEXTO DE SOBREPOSIÇÃO</Typography>
    <Typography variant="button" as="span">BUTTON - TEXTO DE BOTÃO</Typography>
  </div>
);

export const WeightVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="body1" weight="light">Weight Light - Peso leve</Typography>
    <Typography variant="body1" weight="regular">Weight Regular - Peso regular</Typography>
    <Typography variant="body1" weight="medium">Weight Medium - Peso médio</Typography>
    <Typography variant="body1" weight="semibold">Weight Semibold - Peso semi-negrito</Typography>
    <Typography variant="body1" weight="bold">Weight Bold - Peso negrito</Typography>
  </div>
);

export const FontStyleVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="body1" fontStyle="normal">Font Style Normal - Estilo de fonte normal</Typography>
    <Typography variant="body1" fontStyle="italic">Font Style Italic - Estilo de fonte itálico</Typography>
  </div>
);

export const ColorVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography variant="body1" color="neutral-900">Color Neutral 900 (Default)</Typography>
    <Typography variant="body1" color="neutral-800">Color Neutral 800</Typography>
    <Typography variant="body1" color="neutral-700">Color Neutral 700</Typography>
    <Typography variant="body1" color="neutral-600">Color Neutral 600</Typography>
    <Typography variant="body1" color="neutral-500">Color Neutral 500</Typography>
    <Typography variant="body1" color="primary">Color Primary</Typography>
    <Typography variant="body1" color="secondary">Color Secondary</Typography>
    <Typography variant="body1" color="success">Color Success</Typography>
    <Typography variant="body1" color="error">Color Error</Typography>
    <Typography variant="body1" color="warning">Color Warning</Typography>
  </div>
);

export const CustomCombinations = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Typography 
      variant="title1" 
      weight="bold" 
      color="primary"
    >
      Título Principal em Destaque
    </Typography>
    <Typography 
      variant="body1" 
      fontStyle="italic" 
      color="neutral-600"
    >
      Texto descritivo em itálico com cor neutra.
    </Typography>
    <Typography 
      variant="caption" 
      weight="semibold" 
      color="secondary"
    >
      Legenda em destaque com cor secundária
    </Typography>
    <Typography 
      variant="overline" 
      weight="medium" 
      color="error"
    >
      ALERTA DE ERRO EM DESTAQUE
    </Typography>
  </div>
);
