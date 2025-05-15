import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardIcon } from './index';

describe('<CardIcon />', () => {
  it('deve renderizar com o tema padrão', () => {
    const { container } = render(<CardIcon />);
    const rootElement = container.querySelector('.card-icon__root');
    expect(rootElement).toHaveClass('--light');
  });

  it('deve renderizar com o tema escuro quando especificado', () => {
    const { container } = render(<CardIcon theme="dark" />);
    const rootElement = container.querySelector('.card-icon__root');
    expect(rootElement).toHaveClass('--dark');
  });

  it('deve renderizar com a variante padrão', () => {
    const { container } = render(<CardIcon />);
    const rootElement = container.querySelector('.card-icon__root');
    expect(rootElement).toHaveClass('--link');
  });

  it('deve renderizar com a variante sem link quando especificado', () => {
    const { container } = render(<CardIcon variant="withoutLink" />);
    const rootElement = container.querySelector('.card-icon__root');
    expect(rootElement).toHaveClass('--withoutLink');
  });

  it('deve renderizar o ícone corretamente', () => {
    render(<CardIcon icon={{ iconName: 'home' }} />);
    const iconElement = screen.getByRole('img', { hidden: true });
    expect(iconElement).toBeInTheDocument();
  });

  it('deve renderizar o pré-título corretamente', () => {
    render(<CardIcon preTitle="Pré-título" />);
    expect(screen.getByText('Pré-título')).toBeInTheDocument();
    expect(screen.getByText('Pré-título')).toHaveClass('card-icon__pretitle');
  });

  it('deve renderizar o título corretamente', () => {
    render(<CardIcon title="Título do Card" />);
    expect(screen.getByText('Título do Card')).toBeInTheDocument();
    expect(screen.getByText('Título do Card')).toHaveClass('card-icon__title');
  });

  it('deve renderizar a descrição corretamente', () => {
    render(<CardIcon description="Descrição do card" />);
    expect(screen.getByText('Descrição do card')).toBeInTheDocument();
    expect(screen.getByText('Descrição do card')).toHaveClass('card-icon__description');
  });

  it('deve renderizar como link quando href é fornecido', () => {
    render(<CardIcon href="https://example.com" title="Card com Link" />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveTextContent('Card com Link');
  });

  it('deve chamar onClick quando clicado', () => {
    const mockOnClick = jest.fn();
    render(<CardIcon onClick={mockOnClick} title="Card Clicável" />);
    
    fireEvent.click(screen.getByText('Card Clicável'));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar propriedades personalizadas para o título', () => {
    render(
      <CardIcon 
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
    expect(titleElement).toHaveClass('card-icon__title');
  });
});
