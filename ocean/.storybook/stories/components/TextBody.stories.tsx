import React from "react";
import { TextBody } from "../../../src/components";

export default {
  title: "Components/TextBody",
  component: TextBody,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultTextBody = () => (
  <TextBody
    title="Plano Completo"
    subtitle="Cobertura ideal para sua família"
    text="Desfrute dos melhores benefícios com o plano que mais combina com você."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const WithoutSubtitle = () => (
  <TextBody
    title="Plano Completo"
    text="Desfrute dos melhores benefícios com o plano que mais combina com você."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const WithoutText = () => (
  <TextBody
    title="Plano Completo"
    subtitle="Cobertura ideal para sua família"
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const WithHTMLContent = () => (
  <TextBody
    title="Plano Completo"
    subtitle="Cobertura ideal para sua família"
    text="<p>Desfrute dos <strong>melhores benefícios</strong> com o plano que mais combina com você.</p><ul><li>Cobertura completa</li><li>Atendimento 24h</li><li>Rede credenciada</li></ul>"
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const SingleButton = () => (
  <TextBody
    title="Plano Completo"
    subtitle="Cobertura ideal para sua família"
    text="Desfrute dos melhores benefícios com o plano que mais combina com você."
    buttons={[
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const MultipleButtons = () => (
  <TextBody
    title="Plano Completo"
    subtitle="Cobertura ideal para sua família"
    text="Desfrute dos melhores benefícios com o plano que mais combina com você."
    buttons={[
      { label: "Saiba mais", variant: "insurance", styles: "ghost" },
      { label: "Comparar", variant: "insurance", styles: "secondary" },
      { label: "Contratar", variant: "insurance", styles: "primary" },
    ]}
  />
);

export const DifferentVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    <TextBody
      title="Plano de Saúde"
      subtitle="Cuidado com sua saúde"
      text="Tenha acesso aos melhores hospitais e médicos."
      buttons={[
        { label: "Contratar", variant: "health", styles: "primary" },
      ]}
    />
    
    <TextBody
      title="Conta Digital"
      subtitle="Sem taxas ou burocracia"
      text="Abra sua conta em minutos e comece a economizar."
      buttons={[
        { label: "Contratar", variant: "banking", styles: "primary" },
      ]}
    />
    
    <TextBody
      title="Seguro Auto"
      subtitle="Proteção completa para seu veículo"
      text="Cobertura contra roubo, furto, colisão e muito mais."
      buttons={[
        { label: "Contratar", variant: "insurance", styles: "primary" },
      ]}
    />
  </div>
);

export const CustomStyles = () => (
  <div style={{ backgroundColor: "#f5f5f5", padding: "24px" }}>
    <TextBody
      title="Oferta Especial"
      subtitle="Por tempo limitado"
      text="Aproveite esta oferta exclusiva com condições especiais."
      buttons={[
        { label: "Aproveitar", variant: "insurance", styles: "primary" },
      ]}
      style={{ 
        maxWidth: "500px", 
        margin: "0 auto",
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    />
  </div>
);
