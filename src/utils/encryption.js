// Web Crypto API utilities for note encryption
// Uses AES-GCM with 256-bit key derived via PBKDF2

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

async function deriveKey(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Encrypts plaintext with the given password.
 * Returns { encryptedContent, iv, salt } as base64 strings.
 */
export async function encryptContent(plaintext, password) {
  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(password, salt);
  const encrypted = await window.crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoder.encode(plaintext)
  );
  return {
    encryptedContent: bufferToBase64(encrypted),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
  };
}

/**
 * Decrypts an encrypted note payload with the given password.
 * Throws if decryption fails (e.g. wrong password).
 */
export async function decryptContent(encryptedData, password) {
  const { encryptedContent, iv, salt } = encryptedData;
  const key = await deriveKey(password, base64ToBuffer(salt));
  const decrypted = await window.crypto.subtle.decrypt(
    { name: ALGORITHM, iv: base64ToBuffer(iv) },
    key,
    base64ToBuffer(encryptedContent)
  );
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/** Returns true if the Web Crypto API is available in this browser. */
export function isCryptoAvailable() {
  return (
    typeof window !== 'undefined' &&
    window.crypto &&
    window.crypto.subtle != null
  );
}
