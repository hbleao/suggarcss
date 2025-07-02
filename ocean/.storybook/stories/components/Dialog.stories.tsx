import React, { useState } from "react";
import { Modal, Button } from "../../../src/components";

export default {
  title: "Components/Dialog",
  component: Modal,
  parameters: {
    layout: 'padded',
  },
};

export const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Padrão"
        description="Este é um exemplo de dialog padrão com título e descrição."
      >
        <div style={{ padding: "16px" }}>
          <p>Conteúdo do dialog padrão.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};

export const WithoutTitle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal sem Título</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        description="Este é um exemplo de dialog sem título, apenas com descrição."
      >
        <div style={{ padding: "16px" }}>
          <p>Conteúdo do dialog sem título.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};

export const WithoutDescription = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal sem Descrição</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal sem Descrição"
      >
        <div style={{ padding: "16px" }}>
          <p>Conteúdo do dialog sem descrição.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};

export const WithoutCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal sem Botão de Fechar</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal sem Botão de Fechar"
        description="Este dialog não possui o botão de fechar no cabeçalho."
        showCloseButton={false}
      >
        <div style={{ padding: "16px" }}>
          <p>Conteúdo do dialog sem botão de fechar.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};

export const CustomWidth = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal com Largura Personalizada</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal com Largura Personalizada"
        description="Este dialog possui uma largura personalizada de 600px."
        width={600}
      >
        <div style={{ padding: "16px" }}>
          <p>Conteúdo do dialog com largura personalizada.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};

export const CustomStyles = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal com Estilos Personalizados</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal com Estilos Personalizados"
        description="Este dialog possui estilos personalizados."
        overlayClassName="custom-overlay"
        dialogClassName="custom-dialog"
        headerClassName="custom-header"
        contentClassName="custom-content"
      >
        <div style={{ padding: "16px", backgroundColor: "#f0f9ff", borderRadius: "0 0 8px 8px" }}>
          <p>Conteúdo do dialog com estilos personalizados.</p>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </>
  );
};
