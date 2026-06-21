# 📝 Notes App

A simple, clean note-taking application built with **React** and **JavaScript**. Notes are persisted automatically using the browser's **localStorage** — no backend required.

---

## Features

- ✅ **Create** new notes with a single click
- ✏️ **Edit** notes with an auto-saving editor
- 🗑️ **Delete** notes (with confirmation prompt)
- 💾 **Persist** notes in `localStorage` across sessions
- 📱 **Responsive** layout — works on desktop and mobile
- 🎨 Clean, minimal UI

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Framework  | React 18 (Create React App)   |
| Language   | JavaScript (ES6+)             |
| State      | React Hooks (`useState`, `useEffect`) |
| Persistence| Browser `localStorage` API    |
| Styling    | CSS (no external UI library)  |

---

## Project Structure

```
bug-free-enigma/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   ├── NoteEditor.js   # Editor panel (title + body)
│   │   ├── NoteItem.js     # Single note in the sidebar list
│   │   └── NoteList.js     # Sidebar note list
│   ├── hooks/
│   │   └── useNotes.js     # Custom hook — CRUD + localStorage
│   ├── App.js              # Root component
│   ├── App.css             # Application styles
│   ├── index.js            # React entry point
│   └── index.css           # Global reset / base styles
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

The optimised output is placed in the `build/` folder and can be served by any static host.

---

## Usage

| Action          | How to do it                                       |
|-----------------|----------------------------------------------------|
| Create a note   | Click **+ New Note** in the header                |
| Select a note   | Click any note in the left sidebar                |
| Edit a note     | Type in the title or body — saved automatically   |
| Delete a note   | Hover a note and click the 🗑 icon, then confirm  |

> Notes are saved to `localStorage` automatically 500 ms after you stop typing. Refreshing the page or reopening the browser will restore all your notes.

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
