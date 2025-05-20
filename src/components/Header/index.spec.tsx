import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index';

// Mock dos componentes importados
jest.mock('@/components', () => ({
  Column: ({ children }) => <div data-testid="column-mock">{children}</div>,
  Grid: ({ children }) => <div data-testid="grid-mock">{children}</div>,
  Link: ({ children, ...props }) => <a data-testid="link-mock" {...props}>{children}</a>,
  ShowOnDevice: ({ children }) => <div data-testid="show-on-device-mock">{children}</div>
}));

// Mock dos subcomponentes
jest.mock('./HeaderDrawer', () => ({
  HeaderDrawer: ({ isOpenMenu, links, categories, subcategory, selectedCategory, handleCategory, handleSubcategory, indexSubcategory }) => (
    <div data-testid="header-drawer-mock" data-is-open={isOpenMenu}>
      {links && <div data-testid="links-mock">{JSON.stringify(links)}</div>}
    </div>
  )
}));

jest.mock('./HeaderToolbar', () => ({
  HeaderToolbar: ({ selectedCategory, categories, subcategory, indexSubcategory, hasSubcategories, handleCategory, handleSubcategory, handleRedirect }) => (
    <div data-testid="header-toolbar-mock" data-has-subcategories={hasSubcategories}>
      {categories && <div data-testid="categories-mock">{JSON.stringify(categories)}</div>}
    </div>
  )
}));

// Mock dos componentes estilizados
jest.mock('./components', () => ({
  Root: ({ children }) => <div data-testid="root-mock">{children}</div>,
  Menu: ({ children }) => <div data-testid="menu-mock">{children}</div>,
  MenuLogo: ({ children, style }) => <div data-testid="menu-logo-mock" style={style}>{children}</div>,
  IconMobileMenu: ({ isOpen, 'aria-label': ariaLabel, onClick }) => (
    <button 
      data-testid="icon-mobile-menu-mock" 
      data-is-open={isOpen} 
      aria-label={ariaLabel}
      onClick={onClick}
    />
  )
}));

// Mock da imagem
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, width, height, alt }) => (
    <img 
      data-testid="image-mock" 
      src={src} 
      width={width} 
      height={height} 
      alt={alt} 
    />
  )
}));

// Mock do SVG
jest.mock('@/assets/icons/ic-logo-porto.svg', () => 'mocked-logo-path');

