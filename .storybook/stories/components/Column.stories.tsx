import React from "react";
import { Column } from "../../../src/components";

export default {
  title: "Components/Column",
  component: Column,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultColumn = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
    <Column mobile={[1, 13]} className="column-demo">
      <div style={{ backgroundColor: "#f0f0f0", padding: "20px", height: "200px" }}>
        <p>Coluna padrão (mobile: [1, 13])</p>
      </div>
    </Column>
  </div>
);

export const WithDifferentBreakpoints = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[1, 7]} 
      tabletLandscape={[1, 5]} 
      desktop={[1, 4]} 
      wide={[1, 3]}
      className="column-demo"
    >
      <div style={{ backgroundColor: "#e3f2fd", padding: "20px", height: "200px" }}>
        <p>Coluna com diferentes breakpoints:</p>
        <ul>
          <li>Mobile: [1, 13] (largura total)</li>
          <li>Tablet Portrait: [1, 7] (metade da largura)</li>
          <li>Tablet Landscape: [1, 5] (um terço da largura)</li>
          <li>Desktop: [1, 4] (um quarto da largura)</li>
          <li>Wide: [1, 3] (um sexto da largura)</li>
        </ul>
        <p>Redimensione a janela para ver o efeito</p>
      </div>
    </Column>
  </div>
);

export const WithStartPosition = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
    <Column 
      mobile={[4, 13]} 
      tabletPortrait={[4, 10]} 
      className="column-demo"
    >
      <div style={{ backgroundColor: "#e8f5e9", padding: "20px", height: "200px" }}>
        <p>Coluna com posição inicial diferente:</p>
        <ul>
          <li>Mobile: [4, 13] (começa na coluna 4)</li>
          <li>Tablet Portrait: [4, 10] (começa na coluna 4)</li>
        </ul>
      </div>
    </Column>
  </div>
);

export const MultipleColumns = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[1, 7]} 
      tabletLandscape={[1, 7]} 
      desktop={[1, 7]} 
      wide={[1, 7]}
      className="column-demo"
    >
      <div style={{ backgroundColor: "#fff3e0", padding: "20px", height: "200px" }}>
        <p>Coluna 1</p>
      </div>
    </Column>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[7, 13]} 
      tabletLandscape={[7, 13]} 
      desktop={[7, 13]} 
      wide={[7, 13]}
      className="column-demo"
    >
      <div style={{ backgroundColor: "#ffebee", padding: "20px", height: "200px" }}>
        <p>Coluna 2</p>
      </div>
    </Column>
  </div>
);

export const ThreeColumns = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[1, 5]} 
      tabletLandscape={[1, 5]} 
      desktop={[1, 5]} 
      className="column-demo"
    >
      <div style={{ backgroundColor: "#e0f7fa", padding: "20px", height: "200px" }}>
        <p>Coluna 1</p>
      </div>
    </Column>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[5, 9]} 
      tabletLandscape={[5, 9]} 
      desktop={[5, 9]} 
      className="column-demo"
    >
      <div style={{ backgroundColor: "#b2ebf2", padding: "20px", height: "200px" }}>
        <p>Coluna 2</p>
      </div>
    </Column>
    <Column 
      mobile={[1, 13]} 
      tabletPortrait={[9, 13]} 
      tabletLandscape={[9, 13]} 
      desktop={[9, 13]} 
      className="column-demo"
    >
      <div style={{ backgroundColor: "#80deea", padding: "20px", height: "200px" }}>
        <p>Coluna 3</p>
      </div>
    </Column>
  </div>
);

export const ResponsiveLayout = () => (
  <div className="grid-container" style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
    <div style={{ marginBottom: "16px" }}>
      <Column 
        mobile={[1, 13]} 
        tabletPortrait={[1, 13]} 
        tabletLandscape={[1, 13]} 
        className="column-demo"
      >
        <div style={{ backgroundColor: "#f3e5f5", padding: "20px", height: "100px" }}>
          <p>Cabeçalho (largura total em todos os breakpoints)</p>
        </div>
      </Column>
    </div>
    
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
      <Column 
        mobile={[1, 13]} 
        tabletPortrait={[1, 5]} 
        tabletLandscape={[1, 4]} 
        desktop={[1, 4]} 
        className="column-demo"
      >
        <div style={{ backgroundColor: "#e1bee7", padding: "20px", height: "200px" }}>
          <p>Barra lateral (largura total em mobile, reduzida em outros breakpoints)</p>
        </div>
      </Column>
      
      <Column 
        mobile={[1, 13]} 
        tabletPortrait={[5, 13]} 
        tabletLandscape={[4, 13]} 
        desktop={[4, 13]} 
        className="column-demo"
      >
        <div style={{ backgroundColor: "#ce93d8", padding: "20px", height: "200px" }}>
          <p>Conteúdo principal (largura total em mobile, expandida em outros breakpoints)</p>
          <p>Redimensione a janela para ver o efeito</p>
        </div>
      </Column>
    </div>
    
    <div>
      <Column 
        mobile={[1, 13]} 
        tabletPortrait={[1, 13]} 
        tabletLandscape={[1, 13]} 
        className="column-demo"
      >
        <div style={{ backgroundColor: "#d1c4e9", padding: "20px", height: "100px" }}>
          <p>Rodapé (largura total em todos os breakpoints)</p>
        </div>
      </Column>
    </div>
  </div>
);
