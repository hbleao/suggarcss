import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardContent } from './index';

describe('<CardContent />', () => {
  it('deve renderizar com o tema padrão', () => {
    const { container } = render(<CardContent />);
    const rootElement = container.querySelector('.card-content__root');
    expect(rootElement).toHaveClass('--light');
  });

  it('deve renderizar com o tema escuro quando especificado', () => {
    const { container } = render(<CardContent theme="dark" />);
    const rootElement = container.querySelector('.card-content__root');
    expect(rootElement).toHaveClass('--dark');
  });

  it('deve renderizar o título corretamente', () => {
    render(<CardContent title="Título do Card" />);
    expect(screen.getByText('Título do Card')).toBeInTheDocument();
    expect(screen.getByText('Título do Card')).toHaveClass('card-content__title');
  });

  it('deve renderizar a descrição corretamente', () => {
    render(<CardContent description="Descrição do Card" />);
    expect(screen.getByText('Descrição do Card')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Card')).toHaveClass('card-content__description');
  });

  it('deve renderizar a imagem corretamente', () => {
    render(<CardContent image={<img data-testid="card-image" alt="Card" src="/card.jpg" />} />);
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
  });

  it('deve renderizar os botões corretamente', () => {
    const buttons = [
      { label: 'Botão Primário', variant: 'primary' },
      { label: 'Botão Secundário', variant: 'secondary' }
    ];

    render(<CardContent buttons={buttons} />);
    
    expect(screen.getByText('Botão Primário')).toBeInTheDocument();
    expect(screen.getByText('Botão Secundário')).toBeInTheDocument();
  });

  it('deve chamar a função onClick quando um botão é clicado', () => {
    const handleClick = jest.fn();
    const buttons = [
      { label: 'Botão Clicável', variant: 'primary', onClick: handleClick }
    ];

    render(<CardContent buttons={buttons} />);
    
    fireEvent.click(screen.getByText('Botão Clicável'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar as propriedades adicionais ao título', () => {
    render(
      <CardContent 
        title="Título Personalizado" 
        titleProps={{ 
          variant: 'title3', 
          weight: 'semibold', 
          'data-testid': 'custom-title' 
        }} 
      />
    );
    
    const titleElement = screen.getByTestId('custom-title');
    expect(titleElement).toHaveTextContent('Título Personalizado');
  });

  it('deve aplicar as propriedades adicionais à descrição', () => {
    render(
      <CardContent 
        description="Descrição Personalizada" 
        descriptionProps={{ 
          variant: 'body1', 
          'data-testid': 'custom-description' 
        }} 
      />
    );
    
    const descriptionElement = screen.getByTestId('custom-description');
    expect(descriptionElement).toHaveTextContent('Descrição Personalizada');
  });

  it('deve aplicar classes CSS adicionais ao componente raiz', () => {
    const { container } = render(<CardContent className="custom-class" />);
    const rootElement = container.querySelector('.card-content__root');
    expect(rootElement).toHaveClass('custom-class');
  });
});
