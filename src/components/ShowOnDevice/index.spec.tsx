import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShowOnDevice } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('ShowOnDevice', () => {
  it('deve renderizar corretamente com orientação greaterThan', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="desktop" data-testid="show-device">
        <p>Conteúdo visível em desktop ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('show-on-device');
    expect(container).toHaveClass('greaterThan');
    expect(container).toHaveClass('desktop');
    
    // Verificar se o conteúdo foi renderizado
    expect(container).toHaveTextContent('Conteúdo visível em desktop ou maior');
  });

  it('deve renderizar corretamente com orientação lessThan', () => {
    render(
      <ShowOnDevice orientation="lessThan" media="tabletLandscape" data-testid="show-device">
        <p>Conteúdo visível em dispositivos menores que tablet landscape</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('show-on-device');
    expect(container).toHaveClass('lessThan');
    expect(container).toHaveClass('tabletLandscape');
    
    // Verificar se o conteúdo foi renderizado
    expect(container).toHaveTextContent('Conteúdo visível em dispositivos menores que tablet landscape');
  });

  it('deve renderizar com media mobile', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="mobile" data-testid="show-device">
        <p>Conteúdo visível em mobile ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toHaveClass('mobile');
  });

  it('deve renderizar com media tabletPortrait', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="tabletPortrait" data-testid="show-device">
        <p>Conteúdo visível em tablet portrait ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toHaveClass('tabletPortrait');
  });

  it('deve renderizar com media tabletLandscape', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="tabletLandscape" data-testid="show-device">
        <p>Conteúdo visível em tablet landscape ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toHaveClass('tabletLandscape');
  });

  it('deve renderizar com media desktop', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="desktop" data-testid="show-device">
        <p>Conteúdo visível em desktop ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toHaveClass('desktop');
  });

  it('deve renderizar com media wide', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="wide" data-testid="show-device">
        <p>Conteúdo visível em telas wide ou maior</p>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    expect(container).toHaveClass('wide');
  });

  it('deve renderizar elementos filhos complexos', () => {
    render(
      <ShowOnDevice orientation="greaterThan" media="desktop" data-testid="show-device">
        <div data-testid="child-div">
          <h1>Título</h1>
          <p>Parágrafo</p>
          <button>Botão</button>
        </div>
      </ShowOnDevice>
    );
    
    const container = screen.getByTestId('show-device');
    const childDiv = screen.getByTestId('child-div');
    const heading = screen.getByRole('heading');
    const paragraph = screen.getByText('Parágrafo');
    const button = screen.getByRole('button');
    
    expect(childDiv).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
