import React from 'react';
import { render } from '@testing-library/react';

// Mock para o componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
      return <img src={src} alt={alt || 'Image'} {...props} />;
    }
  };
});

// Mock para o contexto do Next.js
const AppRouterContext = React.createContext({
  push: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => {},
  replace: () => {},
});

// Wrapper para testes que fornece os contextos necessários
export const renderWithProviders = (ui: React.ReactElement) => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  };

  return render(
    <AppRouterContext.Provider value={mockRouter}>
      {ui}
    </AppRouterContext.Provider>
  );
};

// Mock para o useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
