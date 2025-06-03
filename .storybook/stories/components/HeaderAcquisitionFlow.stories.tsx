import React from "react";
import { HeaderAcquisitionFlow } from "../../../src/components";

export default {
  title: "Components/HeaderAcquisitionFlow",
  component: HeaderAcquisitionFlow,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultHeader = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: true, completed: false },
      { label: "Endereço", active: false, completed: false },
      { label: "Revisão", active: false, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
  />
);

export const WithCompletedSteps = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: false, completed: true },
      { label: "Endereço", active: true, completed: false },
      { label: "Revisão", active: false, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
  />
);

export const WithMultipleCompletedSteps = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: false, completed: true },
      { label: "Endereço", active: false, completed: true },
      { label: "Revisão", active: true, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
  />
);

export const WithCustomColors = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: false, completed: true },
      { label: "Endereço", active: true, completed: false },
      { label: "Revisão", active: false, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
    activeColor="#e91e63"
    completedColor="#2196f3"
  />
);

export const WithCustomStepIcons = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { 
        label: "Dados pessoais", 
        active: false, 
        completed: true, 
        icon: "👤" 
      },
      { 
        label: "Endereço", 
        active: true, 
        completed: false, 
        icon: "🏠" 
      },
      { 
        label: "Pagamento", 
        active: false, 
        completed: false, 
        icon: "💳" 
      },
      { 
        label: "Confirmação", 
        active: false, 
        completed: false, 
        icon: "✅" 
      }
    ]}
  />
);

export const WithHelpLink = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: true, completed: false },
      { label: "Endereço", active: false, completed: false },
      { label: "Revisão", active: false, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
    helpLink={{
      label: "Precisa de ajuda?",
      href: "#"
    }}
  />
);

export const WithBackButton = () => (
  <HeaderAcquisitionFlow 
    logo={{
      src: "https://via.placeholder.com/120x40",
      alt: "Logo da empresa"
    }}
    steps={[
      { label: "Dados pessoais", active: false, completed: true },
      { label: "Endereço", active: true, completed: false },
      { label: "Revisão", active: false, completed: false },
      { label: "Confirmação", active: false, completed: false }
    ]}
    onBack={() => alert("Botão voltar clicado")}
  />
);
