import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from './index';

describe('<Grid />', () => {
  it('deve renderizar o componente com a classe base', () => {
    const { container } = render(<Grid>Conteúdo do grid</Grid>);
    expect(container.querySelector('.grid')).toBeInTheDocument();
  });

  it('deve renderizar o conteúdo corretamente', () => {
    render(<Grid>Conteúdo do grid</Grid>);
    expect(screen.getByText('Conteúdo do grid')).toBeInTheDocument();
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    const { container } = render(<Grid className="custom-class">Conteúdo do grid</Grid>);
    expect(container.querySelector('.grid')).toHaveClass('custom-class');
  });

  it('deve passar propriedades adicionais para o elemento div', () => {
    render(<Grid data-testid="grid-test">Conteúdo do grid</Grid>);
    expect(screen.getByTestId('grid-test')).toBeInTheDocument();
    expect(screen.getByTestId('grid-test')).toHaveClass('grid');
  });

  it('deve renderizar elementos complexos como children', () => {
    render(
      <Grid>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
        <div data-testid="item-3">Item 3</div>
      </Grid>
    );
    
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();
  });

  it('deve manter a estrutura correta quando vazio', () => {
    const { container } = render(<Grid />);
    const gridElement = container.querySelector('.grid');
    
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toBeEmptyDOMElement();
  });
});
