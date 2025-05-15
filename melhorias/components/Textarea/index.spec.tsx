import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './index';

describe('<Textarea />', () => {
  const defaultProps = {
    name: 'testTextarea',
    label: 'Test Label',
    value: '',
    onChange: jest.fn(),
  };

  it('deve renderizar o componente com a variante padrão', () => {
    const { container } = render(<Textarea {...defaultProps} />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante outlined', () => {
    const { container } = render(<Textarea {...defaultProps} variant="outlined" />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--outlined');
  });

  it('deve renderizar o componente com largura padrão (contain)', () => {
    const { container } = render(<Textarea {...defaultProps} />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--contain');
  });

  it('deve renderizar o componente com largura fluid', () => {
    const { container } = render(<Textarea {...defaultProps} width="fluid" />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--fluid');
  });

  it('deve renderizar o label quando fornecido', () => {
    render(<Textarea {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toHaveClass('textarea__label');
  });

  it('não deve renderizar o label quando não fornecido', () => {
    const { container } = render(<Textarea name="testTextarea" />);
    expect(container.querySelector('.textarea__label')).not.toBeInTheDocument();
  });

  it('deve aplicar a classe --filled quando há valor', () => {
    const { container } = render(<Textarea {...defaultProps} value="Texto de teste" />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--filled');
  });

  it('deve aplicar a classe --disabled quando desabilitado', () => {
    const { container } = render(<Textarea {...defaultProps} disabled />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--disabled');
  });

  it('deve aplicar a classe --error quando há mensagem de erro', () => {
    const { container } = render(<Textarea {...defaultProps} errorMessage="Erro no campo" />);
    expect(container.querySelector('.textarea__root')).toHaveClass('--error');
  });

  it('deve aplicar a classe --focused ao receber foco', () => {
    const { container } = render(<Textarea {...defaultProps} />);
    const textarea = container.querySelector('textarea');
    
    fireEvent.focus(textarea);
    expect(container.querySelector('.textarea__root')).toHaveClass('--focused');
    
    fireEvent.blur(textarea);
    expect(container.querySelector('.textarea__root')).not.toHaveClass('--focused');
  });

  it('não deve aplicar a classe --focused quando desabilitado', () => {
    const { container } = render(<Textarea {...defaultProps} disabled />);
    const textarea = container.querySelector('textarea');
    
    fireEvent.focus(textarea);
    expect(container.querySelector('.textarea__root')).not.toHaveClass('--focused');
  });

  it('não deve aplicar a classe --focused quando há erro', () => {
    const { container } = render(<Textarea {...defaultProps} errorMessage="Erro no campo" />);
    const textarea = container.querySelector('textarea');
    
    fireEvent.focus(textarea);
    expect(container.querySelector('.textarea__root')).not.toHaveClass('--focused');
  });

  it('deve chamar onChange quando o valor é alterado', () => {
    const handleChange = jest.fn();
    render(<Textarea {...defaultProps} onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Novo texto' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar o contador de caracteres', () => {
    render(<Textarea {...defaultProps} value="Texto de teste" />);
    expect(screen.getByText('Texto de teste'.length + ' / 200')).toBeInTheDocument();
    expect(screen.getByText('Texto de teste'.length + ' / 200')).toHaveClass('textarea__counter');
  });

  it('deve renderizar o texto de ajuda quando fornecido e não há erro', () => {
    render(<Textarea {...defaultProps} helperText="Texto de ajuda" />);
    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    expect(screen.getByText('Texto de ajuda')).toHaveClass('input__helper-text');
  });

  it('deve renderizar a mensagem de erro quando fornecida', () => {
    render(<Textarea {...defaultProps} errorMessage="Mensagem de erro" />);
    expect(screen.getByText('Mensagem de erro')).toBeInTheDocument();
    expect(screen.getByText('Mensagem de erro')).toHaveClass('input__error-message');
  });

  it('não deve renderizar o texto de ajuda quando há mensagem de erro', () => {
    const { container } = render(
      <Textarea 
        {...defaultProps} 
        helperText="Texto de ajuda" 
        errorMessage="Mensagem de erro" 
      />
    );
    
    expect(screen.getByText('Mensagem de erro')).toBeInTheDocument();
    expect(container.querySelector('.input__helper-text')).not.toBeInTheDocument();
  });

  it('deve definir o número de linhas do textarea', () => {
    render(<Textarea {...defaultProps} rows={10} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('deve usar 5 linhas como padrão quando não especificado', () => {
    render(<Textarea {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('deve passar propriedades adicionais para o elemento raiz', () => {
    render(<Textarea {...defaultProps} data-testid="textarea-test" />);
    expect(screen.getByTestId('textarea-test')).toBeInTheDocument();
  });
});
