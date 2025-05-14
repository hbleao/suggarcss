import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('<Footer />', () => {
  it('deve renderizar com a variante padrão', () => {
    const { container } = render(<Footer />);
    const rootElement = container.querySelector('.footer__root');
    expect(rootElement).toHaveClass('--default');
  });

  it('deve renderizar com a variante negativa quando especificada', () => {
    const { container } = render(<Footer variant="negative" />);
    const rootElement = container.querySelector('.footer__root');
    expect(rootElement).toHaveClass('--negative');
  });

  it('deve renderizar colunas com links corretamente', () => {
    const columns = [
      {
        title: 'Coluna 1',
        links: [
          { label: 'Link 1', href: '#link1' },
          { label: 'Link 2', href: '#link2' }
        ]
      }
    ];

    render(<Footer columns={columns} />);
    
    expect(screen.getByText('Coluna 1')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('deve renderizar a seção de marca corretamente', () => {
    const brand = {
      title: 'Minha Empresa'
    };

    render(<Footer brand={brand} />);
    
    expect(screen.getByText('Minha Empresa')).toBeInTheDocument();
  });

  it('deve renderizar links de rodapé corretamente', () => {
    const bottomLinks = [
      { label: 'Política de Privacidade', href: '#privacy' },
      { label: 'Termos de Uso', href: '#terms' }
    ];

    render(<Footer bottomLinks={bottomLinks} />);
    
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
  });

  it('deve renderizar conteúdo personalizado quando children é fornecido', () => {
    render(
      <Footer>
        <div data-testid="custom-content">Conteúdo personalizado</div>
      </Footer>
    );
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo personalizado')).toBeInTheDocument();
  });
});
