import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PersonalData from './page';
import { env } from 'next-runtime-env';
import { useTracking } from '@/hooks';
import {
	DataQualityService,
	ProposalService,
	getPublicIP,
	encryptValue,
} from '@/services';
import { useAquisitionStore } from '@/store';
import { handleFieldsValidation } from './validation';
import { pushPromoMktComunicationToDataLayer } from './dataLayer';

// Mock the necessary dependencies
jest.mock('next-runtime-env', () => ({
	env: jest.fn().mockImplementation((key) => {
		const envVars = {
			NEXT_PUBLIC_CART_COOKIE_DOMAIN: 'petlove.com.br',
			NEXT_PUBLIC_ORGANIZATION_ID: '12345',
			NEXT_PUBLIC_SENSEDIA_CLOUD_URL: 'https://api.example.com',
		};
		return envVars[key] || '';
	}),
}));

jest.mock('react-cookie', () => ({
	useCookies: () => [{}, jest.fn(), jest.fn()],
}));

jest.mock('@/hooks', () => ({
	useTracking: jest.fn(),
	useDebouncedValue: jest.fn().mockImplementation((value) => value),
}));

jest.mock('@/services', () => ({
	DataQualityService: jest.fn(),
	ProposalService: jest.fn(),
	getPublicIP: jest.fn(),
	encryptValue: jest.fn().mockImplementation((value) => `encrypted_${value}`),
}));

jest.mock('@/store', () => ({
	useAquisitionStore: jest.fn(),
}));

jest.mock('./validation', () => ({
	handleFieldsValidation: jest.fn().mockReturnValue({}),
}));

jest.mock('./dataLayer', () => ({
	pushPromoMktComunicationToDataLayer: jest.fn(),
}));

