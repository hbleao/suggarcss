import { cepMask } from '@/utils';
import { faker } from '@faker-js/faker';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cep from './page';

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		prefetch: jest.fn(),
		refresh: jest.fn(),
	}),
	useSearchParams: () => ({
		get: jest.fn(),
	}),
}));

jest.mock('@/hooks', () => ({
	__esModule: true,
	useDebouncedValue: jest.fn((val) => val),
	useTracking: jest.fn(),
}));

const makeSut = () => {
	return render(<Cep />);
};

describe('CEP Page', () => {
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

		const inputCepElement = screen.getByLabelText('CEP');
		expect(inputCepElement).toBeInTheDocument();

		const linkElement = screen.getByText('Não sei o CEP');
		expect(linkElement).toBeInTheDocument();

		const buttonElement = screen.getByText('Continuar');
		expect(buttonElement).toBeInTheDocument();
	});

	it('Should be able to format the CEP value', async () => {
		makeSut();
		const cep = faker.number.int({ min: 10000000, max: 11000000 });

		const inputCepElement = screen.getByLabelText('CEP');
		fireEvent.change(inputCepElement, { target: { value: cep } });

		const filledInputCepElement = screen.getByLabelText(
			'CEP',
		) as HTMLInputElement;
		expect(filledInputCepElement.value).toEqual(cepMask(String(cep)));
	});

	it('Should be able to search for a valid CEP with coverage', async () => {
		const mockRouter = jest.requireMock('next/navigation').useRouter();
		makeSut();

		const cep = faker.number.int({ min: 10000000, max: 11000000 });

		const inputCepElement = screen.getByLabelText('CEP');
		fireEvent.change(inputCepElement, { target: { value: cep } });

		const loaderElement = await screen.findByTestId('loaderButton');
		expect(loaderElement).toBeInTheDocument();

		await waitFor(() => {
			expect(loaderElement).not.toBeInTheDocument();
		});

		const notificationElement = screen.getByText(/\d{5}-\d{3}/); // CEP format
		expect(notificationElement).toBeInTheDocument();

		const buttonElement = screen.getByText('Continuar');
		expect(buttonElement).not.toBeDisabled();
		fireEvent.click(buttonElement);
		expect(mockRouter.push).toHaveBeenCalledWith('/loja/petlove/endereco');
	});

	it('Should be able to search for a valid CEP without coverage', async () => {
		const mockCepService = jest.fn().mockResolvedValue({
			cep: '12345-678',
			state: 'SP',
			city: 'São Paulo',
			street: 'Rua Teste',
			neighborhood: 'Bairro Teste',
			stateCode: 'SP',
			hasCoverage: false,
		});
		jest.mock('@/services', () => ({
			...jest.requireActual('@/services'),
			CepService: () => mockCepService(),
		}));

		makeSut();

		const cep = '12345678';
		const inputCepElement = screen.getByLabelText('CEP');
		fireEvent.change(inputCepElement, { target: { value: cep } });

		const loaderElement = await screen.findByTestId('loaderButton');
		await waitFor(() => {
			expect(loaderElement).not.toBeInTheDocument();
		});

		const notificationTitle = screen.getByText(
			'Ainda não chegamos na sua região',
		);
		expect(notificationTitle).toBeInTheDocument();

		const buttonElement = screen.getByText('Continuar');
		expect(buttonElement).toBeDisabled();
	});
	it('Should be able to search for an invalid CEP', async () => {
		const mockCepService = jest
			.fn()
			.mockRejectedValue(new Error('Invalid CEP'));
		jest.mock('@/services', () => ({
			...jest.requireActual('@/services'),
			CepService: () => mockCepService(),
		}));

		makeSut();

		const invalidCep = '00000000';
		const inputCepElement = screen.getByLabelText('CEP');
		fireEvent.change(inputCepElement, { target: { value: invalidCep } });

		const loaderElement = await screen.findByTestId('loaderButton');
		await waitFor(() => {
			expect(loaderElement).not.toBeInTheDocument();
		});

		const errorMessage = screen.getByText(
			'Algo deu errado. Tente novamente mais tarde.',
		);
		expect(errorMessage).toBeInTheDocument();
		const buttonElement = screen.getByText('Continuar');
		expect(buttonElement).toBeDisabled();
	});

	it('Should open the postal guide modal when clicking the "Não sei o CEP" link', () => {
		const mockRouter = jest.requireMock('next/navigation').useRouter();
		makeSut();

		const linkElement = screen.getByText('Não sei o CEP');
		fireEvent.click(linkElement);

		expect(mockRouter.push).toHaveBeenCalledWith('?modal=modal-nao-sei-o-cep', {
			scroll: false,
		});
	});
	it('Should be able to search for states', async () => {
		const mockSearchParams = jest.fn().mockReturnValue({
			get: jest.fn().mockReturnValue('modal-nao-sei-o-cep'),
		});
		jest.mock('next/navigation', () => ({
			...jest.requireActual('next/navigation'),
			useSearchParams: () => mockSearchParams(),
		}));

		makeSut();

		const modalTitle = screen.getByText('Pesquisa de CEP');
		expect(modalTitle).toBeInTheDocument();

		const stateSelect = screen.getByLabelText('Estado');
		expect(stateSelect).toBeInTheDocument();

		fireEvent.change(stateSelect, { target: { value: 'São Paulo' } });
		expect(stateSelect).toHaveValue('São Paulo');
	});
	it('Should be able to search for cities based on the selected state', async () => {
		const mockSearchParams = jest.fn().mockReturnValue({
			get: jest.fn().mockReturnValue('modal-nao-sei-o-cep'),
		});
		const mockFetchPostalGuideStateService = jest
			.fn()
			.mockResolvedValue(['São Paulo', 'Campinas', 'Santos']);
		jest.mock('next/navigation', () => ({
			...jest.requireActual('next/navigation'),
			useSearchParams: () => mockSearchParams(),
		}));
		jest.mock('@/services', () => ({
			...jest.requireActual('@/services'),
			fetchPostalGuideStateService: () => mockFetchPostalGuideStateService(),
		}));

		makeSut();

		const stateSelect = screen.getByLabelText('Estado');
		fireEvent.change(stateSelect, { target: { value: 'São Paulo' } });

		await waitFor(() => {
			const citySelect = screen.getByLabelText('Cidade');
			expect(citySelect).not.toBeDisabled();
		});

		const citySelect = screen.getByLabelText('Cidade');
		fireEvent.change(citySelect, { target: { value: 'São Paulo' } });
		expect(citySelect).toHaveValue('São Paulo');
	});
	it('Should be able to search for a valid address after selecting city and state', async () => {
		const mockSearchParams = jest.fn().mockReturnValue({
			get: jest.fn().mockReturnValue('modal-nao-sei-o-cep'),
		});
		const mockPostalCepService = jest.fn().mockResolvedValue({
			logradouros: [
				{
					cep: '01234-567',
					logradouro: 'Avenida Paulista',
					bairro: 'Bela Vista',
					cidade: 'São Paulo',
					uf: 'SP',
				},
			],
		});
		jest.mock('next/navigation', () => ({
			...jest.requireActual('next/navigation'),
			useSearchParams: () => mockSearchParams(),
		}));
		jest.mock('@/services', () => ({
			...jest.requireActual('@/services'),
			PostalCepService: () => mockPostalCepService(),
		}));

		makeSut();

		const stateSelect = screen.getByLabelText('Estado');
		fireEvent.change(stateSelect, { target: { value: 'São Paulo' } });

		const citySelect = screen.getByLabelText('Cidade');
		fireEvent.change(citySelect, { target: { value: 'São Paulo' } });

		const streetInput = screen.getByLabelText('Logradouro');
		fireEvent.change(streetInput, { target: { value: 'Avenida Paulista' } });

		await waitFor(() => {
			const addressItem = screen.getByText('Avenida Paulista');
			expect(addressItem).toBeInTheDocument();
		});

		const addressItem = screen.getByText('Avenida Paulista');
		fireEvent.click(addressItem);

		const selectButton = screen.getByText('Selecionar CEP');
		expect(selectButton).not.toBeDisabled();
	});
	it('Should be able to search for an invalid address after selecting city and state', async () => {
		const mockSearchParams = jest.fn().mockReturnValue({
			get: jest.fn().mockReturnValue('modal-nao-sei-o-cep'),
		});
		const mockPostalCepService = jest
			.fn()
			.mockRejectedValue(new Error('Digite um logradouro válido'));
		jest.mock('next/navigation', () => ({
			...jest.requireActual('next/navigation'),
			useSearchParams: () => mockSearchParams(),
		}));
		jest.mock('@/services', () => ({
			...jest.requireActual('@/services'),
			PostalCepService: () => mockPostalCepService(),
		}));

		makeSut();

		const stateSelect = screen.getByLabelText('Estado');
		fireEvent.change(stateSelect, { target: { value: 'São Paulo' } });

		const citySelect = screen.getByLabelText('Cidade');
		fireEvent.change(citySelect, { target: { value: 'São Paulo' } });

		const streetInput = screen.getByLabelText('Logradouro');
		fireEvent.change(streetInput, { target: { value: 'Rua Inexistente XYZ' } });

		await waitFor(() => {
			const errorMessage = screen.getByText('error');
			expect(errorMessage).toBeInTheDocument();
		});
		const selectButton = screen.getByText('Selecionar CEP');
		expect(selectButton).toBeDisabled();
	});
});
