# 📝 Notes App

A feature-rich note-taking application built with **React** and **JavaScript**. Notes are persisted automatically using the browser's **localStorage** — no backend required.

---

## Features

- ✅ **Create / Edit / Delete** notes with auto-save
- 💾 **Persist** notes in `localStorage` across sessions
- 🔐 **Note Encryption** — password-protect individual notes using the Web Crypto API (AES-GCM)
- 🌙 **Dark Mode** — toggle between light and dark themes, persisted to `localStorage`
- 🔍 **Search & Filter** — real-time search by title and content
- 🏷️ **Tags / Categories** — add tags to notes, filter by tag in the sidebar
- 🕒 **Timestamps** — created and last-modified times with relative formatting ("2h ago")
- 📱 **Responsive** layout — works on desktop and mobile

---

## Tech Stack

| Layer      | Technology                                                  |
|------------|-------------------------------------------------------------|
| Framework  | React 18 (Create React App)                                 |
| Language   | JavaScript (ES6+)                                           |
| State      | React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`) |
| Encryption | Web Crypto API — PBKDF2 key derivation + AES-GCM-256        |
| Persistence| Browser `localStorage` API                                  |
| Styling    | CSS custom properties (dark/light theme variables)          |

---

## Project Structure

```
bug-free-enigma/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── NoteEditor.js       # Editor panel (title, content, tags, encryption)
│   │   ├── NoteItem.js         # Single note in the sidebar list
│   │   ├── NoteList.js         # Sidebar: search bar, tag filter, note list
│   │   └── PasswordModal.js    # Password prompt / set-password modal
│   ├── context/
│   │   └── ThemeContext.js     # Dark-mode React context
│   ├── hooks/
│   │   └── useNotes.js         # Custom hook — CRUD + localStorage
│   ├── utils/
│   │   └── encryption.js       # Web Crypto API helpers (encrypt / decrypt)
│   ├── App.js                  # Root component — layout, search & tag state
│   ├── App.css                 # Application styles (supports dark/light)
│   ├── index.js                # React entry point
│   └── index.css               # Global reset + CSS custom properties
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

| Action                 | How to do it                                                  |
|------------------------|---------------------------------------------------------------|
| Create a note          | Click **+ New Note** in the header                           |
| Select a note          | Click any note in the left sidebar                           |
| Edit a note            | Type in the title, tags, or body — saved automatically       |
| Delete a note          | Hover a note and click the 🗑 icon, then confirm             |
| Search notes           | Type in the search box at the top of the sidebar             |
| Filter by tag          | Click a tag chip in the sidebar tag bar                      |
| Add tags to a note     | Type comma-separated tags in the 🏷️ tags field              |
| Toggle dark mode       | Click 🌙 / ☀️ in the header                                |

---

## 🔐 Note Encryption

### How it works

Notes are encrypted using the **Web Crypto API** built into modern browsers — no third-party library required.

| Step | Detail |
|------|--------|
| Key derivation | **PBKDF2** with SHA-256, 100 000 iterations, random 16-byte salt |
| Encryption     | **AES-GCM** with a 256-bit key and random 12-byte IV            |
| Storage        | Encrypted ciphertext, IV, and salt are stored in `localStorage` as Base64 strings |
| Password       | **Never stored** — only used to derive the key at runtime        |

### Encrypting a note

1. Open any note in the editor.
2. Click the **🔐 Encrypt** button in the toolbar.
3. Enter a password and confirm it in the modal, then click **Encrypt Note**.
4. The note is immediately encrypted. A 🔐 lock icon appears in the sidebar list.

### Unlocking a note

1. Click an encrypted note (🔐) in the sidebar.
2. The editor shows a locked state.
3. Click **Unlock Note** and enter your password.
4. The content is decrypted in-memory and displayed in the editor.
5. Edits are automatically re-encrypted with the same password on save.

### Removing encryption

1. Unlock the note first (see above).
2. Click **🔓 Remove Encryption** in the toolbar.
3. Confirm the prompt — the note is saved as plain text.

> ⚠️ **Important:** Passwords are never stored anywhere. If you forget a note's password, the content **cannot be recovered**.

### Browser requirements

The Web Crypto API requires a **secure context** (HTTPS or localhost). The Encrypt button is hidden automatically if the API is unavailable.

---

## Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Start development server             |
| `npm run build` | Create optimised production build    |
| `npm test`      | Run test suite                       |

---

## License

MIT
