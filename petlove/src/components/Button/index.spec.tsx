import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Button', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('--insurance-primary');
    expect(button).toHaveClass('--large');
    expect(button).toHaveClass('--contain');
    expect(button).toHaveTextContent('Clique aqui');
    expect(button).not.toBeDisabled();
  });

  it('deve renderizar com variante personalizada', () => {
    render(<Button variant="banking">Botão bancário</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--banking-primary');
    expect(button).not.toHaveClass('--insurance-primary');
  });

  it('deve renderizar com estilo personalizado', () => {
    render(<Button styles="secondary">Botão secundário</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--insurance-secondary');
    expect(button).not.toHaveClass('--insurance-primary');
  });

  it('deve renderizar com tamanho personalizado', () => {
    render(<Button size="small">Botão pequeno</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--small');
    expect(button).not.toHaveClass('--large');
  });

  it('deve renderizar com largura personalizada', () => {
    render(<Button width="fluid">Botão fluido</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--fluid');
    expect(button).not.toHaveClass('--contain');
  });

  it('deve renderizar como desabilitado', () => {
    render(<Button disabled>Botão desabilitado</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('--disabled-primary');
    expect(button).not.toHaveClass('--insurance-primary');
  });

  it('deve renderizar com estado de carregamento', () => {
    render(<Button isLoading>Botão carregando</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Verificar se o loader está presente
    const loader = button.querySelector('.btn__loader');
    expect(loader).toBeInTheDocument();
    
    // Verificar se o conteúdo do botão não está visível
    expect(button).not.toHaveTextContent('Botão carregando');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Button className="custom-class">Botão customizado</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('btn');
  });

  it('deve chamar o evento onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Botão clicável</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar o evento onClick quando desabilitado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Botão desabilitado</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve passar atributos HTML adicionais para o elemento button', () => {
    render(
      <Button 
        type="submit"
        aria-label="Enviar formulário"
        title="Clique para enviar"
        data-testid="submit-button"
      >
        Enviar
      </Button>
    );
    
    const button = screen.getByTestId('submit-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Enviar formulário');
    expect(button).toHaveAttribute('title', 'Clique para enviar');
  });

  it('deve combinar múltiplas propriedades personalizadas', () => {
    render(
      <Button 
        variant="health"
        styles="ghost"
        size="small"
        width="fluid"
        className="custom-class"
      >
        Botão personalizado
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--health-ghost');
    expect(button).toHaveClass('--small');
    expect(button).toHaveClass('--fluid');
    expect(button).toHaveClass('custom-class');
  });

  it('deve priorizar classe disabled sobre variante quando desabilitado', () => {
    render(
      <Button 
        variant="negative"
        styles="secondary"
        disabled
      >
        Botão desabilitado
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('--disabled-secondary');
    expect(button).not.toHaveClass('--negative-secondary');
  });
});
