import { setupServer } from 'msw/node';
import { cepHandlers } from './handlers';

export const server = setupServer(...cepHandlers);
