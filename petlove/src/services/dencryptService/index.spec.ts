import { decryptValueService } from '.';
import * as CryptoJS from 'crypto-js';

// CryptoJS mock for tests
jest.mock('crypto-js', () => {
  const originalModule = jest.requireActual('crypto-js');
  
  return {
    ...originalModule,
    AES: {
      decrypt: jest.fn().mockImplementation(() => ({
        toString: jest.fn().mockReturnValue('decrypted-value')
      }))
    },
    SHA256: jest.fn().mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('hashed-key-value')
    })),
    enc: {
      Hex: {
        parse: jest.fn().mockReturnValue('parsed-key')
      },
      Utf8: 'utf8-encoding'
    },
    mode: {
      ECB: 'ecb-mode'
    },
    pad: {
      Pkcs7: 'pkcs7-padding'
    }
  };
});

describe('decryptValueService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should decrypt an encrypted value', async () => {
    // Arrange
    const encryptedValue = 'encrypted-value';
    
    // Act
    const result = await decryptValueService(encryptedValue);
    
    // Assert
    expect(result).toBe('decrypted-value');
    expect(CryptoJS.AES.decrypt).toHaveBeenCalledWith(
      encryptedValue,
      'parsed-key',
      {
        mode: 'ecb-mode',
        padding: 'pkcs7-padding'
      }
    );
  });
  
  it('should generate the key correctly using SHA256 and Hex parsing', async () => {
    // Arrange
    const encryptedValue = 'another-encrypted-value';
    
    // Act
    await decryptValueService(encryptedValue);
    
    // Assert
    expect(CryptoJS.SHA256).toHaveBeenCalledWith('chave');
    expect(CryptoJS.enc.Hex.parse).toHaveBeenCalledWith('hashed-key-value');
  });
  
  it('should return the decrypted value as a UTF-8 string', async () => {
    // Arrange
    const encryptedValue = 'yet-another-encrypted-value';
    const mockToString = jest.fn().mockReturnValue('utf8-decrypted-value');
    
    (CryptoJS.AES.decrypt as jest.Mock).mockImplementationOnce(() => ({
      toString: mockToString
    }));
    
    // Act
    const result = await decryptValueService(encryptedValue);
    
    // Assert
    expect(mockToString).toHaveBeenCalledWith('utf8-encoding');
    expect(result).toBe('utf8-decrypted-value');
  });
});
