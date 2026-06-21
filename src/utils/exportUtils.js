export function downloadText(filename, content, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([String(content)], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportNotesToJson(notes = []) {
  const payload = (notes || []).map((note) => ({
    title: note?.title || '',
    content: note?.content || '',
    tags: Array.isArray(note?.tags) ? note.tags.filter(Boolean) : [],
    createdAt: note?.createdAt || null,
    updatedAt: note?.updatedAt || null,
  }));

  downloadText(
    `notes-export-${new Date().toISOString().replace(/:/g, '-')}.json`,
    JSON.stringify(payload, null, 2),
    'application/json'
  );

  return payload;
}

export function exportNoteToMarkdown(note = {}) {
  const title = String(note?.title || 'Untitled Note').trim() || 'Untitled Note';
  const content = String(note?.content || '');
  return `# ${title}\n\n${content}`.trimEnd();
}

export function exportAllNotesToMarkdown(notes = []) {
  return (notes || []).map((note) => exportNoteToMarkdown(note)).join('\n\n---\n\n');
}

export function downloadMarkdown(filename, content) {
  const safeName = filename.endsWith('.md') ? filename : `${filename}.md`;
  downloadText(safeName, content, 'text/markdown;charset=utf-8');
}
