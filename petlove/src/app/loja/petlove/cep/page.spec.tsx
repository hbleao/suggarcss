import {
	render,
	screen,
	fireEvent,
	cleanup,
	waitFor,
} from '@testing-library/react';
import Cep from './page';
import { useTracking, useDebouncedValue } from '@/hooks';
import {
	HeaderAcquisitionFlow,
	ProgressBar,
	Input,
	Button,
	Typography,
} from '@/components';
import {
	CepService,
	fetchPostalGuideStateService,
	PostalCepService,
} from '@/services';
import { useAquisitionStore } from '@/store';
import { cepMask } from '@/utils';
import {
	pushCoverageCepToDataLayer,
	pushCoveragePostalGuideToDataLayer,
	pushErrorCoverageCepToDataLayer,
	pushErrorCoveragePostalGuideToDataLayer,
} from './dataLayer';
import { ModalWithoutCep } from './ModalWithoutCep';
import { NotificationCep } from './NotificationCep';
import React from 'react';

// Type definitions for mocks to avoid TypeScript errors
type MockProps = Record<string, unknown>;
type MockCall = [props: MockProps, context?: unknown];
type MockCalls = MockCall[];

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush }),
}));

// Mock hooks
jest.mock('@/hooks', () => ({
	useTracking: jest.fn(),
	useDebouncedValue: jest.fn((value) => value),
}));

// Mock services
jest.mock('@/services', () => ({
	CepService: jest.fn(),
	fetchPostalGuideStateService: jest.fn(),
	PostalCepService: jest.fn(),
}));

// Mock store
jest.mock('@/store', () => ({
	useAquisitionStore: jest.fn(),
}));

// Mock dataLayer functions
jest.mock('./dataLayer', () => ({
	pushCoverageCepToDataLayer: jest.fn(),
	pushCoveragePostalGuideToDataLayer: jest.fn(),
	pushErrorCoverageCepToDataLayer: jest.fn(),
	pushErrorCoveragePostalGuideToDataLayer: jest.fn(),
}));

// Mock components
const mockHeaderComponent = jest.fn(() => (
	<div data-testid="header-acquisition-flow" />
));
const mockProgressBarComponent = jest.fn(() => (
	<div data-testid="progress-bar" />
));
const mockInputComponent = jest.fn(
	({
		label,
		name,
		onChange,
		value,
		errorMessage,
		disabled,
		autoFocus,
		isLoading,
		success,
		width,
	}) => (
		<div data-testid={`input-${name}`}>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				value={value}
				disabled={disabled}
				onChange={onChange}
				data-testid={`input-field-${name}`}
			/>
			{errorMessage && (
				<span data-testid={`error-${name}`}>{errorMessage}</span>
			)}
			{isLoading && <span data-testid="loading-indicator">Loading...</span>}
			{success && <span data-testid="success-indicator">Success</span>}
		</div>
	),
);
const mockButtonComponent = jest.fn(({ children, disabled, onClick }) => (
	<button
		type="button"
		data-testid="continue-button"
		disabled={disabled}
		onClick={onClick}
		onKeyDown={onClick}
	>
		{children}
	</button>
));
const mockTypographyComponent = jest.fn(
	({ children, variant, onClick, className, color }) => (
		<div
			data-testid={`typography-${variant || 'default'}`}
			className={className}
			onClick={onClick}
			onKeyDown={onClick}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}
		>
			{children}
		</div>
	),
);
const mockModalWithoutCepComponent = jest.fn(() => (
	<div data-testid="modal-without-cep" />
));
const mockNotificationCepComponent = jest.fn(() => (
	<div data-testid="notification-cep" />
));

jest.mock('@/components', () => ({
	HeaderAcquisitionFlow: mockHeaderComponent,
	ProgressBar: mockProgressBarComponent,
	Input: mockInputComponent,
	Button: mockButtonComponent,
	Typography: mockTypographyComponent,
}));

jest.mock('./ModalWithoutCep', () => ({
	ModalWithoutCep: mockModalWithoutCepComponent,
}));

jest.mock('./NotificationCep', () => ({
	NotificationCep: mockNotificationCepComponent,
}));

jest.mock('@/utils', () => ({
	cepMask: jest.fn((value) => value),
}));

// Helper function to safely get props from mock calls
const getProps = (mockFn: jest.Mock, callIndex = 0): MockProps => {
	if (mockFn.mock.calls.length <= callIndex) return {};
	return mockFn.mock.calls[callIndex][0] || {};
};

