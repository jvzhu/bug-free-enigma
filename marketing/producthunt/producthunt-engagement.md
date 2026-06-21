# 💬 ProductHunt Engagement Playbook — Bug-Free Enigma

10+ comment response templates, FAQ answers, objection handling, and
supporter thank-you messages. All copy-paste ready.

---

## COMMENT RESPONSE TEMPLATES

### 1. General praise / "Great product!"

```
Thank you so much! 🙏 Really means a lot on launch day.

If you have 2 minutes, I'd love to know: what's the single feature you'd
add to your ideal private notes app? Your feedback directly shapes the
roadmap!
```

---

### 2. "How is this different from [competitor]?"

```
Great question! The key difference with [Competitor] is:

Bug-Free Enigma encrypts everything client-side — inside your browser —
using the native Web Crypto API (AES-GCM-256). There's zero backend, zero
server, zero account required. Not even I (the developer) can read your notes.

[Competitor] [keeps your data on their servers / uses server-side encryption /
requires an account], which means you're trusting their infrastructure.

With Bug-Free Enigma, trust is cryptographically enforced — not just promised.

Here's the source code if you want to verify: https://github.com/jvzhu/bug-free-enigma 🔍
```

---

### 3. "Does this work offline?"

```
Yes! 100% offline-capable. 🎉

Because there's no backend, everything runs in your browser. Once the page is
loaded, you can disconnect from the internet and keep writing — all encryption,
search, and autosave work offline.

The only time you need internet is for the initial page load. After that:
notes are stored in your browser's localStorage (encrypted), and the app
keeps working entirely offline.
```

---

### 4. "What happens if I forget my password?"

```
This is the most important question to answer honestly: your notes cannot be
recovered without your master password. That's what "true encryption" means
— there's no backdoor, no recovery server.

However, I've built two safeguards:

1. **Recovery codes** — When you first set up your password, 10 single-use
   recovery codes are generated locally. Save them somewhere safe (printed,
   password manager, etc.) and they let you regain access.

2. **Export regularly** — The app lets you export all notes as a plain
   Markdown file. If you do this periodically, you always have a readable backup.

I know "no recovery" is a strong stance. But I think it's the right trade-off
for a genuinely private app. Would you feel differently with a recovery option
that kept zero-knowledge of your password?
```

---

### 5. "Is this really open source? Can I self-host?"

```
100% open source under MIT licence! 🎉

GitHub repo: https://github.com/jvzhu/bug-free-enigma

Self-hosting is straightforward — it's a React app with no backend:
1. Clone the repo
2. Run `npm install && npm run build`
3. Serve the `build/` folder with any static host (Nginx, Apache, Netlify, etc.)

If you self-host and run into any issues, open a GitHub issue and I'll help. 🙏
```

---

### 6. "Will this have mobile apps?"

```
Mobile apps are on the roadmap! 📱

The current web app is fully mobile-responsive and works well in Safari and
Chrome on iOS/Android. You can add it to your home screen as a PWA for an
app-like experience.

React Native versions for iOS and Android are planned — likely after the
optional cloud sync (Firebase) is stable. I want to make sure the mobile
experience is first-class, not rushed.

Want to be notified when it launches? Drop your email [here / in the comments]!
```

---

### 7. "Why should I trust local storage?"

```
Great technical question! The key insight is: you don't need to trust
localStorage, because everything in it is encrypted.

Here's what an attacker sees if they access your localStorage:
```json
{
  "note_abc123": {
    "ciphertext": "U2FsdGVkX1...[base64 encrypted blob]",
    "iv": "[random initialization vector]",
    "salt": "[PBKDF2 salt]"
  }
}
```

Without your master password, this is completely unreadable. The encryption
key is derived on-the-fly from your password using PBKDF2 (100,000 iterations)
and is never stored anywhere.

So even a browser extension with localStorage access, a physical device theft,
or an XSS attack only gets useless ciphertext. 🔐
```

---

### 8. "This is cool but I need cloud sync"

```
You're not alone — cloud sync is the #1 feature request! ☁️

I'm building optional Firebase cloud sync as the next major feature. The
design is privacy-preserving: all data is encrypted client-side before
syncing — Firebase only ever sees ciphertext, never your plaintext notes.

This means:
✅ Cross-device access (phone, laptop, tablet)
✅ Zero knowledge on the server side
✅ Still works fully offline when disconnected

Timeline: aiming for beta in the next 4–6 weeks.

Want early access? Reply here or email me and I'll add you to the beta list!
```

---

### 9. "How do the encrypted share links work?"

```
Encrypted sharing is one of my favourite features to explain! Here's how it works:

1. You click "Share" on a note
2. The app generates a random symmetric key for that note
3. The note content is encrypted with that key (AES-GCM-256)
4. The encrypted ciphertext is appended to the URL as a fragment (#...)
5. The decryption key is embedded in the URL after a second `#`

The crucial detail: the decryption key lives in the URL fragment, which
browsers never send to any server. So even if you use Bug-Free Enigma's
hosted version, I never see the key, and the note stays private in transit.

The recipient opens the link in their browser, the JavaScript decrypts the
note locally, and they can read it — no account, no login.
```

---

### 10. "What's the tech stack?"

```
Happy to geek out on this! 🛠️

**Frontend:**
- React 18 (hooks, context, lazy loading)
- Web Crypto API (native browser crypto — zero external dependencies)
- localStorage for persistence

**Cryptography:**
- AES-GCM-256 for note encryption
- PBKDF2 (100,000 iterations, SHA-256) for password key derivation
- HKDF for sub-key derivation
- WebAuthn for biometric authentication

