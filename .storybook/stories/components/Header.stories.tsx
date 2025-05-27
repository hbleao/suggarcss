import React from "react";
import { Header } from "../../../src/components";

export default {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

const defaultMenu = {
  logo: {
    url: "#",
    alt: "Logo da empresa",
    image: "https://via.placeholder.com/120x40"
  },
  menuLinks: [
    { label: "Início", url: "#", target: "_self" },
    { label: "Produtos", url: "#", target: "_self" },
    { label: "Serviços", url: "#", target: "_self" },
    { label: "Sobre", url: "#", target: "_self" },
    { label: "Contato", url: "#", target: "_self" }
  ],
  loginButton: {
    label: "Entrar",
    url: "#"
  }
};

const defaultSubmenus = [
  {
    label: "Seguros",
    logo: {
      alt: "Seguros",
      target: "_self",
      url: "#",
      image: "https://via.placeholder.com/60x60"
    },
    categories: [
      {
        name: "Automóvel",
        links: [
          { label: "Seguro Auto", url: "#", target: "_self" },
          { label: "Seguro Moto", url: "#", target: "_self" },
          { label: "Seguro Caminhão", url: "#", target: "_self" }
        ]
      },
      {
        name: "Residencial",
        links: [
          { label: "Seguro Residencial", url: "#", target: "_self" },
          { label: "Seguro Condomínio", url: "#", target: "_self" },
          { label: "Seguro Incêndio", url: "#", target: "_self" }
        ]
      }
    ]
  },
  {
    label: "Serviços Financeiros",
    logo: {
      alt: "Serviços Financeiros",
      target: "_self",
      url: "#",
      image: "https://via.placeholder.com/60x60"
    },
    categories: [
      {
        name: "Investimentos",
        links: [
          { label: "Previdência", url: "#", target: "_self" },
          { label: "Consórcio", url: "#", target: "_self" },
          { label: "Capitalização", url: "#", target: "_self" }
        ]
      },
      {
        name: "Crédito",
        links: [
          { label: "Empréstimo", url: "#", target: "_self" },
          { label: "Financiamento", url: "#", target: "_self" },
          { label: "Cartão de Crédito", url: "#", target: "_self" }
        ]
      }
    ]
  }
];

export const DefaultHeader = () => (
  <Header 
    menu={defaultMenu}
    submenus={defaultSubmenus}
  />
);

export const WithoutLoginButton = () => (
  <Header 
    menu={{
      ...defaultMenu,
      loginButton: undefined
    }}
    submenus={defaultSubmenus}
  />
);

export const WithoutSubmenus = () => (
  <Header 
    menu={defaultMenu}
    submenus={[]}
  />
);

export const WithCustomLinks = () => (
  <Header 
    menu={{
      ...defaultMenu,
      menuLinks: [
        { label: "Produtos", url: "#", target: "_self" },
        { label: "Quem Somos", url: "#", target: "_self" },
        { label: "Blog", url: "#", target: "_self" },
        { label: "Contato", url: "#", target: "_self" }
      ]
    }}
    submenus={defaultSubmenus}
  />
);

export const WithExternalLinks = () => (
  <Header 
    menu={{
      ...defaultMenu,
      menuLinks: [
        { label: "Início", url: "#", target: "_self" },
        { label: "Produtos", url: "#", target: "_self" },
        { label: "Blog", url: "https://blog.example.com", target: "_blank" },
        { label: "Parceiros", url: "https://partners.example.com", target: "_blank" }
      ]
    }}
    submenus={defaultSubmenus}
  />
);
