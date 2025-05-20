import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Radio', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Radio data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveClass('radio__root');
    expect(radio).toHaveClass('--default');
    
    // Verificar se o SVG foi renderizado
    const svg = screen.getByTitle('radio');
    expect(svg).toBeInTheDocument();
    
    // Verificar se o label está vazio por padrão
    const label = screen.getByText('');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('radio__label');
  });

  it('deve renderizar com descrição', () => {
    render(<Radio description="Opção 1" data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toBeInTheDocument();
    
    const label = screen.getByText('Opção 1');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('radio__label');
  });

  it('deve renderizar com variante checked', () => {
    render(<Radio variant="checked" data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('--checked');
    expect(radio).not.toHaveClass('--default');
  });

  it('deve renderizar com variante disabled', () => {
    render(<Radio variant="disabled" data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('--disabled');
    expect(radio).not.toHaveClass('--default');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Radio className="custom-class" data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('custom-class');
    expect(radio).toHaveClass('radio__root');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <Radio 
        data-testid="radio"
        aria-label="Opção de rádio"
        title="Selecione esta opção"
        role="radio"
      />
    );
    
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveAttribute('aria-label', 'Opção de rádio');
    expect(radio).toHaveAttribute('title', 'Selecione esta opção');
    expect(radio).toHaveAttribute('role', 'radio');
  });

  it('deve renderizar com descrição longa', () => {
    const longDescription = 'Esta é uma descrição muito longa para testar como o componente lida com textos extensos que podem quebrar em múltiplas linhas';
    render(<Radio description={longDescription} data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toBeInTheDocument();
    
    const label = screen.getByText(longDescription);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('radio__label');
  });

  it('deve renderizar o SVG com os atributos corretos', () => {
    render(<Radio data-testid="radio" />);
    
    const svg = screen.getByTitle('radio');
    expect(svg).toHaveAttribute('width', '21');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('viewBox', '0 0 21 20');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svg).toHaveClass('radio__svg');
    
    // Verificar se o path do SVG está presente
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke', 'white');
    expect(path).toHaveAttribute('stroke-width', '3');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });
});
