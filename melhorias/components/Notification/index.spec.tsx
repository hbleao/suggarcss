import React from 'react';
import { render, screen } from '@testing-library/react';
import { Notification } from './index';

describe('<Notification />', () => {
  const defaultProps = {
    title: 'Título da notificação',
    description: 'Descrição da notificação',
    icon: <svg data-testid="notification-icon" />,
    variant: 'default' as const,
    className: '',
  };

  it('deve renderizar o componente com as propriedades padrão', () => {
    render(<Notification {...defaultProps} />);
    
    expect(screen.getByText('Título da notificação')).toBeInTheDocument();
    expect(screen.getByText('Descrição da notificação')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--default');
  });

  it('deve renderizar o componente com a variante outlined', () => {
    render(<Notification {...defaultProps} variant="outlined" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--outlined');
  });

  it('deve renderizar o componente com a variante information', () => {
    render(<Notification {...defaultProps} variant="information" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--information');
  });

  it('deve renderizar o componente com a variante attention', () => {
    render(<Notification {...defaultProps} variant="attention" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--attention');
  });

  it('deve renderizar o componente com a variante success', () => {
    render(<Notification {...defaultProps} variant="success" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--success');
  });

  it('deve renderizar o componente com a variante error', () => {
    render(<Notification {...defaultProps} variant="error" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('--error');
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    render(<Notification {...defaultProps} className="custom-class" />);
    
    const rootElement = screen.getByText('Título da notificação').closest('.notification__root');
    expect(rootElement).toHaveClass('custom-class');
  });

  it('deve renderizar o link quando fornecido', () => {
    const link = {
      label: 'Clique aqui',
      href: 'https://exemplo.com'
    };
    
    render(<Notification {...defaultProps} link={link} />);
    
    const linkElement = screen.getByText('Clique aqui');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://exemplo.com');
    expect(linkElement).toHaveClass('notification__link');
  });

  it('não deve renderizar o link quando não fornecido', () => {
    render(<Notification {...defaultProps} />);
    
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('deve renderizar o link quando apenas href é fornecido, mas não o label', () => {
    const link = {
      label: '',
      href: 'https://exemplo.com'
    };
    
    render(<Notification {...defaultProps} link={link} />);
    
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('deve passar propriedades adicionais para o elemento div', () => {
    render(<Notification {...defaultProps} data-testid="notification-test" />);
    
    expect(screen.getByTestId('notification-test')).toBeInTheDocument();
    expect(screen.getByTestId('notification-test')).toHaveClass('notification__root');
  });

  it('deve renderizar ícones complexos corretamente', () => {
    const complexIcon = (
      <div data-testid="complex-icon">
        <svg width="24" height="24" />
        <span>Icon text</span>
      </div>
    );
    
    render(<Notification {...defaultProps} icon={complexIcon} />);
    
    expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
  });
});
