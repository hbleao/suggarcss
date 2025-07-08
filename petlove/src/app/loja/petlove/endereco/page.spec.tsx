import { sanitize } from '@/utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ScreenAddress from './page';

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		prefetch: jest.fn(),
		refresh: jest.fn(),
	}),
}));

jest.mock('@/hooks/useTracking', () => ({
	useTracking: jest.fn(),
}));

const mockAddress = {
	cep: '01001-000',
	street: 'Praça da Sé',
	number: '',
	complement: '',
	city: 'São Paulo',
	state: 'SP',
	stateCode: 'SP',
	neighborhood: 'Sé',
	hasCoverage: true,
};

const mockSetAddress = jest.fn();

interface StoreState {
	data: { address: typeof mockAddress };
	setAddress: typeof mockSetAddress;
}

jest.mock('@/store', () => ({
	useAquisitionStore: (selector: (state: StoreState) => unknown) => {
		const state = {
			data: { address: mockAddress },
			setAddress: mockSetAddress,
		};
		return selector(state);
	},
}));

const makeSut = () => {
	return render(<ScreenAddress />);
};

describe('Address Page', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should correctly render the page', () => {
		makeSut();

		const titleElement = screen.getByText(
			'Cuidamos do seu pet onde ele estiver',
		);
		expect(titleElement).toBeInTheDocument();

		const subtitleElement = screen.getByText(
			'Agora, informe a região onde seu pet mora para encontrarmos o plano ideal.',
		);
		expect(subtitleElement).toBeInTheDocument();

		const cepInput = screen.getByLabelText('CEP');
		expect(cepInput).toBeInTheDocument();
		expect(cepInput).toBeDisabled();
		expect(cepInput).toHaveValue('01001-000');

		const streetInput = screen.getByLabelText('Rua, Avenida, alameda');
		expect(streetInput).toBeInTheDocument();
		expect(streetInput).toBeDisabled();
		expect(streetInput).toHaveValue('Praça da Sé');

		const numberInput = screen.getByLabelText('Número');
		expect(numberInput).toBeInTheDocument();

		const noNumberCheckbox = screen.getByText('Meu endereço não tem número');
		expect(noNumberCheckbox).toBeInTheDocument();

		const complementInput = screen.getByLabelText('Complemento');
		expect(complementInput).toBeInTheDocument();

		const cityInput = screen.getByLabelText('Cidade');
		expect(cityInput).toBeInTheDocument();
		expect(cityInput).toBeDisabled();
		expect(cityInput).toHaveValue('São Paulo');

		const stateInput = screen.getByLabelText('Estado');
		expect(stateInput).toBeInTheDocument();
		expect(stateInput).toBeDisabled();
		expect(stateInput).toHaveValue('SP');

		const continueButton = screen.getByText('Continuar');
		expect(continueButton).toBeInTheDocument();
		// Button should be disabled initially as number is empty
		expect(continueButton).toBeDisabled();
	});

	it('Should enable continue button when number is filled', () => {
		makeSut();

		const numberInput = screen.getByLabelText('Número');
		const continueButton = screen.getByText('Continuar');

		// Initially the button should be disabled
		expect(continueButton).toBeDisabled();

		// Fill in the number
		fireEvent.change(numberInput, { target: { value: '123' } });

		// Now the button should be enabled
		expect(continueButton).not.toBeDisabled();
	});

	it('Should disable number input when "no number" checkbox is checked', () => {
		makeSut();

		const numberInput = screen.getByLabelText('Número');
		const noNumberCheckbox = screen.getByRole('checkbox', {
			name: /Meu endereço não tem número/i,
		});

		// Initially the number input should be enabled
		expect(numberInput).not.toBeDisabled();

		// Check the "no number" checkbox
		fireEvent.click(noNumberCheckbox);

		// Now the number input should be disabled
		expect(numberInput).toBeDisabled();
		// And the value should be empty
		expect(numberInput).toHaveValue('');
	});

	it('Should enable continue button when "no number" checkbox is checked', () => {
		makeSut();

		const noNumberCheckbox = screen.getByRole('checkbox', {
			name: /Meu endereço não tem número/i,
		});
		const continueButton = screen.getByText('Continuar');

		// Initially the button should be disabled
		expect(continueButton).toBeDisabled();

		// Check the "no number" checkbox
		fireEvent.click(noNumberCheckbox);

		// Now the button should be enabled
		expect(continueButton).not.toBeDisabled();
	});

	it('Should sanitize number input to accept only numbers', () => {
		makeSut();

		const numberInput = screen.getByLabelText('Número');

		// Enter a value with non-numeric characters
		fireEvent.change(numberInput, { target: { value: '123abc' } });

		// The input should only contain the numeric part
		expect(numberInput).toHaveValue('123');
	});

	it('Should show error message when number exceeds maximum length', () => {
		makeSut();

		const numberInput = screen.getByLabelText('Número');

		// Enter a value that exceeds the maximum length (6 characters)
		fireEvent.change(numberInput, { target: { value: '1234567' } });

		// Error message should be displayed
		const errorMessage = screen.getByText('Limite de 6 caracteres atingido');
		expect(errorMessage).toBeInTheDocument();

		// Continue button should be disabled
		const continueButton = screen.getByText('Continuar');
		expect(continueButton).toBeDisabled();
	});

	it('Should allow filling the complement field', () => {
		makeSut();

		const complementInput = screen.getByLabelText('Complemento');

		// Enter a value in the complement field
		fireEvent.change(complementInput, { target: { value: 'Apto 123' } });

		// The input should contain the entered value
		expect(complementInput).toHaveValue('Apto 123');
	});

	it('Should navigate to plans page when continue button is clicked', () => {
		const mockRouter = jest.requireMock('next/navigation').useRouter();
		makeSut();

		const numberInput = screen.getByLabelText('Número');
		const continueButton = screen.getByText('Continuar');

		// Fill in the number to enable the button
		fireEvent.change(numberInput, { target: { value: '123' } });

		// Click the continue button
		fireEvent.click(continueButton);

		// Should navigate to the plans page
		expect(mockRouter.push).toHaveBeenCalledWith('/loja/petlove/planos');

		// Should update the address in the store
		expect(mockSetAddress).toHaveBeenCalledWith({
			...mockAddress,
			number: '123',
			complement: '',
		});
	});

	it('Should navigate to plans page when continue button is clicked with "no number" checked', () => {
		const mockRouter = jest.requireMock('next/navigation').useRouter();
		makeSut();

		const noNumberCheckbox = screen.getByRole('checkbox', {
			name: /Meu endereço não tem número/i,
		});
		const continueButton = screen.getByText('Continuar');

		// Check the "no number" checkbox
		fireEvent.click(noNumberCheckbox);

		// Click the continue button
		fireEvent.click(continueButton);

		// Should navigate to the plans page
		expect(mockRouter.push).toHaveBeenCalledWith('/loja/petlove/planos');

		// Should update the address in the store with empty number
		expect(mockSetAddress).toHaveBeenCalledWith({
			...mockAddress,
			number: '',
			complement: '',
		});
	});

	it('Should navigate to plans page with complement when filled', () => {
		const mockRouter = jest.requireMock('next/navigation').useRouter();
		makeSut();

		const numberInput = screen.getByLabelText('Número');
		const complementInput = screen.getByLabelText('Complemento');
		const continueButton = screen.getByText('Continuar');

		// Fill in the number and complement
		fireEvent.change(numberInput, { target: { value: '123' } });
		fireEvent.change(complementInput, { target: { value: 'Apto 456' } });

		// Click the continue button
		fireEvent.click(continueButton);

		// Should navigate to the plans page
		expect(mockRouter.push).toHaveBeenCalledWith('/loja/petlove/planos');

		// Should update the address in the store with both number and complement
		expect(mockSetAddress).toHaveBeenCalledWith({
			...mockAddress,
			number: '123',
			complement: 'Apto 456',
		});
	});
});
