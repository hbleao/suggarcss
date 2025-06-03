import '@testing-library/jest-dom';
import type { ReactNode } from 'react';

// Configurações globais para os testes
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para o matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para o next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props: Record<string, unknown>) {
    return Object.assign(document.createElement('img'), props);
  },
}));

// Mock para o next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link(
    props: { children: ReactNode; href: string } & Record<string, unknown>
  ) {
    const { children, href, ...rest } = props;
    const anchor = Object.assign(document.createElement('a'), { href, ...rest });
    if (children) {
      anchor.textContent = String(children);
    }
    return anchor;
  },
}));

// Mock para o next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    toString: jest.fn(),
  })),
}));

// Mock para módulos CSS
jest.mock('identity-obj-proxy', () => ({}), { virtual: true });

// Mock para sanitize-html
jest.mock('sanitize-html', () => (html: string) => html);
