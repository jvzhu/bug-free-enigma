import React, { useMemo, useState } from 'react';
import { parseImportedJson, parseImportedMarkdown } from '../utils/importUtils';

function detectFormat(text, filename = '') {
  const lowerName = filename.toLowerCase();
  if (lowerName.endsWith('.json')) {
    return 'json';
  }
  if (lowerName.endsWith('.md') || lowerName.endsWith('.markdown')) {
    return 'markdown';
  }

  const trimmed = String(text || '').trim();
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    return 'json';
  }
  return 'markdown';
}

function ImportModal({ onClose, onImport }) {
  const [activeTab, setActiveTab] = useState('file');
  const [selectedFile, setSelectedFile] = useState(null);
  const [pasteText, setPasteText] = useState('');
  const [parsedNotes, setParsedNotes] = useState([]);
  const [error, setError] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const previewMessage = useMemo(() => {
    if (!parsedNotes.length) {
      return '';
    }
    return `Found ${parsedNotes.length} note${parsedNotes.length === 1 ? '' : 's'} to import.`;
  }, [parsedNotes]);

  const resetPreview = () => {
    setParsedNotes([]);
    setError('');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null);
    resetPreview();
  };

  const handleParse = async () => {
    setIsParsing(true);
    setError('');

    try {
      let sourceText = pasteText;
      let filename = '';

      if (activeTab === 'file') {
        if (!selectedFile) {
          throw new Error('Choose a file to import.');
        }
        sourceText = await selectedFile.text();
        filename = selectedFile.name || '';
      } else if (!pasteText.trim()) {
        throw new Error('Paste note content to import.');
      }

      const format = detectFormat(sourceText, filename);
      const notes = format === 'json'
        ? parseImportedJson(sourceText)
        : parseImportedMarkdown(sourceText);

      if (!notes.length) {
        throw new Error('No notes found to import.');
      }

      setParsedNotes(notes);
    } catch (importError) {
      setParsedNotes([]);
      setError(importError?.message || 'Unable to import notes.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirm = () => {
    if (!parsedNotes.length) {
      handleParse();
      return;
    }
    onImport(parsedNotes);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box import-modal">
        <div className="modal-header">
          <h3>Import Notes</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="tab-row">
          <button
            className={`btn ${activeTab === 'file' ? 'btn-action' : 'btn-secondary'}`}
            type="button"
            onClick={() => {
              setActiveTab('file');
              resetPreview();
            }}
          >
            File
          </button>
          <button
            className={`btn ${activeTab === 'paste' ? 'btn-action' : 'btn-secondary'}`}
            type="button"
            onClick={() => {
              setActiveTab('paste');
              resetPreview();
            }}
          >
            Paste Text
          </button>
        </div>

        {activeTab === 'file' ? (
          <label className="form-field">
            <span>Choose a file</span>
            <input type="file" accept=".json,.md,.markdown" onChange={handleFileChange} />
          </label>
        ) : (
          <label className="form-field">
            <span>Paste JSON or Markdown</span>
            <textarea
              className="import-textarea"
              value={pasteText}
              onChange={(event) => {
                setPasteText(event.target.value);
                resetPreview();
              }}
              placeholder="Paste exported notes here..."
            />
          </label>
        )}

        {error && <p className="form-error">{error}</p>}
        {previewMessage && <p className="import-preview">{previewMessage}</p>}

        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-secondary" type="button" onClick={handleParse} disabled={isParsing}>
            {isParsing ? 'Parsing…' : 'Preview'}
          </button>
          <button className="btn btn-action" type="button" onClick={handleConfirm} disabled={isParsing}>
            {parsedNotes.length ? 'Import' : 'Parse & Import'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportModal;
