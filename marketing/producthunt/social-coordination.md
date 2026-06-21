# 📢 Social Media Coordination Plan — Bug-Free Enigma

Coordinated multi-platform social media plan for launch day.
All posts are copy-paste ready. Customize `[PH_LINK]` before posting.

---

## TWITTER / X THREADS

Post these in sequence throughout launch day. Times are PST.

### 🐦 Tweet #1 — Launch Announcement (12:01 AM PST)

```
🚀 It's live! Bug-Free Enigma just launched on @ProductHunt!

Encrypted notes app that runs 100% in your browser — no backend, no account,
no data collection. Your password never leaves your device.

Check it out 👇
[PH_LINK]

#buildinpublic #privacy #security #react #webdev
```

---

### 🐦 Tweet #2 — Technical Thread (12:30 AM PST)

**Post this as a thread (reply to Tweet #1):**

```
🧵 How does the encryption actually work? A quick thread:

1/ Every note is encrypted using AES-GCM-256 — the same cipher used by
   banks and militaries. But we're not running it on a server. We're running
   it INSIDE YOUR BROWSER using the native Web Crypto API.
```

```
2/ When you set a master password, we derive an encryption key using:
   • PBKDF2 with 100,000 iterations (makes brute-force impractical)
   • SHA-256 hash function
   • A random salt (different for every user)

   Your password is never stored. The key is never stored. Gone when you close
   the tab.
```

```
3/ When you save a note:
   → Note text → AES-GCM-256 encrypt with your key
   → Encrypted ciphertext stored in localStorage
   → Random IV (initialization vector) stored alongside

   An attacker who steals your localStorage sees only gibberish. 🔐
```

```
4/ Biometric login via WebAuthn (fingerprint / Face ID):
   • Uses your device's secure enclave
   • Credential stored on-device, never transmitted
   • Works on iOS Safari, Android Chrome, and desktop browsers

   Touch ID to unlock your notes. Pretty cool for a web app. 👆
```

```
5/ The full source code is on GitHub (MIT licence):
   https://github.com/jvzhu/bug-free-enigma

   Zero external crypto dependencies — everything uses the browser's built-in
   SubtleCrypto API, audited by browser vendors.

   Inspect every line. Fork it. Self-host it. 🛠️
```

```
6/ Try it now — no install, no account, no backend:
   https://jvzhu.github.io/bug-free-enigma/

   And if you're on ProductHunt today, I'd love your support:
   [PH_LINK]

   Questions? Drop them below 👇 #buildinpublic
```

---

### 🐦 Tweet #3 — Feature Spotlight: Encryption (6:00 AM PST)

```
🔐 Most note apps "secure" your data by promising not to look at it.

Bug-Free Enigma makes it cryptographically impossible to look at it.

AES-GCM-256 + PBKDF2 + HKDF — all running in your browser.
Zero backend. Zero trust required.

Try it: https://jvzhu.github.io/bug-free-enigma/
Support on PH: [PH_LINK]
```

---

### 🐦 Tweet #4 — Morning Update (8:00 AM PST)

```
Good morning! 🌅

Bug-Free Enigma has been live on ProductHunt for [X] hours and we're at:
• [N] upvotes
• Ranked #[N] today
• [N] new GitHub stars

Every piece of feedback is being read and noted. Thank you all 🙏

Still live today: [PH_LINK]
```

---

### 🐦 Tweet #5 — Feature Spotlight: WebAuthn (10:00 AM PST)

```
🤳 Did you know Bug-Free Enigma supports biometric login?

Fingerprint or Face ID to unlock your encrypted notes — using WebAuthn
(the same standard banks use for passwordless login).

Works in:
✅ iOS Safari (Face ID / Touch ID)
✅ Android Chrome (fingerprint)
✅ Desktop (Windows Hello, Touch ID on Mac)

Try it: https://jvzhu.github.io/bug-free-enigma/
```

---

### 🐦 Tweet #6 — Community Question (11:00 AM PST)

```
Quick question for privacy-conscious developers 👇

What stops you from using an encrypted notes app TODAY?

A. I trust my current app enough
B. I need cloud sync across devices
C. I need mobile apps (iOS/Android)
D. Something else (reply 👇)

Genuinely asking — this shapes the Bug-Free Enigma roadmap.
#devs #privacy #buildinpublic
```

---

### 🐦 Tweet #7 — Midday Update (12:00 PM PST)

```
🌞 Halfway through launch day — thank you ProductHunt!

• [N] upvotes
• #[N] ranking
• [N] people have tried Bug-Free Enigma today

The most asked question: "When is cloud sync available?"
Answer: Building it now. Firebase backend, client-side encrypted. ETA: 4–6 weeks.

Support the launch: [PH_LINK]
```

---

### 🐦 Tweet #8 — Open Source Focus (2:00 PM PST)

```
For all the open-source skeptics:

Bug-Free Enigma is MIT licensed. You can:
• Read the full source code
• Verify the encryption yourself
• Fork and self-host it
• Contribute features and fixes

No dark patterns. No hidden telemetry. No "trust me."

GitHub: https://github.com/jvzhu/bug-free-enigma ⭐
```

---

### 🐦 Tweet #9 — Momentum (4:00 PM PST)

```
🚀 [N] hours in, [N] upvotes, ranked #[N] on ProductHunt.

I built Bug-Free Enigma in [X] months as a solo developer. Seeing this
response is humbling and energizing.

The community has spoken:
☁️ Cloud sync → top of roadmap
📁 Folders → sprint 2
📱 Mobile → sprint 3

Let's build it together: [PH_LINK]
```

---

### 🐦 Tweet #10 — Final Push (8:00 PM PST)

```
Last few hours of the ProductHunt launch window! 🏁

If you believe privacy-first apps deserve more attention, now's the time:
[PH_LINK]

Every upvote helps more people discover Bug-Free Enigma.

Thank you to everyone who's supported today. You made this happen. 🙏 🔐
```

---

## LINKEDIN POSTS

### LinkedIn #1 — Professional Launch Announcement (8:00 AM PST)

```
🚀 I launched a product on ProductHunt today — and I want to share the
story of how it got built.

Bug-Free Enigma is an open-source, encrypted notes application that runs
entirely in your browser. No backend. No account. No way for anyone — including
me — to read your notes.

[PH_LINK]

The technical foundation:
- AES-GCM-256 note encryption via Web Crypto API
- PBKDF2 password key derivation (100,000 iterations)
- WebAuthn biometric authentication (fingerprint / Face ID)
- Session auto-lock with configurable inactivity timeout
- 10 single-use recovery codes for account recovery

What surprised me most: how powerful the browser's built-in SubtleCrypto API
is. Zero external crypto libraries. Zero backend required. Just the browser.

The full source code is MIT licensed on GitHub. I'd love your feedback — what
would you want in a truly private notes app?

#buildinpublic #privacy #security #webdev #react #opensource
```

---

### LinkedIn #2 — Technical Deep Dive (12:00 PM PST)

```
A note on why "server-side encryption" is not the same as "encrypted notes."

Most apps that advertise "encryption" mean: your data is encrypted in transit
(HTTPS) and at rest (their server encrypts it). But they hold the keys. They
can decrypt it.

Bug-Free Enigma is different. Encryption happens client-side — inside your
browser — and the decryption key is derived from your password, which never
leaves your device. Not even I (the developer) can read your notes.

This is made possible by the Web Crypto API — a browser-native cryptography
API that lets you run audited, high-performance cryptographic operations
without installing any libraries.

If you're a developer, I'd encourage you to look at the SubtleCrypto API for
your next project. It's more capable than most developers realize.

Source code: https://github.com/jvzhu/bug-free-enigma

What questions do you have about client-side encryption? 👇
```

---

### LinkedIn #3 — End of Day Retrospective (6:00 PM PST)

```
End of launch day update.

We launched Bug-Free Enigma on ProductHunt today. Here's what happened:

📊 By the numbers (so far):
- [N] ProductHunt upvotes
- #[N] ranking for the day
- [N] GitHub stars
- [N] users tried the app
- [N] countries represented in visitors

💬 Top feedback themes:
1. "This is what encrypted notes should look like"
2. "Please add cloud sync"
3. "Love the WebAuthn implementation"

🗺️ What's next:
Cloud sync (Firebase, client-side encrypted) → in development
Folders → next sprint
Mobile apps → planned

Thank you to everyone in my network who showed up today. Building in public
is humbling, energizing, and sometimes terrifying — but days like this make
it worthwhile.

[PH_LINK]
```

---

## REDDIT POSTS

### r/webdev

**Title:**
```
I built an encrypted notes app using only the Web Crypto API — no backend, no deps [Show off Saturday]
```

**Body:**
```
Hey r/webdev 👋

I've been building Bug-Free Enigma — an open-source encrypted notes app that
runs entirely in your browser with no backend at all.

**What it does:**
- AES-GCM-256 note encryption (all client-side, Web Crypto API)
- PBKDF2 password key derivation (100k iterations, SHA-256 + random salt)
- WebAuthn biometric login (fingerprint / Face ID)
- Session auto-lock with configurable inactivity timeout
- Encrypted shareable links (key in URL fragment, never sent to server)
- 10 single-use recovery codes for account recovery
- Export to Markdown or encrypted JSON

**Stack:** React 18 + Web Crypto API + localStorage. Zero external crypto deps.

**Why no backend?** Because the moment you add a backend, you add a trust
relationship. With client-side encryption, even if the server is compromised,
users' notes remain encrypted.

**Try it:** https://jvzhu.github.io/bug-free-enigma/
**Source:** https://github.com/jvzhu/bug-free-enigma (MIT)

Would love feedback from the webdev community — especially around the
SubtleCrypto implementation or UX pain points. What am I missing?
```

---

### r/reactjs

**Title:**
```
Built a fully encrypted notes app with React 18 and Web Crypto API — zero backend, zero external crypto libraries
```

**Body:**
```
Hi r/reactjs!

I built Bug-Free Enigma — a notes app where all encryption happens inside
React, in the browser, using only the native Web Crypto API (SubtleCrypto).

**React-specific things I'm proud of:**
- Custom `useCrypto` hook that wraps SubtleCrypto operations
- `useSessionLock` hook with multi-tab awareness via `localStorage` events
- React Context for auth state + encryption key (derived, never stored)
- Lazy loading + code splitting for optimal bundle size (57.82 kB)
- 23 Jest + React Testing Library unit tests

**The interesting part:** Cryptographic key management in React state.
The derived AES key lives in a ref (not state — no re-renders) and is
cleared from memory when the session locks.

**Try it:** https://jvzhu.github.io/bug-free-enigma/
**Source:** https://github.com/jvzhu/bug-free-enigma (MIT)

Questions about the architecture or testing approach? Happy to discuss!
```

---

### r/programming

**Title:**
```
Zero-backend encrypted notes app: AES-GCM-256 + PBKDF2 + WebAuthn, all running in the browser
```

**Body:**
```
I built a notes application where the encryption is genuinely end-to-end
— not "we encrypt it on our server" but "it's encrypted before it ever
touches any storage, server, or transit."

**Crypto stack:**
- AES-GCM-256 for note encryption
- PBKDF2 (100,000 iterations, SHA-256) for password-based key derivation
- HKDF for sub-key derivation
- WebAuthn for biometric authentication (Secure Enclave-backed)
- Random IV per note, random salt per user
- All using browser-native SubtleCrypto API — no external libs

**Architecture decision:** No backend means no trust surface. Even if someone
compromises the hosting server (GitHub Pages), they get only the encrypted
app bundle — no user data at all.

**Encrypted sharing:** Shareable note links where the decryption key is
embedded in the URL fragment (#). Browsers never send the fragment to servers.
So even the hosting server can't see what's being shared.

Source code (MIT): https://github.com/jvzhu/bug-free-enigma

Curious if anyone has thoughts on the security model. I'm particularly
interested in: is localStorage + AES-GCM-256 sufficient for the threat model
"device theft" or are there attack vectors I'm missing?
```

---

## DEV.TO ARTICLE

**Title:**
```
How I Built a Zero-Backend Encrypted Notes App Using Only the Browser's Web Crypto API
```

**Tags:** `#webdev #security #javascript #react`

**Article outline:**

```markdown
# How I Built a Zero-Backend Encrypted Notes App Using Only the Browser's
Web Crypto API

## Introduction
Most apps that advertise "encryption" mean server-side encryption where they
hold the keys. Here's how I built an app where cryptographic guarantees make
it impossible for anyone — including me — to read users' notes.

## The Core Idea: Client-Side Encryption
[Explain the difference between server-side and client-side encryption]

## The Web Crypto API (SubtleCrypto)
[Intro to SubtleCrypto — why it's underused]

## Password Key Derivation with PBKDF2
```javascript
const key = await crypto.subtle.importKey(
  'raw',
  encoder.encode(password),
  { name: 'PBKDF2' },
  false,
  ['deriveBits', 'deriveKey']
);
// ... derive AES-GCM key
```

## Encrypting Notes with AES-GCM-256
[Code example with encrypt/decrypt functions]

## WebAuthn: Biometric Login in the Browser
[Walkthrough of the WebAuthn credential creation and assertion flow]

## Encrypted Shareable Links
[Explain the URL fragment trick for key passing]

## Session Auto-Lock Across Tabs
[localStorage event listener trick for cross-tab session management]

## Lessons Learned
- PBKDF2 at 100k iterations is noticeably slow on older hardware (this is good)
- WebAuthn's partial Safari support still causes friction
- Recovery codes without a backend require careful UX design

## Try It / Star It
[Links to live app and GitHub]
```

---

## HACKER NEWS — SHOW HN

**Title:**
```
Show HN: Encrypted notes app with AES-GCM-256, zero backend, no external crypto deps
```

**Text (optional, 2–3 sentences):**
```
I built Bug-Free Enigma — a notes app where all encryption runs client-side
using the browser's Web Crypto API. No server, no account, zero external
crypto libraries. MIT open source.

https://jvzhu.github.io/bug-free-enigma/ | Source: https://github.com/jvzhu/bug-free-enigma
```

**Best time to submit:** Tuesday–Thursday, 7–9 AM EST (= 4–6 AM PST)

---

## PLATFORM TIMING SUMMARY

| Platform | When to Post | What to Post |
|----------|-------------|--------------|
| ProductHunt | 12:01 AM PST | Listing live + maker comment |
| Twitter #1 | 12:01 AM PST | Launch announcement |
| Twitter thread | 12:30 AM PST | Technical deep-dive |
| Reddit r/webdev | 6:00 AM PST | Technical show-off post |
| Reddit r/reactjs | 6:00 AM PST | React-specific post |
| LinkedIn #1 | 8:00 AM PST | Professional announcement |
| Hacker News | 9:00 AM PST | Show HN post |
| Reddit r/programming | 9:00 AM PST | Security-focused post |
| Twitter updates | Every 2 hours | Rankings, milestones, engagement |
| LinkedIn #2 | 12:00 PM PST | Technical deep-dive |
| Dev.to | 10:00 AM PST | Technical article |
| LinkedIn #3 | 6:00 PM PST | End-of-day retrospective |
