import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spacing } from './index';

// Mock do módulo de estilos
jest.mock('./styles.module.scss', () => ({
  spacing: 'spacing-class',
  inline: 'inline-class'
}));

describe('Spacing', () => {
  it('deve renderizar com espaçamento vertical', () => {
    render(
      <Spacing y="1rem" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: '1rem',
      marginBottom: '1rem',
    });
  });
  
  it('deve renderizar com espaçamento horizontal', () => {
    render(
      <Spacing x="1.5em" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginLeft: '1.5em',
      marginRight: '1.5em',
    });
  });
  
  it('deve renderizar com espaçamento em todos os lados', () => {
    render(
      <Spacing all="0.5rem" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
    });
  });
  
  it('deve renderizar com espaçamento em lados específicos', () => {
    render(
      <Spacing top="2rem" bottom="0.25rem" left="1rem" right="1.5rem" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: '2rem',
      marginBottom: '0.25rem',
      marginLeft: '1rem',
      marginRight: '1.5rem',
    });
  });
  
  it('deve renderizar com valores numéricos de espaçamento', () => {
    render(
      <Spacing top={2} bottom={1} data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: '2rem',
      marginBottom: '1rem',
    });
  });
  
  it('deve renderizar como elemento inline quando inline=true', () => {
    render(
      <Spacing inline data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveClass('inline-class');
  });
  
  it('deve renderizar como um espaçador vazio sem filhos', () => {
    render(<Spacing y="1rem" data-testid="spacing" />);
    
    const element = screen.getByTestId('spacing');
    expect(element).toBeEmptyDOMElement();
    expect(element).toHaveAttribute('aria-hidden', 'true');
  });
  
  it('deve renderizar com o elemento HTML personalizado', () => {
    render(
      <Spacing as="section" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element.tagName.toLowerCase()).toBe('section');
  });
  
  it('deve aplicar classes CSS adicionais', () => {
    render(
      <Spacing className="custom-class" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveClass('custom-class');
  });
  
  it('deve aplicar estilos inline adicionais', () => {
    render(
      <Spacing style={{ color: 'red' }} data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({ color: 'red' });
  });

  it('deve priorizar props específicas sobre props gerais', () => {
    render(
      <Spacing y="1rem" top="2rem" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    // top deve sobrescrever y para marginTop
    expect(element).toHaveStyle({
      marginTop: '2rem',
      marginBottom: '1rem'
    });
  });

  it('deve aplicar a classe spacing por padrão', () => {
    render(
      <Spacing data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveClass('spacing-class');
  });

  it('deve renderizar com variáveis CSS', () => {
    render(
      <Spacing all="var(--spacing-md)" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-md)',
      marginLeft: 'var(--spacing-md)',
      marginRight: 'var(--spacing-md)'
    });
  });

  it('deve renderizar com unidades de porcentagem', () => {
    render(
      <Spacing x="5%" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginLeft: '5%',
      marginRight: '5%'
    });
  });
});
