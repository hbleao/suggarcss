import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './index';

describe('<Checkbox />', () => {
  it('deve renderizar o componente com a variante padrão', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('.checkbox__root')).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante checked', () => {
    const { container } = render(<Checkbox variant="checked" />);
    expect(container.querySelector('.checkbox__root')).toHaveClass('--checked');
  });

  it('deve renderizar o componente com a variante disabled', () => {
    const { container } = render(<Checkbox variant="disabled" />);
    expect(container.querySelector('.checkbox__root')).toHaveClass('--disabled');
  });

  it('deve renderizar o componente com o label fornecido', () => {
    render(<Checkbox label="Aceito os termos" />);
    expect(screen.getByText('Aceito os termos')).toBeInTheDocument();
  });

  it('deve renderizar o componente com HTML no label', () => {
    const { container } = render(<Checkbox label="<strong>Termos</strong> e condições" />);
    const labelElement = container.querySelector('.checkbox__label');
    expect(labelElement).toContainHTML('<strong>Termos</strong> e condições');
  });

  it('deve renderizar o componente com o título fornecido', () => {
    render(<Checkbox title="Título do checkbox" />);
    expect(screen.getByTitle('Título do checkbox')).toBeInTheDocument();
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    const { container } = render(<Checkbox className="custom-class" />);
    expect(container.querySelector('.checkbox__root')).toHaveClass('custom-class');
  });

  it('deve passar propriedades adicionais para o elemento raiz', () => {
    const { container } = render(<Checkbox data-testid="checkbox-test" />);
    expect(container.querySelector('[data-testid="checkbox-test"]')).toBeInTheDocument();
  });

  it('deve renderizar o SVG do ícone de check', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('.checkbox__svg')).toBeInTheDocument();
    expect(container.querySelector('svg title')).toHaveTextContent('checkbox');
  });
});
