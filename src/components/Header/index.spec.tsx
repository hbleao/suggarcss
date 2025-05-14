import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index';

describe('<Header />', () => {
  it('deve renderizar com a variante padrão', () => {
    const { container } = render(<Header />);
    const rootElement = container.querySelector('.header__root');
    expect(rootElement).toHaveClass('--default');
  });

  it('deve renderizar com a variante negativa quando especificada', () => {
    const { container } = render(<Header variant="negative" />);
    const rootElement = container.querySelector('.header__root');
    expect(rootElement).toHaveClass('--negative');
  });

  it('deve renderizar o logo corretamente', () => {
    render(<Header logo={<div data-testid="logo">Logo</div>} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('deve renderizar itens de menu corretamente', () => {
    const menuItems = [
      { label: 'Home', href: '/' },
      { label: 'Produtos', href: '/produtos' }
    ];

    render(<Header menuItems={menuItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
  });

  it('deve renderizar itens de toolbar corretamente', () => {
    const toolbarItems = [
      { 
        label: 'Carrinho', 
        icon: <span data-testid="cart-icon">🛒</span>, 
        href: '/carrinho' 
      }
    ];

    render(<Header toolbarItems={toolbarItems} />);
    
    expect(screen.getByText('Carrinho')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  it('deve abrir o drawer quando isDrawerOpen é true', () => {
    const { container } = render(<Header isDrawerOpen={true} />);
    const drawerElement = container.querySelector('.header__drawer');
    expect(drawerElement).toHaveClass('--opened');
  });

  it('deve chamar onDrawerToggle quando o ícone do menu mobile é clicado', () => {
    const mockToggle = jest.fn();
    const { container } = render(<Header onDrawerToggle={mockToggle} />);
    
    const menuIcon = container.querySelector('.header__menu-icon-mobile');
    fireEvent.click(menuIcon);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar itens do drawer corretamente', () => {
    const drawerItems = [
      {
        label: 'Categorias',
        categories: [
          {
            label: 'Eletrônicos',
            subcategories: [
              {
                label: 'Celulares',
                items: [
                  { label: 'Smartphones', href: '/smartphones' }
                ]
              }
            ]
          }
        ]
      }
    ];

    render(<Header drawerItems={drawerItems} isDrawerOpen={true} />);
    
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('Celulares')).toBeInTheDocument();
    expect(screen.getByText('Smartphones')).toBeInTheDocument();
  });
});
