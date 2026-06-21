import React from 'react';
import { bufferToBase64 } from '../utils/crypto';

function BiometricSetup({ onSetupComplete, onCancel }) {
  const [isSupported, setIsSupported] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsSupported(Boolean(navigator.credentials && window.PublicKeyCredential));
  }, []);

  const handleRegister = async () => {
    if (!isSupported) {
      setError('WebAuthn is not supported on this device.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const userId = crypto.getRandomValues(new Uint8Array(16));
      const hostname = window.location.hostname;
      const isIPv4Address = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);
      const isDomainName = hostname.includes('.') && !isIPv4Address;
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: 'Notes App',
            ...(isDomainName ? { id: hostname } : {}),
          },
          user: {
            id: userId,
            name: 'notes-user',
            displayName: 'Notes App User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          timeout: 60000,
          attestation: 'none',
          authenticatorSelection: {
            residentKey: 'preferred',
            userVerification: 'preferred',
          },
        },
      });

      if (!credential) {
        throw new Error('Credential registration was cancelled.');
      }

      onSetupComplete?.(bufferToBase64(credential.rawId));
    } catch (setupError) {
      setError(setupError?.message || 'Biometric setup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Biometric Setup</h3>
        <p>Register a fingerprint or face unlock credential for limited-mode access.</p>
        {!isSupported && <p className="form-error">WebAuthn is unavailable in this browser.</p>}
        {error && <p className="form-error">{error}</p>}
        <div className="button-row">
          <button className="btn btn-biometric" type="button" onClick={handleRegister} disabled={!isSupported || isLoading}>
            {isLoading ? 'Registering…' : 'Register Fingerprint / Face ID'}
          </button>
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BiometricSetup;
