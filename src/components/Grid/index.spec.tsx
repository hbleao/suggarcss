import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from './index';

// Mock do módulo de estilos
jest.mock('./styles.module.scss', () => ({
  grid: 'grid-class'
}));

// Mock do hook useMediaQuery
jest.mock('@/hooks', () => ({
  useMediaQuery: jest.fn().mockReturnValue(false) // Por padrão, não é portrait
}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Grid', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-class');
    
    // Verificar estilos padrão
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(12, 1fr)', // Não é portrait
      gap: '1rem',
      background: ''
    });
    
    // Verificar se os filhos foram renderizados
    expect(grid).toHaveTextContent('Item 1');
    expect(grid).toHaveTextContent('Item 2');
  });

  it('deve renderizar com gap personalizado', () => {
    render(
      <Grid gap="2rem" data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gap: '2rem'
    });
  });

  it('deve renderizar com background personalizado', () => {
    render(
      <Grid background="#f5f5f5" data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      background: '#f5f5f5'
    });
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('custom-class');
    expect(grid).toHaveClass('grid-class');
  });

  it('deve renderizar com 8 colunas em modo portrait', () => {
    // Alterar o retorno do mock para simular modo portrait
    const { useMediaQuery } = require('@/hooks');
    useMediaQuery.mockReturnValue(true);
    
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(8, 1fr)'
    });
    
    // Restaurar o mock para o valor padrão
    useMediaQuery.mockReturnValue(false);
  });

  it('deve renderizar com 12 colunas em modo landscape', () => {
    // Garantir que o mock retorne false para simular modo landscape
    const { useMediaQuery } = require('@/hooks');
    useMediaQuery.mockReturnValue(false);
    
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(12, 1fr)'
    });
  });

  it('deve combinar múltiplas propriedades personalizadas', () => {
    render(
      <Grid 
        gap="3rem"
        background="#e0e0e0"
        className="custom-class"
        data-testid="grid"
      >
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('custom-class');
    expect(grid).toHaveStyle({
      gap: '3rem',
      background: '#e0e0e0',
      gridTemplateColumns: 'repeat(12, 1fr)'
    });
  });

  it('deve renderizar sem filhos', () => {
    render(<Grid data-testid="grid" />);
    
    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toBeEmptyDOMElement();
  });

  it('deve renderizar com variáveis CSS como gap', () => {
    render(
      <Grid gap="var(--spacing-md)" data-testid="grid">
        <div>Item 1</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gap: 'var(--spacing-md)'
    });
  });
});
