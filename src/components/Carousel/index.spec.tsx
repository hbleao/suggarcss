import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Carousel } from './index';

// Mock do módulo de estilos
jest.mock('./styles.scss', () => ({}));

// Mock para o ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para setInterval e clearInterval
jest.useFakeTimers();

describe('Carousel', () => {
  // Helper para criar slides de teste
  const createTestSlides = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} data-testid={`slide-${index}`}>
        Slide {index + 1}
      </div>
    ));
  };

  beforeEach(() => {
    // Limpar todos os timers antes de cada teste
    jest.clearAllTimers();
    
    // Mock para elementos DOM que não estão disponíveis no ambiente de teste
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
    });
    
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 300,
    });
  });

  it('deve renderizar corretamente com configurações padrão', () => {
    const slides = createTestSlides(3);
    render(<Carousel>{slides}</Carousel>);
    
    // Verificar se o componente foi renderizado
    const carousel = screen.getByRole('presentation', { hidden: true });
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveClass('carousel');
    
    // Verificar se os slides foram renderizados
    const slide1 = screen.getByText('Slide 1');
    const slide2 = screen.getByText('Slide 2');
    const slide3 = screen.getByText('Slide 3');
    
    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
    expect(slide3).toBeInTheDocument();
    
    // Verificar se os controles não estão visíveis por padrão
    const controls = screen.queryByRole('group', { hidden: true });
    expect(controls).not.toBeInTheDocument();
    
    // Verificar se os dots não estão visíveis por padrão
    const dots = screen.queryByRole('navigation', { hidden: true });
    expect(dots).not.toBeInTheDocument();
  });

  it('deve renderizar com setas de navegação quando arrows=true', () => {
    const slides = createTestSlides(3);
    render(<Carousel arrows>{slides}</Carousel>);
    
    // Verificar se os botões de navegação estão presentes
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    // Verificar se os botões têm a classe correta
    expect(buttons[0]).toHaveClass('carousel__button');
    expect(buttons[1]).toHaveClass('carousel__button');
  });

  it('deve renderizar com indicadores de pontos quando dots=true', () => {
    const slides = createTestSlides(3);
    render(<Carousel dots>{slides}</Carousel>);
    
    // Verificar se os dots estão presentes
    const dotsContainer = screen.getByRole('navigation', { hidden: true });
    expect(dotsContainer).toBeInTheDocument();
    expect(dotsContainer).toHaveClass('carousel__dots');
    
    // Verificar se há um dot para cada slide
    const dots = screen.getAllByRole('button');
    expect(dots).toHaveLength(3);
    
    // Verificar se o primeiro dot está ativo
    expect(dots[0]).toHaveClass('active');
    expect(dots[1]).not.toHaveClass('active');
    expect(dots[2]).not.toHaveClass('active');
  });

  it('deve navegar para o próximo slide ao clicar na seta direita', () => {
    const slides = createTestSlides(3);
    render(<Carousel arrows>{slides}</Carousel>);
    
    // Obter os botões de navegação
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];
    
    // Clicar no botão de próximo
    fireEvent.click(nextButton);
    
    // Verificar se o transform foi aplicado corretamente
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.transform).toBe('translateX(-516px)');
  });

  it('deve navegar para o slide anterior ao clicar na seta esquerda', () => {
    const slides = createTestSlides(3);
    render(<Carousel arrows>{slides}</Carousel>);
    
    // Obter os botões de navegação
    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];
    
    // Primeiro, vamos para o slide 2
    fireEvent.click(nextButton);
    
    // Agora, voltar para o slide 1
    fireEvent.click(prevButton);
    
    // Verificar se o transform foi aplicado corretamente
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.transform).toBe('translateX(0px)');
  });

  it('deve navegar para um slide específico ao clicar em um dot', () => {
    const slides = createTestSlides(3);
    render(<Carousel dots>{slides}</Carousel>);
    
    // Obter os dots
    const dots = screen.getAllByRole('button');
    
    // Clicar no terceiro dot
    fireEvent.click(dots[2]);
    
    // Verificar se o transform foi aplicado corretamente
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.transform).toBe('translateX(-1032px)');
    
    // Verificar se o dot correto está ativo
    expect(dots[0]).not.toHaveClass('active');
    expect(dots[1]).not.toHaveClass('active');
    expect(dots[2]).toHaveClass('active');
  });

  it('deve avançar automaticamente os slides quando autoPlay=true', () => {
    const slides = createTestSlides(3);
    render(<Carousel autoPlay autoPlayInterval={1000}>{slides}</Carousel>);
    
    // Avançar o tempo para acionar o autoplay
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verificar se o transform foi aplicado corretamente
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.transform).toBe('translateX(-516px)');
    
    // Avançar mais uma vez
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verificar se avançou para o próximo slide
    expect(track.style.transform).toBe('translateX(-1032px)');
    
    // Avançar mais uma vez (deve voltar ao início)
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verificar se voltou ao primeiro slide
    expect(track.style.transform).toBe('translateX(0px)');
  });

  it('deve aplicar o gap correto entre os slides', () => {
    const slides = createTestSlides(3);
    const customGap = 30;
    render(<Carousel gap={customGap}>{slides}</Carousel>);
    
    // Verificar se o gap foi aplicado corretamente
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.gap).toBe(`${customGap}px`);
    
    // Verificar se os slides têm o padding correto
    const slideElements = screen.getAllByRole('listitem', { hidden: true });
    slideElements.forEach(slide => {
      expect(slide.style.padding).toBe(`0px ${customGap / 2}px`);
    });
  });

  it('deve mostrar múltiplos slides quando slidesToShow > 1', () => {
    const slides = createTestSlides(6);
    render(<Carousel slidesToShow={3}>{slides}</Carousel>);
    
    // Verificar se a largura do track é correta
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.width).toBe('200%');
  });

  it('deve navegar por múltiplos slides quando slidesToScroll > 1', () => {
    const slides = createTestSlides(6);
    render(<Carousel arrows slidesToScroll={2}>{slides}</Carousel>);
    
    // Obter os botões de navegação
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];
    
    // Clicar no botão de próximo
    fireEvent.click(nextButton);
    
    // Verificar se avançou 2 slides
    const track = screen.getByRole('list', { hidden: true });
    expect(track.style.transform).toBe('translateX(-1032px)');
  });

  it('deve lidar com eventos de arrastar para navegação', () => {
    const slides = createTestSlides(3);
    render(<Carousel>{slides}</Carousel>);
    
    const track = screen.getByRole('list', { hidden: true });
    
    // Simular arrastar da direita para a esquerda (próximo slide)
    fireEvent.mouseDown(track, { clientX: 500 });
    fireEvent.mouseUp(track, { clientX: 400 });
    
    // Verificar se avançou para o próximo slide
    expect(track.style.transform).toBe('translateX(-516px)');
    
    // Simular arrastar da esquerda para a direita (slide anterior)
    fireEvent.mouseDown(track, { clientX: 400 });
    fireEvent.mouseUp(track, { clientX: 500 });
    
    // Verificar se voltou ao slide anterior
    expect(track.style.transform).toBe('translateX(0px)');
  });

  it('deve lidar com eventos de toque para navegação', () => {
    const slides = createTestSlides(3);
    render(<Carousel>{slides}</Carousel>);
    
    const track = screen.getByRole('list', { hidden: true });
    
    // Simular toque da direita para a esquerda (próximo slide)
    fireEvent.touchStart(track, { touches: [{ clientX: 500 }] });
    fireEvent.touchEnd(track, { changedTouches: [{ clientX: 400 }] });
    
    // Verificar se avançou para o próximo slide
    expect(track.style.transform).toBe('translateX(-516px)');
    
    // Simular toque da esquerda para a direita (slide anterior)
    fireEvent.touchStart(track, { touches: [{ clientX: 400 }] });
    fireEvent.touchEnd(track, { changedTouches: [{ clientX: 500 }] });
    
    // Verificar se voltou ao slide anterior
    expect(track.style.transform).toBe('translateX(0px)');
  });

  it('deve limpar o intervalo de autoplay ao desmontar o componente', () => {
    const slides = createTestSlides(3);
    const { unmount } = render(<Carousel autoPlay>{slides}</Carousel>);
    
    // Verificar se o setInterval foi chamado
    expect(setInterval).toHaveBeenCalled();
    
    // Desmontar o componente
    unmount();
    
    // Verificar se o clearInterval foi chamado
    expect(clearInterval).toHaveBeenCalled();
  });
});