describe('Header', () => {
  const mockProps = {
    menu: {
      menuLinks: [
        { label: 'Link 1', url: '/link1' },
        { label: 'Link 2', url: '/link2' }
      ],
      loginButton: {
        label: 'Entrar',
        url: '/login'
      }
    },
    submenus: [
      {
        id: 1,
        label: 'Categoria 1',
        categories: [
          {
            id: 11,
            label: 'Subcategoria 1.1',
            items: [
              { id: 111, label: 'Item 1.1.1', url: '/item111' }
            ]
          }
        ]
      },
      {
        id: 2,
        label: 'Categoria 2',
        categories: []
      }
    ]
  };

  it('deve renderizar corretamente com valores padrão', () => {
    render(<Header {...mockProps} />);
    
    // Verificar se os componentes principais foram renderizados
    expect(screen.getByTestId('root-mock')).toBeInTheDocument();
    expect(screen.getByTestId('menu-mock')).toBeInTheDocument();
    expect(screen.getByTestId('grid-mock')).toBeInTheDocument();
    expect(screen.getByTestId('header-drawer-mock')).toBeInTheDocument();
    expect(screen.getByTestId('header-toolbar-mock')).toBeInTheDocument();
    
    // Verificar se o drawer está inicialmente fechado
    expect(screen.getByTestId('header-drawer-mock')).toHaveAttribute('data-is-open', 'false');
    
    // Verificar se as categorias foram passadas para o toolbar
    const categoriesMock = screen.getByTestId('categories-mock');
    expect(categoriesMock).toBeInTheDocument();
    expect(JSON.parse(categoriesMock.textContent)).toEqual(mockProps.submenus);
    
    // Verificar se os links foram passados para o drawer
    const linksMock = screen.getByTestId('links-mock');
    expect(linksMock).toBeInTheDocument();
    expect(JSON.parse(linksMock.textContent)).toEqual(mockProps.menu.menuLinks);
  });

  it('deve abrir e fechar o menu ao clicar no ícone do menu', () => {
    render(<Header {...mockProps} />);
    
    // Verificar se o menu está inicialmente fechado
    expect(screen.getByTestId('header-drawer-mock')).toHaveAttribute('data-is-open', 'false');
    expect(screen.getByTestId('icon-mobile-menu-mock')).toHaveAttribute('data-is-open', 'false');
    
    // Clicar no ícone para abrir o menu
    fireEvent.click(screen.getByTestId('icon-mobile-menu-mock'));
    
    // Verificar se o menu foi aberto
    expect(screen.getByTestId('header-drawer-mock')).toHaveAttribute('data-is-open', 'true');
    expect(screen.getByTestId('icon-mobile-menu-mock')).toHaveAttribute('data-is-open', 'true');
    
    // Clicar novamente para fechar o menu
    fireEvent.click(screen.getByTestId('icon-mobile-menu-mock'));
    
    // Verificar se o menu foi fechado
    expect(screen.getByTestId('header-drawer-mock')).toHaveAttribute('data-is-open', 'false');
    expect(screen.getByTestId('icon-mobile-menu-mock')).toHaveAttribute('data-is-open', 'false');
  });

  it('deve renderizar o botão de login quando fornecido', () => {
    render(<Header {...mockProps} />);
    
    // Verificar se o link de login foi renderizado
    const loginLinks = screen.getAllByTestId('link-mock');
    const loginLink = loginLinks.find(link => link.textContent === 'Entrar');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('deve renderizar sem o botão de login quando não fornecido', () => {
    const propsWithoutLogin = {
      ...mockProps,
      menu: {
        ...mockProps.menu,
        loginButton: undefined
      }
    };
    
    render(<Header {...propsWithoutLogin} />);
    
    // Verificar se não há links de login
    const loginLinks = screen.queryAllByTestId('link-mock');
    const loginLink = loginLinks.find(link => link.textContent === 'Entrar');
    expect(loginLink).toBeUndefined();
  });

  it('deve renderizar o logo', () => {
    render(<Header {...mockProps} />);
    
    // Verificar se o logo foi renderizado
    const logo = screen.getByTestId('image-mock');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo-path');
    expect(logo).toHaveAttribute('width', '87');
    expect(logo).toHaveAttribute('height', '22');
  });

  it('deve aplicar estilo de borda ao menu logo quando o menu está aberto', () => {
    render(<Header {...mockProps} />);
    
    // Verificar que inicialmente não há borda
    expect(screen.getByTestId('menu-logo-mock')).toHaveStyle({});
    
    // Abrir o menu
    fireEvent.click(screen.getByTestId('icon-mobile-menu-mock'));
    
    // Verificar que a borda foi aplicada
    expect(screen.getByTestId('menu-logo-mock')).toHaveStyle({
      borderBottom: '1px solid #e0e0e0'
    });
  });

  it('deve passar os parâmetros corretos para o HeaderToolbar', () => {
    render(<Header {...mockProps} />);
    
    // Verificar se o HeaderToolbar recebeu o valor correto para hasSubcategories
    expect(screen.getByTestId('header-toolbar-mock')).toHaveAttribute('data-has-subcategories', 'false');
    
    // Verificar se as categorias foram passadas
    const categoriesMock = screen.getByTestId('categories-mock');
    expect(categoriesMock).toBeInTheDocument();
    expect(JSON.parse(categoriesMock.textContent)).toEqual(mockProps.submenus);
  });
});
