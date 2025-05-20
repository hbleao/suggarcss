import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock do componente NextLink
jest.mock('next/link', () => {
  return function NextLink({ children, ...props }: any) {
    return (
      <a {...props}>
        {children}
      </a>
    );
  };
});

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Link', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Link href="/example">Link de exemplo</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('link');
    expect(link).toHaveClass('--insurance-primary');
    expect(link).toHaveClass('--large');
    expect(link).toHaveClass('--contain');
    expect(link).toHaveAttribute('href', '/example');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent('Link de exemplo');
  });

  it('deve renderizar com variante personalizada', () => {
    render(<Link href="/example" variant="disabled">Link desabilitado</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--disabled-primary');
    expect(link).not.toHaveClass('--insurance-primary');
  });

  it('deve renderizar com estilo personalizado', () => {
    render(<Link href="/example" styles="secondary">Link secundário</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--insurance-secondary');
    expect(link).not.toHaveClass('--insurance-primary');
  });

  it('deve renderizar com tamanho personalizado', () => {
    render(<Link href="/example" size="small">Link pequeno</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--small');
    expect(link).not.toHaveClass('--large');
  });

  it('deve renderizar com largura personalizada', () => {
    render(<Link href="/example" width="fluid">Link fluido</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--fluid');
    expect(link).not.toHaveClass('--contain');
  });

  it('deve renderizar como desabilitado', () => {
    render(<Link href="/example" disabled={true}>Link desabilitado</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--disabled-primary');
    expect(link).not.toHaveClass('--insurance-primary');
    expect(link).toHaveAttribute('disabled', 'true');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Link href="/example" className="custom-class">Link customizado</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveClass('link');
  });

  it('deve passar atributos HTML adicionais para o elemento link', () => {
    render(
      <Link 
        href="/example"
        aria-label="Link de exemplo"
        title="Título do link"
        rel="nofollow"
      >
        Link com atributos
      </Link>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Link de exemplo');
    expect(link).toHaveAttribute('title', 'Título do link');
    expect(link).toHaveAttribute('rel', 'nofollow');
  });

  it('deve combinar múltiplas propriedades personalizadas', () => {
    render(
      <Link 
        href="/example"
        variant="insurance"
        styles="ghost"
        size="small"
        width="fluid"
        className="custom-class"
      >
        Link personalizado
      </Link>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('--insurance-ghost');
    expect(link).toHaveClass('--small');
    expect(link).toHaveClass('--fluid');
    expect(link).toHaveClass('custom-class');
  });

  it('deve renderizar com href padrão quando não fornecido', () => {
    // @ts-ignore - Testando comportamento quando href não é fornecido
    render(<Link>Link sem href</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('deve renderizar com conteúdo complexo', () => {
    render(
      <Link href="/example">
        <span data-testid="icon">🔗</span>
        <span>Texto do link</span>
      </Link>
    );
    
    const link = screen.getByRole('link');
    const icon = screen.getByTestId('icon');
    const text = screen.getByText('Texto do link');
    
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(link).toContainElement(icon);
    expect(link).toContainElement(text);
  });
});
