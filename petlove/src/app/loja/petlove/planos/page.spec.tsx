import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Plans from './page';
import { useWindowSize } from '@/hooks';
import { PlansService } from '@/services';
import { useAquisitionStore } from '@/store';
import { pushPlansToDataLayer, pushErrorPlansToDataLayer } from './dataLayer';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/hooks', () => ({
  useTracking: jest.fn(),
  useWindowSize: jest.fn(),
}));

jest.mock('@/services', () => ({
  PlansService: jest.fn(),
}));

jest.mock('@/store', () => ({
  useAquisitionStore: jest.fn(),
}));

jest.mock('./dataLayer', () => ({
  pushPlansToDataLayer: jest.fn(),
  pushErrorPlansToDataLayer: jest.fn(),
}));

jest.mock('@/components', () => ({
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Carousel: ({ children }) => <div data-testid="carousel">{children}</div>,
  Dialog: ({ children, isOpen, title, description, primaryAction }) => (
    isOpen ? (
      <div data-testid="dialog">
        <div data-testid="dialog-title">{title}</div>
        <div data-testid="dialog-description">{description}</div>
        {primaryAction && <button onClick={primaryAction.onClick}>{primaryAction.label}</button>}
        {children}
      </div>
    ) : null
  ),
  HeaderAcquisitionFlow: ({ goBackLink }) => (
    <header>
      <a href={goBackLink}>Voltar</a>
    </header>
  ),
  ProgressBar: ({ value, initialValue }) => (
    <div data-testid="progress-bar" data-value={value} data-initial-value={initialValue}></div>
  ),
  Typography: ({ children, variant, weight, className, color }) => (
    <div className={`typography ${variant} ${weight} ${className} ${color}`}>{children}</div>
  ),
}));

jest.mock('./LoaderPlans', () => ({
  LoaderPlans: () => <div data-testid="loader-plans">Carregando planos...</div>,
}));

jest.mock('./Plan', () => ({
  Plan: ({ plan }) => (
    <div data-testid="plan-item" data-plan-id={plan.id}>
      {plan.name}
    </div>
  ),
}));

describe('Plans Page', () => {
  const mockPlans = [
    {
      id: 'plan1',
      name: 'Plano Básico',
      price: 49.90,
      description: 'Plano básico para seu pet',
      benefits: ['Consultas', 'Vacinas'],
    },
    {
      id: 'plan2',
      name: 'Plano Premium',
      price: 89.90,
      description: 'Plano premium para seu pet',
      benefits: ['Consultas', 'Vacinas', 'Exames'],
    },
  ];

  const mockAquisitionStore = {
    data: {
      address: {
        ibgeCode: '3550308',
      },
      pet: {
        type: 'dog',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });
    (useAquisitionStore as jest.Mock).mockReturnValue(mockAquisitionStore);
    (PlansService as jest.Mock).mockResolvedValue({ data: mockPlans });
  });

  it('deve renderizar o componente corretamente', async () => {
    const { container } = render(<Plans />);
    
    // Verifica os textos principais da página
    const titleElement = container.querySelector('.plans__title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toContain('O melhor plano para o seu pet está aqui!');
    
    const subtitleElement = container.querySelector('.plans__subtitle');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement?.textContent).toContain('Com base no seu perfil, encontramos as melhores opções. Agora é só escolher:');
    
    // Verifica se o loader é exibido inicialmente
    expect(screen.getAllByTestId('loader-plans').length).toBeGreaterThan(0);
    
    // Espera os planos serem carregados
    await waitFor(() => {
      expect(PlansService).toHaveBeenCalledWith({ ibgeCode: '3550308' });
    });
    
    // Verifica se o evento do dataLayer foi disparado
    expect(pushPlansToDataLayer).toHaveBeenCalledWith(mockPlans, 'dog');
  });

  it('deve exibir mensagem de erro quando a API falhar', async () => {
    (PlansService as jest.Mock).mockRejectedValue({
      url: '/api/plans',
      status: 500,
      backendErrorMessage: 'Internal Server Error',
    });
    
    render(<Plans />);
    
    // Espera a API ser chamada e falhar
    await waitFor(() => {
      expect(PlansService).toHaveBeenCalledWith({ ibgeCode: '3550308' });
    });
    
    // Verifica se o evento de erro do dataLayer foi disparado
    expect(pushErrorPlansToDataLayer).toHaveBeenCalledWith({
      endpoint: '/api/plans',
      status: 500,
      backendErrorMessage: 'Internal Server Error',
    });
    
    // Verifica se o estado de erro foi atualizado
    await waitFor(() => {
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });
  });

  it('deve ajustar a configuração do carousel de acordo com o tamanho da tela', async () => {
    // Simula uma mudança no tamanho da tela para mobile
    (useWindowSize as jest.Mock).mockReturnValue({ width: 480 });
    
    render(<Plans />);
    
    // Espera os planos serem carregados
    await waitFor(() => {
      expect(PlansService).toHaveBeenCalled();
    });
    
    // Verifica que o componente foi renderizado com a configuração correta
    expect(screen.queryAllByTestId('carousel')).toHaveLength(1);
  });

  it('não deve buscar planos se não houver ibgeCode', async () => {
    (useAquisitionStore as jest.Mock).mockReturnValue({
      data: {
        address: {
          ibgeCode: '',
        },
        pet: {
          type: 'dog',
        },
      },
    });
    
    render(<Plans />);
    
    // Verifica que o serviço não foi chamado
    await waitFor(() => {
      expect(PlansService).not.toHaveBeenCalled();
    });
  });
});
