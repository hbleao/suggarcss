import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spacing } from './index';

describe('Spacing', () => {
  it('deve renderizar com espaçamento vertical', () => {
    render(
      <Spacing y="md" data-testid="spacing">
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
      <Spacing x="lg" data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
    });
  });
  
  it('deve renderizar com espaçamento em todos os lados', () => {
    render(
      <Spacing all="sm" data-testid="spacing">
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
      <Spacing top="xl" bottom="xs" left="md" right="lg" data-testid="spacing">
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
      <Spacing top={24} bottom={16} data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveStyle({
      marginTop: '24px',
      marginBottom: '16px',
    });
  });
  
  it('deve renderizar como elemento inline quando inline=true', () => {
    render(
      <Spacing inline data-testid="spacing">
        <p>Conteúdo</p>
      </Spacing>
    );
    
    const element = screen.getByTestId('spacing');
    expect(element).toHaveClass('inline');
  });
  
  it('deve renderizar como um espaçador vazio sem filhos', () => {
    render(<Spacing y="md" data-testid="spacing" />);
    
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
});
