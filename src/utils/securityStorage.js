export const SECURITY_STORAGE_KEY = 'notes-security-config';
const AUDIT_LOG_STORAGE_KEY = 'notes-audit-log';

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch (error) {
    console.error('Failed to parse stored security data:', error);
    return fallback;
  }
}

export function loadSecurityConfig() {
  try {
    return safeParse(localStorage.getItem(SECURITY_STORAGE_KEY), null);
  } catch (error) {
    console.error('Failed to load security config:', error);
    return null;
  }
}

export function saveSecurityConfig(config) {
  try {
    localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Failed to save security config:', error);
    return false;
  }
}

export function clearSecurityConfig() {
  try {
    localStorage.removeItem(SECURITY_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear security config:', error);
    return false;
  }
}

export function loadAuditLog() {
  try {
    return safeParse(localStorage.getItem(AUDIT_LOG_STORAGE_KEY), []);
  } catch (error) {
    console.error('Failed to load audit log:', error);
    return [];
  }
}

export function saveAuditLog(log) {
  try {
    localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(Array.isArray(log) ? log : []));
    return true;
  } catch (error) {
    console.error('Failed to save audit log:', error);
    return false;
  }
}

export function addAuditEntry(action, details = '') {
  const currentLog = loadAuditLog();
  const nextLog = [
    ...currentLog,
    {
      action,
      details,
      timestamp: new Date().toISOString(),
    },
  ].slice(-1000);

  saveAuditLog(nextLog);
  return nextLog;
}
