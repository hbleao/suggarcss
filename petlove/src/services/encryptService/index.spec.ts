import { encryptValue, encryptAES } from '.';

// Mock for next-runtime-env
jest.mock('next-runtime-env');

describe('encryptValue', () => {
  it('should encrypt a string correctly', () => {
    // Arrange
    const textToEncrypt = 'texto-para-criptografar';
    
    // Act
    const encryptedText = encryptValue(textToEncrypt);
    
    // Assert
    expect(encryptedText).toBeDefined();
    expect(typeof encryptedText).toBe('string');
    expect(encryptedText).not.toBe(textToEncrypt);
    // Checking first if the value is not undefined before accessing the length property
    if (encryptedText) {
      expect(encryptedText.length).toBeGreaterThan(0);
    }
  });

  it('should return different strings for different inputs', () => {
    // Arrange
    const text1 = 'texto1';
    const text2 = 'texto2';
    
    // Act
    const encrypted1 = encryptValue(text1);
    const encrypted2 = encryptValue(text2);
    
    // Assert
    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should return undefined when input is empty', () => {
    // Arrange
    const emptyText = '';
    
    // Act
    const encryptedText = encryptValue(emptyText);
    
    // Assert
    expect(encryptedText).toBe(emptyText);
  });

  it('should return undefined when input is undefined', () => {
    // Arrange & Act
    const encryptedText = encryptValue(undefined);
    
    // Assert
    expect(encryptedText).toBe(undefined);
  });
});

describe('encryptAES', () => {
  it('should encrypt a string with a specific key', () => {
    // Arrange
    const textToEncrypt = 'texto-para-criptografar';
    const key = 'chave-secreta';
    
    // Act
    const encryptedText = encryptAES(textToEncrypt, key);
    
    // Assert
    expect(encryptedText).toBeDefined();
    expect(typeof encryptedText).toBe('string');
    expect(encryptedText).not.toBe(textToEncrypt);
    expect(encryptedText.length).toBeGreaterThan(0);
  });
  
  it('should throw an error when value or key are empty', () => {
    // Arrange & Act & Assert
    expect(() => encryptAES('', 'chave')).toThrow();
    expect(() => encryptAES('valor', '')).toThrow();
    expect(() => encryptAES('', '')).toThrow();
  });
});
