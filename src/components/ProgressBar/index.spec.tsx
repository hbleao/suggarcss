import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ProgressBar } from './index';

// Mock do módulo de estilos
jest.mock('./styles.module.scss', () => ({
  progressBar: 'progress-bar-class',
  progressBarFill: 'progress-bar-fill-class'
}));

describe('ProgressBar', () => {
  beforeEach(() => {
    // Limpar todos os timers antes de cada teste
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve renderizar corretamente com valores padrão', () => {
    render(<ProgressBar value={50} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('progress-bar-class');
    
    const progressBarFill = progressBar.firstChild;
    expect(progressBarFill).toHaveClass('progress-bar-fill-class');
    
    // Inicialmente, a largura deve ser 0%
    expect(progressBarFill).toHaveStyle({
      width: '0%',
      backgroundColor: '#0046c0'
    });
    
    // Após o timeout, a largura deve ser atualizada para o valor fornecido
    act(() => {
      jest.runAllTimers();
    });
    
    expect(progressBarFill).toHaveStyle({
      width: '50%'
    });
  });

  it('deve renderizar com valor inicial personalizado', () => {
    render(<ProgressBar initialValue={20} value={80} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    // Inicialmente, a largura deve ser o valor inicial
    expect(progressBarFill).toHaveStyle({
      width: '20%'
    });
    
    // Após o timeout, a largura deve ser atualizada para o valor fornecido
    act(() => {
      jest.runAllTimers();
    });
    
    expect(progressBarFill).toHaveStyle({
      width: '80%'
    });
  });

  it('deve renderizar com cor personalizada', () => {
    render(<ProgressBar value={50} color="#FF0000" data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    expect(progressBarFill).toHaveStyle({
      backgroundColor: '#FF0000'
    });
    
    act(() => {
      jest.runAllTimers();
    });
    
    // A cor deve permanecer a mesma após a animação
    expect(progressBarFill).toHaveStyle({
      backgroundColor: '#FF0000'
    });
  });

  it('deve limpar o timer ao desmontar o componente', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(<ProgressBar value={50} />);
    
    // Desmontar o componente
    unmount();
    
    // Verificar se clearTimeout foi chamado
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  it('deve renderizar com valor 0', () => {
    render(<ProgressBar value={0} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(progressBarFill).toHaveStyle({
      width: '0%'
    });
  });

  it('deve renderizar com valor 100', () => {
    render(<ProgressBar value={100} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(progressBarFill).toHaveStyle({
      width: '100%'
    });
  });

  it('deve lidar com valores fora do intervalo 0-100', () => {
    render(<ProgressBar value={120} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    act(() => {
      jest.runAllTimers();
    });
    
    // Mesmo que o valor seja maior que 100, a largura deve ser definida como o valor fornecido
    expect(progressBarFill).toHaveStyle({
      width: '120%'
    });
  });

  it('deve lidar com valores negativos', () => {
    render(<ProgressBar value={-20} data-testid="progress-bar" />);
    
    const progressBar = screen.getByTestId('progress-bar');
    const progressBarFill = progressBar.firstChild;
    
    act(() => {
      jest.runAllTimers();
    });
    
    // Mesmo que o valor seja negativo, a largura deve ser definida como o valor fornecido
    expect(progressBarFill).toHaveStyle({
      width: '-20%'
    });
  });
});
