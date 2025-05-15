import React from 'react';
import { render, screen } from '@testing-library/react';
import { Row } from './index';

describe('<Row />', () => {
  it('deve renderizar o componente com valores padrão', () => {
    const { container } = render(<Row>Conteúdo da linha</Row>);
    const rowElement = container.querySelector('.row');
    
    expect(rowElement).toBeInTheDocument();
    expect(rowElement).toHaveClass('startMobile-1 endMobile-9');
    expect(rowElement).toHaveClass('startPortrait-1 endPortrait-9');
    expect(rowElement).toHaveClass('startLandscape-1 endLandscape-13');
    expect(rowElement).toHaveClass('startDesktop-1 endDesktop-13');
    expect(rowElement).toHaveClass('startWide-1 endWide-13');
  });

  it('deve renderizar o conteúdo corretamente', () => {
    render(<Row>Conteúdo da linha</Row>);
    expect(screen.getByText('Conteúdo da linha')).toBeInTheDocument();
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    const { container } = render(<Row className="custom-row">Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('custom-row');
  });

  it('deve aplicar configurações personalizadas para mobile', () => {
    const { container } = render(<Row mobile={[2, 8]}>Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('startMobile-2 endMobile-8');
  });

  it('deve aplicar configurações personalizadas para portrait', () => {
    const { container } = render(<Row portrait={[3, 7]}>Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('startPortrait-3 endPortrait-7');
  });

  it('deve aplicar configurações personalizadas para landscape', () => {
    const { container } = render(<Row landscape={[2, 12]}>Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('startLandscape-2 endLandscape-12');
  });

  it('deve aplicar configurações personalizadas para desktop', () => {
    const { container } = render(<Row desktop={[3, 11]}>Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('startDesktop-3 endDesktop-11');
  });

  it('deve aplicar configurações personalizadas para wide', () => {
    const { container } = render(<Row wide={[4, 10]}>Conteúdo da linha</Row>);
    expect(container.querySelector('.row')).toHaveClass('startWide-4 endWide-10');
  });

  it('deve aplicar todas as configurações personalizadas juntas', () => {
    const { container } = render(
      <Row 
        mobile={[2, 8]} 
        portrait={[3, 7]} 
        landscape={[2, 12]} 
        desktop={[3, 11]} 
        wide={[4, 10]}
      >
        Conteúdo da linha
      </Row>
    );
    
    const rowElement = container.querySelector('.row');
    expect(rowElement).toHaveClass('startMobile-2 endMobile-8');
    expect(rowElement).toHaveClass('startPortrait-3 endPortrait-7');
    expect(rowElement).toHaveClass('startLandscape-2 endLandscape-12');
    expect(rowElement).toHaveClass('startDesktop-3 endDesktop-11');
    expect(rowElement).toHaveClass('startWide-4 endWide-10');
  });

  it('deve passar propriedades adicionais para o elemento div', () => {
    render(<Row data-testid="row-test">Conteúdo da linha</Row>);
    expect(screen.getByTestId('row-test')).toBeInTheDocument();
    expect(screen.getByTestId('row-test')).toHaveClass('row');
  });

  it('deve renderizar elementos complexos como children', () => {
    render(
      <Row>
        <div data-testid="col-1">Coluna 1</div>
        <div data-testid="col-2">Coluna 2</div>
      </Row>
    );
    
    expect(screen.getByTestId('col-1')).toBeInTheDocument();
    expect(screen.getByTestId('col-2')).toBeInTheDocument();
  });
});
