# Security

## Security architecture overview
This app stores notes locally in the browser and protects access with a master password, optional biometric login, recovery codes, and session locking. Plain notes are stored in localStorage. Encrypted notes are stored as AES-GCM payloads and only decrypted with a password-derived key inside the browser.

## Encryption specifications
- AES-GCM-256 for note encryption by default
- AES-GCM-128 optional compatibility mode
- PBKDF2-SHA-256 with 100,000 iterations for password-based key derivation
- HKDF-SHA-256 for context-specific key expansion
- Random 16-byte salts and 12-byte IVs generated with the Web Crypto API

## Key derivation diagram
```text
Master Password
   |
   +--> PBKDF2-SHA-256 (100,000 iterations, encryption salt)
   |        |
   |        +--> AES master key
   |
   +--> PBKDF2-SHA-256 (100,000 iterations, verification salt)
            |
            +--> Verification hash

AES master key
   |
   +--> HKDF-SHA-256 (hkdf salt, info="notes-app-data")
            |
            +--> AES-GCM working key used for note encryption/decryption
```

## What is stored
### Stored locally
- Notes data in localStorage
- Encrypted note payloads (`ciphertext`, `iv`, algorithm metadata)
- Password verification hash and salts
- HKDF salt and selected algorithm
- Recovery codes and biometric credential ID metadata
- Audit log entries
- UI preferences such as session timeout and dark mode

### Not stored
- The raw master password
- Decrypted encryption keys outside the active browser session
- Server-side copies of notes or credentials
- Remote analytics or telemetry for note contents

## Threat model
This app is designed to reduce exposure from casual local access, shoulder surfing, and accidental disclosure of sensitive notes on a shared device. It does **not** protect against a fully compromised browser, malicious extensions, OS-level malware, or a user sharing an unencrypted export or URL.

## Security best practices for users
- Choose a long, unique master password.
- Store recovery codes offline in a secure location.
- Use biometric login only on trusted personal devices.
- Lock the app when stepping away from your computer.
- Prefer encrypted notes for sensitive content.
- Share only encrypted notes when possible.
- Review exported files before distributing them.
- Clear browser storage before giving away or reusing a device.
