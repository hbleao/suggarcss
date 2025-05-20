import React from 'react';
import { render, screen } from '@testing-library/react';
import { BannerHero } from './index';

describe('<BannerHero />', () => {
  it('deve renderizar com o tema padrão', () => {
    const { container } = render(<BannerHero />);
    const rootElement = container.querySelector('.banner-hero__root');
    expect(rootElement).toHaveClass('--light');
  });

  it('deve renderizar com o tema escuro quando especificado', () => {
    const { container } = render(<BannerHero theme="dark" />);
    const rootElement = container.querySelector('.banner-hero__root');
    expect(rootElement).toHaveClass('--dark');
  });

  it('deve renderizar com a cor de fundo especificada', () => {
    const { container } = render(<BannerHero bgColor="portoSegurosPrimary" />);
    const rootElement = container.querySelector('.banner-hero__root');
    expect(rootElement).toHaveClass('--bg-portoSegurosPrimary');
  });

  it('deve renderizar o título corretamente', () => {
    render(<BannerHero title="Título do Banner" />);
    expect(screen.getByText('Título do Banner')).toBeInTheDocument();
  });

  it('deve renderizar o subtítulo corretamente', () => {
    render(<BannerHero subtitle="Subtítulo do Banner" />);
    
    // Verifica se o subtítulo aparece tanto na versão mobile quanto desktop
    const subtitles = screen.getAllByText('Subtítulo do Banner');
    expect(subtitles).toHaveLength(2);
    
    expect(subtitles[0]).toHaveClass('mobile');
    expect(subtitles[1]).toHaveClass('desktop');
  });

  it('deve renderizar o texto corretamente', () => {
    render(<BannerHero text="Texto descritivo do banner" />);
    expect(screen.getByText('Texto descritivo do banner')).toBeInTheDocument();
  });

  it('deve renderizar o logo corretamente', () => {
    render(<BannerHero logo={<img data-testid="logo" alt="Logo" src="/logo.png" />} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('deve renderizar a imagem corretamente', () => {
    render(<BannerHero image={<img data-testid="banner-image" alt="Banner" src="/banner.jpg" />} />);
    expect(screen.getByTestId('banner-image')).toBeInTheDocument();
  });

  it('deve renderizar os botões corretamente', () => {
    const buttons = [
      { label: 'Botão Primário', variant: 'primary' },
      { label: 'Botão Secundário', variant: 'secondary' }
    ];

    render(<BannerHero buttons={buttons} />);
    
    expect(screen.getByText('Botão Primário')).toBeInTheDocument();
    expect(screen.getByText('Botão Secundário')).toBeInTheDocument();
  });

  it('deve renderizar as lojas corretamente', () => {
    const stores = [
      { 
        name: 'App Store', 
        icon: <img data-testid="app-store-icon" alt="App Store" src="/app-store.png" />,
        href: 'https://apps.apple.com' 
      },
      { 
        name: 'Google Play', 
        icon: <img data-testid="play-store-icon" alt="Google Play" src="/play-store.png" />,
        href: 'https://play.google.com' 
      }
    ];

    render(<BannerHero stores={stores} />);
    
    expect(screen.getByText('App Store')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
    expect(screen.getByTestId('app-store-icon')).toBeInTheDocument();
    expect(screen.getByTestId('play-store-icon')).toBeInTheDocument();
  });
});
