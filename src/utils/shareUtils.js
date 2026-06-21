export function encodeSharePayload(note) {
  const payload = {
    v: 1,
    title: note.title || '',
    content: note.content || '',
    tags: note.tags || [],
    encryptedData: note.encryptedData || null,
    isEncrypted: note.isEncrypted || false,
    sharedAt: new Date().toISOString(),
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

export function decodeSharePayload(hash) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(hash))));
  } catch {
    return null;
  }
}

export function generateShareUrl(note) {
  const encoded = encodeSharePayload(note);
  const base = window.location.href.split('#')[0].split('?')[0];
  return `${base}?share=${encoded}`;
}
