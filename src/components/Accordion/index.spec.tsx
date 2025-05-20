import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Accordion', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(
      <Accordion title="Título do Accordion">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    // Verificar se o título foi renderizado
    const title = screen.getByText('Título do Accordion');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('accordion__title');
    
    // Verificar se o ícone foi renderizado
    const icon = screen.getByTitle('arrow');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveClass('accordion__icon');
    
    // Verificar se o conteúdo está inicialmente oculto
    const content = screen.queryByText('Conteúdo do accordion');
    expect(content).not.toBeInTheDocument();
    
    // Verificar as classes padrão
    const accordion = title.closest('.accordion__root');
    expect(accordion).toHaveClass('--default');
    expect(accordion).toHaveClass('--border-base');
    expect(accordion).toHaveClass('--fluid');
  });

  it('deve expandir e recolher ao clicar no trigger', () => {
    render(
      <Accordion title="Título do Accordion">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    // Verificar se o conteúdo está inicialmente oculto
    let content = screen.queryByText('Conteúdo do accordion');
    expect(content).not.toBeInTheDocument();
    
    // Clicar no trigger para expandir
    const trigger = screen.getByText('Título do Accordion').closest('.accordion__trigger');
    fireEvent.click(trigger);
    
    // Verificar se o conteúdo está visível após o clique
    content = screen.getByText('Conteúdo do accordion');
    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveClass('accordion__content');
    
    // Verificar se o ícone mudou para cima
    const icon = screen.getByTitle('arrow');
    expect(icon).toHaveClass('--up');
    expect(icon).not.toHaveClass('--down');
    
    // Clicar novamente para recolher
    fireEvent.click(trigger);
    
    // Verificar se o conteúdo está oculto novamente
    content = screen.queryByText('Conteúdo do accordion');
    expect(content).not.toBeInTheDocument();
    
    // Verificar se o ícone mudou para baixo
    const updatedIcon = screen.getByTitle('arrow');
    expect(updatedIcon).toHaveClass('--down');
    expect(updatedIcon).not.toHaveClass('--up');
  });

  it('deve expandir e recolher ao pressionar tecla no trigger', () => {
    render(
      <Accordion title="Título do Accordion">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    // Verificar se o conteúdo está inicialmente oculto
    let content = screen.queryByText('Conteúdo do accordion');
    expect(content).not.toBeInTheDocument();
    
    // Pressionar tecla no trigger para expandir
    const trigger = screen.getByText('Título do Accordion').closest('.accordion__trigger');
    fireEvent.keyDown(trigger);
    
    // Verificar se o conteúdo está visível após o keydown
    content = screen.getByText('Conteúdo do accordion');
    expect(content).toBeInTheDocument();
    
    // Pressionar tecla novamente para recolher
    fireEvent.keyDown(trigger);
    
    // Verificar se o conteúdo está oculto novamente
    content = screen.queryByText('Conteúdo do accordion');
    expect(content).not.toBeInTheDocument();
  });

  it('deve renderizar com variante negative', () => {
    render(
      <Accordion title="Título do Accordion" variant="negative">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const accordion = screen.getByText('Título do Accordion').closest('.accordion__root');
    expect(accordion).toHaveClass('--negative');
    expect(accordion).not.toHaveClass('--default');
  });

  it('deve renderizar com borda top', () => {
    render(
      <Accordion title="Título do Accordion" border="top">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const accordion = screen.getByText('Título do Accordion').closest('.accordion__root');
    expect(accordion).toHaveClass('--border-top');
    expect(accordion).not.toHaveClass('--border-base');
  });

  it('deve renderizar com borda none', () => {
    render(
      <Accordion title="Título do Accordion" border="none">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const accordion = screen.getByText('Título do Accordion').closest('.accordion__root');
    expect(accordion).toHaveClass('--border-none');
    expect(accordion).not.toHaveClass('--border-base');
  });

  it('deve renderizar com largura contain', () => {
    render(
      <Accordion title="Título do Accordion" width="contain">
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const accordion = screen.getByText('Título do Accordion').closest('.accordion__root');
    expect(accordion).toHaveClass('--contain');
    expect(accordion).not.toHaveClass('--fluid');
  });

  it('deve renderizar com conteúdo complexo', () => {
    render(
      <Accordion title="Título do Accordion">
        <div>
          <h3>Subtítulo</h3>
          <p>Parágrafo 1</p>
          <p>Parágrafo 2</p>
          <button>Botão de ação</button>
        </div>
      </Accordion>
    );
    
    // Expandir o accordion
    const trigger = screen.getByText('Título do Accordion').closest('.accordion__trigger');
    fireEvent.click(trigger);
    
    // Verificar se o conteúdo complexo foi renderizado
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo 1')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Botão de ação' })).toBeInTheDocument();
  });

  it('deve renderizar com título longo', () => {
    const longTitle = 'Este é um título muito longo para o accordion que pode quebrar em múltiplas linhas dependendo do tamanho do container';
    
    render(
      <Accordion title={longTitle}>
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const title = screen.getByText(longTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('accordion__title');
  });

  it('deve renderizar com múltiplas propriedades personalizadas', () => {
    render(
      <Accordion 
        title="Título do Accordion"
        variant="negative"
        border="none"
        width="contain"
      >
        <p>Conteúdo do accordion</p>
      </Accordion>
    );
    
    const accordion = screen.getByText('Título do Accordion').closest('.accordion__root');
    expect(accordion).toHaveClass('--negative');
    expect(accordion).toHaveClass('--border-none');
    expect(accordion).toHaveClass('--contain');
  });
});
