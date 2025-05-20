import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notification } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

describe('Notification', () => {
  // Dados de teste padrão
  const defaultProps = {
    title: 'Título da notificação',
    description: 'Descrição da notificação',
    icon: <span data-testid="mock-icon">🔔</span>,
  };

  it('deve renderizar corretamente com valores padrão', () => {
    render(<Notification {...defaultProps} data-testid="notification" />);
    
    const notification = screen.getByTestId('notification');
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveClass('notification__root');
    expect(notification).toHaveClass('--default'); // Variante padrão
    
    // Verificar se o ícone foi renderizado
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveClass('notification__icon');
    
    // Verificar se o título foi renderizado
    const title = screen.getByText('Título da notificação');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('notification__title');
    
    // Verificar se a descrição foi renderizada
    const description = screen.getByText('Descrição da notificação');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('notification__description');
    
    // Verificar se o link não foi renderizado (pois não foi fornecido)
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  it('deve renderizar com variante outlined', () => {
    render(
      <Notification 
        {...defaultProps} 
        variant="outlined" 
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('--outlined');
    expect(notification).not.toHaveClass('--default');
  });

  it('deve renderizar com variante information', () => {
    render(
      <Notification 
        {...defaultProps} 
        variant="information" 
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('--information');
  });

  it('deve renderizar com variante attention', () => {
    render(
      <Notification 
        {...defaultProps} 
        variant="attention" 
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('--attention');
  });

  it('deve renderizar com variante success', () => {
    render(
      <Notification 
        {...defaultProps} 
        variant="success" 
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('--success');
  });

  it('deve renderizar com variante error', () => {
    render(
      <Notification 
        {...defaultProps} 
        variant="error" 
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('--error');
  });

  it('deve renderizar com link quando fornecido', () => {
    const link = {
      label: 'Saiba mais',
      href: 'https://exemplo.com'
    };
    
    render(
      <Notification 
        {...defaultProps} 
        link={link}
        data-testid="notification" 
      />
    );
    
    const linkElement = screen.getByText('Saiba mais');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('notification__link');
    expect(linkElement).toHaveAttribute('href', 'https://exemplo.com');
  });

  it('não deve renderizar link quando label não é fornecido', () => {
    const link = {
      label: '',
      href: 'https://exemplo.com'
    };
    
    render(
      <Notification 
        {...defaultProps} 
        link={link}
        data-testid="notification" 
      />
    );
    
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(
      <Notification 
        {...defaultProps} 
        className="custom-class"
        data-testid="notification" 
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveClass('custom-class');
    expect(notification).toHaveClass('notification__root');
  });

  it('deve passar atributos HTML adicionais para o elemento raiz', () => {
    render(
      <Notification 
        {...defaultProps}
        data-testid="notification"
        aria-label="Notificação importante"
        role="alert"
      />
    );
    
    const notification = screen.getByTestId('notification');
    expect(notification).toHaveAttribute('aria-label', 'Notificação importante');
    expect(notification).toHaveAttribute('role', 'alert');
  });

  it('deve renderizar com ícone SVG', () => {
    const svgIcon = (
      <svg data-testid="svg-icon" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    );
    
    render(
      <Notification 
        title="Notificação com SVG"
        description="Esta notificação usa um ícone SVG"
        icon={svgIcon}
        data-testid="notification" 
      />
    );
    
    const icon = screen.getByTestId('svg-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveClass('notification__icon');
  });

  it('deve renderizar com descrição longa', () => {
    const longDescription = 'Esta é uma descrição muito longa para testar como o componente lida com textos extensos que podem quebrar em múltiplas linhas e afetar o layout da notificação.';
    
    render(
      <Notification 
        title="Notificação com descrição longa"
        description={longDescription}
        icon={<span>🔔</span>}
        data-testid="notification" 
      />
    );
    
    const description = screen.getByText(longDescription);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('notification__description');
  });
});
