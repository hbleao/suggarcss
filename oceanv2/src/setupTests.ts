import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Estende os matchers do Vitest com os matchers do Testing Library
expect.extend(matchers);
