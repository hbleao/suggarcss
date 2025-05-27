import React from "react";
import { Loader } from "../../../src/components";

export default {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultLoader = () => (
  <Loader />
);

export const WithDifferentSizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    <div>
      <h3>Tamanho pequeno (16px)</h3>
      <Loader size={16} />
    </div>
    <div>
      <h3>Tamanho padrão (24px)</h3>
      <Loader size={24} />
    </div>
    <div>
      <h3>Tamanho médio (32px)</h3>
      <Loader size={32} />
    </div>
    <div>
      <h3>Tamanho grande (48px)</h3>
      <Loader size={48} />
    </div>
  </div>
);

export const WithDifferentColors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    <div>
      <h3>Cor padrão (neutral-900)</h3>
      <Loader />
    </div>
    <div>
      <h3>Cor personalizada (brand-insurance-900)</h3>
      <Loader color="brand-insurance-900" />
    </div>
    <div>
      <h3>Outra cor personalizada (brand-banking-900)</h3>
      <Loader color="brand-banking-900" />
    </div>
  </div>
);

export const WithCustomClasses = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    <div>
      <h3>Loader padrão</h3>
      <Loader />
    </div>
    <div>
      <h3>Loader com classe personalizada</h3>
      <Loader className="custom-loader" />
      <style>{`
        .custom-loader {
          border-width: 4px;
          border-style: dotted;
          animation-duration: 2s;
        }
      `}</style>
    </div>
  </div>
);

export const WithCustomStyles = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
    <div>
      <h3>Loader com estilos inline</h3>
      <Loader style={{ 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        margin: '10px',
        borderRadius: '10%'
      }} />
    </div>
  </div>
);

export const LoaderInContext = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  }}>
    <Loader size={32} />
    <div>
      <h3 style={{ margin: '0 0 8px 0' }}>Carregando dados...</h3>
      <p style={{ margin: 0, color: '#666' }}>Por favor, aguarde enquanto processamos sua solicitação.</p>
    </div>
  </div>
);
