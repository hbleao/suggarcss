import { PlansService } from '.';
import { api } from '@/lib';
import { AuthorizationService } from '../authorizationService';

// Mock dependencies
jest.mock('@/lib', () => ({
	api: {
		post: jest.fn(),
	},
}));

jest.mock('../authorizationService', () => ({
	AuthorizationService: jest.fn(),
}));

jest.mock('next-runtime-env', () => ({
	env: jest.fn((key: string) => {
		const envValues: Record<string, string> = {
			NEXT_PUBLIC_SENSEDIA_CLOUD_URL: 'https://api.example.com',
			NEXT_PUBLIC_ACQUISITION_SERVICE_PATH: '/acquisition',
			NEXT_PUBLIC_CEP_SERVICE_PATH: '/cep',
			NEXT_PUBLIC_ASSISTANT_SERVICE_PATH: '/assistant'
		};
		return envValues[key] || '';
	})
}));

describe('PlansService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(AuthorizationService as jest.Mock).mockResolvedValue({
			access_token: 'fake-token',
		});
	});

	it('should return plan data when the request is successful', async () => {
		const mockData = { ibgeCode: '3550308' };
		const mockResponse = {
			status: 200,
			data: {
				plans: [
					{
						id: 'plan-1',
						name: 'Plano Básico',
						price: 49.9,
					},
					{
						id: 'plan-2',
						name: 'Plano Premium',
						price: 99.9,
					},
				],
			},
		};

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		const result = await PlansService(mockData);

		expect(api.post).toHaveBeenCalledWith(
			'https://api.example.com//acquisition/petlove/planos',
			mockData,
			{
				headers: {
					Authorization: 'Bearer fake-token',
					'Content-Type': 'application/json',
				},
			},
		);

		expect(result).toEqual(mockResponse.data);
	});

	it('should throw an error when the response status is not 200', async () => {
		const mockData = { ibgeCode: '3550308' };
		const mockResponse = {
			status: 400,
			data: {
				error: 'Bad Request',
			},
		};

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		try {
			await PlansService(mockData);
			fail('Expected PlansService to throw an error but it did not');
		} catch (error) {
			expect(error).toBeDefined();
			expect(error).toHaveProperty('backendErrorMessage');
		}
	});

	it('should throw an error when the response does not contain data', async () => {
		const mockData = { ibgeCode: '3550308' };
		const mockResponse = {
			status: 200,
			data: null,
		};

		(api.post as jest.Mock).mockResolvedValue(mockResponse);

		try {
			await PlansService(mockData);
			fail('Expected PlansService to throw an error but it did not');
		} catch (error) {
			expect(error).toBeDefined();
			expect(error).toHaveProperty('backendErrorMessage');
			interface ServiceError {
				backendErrorMessage: string;
			}
			expect((error as ServiceError).backendErrorMessage).toBeDefined();
		}
	});

	it('should throw an error with detailed information when a request error occurs', async () => {
		const mockData = { ibgeCode: '3550308' };
		const mockError = {
			status: 500,
			config: {
				url: 'https://api.example.com/acquisition/petlove/planos',
			},
			message: 'Internal Server Error',
		};

		(api.post as jest.Mock).mockRejectedValue(mockError);

		try {
			await PlansService(mockData);
			fail('Expected PlansService to throw an error but it did not');
		} catch (error) {
			expect(error).toBeDefined();
			expect(error).toHaveProperty(
				'endpoint',
				'https://api.example.com/acquisition/petlove/planos',
			);
			expect(error).toHaveProperty('status', 500);
			expect(error).toHaveProperty(
				'backendErrorMessage',
				'Internal Server Error',
			);
		}
	});

	it('should handle network errors gracefully', async () => {
		const mockData = { ibgeCode: '3550308' };
		const networkError = new Error('Network Error');

		(api.post as jest.Mock).mockRejectedValue(networkError);

		try {
			await PlansService(mockData);
			fail('Expected PlansService to throw an error but it did not');
		} catch (error) {
			expect(error).toBeDefined();
			expect(error).toHaveProperty('backendErrorMessage', 'Network Error');
		}
	});
});
