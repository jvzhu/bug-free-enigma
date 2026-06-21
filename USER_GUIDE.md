# User Guide

## Getting started
1. Install dependencies with `npm install`.
2. Start the app with `npm start`.
3. Create your first note with **+ New Note**.
4. Optionally configure a master password in **Security**.

## Core note workflow
- Create notes from the header.
- Select notes from the sidebar.
- Edit title and content in the editor.
- Delete notes with the trash button.
- Notes auto-save as you type.

## Security features
- Set a master password to protect encrypted features.
- Encrypt individual notes from the editor.
- Use batch encrypt/decrypt in **Batch Ops**.
- Enable biometric login when supported.
- Save recovery codes for emergency access.
- Review the audit trail from the security panel.

## Export and import
- Export plain JSON or Markdown from **Security**.
- Export encrypted JSON for secure transport or backup.
- Import `.json`, `.md`, or `.markdown` files from **📥 Import**.
- You can also paste exported text directly into the import modal.

## Sharing notes
- Use **🔗 Share** to create a shareable URL.
- Unencrypted notes are visible in the URL contents.
- Encrypted notes keep their encrypted payload and require the password to decrypt after import.

## Batch operations
- Select many notes in **🗂 Batch Ops**.
- Encrypt or decrypt selected notes.
- Apply a tag to multiple notes at once.
- Delete selected notes with confirmation.

## Dark mode
Use the **🌙 Dark / ☀️ Light** toggle in the header. Your preference is saved locally.

## Keyboard shortcuts reference
Open **❓ Help** to see:
- Ctrl+N
- Ctrl+S
- Ctrl+F
- Escape
- Ctrl+E
- Ctrl+/

## Troubleshooting / FAQ
### Why is my encrypted note blank in exports?
If a note is currently locked, only its encrypted payload is stored. Decrypt it before creating a plain export if you want readable content.

### I forgot my password. What can I do?
Use an unused recovery code to regain limited access, then rotate your password.

### Why can’t I decrypt?
Make sure you are using the correct master password and that the encrypted data has not been corrupted.
