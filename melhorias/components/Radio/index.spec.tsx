import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from './index';

describe('<Radio />', () => {
  it('deve renderizar o componente com a variante padrão', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('.radio__root')).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante checked', () => {
    const { container } = render(<Radio variant="checked" />);
    expect(container.querySelector('.radio__root')).toHaveClass('--checked');
  });

  it('deve renderizar o componente com a variante disabled', () => {
    const { container } = render(<Radio variant="disabled" />);
    expect(container.querySelector('.radio__root')).toHaveClass('--disabled');
  });

  it('deve renderizar o componente com a descrição fornecida', () => {
    render(<Radio description="Opção 1" />);
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 1')).toHaveClass('radio__label');
  });

  it('deve renderizar o componente sem descrição quando não fornecida', () => {
    const { container } = render(<Radio />);
    const labelElement = container.querySelector('.radio__label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent('');
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    const { container } = render(<Radio className="custom-class" />);
    expect(container.querySelector('.radio__root')).toHaveClass('custom-class');
  });

  it('deve passar propriedades adicionais para o elemento raiz', () => {
    const { container } = render(<Radio data-testid="radio-test" />);
    expect(container.querySelector('[data-testid="radio-test"]')).toBeInTheDocument();
  });

  it('deve renderizar o SVG do ícone de radio', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('.radio__svg')).toBeInTheDocument();
    expect(container.querySelector('svg title')).toHaveTextContent('radio');
  });

  it('deve renderizar o elemento input dentro do radio__input', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('.radio__input')).toBeInTheDocument();
  });

  it('deve manter as propriedades do SVG consistentes', () => {
    const { container } = render(<Radio />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '21');
    expect(svgElement).toHaveAttribute('height', '20');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 21 20');
  });
});
