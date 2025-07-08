'use server';
import * as CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'chave';

const getKey = () => {
  const hashed = CryptoJS.SHA256(ENCRYPTION_KEY).toString();
  return CryptoJS.enc.Hex.parse(hashed.substring(0, 16));
};

export const encryptValueService = async (value: string) => {
  const encrypted = CryptoJS.AES.encrypt(value, getKey(), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

