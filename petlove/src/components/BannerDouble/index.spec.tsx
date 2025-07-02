import React from 'react';
import { render, screen } from '@testing-library/react';
import { BannerDouble } from './index';

// Mock dos componentes dependentes
jest.mock('../Link', () => ({
  Link: ({ children, herf, variant, size }: {
    children: React.ReactNode;
    herf?: string;
    variant?: string;
    size?: string;
  }) => (
    <a 
      href={herf} 
      data-testid="mock-link"
      data-variant={variant}
      data-size={size}
    >
      {children}
    </a>
  )
}));

jest.mock('../Typography', () => ({
  Typography: ({ children, variant, color, weight, className }: {
    children: React.ReactNode;
    variant?: string;
    color?: string;
    weight?: string;
    className?: string;
  }) => (
    <div 
      data-testid="mock-typography"
      data-variant={variant}
      data-color={color}
      data-weight={weight}
      className={className}
    >
      {children}
    </div>
  )
}));

// Mock do módulo de estilos
jest.mock('./styles.module.scss', () => ({
  'banner-double': 'banner-double-class',
  'banner-double__slider': 'banner-double-slider-class',
  'banner-double__card': 'banner-double-card-class',
  'banner-double__title': 'banner-double-title-class',
  'banner-double__subtitle': 'banner-double-subtitle-class',
  'banner-double__image': 'banner-double-image-class'
}));

describe('BannerDouble', () => {
  const mockBanners = [
    {
      title: 'Banner 1 Title',
      subtitle: 'Banner 1 Subtitle',
      link: {
        label: 'Saiba mais',
        href: '/link1'
      },
      image: {
        src: 'url(/image1.jpg)',
        alt: 'Banner 1 Image'
      },
      bgColor: 'primary',
      titleColor: 'white',
      subtitleColor: 'gray-100'
    },
    {
      title: 'Banner 2 Title',
      link: {
        label: 'Ver detalhes',
        href: '/link2'
      },
      image: {
        src: 'url(/image2.jpg)',
        alt: 'Banner 2 Image'
      },
      bgColor: 'secondary',
      titleColor: 'black'
    }
  ];

  it('deve renderizar corretamente com múltiplos banners', () => {
    const { container } = render(<BannerDouble banners={mockBanners} />);
    
    // Verificar se o componente foi renderizado
    const section = container.querySelector('.banner-double-class');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('banner-double-class');
    
    // Verificar se o slider foi renderizado
    const slider = container.querySelector('.banner-double-slider-class');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveClass('banner-double-slider-class');
    
    // Verificar se os cards foram renderizados
    const cards = container.querySelectorAll('.banner-double-card-class');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveClass('banner-double-card-class');
    expect(cards[0]).toHaveClass('--bg-primary');
    expect(cards[1]).toHaveClass('banner-double-card-class');
    expect(cards[1]).toHaveClass('--bg-secondary');
  });

  it('deve renderizar os títulos corretamente', () => {
    render(<BannerDouble banners={mockBanners} />);
    
    // Verificar os títulos
    const titles = screen.getAllByTestId('mock-typography');
    
    // Encontrar os elementos de título com variant=title5
    const titleElements = titles.filter(el => 
      el.getAttribute('data-variant') === 'title5'
    );
    
    expect(titleElements).toHaveLength(2);
    expect(titleElements[0]).toHaveTextContent('Banner 1 Title');
    expect(titleElements[0]).toHaveAttribute('data-color', 'white');
    expect(titleElements[0]).toHaveAttribute('data-weight', 'bold');
    
    expect(titleElements[1]).toHaveTextContent('Banner 2 Title');
    expect(titleElements[1]).toHaveAttribute('data-color', 'black');
    expect(titleElements[1]).toHaveAttribute('data-weight', 'bold');
  });

  it('deve renderizar os subtítulos quando fornecidos', () => {
    render(<BannerDouble banners={mockBanners} />);
    
    // Verificar os subtítulos
    const typographyElements = screen.getAllByTestId('mock-typography');
    
    // Encontrar os elementos de subtítulo com variant=body1
    const subtitleElements = typographyElements.filter(el => 
      el.getAttribute('data-variant') === 'body1'
    );
    
    // Apenas o primeiro banner tem subtítulo
    expect(subtitleElements).toHaveLength(1);
    expect(subtitleElements[0]).toHaveTextContent('Banner 1 Subtitle');
    expect(subtitleElements[0]).toHaveAttribute('data-color', 'gray-100');
  });

  it('deve renderizar os links corretamente', () => {
    render(<BannerDouble banners={mockBanners} />);
    
    // Verificar os links
    const links = screen.getAllByTestId('mock-link');
    expect(links).toHaveLength(2);
    
    expect(links[0]).toHaveTextContent('Saiba mais');
    expect(links[0]).toHaveAttribute('href', '/link1');
    expect(links[0]).toHaveAttribute('data-variant', 'negative');
    expect(links[0]).toHaveAttribute('data-size', 'small');
    
    expect(links[1]).toHaveTextContent('Ver detalhes');
    expect(links[1]).toHaveAttribute('href', '/link2');
    expect(links[1]).toHaveAttribute('data-variant', 'negative');
    expect(links[1]).toHaveAttribute('data-size', 'small');
  });

  it('deve aplicar as imagens de fundo corretamente', () => {
    const { container } = render(<BannerDouble banners={mockBanners} />);
    
    // Verificar as imagens de fundo
    const cards = container.querySelectorAll('.banner-double-card-class');
    
    expect(cards[0]).toHaveStyle({
      backgroundImage: 'url(/image1.jpg)'
    });
    
    expect(cards[1]).toHaveStyle({
      backgroundImage: 'url(/image2.jpg)'
    });
  });

  it('deve renderizar corretamente com apenas um banner', () => {
    const singleBanner = [mockBanners[0]];
    const { container } = render(<BannerDouble banners={singleBanner} />);
    
    // Verificar se apenas um card foi renderizado
    const cards = container.querySelectorAll('.banner-double-card-class');
    expect(cards).toHaveLength(1);
    
    // Verificar se o título foi renderizado corretamente
    const titleElements = screen.getAllByTestId('mock-typography').filter(
      el => el.getAttribute('data-variant') === 'title5'
    );
    expect(titleElements).toHaveLength(1);
    expect(titleElements[0]).toHaveTextContent('Banner 1 Title');
  });

  it('deve lidar com array de banners vazio', () => {
    const { container } = render(<BannerDouble banners={[]} />);
    
    // Verificar se o componente foi renderizado, mas sem cards
    const section = container.querySelector('.banner-double-class');
    expect(section).toBeInTheDocument();
    
    // Não deve haver cards
    const cards = container.querySelectorAll('.banner-double-card-class');
    expect(cards).toHaveLength(0);
  });
});
