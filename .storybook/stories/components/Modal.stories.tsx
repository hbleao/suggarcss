import React, { useState } from "react";
import { Modal, Button } from "../../../src/components";

// Criando um wrapper para o Modal que não depende do Next.js
const ModalWrapper = ({ title, subtitle = "", children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  // Mock das funções do Next.js
  const mockRouter = {
    push: () => setIsOpen(false)
  };
  
  const mockSearchParams = {
    get: () => isOpen ? "modal-name" : null
  };
  
  // Sobrescrever as funções do Next.js no componente Modal
  const OriginalModal = Modal;
  const MockedModal = (props) => {
    // @ts-ignore - Ignorando erros de tipo para o mock
    OriginalModal.prototype.useRouter = () => mockRouter;
    // @ts-ignore
    OriginalModal.prototype.useSearchParams = () => mockSearchParams;
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
        <OriginalModal {...props} name="modal-name" />
      </>
    );
  };
  
  return <MockedModal title={title} subtitle={subtitle}>{children}</MockedModal>;
};

export default {
  title: "Components/Modal",
  component: ModalWrapper,
  parameters: {
    layout: 'padded',
  },
};

export const BasicModal = () => (
  <ModalWrapper title="Título do Modal" subtitle="">
    <div style={{ padding: "20px" }}>
      <p>Conteúdo do modal básico.</p>
    </div>
  </ModalWrapper>
);

export const ModalWithSubtitle = () => (
  <ModalWrapper 
    title="Título do Modal" 
    subtitle="Este é um subtítulo explicativo para o modal"
  >
    <div style={{ padding: "20px" }}>
      <p>Conteúdo do modal com subtítulo.</p>
    </div>
  </ModalWrapper>
);

export const ModalWithForm = () => (
  <ModalWrapper title="Formulário" subtitle="">
    <div style={{ padding: "20px" }}>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="nome" style={{ display: "block", marginBottom: "5px" }}>Nome</label>
          <input 
            id="nome"
            type="text" 
            style={{ 
              width: "100%", 
              padding: "8px", 
              borderRadius: "4px", 
              border: "1px solid #ccc" 
            }} 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input 
            id="email"
            type="email" 
            style={{ 
              width: "100%", 
              padding: "8px", 
              borderRadius: "4px", 
              border: "1px solid #ccc" 
            }} 
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button>Cancelar</Button>
          <Button>Enviar</Button>
        </div>
      </form>
    </div>
  </ModalWrapper>
);

export const LargeModal = () => (
  <ModalWrapper title="Modal com Conteúdo Extenso" subtitle="">
    <div style={{ padding: "20px" }}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button>Fechar</Button>
      </div>
    </div>
  </ModalWrapper>
);
