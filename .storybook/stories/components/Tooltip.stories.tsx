import React, { useState } from "react";
import { Tooltip, Button } from "../../../src/components";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultTooltip = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="Esta é uma dica informativa">
      <Button>Passe o mouse aqui</Button>
    </Tooltip>
  </div>
);

export const PositionTop = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="Tooltip posicionado acima" position="top">
      <Button>Posição Superior</Button>
    </Tooltip>
  </div>
);

export const PositionRight = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="Tooltip posicionado à direita" position="right">
      <Button>Posição Direita</Button>
    </Tooltip>
  </div>
);

export const PositionBottom = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="Tooltip posicionado abaixo" position="bottom">
      <Button>Posição Inferior</Button>
    </Tooltip>
  </div>
);

export const PositionLeft = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip content="Tooltip posicionado à esquerda" position="left">
      <Button>Posição Esquerda</Button>
    </Tooltip>
  </div>
);

export const WithHTMLContent = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip 
      content="Conteúdo formatado: Este tooltip contém informações importantes como Item 1, Item 2 e Item 3."
    >
      <Button>Tooltip com HTML</Button>
    </Tooltip>
  </div>
);

export const ControlledTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: "50px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Fechar Tooltip" : "Abrir Tooltip"}
        </Button>
      </div>
      
      <div>
        <Tooltip 
          content="Este é um tooltip controlado" 
          isOpen={isOpen}
          onOpen={() => console.log("Tooltip aberto")}
          onClose={() => console.log("Tooltip fechado")}
        >
          <Button>Tooltip Controlado</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export const TooltipWithCustomStyles = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
    <Tooltip 
      content="Tooltip com estilos personalizados"
      className="custom-tooltip-wrapper"
      contentClassName="custom-tooltip-content"
      triggerClassName="custom-tooltip-trigger"
      style={{ 
        /* Estilos para o wrapper */
        position: "relative" 
      }}
    >
      <Button>Tooltip Estilizado</Button>
    </Tooltip>
  </div>
);

export const TooltipOnDifferentElements = () => (
  <div style={{ padding: "50px", display: "flex", justifyContent: "center", gap: "24px" }}>
    <Tooltip content="Tooltip em um botão">
      <Button>Botão</Button>
    </Tooltip>
    
    <Tooltip content="Tooltip em um ícone">
      <div style={{ 
        width: "32px", 
        height: "32px", 
        borderRadius: "50%", 
        background: "#e0e0ff", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        cursor: "pointer"
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <title>Ícone de informação</title>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
    </Tooltip>
    
    <Tooltip content="Tooltip em um texto">
      <span style={{ textDecoration: "underline", cursor: "help" }}>
        Termo técnico
      </span>
    </Tooltip>
  </div>
);
