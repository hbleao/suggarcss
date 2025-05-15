import React from 'react';
import { render, act } from '@testing-library/react';
import { ProgressBar } from './index';

// Mock para o módulo de estilos
jest.mock('./styles.module.scss', () => ({
  progressBar: 'progressBar-mock',
  progressBarFill: 'progressBarFill-mock'
}));

describe('<ProgressBar />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve renderizar o componente com valor inicial', () => {
    const { container } = render(<ProgressBar value={75} initialValue={25} />);
    
    const progressBarFill = container.querySelector('.progressBarFill-mock');
    expect(progressBarFill).toBeInTheDocument();
    expect(progressBarFill).toHaveStyle({
      width: '25%',
      backgroundColor: '#0046c0'
    });
  });

  it('deve atualizar para o valor final após o timeout', () => {
    const { container } = render(<ProgressBar value={75} initialValue={25} />);
    
    // Avança o timer para disparar o useEffect
    act(() => {
      jest.runAllTimers();
    });
    
    const progressBarFill = container.querySelector('.progressBarFill-mock');
    expect(progressBarFill).toHaveStyle({
      width: '75%'
    });
  });

  it('deve usar o valor inicial 0 quando não especificado', () => {
    const { container } = render(<ProgressBar value={50} />);
    
    const progressBarFill = container.querySelector('.progressBarFill-mock');
    expect(progressBarFill).toHaveStyle({
      width: '0%'
    });
    
    // Avança o timer para disparar o useEffect
    act(() => {
      jest.runAllTimers();
    });
    
    expect(progressBarFill).toHaveStyle({
      width: '50%'
    });
  });

  it('deve usar a cor personalizada quando fornecida', () => {
    const { container } = render(<ProgressBar value={60} color="#FF5500" />);
    
    // Avança o timer para disparar o useEffect
    act(() => {
      jest.runAllTimers();
    });
    
    const progressBarFill = container.querySelector('.progressBarFill-mock');
    expect(progressBarFill).toHaveStyle({
      backgroundColor: '#FF5500'
    });
  });

  it('deve usar a cor padrão quando não especificada', () => {
    const { container } = render(<ProgressBar value={60} />);
    
    const progressBarFill = container.querySelector('.progressBarFill-mock');
    expect(progressBarFill).toHaveStyle({
      backgroundColor: '#0046c0'
    });
  });

  it('deve limpar o timeout ao desmontar o componente', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(<ProgressBar value={80} />);
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
