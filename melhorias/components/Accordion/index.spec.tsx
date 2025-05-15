import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from './index';

describe('<Accordion />', () => {
  it('deve renderizar o componente com a variante padrão', () => {
    const { container } = render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(container.querySelector('.accordion__root')).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante negative', () => {
    const { container } = render(
      <Accordion variant="negative" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(container.querySelector('.accordion__root')).toHaveClass('--negative');
  });

  it('deve renderizar o componente com borda base', () => {
    const { container } = render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(container.querySelector('.accordion__root')).toHaveClass('--border-base');
  });

  it('deve renderizar o componente com borda top', () => {
    const { container } = render(
      <Accordion variant="default" border="top" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(container.querySelector('.accordion__root')).toHaveClass('--border-top');
  });

  it('deve renderizar o componente sem borda', () => {
    const { container } = render(
      <Accordion variant="default" border="none" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(container.querySelector('.accordion__root')).toHaveClass('--border-none');
  });

  it('deve renderizar o título corretamente', () => {
    render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(screen.getByText('Título do Accordion')).toBeInTheDocument();
    expect(screen.getByText('Título do Accordion')).toHaveClass('accordion__title');
  });

  it('deve renderizar o conteúdo corretamente', () => {
    render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    expect(screen.getByText('Conteúdo do accordion')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do accordion')).toHaveClass('accordion__content');
  });

  it('deve renderizar o ícone de seta', () => {
    const { container } = render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    const iconElement = container.querySelector('.accordion__icon');
    expect(iconElement).toBeInTheDocument();
    
    const svgElement = iconElement.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.querySelector('title')).toHaveTextContent('arrow');
  });

  it('deve renderizar elementos complexos como children', () => {
    render(
      <Accordion variant="default" border="base" title="Título do Accordion">
        <div data-testid="conteudo-complexo">
          <p>Parágrafo 1</p>
          <p>Parágrafo 2</p>
        </div>
      </Accordion>
    );
    expect(screen.getByTestId('conteudo-complexo')).toBeInTheDocument();
  });

  it('deve combinar corretamente variante e borda', () => {
    const { container } = render(
      <Accordion variant="negative" border="top" title="Título do Accordion">
        Conteúdo do accordion
      </Accordion>
    );
    const rootElement = container.querySelector('.accordion__root');
    expect(rootElement).toHaveClass('--negative');
    expect(rootElement).toHaveClass('--border-top');
  });
});
