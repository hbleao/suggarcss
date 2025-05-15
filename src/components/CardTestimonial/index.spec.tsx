import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardTestimonial } from './index';

describe('<CardTestimonial />', () => {
  it('deve renderizar com o tema padrão', () => {
    const { container } = render(<CardTestimonial />);
    const rootElement = container.querySelector('.card-testimonial__root');
    expect(rootElement).toHaveClass('--light');
  });

  it('deve renderizar com o tema escuro quando especificado', () => {
    const { container } = render(<CardTestimonial theme="dark" />);
    const rootElement = container.querySelector('.card-testimonial__root');
    expect(rootElement).toHaveClass('--dark');
  });

  it('deve renderizar a imagem corretamente', () => {
    render(<CardTestimonial image={<img data-testid="avatar-image" alt="Avatar" src="/avatar.jpg" />} />);
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
  });

  it('deve renderizar o nome corretamente', () => {
    render(<CardTestimonial name="João Silva" />);
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toHaveClass('card-testimonial__name');
  });

  it('deve renderizar a posição corretamente', () => {
    render(<CardTestimonial position="Diretor de Marketing" />);
    expect(screen.getByText('Diretor de Marketing')).toBeInTheDocument();
    expect(screen.getByText('Diretor de Marketing')).toHaveClass('card-testimonial__position');
  });

  it('deve renderizar a data corretamente', () => {
    render(<CardTestimonial date="Janeiro 2025" />);
    expect(screen.getByText('Janeiro 2025')).toBeInTheDocument();
    expect(screen.getByText('Janeiro 2025')).toHaveClass('card-testimonial__date');
  });

  it('deve renderizar o texto do depoimento corretamente', () => {
    render(<CardTestimonial text="Este é um depoimento incrível" />);
    expect(screen.getByText('Este é um depoimento incrível')).toBeInTheDocument();
    expect(screen.getByText('Este é um depoimento incrível')).toHaveClass('card-testimonial__text');
  });

  it('deve renderizar o separador por padrão', () => {
    const { container } = render(<CardTestimonial />);
    const separatorElement = container.querySelector('.card-testimonial__separator');
    expect(separatorElement).toBeInTheDocument();
  });

  it('não deve renderizar o separador quando showSeparator é false', () => {
    const { container } = render(<CardTestimonial showSeparator={false} />);
    const separatorElement = container.querySelector('.card-testimonial__separator');
    expect(separatorElement).not.toBeInTheDocument();
  });

  it('deve aplicar as propriedades adicionais ao nome', () => {
    render(
      <CardTestimonial 
        name="Nome Personalizado" 
        nameProps={{ 
          variant: 'title3', 
          weight: 'semibold', 
          'data-testid': 'custom-name' 
        }} 
      />
    );
    
    const nameElement = screen.getByTestId('custom-name');
    expect(nameElement).toHaveTextContent('Nome Personalizado');
  });

  it('deve aplicar as propriedades adicionais à posição', () => {
    render(
      <CardTestimonial 
        position="Posição Personalizada" 
        positionProps={{ 
          variant: 'body1', 
          'data-testid': 'custom-position' 
        }} 
      />
    );
    
    const positionElement = screen.getByTestId('custom-position');
    expect(positionElement).toHaveTextContent('Posição Personalizada');
  });

  it('deve aplicar as propriedades adicionais à data', () => {
    render(
      <CardTestimonial 
        date="Data Personalizada" 
        dateProps={{ 
          variant: 'overline', 
          'data-testid': 'custom-date' 
        }} 
      />
    );
    
    const dateElement = screen.getByTestId('custom-date');
    expect(dateElement).toHaveTextContent('Data Personalizada');
  });

  it('deve aplicar as propriedades adicionais ao texto', () => {
    render(
      <CardTestimonial 
        text="Texto Personalizado" 
        textProps={{ 
          variant: 'subtitle1', 
          'data-testid': 'custom-text' 
        }} 
      />
    );
    
    const textElement = screen.getByTestId('custom-text');
    expect(textElement).toHaveTextContent('Texto Personalizado');
  });

  it('deve aplicar classes CSS adicionais ao componente raiz', () => {
    const { container } = render(<CardTestimonial className="custom-class" />);
    const rootElement = container.querySelector('.card-testimonial__root');
    expect(rootElement).toHaveClass('custom-class');
  });
});
