import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderAcquisitionFlow } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return function Image({ src, alt, className, onClick, width, height }: any) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        onClick={onClick}
        width={width}
        height={height}
        data-testid="mock-image"
      />
    );
  };
});

// Mock do hook useRouter do Next.js
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock do componente Button
jest.mock('../Button', () => ({
  Button: ({ children, title, variant, styles, className }: any) => (
    <button 
      data-testid="mock-button"
      data-title={title}
      data-variant={variant}
      data-styles={styles}
      className={className}
    >
      {children}
    </button>
  ),
}));

// Mock dos assets SVG
jest.mock('@/assets/icons/ic-arrow-left.svg', () => 'arrow-left.svg');
jest.mock('@/assets/icons/ic-logo-porto.svg', () => 'logo-porto.svg');
jest.mock('@/assets/icons/ic-shopping-cart.svg', () => 'shopping-cart.svg');

describe('HeaderAcquisitionFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente com valores padrão', () => {
    render(<HeaderAcquisitionFlow />);
    
    // Verificar se o container foi renderizado
    const header = screen.getByRole('generic', { hidden: true });
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header-acquisition-flow');
    
    // Verificar se o logo foi renderizado
    const images = screen.getAllByTestId('mock-image');
    const logo = images.find(img => img.getAttribute('src') === 'logo-porto.svg');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('header-acquisition-flow__item-center');
    expect(logo).toHaveAttribute('alt', 'Logo da porto');
    
    // Verificar se o botão de voltar foi renderizado
    const backButton = screen.getByTestId('mock-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('data-variant', 'negative');
    expect(backButton).toHaveAttribute('data-styles', 'ghost');
    expect(backButton).toHaveClass('header-acquisition-flow__item-left');
    
    // Verificar se o ícone de voltar foi renderizado
    const backIcon = images.find(img => img.getAttribute('src') === 'arrow-left.svg');
    expect(backIcon).toBeInTheDocument();
    
    // Verificar se o botão do carrinho foi renderizado
    const cartButton = screen.getAllByTestId('mock-button')[1];
    expect(cartButton).toBeInTheDocument();
    expect(cartButton).toHaveClass('header-acquisition-flow__item-right');
    
    // Verificar se o ícone do carrinho foi renderizado
    const cartIcon = images.find(img => img.getAttribute('src') === 'shopping-cart.svg');
    expect(cartIcon).toBeInTheDocument();
  });

  it('deve navegar para a página inicial ao clicar no logo', () => {
    render(<HeaderAcquisitionFlow />);
    
    const images = screen.getAllByTestId('mock-image');
    const logo = images.find(img => img.getAttribute('src') === 'logo-porto.svg');
    
    // Clicar no logo
    fireEvent.click(logo!);
    
    // Verificar se o router.push foi chamado com a rota correta
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('deve navegar para o link de voltar ao clicar no botão de voltar', () => {
    render(<HeaderAcquisitionFlow goBackLink="/previous-page" />);
    
    const images = screen.getAllByTestId('mock-image');
    const backIcon = images.find(img => img.getAttribute('src') === 'arrow-left.svg');
    
    // Clicar no ícone de voltar
    fireEvent.click(backIcon!);
    
    // Verificar se o router.push foi chamado com a rota correta
    expect(mockPush).toHaveBeenCalledWith('/previous-page');
  });

  it('deve navegar para o link de voltar ao clicar no botão do carrinho', () => {
    render(<HeaderAcquisitionFlow goBackLink="/cart" />);
    
    const images = screen.getAllByTestId('mock-image');
    const cartIcon = images.find(img => img.getAttribute('src') === 'shopping-cart.svg');
    
    // Clicar no ícone do carrinho
    fireEvent.click(cartIcon!);
    
    // Verificar se o router.push foi chamado com a rota correta
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('não deve renderizar o botão de voltar quando hasGoBackLink=false', () => {
    render(<HeaderAcquisitionFlow hasGoBackLink={false} />);
    
    // Verificar se o botão de voltar não foi renderizado
    const buttons = screen.getAllByTestId('mock-button');
    expect(buttons).toHaveLength(1); // Apenas o botão do carrinho
    expect(buttons[0]).toHaveClass('header-acquisition-flow__item-right');
    
    // Verificar se o ícone de voltar não foi renderizado
    const images = screen.getAllByTestId('mock-image');
    const backIcon = images.find(img => img.getAttribute('src') === 'arrow-left.svg');
    expect(backIcon).toBeUndefined();
  });

  it('não deve renderizar o botão do carrinho quando hasShoppingCart=false', () => {
    render(<HeaderAcquisitionFlow hasShoppingCart={false} />);
    
    // Verificar se o botão do carrinho não foi renderizado
    const buttons = screen.getAllByTestId('mock-button');
    expect(buttons).toHaveLength(1); // Apenas o botão de voltar
    expect(buttons[0]).toHaveClass('header-acquisition-flow__item-left');
    
    // Verificar se o ícone do carrinho não foi renderizado
    const images = screen.getAllByTestId('mock-image');
    const cartIcon = images.find(img => img.getAttribute('src') === 'shopping-cart.svg');
    expect(cartIcon).toBeUndefined();
  });

  it('deve renderizar apenas o logo quando hasGoBackLink=false e hasShoppingCart=false', () => {
    render(<HeaderAcquisitionFlow hasGoBackLink={false} hasShoppingCart={false} />);
    
    // Verificar se nenhum botão foi renderizado
    const buttons = screen.queryAllByTestId('mock-button');
    expect(buttons).toHaveLength(0);
    
    // Verificar se apenas o logo foi renderizado
    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', 'logo-porto.svg');
    expect(images[0]).toHaveClass('header-acquisition-flow__item-center');
  });

  it('deve usar o goBackLink fornecido', () => {
    render(<HeaderAcquisitionFlow goBackLink="/custom-back-link" />);
    
    const images = screen.getAllByTestId('mock-image');
    const backIcon = images.find(img => img.getAttribute('src') === 'arrow-left.svg');
    
    // Clicar no ícone de voltar
    fireEvent.click(backIcon!);
    
    // Verificar se o router.push foi chamado com a rota correta
    expect(mockPush).toHaveBeenCalledWith('/custom-back-link');
  });
});
