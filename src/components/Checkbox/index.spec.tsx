import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Checkbox', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('checkbox__root');
    expect(checkbox).toHaveClass('--default');
    
    // Verificar se o SVG foi renderizado
    const svg = screen.getByTitle('checkbox');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('checkbox__svg');
    
    // Verificar se o label está vazio por padrão
    const label = screen.getByRole('generic', { hidden: true });
    expect(label).toHaveClass('checkbox__label');
    expect(label).toBeEmptyDOMElement();
  });

  it('deve renderizar com label', () => {
    render(<Checkbox label="Aceito os termos" data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    
    // Verificar se o label foi renderizado corretamente
    const label = screen.getByText('Aceito os termos');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('checkbox__label');
  });

  it('deve renderizar com variante checked', () => {
    render(<Checkbox variant="checked" data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('--checked');
    expect(checkbox).not.toHaveClass('--default');
  });

  it('deve renderizar com variante disabled', () => {
    render(<Checkbox variant="disabled" data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('--disabled');
    expect(checkbox).not.toHaveClass('--default');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('custom-class');
    expect(checkbox).toHaveClass('checkbox__root');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <Checkbox 
        data-testid="checkbox"
        aria-label="Caixa de seleção"
        role="checkbox"
        aria-checked="false"
      />
    );
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Caixa de seleção');
    expect(checkbox).toHaveAttribute('role', 'checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('deve renderizar com título', () => {
    render(<Checkbox title="Título da checkbox" data-testid="checkbox" />);
    
    const checkboxInput = screen.getByTitle('Título da checkbox');
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveClass('checkbox__input');
  });

  it('deve renderizar com HTML no label', () => {
    render(
      <Checkbox 
        label="Aceito os <strong>termos</strong>" 
        data-testid="checkbox" 
      />
    );
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    
    // Verificar se o HTML no label foi renderizado corretamente
    const label = screen.getByRole('generic', { hidden: true });
    expect(label).toHaveClass('checkbox__label');
    
    // O HTML deve estar presente no innerHTML
    expect(label.innerHTML).toContain('<strong>termos</strong>');
  });

  it('deve renderizar o SVG com os atributos corretos', () => {
    render(<Checkbox data-testid="checkbox" />);
    
    const svg = screen.getByTitle('checkbox');
    expect(svg).toHaveAttribute('width', '21');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('viewBox', '0 0 21 20');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Verificar se o path do SVG está presente
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke', 'white');
    expect(path).toHaveAttribute('stroke-width', '3');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });
});
