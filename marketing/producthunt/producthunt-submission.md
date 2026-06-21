# 📋 ProductHunt Submission Guide — Bug-Free Enigma

Complete form-filling guide with copy-paste-ready content for your ProductHunt submission.

---

## STEP-BY-STEP SUBMISSION WALKTHROUGH

### Step 1: Access the submission form

1. Go to [https://www.producthunt.com](https://www.producthunt.com)
2. Click your avatar → **"Submit a product"**
3. If you don't see the option your account needs to be 30+ days old and have engagement history (upvotes, comments).

---

## FIELD-BY-FIELD GUIDE

### 🏷 Product Name

```
Bug-Free Enigma
```

### 🔤 Tagline (60 characters max)

**Primary recommendation (45 chars):**

```
🔐 Secure notes with end-to-end encryption
```

**Alternatives to A/B test:**

| # | Tagline | Chars |
|---|---------|-------|
| 1 | 🔐 Secure notes with end-to-end encryption | 45 |
| 2 | Encrypted notes app — no server, no account | 44 |
| 3 | Your notes. Encrypted. Offline. Free forever. | 46 |
| 4 | AES-256 encrypted notes — no backend required | 46 |
| 5 | Privacy-first notes powered by Web Crypto API | 47 |
| 6 | End-to-end encrypted notes — open source & free | 48 |
| 7 | Lock your thoughts with military-grade crypto | 46 |

### 🌐 Website URL

```
https://jvzhu.github.io/bug-free-enigma/
```

### 📂 Category

Select: **Productivity** (primary)

Additional topics (select up to 5):
- `productivity`
- `security`
- `privacy`
- `open-source`
- `developer-tools`

---

## 📝 DESCRIPTION (copy-paste ready)

```
Bug-Free Enigma is a fully-featured, open-source note-taking application that
keeps your data private by encrypting everything inside your own browser —
no server, no account, no data collection.

🔐 True End-to-End Encryption
Every note is encrypted using AES-GCM-256 powered by the browser's built-in
Web Crypto API. Your master password is never stored — it's used to derive an
encryption key via PBKDF2 (100,000 iterations + random salt) and HKDF. Even if
someone stole your device's localStorage, they'd find nothing but encrypted
ciphertext.

✨ Everything You Expect From a Notes App
• Create, edit, and delete notes with autosave (debounced 500 ms)
• Real-time search across titles and content
• Tag-based filtering — add comma-separated tags to any note
• Dark mode / light mode toggle (persisted to localStorage)
• Export notes as encrypted JSON or plain Markdown
• Import notes back from any exported file
• Encrypted shareable links — share a note with end-to-end encryption
• Batch operations — select multiple notes and encrypt/decrypt/delete at once
• Toast notifications and keyboard shortcuts

🛡️ Enterprise-Grade Security Features
• Master password with real-time entropy-based strength meter
• Biometric authentication via WebAuthn (fingerprint / Face ID — HTTPS only)
• Session auto-lock after configurable inactivity (5 / 10 / 15 / 30 min)
• 2-minute visual warning before lock
• 10 single-use recovery codes for emergency account access
• Full audit trail — every security-relevant action is timestamped and logged
• Security dashboard — one panel for all settings

🆓 Free Forever, Open Source
All features available completely free. Full source code on GitHub (MIT licence)
— inspect, fork, and self-host it however you like.

🚀 No Install Required
Open https://jvzhu.github.io/bug-free-enigma/ in any modern browser. No sign-up.
No download. Start taking private notes in seconds.

Built with React 18 + Web Crypto API. 23 unit tests. Zero external crypto
dependencies. Deployed on GitHub Pages.
```

---

## 🖼 IMAGE SPECIFICATIONS

### Thumbnail (required)

| Spec | Value |
|------|-------|
| Size | 240 × 240 px |
| Format | PNG (transparent or dark background) |
| Content | App logo / lock icon + product name |

**Design brief:**
```
Background:  #1a1a2e (dark navy)
Primary icon: 🔐 lock padlock, centered, ~80 px
Text line 1 (top): "Bug-Free Enigma" — white, bold, ~18 px
Text line 2 (bottom): "Secure Notes"  — #7c85ff (purple), ~13 px
Corner accent: subtle gradient #7c85ff → #4fc3f7 (bottom-right)
```

**Quick tools:**
- [Figma](https://figma.com) — best quality control
- [Canva](https://canva.com) — 240 × 240 canvas, fastest
- [Screely](https://screely.com) — wrap screenshots in browser chrome

### Gallery Images (recommended: 5–8)

| Spec | Value |
|------|-------|
| Size | 1270 × 760 px |
| Format | PNG or JPG |
| Max per upload | 8 images |

**Recommended gallery order:**

| # | Filename | What to capture |
|---|----------|----------------|
| 1 | `01-hero-dark.png` | App open, sidebar with 3–4 notes, dark mode active |
| 2 | `02-encryption-flow.png` | Password modal + locked note icon |
| 3 | `03-security-dashboard.png` | Security settings panel fully visible |
| 4 | `04-search-tags.png` | Search bar active, tag chips shown |
| 5 | `05-export-import.png` | Export dialog + downloaded JSON file |
| 6 | `06-biometric.png` | WebAuthn / biometric authentication screen |
| 7 | `07-share-encrypted.png` | Encrypted share link dialog |
| 8 | `08-mobile.png` | App on 375 px viewport in iPhone frame |

**Screenshot tools:**
- Browser DevTools (F12 → Device toolbar) for mobile view
- [Screely](https://screely.com) for browser-framed screenshots
- [CleanShot X](https://cleanshot.com) (macOS) for polished captures

---

## 🎬 VIDEO GUIDELINES

| Spec | Recommended |
|------|-------------|
| Duration | 60–90 seconds |
| Format | MP4 (H.264) |
| Resolution | 1920 × 1080 (1080p) |
| Max file size | 50 MB |

**Suggested script (60 seconds):**

```
0:00–0:05  Open with the problem: "Most note apps send your data to servers"
0:05–0:15  Show the app opening — no login required, instant access
0:15–0:25  Type a note, show autosave, show real-time search
0:25–0:35  Demonstrate encryption: lock note, show ciphertext, unlock
0:35–0:45  Show security dashboard: biometric setup, session lock
0:45–0:55  Show export (Markdown) and encrypted share link
0:55–1:00  End card: URL + "Free forever. Open source."
```

**Recording tools:**
- [Loom](https://loom.com) — fastest, auto-uploads
- [OBS Studio](https://obsproject.com) — free, local
- [Screenflow](https://telestream.net/screenflow) (macOS) — polished editing

---

## ✅ PRE-SUBMISSION CHECKLIST

### Account Requirements
- [ ] ProductHunt account is 30+ days old
- [ ] Account has engaged with community (5+ upvotes, 1+ comment)
- [ ] Profile photo is uploaded
- [ ] Twitter/X linked to ProductHunt profile

### Assets Ready
- [ ] Thumbnail (240 × 240 px PNG)
- [ ] Gallery images (1270 × 760 px, 5–8 images)
- [ ] Demo video (optional but recommended, 60–90 sec)
- [ ] All images reviewed — no blurry or cut-off content

### Copy Ready
- [ ] Product name confirmed: "Bug-Free Enigma"
- [ ] Tagline selected (≤ 60 chars, tested)
- [ ] Description proofread (no typos, links working)
- [ ] Category selected: Productivity + up to 4 additional topics
- [ ] Maker first comment drafted (see `producthunt-first-comment.md`)

### Technical Checks
- [ ] Website URL live and loading: `https://jvzhu.github.io/bug-free-enigma/`
- [ ] GitHub URL live: `https://github.com/jvzhu/bug-free-enigma`
- [ ] All links in description working
- [ ] App tested end-to-end (create note, encrypt, export, import)

### Scheduling
- [ ] Launch date chosen (avoid weekends; Tuesday–Thursday optimal)
- [ ] Launch time set: **12:01 AM PST** on launch day
- [ ] Time zone confirmed (PST = UTC-8 / PDT = UTC-7)

---

## 📅 POST-APPROVAL STEPS

Once ProductHunt approves your submission:

1. **Copy your ProductHunt URL** and update all scheduled social posts
2. **Post your maker first comment** immediately after the listing goes live
3. **Send launch email** to your waitlist (see `email-automation.md`)
4. **Activate social blitz** (see `social-coordination.md`)
5. **Begin monitoring** (see `monitoring-dashboard.md`)

---

## ⚠️ RULES TO FOLLOW (ProductHunt Guidelines)

- ✅ Post genuine comments and encourage authentic engagement
- ✅ Respond to every comment within 30 minutes during launch day
- ✅ Share your ProductHunt link publicly on social media
- ❌ Do NOT ask people to upvote — ask them to "check it out" or "share feedback"
- ❌ Do NOT use vote-exchange groups or paid upvote services
- ❌ Do NOT create fake accounts to upvote
- ❌ Do NOT delete or edit comments to hide criticism
