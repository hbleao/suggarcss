import React from "react";
import { BannerHero } from "../../../src/components";

export default {
  title: "Components/BannerHero",
  component: BannerHero,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultBanner = () => (
  <BannerHero
    bgColor="neutral-100"
    title="Título Principal do Banner"
    subtitle="Subtítulo do Banner"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
    image={
      <div style={{ 
        width: "100%", 
        height: "300px", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "8px" 
      }}>
        Imagem do Banner
      </div>
    }
  />
);

export const WithLogo = () => (
  <BannerHero
    bgColor="neutral-100"
    title="Banner com Logo"
    subtitle="Subtítulo do Banner"
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
    logo={
      <div style={{ 
        width: "120px", 
        height: "40px", 
        backgroundColor: "#2196f3", 
        color: "white", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "4px",
        marginBottom: "16px"
      }}>
        Logo
      </div>
    }
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "primary" },
    ]}
    image={
      <div style={{ 
        width: "100%", 
        height: "300px", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "8px" 
      }}>
        Imagem do Banner
      </div>
    }
  />
);

export const WithStores = () => (
  <BannerHero
    bgColor="neutral-100"
    title="Baixe Nosso Aplicativo"
    subtitle="Disponível nas lojas"
    text="Tenha acesso a todos os nossos serviços na palma da sua mão. Baixe agora e aproveite todos os benefícios."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
    ]}
    stores={[
      { 
        icon: (
          <div style={{ 
            width: "120px", 
            height: "40px", 
            backgroundColor: "#000", 
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            borderRadius: "4px",
            marginRight: "8px"
          }}>
            App Store
          </div>
        ), 
        href: "https://apple.com",
        name: "App Store"
      },
      { 
        icon: (
          <div style={{ 
            width: "120px", 
            height: "40px", 
            backgroundColor: "#4caf50", 
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            borderRadius: "4px"
          }}>
            Play Store
          </div>
        ), 
        href: "https://play.google.com",
        name: "Play Store"
      }
    ]}
    image={
      <div style={{ 
        width: "100%", 
        height: "300px", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "8px" 
      }}>
        Imagem do Aplicativo
      </div>
    }
  />
);

export const WithoutImage = () => (
  <BannerHero
    bgColor="neutral-100"
    title="Banner sem Imagem"
    subtitle="Apenas conteúdo textual"
    text="Este banner não possui imagem e foca apenas no conteúdo textual e nos botões de ação."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const WithoutButtons = () => (
  <BannerHero
    bgColor="neutral-100"
    title="Banner sem Botões"
    subtitle="Apenas conteúdo informativo"
    text="Este banner não possui botões de ação e serve apenas para apresentar informações ao usuário."
    image={
      <div style={{ 
        width: "100%", 
        height: "300px", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "8px" 
      }}>
        Imagem do Banner
      </div>
    }
  />
);

export const CustomBackground = () => (
  <BannerHero
    bgColor="primary"
    title="Banner com Fundo Personalizado"
    subtitle="Utilizando cores do tema"
    text="Este banner utiliza uma cor de fundo personalizada definida pelo sistema de design."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
    image={
      <div style={{ 
        width: "100%", 
        height: "300px", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: "8px" 
      }}>
        Imagem do Banner
      </div>
    }
  />
);
