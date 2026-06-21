function normalizeImportedNote(note = {}) {
  return {
    title: typeof note?.title === 'string' ? note.title : '',
    content: typeof note?.content === 'string' ? note.content : '',
    tags: Array.isArray(note?.tags) ? note.tags.filter((tag) => typeof tag === 'string' && tag.trim()) : [],
    isEncrypted: Boolean(note?.isEncrypted || note?.encryptedData),
    encryptedData: note?.encryptedData || null,
  };
}

export function validateImportedNote(note) {
  if (!note || typeof note !== 'object' || Array.isArray(note)) {
    return { valid: false, error: 'Each imported note must be an object.' };
  }

  if (note.title != null && typeof note.title !== 'string') {
    return { valid: false, error: 'Note title must be a string.' };
  }

  if (note.content != null && typeof note.content !== 'string') {
    return { valid: false, error: 'Note content must be a string.' };
  }

  if (note.tags != null && (!Array.isArray(note.tags) || note.tags.some((tag) => typeof tag !== 'string'))) {
    return { valid: false, error: 'Note tags must be an array of strings.' };
  }

  if (note.encryptedData != null) {
    if (
      typeof note.encryptedData !== 'object' ||
      typeof note.encryptedData.ciphertext !== 'string' ||
      typeof note.encryptedData.iv !== 'string'
    ) {
      return { valid: false, error: 'Encrypted note data is invalid.' };
    }
  }

  return { valid: true, error: '' };
}

export function parseImportedJson(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON file.');
  }

  const notes = Array.isArray(parsed) ? parsed : parsed?.notes;
  if (!Array.isArray(notes)) {
    throw new Error('Imported JSON must contain an array of notes.');
  }

  return notes.map((note, index) => {
    const validation = validateImportedNote(note);
    if (!validation.valid) {
      throw new Error(`Invalid note at position ${index + 1}: ${validation.error}`);
    }
    return normalizeImportedNote(note);
  });
}

export function parseImportedMarkdown(text) {
  const normalised = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const sections = normalised
    .split(/\n\s*---\s*\n/g)
    .map((section) => section.trim())
    .filter(Boolean);

  if (sections.length === 0) {
    throw new Error('No notes found in markdown content.');
  }

  return sections.map((section, index) => {
    const lines = section.split('\n');
    const titleIndex = lines.findIndex((line) => line.startsWith('# '));
    const title = titleIndex >= 0 ? lines[titleIndex].slice(2).trim() : '';
    const contentLines = titleIndex >= 0 ? lines.slice(titleIndex + 1) : lines;
    const content = contentLines.join('\n').replace(/^\n+/, '').trim();
    const note = { title, content, tags: [] };
    const validation = validateImportedNote(note);
    if (!validation.valid) {
      throw new Error(`Invalid markdown note at position ${index + 1}: ${validation.error}`);
    }
    return note;
  });
}