**Testing:** Jest + React Testing Library (23 unit tests)
**Deployment:** GitHub Pages (auto-deploys on push to main)
**CI/CD:** GitHub Actions

**Zero crypto dependencies** — everything uses the browser's built-in
SubtleCrypto API, which is audited by browser vendors.

Full source: https://github.com/jvzhu/bug-free-enigma
```

---

### 11. "I found a bug!"

```
Thank you so much for reporting this! 🐛

Could you please open a GitHub issue with:
1. What you expected to happen
2. What actually happened
3. Browser + OS you're using

GitHub Issues: https://github.com/jvzhu/bug-free-enigma/issues

I'll look at it today. Bug reports from launch day get top priority. 🙏
```

---

### 12. "Congrats on the launch! Just upvoted."

```
Thank you so much! 🎉 Your support on launch day means everything.

If you get a chance to try it, I'd love to hear what you think — especially
what's missing from your ideal private notes app. Your feedback shapes the
next sprint.

Thanks again for taking the time! 🙏
```

---

## FAQ ANSWERS

### "Is this really free?"

```
Yes, completely free — all features, no payment required, no freemium limits.

The core app will always be free. An optional Premium tier (cloud sync,
folders, custom themes) is planned, but everything in the current app will
remain free forever. This isn't a "free trial."
```

---

### "Does it work on all browsers?"

```
It works in any modern browser that supports the Web Crypto API:

✅ Chrome 80+ (including Android Chrome)
✅ Firefox 78+
✅ Safari 14.1+ (including iOS Safari)
✅ Edge 80+

The only feature with limited support is WebAuthn biometric auth, which
requires HTTPS (the hosted version is HTTPS). Note: Safari has partial
WebAuthn support on some older macOS versions.
```

---

### "Can I export my notes if I want to leave?"

```
Yes, and this is a deliberate design priority.

You can export in two formats:
1. **Encrypted JSON** — includes all metadata, tags, timestamps. Can be
   re-imported into Bug-Free Enigma on any device.
2. **Plain Markdown** — all notes exported as human-readable .md files.
   Use this if you want to migrate to another app.

No lock-in. Your data is always portable.
```

---

## OBJECTION HANDLING

### "I don't trust storing important notes in the browser"

```
That concern makes total sense — I had it too.

Two things worth noting:

1. Your notes aren't stored in plaintext — they're AES-GCM-256 encrypted
   before being written to localStorage. The browser storage holds only
   ciphertext that's useless without your password.

2. For extra safety, you can export regularly to an encrypted JSON file
   (stored wherever you trust — your file system, external drive, etc.).
   That's a cryptographically verified backup.

For most threat models, this is as secure or more secure than a cloud app
because there's no server that can be breached, subpoenaed, or hacked.
```

---

### "A real notes app needs cloud sync"

```
Totally fair — cloud sync is the top feature request.

I deliberately launched without it because I wanted to prove the core value
first: genuinely private, encrypted notes, no backend, no trust required.

Cloud sync via Firebase is in active development. It'll be entirely optional,
and all data will be encrypted client-side before syncing — so the server
never sees your plaintext.

If this is a dealbreaker for you today, I respect that. Drop your email and
I'll personally notify you when cloud sync ships!
```

---

### "This is just localStorage — my IT department can access it"

```
You're right that on a corporate device, IT can potentially access localStorage.
That's an important nuance.

For corporate threat models (managed devices, endpoint monitoring), you'd
want to use the self-hosted version on a personal device, or wait for the
cloud sync option with zero-knowledge design.

For personal devices, localStorage encryption makes this very secure — IT
on a personal device isn't a realistic threat for most users.

What's your specific use case? Happy to think through the right solution.
```

---

## SUPPORTER THANK-YOU MESSAGES

### After reaching 100 upvotes

```
🎉 100 UPVOTES! Thank you all.

I'm genuinely overwhelmed by the response. We just hit 100 upvotes in [X]
hours — that's incredible for a solo dev project.

Every comment, upvote, and share today has meant the world. I'm reading
every single message and taking notes on the feedback.

The most requested feature: **cloud sync with Firebase**. That's officially
moving to the top of the roadmap.

THANK YOU. You've validated that privacy-first tools matter to real people. 🙏
```

---

### After reaching Top 5

```
🚀 WE HIT TOP 5 ON PRODUCTHUNT!

I'm overwhelmed. When I started building this 3 months ago, I hoped a few
people would find it useful. Today, thousands have tried it.

Thank you to everyone who upvoted, commented, shared, and tried Bug-Free
Enigma. You made this happen.

This is just the beginning. Cloud sync, mobile apps, and Premium features
are coming — built on the foundation of feedback I've gotten today.

To the ProductHunt community: you're incredible. Thank you. 🙏
```

---

### End-of-day wrap-up comment

```
🌙 End of Launch Day — Thank you, ProductHunt!

What an incredible 24 hours. Final stats:
- [X] upvotes (ranked #[N] for the day)
- [X] comments
- [X] GitHub stars
- [X] new users from [Y] countries

Every piece of feedback has been logged. The top requests:
1. Cloud sync → top of roadmap (Firebase, client-side encrypted)
2. Folders → sprint 2
3. Mobile app → sprint 3

I'll send a full retrospective tomorrow. Thank you from the bottom of my
heart to everyone who showed up today. 🙏

The product stays live forever: https://jvzhu.github.io/bug-free-enigma/
```
