# 📝 Notes App

A secure note-taking application built with **React** and **JavaScript**. Notes are persisted automatically using the browser's **localStorage** — no backend required. Features enterprise-grade encryption and authentication powered entirely by the browser's **Web Crypto API**.

---

## Features

- ✅ **Create** new notes with a single click
- ✏️ **Edit** notes with an auto-saving editor
- 🗑️ **Delete** notes (with confirmation prompt)
- 💾 **Persist** notes in `localStorage` across sessions
- 📱 **Responsive** layout — works on desktop and mobile
- 🎨 Clean, minimal UI

### 🔐 Security Features

- **Master Password** — single password protects all notes; strength enforced (minimum "Fair" entropy)
- **AES-GCM Encryption** — per-note encryption using the Web Crypto API (AES-GCM-256 or AES-GCM-128)
- **PBKDF2 Key Derivation** — 100,000 iterations with a random salt; password never stored in plain text
- **HKDF Key Expansion** — derived key is further expanded with HKDF for data encryption
- **Password Strength Meter** — real-time entropy-based feedback during password entry
- **Biometric Authentication** — WebAuthn (fingerprint / Face ID) registration and login (HTTPS only)
- **Recovery Codes** — 10 single-use codes generated on setup; can be reprinted or regenerated at any time
- **Session Auto-Lock** — configurable inactivity timeout (5 / 10 / 15 / 30 min) with a 2-minute warning
- **Batch Encrypt / Decrypt** — select multiple notes and encrypt or decrypt them in one action with a progress indicator
- **Encrypted Export** — download all notes as an AES-GCM-encrypted JSON file
- **Audit Trail** — timestamped log of every security-relevant action (login, encrypt, export, …)
- **Security Dashboard** — single panel for all settings: algorithm, session timeout, recovery codes, biometric

---

## Tech Stack

| Layer        | Technology                                        |
|--------------|--------------------------------------------------|
| Framework    | React 18 (Create React App)                      |
| Language     | JavaScript (ES6+)                                |
| State        | React Hooks (`useState`, `useEffect`, context)   |
| Persistence  | Browser `localStorage` API                       |
| Cryptography | Web Crypto API (`crypto.subtle`)                 |
| Styling      | CSS (no external UI library)                     |

---

## Project Structure

```
bug-free-enigma/
├── public/
│   └── index.html                  # HTML entry point
├── src/
│   ├── components/
│   │   ├── AuditTrailViewer.js     # Audit log viewer
│   │   ├── AuthGate.js             # Login / lock screen
│   │   ├── BatchOperationsPanel.js # Bulk encrypt/decrypt UI
│   │   ├── BiometricSetup.js       # WebAuthn biometric setup
│   │   ├── ChangePasswordModal.js  # Change master password dialog
│   │   ├── MasterPasswordSetup.js  # First-time setup wizard
│   │   ├── NoteEditor.js           # Editor panel (title + body + encrypt)
│   │   ├── NoteItem.js             # Single note in the sidebar list
│   │   ├── NoteList.js             # Sidebar note list
│   │   ├── PasswordStrengthMeter.js# Entropy-based strength indicator
│   │   ├── RecoveryCodesModal.js   # View / regenerate recovery codes
│   │   ├── SecurityPanel.js        # Security settings side panel
│   │   └── SessionWarningModal.js  # Auto-lock countdown warning
│   ├── hooks/
│   │   ├── useAuth.js              # Auth state + AuthProvider / AuthContext
│   │   ├── useNotes.js             # CRUD + per-note encrypt/decrypt
│   │   └── useSession.js           # Inactivity timer and auto-lock
│   ├── utils/
│   │   ├── crypto.js               # Web Crypto API helpers
│   │   ├── crypto.test.js          # Unit tests for crypto utilities
│   │   ├── fileDownload.js         # Shared file-download helper
│   │   └── securityStorage.js      # Security config + audit log persistence
│   ├── App.js                      # Root component
│   ├── App.css                     # Application styles
│   ├── index.js                    # React entry point
│   └── index.css                   # Global reset / base styles
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jvzhu/bug-free-enigma.git
cd bug-free-enigma

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens automatically at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

The optimized output is placed in the `build/` folder and can be served by any static host.

---

## Usage

| Action                  | How to do it                                                  |
|-------------------------|--------------------------------------------------------------|
| Create a note           | Click **+ New Note** in the header                          |
| Select a note           | Click any note in the left sidebar                          |
| Edit a note             | Type in the title or body — saved automatically             |
| Delete a note           | Hover a note and click the 🗑 icon, then confirm            |
| Encrypt a note          | Open a note → click **🔒 Encrypt** (requires auth)         |
| Decrypt a note          | Click **🔓 Decrypt** on an encrypted note                  |
| Batch encrypt/decrypt   | Click **🗂 Batch Ops** in the header                       |
| Security settings       | Click **🔐 Security** in the header                        |

> Notes are saved to `localStorage` automatically 500 ms after you stop typing. Refreshing the page or reopening the browser will restore all your notes.

---

## Security Architecture

### Key Derivation

```
Master Password + Salt
        │
        ▼  PBKDF2 (SHA-256, 100 000 iterations)
   Master Key (AES-GCM)
        │
        ▼  HKDF (SHA-256, info="notes-app-data")
  Encryption Key  ──▶  AES-GCM encrypt/decrypt notes
