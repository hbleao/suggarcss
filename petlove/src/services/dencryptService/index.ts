'use server';
import * as CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'chave';

const getKey = () => {
  const hashed = CryptoJS.SHA256(ENCRYPTION_KEY).toString();
  return CryptoJS.enc.Hex.parse(hashed.substring(0, 32));
};

export const decryptValueService = async (encrypted: string) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, getKey(), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
