import { useWindowSize } from '@/hooks';
import { PlansService } from '@/services';
import { useAquisitionStore } from '@/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { pushErrorPlansToDataLayer, pushPlansToDataLayer } from './dataLayer';
import Plans from './page';
// Create a simplified mock type for testing
interface MockPlanType {
  planId: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

// Use the mock type for dataLayer functions
type DataLayerArgs = [MockPlanType[], string];
type ErrorDataLayerArgs = [{ endpoint: string; status: number; backendErrorMessage: string }];

// Mocks
const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter),
}));

jest.mock('@/hooks', () => ({
  useTracking: jest.fn(),
  useWindowSize: jest.fn(),
}));

const mockPlansService = jest.fn();
jest.mock('@/services', () => ({
  PlansService: () => mockPlansService(),
}));

const mockAddress = {
  ibgeCode: '3550308',
};

const mockPet = {
  type: 'dog',
};

const mockSetPlans = jest.fn();

interface StoreState {
  data: { 
    address: typeof mockAddress;
    pet: typeof mockPet;
  };
  setPlans: typeof mockSetPlans;
}

jest.mock('@/store', () => ({
  useAquisitionStore: (selector: (state: StoreState) => unknown) => {
    const state = {
      data: { 
        address: mockAddress,
        pet: mockPet,
      },
      setPlans: mockSetPlans,
    };
    return selector(state);
  },
}));

const mockPushPlansToDataLayer = jest.fn();
const mockPushErrorPlansToDataLayer = jest.fn();

// Types already defined above

jest.mock('./dataLayer', () => ({
  pushPlansToDataLayer: (...args: DataLayerArgs) => mockPushPlansToDataLayer(...args),
  pushErrorPlansToDataLayer: (...args: ErrorDataLayerArgs) => mockPushErrorPlansToDataLayer(...args),
}));

// Component mocks with proper types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: string;
  type?: 'button' | 'submit' | 'reset';
}

interface CarouselProps {
  children: React.ReactNode;
  slidesToShow: number;
  slidesToScroll: number;
  gap: number;
  arrows: boolean;
}

interface DialogProps {
  children?: React.ReactNode;
  isOpen: boolean;
  title: string;
  subtitle?: string;
  description?: string;
  footer?: React.ReactNode;
}

interface HeaderProps {
  goBackLink: string;
  hasShoppingCart: boolean;
}

interface ProgressBarProps {
  value: number;
  initialValue: number;
}

interface TypographyProps {
  children: React.ReactNode;
  variant?: string;
  weight?: string;
  className?: string;
  color?: string;
  id?: string;
}

interface PlanProps {
  plan: MockPlanType;
  firstItem?: boolean;
}

jest.mock('@/components', () => ({
  Button: ({ children, onClick, type = 'button', size }: ButtonProps) => (
    <button type={type} onClick={onClick}>{children}</button>
  ),
  Carousel: ({ children, slidesToShow, slidesToScroll }: CarouselProps) => (
    <div data-testid="carousel" data-slides-to-show={slidesToShow} data-slides-to-scroll={slidesToScroll}>
      {children}
    </div>
  ),
  Dialog: ({ children, isOpen, title, subtitle, description, footer }: DialogProps) => (
    isOpen ? (
      <div data-testid="dialog">
        <div data-testid="dialog-title">{title}</div>
        {subtitle && <div data-testid="dialog-subtitle">{subtitle}</div>}
        {description && <div data-testid="dialog-description">{description}</div>}
        {footer && <div data-testid="dialog-footer">{footer}</div>}
        {children}
      </div>
    ) : null
  ),
  HeaderAcquisitionFlow: ({ goBackLink }: HeaderProps) => (
    <header>
      <a href={goBackLink}>Voltar</a>
    </header>
  ),
  ProgressBar: ({ value, initialValue }: ProgressBarProps) => (
    <div data-testid="progress-bar" data-value={value} data-initial-value={initialValue} />
  ),
  Typography: ({ children, variant, weight, className, color, id }: TypographyProps) => (
    <div id={id} className={`typography ${variant || ''} ${weight || ''} ${className || ''} ${color || ''}`}>{children}</div>
  ),
  CustomData: () => <div data-testid="custom-data" />,
}));

jest.mock('./LoaderPlans', () => ({
  LoaderPlans: () => <div data-testid="loader-plans">Carregando planos...</div>,
}));

