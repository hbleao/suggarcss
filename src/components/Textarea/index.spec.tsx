import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Textarea', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Textarea data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toBeInTheDocument();
    expect(textareaRoot).toHaveClass('textarea__root');
    expect(textareaRoot).toHaveClass('--default');
    expect(textareaRoot).toHaveClass('--contain');
    
    const textareaField = screen.getByRole('textbox');
    expect(textareaField).toBeInTheDocument();
    expect(textareaField).toHaveClass('textarea__field');
    expect(textareaField).toHaveAttribute('rows', '5');
    
    const counter = screen.getByText('0 / 200');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveClass('textarea__counter');
  });

  it('deve renderizar com label quando fornecido', () => {
    render(<Textarea label="Descrição" name="description" />);
    
    const label = screen.getByText('Descrição');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('textarea__label');
    expect(label).toHaveAttribute('for', 'description');
  });

  it('deve renderizar com número personalizado de linhas', () => {
    render(<Textarea rows={10} />);
    
    const textareaField = screen.getByRole('textbox');
    expect(textareaField).toHaveAttribute('rows', '10');
  });

  it('deve aplicar classe --filled quando tem valor', () => {
    render(<Textarea value="Texto de exemplo" data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveClass('--filled');
    
    const counter = screen.getByText('17 / 200');
    expect(counter).toBeInTheDocument();
  });

  it('deve aplicar classe --disabled quando desabilitado', () => {
    render(<Textarea disabled data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveClass('--disabled');
  });

  it('deve aplicar classe --error quando tem mensagem de erro', () => {
    render(<Textarea errorMessage="Campo obrigatório" data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveClass('--error');
    
    const errorMessage = screen.getByText('Campo obrigatório');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('input__error-message');
  });

  it('deve renderizar texto de ajuda quando fornecido', () => {
    render(<Textarea helperText="Máximo de 200 caracteres" />);
    
    const helperText = screen.getByText('Máximo de 200 caracteres');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('input__helper-text');
  });

  it('deve priorizar mensagem de erro sobre texto de ajuda', () => {
    render(
      <Textarea 
        helperText="Máximo de 200 caracteres" 
        errorMessage="Campo obrigatório" 
      />
    );
    
    const errorMessage = screen.getByText('Campo obrigatório');
    expect(errorMessage).toBeInTheDocument();
    
    const helperText = screen.queryByText('Máximo de 200 caracteres');
    expect(helperText).not.toBeInTheDocument();
  });

  it('deve aplicar classe --focused ao receber foco', () => {
    render(<Textarea data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    const textareaField = screen.getByRole('textbox');
    
    // Inicialmente não deve ter a classe --focused
    expect(textareaRoot).not.toHaveClass('--focused');
    
    // Simular foco
    fireEvent.focus(textareaField);
    expect(textareaRoot).toHaveClass('--focused');
    
    // Simular perda de foco
    fireEvent.blur(textareaField);
    expect(textareaRoot).not.toHaveClass('--focused');
  });

  it('não deve aplicar classe --focused quando desabilitado', () => {
    render(<Textarea disabled data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    const textareaField = screen.getByRole('textbox');
    
    // Simular foco
    fireEvent.focus(textareaField);
    expect(textareaRoot).not.toHaveClass('--focused');
  });

  it('não deve aplicar classe --focused quando tem erro', () => {
    render(<Textarea errorMessage="Campo obrigatório" data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    const textareaField = screen.getByRole('textbox');
    
    // Simular foco
    fireEvent.focus(textareaField);
    expect(textareaRoot).not.toHaveClass('--focused');
  });

  it('deve chamar onChange quando o valor é alterado', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    
    const textareaField = screen.getByRole('textbox');
    
    // Simular digitação
    fireEvent.change(textareaField, { target: { value: 'Novo texto' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar com variante outlined', () => {
    render(<Textarea variant="outlined" data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveClass('--outlined');
    expect(textareaRoot).not.toHaveClass('--default');
  });

  it('deve renderizar com largura fluid', () => {
    render(<Textarea width="fluid" data-testid="textarea-root" />);
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveClass('--fluid');
    expect(textareaRoot).not.toHaveClass('--contain');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <Textarea 
        data-testid="textarea-root"
        aria-label="Campo de descrição"
        title="Insira sua descrição aqui"
      />
    );
    
    const textareaRoot = screen.getByTestId('textarea-root');
    expect(textareaRoot).toHaveAttribute('aria-label', 'Campo de descrição');
    expect(textareaRoot).toHaveAttribute('title', 'Insira sua descrição aqui');
  });

  it('deve renderizar com nome e id corretos', () => {
    render(<Textarea name="comments" />);
    
    const textareaField = screen.getByRole('textbox');
    expect(textareaField).toHaveAttribute('name', 'comments');
    expect(textareaField).toHaveAttribute('id', 'comments');
  });
});
