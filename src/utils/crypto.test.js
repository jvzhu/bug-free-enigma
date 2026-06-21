const { TextEncoder, TextDecoder } = require('util');
const { webcrypto } = require('crypto');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.crypto = webcrypto;

const {
  generateSalt,
  generateIV,
  bufferToBase64,
  base64ToBuffer,
  calculatePasswordEntropy,
  getPasswordStrength,
  generateRecoveryCodes,
  deriveKeyFromPassword,
  encryptData,
  decryptData,
  hashPasswordForVerification,
} = require('./crypto');

describe('crypto utilities', () => {
  test('generateSalt returns 24-character base64 string', () => {
    const salt = generateSalt();
    expect(salt).toHaveLength(24);
    expect(base64ToBuffer(salt)).toHaveLength(16);
  });

  test('generateIV returns 16-character base64 string', () => {
    const iv = generateIV();
    expect(iv).toHaveLength(16);
    expect(base64ToBuffer(iv)).toHaveLength(12);
  });

  test('buffer/base64 roundtrip works', () => {
    const source = new Uint8Array([1, 2, 3, 250, 251, 252]);
    const encoded = bufferToBase64(source);
    const decoded = base64ToBuffer(encoded);
    expect(Array.from(decoded)).toEqual(Array.from(source));
  });

  test('calculatePasswordEntropy handles different passwords', () => {
    expect(calculatePasswordEntropy('')).toBe(0);
    expect(calculatePasswordEntropy('aaaa')).toBeGreaterThan(0);
    expect(calculatePasswordEntropy('Tr0ub4dor&3')).toBeGreaterThan(calculatePasswordEntropy('aaaa'));
  });

  test('getPasswordStrength returns expected levels', () => {
    expect(getPasswordStrength('abc').label).toBe('Very Weak');
    expect(getPasswordStrength('Password12').level).toBeGreaterThanOrEqual(2);
    expect(getPasswordStrength('CorrectHorseBatteryStaple!2026').label).toBe('Very Strong');
  });

  test('generateRecoveryCodes returns 10 formatted codes', () => {
    const codes = generateRecoveryCodes();
    expect(codes).toHaveLength(10);
    codes.forEach((code) => {
      expect(code).toMatch(/^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/);
    });
  });

  test('encrypt/decrypt roundtrip works', async () => {
    const salt = generateSalt();
    const key = await deriveKeyFromPassword('StrongPassword!123', salt);
    const encrypted = await encryptData('hello secure world', key);
    const decrypted = await decryptData(encrypted, key);
    expect(decrypted).toBe('hello secure world');
  });

  test('hashPasswordForVerification is deterministic for same password and salt', async () => {
    const salt = generateSalt();
    const hashA = await hashPasswordForVerification('MyPassword!123', salt);
    const hashB = await hashPasswordForVerification('MyPassword!123', salt);
    expect(hashA).toBe(hashB);
  });
});
