import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn().mockReturnValue(null),
  })),
}));

// Mock dos componentes
jest.mock('@/components', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mocked-link">{children}</a>
  ),
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" onClick={onClick} data-testid="mocked-button">{children}</button>
  ),
  Flex: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-flex">{children}</div>
  ),
  Grid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-grid">{children}</div>
  ),
  Modal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-modal">{children}</div>
  ),
}));

// Mock do Column component
jest.mock('../Column', () => ({
  Column: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-column">{children}</div>
  ),
}));

// Mock dos SVGs
jest.mock('./icons/ic-facebook.svg', () => 'facebook-icon');
jest.mock('./icons/ic-instagram.svg', () => 'instagram-icon');
jest.mock('./icons/ic-linkedin.svg', () => 'linkedin-icon');
jest.mock('./icons/ic-tiktok.svg', () => 'tiktok-icon');
jest.mock('./icons/ic-x.svg', () => 'x-icon'); // Replacing Twitter with X
jest.mock('./icons/ic-youtube.svg', () => 'youtube-icon');
jest.mock('./icons/ic-apple-store.svg', () => 'apple-store-icon'); // Corrected name
jest.mock('./icons/ic-google-play.svg', () => 'google-play-icon');
jest.mock('./icons/ic-whatsApp.svg', () => 'whatsapp-icon');

// Mock do objeto icons
jest.mock('./icons', () => ({
  icons: {
    'icon-porto-ic-facebook': { icon: 'facebook-icon' },
    'icon-porto-ic-instagram': { icon: 'instagram-icon' },
    'icon-porto-ic-linkedin': { icon: 'linkedin-icon' },
    'icon-porto-ic-tiktok': { icon: 'tiktok-icon' },
    'icon-porto-ic-x': { icon: 'x-icon' },
    'icon-porto-ic-youtube': { icon: 'youtube-icon' },
    'icon-apple': { icon: 'apple-store-icon' },
    'icon-google': { icon: 'google-play-icon' },
    'icon-porto-ic-whatsapp': { icon: 'whatsapp-icon' },
    'icon-logo-white': { icon: 'logo-white-icon' }
  }
}));
jest.mock('./icons/ic-logo-porto.svg', () => 'logo-porto-icon');
jest.mock('./icons/ic-headset.svg', () => 'headset-icon');
jest.mock('./icons/ic-message.svg', () => 'message-icon');
jest.mock('./icons/ic-people.svg', () => 'people-icon');
jest.mock('./icons/ic-phone.svg', () => 'phone-icon');
jest.mock('./icons/ic-pin.svg', () => 'pin-icon');
jest.mock('./icons/ic-question.svg', () => 'question-icon');
jest.mock('./icons/Right.svg', () => 'right-icon');

const mockProps = {
  titleAboutUs: 'Sobre Nós',
  aboutUs: [
    { name: 'Quem Somos', url: '#', icon: '' },
    { name: 'Carreiras', url: '#', icon: '' }
  ],
  titleQuickLinks: 'Links Rápidos',
  quickLinks: [
    { name: 'Produtos', url: '#', icon: '' },
    { name: 'Serviços', url: '#', icon: '' }
  ],
  bottomLinks: [
    { name: 'Termos de Uso', url: '#', icon: '' },
    { name: 'Privacidade', url: '#', icon: '' }
  ],
  titleSocialMedia: 'Redes Sociais',
  socialMedia: [
    { url: '#', icon: 'icon-porto-ic-facebook', name: 'Facebook' },
    { url: '#', icon: 'icon-porto-ic-instagram', name: 'Instagram' }
  ],
  titleAppStore: 'Baixe nosso app',
  buttonsAppStore: [
    { name: 'App Store', url: '#', icon: '' },
    { name: 'Google Play', url: '#', icon: '' }
  ],
  partners: []
};

describe('Footer', () => {
  it('deve renderizar corretamente com todos os props', () => {
    render(<Footer {...mockProps as any} />);
    
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    expect(screen.getByText('Redes Sociais')).toBeInTheDocument();
    expect(screen.getByText('Baixe nosso app')).toBeInTheDocument();
    
    expect(screen.getByText('Quem Somos')).toBeInTheDocument();
    expect(screen.getByText('Carreiras')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Termos de Uso')).toBeInTheDocument();
    expect(screen.getByText('Privacidade')).toBeInTheDocument();
  });

  it('deve renderizar sem redes sociais quando socialMedia está vazio', () => {
    render(
      <Footer 
        {...mockProps} 
        socialMedia={[]} 
        titleSocialMedia=""
      />
    );
    
    expect(screen.queryByText('Redes Sociais')).not.toBeInTheDocument();
  });

  it('deve renderizar sem links de app store quando buttonsAppStore está vazio', () => {
    render(
      <Footer 
        {...mockProps as any} 
        buttonsAppStore={[]} 
        titleAppStore=""
      />
    );
    
    expect(screen.queryByText('Baixe nosso app')).not.toBeInTheDocument();
  });
});
