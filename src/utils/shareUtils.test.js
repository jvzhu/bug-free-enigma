const { TextEncoder, TextDecoder } = require('util');
const { webcrypto } = require('crypto');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.crypto = webcrypto;
global.btoa = global.btoa || ((value) => Buffer.from(value, 'binary').toString('base64'));
global.atob = global.atob || ((value) => Buffer.from(value, 'base64').toString('binary'));

const {
  encodeSharePayload,
  decodeSharePayload,
  generateShareUrl,
} = require('./shareUtils');

describe('share utilities', () => {
  test('encodeSharePayload and decodeSharePayload roundtrip', () => {
    const encoded = encodeSharePayload({ title: 'Shared', content: 'Body', tags: ['one'] });
    const decoded = decodeSharePayload(encoded);

    expect(decoded.title).toBe('Shared');
    expect(decoded.content).toBe('Body');
    expect(decoded.tags).toEqual(['one']);
    expect(decoded.v).toBe(1);
  });

  test('encodeSharePayload handles Unicode content', () => {
    const encoded = encodeSharePayload({ title: 'Héllo', content: '日本語テスト 🔐' });
    const decoded = decodeSharePayload(encoded);
    expect(decoded.title).toBe('Héllo');
    expect(decoded.content).toBe('日本語テスト 🔐');
  });

  test('generateShareUrl produces URL with correct base and share param', () => {
    window.history.pushState({}, '', '/app');
    const note = { title: 'Shared', content: 'Body' };
    const url = generateShareUrl(note);

    const parsed = new URL(url);
    expect(parsed.pathname).toBe('/app');
    expect(parsed.searchParams.has('share')).toBe(true);

    const decodedPayload = decodeSharePayload(parsed.searchParams.get('share'));
    expect(decodedPayload.title).toBe('Shared');
    expect(decodedPayload.content).toBe('Body');
  });

  test('decodeSharePayload returns null for invalid input', () => {
    expect(decodeSharePayload('not-valid-base64!!!')).toBeNull();
    expect(decodeSharePayload('')).toBeNull();
  });
});
