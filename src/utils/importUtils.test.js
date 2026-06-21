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

  test('parseImportedMarkdown handles section without a heading', () => {
    const notes = parseImportedMarkdown('Just some content without a heading');
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe('');
    expect(notes[0].content).toBe('Just some content without a heading');
  });

  test('parseImportedMarkdown normalises Windows CRLF line endings', () => {
    const notes = parseImportedMarkdown('# Title\r\n\r\nContent line one\r\nContent line two');
    expect(notes[0].title).toBe('Title');
    expect(notes[0].content).toBe('Content line one\nContent line two');
  });

  test('parseImportedMarkdown filters empty sections', () => {
    const notes = parseImportedMarkdown('\n\n---\n\n# Real Note\n\nBody\n\n---\n\n   ');
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe('Real Note');
  });

  test('parseImportedMarkdown throws on completely empty input', () => {
    expect(() => parseImportedMarkdown('')).toThrow('No notes found in markdown content.');
    expect(() => parseImportedMarkdown('   \n\n   ')).toThrow('No notes found in markdown content.');
  });

  test('validateImportedNote validation', () => {
    expect(validateImportedNote({ title: 'Okay', content: 'Body', tags: [] })).toEqual({ valid: true, error: '' });
    expect(validateImportedNote({ title: 42 })).toEqual({ valid: false, error: 'Note title must be a string.' });
    expect(validateImportedNote(null)).toEqual({ valid: false, error: 'Each imported note must be an object.' });
    expect(validateImportedNote([])).toEqual({ valid: false, error: 'Each imported note must be an object.' });
  });
});
