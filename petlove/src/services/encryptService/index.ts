
import cryptoJS from 'crypto-js';
import { env } from 'next-runtime-env';

/**
 * Chave de criptografia padrão
 * @todo Mover para variável de ambiente
 */
const DEFAULT_ENCRYPTION_KEY = env("NEXT_PUBLIC_ENCRYPTION_KEY");

/**
 * Encripta um valor usando AES
 * @param value - Valor a ser encriptado
 * @returns Valor encriptado ou undefined se não houver valor
 */
export const encryptValue = (value: string | undefined): string | undefined => {
  if (!value?.trim()) return value;
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return encryptAES(value, DEFAULT_ENCRYPTION_KEY!);
};

/**
 * Encripta um valor usando AES com uma chave específica
 * @param value - Valor a ser encriptado
 * @param key - Chave de criptografia
 * @returns Valor encriptado
 * @throws Error se o valor ou a chave forem inválidos
 */
export const encryptAES = (value: string, key: string): string => {
  if (!value?.trim() || !key?.trim()) {
    throw new Error('Value and key must be non-empty strings');
  }
  return cryptoJS.AES.encrypt(value, key).toString();
};
