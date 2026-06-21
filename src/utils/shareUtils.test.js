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

  test('generateShareUrl produces valid URL format', () => {
    window.history.pushState({}, '', '/app');
    const url = generateShareUrl({ title: 'Shared', content: 'Body' });

    expect(url).toBe(`${window.location.origin}/app?share=${url.split('?share=')[1]}`);
    expect(decodeSharePayload(url.split('?share=')[1]).title).toBe('Shared');
  });
});