jest.mock('./Plan', () => ({
  Plan: ({ plan, firstItem }: PlanProps) => (
    <div data-testid="plan-item" data-plan-id={plan.planId} data-first-item={firstItem}>
      {plan.name}
    </div>
  ),
}));

const mockPlans: MockPlanType[] = [
  {
    planId: 'plan1',
    name: 'Plano Básico',
    price: 49.90,
    description: 'Plano básico para seu pet',
    benefits: ['Consultas', 'Vacinas'],
  },
  {
    planId: 'plan2',
    name: 'Plano Premium',
    price: 89.90,
    description: 'Plano premium para seu pet',
    benefits: ['Consultas', 'Vacinas', 'Exames'],
  },
];

const makeSut = () => {
  return render(<Plans />);
};

describe('Plans Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });
    mockPlansService.mockResolvedValue({ data: mockPlans });
  });

  it('Should correctly render the page', async () => {
    makeSut();

    // Check main page elements
    const titleElement = screen.getByText(/O melhor plano para o seu pet está aqui!/i);
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = screen.getByText(/Com base no seu perfil, encontramos as melhores opções. Agora é só escolher:/i);
    expect(subtitleElement).toBeInTheDocument();

    // Check if loader is displayed initially
    const loaderElements = screen.getAllByTestId('loader-plans');
    expect(loaderElements.length).toBeGreaterThan(0);

    // Wait for plans to load
    await waitFor(() => {
      expect(mockPlansService).toHaveBeenCalledWith({ ibgeCode: '3550308' });
    });

    // Check if dataLayer event was triggered
    expect(mockPushPlansToDataLayer).toHaveBeenCalledWith(mockPlans, 'dog');
  });

  it('Should display error message when API fails', async () => {
    const errorData = {
      url: '/api/plans',
      status: 500,
      backendErrorMessage: 'Internal Server Error',
    };
    
    mockPlansService.mockRejectedValue(errorData);

    makeSut();

    // Wait for API to be called and fail
    await waitFor(() => {
      expect(mockPlansService).toHaveBeenCalledWith({ ibgeCode: '3550308' });
    });

    // Check if error dataLayer event was triggered
    expect(mockPushErrorPlansToDataLayer).toHaveBeenCalledWith(errorData);

    // Check if error dialog is displayed
    const dialogTitle = screen.getByTestId('dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle.textContent).toBe('Poxa, nosso sistema está em manutenção');
    
    const dialogDescription = screen.getByTestId('dialog-description');
    expect(dialogDescription).toBeInTheDocument();
    expect(dialogDescription.textContent).toBe('Por favor, tente de novo mais tarde.');

    // Check if retry button works
    const retryButton = screen.getByText('Tentar novamente');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockPlansService).toHaveBeenCalledTimes(2);
  });

  it('Should adjust carousel configuration according to screen size', async () => {
    // Simulate screen size change to mobile
    (useWindowSize as jest.Mock).mockReturnValue({ width: 480 });

    makeSut();

    // Wait for plans to load
    await waitFor(() => {
      expect(mockPlansService).toHaveBeenCalled();
    });

    // Check that carousel was rendered with correct configuration
    const carouselElement = screen.getByTestId('carousel');
    expect(carouselElement).toBeInTheDocument();
    
    // Mobile view should have different slides configuration
    expect(carouselElement).toHaveAttribute('data-slides-to-show');
    expect(carouselElement).toHaveAttribute('data-slides-to-scroll');
  });

  it('Should not fetch plans if ibgeCode is missing', async () => {
    // Override the mock to simulate missing ibgeCode
    mockAddress.ibgeCode = '';
    
    makeSut();

    // Check that service was not called
    await waitFor(() => {
      expect(mockPlansService).not.toHaveBeenCalled();
    });
    
    // Reset for other tests
    mockAddress.ibgeCode = '3550308';
  });
  
  it('Should display plans when loaded successfully', async () => {
    makeSut();
    
    // Initially should show loaders
    expect(screen.getAllByTestId('loader-plans').length).toBeGreaterThan(0);
    
    // Wait for plans to load
    await waitFor(() => {
      expect(mockPlansService).toHaveBeenCalled();
    });
    
    // Check that plans are displayed
    const planElements = await screen.findAllByTestId('plan-item');
    expect(planElements.length).toBe(mockPlans.length);
    
    // Check first plan is marked as first
    expect(planElements[0]).toHaveAttribute('data-first-item', 'true');
    expect(planElements[0]).toHaveAttribute('data-plan-id', mockPlans[0].planId);
  });
});
