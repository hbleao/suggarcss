import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from './index';

// Definindo o tipo ColorToken para o teste
type ColorToken = string;

describe('<Loader />', () => {
  it('deve renderizar o componente com valores padrão', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('--border-neutral-900');
    expect(loaderElement).toHaveStyle({
      width: '24px',
      height: '23px',
      borderBottomColor: 'transparent'
    });
  });

  it('deve renderizar o componente com cor personalizada', () => {
    const { container } = render(<Loader color="primary-500" />);
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toHaveClass('--border-primary-500');
  });

  it('deve renderizar o componente com tamanho personalizado', () => {
    const { container } = render(<Loader size={48} />);
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toHaveStyle({
      width: '48px',
      height: '47px'
    });
  });

  it('deve aplicar classes adicionais quando fornecidas', () => {
    const { container } = render(<Loader className="custom-loader" />);
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toHaveClass('custom-loader');
  });

  it('deve combinar cor, tamanho e classes personalizadas', () => {
    const { container } = render(
      <Loader 
        color="secondary-300" 
        size={32} 
        className="test-loader" 
      />
    );
    
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toHaveClass('--border-secondary-300');
    expect(loaderElement).toHaveClass('test-loader');
    expect(loaderElement).toHaveStyle({
      width: '32px',
      height: '31px',
      borderBottomColor: 'transparent'
    });
  });
});