describe('Cep Page', () => {
	const mockSetAddress = jest.fn();
	const mockUseAquisitionStore = {
		data: {
			address: {
				cep: '',
				state: '',
				city: '',
				street: '',
				neighborhood: '',
				stateCode: '',
				ibgeCode: '',
				number: '',
				complement: '',
			},
		},
		setAddress: mockSetAddress,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useAquisitionStore as jest.Mock).mockReturnValue(mockUseAquisitionStore);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	afterEach(() => {
		cleanup();
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render correctly', () => {
		render(<Cep />);

		// Check if the tracking hook is called
		expect(useTracking).toHaveBeenCalledTimes(1);

		// Check if the components are rendered
		expect(mockHeaderComponent).toHaveBeenCalledTimes(1);
		expect(mockProgressBarComponent).toHaveBeenCalledTimes(1);
		expect(mockInputComponent).toHaveBeenCalled();
		expect(mockButtonComponent).toHaveBeenCalled();
		expect(mockTypographyComponent).toHaveBeenCalled();
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render HeaderAcquisitionFlow with correct props', () => {
		render(<Cep />);

		expect(mockHeaderComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				goBackLink: '/loja/petlove/dados-do-pet',
				hasShoppingCart: false,
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render ProgressBar with correct props', () => {
		render(<Cep />);

		expect(mockProgressBarComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				initialValue: 20,
				value: 40,
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render Input with correct props', () => {
		render(<Cep />);

		expect(mockInputComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				label: 'CEP',
				name: 'cep',
				width: 'fluid',
				autoFocus: true,
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render Button with correct props', () => {
		render(<Cep />);

		expect(mockButtonComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'continuar',
				variant: 'insurance',
				styles: 'primary',
				width: 'fluid',
				disabled: true,
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render Typography components with correct props', () => {
		render(<Cep />);

		expect(mockTypographyComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				id: 'gtm-title',
				variant: 'title4',
				weight: 'bold',
				className: 'cep__title',
				children: 'Cuidamos do seu pet onde ele estiver',
			}),
			expect.anything(),
		);

		expect(mockTypographyComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				variant: 'body1',
				color: 'neutral-700',
				className: 'cep__subtitle',
				children:
					'Agora, informe a região onde seu pet mora para encontrarmos o plano ideal.',
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render NotificationCep when showNotification is true', () => {
		const mockStateWithNotification = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};

		// Mock the reducer state
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '01001-000', isFetchingCep: false },
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
				},
				postalGuide: { selectedState: '', selectedCity: '', addressInput: '' },
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		(useAquisitionStore as jest.Mock).mockReturnValue(
			mockStateWithNotification,
		);

		render(<Cep />);

		expect(mockNotificationCepComponent).toHaveBeenCalledWith(
			expect.objectContaining({
				error: false,
				coverage: true,
				cep: '01001-000',
				street: 'Praça da Sé',
				stateCode: 'SP',
				neighborhood: 'Sé',
			}),
			expect.anything(),
		);
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should render the component structure correctly', () => {
		// Mock state
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: { hasCoverage: false },
				postalGuide: {},
			},
			jest.fn(),
		]);

		const { container } = render(<Cep />);

		const children = container.firstChild?.childNodes;
		expect(children).toBeDefined();

		if (children) {
			expect(children[0]).toHaveAttribute(
				'data-testid',
				'header-acquisition-flow',
			);

			expect(children[1]).toHaveAttribute('data-testid', 'progress-bar');

			expect(children[2]).toHaveClass('page__cep');
		}
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});

	it('should match snapshot', () => {
		// Mock state
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: { hasCoverage: false },
				postalGuide: {},
			},
			jest.fn(),
		]);

		const { container } = render(<Cep />);
		expect(container).toMatchSnapshot();
	});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});
});

	it('should call handleNextScreen when continue button is clicked', () => {
		// Mock state with valid notification data
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					isFetchingCep: false,
				},
				notification: {
					hasCoverage: true,
					cep: '01001-000',
					street: 'Praça da Sé',
					state: 'SP',
					stateCode: 'SP',
					address: 'Praça da Sé',
					neighborhood: 'Sé',
					ibgeCode: '3550308',
				},
				postalGuide: {},
			},
			jest.fn(),
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const buttonProps = getProps(mockButtonComponent);

		if (buttonProps.onClick) {
			buttonProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith('/loja/petlove/endereco');

		expect(mockSetAddress).toHaveBeenCalledWith(
			expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				stateCode: 'SP',
				ibgeCode: '3550308',
				number: '',
				complement: '',
			}),
		);
	});

	it('should handle "Não sei o CEP" click correctly', () => {
		// Mock state
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const typographyCalls = mockTypographyComponent.mock.calls;
		const naoSeiCepProps = typographyCalls.find(
			(call) => call[0].children === 'Não sei o CEP',
		)?.[0];

		if (naoSeiCepProps?.onClick) {
			naoSeiCepProps.onClick({ preventDefault: () => {} } as React.MouseEvent);
		}

		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?modal=modal-nao-sei-o-cep'),
			expect.objectContaining({ scroll: false }),
		);

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'cleanSearchFields' });
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearNotification' });
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchErrors',
			fieldName: 'cep',
			payload: '',
		});
		expect(mockDispatch).toHaveBeenCalledWith({ type: 'clearPostalGuide' });
	});

	it('should handle modal close correctly', () => {
		const mockParams = {
			set: jest.fn(),
			delete: jest.fn(),
			toString: jest.fn().mockReturnValue('modal=modal-nao-sei-o-cep'),
		};
		(window as Window & typeof globalThis).URLSearchParams = jest
			.fn()
			.mockImplementation(() => mockParams);

		// Mock window.location
		const originalLocation = window.location;
		const mockLocation = {
			...originalLocation,
			search: '?modal=modal-nao-sei-o-cep',
		};
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			writable: true,
		});

		// Mock state
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				jest.fn(),
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const modalProps = getProps(mockModalWithoutCepComponent);

		if (modalProps.handleCloseModal) {
			modalProps.handleCloseModal();
		}

		expect(mockParams.delete).toHaveBeenCalledWith('modal');
		expect(mockPush).toHaveBeenCalledWith(
			expect.stringContaining('?'),
			expect.objectContaining({ scroll: false }),
		);

		Object.defineProperty(window, 'location', {
			value: originalLocation,
			writable: true,
		});
	});

	it('should fetch CEP data when cep input changes', async () => {
		const mockCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(CepService as jest.Mock).mockResolvedValue(mockCepResponse);

		// Mock state and dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: {},
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		const inputProps = getProps(mockInputComponent);

		if (inputProps.onChange) {
			inputProps.onChange({
				target: { value: '01001-000' },
			} as React.ChangeEvent<HTMLInputElement>);
		}

		expect(cepMask).toHaveBeenCalledWith('01001-000');

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setSearchField',
			fieldName: 'cep',
			payload: expect.any(String),
		});
	});

	it('should handle initial data from session storage', () => {
		// Mock session storage data
		const mockStorageData = {
			data: {
				address: {
					cep: '01001-000',
					state: 'SP',
					city: 'São Paulo',
					street: 'Praça da Sé',
					neighborhood: 'Sé',
					stateCode: 'SP',
					ibgeCode: '3550308',
				},
			},
			setAddress: mockSetAddress,
		};
		(useAquisitionStore as jest.Mock).mockReturnValue(mockStorageData);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest
			.spyOn(React, 'useReducer')
			.mockImplementation(() => [
				{ search: {}, notification: {}, postalGuide: {} },
				mockDispatch,
			] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Verify dispatch was called with session storage data
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'setAllSearchFields',
			payload: expect.objectContaining({
				cep: '01001-000',
				state: 'SP',
				city: 'São Paulo',
			}),
		});
	});

	it('should test fetching postal guide state service', async () => {
		// Mock service response
		const mockCities = ['São Paulo', 'Campinas', 'Santos'];
		(fetchPostalGuideStateService as jest.Mock).mockResolvedValue(mockCities);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the fetchPostalGuideStateService was called with the correct parameters
		expect(fetchPostalGuideStateService as jest.Mock).toHaveBeenCalledWith('SP');
	});

	it('should test postal cep service', async () => {
		// Mock service response
		const mockPostalCepResponse = {
			cep: '01001-000',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Sé',
			street: 'Praça da Sé',
			stateCode: 'SP',
			ibgeCode: '3550308',
		};
		(PostalCepService as jest.Mock).mockResolvedValue(mockPostalCepResponse);

		// Mock dispatch
		const mockDispatch = jest.fn();
		jest.spyOn(React, 'useReducer').mockImplementation(() => [
			{
				search: { cep: '', isFetchingCep: false },
				notification: {},
				postalGuide: { selectedState: 'SP', selectedCity: 'São Paulo' },
			},
			mockDispatch,
		] as [any, React.Dispatch<any>]);

		render(<Cep />);

		// Test if the PostalCepService was called with the correct parameters
		expect(PostalCepService as jest.Mock).toHaveBeenCalledWith('São Paulo', 'SP');
	});
