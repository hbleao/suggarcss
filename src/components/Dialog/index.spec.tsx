import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from './index';

// Mock createPortal para permitir testes
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

describe('<Dialog />', () => {
  it('deve renderizar quando isOpen é true', () => {
    render(
      <Dialog isOpen={true} title="Título do Diálogo">
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByText('Título do Diálogo')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do diálogo')).toBeInTheDocument();
  });

  it('não deve renderizar quando isOpen é false', () => {
    const { container } = render(
      <Dialog isOpen={false} title="Título do Diálogo">
        Conteúdo do diálogo
      </Dialog>
    );
    
    const dialogOverlay = container.querySelector('.dialog__overlay--open');
    expect(dialogOverlay).not.toBeInTheDocument();
  });

  it('deve aplicar a variante correta', () => {
    const { container } = render(
      <Dialog isOpen={true} variant="medium">
        Conteúdo do diálogo
      </Dialog>
    );
    
    const dialogBox = container.querySelector('.dialog__box');
    expect(dialogBox).toHaveClass('--medium');
  });

  it('deve aplicar o tema correto', () => {
    const { container } = render(
      <Dialog isOpen={true} theme="dark">
        Conteúdo do diálogo
      </Dialog>
    );
    
    const dialog = container.querySelector('.dialog');
    expect(dialog).toHaveClass('--dark');
  });

  it('deve renderizar o título corretamente', () => {
    render(
      <Dialog isOpen={true} title="Título de Teste">
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByText('Título de Teste')).toBeInTheDocument();
    expect(screen.getByText('Título de Teste')).toHaveClass('dialog__title');
  });

  it('deve renderizar o subtítulo corretamente', () => {
    render(
      <Dialog isOpen={true} subtitle="Subtítulo de Teste">
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByText('Subtítulo de Teste')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo de Teste')).toHaveClass('dialog__subtitle');
  });

  it('deve renderizar a descrição corretamente', () => {
    render(
      <Dialog isOpen={true} description="Descrição de Teste">
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByText('Descrição de Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição de Teste')).toHaveClass('dialog__description');
  });

  it('deve renderizar o ícone corretamente', () => {
    render(
      <Dialog 
        isOpen={true} 
        icon={{ iconName: 'info', 'data-testid': 'dialog-icon' }}
      >
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByTestId('dialog-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-icon')).toHaveClass('dialog__icon');
  });

  it('deve renderizar o conteúdo principal corretamente', () => {
    render(
      <Dialog isOpen={true}>
        <p data-testid="dialog-content">Conteúdo principal</p>
      </Dialog>
    );
    
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content').closest('.dialog__body')).toBeInTheDocument();
  });

  it('deve renderizar o rodapé corretamente', () => {
    render(
      <Dialog 
        isOpen={true} 
        footer={<button data-testid="footer-button">Botão de Rodapé</button>}
      >
        Conteúdo do diálogo
      </Dialog>
    );
    
    expect(screen.getByTestId('footer-button')).toBeInTheDocument();
    expect(screen.getByTestId('footer-button').closest('.dialog__footer')).toBeInTheDocument();
  });

  it('deve aplicar a variante de rodapé corretamente', () => {
    const { container } = render(
      <Dialog 
        isOpen={true} 
        footerVariant="column"
        footer={<button>Botão de Rodapé</button>}
      >
        Conteúdo do diálogo
      </Dialog>
    );
    
    const footer = container.querySelector('.dialog__footer');
    expect(footer).toHaveClass('--column');
  });

  it('deve chamar onClose quando o overlay é clicado', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Dialog isOpen={true} onClose={handleClose}>
        Conteúdo do diálogo
      </Dialog>
    );
    
    const overlay = container.querySelector('.dialog__overlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('deve aplicar classes CSS adicionais', () => {
    const { container } = render(
      <Dialog isOpen={true} className="custom-dialog">
        Conteúdo do diálogo
      </Dialog>
    );
    
    const dialog = container.querySelector('.dialog');
    expect(dialog).toHaveClass('custom-dialog');
  });
});
