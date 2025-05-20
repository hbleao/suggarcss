import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from './index';

describe('<Tooltip />', () => {
  it('deve renderizar o elemento trigger corretamente', () => {
    render(
      <Tooltip content="Dica de teste">
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Botão com tooltip')).toBeInTheDocument();
  });

  it('deve renderizar o conteúdo do tooltip', () => {
    render(
      <Tooltip content="Dica de teste">
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Dica de teste')).toBeInTheDocument();
  });

  it('deve exibir o tooltip ao passar o mouse sobre o trigger', () => {
    const { container } = render(
      <Tooltip content="Dica de teste">
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Botão com tooltip').closest('.tooltip__trigger');
    const content = container.querySelector('.tooltip__content');
    
    expect(content).not.toHaveClass('--visible');
    
    if (trigger) {
      fireEvent.mouseEnter(trigger);
      expect(content).toHaveClass('--visible');
      
      fireEvent.mouseLeave(trigger);
      expect(content).not.toHaveClass('--visible');
    }
  });

  it('deve aplicar a posição correta ao tooltip', () => {
    const { container } = render(
      <Tooltip content="Dica de teste" position="right">
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const content = container.querySelector('.tooltip__content');
    expect(content).toHaveClass('--right');
  });

  it('deve usar a posição padrão (top) quando não especificada', () => {
    const { container } = render(
      <Tooltip content="Dica de teste">
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const content = container.querySelector('.tooltip__content');
    expect(content).toHaveClass('--top');
  });

  it('deve chamar onOpen quando o mouse entra no trigger', () => {
    const handleOpen = jest.fn();
    
    render(
      <Tooltip content="Dica de teste" onOpen={handleOpen}>
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Botão com tooltip').closest('.tooltip__trigger');
    
    if (trigger) {
      fireEvent.mouseEnter(trigger);
      expect(handleOpen).toHaveBeenCalledTimes(1);
    }
  });

  it('deve chamar onClose quando o mouse sai do trigger', () => {
    const handleClose = jest.fn();
    
    render(
      <Tooltip content="Dica de teste" onClose={handleClose}>
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Botão com tooltip').closest('.tooltip__trigger');
    
    if (trigger) {
      fireEvent.mouseEnter(trigger);
      fireEvent.mouseLeave(trigger);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('deve respeitar o estado controlado quando isOpen é fornecido', () => {
    const { container, rerender } = render(
      <Tooltip content="Dica de teste" isOpen={true}>
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    const content = container.querySelector('.tooltip__content');
    expect(content).toHaveClass('--visible');
    
    rerender(
      <Tooltip content="Dica de teste" isOpen={false}>
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    expect(content).not.toHaveClass('--visible');
  });

  it('deve aplicar classes CSS adicionais aos elementos', () => {
    const { container } = render(
      <Tooltip 
        content="Dica de teste" 
        className="custom-tooltip"
        contentClassName="custom-content"
        triggerClassName="custom-trigger"
      >
        <button>Botão com tooltip</button>
      </Tooltip>
    );
    
    expect(container.querySelector('.tooltip')).toHaveClass('custom-tooltip');
    expect(container.querySelector('.tooltip__content')).toHaveClass('custom-content');
    expect(container.querySelector('.tooltip__trigger')).toHaveClass('custom-trigger');
  });
});