jest.mock('@/components', () => ({
	Button: ({ children, onClick, disabled }) => (
		<button data-testid="button" onClick={onClick} disabled={disabled}>
			{children}
		</button>
	),
	Checkbox: ({ onChange, checked }) => (
		<input
			type="checkbox"
			data-testid="checkbox"
			onChange={onChange}
			checked={checked}
		/>
	),
	Dialog: ({ isOpen, children }) =>
		isOpen ? <div data-testid="dialog">{children}</div> : null,
	HeaderAcquisitionFlow: () => <div data-testid="header-acquisition-flow" />,
	Input: ({ name, value, onChange, label }) => (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				data-testid={`input-${name}`}
				id={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	),
	Loader: () => <div data-testid="loader" />,
	ProgressBar: () => <div data-testid="progress-bar" />,
	Typography: ({ children }) => <div>{children}</div>,
}));

describe('PersonalData', () => {
	const mockSetUser = jest.fn();
	const mockLocalStorage = {
		user: {
			fullName: 'John Doe',
			cpf: '123.456.789-00',
			phone: '11999999999',
			email: 'john@example.com',
			acceptTerms: false,
		},
		pet: {
			name: 'Rex',
			type: 'dog',
		},
		address: {
			cep: '12345678',
			street: 'Test Street',
			number: '123',
			complement: 'Apt 101',
			city: 'Test City',
			state: 'Test State',
			stateCode: 'TS',
			neighborhood: 'Test Neighborhood',
		},
		plan: {
			id: 'plan123',
			name: 'Premium Plan',
			price: 99.99,
			coverage: 'Full coverage',
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();

		// Mock the store
		useAquisitionStore.mockReturnValue({
			data: mockLocalStorage,
			setUser: mockSetUser,
		});

		// Mock successful API responses
		DataQualityService.mockResolvedValue({
			isValid: true,
			message: '',
		});

		getPublicIP.mockResolvedValue('192.168.1.1');

		ProposalService.mockResolvedValue({
			cartCommerceId: { cartId: 'cart123' },
			urlCartRedirect: 'https://checkout.petlove.com.br/cart',
		});

		// Mock window.open
		window.open = jest.fn();

		// Mock sessionStorage
		Storage.prototype.setItem = jest.fn();
	});

	it('should render correctly', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		expect(useTracking).toHaveBeenCalled();
		expect(screen.getByTestId('header-acquisition-flow')).toBeInTheDocument();
		expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
		expect(screen.getByTestId('input-fullName')).toBeInTheDocument();
		expect(screen.getByTestId('input-cpf')).toBeInTheDocument();
		expect(screen.getByTestId('input-phone')).toBeInTheDocument();
		expect(screen.getByTestId('input-email')).toBeInTheDocument();
		expect(screen.getByTestId('checkbox')).toBeInTheDocument();
		expect(screen.getByTestId('button')).toBeInTheDocument();
	});

	it('should render the component structure correctly', async () => {
		const { container } = render(<PersonalData />);

		const children = container.firstChild?.childNodes;
		expect(children).toBeDefined();

		if (children) {
			expect(children[0]).toHaveAttribute(
				'data-testid',
				'header-acquisition-flow',
			);
			expect(children[1]).toHaveAttribute('data-testid', 'progress-bar');
			expect(children[2]).toHaveClass('page__personal-data');
		}
	});

	it('should match snapshot', async () => {
		const { container } = render(<PersonalData />);
		expect(container).toMatchSnapshot();
	});

	it('should load initial data from store', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		expect(getPublicIP).toHaveBeenCalled();

		expect(screen.getByTestId('input-fullName')).toHaveValue('John Doe');
		expect(screen.getByTestId('input-cpf')).toHaveValue('123.456.789-00');
		expect(screen.getByTestId('input-email')).toHaveValue('john@example.com');
	});

	it('should validate email when changed', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		const emailInput = screen.getByTestId('input-email');

		await act(async () => {
			fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
		});

		expect(DataQualityService).toHaveBeenCalledWith({
			type: 'email',
			param: 'new@example.com',
		});
	});

	it('should handle email validation failure', async () => {
		// Mock email validation to fail
		(DataQualityService as jest.Mock).mockImplementation(
			(params: { type: string; param: string }) => {
				if (params.type === 'email') {
					return Promise.resolve({
						isValid: false,
						message: 'Email inválido',
					});
				}
				return Promise.resolve({ isValid: true, message: '' });
			},
		);

		await act(async () => {
			render(<PersonalData />);
		});

		const emailInput = screen.getByTestId('input-email');

		await act(async () => {
			fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
		});

		await waitFor(() => {
			expect(DataQualityService).toHaveBeenCalledWith({
				type: 'email',
				param: 'invalid-email',
			});
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should handle email validation service error', async () => {
		(DataQualityService as jest.Mock).mockImplementation(
			(params: { type: string; param: string }) => {
				if (params.type === 'email') {
					return Promise.reject(new Error('Service error'));
				}
				return Promise.resolve({ isValid: true, message: '' });
			},
		);

		await act(async () => {
			render(<PersonalData />);
		});

		const emailInput = screen.getByTestId('input-email');

		await act(async () => {
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		});

		await waitFor(() => {
			expect(DataQualityService).toHaveBeenCalledWith({
				type: 'email',
				param: 'test@example.com',
			});
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should validate phone when changed', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		const phoneInput = screen.getByTestId('input-phone');

		await act(async () => {
			fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });
		});

		expect(DataQualityService).toHaveBeenCalledWith({
			type: 'telefone',
			param: '11987654321',
		});
	});

	it('should handle phone validation failure', async () => {
		(DataQualityService as jest.Mock).mockImplementation(
			(params: { type: string; param: string }) => {
				if (params.type === 'telefone') {
					return Promise.resolve({
						isValid: false,
						message: 'Telefone inválido',
					});
				}
				return Promise.resolve({ isValid: true, message: '' });
			},
		);

		await act(async () => {
			render(<PersonalData />);
		});

		const phoneInput = screen.getByTestId('input-phone');

		await act(async () => {
			fireEvent.change(phoneInput, { target: { value: '(11) 1234' } });
		});

		await waitFor(() => {
			expect(DataQualityService).toHaveBeenCalledWith({
				type: 'telefone',
				param: '111234',
			});
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should handle phone validation service error', async () => {
		(DataQualityService as jest.Mock).mockImplementation(
			(params: { type: string; param: string }) => {
				if (params.type === 'telefone') {
					return Promise.reject(new Error('Service error'));
				}
				return Promise.resolve({ isValid: true, message: '' });
			},
		);

		await act(async () => {
			render(<PersonalData />);
		});

		const phoneInput = screen.getByTestId('input-phone');

		await act(async () => {
			fireEvent.change(phoneInput, { target: { value: '(11) 98765-4321' } });
		});

		await waitFor(() => {
			expect(DataQualityService).toHaveBeenCalledWith({
				type: 'telefone',
				param: '11987654321',
			});
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should validate CPF and full name when changed', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		const fullNameInput = screen.getByTestId('input-fullName');
		const cpfInput = screen.getByTestId('input-cpf');

		await act(async () => {
			fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });
			fireEvent.change(cpfInput, { target: { value: '987.654.321-00' } });
		});

		expect(handleFieldsValidation).toHaveBeenCalled();
	});

	it('should handle CPF validation errors', async () => {
		// Mock validation to return errors
		(handleFieldsValidation as jest.Mock).mockReturnValue({
			cpf: 'CPF inválido',
			fullName: '',
		});

		await act(async () => {
			render(<PersonalData />);
		});

		const cpfInput = screen.getByTestId('input-cpf');

		await act(async () => {
			fireEvent.change(cpfInput, { target: { value: '111.111.111-11' } });
		});

		await waitFor(() => {
			expect(handleFieldsValidation).toHaveBeenCalled();
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should handle full name validation errors', async () => {
		(handleFieldsValidation as jest.Mock).mockReturnValue({
			cpf: '',
			fullName: 'Nome inválido',
		});

		await act(async () => {
			render(<PersonalData />);
		});

		const fullNameInput = screen.getByTestId('input-fullName');

		await act(async () => {
			fireEvent.change(fullNameInput, { target: { value: 'A' } });
		});

		await waitFor(() => {
			expect(handleFieldsValidation).toHaveBeenCalled();
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});

	it('should toggle accept terms when checkbox is clicked', async () => {
		await act(async () => {
			render(<PersonalData />);
		});

		const checkbox = screen.getByTestId('checkbox');

		await act(async () => {
			fireEvent.click(checkbox);
		});

		expect(pushPromoMktComunicationToDataLayer).toHaveBeenCalled();
	});

	it('should submit the form and redirect when all validations pass', async () => {
		(DataQualityService as jest.Mock).mockResolvedValue({
			isValid: true,
			message: '',
		});

		(handleFieldsValidation as jest.Mock).mockReturnValue({
			cpf: '',
			fullName: '',
		});

		await act(async () => {
			render(<PersonalData />);
		});

		await act(async () => {
			fireEvent.change(screen.getByTestId('input-fullName'), {
				target: { value: 'Complete Name' },
			});
			fireEvent.change(screen.getByTestId('input-cpf'), {
				target: { value: '123.456.789-00' },
			});
			fireEvent.change(screen.getByTestId('input-phone'), {
				target: { value: '(11) 98765-4321' },
			});
			fireEvent.change(screen.getByTestId('input-email'), {
				target: { value: 'valid@example.com' },
			});
			fireEvent.click(screen.getByTestId('checkbox'));
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId('button'));
		});
		expect(ProposalService).toHaveBeenCalled();

		expect(encryptValue).toHaveBeenCalledTimes(4);
		expect(window.open).toHaveBeenCalledWith(
			'https://checkout.petlove.com.br/cart',
			'_self',
		);

		expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
			'shopping_token',
			'cart123',
		);
		expect(mockSetUser).toHaveBeenCalled();
	});

	it('should test retry button in error dialog', async () => {
		let callCount = 0;
		(ProposalService as jest.Mock).mockImplementation(() => {
			callCount++;
			if (callCount === 1) {
				return Promise.reject(new Error('Failed to create proposal'));
			}
			return Promise.resolve({
				cartCommerceId: { cartId: 'cart123' },
				urlCartRedirect: 'https://checkout.petlove.com.br/cart',
			});
		});

		await act(async () => {
			render(<PersonalData />);
		});

		await act(async () => {
			fireEvent.change(screen.getByTestId('input-fullName'), {
				target: { value: 'Complete Name' },
			});
			fireEvent.change(screen.getByTestId('input-cpf'), {
				target: { value: '123.456.789-00' },
			});
			fireEvent.change(screen.getByTestId('input-phone'), {
				target: { value: '(11) 98765-4321' },
			});
			fireEvent.change(screen.getByTestId('input-email'), {
				target: { value: 'valid@example.com' },
			});
			fireEvent.click(screen.getByTestId('checkbox'));
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId('button'));
		});

		await waitFor(() => {
			expect(screen.getByTestId('dialog')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.getByTestId('dialog')).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByText('Tentar novamente'));
		});

		expect(ProposalService).toHaveBeenCalledTimes(2);

		expect(window.open).toHaveBeenCalledWith(
			'https://checkout.petlove.com.br/cart',
			'_self',
		);
	});

	it('should show error dialog when proposal request fails', async () => {
		(ProposalService as jest.Mock).mockRejectedValue(
			new Error('Failed to create proposal'),
		);

		await act(async () => {
			render(<PersonalData />);
		});

		await act(async () => {
			fireEvent.change(screen.getByTestId('input-fullName'), {
				target: { value: 'Complete Name' },
			});
			fireEvent.change(screen.getByTestId('input-cpf'), {
				target: { value: '123.456.789-00' },
			});
			fireEvent.change(screen.getByTestId('input-phone'), {
				target: { value: '(11) 98765-4321' },
			});
			fireEvent.change(screen.getByTestId('input-email'), {
				target: { value: 'valid@example.com' },
			});
			fireEvent.click(screen.getByTestId('checkbox'));
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId('button'));
		});
		await waitFor(() => {
			expect(screen.getByTestId('dialog')).toBeInTheDocument();
		});
	});

	it('should handle error when fetching public IP', async () => {
		(getPublicIP as jest.Mock).mockRejectedValue(new Error('Failed to get IP'));

		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

		await act(async () => {
			render(<PersonalData />);
		});

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(
				'handleFetchPublicIP: ',
				expect.any(Error),
			);
		});

		consoleSpy.mockRestore();
	});

	it('should handle error when setting cookies', async () => {
		(ProposalService as jest.Mock).mockResolvedValue({
			cartCommerceId: { cartId: 'cart123' },
			urlCartRedirect: 'https://checkout.petlove.com.br/cart',
		});

		const mockSetCookie = jest.fn().mockImplementation(() => {
			throw new Error('Cookie error');
		});
		jest.mock('react-cookie', () => ({
			useCookies: () => [{}, mockSetCookie, jest.fn()],
		}));

		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

		await act(async () => {
			render(<PersonalData />);
		});

		await act(async () => {
			fireEvent.change(screen.getByTestId('input-fullName'), {
				target: { value: 'Complete Name' },
			});
			fireEvent.change(screen.getByTestId('input-cpf'), {
				target: { value: '123.456.789-00' },
			});
			fireEvent.change(screen.getByTestId('input-phone'), {
				target: { value: '(11) 98765-4321' },
			});
			fireEvent.change(screen.getByTestId('input-email'), {
				target: { value: 'valid@example.com' },
			});
		});

		consoleSpy.mockRestore();
	});

	it('should disable the button when validations fail', async () => {
		DataQualityService.mockResolvedValue({
			isValid: false,
			message: 'Invalid data',
		});

		handleFieldsValidation.mockReturnValue({
			cpf: 'Invalid CPF',
			fullName: 'Invalid name',
		});

		await act(async () => {
			render(<PersonalData />);
		});

		expect(screen.getByTestId('button')).toBeDisabled();
	});
});
