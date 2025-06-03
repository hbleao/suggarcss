import React from "react";
import { BannerDouble } from "../../../src/components";

export default {
  title: "Components/BannerDouble",
  component: BannerDouble,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultBannerDouble = () => (
  <BannerDouble
    banners={[
      {
        title: "Oferta Especial",
        subtitle: "Até 50% de desconto",
        link: { label: "Ver ofertas", href: "/ofertas" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/3f51b5/ffffff?text=Oferta+Especial)", 
          alt: "Oferta especial" 
        },
        bgColor: "primary",
        titleColor: "neutral-0",
        subtitleColor: "neutral-100"
      },
      {
        title: "Novos Produtos",
        subtitle: "Confira os lançamentos",
        link: { label: "Explorar", href: "/lancamentos" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/009688/ffffff?text=Novos+Produtos)", 
          alt: "Novos produtos" 
        },
        bgColor: "secondary",
        titleColor: "neutral-0",
        subtitleColor: "neutral-100"
      }
    ]}
  />
);

export const WithoutSubtitles = () => (
  <BannerDouble
    banners={[
      {
        title: "Promoção Relâmpago",
        link: { label: "Aproveitar", href: "/promocao" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/f44336/ffffff?text=Promoção+Relâmpago)", 
          alt: "Promoção relâmpago" 
        },
        bgColor: "error",
        titleColor: "neutral-0"
      },
      {
        title: "Produtos Exclusivos",
        link: { label: "Conhecer", href: "/exclusivos" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/4caf50/ffffff?text=Produtos+Exclusivos)", 
          alt: "Produtos exclusivos" 
        },
        bgColor: "success",
        titleColor: "neutral-0"
      }
    ]}
  />
);

export const CustomColors = () => (
  <BannerDouble
    banners={[
      {
        title: "Seguro Auto",
        subtitle: "Proteção completa para seu veículo",
        link: { label: "Cotar agora", href: "/seguro-auto" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/ff9800/ffffff?text=Seguro+Auto)", 
          alt: "Seguro auto" 
        },
        bgColor: "warning",
        titleColor: "neutral-900",
        subtitleColor: "neutral-800"
      },
      {
        title: "Seguro Residencial",
        subtitle: "Proteção para sua casa",
        link: { label: "Saiba mais", href: "/seguro-residencial" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/9c27b0/ffffff?text=Seguro+Residencial)", 
          alt: "Seguro residencial" 
        },
        bgColor: "primary",
        titleColor: "neutral-0",
        subtitleColor: "neutral-100"
      }
    ]}
  />
);

export const SingleBanner = () => (
  <BannerDouble
    banners={[
      {
        title: "Oferta Exclusiva",
        subtitle: "Apenas para clientes especiais",
        link: { label: "Ver detalhes", href: "/oferta-exclusiva" },
        image: { 
          src: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://via.placeholder.com/600x300/2196f3/ffffff?text=Oferta+Exclusiva)", 
          alt: "Oferta exclusiva" 
        },
        bgColor: "primary",
        titleColor: "neutral-0",
        subtitleColor: "neutral-100"
      }
    ]}
  />
);
