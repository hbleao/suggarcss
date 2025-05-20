import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock dos hooks do Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => param === 'modal' ? 'test-modal' : null),
  })),
}));

// Mock da função clsx
jest.mock('@/utils', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Modal', () => {
  // Configuração global para o window.location
  const originalLocation = window.location;
  
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: '?modal=test-modal' },
    });
  });
  
  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('deve renderizar corretamente quando aberto', () => {
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal" 
        subtitle="Subtítulo do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Verificar se o modal está visível
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass('modal__root');
    expect(modal).not.toHaveClass('modal--hidden');
    
    // Verificar se o overlay está presente
    const overlay = screen.getByRole('generic', { hidden: true });
    expect(overlay).toHaveClass('modal__overlay');
    
    // Verificar se o título e subtítulo foram renderizados
    const title = screen.getByText('Título do Modal');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('modal__header-title');
    expect(title).toHaveAttribute('id', 'modal-title');
    
    const subtitle = screen.getByText('Subtítulo do Modal');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('modal__header-subtitle');
    expect(subtitle).toHaveAttribute('id', 'modal-subtitle');
    
    // Verificar se o conteúdo foi renderizado
    const content = screen.getByText('Conteúdo do modal');
    expect(content).toBeInTheDocument();
    
    // Verificar se o botão de fechar está presente
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('modal__header-icon-close');
    expect(closeButton).toHaveAttribute('aria-label', 'Fechar Modal');
  });

  it('deve tentar fechar o modal ao clicar no botão de fechar', () => {
    const { useRouter } = require('next/navigation');
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });
    
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Clicar no botão de fechar
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    // Verificar se o router.push foi chamado com os parâmetros corretos
    expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
  });

  it('deve tentar fechar o modal ao clicar no overlay', () => {
    const { useRouter } = require('next/navigation');
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });
    
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Clicar no overlay
    const overlay = screen.getByRole('generic', { hidden: true });
    fireEvent.click(overlay);
    
    // Verificar se o router.push foi chamado com os parâmetros corretos
    expect(mockPush).toHaveBeenCalledWith('?', { scroll: false });
  });

  it('deve renderizar como escondido quando não está aberto', () => {
    const { useSearchParams } = require('next/navigation');
    useSearchParams.mockReturnValue({
      get: jest.fn(() => null), // Modal não está aberto
    });
    
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Verificar se o modal está escondido
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveClass('modal--hidden');
    
    // Verificar se o overlay não está presente
    const overlay = screen.queryByRole('generic', { hidden: true });
    expect(overlay).not.toBeInTheDocument();
  });

  it('deve renderizar sem subtítulo quando não fornecido', () => {
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Verificar se o subtítulo está vazio
    const subtitle = screen.getByRole('paragraph', { name: '', hidden: true });
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('modal__header-subtitle');
    expect(subtitle).toBeEmptyDOMElement();
  });

  it('deve ter atributos de acessibilidade corretos', () => {
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        subtitle="Subtítulo do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'modal-subtitle');
    expect(modal).toHaveAttribute('tabIndex', '-1');
  });

  it('deve parar a propagação de eventos ao clicar no modal', () => {
    const stopPropagationMock = jest.fn();
    
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    const modal = screen.getByTestId('modal');
    
    // Simular clique com stopPropagation mockado
    fireEvent.click(modal, {
      stopPropagation: stopPropagationMock,
    });
    
    // O evento original deve ter sido interrompido
    expect(stopPropagationMock).toHaveBeenCalled();
  });

  it('deve renderizar o ícone de fechar corretamente', () => {
    render(
      <Modal 
        name="test-modal" 
        title="Título do Modal"
        data-testid="modal"
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );
    
    // Verificar se o SVG foi renderizado
    const svg = screen.getByTitle('Ícone de fechar');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 40 40');
    expect(svg).toHaveAttribute('fill', 'none');
  });
});
