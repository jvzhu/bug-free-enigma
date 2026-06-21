function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  // Process in 0x8000-byte chunks to avoid call-stack overflow on large inputs.
  const CHUNK = 0x8000;
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + CHUNK));
  }
  return btoa(binary);
}

function base64ToUtf8(base64) {
  // URL decoding can convert '+' to a space; restore it before passing to atob().
  const normalized = base64.replace(/ /g, '+');
  const binaryString = atob(normalized);
  const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

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
  return utf8ToBase64(JSON.stringify(payload));
}

export function decodeSharePayload(hash) {
  try {
    return JSON.parse(base64ToUtf8(hash));
  } catch {
    return null;
  }
}

export function generateShareUrl(note) {
  const encoded = encodeSharePayload(note);
  const base = window.location.href.split('#')[0].split('?')[0];
  return `${base}?share=${encodeURIComponent(encoded)}`;
}
