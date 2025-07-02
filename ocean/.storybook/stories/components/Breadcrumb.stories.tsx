import React from "react";
import { Breadcrumb } from "../../../src/components";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
};

export const Default = () => (
  <Breadcrumb
    breadcrumbList={[
      { label: "Início", link: "/" },
      { label: "Produtos", link: "/produtos" },
      { label: "Detalhes do Produto", link: "/produtos/detalhes" },
    ]}
  />
);

export const SingleItem = () => (
  <Breadcrumb
    breadcrumbList={[
      { label: "Início", link: "/" },
    ]}
  />
);

export const LongPath = () => (
  <Breadcrumb
    breadcrumbList={[
      { label: "Início", link: "/" },
      { label: "Categorias", link: "/categorias" },
      { label: "Eletrônicos", link: "/categorias/eletronicos" },
      { label: "Computadores", link: "/categorias/eletronicos/computadores" },
      { label: "Notebooks", link: "/categorias/eletronicos/computadores/notebooks" },
      { label: "Detalhes", link: "/categorias/eletronicos/computadores/notebooks/detalhes" },
    ]}
  />
);
