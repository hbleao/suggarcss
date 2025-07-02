import React from "react";
import { CardIcon } from "../../../src/components";

export default {
  title: "Components/CardIcon",
  component: CardIcon,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultCardIcon = () => (
  <CardIcon
    icon={
      <div style={{ 
        width: "48px", 
        height: "48px", 
        backgroundColor: "#2196f3", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "white",
        fontSize: "24px"
      }}>
        ★
      </div>
    }
    title="Título do Card"
    description="Descrição detalhada do card com informações relevantes para o usuário."
  />
);

export const WithPreTitle = () => (
  <CardIcon
    icon={
      <div style={{ 
        width: "48px", 
        height: "48px", 
        backgroundColor: "#4caf50", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "white",
        fontSize: "24px"
      }}>
        ✓
      </div>
    }
    preTitle="Pré-título"
    title="Título do Card"
    description="Descrição detalhada do card com informações relevantes para o usuário."
  />
);

export const AsLink = () => (
  <CardIcon
    variant="link"
    href="#"
    icon={
      <div style={{ 
        width: "48px", 
        height: "48px", 
        backgroundColor: "#ff9800", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "white",
        fontSize: "24px"
      }}>
        →
      </div>
    }
    title="Card Clicável"
    description="Este card funciona como um link e pode ser clicado inteiramente."
  />
);

export const WithoutIcon = () => (
  <CardIcon
    title="Card sem Ícone"
    description="Este card não possui um ícone, apenas título e descrição."
  />
);

export const WithoutDescription = () => (
  <CardIcon
    icon={
      <div style={{ 
        width: "48px", 
        height: "48px", 
        backgroundColor: "#9c27b0", 
        borderRadius: "50%", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "white",
        fontSize: "24px"
      }}>
        i
      </div>
    }
    title="Card sem Descrição"
  />
);

export const CustomStyling = () => (
  <div style={{ backgroundColor: "#f5f5f5", padding: "24px" }}>
    <CardIcon
      style={{ 
        backgroundColor: "white", 
        padding: "24px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "300px"
      }}
      icon={
        <div style={{ 
          width: "64px", 
          height: "64px", 
          backgroundColor: "#3f51b5", 
          borderRadius: "8px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "white",
          fontSize: "32px"
        }}>
          ★
        </div>
      }
      preTitle="DESTAQUE"
      title="Card Personalizado"
      description="Este card possui estilos personalizados para se destacar na interface."
    />
  </div>
);
