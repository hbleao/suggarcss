import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextBody } from './index';

// Mock dos componentes dependentes
jest.mock('@/components', () => ({
  Typography: ({ children, variant, weight, as, color, className }: any) => (
    <div 
      data-testid="mock-typography"
      data-variant={variant}
      data-weight={weight}
      data-as={as}
      data-color={color}
      className={className}
    >
      {children}
    </div>
  )
}));

jest.mock('../Button', () => ({
  Button: ({ children, size, styles, variant, width, disabled, isLoading, ...props }: any) => (
    <button 
      data-testid="mock-button"
      data-size={size}
      data-styles={styles}
      data-variant={variant}
      data-width={width}
      data-disabled={disabled ? 'true' : 'false'}
      data-loading={isLoading ? 'true' : 'false'}
      {...props}
    >
      {children}
    </button>
  )
}));

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('TextBody', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<TextBody buttons={[]} data-testid="text-body" />);
    
    const textBody = screen.getByTestId('text-body');
    expect(textBody).toBeInTheDocument();
    expect(textBody).toHaveClass('text-body__root');
    
    // Verificar se o título padrão foi renderizado
    const title = screen.getByTestId('mock-typography');
    expect(title).toHaveAttribute('data-variant', 'title4');
    expect(title).toHaveAttribute('data-weight', 'medium');
    expect(title).toHaveAttribute('data-as', 'h3');
    expect(title).toHaveClass('text-body__title');
    expect(title).toHaveTextContent('title');
  });

  it('deve renderizar com título personalizado', () => {
    render(<TextBody title="Título personalizado" buttons={[]} />);
    
    const title = screen.getByTestId('mock-typography');
    expect(title).toHaveTextContent('Título personalizado');
  });

  it('deve renderizar com subtítulo quando fornecido', () => {
    render(<TextBody subtitle="Subtítulo de exemplo" buttons={[]} />);
    
    const typographyElements = screen.getAllByTestId('mock-typography');
    
    // O segundo elemento deve ser o subtítulo
    const subtitle = typographyElements[1];
    expect(subtitle).toHaveAttribute('data-variant', 'body1');
    expect(subtitle).toHaveAttribute('data-weight', 'bold');
    expect(subtitle).toHaveAttribute('data-as', 'p');
    expect(subtitle).toHaveAttribute('data-color', 'neutral-700');
    expect(subtitle).toHaveClass('text-body__subtitle');
    expect(subtitle).toHaveTextContent('Subtítulo de exemplo');
  });

  it('não deve renderizar subtítulo quando não fornecido', () => {
    render(<TextBody buttons={[]} />);
    
    const typographyElements = screen.getAllByTestId('mock-typography');
    
    // Deve haver apenas um elemento Typography (o título)
    expect(typographyElements).toHaveLength(1);
    
    // Verificar se não existe elemento com a classe text-body__subtitle
    const subtitle = screen.queryByText('text-body__subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('deve renderizar texto quando fornecido', () => {
    render(<TextBody text="Texto de exemplo" buttons={[]} />);
    
    const typographyElements = screen.getAllByTestId('mock-typography');
    
    // O segundo elemento deve ser o texto
    const text = typographyElements[1];
    expect(text).toHaveAttribute('data-variant', 'body2');
    expect(text).toHaveAttribute('data-weight', 'regular');
    expect(text).toHaveAttribute('data-as', 'p');
    expect(text).toHaveClass('text-body__text');
    
    // Verificar se o span com dangerouslySetInnerHTML está presente
    // Nota: não podemos verificar diretamente o conteúdo do dangerouslySetInnerHTML
    const span = text.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('deve renderizar botões quando fornecidos', () => {
    const mockButtons = [
      { label: 'Botão 1', variant: 'primary' },
      { label: 'Botão 2', variant: 'secondary', disabled: true }
    ];
    
    render(<TextBody buttons={mockButtons} />);
    
    // Verificar se o container de botões foi renderizado
    const buttonContainer = screen.getByRole('generic', { hidden: true });
    expect(buttonContainer).toHaveClass('text-body__buttons');
    
    // Verificar se os botões foram renderizados
    const buttons = screen.getAllByTestId('mock-button');
    expect(buttons).toHaveLength(2);
    
    // Verificar o primeiro botão
    expect(buttons[0]).toHaveTextContent('Botão 1');
    expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
    
    // Verificar o segundo botão
    expect(buttons[1]).toHaveTextContent('Botão 2');
    expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
    expect(buttons[1]).toHaveAttribute('data-disabled', 'true');
  });

  it('não deve renderizar container de botões quando não houver botões', () => {
    render(<TextBody buttons={[]} />);
    
    // Verificar se o container de botões não foi renderizado
    const buttonContainer = screen.queryByRole('generic', { hidden: true });
    expect(buttonContainer).not.toHaveClass('text-body__buttons');
    
    // Verificar se não há botões
    const buttons = screen.queryAllByTestId('mock-button');
    expect(buttons).toHaveLength(0);
  });

  it('deve renderizar todos os elementos quando fornecidos', () => {
    const mockButtons = [
      { label: 'Saiba mais', variant: 'primary' }
    ];
    
    render(
      <TextBody 
        title="Título completo"
        subtitle="Subtítulo completo"
        text="Texto completo com <strong>HTML</strong>"
        buttons={mockButtons}
      />
    );
    
    const typographyElements = screen.getAllByTestId('mock-typography');
    
    // Deve haver três elementos Typography (título, subtítulo e texto)
    expect(typographyElements).toHaveLength(3);
    
    // Verificar título
    expect(typographyElements[0]).toHaveTextContent('Título completo');
    
    // Verificar subtítulo
    expect(typographyElements[1]).toHaveTextContent('Subtítulo completo');
    
    // Verificar texto
    expect(typographyElements[2]).toHaveClass('text-body__text');
    
    // Verificar botão
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveTextContent('Saiba mais');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <TextBody 
        buttons={[]}
        data-testid="text-body"
        aria-label="Corpo de texto"
        title="Título do elemento"
        role="region"
      />
    );
    
    const textBody = screen.getByTestId('text-body');
    expect(textBody).toHaveAttribute('aria-label', 'Corpo de texto');
    expect(textBody).toHaveAttribute('title', 'Título do elemento');
    expect(textBody).toHaveAttribute('role', 'region');
  });
});
