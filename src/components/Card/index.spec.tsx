import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Card', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(
      <Card>
        <div data-testid="card-content">Conteúdo do Card</div>
      </Card>
    );
    
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
    expect(cardContent).toHaveTextContent('Conteúdo do Card');
    
    // Verificar se o wrapper do card tem a classe base
    const cardElement = cardContent.parentElement;
    expect(cardElement).toHaveClass('card');
  });

  it('deve aplicar classe de sombra quando a prop shadow é true', () => {
    render(
      <Card shadow>
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveClass('card--shadow');
  });

  it('deve aplicar classe de borda quando a prop border é true', () => {
    render(
      <Card border>
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveClass('card--border');
  });

  it('deve aplicar largura personalizada quando a prop width é fornecida', () => {
    render(
      <Card width="300px">
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveStyle({ width: '300px' });
  });

  it('deve aplicar efeito hover quando a prop hover é true', () => {
    render(
      <Card hover>
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveClass('card--hover');
  });

  it('deve aplicar estilos personalizados quando fornecidos', () => {
    render(
      <Card style={{ backgroundColor: 'red', padding: '20px' }}>
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveStyle({ 
      backgroundColor: 'red', 
      padding: '20px' 
    });
  });

  it('deve aplicar classes personalizadas quando a prop className é fornecida', () => {
    render(
      <Card className="custom-class">
        <div>Conteúdo</div>
      </Card>
    );
    
    const cardElement = screen.getByText('Conteúdo').parentElement;
    expect(cardElement).toHaveClass('custom-class');
  });
});
