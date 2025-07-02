import React from "react";
import { CardTestimonial } from "../../../src/components";

export default {
  title: "Components/CardTestimonial",
  component: CardTestimonial,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultCardTestimonial = () => (
  <CardTestimonial
    image={
      <div style={{ 
        width: "64px", 
        height: "64px", 
        borderRadius: "50%", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <img 
          src="https://via.placeholder.com/64x64/3f51b5/ffffff?text=JS" 
          alt="João Silva" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    }
    name="João Silva"
    position="Diretor de Marketing"
    date="Janeiro 2025"
    text="Este produto superou todas as minhas expectativas. O atendimento foi excelente e a entrega ocorreu antes do prazo previsto. Recomendo fortemente para todos que buscam qualidade e eficiência."
  />
);

export const WithoutImage = () => (
  <CardTestimonial
    name="Maria Oliveira"
    position="Gerente de Projetos"
    date="Fevereiro 2025"
    text="Trabalhar com esta empresa foi uma experiência incrível. A equipe é extremamente profissional e dedicada, sempre buscando as melhores soluções para os clientes."
  />
);

export const WithoutDate = () => (
  <CardTestimonial
    image={
      <div style={{ 
        width: "64px", 
        height: "64px", 
        borderRadius: "50%", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <img 
          src="https://via.placeholder.com/64x64/4caf50/ffffff?text=CP" 
          alt="Carlos Pereira" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    }
    name="Carlos Pereira"
    position="Desenvolvedor Sênior"
    text="A plataforma é intuitiva e fácil de usar. A documentação é completa e bem estruturada, o que facilitou muito o processo de integração com nossos sistemas."
  />
);

export const WithoutPosition = () => (
  <CardTestimonial
    image={
      <div style={{ 
        width: "64px", 
        height: "64px", 
        borderRadius: "50%", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <img 
          src="https://via.placeholder.com/64x64/ff9800/ffffff?text=AS" 
          alt="Ana Santos" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    }
    name="Ana Santos"
    date="Março 2025"
    text="Fiquei impressionada com a qualidade do serviço. Tudo foi entregue conforme o prometido e dentro do prazo estabelecido."
  />
);

export const WithoutSeparator = () => (
  <CardTestimonial
    image={
      <div style={{ 
        width: "64px", 
        height: "64px", 
        borderRadius: "50%", 
        backgroundColor: "#e0e0e0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        overflow: "hidden"
      }}>
        <img 
          src="https://via.placeholder.com/64x64/9c27b0/ffffff?text=RF" 
          alt="Roberto Ferreira" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    }
    name="Roberto Ferreira"
    position="Analista Financeiro"
    date="Abril 2025"
    text="O suporte técnico é excepcional. Sempre que precisei de ajuda, fui atendido rapidamente e com soluções eficazes para os problemas."
    showSeparator={false}
  />
);

export const CustomStyling = () => (
  <div style={{ backgroundColor: "#f5f5f5", padding: "24px" }}>
    <CardTestimonial
      style={{ 
        maxWidth: "500px", 
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "24px"
      }}
      image={
        <div style={{ 
          width: "80px", 
          height: "80px", 
          borderRadius: "50%", 
          backgroundColor: "#e0e0e0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          overflow: "hidden",
          border: "3px solid #3f51b5"
        }}>
          <img 
            src="https://via.placeholder.com/80x80/3f51b5/ffffff?text=LM" 
            alt="Luciana Mendes" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      }
      name="Luciana Mendes"
      position="CEO - Empresa XYZ"
      date="Maio 2025"
      text="Implementar esta solução foi a melhor decisão que tomamos para nossa empresa. Os resultados superaram todas as expectativas e o retorno sobre o investimento foi muito além do que imaginávamos. Recomendo sem hesitação."
    />
  </div>
);
