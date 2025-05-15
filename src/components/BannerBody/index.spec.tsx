import React from 'react';
import { render, screen } from '@testing-library/react';
import { BannerBody } from './index';

describe('<BannerBody />', () => {
  it('deve renderizar com o tema padrão', () => {
    const { container } = render(<BannerBody />);
    const rootElement = container.querySelector('.banner-body__root');
    expect(rootElement).toHaveClass('--light');
  });

  it('deve renderizar com o tema escuro quando especificado', () => {
    const { container } = render(<BannerBody theme="dark" />);
    const rootElement = container.querySelector('.banner-body__root');
    expect(rootElement).toHaveClass('--dark');
  });

  it('deve renderizar com a cor de fundo especificada', () => {
    const { container } = render(<BannerBody bgColor="portoSegurosPrimary" />);
    const rootElement = container.querySelector('.banner-body__root');
    expect(rootElement).toHaveClass('--bg-portoSegurosPrimary');
  });

  it('deve renderizar com a posição de imagem mobile especificada', () => {
    const { container } = render(<BannerBody imageMobilePosition="up" />);
    const rootElement = container.querySelector('.banner-body__root');
    expect(rootElement).toHaveClass('up');
  });

  it('deve renderizar com a posição de imagem desktop especificada', () => {
    const { container } = render(<BannerBody imageDesktopPosition="right" />);
    const rootElement = container.querySelector('.banner-body__root');
    expect(rootElement).toHaveClass('right');
  });

  it('deve renderizar o pré-título corretamente', () => {
    render(<BannerBody preTitle="Pré-título do Banner" />);
    expect(screen.getByText('Pré-título do Banner')).toBeInTheDocument();
    expect(screen.getByText('Pré-título do Banner')).toHaveClass('banner-body__pretitle');
  });

  it('deve renderizar o título corretamente', () => {
    render(<BannerBody title="Título do Banner" />);
    expect(screen.getByText('Título do Banner')).toBeInTheDocument();
    expect(screen.getByText('Título do Banner')).toHaveClass('banner-body__title');
  });

  it('deve renderizar o subtítulo corretamente', () => {
    render(<BannerBody subtitle="Subtítulo do Banner" />);
    expect(screen.getByText('Subtítulo do Banner')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo do Banner')).toHaveClass('banner-body__subtitle');
  });

  it('deve renderizar os benefícios corretamente', () => {
    const benefits = [
      { text: 'Benefício 1' },
      { text: 'Benefício 2' }
    ];

    render(<BannerBody benefits={benefits} />);
    
    expect(screen.getByText('Benefício 1')).toBeInTheDocument();
    expect(screen.getByText('Benefício 2')).toBeInTheDocument();
  });

  it('deve renderizar os ícones dos benefícios corretamente', () => {
    const benefits = [
      { text: 'Benefício com ícone', icon: { iconName: 'check', 'data-testid': 'check-icon' } }
    ];

    render(<BannerBody benefits={benefits} />);
    
    expect(screen.getByText('Benefício com ícone')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('deve renderizar os botões corretamente', () => {
    const buttons = [
      { label: 'Botão Primário', variant: 'primary' },
      { label: 'Botão Secundário', variant: 'secondary' }
    ];

    render(<BannerBody buttons={buttons} />);
    
    expect(screen.getByText('Botão Primário')).toBeInTheDocument();
    expect(screen.getByText('Botão Secundário')).toBeInTheDocument();
  });

  it('deve renderizar o texto de nota corretamente', () => {
    render(<BannerBody textNote="*Consulte o regulamento" />);
    expect(screen.getByText('*Consulte o regulamento')).toBeInTheDocument();
    expect(screen.getByText('*Consulte o regulamento')).toHaveClass('banner-body__text-note');
  });

  it('deve renderizar a imagem corretamente', () => {
    render(<BannerBody image={<img data-testid="banner-image" alt="Banner" src="/banner.jpg" />} />);
    expect(screen.getByTestId('banner-image')).toBeInTheDocument();
  });
});
