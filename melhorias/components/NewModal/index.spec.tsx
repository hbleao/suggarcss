import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';

// Mock dos hooks do Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

import { useRouter, useSearchParams } from 'next/navigation';

describe('<Modal />', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn()
  };
  
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });
  
  it('deve renderizar o modal aberto quando o parâmetro de consulta corresponde ao nome', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo do Modal')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /fechar modal/i })).toBeInTheDocument();
    expect(screen.getByText('Título do Modal').closest('.modal__root')).not.toHaveClass('modal--hidden');
  });
  
  it('deve renderizar o modal fechado quando o parâmetro de consulta não corresponde ao nome', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('other-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo do Modal')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
    expect(screen.getByText('Título do Modal').closest('.modal__root')).toHaveClass('modal--hidden');
  });
  
  it('deve fechar o modal ao clicar no botão de fechar', () => {
    // Mock da URL e do objeto window.location
    Object.defineProperty(window, 'location', {
      value: {
        search: '?modal=test-modal'
      },
      writable: true
    });
    
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /fechar modal/i });
    fireEvent.click(closeButton);
    
    expect(mockRouter.push).toHaveBeenCalledWith('?', { scroll: false });
  });
  
  it('deve fechar o modal ao clicar no overlay', () => {
    // Mock da URL e do objeto window.location
    Object.defineProperty(window, 'location', {
      value: {
        search: '?modal=test-modal'
      },
      writable: true
    });
    
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    const overlay = screen.getByText('Título do Modal').closest('.modal__root')?.previousSibling;
    fireEvent.click(overlay);
    
    expect(mockRouter.push).toHaveBeenCalledWith('?', { scroll: false });
  });
  
  it('deve renderizar o modal sem subtítulo quando não fornecido', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.queryByText('Subtítulo do Modal')).not.toBeInTheDocument();
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });
  
  it('deve ter os atributos ARIA corretos para acessibilidade', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    const modalRoot = screen.getByText('Título do Modal').closest('.modal__root');
    expect(modalRoot).toHaveAttribute('aria-modal', 'true');
    expect(modalRoot).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modalRoot).toHaveAttribute('aria-describedby', 'modal-subtitle');
  });
  
  it('deve impedir a propagação de eventos ao clicar no conteúdo do modal', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('test-modal')
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams);
    
    render(
      <Modal name="test-modal" title="Título do Modal" subtitle="Subtítulo do Modal">
        <div data-testid="modal-content">Conteúdo do modal</div>
      </Modal>
    );
    
    const modalRoot = screen.getByText('Título do Modal').closest('.modal__root');
    const stopPropagationMock = jest.fn();
    
    // Simula um evento com stopPropagation
    const mockEvent = { stopPropagation: stopPropagationMock };
    
    // Dispara o evento onClick
    modalRoot.onclick(mockEvent as any);
    
    expect(stopPropagationMock).toHaveBeenCalled();
  });
});
