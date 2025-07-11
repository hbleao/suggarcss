'use client';
/**
 * Exportação centralizada de todos os hooks disponíveis na biblioteca
 *
 * Esta biblioteca inclui hooks utilitários para facilitar o desenvolvimento
 * de interfaces React modernas e responsivas.
 */

// Hooks para responsividade
export { useMediaQuery } from './useMediaQuery';
export { useWindowSize } from './useWindownSize';

// Hooks para interação com elementos
export { useEventListener } from './useEventListener';
export { useLockScroll } from './useLockScroll';
export { useOutsideClick } from './useOutsideClick';
export { useToggle } from './useToggle';

// Hooks para performance
export { useDebouncedValue } from './useDebounce';

// Hooks para formulários
export { useForm } from './useForm';

// Hooks para operações assíncronas
export { useAsync } from './useAsync';
export { useCopyToClipboard } from './useCopyToClipboard';
export { useTryCatch } from './useTryCatch';

// Hooks para detecção de visibilidade
export { useIntersectionObserver } from './useIntersectionObserver';
export { useOnScreen } from './useOnScreen';

// Hooks para armazenamento
export { useCookie } from './useCookie';

// Hooks para rastreamento de valores
export { usePrevious } from './usePrevious';

// Hooks para tagueamento
export { useTracking } from './useTracking';
