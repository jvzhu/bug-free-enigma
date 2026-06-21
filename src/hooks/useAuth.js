import React from 'react';
import {
  decryptData,
  deriveKeyFromPassword,
  encryptData,
  expandKey,
  generateRecoveryCodes,
  generateSalt,
  getPasswordStrength,
  hashPasswordForVerification,
  base64ToBuffer,
} from '../utils/crypto';
import {
  addAuditEntry,
  clearSecurityConfig,
  loadSecurityConfig,
  saveAuditLog,
  saveSecurityConfig,
} from '../utils/securityStorage';

const DEFAULT_SECURITY_CONFIG = {
  masterPasswordHash: '',
  verificationSalt: '',
  encryptionSalt: '',
  hkdfSalt: '',
  algorithm: 'AES-GCM-256',
  recoveryCodes: [],
  preferences: {
    encryptByDefault: false,
    sessionTimeoutMinutes: 15,
  },
  biometricCredentialId: null,
  setupComplete: false,
};

function getKeyLengthFromAlgorithm(algorithm = 'AES-GCM-256') {
  return algorithm === 'AES-GCM-128' ? 128 : 256;
}

function mergeConfig(config) {
  if (!config) {
    return null;
  }

  return {
    ...DEFAULT_SECURITY_CONFIG,
    ...config,
    preferences: {
      ...DEFAULT_SECURITY_CONFIG.preferences,
      ...(config.preferences || {}),
    },
  };
}

async function deriveExpandedKey(password, config) {
  const merged = mergeConfig(config);
  const masterKey = await deriveKeyFromPassword(
    password,
    merged.encryptionSalt,
    getKeyLengthFromAlgorithm(merged.algorithm)
  );

  return expandKey(masterKey, 'notes-app-data', merged.hkdfSalt);
}

async function verifyPassword(password, config) {
  const merged = mergeConfig(config);
  const verificationHash = await hashPasswordForVerification(password, merged.verificationSalt);
  return verificationHash === merged.masterPasswordHash;
}

async function reencryptNotesForKeyChange(notes, oldKey, newKey) {
  return Promise.all(
    (notes || []).map(async (note) => {
      if (note.encryptedData) {
        const decryptedPayload = await decryptData(note.encryptedData, oldKey);
        const encryptedData = await encryptData(decryptedPayload, newKey);

        return {
          ...note,
          encryptedData,
          isEncrypted: true,
          title: '',
          content: '',
          updatedAt: new Date().toISOString(),
        };
      }

      if (note.isEncrypted) {
        const encryptedData = await encryptData(
          JSON.stringify({
            title: note.title || '',
            content: note.content || '',
            tags: Array.isArray(note.tags) ? note.tags : [],
          }),
          newKey
        );

        return {
          ...note,
          encryptedData,
          isEncrypted: true,
          title: '',
          content: '',
          updatedAt: new Date().toISOString(),
        };
      }

      return note;
    })
  );
}

