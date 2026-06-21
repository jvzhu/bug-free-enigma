/* global globalThis */

const DEFAULT_PBKDF2_ITERATIONS = 100000;
const ROOT_SCOPE = typeof globalThis !== 'undefined' ? globalThis : window;

function getCrypto() {
  const cryptoObject = ROOT_SCOPE.crypto || (typeof window !== 'undefined' ? window.crypto : null);
  if (!cryptoObject || !cryptoObject.subtle) {
    throw new Error('Web Crypto API is not available in this environment.');
  }
  return cryptoObject;
}

function getTextEncoder() {
  const Encoder = ROOT_SCOPE.TextEncoder;
  if (!Encoder) {
    throw new Error('TextEncoder is not available in this environment.');
  }
  return new Encoder();
}

function getTextDecoder() {
  const Decoder = ROOT_SCOPE.TextDecoder;
  if (!Decoder) {
    throw new Error('TextDecoder is not available in this environment.');
  }
  return new Decoder();
}

function bytesToCharacterString(bytes) {
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
}

function characterStringToBytes(binaryString) {
  return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
}

function base64Encode(binaryString) {
  if (typeof btoa === 'function') {
    return btoa(binaryString);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(binaryString, 'binary').toString('base64');
  }
  throw new Error('Base64 encoding is not supported in this environment.');
}

function base64Decode(base64) {
  if (typeof atob === 'function') {
    return atob(base64);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('binary');
  }
  throw new Error('Base64 decoding is not supported in this environment.');
}

export function bufferToBase64(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return base64Encode(bytesToCharacterString(bytes));
}

/** Convert a base64 string into a Uint8Array. */
export function base64ToBuffer(base64) {
  const normalized = (base64 || '').trim();
  return characterStringToBytes(base64Decode(normalized));
}

/** Generate a 16-byte random salt encoded as base64. */
export function generateSalt() {
  const bytes = new Uint8Array(16);
  getCrypto().getRandomValues(bytes);
  return bufferToBase64(bytes);
}

/** Generate a 12-byte AES-GCM IV encoded as base64. */
export function generateIV() {
  const bytes = new Uint8Array(12);
  getCrypto().getRandomValues(bytes);
  return bufferToBase64(bytes);
}

async function importPasswordMaterial(password) {
  return getCrypto().subtle.importKey(
    'raw',
    getTextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
}

export async function deriveKeyFromPassword(password, saltBase64, keyLength = 256) {
  const material = await importPasswordMaterial(password);
  return getCrypto().subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: base64ToBuffer(saltBase64),
      iterations: DEFAULT_PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    material,
    {
      name: 'AES-GCM',
      length: keyLength,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

/** Derive a deterministic PBKDF2 verification hash for a password and salt. */
export async function hashPasswordForVerification(password, saltBase64) {
  const material = await importPasswordMaterial(password);
  const bits = await getCrypto().subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: base64ToBuffer(saltBase64),
      iterations: DEFAULT_PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    material,
    256
  );
  return bufferToBase64(bits);
}

/** Expand a password-derived AES key into a contextual AES-GCM key with HKDF. */
export async function expandKey(masterKey, info, saltBase64 = null) {
  const rawMasterKey = await getCrypto().subtle.exportKey('raw', masterKey);
  const hkdfKey = await getCrypto().subtle.importKey('raw', rawMasterKey, 'HKDF', false, ['deriveKey']);
  const keyLength = masterKey?.algorithm?.length || 256;

  return getCrypto().subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: saltBase64 ? base64ToBuffer(saltBase64) : new Uint8Array(16),
      info: getTextEncoder().encode(info || 'notes-data'),
    },
    hkdfKey,
    {
      name: 'AES-GCM',
      length: keyLength,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

/** Encrypt a UTF-8 string with AES-GCM and return transport-safe fields. */
export async function encryptData(data, key) {
  const iv = generateIV();
  const encoded = getTextEncoder().encode(String(data));
  const ciphertext = await getCrypto().subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: base64ToBuffer(iv),
    },
    key,
    encoded
  );

  return {
    ciphertext: bufferToBase64(ciphertext),
    iv,
    algorithm: 'AES-GCM',
  };
}

/** Decrypt AES-GCM payload data and return the original UTF-8 string. */
export async function decryptData(encryptedData, key) {
  if (!encryptedData?.ciphertext || !encryptedData?.iv) {
    throw new Error('Encrypted data is missing required fields.');
  }

  const plaintext = await getCrypto().subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: base64ToBuffer(encryptedData.iv),
    },
    key,
    base64ToBuffer(encryptedData.ciphertext)
  );

  return getTextDecoder().decode(plaintext);
}

/** Generate human-readable one-time recovery codes. */
export function generateRecoveryCodes(count = 10) {
  return Array.from({ length: count }, () => {
    const bytes = new Uint8Array(6);
    getCrypto().getRandomValues(bytes);
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase();

    return `${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`;
  });
}

/** Estimate password entropy in bits using the detected character set. */
export function calculatePasswordEntropy(password) {
  if (!password) {
    return 0;
  }

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9\s]/.test(password)) charsetSize += 33;
  if (/\s/.test(password)) charsetSize += 1;

  if (charsetSize === 0) {
    return 0;
  }

  return Math.round(password.length * Math.log2(charsetSize) * 10) / 10;
}

/** Map password entropy to a UI-friendly strength descriptor. */
export function getPasswordStrength(password) {
  const entropy = calculatePasswordEntropy(password);

  if (entropy < 28) {
    return { level: 0, label: 'Very Weak', color: '#dc2626' };
  }
  if (entropy < 36) {
    return { level: 1, label: 'Weak', color: '#f97316' };
  }
  if (entropy < 60) {
    return { level: 2, label: 'Fair', color: '#f59e0b' };
  }
  if (entropy < 80) {
    return { level: 3, label: 'Strong', color: '#22c55e' };
  }

  return { level: 4, label: 'Very Strong', color: '#16a34a' };
}
