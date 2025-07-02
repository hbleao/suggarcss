import React from "react";
import { ShowOnDevice } from "../../../src/components";

export default {
  title: "Components/ShowOnDevice",
  component: ShowOnDevice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'O componente ShowOnDevice permite exibir conteúdo condicionalmente com base no tamanho da tela.'
      }
    }
  },
};

export const LessThanMobile = () => (
  <div>
    <p>Redimensione a janela do navegador para ver o comportamento:</p>
    <ShowOnDevice orientation="lessThan" media="mobile">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#e0f7fa", 
        border: "1px solid #00acc1",
        borderRadius: "4px"
      }}>
        Este conteúdo só é visível em telas <strong>menores que mobile</strong>.
      </div>
    </ShowOnDevice>
    <div style={{ 
      padding: "16px", 
      marginTop: "16px",
      backgroundColor: "#f5f5f5", 
      border: "1px solid #e0e0e0",
      borderRadius: "4px"
    }}>
      Este conteúdo é sempre visível.
    </div>
  </div>
);

export const LessThanTabletPortrait = () => (
  <div>
    <p>Redimensione a janela do navegador para ver o comportamento:</p>
    <ShowOnDevice orientation="lessThan" media="tabletPortrait">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#fff8e1", 
        border: "1px solid #ffd54f",
        borderRadius: "4px"
      }}>
        Este conteúdo só é visível em telas <strong>menores que tablet em modo retrato</strong>.
      </div>
    </ShowOnDevice>
    <div style={{ 
      padding: "16px", 
      marginTop: "16px",
      backgroundColor: "#f5f5f5", 
      border: "1px solid #e0e0e0",
      borderRadius: "4px"
    }}>
      Este conteúdo é sempre visível.
    </div>
  </div>
);

export const GreaterThanMobile = () => (
  <div>
    <p>Redimensione a janela do navegador para ver o comportamento:</p>
    <ShowOnDevice orientation="greaterThan" media="mobile">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#e8f5e9", 
        border: "1px solid #66bb6a",
        borderRadius: "4px"
      }}>
        Este conteúdo só é visível em telas <strong>maiores que mobile</strong>.
      </div>
    </ShowOnDevice>
    <div style={{ 
      padding: "16px", 
      marginTop: "16px",
      backgroundColor: "#f5f5f5", 
      border: "1px solid #e0e0e0",
      borderRadius: "4px"
    }}>
      Este conteúdo é sempre visível.
    </div>
  </div>
);

export const GreaterThanTabletLandscape = () => (
  <div>
    <p>Redimensione a janela do navegador para ver o comportamento:</p>
    <ShowOnDevice orientation="greaterThan" media="tabletLandscape">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#f3e5f5", 
        border: "1px solid #ab47bc",
        borderRadius: "4px"
      }}>
        Este conteúdo só é visível em telas <strong>maiores que tablet em modo paisagem</strong>.
      </div>
    </ShowOnDevice>
    <div style={{ 
      padding: "16px", 
      marginTop: "16px",
      backgroundColor: "#f5f5f5", 
      border: "1px solid #e0e0e0",
      borderRadius: "4px"
    }}>
      Este conteúdo é sempre visível.
    </div>
  </div>
);

export const ResponsiveLayout = () => (
  <div>
    <p>Exemplo de layout responsivo com diferentes conteúdos por tamanho de tela:</p>
    
    <ShowOnDevice orientation="lessThan" media="tabletPortrait">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#ffebee", 
        border: "1px solid #ef5350",
        borderRadius: "4px",
        marginBottom: "16px"
      }}>
        <h3 style={{ margin: "0 0 8px 0" }}>Navegação Mobile</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" style={{ padding: "8px" }}>Menu</button>
          <button type="button" style={{ padding: "8px" }}>Busca</button>
          <button type="button" style={{ padding: "8px" }}>Perfil</button>
        </div>
      </div>
    </ShowOnDevice>
    
    <ShowOnDevice orientation="greaterThan" media="mobile">
      <ShowOnDevice orientation="lessThan" media="desktop">
        <div style={{ 
          padding: "16px", 
          backgroundColor: "#e1f5fe", 
          border: "1px solid #29b6f6",
          borderRadius: "4px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 8px 0" }}>Navegação Tablet</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" style={{ padding: "8px" }}>Início</button>
            <button type="button" style={{ padding: "8px" }}>Produtos</button>
            <button type="button" style={{ padding: "8px" }}>Serviços</button>
            <button type="button" style={{ padding: "8px" }}>Contato</button>
          </div>
        </div>
      </ShowOnDevice>
    </ShowOnDevice>
    
    <ShowOnDevice orientation="greaterThan" media="tabletLandscape">
      <div style={{ 
        padding: "16px", 
        backgroundColor: "#e8f5e9", 
        border: "1px solid #66bb6a",
        borderRadius: "4px"
      }}>
        <h3 style={{ margin: "0 0 8px 0" }}>Navegação Desktop</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" style={{ padding: "8px" }}>Início</button>
          <button type="button" style={{ padding: "8px" }}>Produtos</button>
          <button type="button" style={{ padding: "8px" }}>Serviços</button>
          <button type="button" style={{ padding: "8px" }}>Blog</button>
          <button type="button" style={{ padding: "8px" }}>Sobre</button>
          <button type="button" style={{ padding: "8px" }}>Contato</button>
          <button type="button" style={{ padding: "8px" }}>Área do Cliente</button>
        </div>
      </div>
    </ShowOnDevice>
    
    <div style={{ 
      padding: "16px", 
      marginTop: "16px",
      backgroundColor: "#f5f5f5", 
      border: "1px solid #e0e0e0",
      borderRadius: "4px"
    }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Conteúdo Principal</h3>
      <p>Este conteúdo é sempre visível, independente do tamanho da tela.</p>
    </div>
  </div>
);
