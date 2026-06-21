const {
  parseImportedJson,
  parseImportedMarkdown,
  validateImportedNote,
} = require('./importUtils');

describe('import utilities', () => {
  test('parseImportedJson handles valid input', () => {
    const notes = parseImportedJson(JSON.stringify([{ title: 'One', content: 'Body', tags: ['tag'] }]));
    expect(notes).toEqual([{ title: 'One', content: 'Body', tags: ['tag'], isEncrypted: false, encryptedData: null }]);
  });

  test('parseImportedJson throws on invalid input', () => {
    expect(() => parseImportedJson('{bad json')).toThrow('Invalid JSON file.');
    expect(() => parseImportedJson(JSON.stringify({ nope: true }))).toThrow('Imported JSON must contain an array of notes.');
  });

  test('parseImportedMarkdown parses correctly', () => {
    const notes = parseImportedMarkdown('# Note One\n\nAlpha\n\n---\n\n# Note Two\n\nBeta');
    expect(notes).toEqual([
      { title: 'Note One', content: 'Alpha', tags: [] },
      { title: 'Note Two', content: 'Beta', tags: [] },
    ]);
  });

  test('validateImportedNote validation', () => {
    expect(validateImportedNote({ title: 'Okay', content: 'Body', tags: [] })).toEqual({ valid: true, error: '' });
    expect(validateImportedNote({ title: 42 })).toEqual({ valid: false, error: 'Note title must be a string.' });
  });
});
