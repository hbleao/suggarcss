'use client';
import type React from 'react';
import { CookiesProvider } from 'react-cookie';

type RootProviderProps = {
  children: React.ReactNode;
};

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <CookiesProvider>
      {children}
    </CookiesProvider>
  );
};