```

### Data Storage (localStorage)

| Key                     | Contents                                                  |
|-------------------------|----------------------------------------------------------|
| `notes-app-data`        | Array of note objects (encrypted notes store ciphertext) |
| `notes-security-config` | PBKDF2 hash, salts, algorithm, recovery codes, prefs     |
| `notes-audit-log`       | Timestamped security action log (max 1 000 entries)      |

> **Nothing sensitive is stored in plain text.** Passwords are never persisted; the encryption key lives only in React state and is lost on page reload, requiring re-authentication.

### Security Considerations

- Uses the browser's `crypto.subtle` API exclusively — no third-party crypto dependencies.
- PBKDF2 with a unique random salt and 100 000 iterations slows brute-force attacks.
- Each note is encrypted with a fresh random IV; IVs are stored alongside the ciphertext.
- Biometric authentication (WebAuthn) requires HTTPS and a compatible authenticator device.
- The auto-lock timer clears the in-memory key after a configurable period of inactivity.
- Recovery-code login grants limited access (no encryption key) to allow password reset only.

---

## Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Start development server             |
| `npm run build` | Create optimised production build    |
| `npm test`      | Run test suite                       |

---

## Deployment

### 🚀 GitHub Pages (Automatic)

The app is automatically deployed to GitHub Pages on every push to the `main` branch via a GitHub Actions workflow.

**Live demo:** [https://jvzhu.github.io/bug-free-enigma/](https://jvzhu.github.io/bug-free-enigma/)

**How it works:**
1. Every push to `main` triggers `.github/workflows/deploy.yml`
2. The workflow installs dependencies, runs `npm run build`, and pushes the `build/` folder to the `gh-pages` branch
3. GitHub Pages serves the site from that branch

**First-time setup:**
1. Go to your repository **Settings → Pages**
2. Under *Source*, select **Deploy from a branch**
3. Choose the `gh-pages` branch and `/ (root)` folder
4. Click **Save** — your site will be live at the URL above

---

### ⚡ Vercel

**Live demo:** [https://bug-free-enigma.vercel.app/](https://bug-free-enigma.vercel.app/)

**Option A — Import via Vercel dashboard (recommended):**
1. Log in at [vercel.com](https://vercel.com) and click **Add New → Project**
2. Import the `jvzhu/bug-free-enigma` repository from GitHub
3. Vercel auto-detects Create React App and uses the settings from `vercel.json`
4. Click **Deploy** — Vercel builds and hosts the app automatically

**Option B — Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Automatic re-deployments:** Once the project is connected, every push to `main` triggers a new production deployment.

---

### 🌐 Custom Domain (optional)

- **GitHub Pages:** Settings → Pages → Custom domain
- **Vercel:** Project → Settings → Domains → Add

---

### ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and adjust values as needed:

```bash
cp .env.example .env.local
```

Environment variables prefixed with `REACT_APP_` are automatically embedded into the build by Create React App.

---

## License

MIT
