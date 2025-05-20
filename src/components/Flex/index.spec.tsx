import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from './index';

// Mock do módulo de estilos
jest.mock('./styles.module.scss', () => ({
  flex: 'flex-class',
  inline: 'inline-class'
}));

describe('Flex', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(
      <Flex data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex-class');
    
    // Verificar estilos padrão
    expect(container).toHaveStyle({
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap'
    });
    
    // Verificar se os filhos foram renderizados
    expect(container).toHaveTextContent('Item 1');
    expect(container).toHaveTextContent('Item 2');
  });

  it('deve renderizar com direção column', () => {
    render(
      <Flex direction="column" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      flexDirection: 'column'
    });
  });

  it('deve renderizar com alinhamento center', () => {
    render(
      <Flex align="center" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      alignItems: 'center'
    });
  });

  it('deve renderizar com justificação space-between', () => {
    render(
      <Flex justify="space-between" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      justifyContent: 'space-between'
    });
  });

  it('deve renderizar com wrap', () => {
    render(
      <Flex wrap="wrap" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      flexWrap: 'wrap'
    });
  });

  it('deve renderizar com gap', () => {
    render(
      <Flex gap="1rem" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      gap: '1rem'
    });
  });

  it('deve renderizar como inline-flex quando inline=true', () => {
    render(
      <Flex inline data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveClass('inline-class');
  });

  it('deve renderizar com elemento HTML personalizado', () => {
    render(
      <Flex as="section" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container.tagName.toLowerCase()).toBe('section');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(
      <Flex className="custom-class" data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('flex-class');
  });

  it('deve aplicar estilos inline adicionais', () => {
    render(
      <Flex style={{ color: 'red' }} data-testid="flex-container">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({ color: 'red' });
  });

  it('deve combinar múltiplas propriedades flex', () => {
    render(
      <Flex 
        direction="column"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap="2rem"
        data-testid="flex-container"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    
    const container = screen.getByTestId('flex-container');
    expect(container).toHaveStyle({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem'
    });
  });

  it('deve renderizar sem filhos', () => {
    render(<Flex data-testid="flex-container" />);
    
    const container = screen.getByTestId('flex-container');
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