export function useAuth() {
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [encryptionKey, setEncryptionKey] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [securityConfig, setSecurityConfig] = React.useState(null);

  const refreshConfig = React.useCallback(() => {
    const loadedConfig = mergeConfig(loadSecurityConfig());
    setSecurityConfig(loadedConfig);
    setIsSetupComplete(Boolean(loadedConfig?.setupComplete));
    return loadedConfig;
  }, []);

  React.useEffect(() => {
    refreshConfig();
  }, [refreshConfig]);

  const setupMasterPassword = React.useCallback(async (password) => {
    setIsLoading(true);
    setError('');

    try {
      const strength = getPasswordStrength(password);
      if (strength.level < 2) {
        throw new Error('Master password must be at least Fair strength.');
      }

      const verificationSalt = generateSalt();
      const encryptionSalt = generateSalt();
      const hkdfSalt = generateSalt();
      const recoveryCodes = generateRecoveryCodes(10).map((code) => ({ code, used: false }));
      const masterPasswordHash = await hashPasswordForVerification(password, verificationSalt);
      const nextConfig = mergeConfig({
        ...DEFAULT_SECURITY_CONFIG,
        masterPasswordHash,
        verificationSalt,
        encryptionSalt,
        hkdfSalt,
        recoveryCodes,
        setupComplete: true,
      });
      const derivedKey = await deriveExpandedKey(password, nextConfig);

      saveSecurityConfig(nextConfig);
      addAuditEntry('master-password-created', 'Initial security setup completed.');
      setSecurityConfig(nextConfig);
      setIsSetupComplete(true);
      setIsAuthenticated(true);
      setEncryptionKey(derivedKey);

      return { success: true, recoveryCodes };
    } catch (setupError) {
      const message = setupError?.message || 'Failed to set up master password.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = React.useCallback(async (password) => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.setupComplete) {
        throw new Error('Security has not been set up yet.');
      }

      const isValid = await verifyPassword(password, config);
      if (!isValid) {
        addAuditEntry('login-failed', 'Invalid master password.');
        throw new Error('Incorrect master password.');
      }

      const derivedKey = await deriveExpandedKey(password, config);
      setEncryptionKey(derivedKey);
      setIsAuthenticated(true);
      setSecurityConfig(config);
      setIsSetupComplete(true);
      addAuditEntry('login-success', 'Authenticated with master password.');

      return { success: true };
    } catch (loginError) {
      const message = loginError?.message || 'Unable to log in.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deriveEncryptionKeyFromPassword = React.useCallback(async (password) => {
    const config = mergeConfig(loadSecurityConfig());
    if (!config?.setupComplete) {
      throw new Error('Security has not been configured.');
    }

    const isValid = await verifyPassword(password, config);
    if (!isValid) {
      throw new Error('Incorrect master password.');
    }

    return deriveExpandedKey(password, config);
  }, []);

  const loginWithRecoveryCode = React.useCallback(async (code) => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.setupComplete) {
        throw new Error('Security has not been set up yet.');
      }

      const normalizedCode = String(code || '').trim().toUpperCase();
      const matchIndex = config.recoveryCodes.findIndex(
        (entry) => entry.code.toUpperCase() === normalizedCode && !entry.used
      );

      if (matchIndex === -1) {
        addAuditEntry('recovery-login-failed', 'Invalid or previously used recovery code.');
        throw new Error('Recovery code is invalid or has already been used.');
      }

      const nextConfig = {
        ...config,
        recoveryCodes: config.recoveryCodes.map((entry, index) =>
          index === matchIndex ? { ...entry, used: true } : entry
        ),
      };

      saveSecurityConfig(nextConfig);
      setSecurityConfig(nextConfig);
      setIsAuthenticated(true);
      setEncryptionKey(null);
      addAuditEntry('recovery-login-success', 'Authenticated with a recovery code in limited mode.');
      return { success: true };
    } catch (recoveryError) {
      const message = recoveryError?.message || 'Unable to use recovery code.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithBiometric = React.useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.biometricCredentialId) {
        throw new Error('No biometric credential has been registered.');
      }
      if (!navigator.credentials || !window.PublicKeyCredential) {
        throw new Error('Biometric authentication is not supported on this device.');
      }

      const challenge = crypto.getRandomValues(new Uint8Array(32));
      await navigator.credentials.get({
        publicKey: {
          challenge,
          timeout: 60000,
          userVerification: 'preferred',
          allowCredentials: [
            {
              id: base64ToBuffer(config.biometricCredentialId),
              type: 'public-key',
            },
          ],
        },
      });

      setIsAuthenticated(true);
      setEncryptionKey(null);
      setSecurityConfig(config);
      addAuditEntry('biometric-login-success', 'Authenticated with biometric verification in limited mode.');
      return { success: true };
    } catch (biometricError) {
      const message = biometricError?.message || 'Biometric login failed.';
      addAuditEntry('biometric-login-failed', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = React.useCallback(() => {
    setEncryptionKey(null);
    setIsAuthenticated(false);
    setError('');
    addAuditEntry('logout', 'Session locked or logged out.');
  }, []);

  const changePassword = React.useCallback(async (currentPassword, newPassword, notes = [], onUpdateNotes = () => {}) => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.setupComplete) {
        throw new Error('Security has not been set up yet.');
      }

      const isCurrentValid = await verifyPassword(currentPassword, config);
      if (!isCurrentValid) {
        throw new Error('Current password is incorrect.');
      }

      const strength = getPasswordStrength(newPassword);
      if (strength.level < 2) {
        throw new Error('New password must be at least Fair strength.');
      }

      const oldKey = await deriveExpandedKey(currentPassword, config);
      const verificationSalt = generateSalt();
      const encryptionSalt = generateSalt();
      const hkdfSalt = generateSalt();
      const masterPasswordHash = await hashPasswordForVerification(newPassword, verificationSalt);
      const nextConfig = mergeConfig({
        ...config,
        masterPasswordHash,
        verificationSalt,
        encryptionSalt,
        hkdfSalt,
      });
      const newKey = await deriveExpandedKey(newPassword, nextConfig);
      const nextNotes = await reencryptNotesForKeyChange(notes, oldKey, newKey);

      onUpdateNotes(nextNotes);
      saveSecurityConfig(nextConfig);
      setSecurityConfig(nextConfig);
      setEncryptionKey(newKey);
      setIsAuthenticated(true);
      addAuditEntry('password-changed', 'Master password was updated successfully.');

      return { success: true };
    } catch (changeError) {
      const message = changeError?.message || 'Unable to change password.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerateRecoveryCodes = React.useCallback(async (password) => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.setupComplete) {
        throw new Error('Security has not been set up yet.');
      }

      const isValid = await verifyPassword(password, config);
      if (!isValid) {
        throw new Error('Current password is incorrect.');
      }

      const recoveryCodes = generateRecoveryCodes(10).map((code) => ({ code, used: false }));
      const nextConfig = {
        ...config,
        recoveryCodes,
      };

      saveSecurityConfig(nextConfig);
      setSecurityConfig(nextConfig);
      addAuditEntry('recovery-codes-regenerated', 'Recovery codes were regenerated.');
      return { success: true, recoveryCodes };
    } catch (recoveryError) {
      const message = recoveryError?.message || 'Unable to regenerate recovery codes.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePreferences = React.useCallback((preferences) => {
    const config = mergeConfig(loadSecurityConfig());
    if (!config) {
      return;
    }

    const nextConfig = {
      ...config,
      preferences: {
        ...config.preferences,
        ...preferences,
      },
    };

    saveSecurityConfig(nextConfig);
    setSecurityConfig(nextConfig);
    addAuditEntry('preferences-updated', JSON.stringify(preferences));
  }, []);

  const changeAlgorithm = React.useCallback(async (password, algorithm, notes = [], onUpdateNotes = () => {}) => {
    setIsLoading(true);
    setError('');

    try {
      const config = mergeConfig(loadSecurityConfig());
      if (!config?.setupComplete) {
        throw new Error('Security has not been set up yet.');
      }
      if (algorithm === config.algorithm) {
        return { success: true };
      }

      const isValid = await verifyPassword(password, config);
      if (!isValid) {
        throw new Error('Current password is incorrect.');
      }

      const oldKey = await deriveExpandedKey(password, config);
      const nextConfig = {
        ...config,
        algorithm,
      };
      const newKey = await deriveExpandedKey(password, nextConfig);
      const nextNotes = await reencryptNotesForKeyChange(notes, oldKey, newKey);

      onUpdateNotes(nextNotes);
      saveSecurityConfig(nextConfig);
      setSecurityConfig(nextConfig);
      setEncryptionKey(newKey);
      addAuditEntry('algorithm-changed', `Encryption algorithm changed to ${algorithm}.`);
      return { success: true };
    } catch (algorithmError) {
      const message = algorithmError?.message || 'Unable to change encryption algorithm.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerBiometricCredential = React.useCallback((credentialId) => {
    const config = mergeConfig(loadSecurityConfig());
    if (!config) {
      return;
    }

    const nextConfig = {
      ...config,
      biometricCredentialId: credentialId,
    };

    saveSecurityConfig(nextConfig);
    setSecurityConfig(nextConfig);
    addAuditEntry('biometric-registered', 'Biometric credential was registered.');
  }, []);

  const clearBiometricCredential = React.useCallback(() => {
    const config = mergeConfig(loadSecurityConfig());
    if (!config) {
      return;
    }

    const nextConfig = {
      ...config,
      biometricCredentialId: null,
    };

    saveSecurityConfig(nextConfig);
    setSecurityConfig(nextConfig);
    addAuditEntry('biometric-cleared', 'Biometric credential was removed.');
  }, []);

  const clearAllSecurityData = React.useCallback(() => {
    clearSecurityConfig();
    saveAuditLog([]);
    setSecurityConfig(null);
    setIsSetupComplete(false);
    setIsAuthenticated(false);
    setEncryptionKey(null);
    setError('');
  }, []);

  const getEncryptionKey = React.useCallback(() => encryptionKey, [encryptionKey]);

  return {
    isSetupComplete,
    isAuthenticated,
    encryptionKey,
    isLoading,
    error,
    securityConfig,
    setupMasterPassword,
    login,
    loginWithRecoveryCode,
    loginWithBiometric,
    logout,
    lock: logout,
    changePassword,
    regenerateRecoveryCodes,
    updatePreferences,
    changeAlgorithm,
    registerBiometricCredential,
    clearBiometricCredential,
    clearAllSecurityData,
    deriveEncryptionKeyFromPassword,
    getEncryptionKey,
    refreshConfig,
  };
}

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}
