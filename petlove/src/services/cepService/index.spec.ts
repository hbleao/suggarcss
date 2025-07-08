import { CepService } from '.';

import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

jest.mock('../authorizationService');
jest.mock('@/lib', () => ({
	api: {
		get: jest.fn(),
		post: jest.fn(),
	},
}));

// Mock for next-runtime-env
jest.mock('next-runtime-env', () => ({
	env: jest.fn((key: string) => {
		const envValues: Record<string, string> = {
			NEXT_PUBLIC_SENSEDIA_CLOUD_URL: 'https://api.example.com',
			NEXT_PUBLIC_CEP_SERVICE_PATH: '/cep',
			NEXT_PUBLIC_ASSISTANT_SERVICE_PATH: '/assistant',
			NEXT_PUBLIC_ACQUISITION_SERVICE_PATH: '/acquisition',
		};
		return envValues[key] || '';
	}),
}));

class MockAbortController {
	signal = { aborted: false };
	abort = jest.fn();
}

global.AbortController =
	MockAbortController as unknown as typeof AbortController;

describe('CepService', () => {
	const mockCep = '01204-000';

	beforeEach(() => {
		jest.clearAllMocks();
		(AuthorizationService as jest.Mock).mockResolvedValue({
			access_token: 'fake-token',
		});
	});

	it('should return correctly formatted data when API responds successfully', async () => {
		(api.get as jest.Mock).mockResolvedValueOnce({
			data: {
				localidade: 'São Paulo',
				estado: 'São Paulo',
				bairro: 'Campos Elíseos',
				logradouro: 'R Guaianases',
				uf: 'SP',
			},
			status: 200,
		});

		(api.post as jest.Mock).mockResolvedValueOnce({
			data: {
				coverage: true,
				ibge: '3550308',
			},
			status: 200,
		});

		const result = await CepService(mockCep);

		expect(result).toEqual({
			cep: mockCep,
			address: `${mockCep} - São Paulo/São Paulo`,
			neighborhood: 'Campos Elíseos',
			city: 'São Paulo',
			state: 'São Paulo',
			street: 'R Guaianases',
			stateCode: 'SP',
			hasCoverage: true,
			ibgeCode: '3550308',
		});
	});

	it('should throw an error when CEP API request fails', async () => {
		const mockError = {
			status: 404,
			code: 'NOT_FOUND',
			config: { url: 'https://api.example.com/assistant/guia-postal/cep' },
			message: 'CEP not found',
		};

		(api.get as jest.Mock).mockRejectedValueOnce(mockError);

		try {
			await CepService(mockCep);
			fail('Expected CepService to throw an error');
		} catch (err) {
			const error = err as {
				message: string;
				endpoint?: string;
				backendErrorMessage?: string;
			};
			expect(error).toBeDefined();
			expect(error.message).toBe(
				'Something went wrong. Please try again later.',
			);
			expect(error.endpoint).toBe(
				'https://api.example.com/assistant/guia-postal/cep',
			);
		}
	});

	it('should throw an error when coverage API request fails', async () => {
		(api.get as jest.Mock).mockResolvedValueOnce({
			data: {
				localidade: 'São Paulo',
				estado: 'São Paulo',
				bairro: 'Campos Elíseos',
				logradouro: 'R Guaianases',
				uf: 'SP',
			},
			status: 200,
		});

		const mockError = {
			status: 500,
			code: 'SERVER_ERROR',
			config: { url: 'https://api.example.com/acquisition/petlove/cobertura' },
			message: 'Internal server error',
		};
		(api.post as jest.Mock).mockRejectedValueOnce(mockError);

		try {
			await CepService(mockCep);
			fail('Expected CepService to throw an error');
		} catch (err) {
			const error = err as {
				message: string;
				endpoint?: string;
				backendErrorMessage?: string;
			};
			expect(error).toBeDefined();
			expect(error.message).toBe(
				'Something went wrong. Please try again later.',
			);
			expect(error.endpoint).toBe(
				'https://api.example.com/acquisition/petlove/cobertura',
			);
		}
	});

	it('should throw an error when CEP API response is incomplete', async () => {
		const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

		(api.get as jest.Mock).mockResolvedValueOnce({
			data: {
				bairro: 'Campos Elíseos',
				logradouro: 'R Guaianases',
				uf: 'SP',
			},
			status: 200,
		});

		try {
			await CepService(mockCep);
			fail('Expected CepService to throw an error');
		} catch (err) {
			const error = err as { message: string };
			expect(error).toBeDefined();
			expect(error.message).toBe(
				'Something went wrong. Please try again later.',
			);
		}

		expect(warnSpy).toHaveBeenCalledWith(
			'Incomplete response from ZIP code API:',
			expect.any(Object),
		);

		warnSpy.mockRestore();
	});

	it('should abort previous requests when called multiple times', async () => {
		const abortSpy = jest.fn();

		const originalAbortController = global.AbortController;
		global.AbortController = class MockAbortController {
			signal = { aborted: false };
			abort = abortSpy;
		} as unknown as typeof AbortController;

		try {
			(api.get as jest.Mock).mockResolvedValueOnce({
				data: {
					localidade: 'São Paulo',
					estado: 'São Paulo',
					bairro: 'Centro',
					logradouro: 'Av Paulista',
					uf: 'SP',
				},
				status: 200,
			});
			(api.post as jest.Mock).mockResolvedValueOnce({
				data: { coverage: true, ibge: '3550308' },
				status: 200,
			});

			const firstCall = CepService('01310-000');

			(api.get as jest.Mock).mockResolvedValueOnce({
				data: {
					localidade: 'Rio de Janeiro',
					estado: 'Rio de Janeiro',
					bairro: 'Copacabana',
					logradouro: 'Av Atlântica',
					uf: 'RJ',
				},
				status: 200,
			});
			(api.post as jest.Mock).mockResolvedValueOnce({
				data: { coverage: true, ibge: '3304557' },
				status: 200,
			});

			const result = await CepService('22070-000');

			expect(result.city).toBe('Rio de Janeiro');
			expect(result.neighborhood).toBe('Copacabana');

			expect(abortSpy).toHaveBeenCalled();
		} finally {
			global.AbortController = originalAbortController;
		}
	});
});
