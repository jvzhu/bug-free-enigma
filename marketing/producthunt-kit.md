# 🚀 Bug-Free Enigma — ProductHunt Launch Kit

Complete, copy-paste-ready assets for your ProductHunt submission.

---

## 1. Tagline (≤ 60 characters)

```
Secure, encrypted notes — right in your browser
```

**Alternatives (A/B test):**

| # | Tagline | Chars |
|---|---------|-------|
| 1 | Secure, encrypted notes — right in your browser | 48 |
| 2 | End-to-end encrypted notes with zero backend | 45 |
| 3 | Private notes powered by the Web Crypto API | 44 |
| 4 | AES-256 encrypted notes — no server required | 45 |
| 5 | The note-taking app that your browser secures | 47 |
| 6 | Your notes. Encrypted. Offline. Free forever. | 46 |
| 7 | Lock your thoughts with military-grade crypto | 46 |
| 8 | Encrypted notes app — open-source & free | 41 |
| 9 | Privacy-first notes powered by Web Crypto | 42 |
| 10 | One password. All notes. Zero compromises. | 43 |

---

## 2. Product Description (500 words)

```markdown
Bug-Free Enigma is a fully-featured, open-source note-taking application
that keeps your data private by encrypting everything inside your own browser
— no server, no account, no data collection.

**🔐 True End-to-End Encryption**
Every note is encrypted using AES-GCM-256 powered by the browser's built-in
Web Crypto API. Your master password is never stored — it's used to derive an
encryption key via PBKDF2 (100,000 iterations + random salt) and HKDF. Even
if someone stole your device's localStorage, they'd find nothing but encrypted
ciphertext.

**✨ Everything You Expect From a Notes App**
- Create, edit, and delete notes with autosave (debounced 500 ms)
- Real-time search across titles and content
- Tag-based filtering — add comma-separated tags to any note
- Dark mode / light mode toggle (persisted to localStorage)
- Export notes as encrypted JSON or plain Markdown
- Import notes back from any exported file
- Encrypted shareable links — share a note with end-to-end encryption
- Batch operations — select multiple notes and encrypt/decrypt/delete at once
- Toast notifications and keyboard shortcuts

**🛡️ Enterprise-Grade Security Features**
- Master password with real-time entropy-based strength meter
- Biometric authentication via WebAuthn (fingerprint / Face ID — HTTPS only)
- Session auto-lock after configurable inactivity (5 / 10 / 15 / 30 min)
- 2-minute visual warning before lock
- 10 single-use recovery codes for emergency account access
- Full audit trail — every security-relevant action is timestamped and logged
- Security dashboard — one panel for all settings

**🆓 Free Forever, Open Source**
All features are available completely free. The full source code is on GitHub
(MIT licence) — inspect, fork, and self-host it however you like.

**🚀 No Install Required**
Open https://jvzhu.github.io/bug-free-enigma/ in any modern browser.
No sign-up. No download. Start taking private notes in seconds.

Built with React 18 + Web Crypto API. 23 unit tests. Zero external crypto
dependencies. Deployed on GitHub Pages.
```

---

## 3. Maker's First Comment

```markdown
Hey Product Hunt! 👋 I'm the maker of Bug-Free Enigma.

I built this because I was frustrated with cloud-based note apps asking for
my email, syncing data to unknown servers, and charging monthly fees for
features I barely used. I wanted something that was:

✅ Completely private (no backend at all)
✅ Actually secure (real cryptography, not security theater)
✅ Free — forever, no strings attached
✅ Open source — inspect every line

So I built it.

**The interesting part:** All encryption runs inside your browser using the
native Web Crypto API. There's no server involved at any step. Your master
password is never stored — it's used to derive an AES-GCM-256 key on the fly
via PBKDF2 + HKDF each time you log in.

**What surprised me building this:**
- WebAuthn (biometric auth) is genuinely powerful and surprisingly
  underused in web apps
- PBKDF2 with 100k iterations is noticeably slow on older hardware — in a
  good way (makes brute force impractical)
- Building a session auto-lock with an inactivity timer that works correctly
  across browser tabs is trickier than it looks!

I'd love to know what features you'd find most valuable. What's missing from
your ideal private notes app?

Happy to answer any questions about the crypto implementation, architecture
decisions, or anything else. 🙏

**Try it now:** https://jvzhu.github.io/bug-free-enigma/
**Source code:** https://github.com/jvzhu/bug-free-enigma
```

---

## 4. Thumbnail Instructions (240 × 240 px)

File: `ph-thumbnail.md`

**Design brief for the 240 × 240 thumbnail:**

```
Background: #1a1a2e (dark navy)
Icon: 🔐 lock emoji or custom SVG padlock in center
Text line 1 (top): "Bug-Free Enigma"  — white, bold, ~18px
Text line 2 (bottom): "Secure Notes"  — #7c85ff (purple), ~13px
Corner accent: subtle gradient from #7c85ff → #4fc3f7 (bottom-right)
Size: 240 × 240 px, PNG, transparent or dark bg
```

**Quick option:** Use [Figma Community — ProductHunt Thumbnail Template](https://www.figma.com/community)
or [Canva](https://www.canva.com) with a 240 × 240 canvas.

---

## 5. Gallery Screenshots (ph-images/)

Recommended 6-image gallery (1270 × 760 px each):

| # | Screenshot | What to show |
|---|-----------|--------------|
| 1 | **Hero / Sidebar** | App open with 3–4 notes in sidebar, dark mode |
| 2 | **Encryption flow** | Password modal + locked note icon |
| 3 | **Security Dashboard** | All security settings visible |
| 4 | **Search + Tags** | Search bar active, tag chips shown |
| 5 | **Export / Import** | Export dialog + downloaded JSON |
| 6 | **Mobile view** | App on 375 px viewport (iPhone frame) |

**Tool:** Use your browser DevTools (F12 → device toolbar) for mobile screenshot.
**Frame tool:** [Screely](https://screely.com) for nice browser chrome wrapping.

---

## 6. Topics / Tags

Select these on ProductHunt:

- `productivity`
- `security`
- `privacy`
- `open-source`
- `developer-tools`

---

## 7. Links Checklist

- [ ] Website URL: `https://jvzhu.github.io/bug-free-enigma/`
- [ ] GitHub: `https://github.com/jvzhu/bug-free-enigma`
- [ ] ProductHunt submission URL (fill in after posting)
- [ ] Twitter/X: _(add your handle)_

---

## 8. Submission Checklist

- [ ] Thumbnail uploaded (240 × 240 px)
- [ ] 6 gallery images uploaded (1270 × 760 px)
- [ ] Tagline finalised (≤ 60 chars)
- [ ] Description proofread
- [ ] Maker comment drafted and ready to post immediately after launch
- [ ] Website URL correct and live
- [ ] Topics selected (max 5)
- [ ] Scheduled for **12:01 AM PST** on launch day
- [ ] Support network briefed to visit and upvote
- [ ] Social posts queued
- [ ] Email to waitlist ready
