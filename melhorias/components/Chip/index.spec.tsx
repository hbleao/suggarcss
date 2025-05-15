import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip } from './index';

describe('<Chip />', () => {
  it('deve renderizar o componente com o tema padrão (light)', () => {
    const { container } = render(<Chip>Chip de teste</Chip>);
    expect(container.querySelector('.chip')).toHaveClass('--light');
  });

  it('deve renderizar o componente com o tema dark quando especificado', () => {
    const { container } = render(<Chip theme="dark">Chip de teste</Chip>);
    expect(container.querySelector('.chip')).toHaveClass('--dark');
  });

  it('deve renderizar o componente com a variante padrão (default)', () => {
    const { container } = render(<Chip>Chip de teste</Chip>);
    expect(container.querySelector('.chip')).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante selected quando especificada', () => {
    const { container } = render(<Chip variant="selected">Chip de teste</Chip>);
    expect(container.querySelector('.chip')).toHaveClass('--selected');
  });

  it('deve renderizar o texto do children corretamente', () => {
    render(<Chip>Texto do chip</Chip>);
    expect(screen.getByText('Texto do chip')).toBeInTheDocument();
  });

  it('deve renderizar elementos complexos como children', () => {
    render(
      <Chip>
        <span data-testid="chip-content">Conteúdo complexo</span>
      </Chip>
    );
    expect(screen.getByTestId('chip-content')).toBeInTheDocument();
  });

  it('deve renderizar o conteúdo dentro do elemento chip__text', () => {
    const { container } = render(<Chip>Texto do chip</Chip>);
    const textElement = container.querySelector('.chip__text');
    expect(textElement).toHaveTextContent('Texto do chip');
  });

  it('deve combinar corretamente tema e variante', () => {
    const { container } = render(
      <Chip theme="dark" variant="selected">
        Chip temático
      </Chip>
    );
    const chipElement = container.querySelector('.chip');
    expect(chipElement).toHaveClass('--dark');
    expect(chipElement).toHaveClass('--selected');
  });
});
