import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock da função clsx
jest.mock('@/utils/clsx', () => ({
  clsx: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Loader', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    render(<Loader data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loader');
    expect(loader).toHaveClass('--border-neutral-900');
    
    // Verificar estilos padrão
    expect(loader).toHaveStyle({
      width: 24,
      height: 23,
      borderBottomColor: 'transparent',
    });
  });

  it('deve renderizar com cor personalizada', () => {
    render(<Loader color="primary-500" data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass('--border-primary-500');
    expect(loader).not.toHaveClass('--border-neutral-900');
  });

  it('deve renderizar com tamanho personalizado', () => {
    render(<Loader size={48} data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      width: 48,
      height: 47,
    });
  });

  it('deve aplicar classes CSS adicionais', () => {
    render(<Loader className="custom-class" data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass('custom-class');
    expect(loader).toHaveClass('loader');
  });

  it('deve combinar múltiplas propriedades personalizadas', () => {
    render(
      <Loader 
        color="secondary-700"
        size={36}
        className="custom-class"
        data-testid="loader" 
      />
    );
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass('--border-secondary-700');
    expect(loader).toHaveClass('custom-class');
    expect(loader).toHaveStyle({
      width: 36,
      height: 35,
      borderBottomColor: 'transparent',
    });
  });

  it('deve renderizar como um elemento span', () => {
    render(<Loader data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader.tagName.toLowerCase()).toBe('span');
  });

  it('deve renderizar com tamanho zero', () => {
    render(<Loader size={0} data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      width: 0,
      height: -1, // size - 1
    });
  });

  it('deve renderizar com tamanho negativo', () => {
    render(<Loader size={-10} data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      width: -10,
      height: -11, // size - 1
    });
  });

  it('deve renderizar com tamanho muito grande', () => {
    render(<Loader size={200} data-testid="loader" />);
    
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveStyle({
      width: 200,
      height: 199, // size - 1
    });
  });
});
