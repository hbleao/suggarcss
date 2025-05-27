import React from "react";
import { BannerBody } from "../../../src/components";

export default {
  title: "Components/BannerBody",
  component: BannerBody,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultBanner = () => (
  <BannerBody
    title="Título do Banner"
    subtitle="Subtítulo do banner com informações adicionais"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
  />
);

export const WithoutSubtitle = () => (
  <BannerBody
    title="Banner sem Subtítulo"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
  />
);

export const WithoutText = () => (
  <BannerBody
    title="Banner sem Texto"
    subtitle="Apenas com título e subtítulo, sem texto adicional"
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
  />
);

export const WithoutImage = () => (
  <BannerBody
    title="Banner sem Imagem"
    subtitle="Este banner não possui imagem"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
  />
);

export const WithoutButtons = () => (
  <BannerBody
    title="Banner sem Botões"
    subtitle="Este banner não possui botões de ação"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
  />
);

export const WithMultipleButtons = () => (
  <BannerBody
    title="Banner com Múltiplos Botões"
    subtitle="Este banner possui mais de um botão de ação"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Botão Primário",
        href: "#",
        variant: "primary"
      },
      {
        label: "Botão Secundário",
        href: "#",
        variant: "secondary"
      }
    ]}
  />
);

export const WithCustomBackground = () => (
  <BannerBody
    title="Banner com Fundo Personalizado"
    subtitle="Este banner possui uma cor de fundo personalizada"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
    backgroundColor="#f0f7ff"
  />
);

export const WithImageOnRight = () => (
  <BannerBody
    title="Banner com Imagem à Direita"
    subtitle="Este banner possui a imagem posicionada à direita"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    image={{
      src: "https://via.placeholder.com/600x400",
      alt: "Imagem do banner"
    }}
    buttons={[
      {
        label: "Saiba mais",
        href: "#",
        variant: "primary"
      }
    ]}
    imagePosition="right"
  />
);
