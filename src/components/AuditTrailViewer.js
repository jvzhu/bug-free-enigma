import React from 'react';
import { loadAuditLog, saveAuditLog } from '../utils/securityStorage';
import { downloadJson } from '../utils/fileDownload';

const PAGE_SIZE = 20;

function AuditTrailViewer({ onClose }) {
  const [entries, setEntries] = React.useState(() => loadAuditLog().slice().reverse());
  const [page, setPage] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const pagedEntries = entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearLog = () => {
    if (!window.confirm('Clear the entire audit log?')) {
      return;
    }
    saveAuditLog([]);
    setEntries([]);
    setPage(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-box--wide audit-trail-modal">
        <div className="modal-header">
          <h3>Audit Trail</h3>
          <button className="btn btn-icon" type="button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={() => downloadJson('notes-audit-log.json', entries)}>
            Export Log
          </button>
          <button className="btn btn-danger-solid" type="button" onClick={clearLog}>
            Clear Audit Log
          </button>
        </div>
        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {pagedEntries.length === 0 ? (
                <tr>
                  <td colSpan="3">No audit entries recorded.</td>
                </tr>
              ) : (
                pagedEntries.map((entry, index) => (
                  <tr key={`${entry.timestamp}-${index}`}>
                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    <td>{entry.action}</td>
                    <td>{entry.details || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-row">
          <button className="btn btn-secondary" type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button className="btn btn-secondary" type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditTrailViewer;
