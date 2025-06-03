import { carousel } from './carousel';
import '@testing-library/jest-dom';

// Mock do formatGtmText para isolar o teste
jest.mock('./utils', () => ({
  formatGtmText: (text: string) => text.toLowerCase().replace(/\s+/g, '-'),
}));

describe('carousel tracking', () => {
  // Setup do DOM antes de cada teste
  beforeEach(() => {
    // Limpa o DOM
    document.body.innerHTML = '';
    
    // Cria um título para a página
    const title = document.createElement('h1');
    title.id = 'gtm-title';
    title.textContent = 'Teste Carousel';
    document.body.appendChild(title);
    
    // Cria uma estrutura básica de carousel
    const carouselHTML = `
      <div class="carousel-container">
        <div class="carousel__controls">
          <button class="carousel__button"></button>
          <button class="carousel__button"></button>
        </div>
        <div data-testid="carousel-wrapper" class="carousel">
          <div data-testid="carousel-track" class="carousel__track">
            <div class="carousel__slide">Slide 1</div>
            <div class="carousel__slide">Slide 2</div>
            <div class="carousel__slide">Slide 3</div>
          </div>
          <div class="carousel__dots">
            <button class="carousel__dot"></button>
            <button class="carousel__dot"></button>
            <button class="carousel__dot"></button>
          </div>
        </div>
      </div>
    `;
    
    document.body.innerHTML += carouselHTML;
  });
  
  test('deve adicionar atributos data-gtm ao wrapper do carousel', () => {
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se os atributos foram adicionados ao wrapper
    const wrapper = document.querySelector('[data-testid="carousel-wrapper"]');
    expect(wrapper).toHaveAttribute('data-gtm-name', 'teste-carousel');
    expect(wrapper).toHaveAttribute('data-gtm-component', 'carousel');
  });
  
  test('deve adicionar atributos data-gtm aos slides', () => {
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se os atributos foram adicionados a todos os slides
    const slides = document.querySelectorAll('.carousel__slide');
    expect(slides).toHaveLength(3);
    
    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute('data-gtm-name', 'teste-carousel');
      expect(slide).toHaveAttribute('data-gtm-component', 'carousel');
      expect(slide).toHaveAttribute('data-gtm-subname', `slide-${index + 1}`);
      expect(slide).toHaveAttribute('data-gtm-position', `${index + 1}`);
    });
  });
  
  test('deve adicionar atributos data-gtm aos botões de navegação', () => {
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se os atributos foram adicionados aos botões de navegação
    const navButtons = document.querySelectorAll('.carousel__button');
    expect(navButtons).toHaveLength(2);
    
    const directions = ['anterior', 'proximo'];
    navButtons.forEach((button, index) => {
      expect(button).toHaveAttribute('data-gtm-name', 'teste-carousel');
      expect(button).toHaveAttribute('data-gtm-component', 'carousel');
      expect(button).toHaveAttribute('data-gtm-clicktype', 'carousel-navigation');
      expect(button).toHaveAttribute('data-gtm-subname', `navegacao-${directions[index]}`);
    });
  });
  
  test('deve adicionar atributos data-gtm aos pontos de navegação', () => {
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se os atributos foram adicionados aos pontos de navegação
    const dots = document.querySelectorAll('.carousel__dot');
    expect(dots).toHaveLength(3);
    
    dots.forEach((dot, index) => {
      expect(dot).toHaveAttribute('data-gtm-name', 'teste-carousel');
      expect(dot).toHaveAttribute('data-gtm-component', 'carousel');
      expect(dot).toHaveAttribute('data-gtm-clicktype', 'carousel-dot');
      expect(dot).toHaveAttribute('data-gtm-subname', `ponto-${index + 1}`);
      expect(dot).toHaveAttribute('data-gtm-position', `${index + 1}`);
    });
  });
  
  test('deve usar "sem-titulo" quando não houver título na página', () => {
    // Remove o título da página
    const title = document.querySelector('#gtm-title');
    if (title) title.remove();
    
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se os atributos foram adicionados com o valor padrão
    const wrapper = document.querySelector('[data-testid="carousel-wrapper"]');
    expect(wrapper).toHaveAttribute('data-gtm-name', 'sem-titulo');
  });

  test('deve lidar com múltiplos carrosséis na página', () => {
    // Adiciona um segundo carousel
    const secondCarouselHTML = `
      <div class="carousel-container-2">
        <div data-testid="carousel-wrapper" class="carousel">
          <div data-testid="carousel-track" class="carousel__track">
            <div class="carousel__slide">Outro Slide 1</div>
            <div class="carousel__slide">Outro Slide 2</div>
          </div>
        </div>
      </div>
    `;
    document.body.innerHTML += secondCarouselHTML;
    
    // Executa a função de tagueamento
    carousel();
    
    // Verifica se ambos os carrosséis foram tagueados
    const wrappers = document.querySelectorAll('[data-testid="carousel-wrapper"]');
    expect(wrappers).toHaveLength(2);
    
    wrappers.forEach(wrapper => {
      expect(wrapper).toHaveAttribute('data-gtm-name', 'teste-carousel');
      expect(wrapper).toHaveAttribute('data-gtm-component', 'carousel');
    });
    
    // Verifica se os slides do segundo carousel também foram tagueados
    const secondCarouselSlides = document.querySelector('.carousel-container-2')?.querySelectorAll('.carousel__slide');
    expect(secondCarouselSlides).toHaveLength(2);
    secondCarouselSlides?.forEach((slide, index) => {
      expect(slide).toHaveAttribute('data-gtm-position', `${index + 1}`);
    });
  });

  test('deve lidar com carrosséis sem elementos pai ou elementos filhos', () => {
    // Limpa o DOM e cria um carousel sem parent element
    document.body.innerHTML = '';
    
    // Cria um título para a página
    const title = document.createElement('h1');
    title.id = 'gtm-title';
    title.textContent = 'Teste Carousel';
    document.body.appendChild(title);
    
    // Cria um carousel sem parent element e sem elementos filhos
    const orphanCarouselHTML = `<div data-testid="carousel-wrapper" class="carousel"></div>`;
    document.body.innerHTML += orphanCarouselHTML;
    
    // Executa a função de tagueamento (não deve lançar erro)
    expect(() => carousel()).not.toThrow();
    
    // Verifica se os atributos básicos foram adicionados
    const wrapper = document.querySelector('[data-testid="carousel-wrapper"]');
    expect(wrapper).toHaveAttribute('data-gtm-name', 'teste-carousel');
    expect(wrapper).toHaveAttribute('data-gtm-component', 'carousel');
  });
});
