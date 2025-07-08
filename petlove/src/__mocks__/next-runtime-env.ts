// Mock para next-runtime-env
export const env = (key: string) => {
  const mockEnvVars: Record<string, string> = {
    'NEXT_PUBLIC_SENSEDIA_CLOUD_URL': 'https://api.example.com',
    'NEXT_PUBLIC_SERVICE_AUTHORIZATION_PATH': '/auth',
    'NEXT_PUBLIC_ASSISTANT_SERVICE_PATH': '/assistant',
    'NEXT_PUBLIC_ACQUISITION_SERVICE_PATH': '/acquisition',
    'NEXT_PUBLIC_ENCRYPTION_KEY': 'test-encryption-key',
    'NEXT_PUBLIC_DECRYPTION_KEY': 'test-decryption-key'
  };
  
  return mockEnvVars[key] || '';
};
