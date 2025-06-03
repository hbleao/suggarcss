import React from "react";
import { CardContent } from "../../../src/components";

export default {
  title: "Components/CardContent",
  component: CardContent,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultCardContent = () => (
  <CardContent
    title="Seguro Auto"
    description="Proteção completa para seu veículo com as melhores coberturas do mercado e assistência 24 horas."
    image={{
      url: "https://via.placeholder.com/500x300/3f51b5/ffffff?text=Seguro+Auto",
      alt: "Seguro Auto"
    }}
    links={[
      { label: "Saiba mais", href: "/seguro-auto" },
      { label: "Contratar", href: "/seguro-auto/contratar" }
    ]}
  />
);

export const WithoutImage = () => (
  <CardContent
    title="Plano de Saúde"
    description="Cuide da sua saúde e da sua família com nossos planos personalizados e rede credenciada em todo o país."
    links={[
      { label: "Ver planos", href: "/planos-saude" }
    ]}
  />
);

export const WithoutLinks = () => (
  <CardContent
    title="Investimentos"
    description="As melhores opções de investimento para seu perfil, com rentabilidade acima da média do mercado."
    image={{
      url: "https://via.placeholder.com/500x300/4caf50/ffffff?text=Investimentos",
      alt: "Investimentos"
    }}
  />
);

export const TitleOnly = () => (
  <CardContent
    title="Cartão de Crédito"
  />
);

export const DescriptionOnly = () => (
  <CardContent
    description="Conheça nossas soluções financeiras personalizadas para o seu negócio. Oferecemos as melhores taxas do mercado e atendimento especializado."
  />
);

export const MultipleLinks = () => (
  <CardContent
    title="Seguro Residencial"
    description="Proteção completa para sua casa contra incêndio, roubo, danos elétricos e muito mais."
    image={{
      url: "https://via.placeholder.com/500x300/ff9800/ffffff?text=Seguro+Residencial",
      alt: "Seguro Residencial"
    }}
    links={[
      { label: "Coberturas", href: "/seguro-residencial/coberturas" },
      { label: "Vantagens", href: "/seguro-residencial/vantagens" },
      { label: "Contratar", href: "/seguro-residencial/contratar" }
    ]}
  />
);

export const CustomStyling = () => (
  <div style={{ backgroundColor: "#f5f5f5", padding: "24px" }}>
    <CardContent
      style={{ 
        maxWidth: "350px", 
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}
      title="Oferta Especial"
      description="Aproveite nossa oferta exclusiva por tempo limitado. Condições especiais para novos clientes."
      image={{
        url: "https://via.placeholder.com/500x300/9c27b0/ffffff?text=Oferta+Especial",
        alt: "Oferta Especial"
      }}
      links={[
        { label: "Aproveitar agora", href: "/oferta-especial" }
      ]}
    />
  </div>
);
