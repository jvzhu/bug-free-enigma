const { exportNotesToJson, exportNoteToMarkdown, exportAllNotesToMarkdown } = require('./exportUtils');

describe('export utilities', () => {
  test('exportNotesToJson produces correct structure', () => {
    const createObjectURL = jest.fn(() => 'blob:test');
    const revokeObjectURL = jest.fn();
    const click = jest.fn();
    const createElement = jest.spyOn(document, 'createElement').mockImplementation(() => ({
      click,
      set href(value) {
        this._href = value;
      },
      set download(value) {
        this._download = value;
      },
    }));

    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;

    const payload = exportNotesToJson([
      {
        title: 'Alpha',
        content: 'Bravo',
        tags: ['one'],
        createdAt: '2026-06-21T00:00:00.000Z',
        updatedAt: '2026-06-21T00:00:00.000Z',
      },
    ]);

    expect(payload).toEqual([
      {
        title: 'Alpha',
        content: 'Bravo',
        tags: ['one'],
        createdAt: '2026-06-21T00:00:00.000Z',
        updatedAt: '2026-06-21T00:00:00.000Z',
      },
    ]);
    expect(createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();

    createElement.mockRestore();
  });

  test('exportNoteToMarkdown produces correct markdown', () => {
    expect(exportNoteToMarkdown({ title: 'My Note', content: 'Hello world' })).toBe('# My Note\n\nHello world');
  });

  test('exportAllNotesToMarkdown joins notes with ---', () => {
    expect(
      exportAllNotesToMarkdown([
        { title: 'One', content: 'First' },
        { title: 'Two', content: 'Second' },
      ])
    ).toBe('# One\n\nFirst\n\n---\n\n# Two\n\nSecond');
  });
});
