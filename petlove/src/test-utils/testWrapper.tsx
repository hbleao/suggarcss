// Importar os mocks do Next.js
import './nextJsMocks';

interface TestWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper para testes que fornece os contextos necessários para os componentes Next.js
 */
export const TestWrapper = ({ children }: TestWrapperProps) => {
  // Criamos um wrapper simples que apenas renderiza os filhos
  // Os mocks do Next.js são aplicados globalmente via jest.mock
  return <>{children}</>;
};
