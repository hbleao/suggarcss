import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock do componente Loader
jest.mock('../Loader', () => ({
  Loader: ({ className, color }: any) => (
    <div 
      data-testid="mock-loader"
      className={className}
      data-color={color}
    />
  ),
}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Input', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Input data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toBeInTheDocument();
    expect(inputRoot).toHaveClass('input__root');
    expect(inputRoot).toHaveClass('--default');
    expect(inputRoot).toHaveClass('--contain');
    
    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveClass('input__field');
    expect(inputField).toHaveAttribute('type', 'text');
    
    // Verificar se o label não está presente
    const label = screen.queryByRole('label');
    expect(label).not.toBeInTheDocument();
    
    // Verificar se o loader não está presente
    const loader = screen.queryByTestId('mock-loader');
    expect(loader).not.toBeInTheDocument();
    
    // Verificar se mensagens de ajuda e erro não estão presentes
    const helperText = screen.queryByRole('paragraph');
    expect(helperText).not.toBeInTheDocument();
  });

  it('deve renderizar com label quando fornecido', () => {
    render(<Input label="Nome" name="name" />);
    
    const label = screen.getByText('Nome');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('input__label');
    expect(label).toHaveAttribute('for', 'name');
  });

  it('deve renderizar com valor quando fornecido', () => {
    render(<Input value="Texto de exemplo" />);
    
    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveValue('Texto de exemplo');
    
    // Verificar se a classe --filled foi aplicada
    const inputRoot = inputField.closest('.input__root');
    expect(inputRoot).toHaveClass('--filled');
  });

  it('deve renderizar como desabilitado quando disabled=true', () => {
    render(<Input disabled />);
    
    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeDisabled();
    
    const inputRoot = inputField.closest('.input__root');
    expect(inputRoot).toHaveClass('--disabled');
  });

  it('deve renderizar com loader quando isLoading=true', () => {
    render(<Input isLoading />);
    
    const loader = screen.getByTestId('mock-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('input__loader');
    expect(loader).toHaveAttribute('data-color', 'brand-insurance-900');
  });

  it('deve renderizar com texto de ajuda quando fornecido', () => {
    render(<Input helperText="Texto de ajuda" />);
    
    const helperText = screen.getByText('Texto de ajuda');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('input__helper-text');
  });

  it('deve renderizar com mensagem de erro quando fornecida', () => {
    render(<Input errorMessage="Mensagem de erro" />);
    
    const errorMessage = screen.getByText('Mensagem de erro');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('input__error-message');
    
    const inputRoot = errorMessage.closest('.input__root');
    expect(inputRoot).toHaveClass('--error');
  });

  it('deve priorizar mensagem de erro sobre texto de ajuda', () => {
    render(<Input helperText="Texto de ajuda" errorMessage="Mensagem de erro" />);
    
    const errorMessage = screen.getByText('Mensagem de erro');
    expect(errorMessage).toBeInTheDocument();
    
    const helperText = screen.queryByText('Texto de ajuda');
    expect(helperText).not.toBeInTheDocument();
  });

  it('deve aplicar classe --focused ao receber foco', () => {
    render(<Input data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    const inputField = screen.getByRole('textbox');
    
    // Inicialmente não deve ter a classe --focused
    expect(inputRoot).not.toHaveClass('--focused');
    
    // Simular foco
    fireEvent.focus(inputField);
    expect(inputRoot).toHaveClass('--focused');
    
    // Simular perda de foco
    fireEvent.blur(inputField);
    expect(inputRoot).not.toHaveClass('--focused');
  });

  it('não deve aplicar classe --focused quando desabilitado', () => {
    render(<Input disabled data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    const inputField = screen.getByRole('textbox');
    
    // Simular foco
    fireEvent.focus(inputField);
    expect(inputRoot).not.toHaveClass('--focused');
  });

  it('deve chamar onChange quando o valor é alterado', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const inputField = screen.getByRole('textbox');
    
    // Simular digitação
    fireEvent.change(inputField, { target: { value: 'Novo texto' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar com variante outlined', () => {
    render(<Input variant="outlined" data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toHaveClass('--outlined');
    expect(inputRoot).not.toHaveClass('--default');
  });

  it('deve renderizar com largura fluid', () => {
    render(<Input width="fluid" data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toHaveClass('--fluid');
    expect(inputRoot).not.toHaveClass('--contain');
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Input className="custom-class" data-testid="input-root" />);
    
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toHaveClass('custom-class');
    expect(inputRoot).toHaveClass('input__root');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <Input 
        data-testid="input-root"
        aria-label="Campo de texto"
        title="Insira seu texto aqui"
      />
    );
    
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toHaveAttribute('aria-label', 'Campo de texto');
    expect(inputRoot).toHaveAttribute('title', 'Insira seu texto aqui');
  });

  it('deve renderizar com nome e id corretos', () => {
    render(<Input name="username" />);
    
    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveAttribute('name', 'username');
    expect(inputField).toHaveAttribute('id', 'username');
  });
});
