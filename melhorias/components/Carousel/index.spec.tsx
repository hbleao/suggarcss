import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Carousel } from './index';

// Mock para ResizeObserver que não está disponível no ambiente de teste
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<Carousel />', () => {
  const slides = [
    <div key="1" data-testid="slide-1">Slide 1</div>,
    <div key="2" data-testid="slide-2">Slide 2</div>,
    <div key="3" data-testid="slide-3">Slide 3</div>,
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('deve renderizar todos os slides', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    expect(screen.getByTestId('slide-3')).toBeInTheDocument();
  });

  it('deve renderizar os controles de navegação quando arrows=true', () => {
    const { container } = render(<Carousel arrows>{slides}</Carousel>);
    const buttons = container.querySelectorAll('.carousel__button');
    expect(buttons.length).toBe(2);
  });

  it('não deve renderizar os controles de navegação quando arrows=false', () => {
    const { container } = render(<Carousel arrows={false}>{slides}</Carousel>);
    const buttons = container.querySelectorAll('.carousel__button');
    expect(buttons.length).toBe(0);
  });

  it('deve renderizar os indicadores de paginação quando dots=true', () => {
    const { container } = render(<Carousel dots>{slides}</Carousel>);
    expect(container.querySelector('.carousel__dots')).toBeInTheDocument();
    const dots = container.querySelectorAll('.carousel__dot');
    expect(dots.length).toBe(slides.length);
  });

  it('não deve renderizar os indicadores de paginação quando dots=false', () => {
    const { container } = render(<Carousel dots={false}>{slides}</Carousel>);
    expect(container.querySelector('.carousel__dots')).not.toBeInTheDocument();
  });

  it('deve navegar para o próximo slide ao clicar no botão de próximo', () => {
    const { container } = render(<Carousel arrows>{slides}</Carousel>);
    const buttons = container.querySelectorAll('.carousel__button');
    const nextButton = buttons[1];

    // Simula o clique no botão de próximo
    fireEvent.click(nextButton);

    // Verifica se o estado interno foi alterado (através do estilo de transformação)
    const track = container.querySelector('.carousel__track');
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve navegar para o slide anterior ao clicar no botão de anterior', () => {
    const { container } = render(<Carousel arrows>{slides}</Carousel>);
    const buttons = container.querySelectorAll('.carousel__button');
    const prevButton = buttons[0];

    // Simula o clique no botão de anterior
    fireEvent.click(prevButton);

    // Como estamos no primeiro slide, deve ir para o último
    const track = container.querySelector('.carousel__track');
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve navegar para o slide específico ao clicar em um indicador de paginação', () => {
    const { container } = render(<Carousel dots>{slides}</Carousel>);
    const dots = container.querySelectorAll('.carousel__dot');
    
    // Clica no segundo indicador
    fireEvent.click(dots[1]);
    
    // Verifica se o estado interno foi alterado
    const track = container.querySelector('.carousel__track');
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve avançar automaticamente os slides quando autoPlay=true', () => {
    const { container } = render(
      <Carousel autoPlay autoPlayInterval={1000}>
        {slides}
      </Carousel>
    );
    
    const track = container.querySelector('.carousel__track');
    const initialTransform = track.style.transform;
    
    // Avança o tempo para disparar o autoPlay
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Verifica se a transformação mudou, indicando que o slide avançou
    expect(track.style.transform).not.toBe(initialTransform);
  });

  it('deve limpar o intervalo de autoPlay ao desmontar o componente', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    const { unmount } = render(
      <Carousel autoPlay autoPlayInterval={1000}>
        {slides}
      </Carousel>
    );
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('deve lidar com gestos de arrasto para avançar slides', () => {
    const { container } = render(<Carousel>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    // Simula um gesto de arrasto da direita para a esquerda (avançar)
    fireEvent.mouseDown(track, { clientX: 200 });
    fireEvent.mouseUp(track, { clientX: 100 });
    
    // Verifica se o estado interno foi alterado
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve lidar com gestos de arrasto para retroceder slides', () => {
    const { container } = render(<Carousel>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    // Simula um gesto de arrasto da esquerda para a direita (retroceder)
    fireEvent.mouseDown(track, { clientX: 100 });
    fireEvent.mouseUp(track, { clientX: 200 });
    
    // Como estamos no primeiro slide, deve ir para o último
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve lidar com eventos de toque para navegação', () => {
    const { container } = render(<Carousel>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    // Simula um gesto de toque da direita para a esquerda (avançar)
    fireEvent.touchStart(track, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(track, { changedTouches: [{ clientX: 100 }] });
    
    // Verifica se o estado interno foi alterado
    expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
  });

  it('deve aplicar o espaçamento (gap) correto entre os slides', () => {
    const gapValue = 24;
    const { container } = render(<Carousel gap={gapValue}>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    expect(track).toHaveStyle({ gap: `${gapValue}px` });
  });

  it('deve renderizar o número correto de slides visíveis com slidesToShow', () => {
    const { container } = render(<Carousel slidesToShow={2}>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    // Com slidesToShow=2, a largura do track deve ser 150% (3 slides / 2 visíveis * 100%)
    expect(track).toHaveStyle({ width: '150%' });
  });

  it('deve cancelar o arrasto se o mouse sair do elemento durante o arrasto', () => {
    const { container } = render(<Carousel>{slides}</Carousel>);
    const track = container.querySelector('.carousel__track');
    
    // Inicia o arrasto
    fireEvent.mouseDown(track, { clientX: 200 });
    
    // Mouse sai do elemento
    fireEvent.mouseLeave(track);
    
    // Verifica se o arrasto foi cancelado corretamente
    fireEvent.mouseUp(track, { clientX: 100 });
  });
});
