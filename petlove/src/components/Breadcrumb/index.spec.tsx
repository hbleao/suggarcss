import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Breadcrumb', () => {
  it('deve renderizar corretamente com uma lista de breadcrumbs', () => {
    const breadcrumbList = [
      { label: 'Home', link: '/' },
      { label: 'Produtos', link: '/produtos' },
      { label: 'Detalhes', link: '/produtos/detalhes' }
    ];
    
    render(<Breadcrumb breadcrumbList={breadcrumbList} data-testid="breadcrumb" />);
    
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
    expect(breadcrumb).toHaveClass('breadcrumb');
    
    // Verificar se a lista foi renderizada
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('breadcrumb__list');
    
    // Verificar se todos os itens foram renderizados
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    items.forEach(item => {
      expect(item).toHaveClass('breadcrumb__list-item');
    });
    
    // Verificar se todos os links foram renderizados corretamente
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    
    expect(links[0]).toHaveTextContent('Home');
    expect(links[0]).toHaveAttribute('href', '/');
    
    expect(links[1]).toHaveTextContent('Produtos');
    expect(links[1]).toHaveAttribute('href', '/produtos');
    
    expect(links[2]).toHaveTextContent('Detalhes');
    expect(links[2]).toHaveAttribute('href', '/produtos/detalhes');
  });

  it('deve renderizar corretamente com uma lista vazia', () => {
    render(<Breadcrumb breadcrumbList={[]} data-testid="breadcrumb" />);
    
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toBeInTheDocument();
    
    // Verificar se a lista foi renderizada, mas está vazia
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
    
    // Verificar se não há itens
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
    
    // Verificar se não há links
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('deve renderizar corretamente com apenas um item', () => {
    const breadcrumbList = [
      { label: 'Home', link: '/' }
    ];
    
    render(<Breadcrumb breadcrumbList={breadcrumbList} data-testid="breadcrumb" />);
    
    // Verificar se apenas um item foi renderizado
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    
    // Verificar se o link foi renderizado corretamente
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Home');
    expect(link).toHaveAttribute('href', '/');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    const breadcrumbList = [
      { label: 'Home', link: '/' }
    ];
    
    render(
      <Breadcrumb 
        breadcrumbList={breadcrumbList}
        data-testid="breadcrumb"
        aria-label="Navegação"
        role="navigation"
      />
    );
    
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toHaveAttribute('aria-label', 'Navegação');
    expect(breadcrumb).toHaveAttribute('role', 'navigation');
  });

  it('deve renderizar corretamente com links externos', () => {
    const breadcrumbList = [
      { label: 'Home', link: '/' },
      { label: 'Externo', link: 'https://exemplo.com' }
    ];
    
    render(<Breadcrumb breadcrumbList={breadcrumbList} data-testid="breadcrumb" />);
    
    // Verificar se o link externo foi renderizado corretamente
    const links = screen.getAllByRole('link');
    expect(links[1]).toHaveTextContent('Externo');
    expect(links[1]).toHaveAttribute('href', 'https://exemplo.com');
  });

  it('deve renderizar corretamente com links com caracteres especiais', () => {
    const breadcrumbList = [
      { label: 'Pesquisa', link: '/pesquisa?q=termo&filtro=ativo' }
    ];
    
    render(<Breadcrumb breadcrumbList={breadcrumbList} data-testid="breadcrumb" />);
    
    // Verificar se o link com caracteres especiais foi renderizado corretamente
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Pesquisa');
    expect(link).toHaveAttribute('href', '/pesquisa?q=termo&filtro=ativo');
  });

  it('deve renderizar corretamente com labels longos', () => {
    const breadcrumbList = [
      { label: 'Home', link: '/' },
      { label: 'Este é um label muito longo que pode quebrar o layout se não for tratado corretamente', link: '/longo' }
    ];
    
    render(<Breadcrumb breadcrumbList={breadcrumbList} data-testid="breadcrumb" />);
    
    // Verificar se o label longo foi renderizado corretamente
    const links = screen.getAllByRole('link');
    expect(links[1]).toHaveTextContent('Este é um label muito longo que pode quebrar o layout se não for tratado corretamente');
    expect(links[1]).toHaveAttribute('href', '/longo');
  });
});
