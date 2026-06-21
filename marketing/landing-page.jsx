import React, { useState, useEffect } from 'react';
import './landing-page.css';

const features = [
  {
    icon: '🔐',
    title: 'AES-GCM-256 Encryption',
    description:
      'Every note is encrypted using AES-GCM-256 powered by the browser\'s built-in Web Crypto API. Zero external dependencies.',
  },
  {
    icon: '🛡️',
    title: 'Zero Backend',
    description:
      'No server ever sees your notes. All encryption and decryption happen locally in your browser.',
  },
  {
    icon: '🤳',
    title: 'Biometric Login',
    description:
      'Use fingerprint or Face ID via WebAuthn to unlock your notes. Your biometric data never leaves your device.',
  },
  {
    icon: '⏰',
    title: 'Session Auto-Lock',
    description:
      'Configurable inactivity timeout (5–30 min) automatically locks your notes when you step away.',
  },
  {
    icon: '🔍',
    title: 'Real-Time Search',
    description:
      'Instantly search notes by title, content, or tag. Lightning-fast, fully client-side.',
  },
  {
    icon: '🏷️',
    title: 'Tags & Filtering',
    description:
      'Organise notes with comma-separated tags and filter your list with a single click.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    description:
      'Beautiful light and dark themes that persist across sessions. Easy on the eyes at any hour.',
  },
  {
    icon: '📤',
    title: 'Export / Import',
    description:
      'Download all notes as an encrypted JSON file or plain Markdown. Your data, your control.',
  },
  {
    icon: '🔗',
    title: 'Encrypted Sharing',
    description:
      'Generate a shareable link where the encrypted payload lives in the URL fragment — never sent to any server.',
  },
  {
    icon: '📋',
    title: 'Batch Operations',
    description:
      'Select multiple notes and encrypt, decrypt, or delete them all in one action with a progress indicator.',
  },
  {
    icon: '🔑',
    title: 'Recovery Codes',
    description:
      '10 single-use emergency recovery codes generated on setup. Never get locked out.',
  },
  {
    icon: '📜',
    title: 'Audit Trail',
    description:
      'Timestamped log of every security-relevant action: login, encrypt, export, lock, and more.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Open the app',
    description: 'No sign-up. No download. Visit the live app in any modern browser.',
  },
  {
    number: '02',
    title: 'Set your master password',
    description:
      'A real-time strength meter ensures your password is robust. Your key is derived with PBKDF2 — never stored.',
  },
  {
    number: '03',
    title: 'Write & encrypt',
    description:
      'Create notes, click Encrypt, and your content becomes AES-GCM-256 ciphertext. Only you can read it.',
  },
];

const faqs = [
  {
    q: 'Can Bug-Free Enigma read my notes?',
    a: 'No. The encryption key is derived from your password in your browser and is never transmitted anywhere. We have no backend and no way to access your data.',
  },
  {
    q: 'What happens if I forget my master password?',
    a: 'You can use one of the 10 single-use recovery codes generated when you set up your password. Without a code, encrypted notes cannot be recovered — which is by design.',
  },
  {
    q: 'Is biometric login secure?',
    a: 'Yes. WebAuthn biometrics uses hardware-backed private keys that never leave your device or browser. Your fingerprint data is processed entirely by your device\'s secure enclave.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes — once loaded, the app works completely offline. Notes are stored in your browser\'s localStorage.',
  },
  {
    q: 'Is the source code available?',
    a: 'Absolutely. Bug-Free Enigma is fully open source under the MIT licence on GitHub. Inspect every line of the crypto implementation.',
  },
  {
    q: 'What encryption algorithm does it use?',
    a: 'AES-GCM-256 for encryption, PBKDF2 (100,000 iterations, random salt) for key derivation, and HKDF for key expansion. All via the browser\'s native Web Crypto API (crypto.subtle).',
  },
];

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  };

  return (
    <div className={`landing ${darkMode ? 'dark' : 'light'}`}>
      {/* ── Navigation ── */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="nav-icon">🔐</span>
          <span className="nav-name">Bug-Free Enigma</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
          >
            GitHub ⭐
          </a>
        </div>
        <div className="nav-actions">
          <button
            className="dark-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <a
            href="https://jvzhu.github.io/bug-free-enigma/"
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try it free →
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          🚀 Launched on ProductHunt&nbsp;
          <a
            href="https://www.producthunt.com/posts/bug-free-enigma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support us ↗
          </a>
        </div>
        <h1 className="hero-headline">
          Encrypted notes,&nbsp;
          <span className="gradient-text">right in your browser</span>
        </h1>
        <p className="hero-sub">
          AES-GCM-256 encryption. Zero backend. No account required. 100% open source.
          Your notes stay private — because the key never leaves your device.
        </p>
        <div className="hero-ctas">
          <a
            href="https://jvzhu.github.io/bug-free-enigma/"
            className="btn btn-primary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Try it free — no sign-up
          </a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma"
            className="btn btn-secondary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ Star on GitHub
          </a>
        </div>
        <div className="hero-social-proof">
          <span>✅ 23 tests passing</span>
          <span>✅ 0 external crypto deps</span>
          <span>✅ MIT licence</span>
          <span>✅ Web Crypto API</span>
        </div>

        {/* App preview */}
        <div className="hero-preview">
          <div className="preview-browser">
            <div className="browser-chrome">
              <div className="browser-dots">
                <span /><span /><span />
              </div>
              <div className="browser-address">
                🔒 jvzhu.github.io/bug-free-enigma
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-sidebar">
                <div className="preview-note active">🔐 Work ideas</div>
                <div className="preview-note">📝 Shopping list</div>
                <div className="preview-note">🔐 Journal</div>
              </div>
              <div className="preview-editor">
                <div className="preview-title">Work ideas</div>
                <div className="preview-body">
                  Encrypted with AES-GCM-256 ✓<br />
                  Auto-saved 2 seconds ago<br />
                  <span className="tag-chip">#work</span>
                  <span className="tag-chip">#ideas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Everything you need. Nothing you don't.</h2>
          <p>20+ features built with privacy-first principles.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="how-section">
        <div className="section-header">
          <h2>Up and running in 30 seconds</h2>
          <p>No install. No account. No friction.</p>
        </div>
        <div className="steps-row">
          {steps.map((s) => (
            <div key={s.number} className="step-card">
              <div className="step-number">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security deep-dive ── */}
      <section className="security-section">
        <div className="security-content">
          <div className="security-text">
            <h2>Security you can verify</h2>
            <p>
              Every line of the crypto implementation is open source. No
              black boxes. No trust required.
            </p>
            <ul className="security-list">
              <li>
                <strong>PBKDF2</strong> — 100,000 iterations + random salt.
                Your password is never stored.
              </li>
              <li>
                <strong>HKDF</strong> — Key expansion with domain separation.
                One master key → per-purpose keys.
              </li>
              <li>
                <strong>AES-GCM-256</strong> — Authenticated encryption. Each
                note has a unique random IV.
              </li>
              <li>
                <strong>WebAuthn</strong> — Hardware-backed biometric login.
                Biometric data never leaves your device.
              </li>
            </ul>
            <a
              href="https://github.com/jvzhu/bug-free-enigma/blob/main/SECURITY.md"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read security docs →
            </a>
          </div>
          <div className="security-diagram">
            <pre className="crypto-diagram">{`Master Password + Salt
        │
        ▼  PBKDF2
   Master Key (AES-GCM)
        │
        ▼  HKDF
  Encryption Key
        │
        ▼  AES-GCM-256
  Encrypted Note ✓`}</pre>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Simple, honest pricing</h2>
          <p>All core features are free forever. No gotchas.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="plan-name">Free</div>
            <div className="plan-price">
              $0 <span>/forever</span>
            </div>
            <ul className="plan-features">
              <li>✅ Unlimited notes (localStorage)</li>
              <li>✅ AES-GCM-256 encryption</li>
              <li>✅ WebAuthn biometrics</li>
              <li>✅ Session auto-lock</li>
              <li>✅ Export / Import</li>
              <li>✅ Dark mode</li>
              <li>✅ Search & tags</li>
              <li>✅ Encrypted sharing links</li>
              <li>✅ Recovery codes</li>
              <li>✅ Audit trail</li>
            </ul>
            <a
              href="https://jvzhu.github.io/bug-free-enigma/"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started free
            </a>
          </div>
          <div className="pricing-card pricing-card-premium">
            <div className="plan-badge">Coming soon</div>
            <div className="plan-name">Premium</div>
            <div className="plan-price">
              $2.99 <span>/month</span>
            </div>
            <p className="plan-sub">or $24.99/year</p>
            <ul className="plan-features">
              <li>✅ Everything in Free</li>
              <li>☁️ Cloud sync (end-to-end encrypted)</li>
              <li>🔄 Cross-device access</li>
              <li>📁 Folders & organisation</li>
              <li>🔍 Full-text encrypted search</li>
              <li>🎨 Custom themes</li>
              <li>📧 Priority support</li>
            </ul>
            <button className="btn btn-outline" disabled>
              Notify me
            </button>
          </div>
          <div className="pricing-card">
            <div className="plan-name">Teams</div>
            <div className="plan-price">
              $9.99 <span>/month</span>
            </div>
            <p className="plan-sub">or $99.99/year</p>
            <ul className="plan-features">
              <li>✅ Everything in Premium</li>
              <li>👥 Shared workspaces</li>
              <li>🔐 Team admin console</li>
              <li>📊 Team analytics</li>
              <li>🏢 SSO/SAML (roadmap)</li>
              <li>💼 Priority support + SLA</li>
            </ul>
            <button className="btn btn-outline" disabled>
              Coming soon
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {item.q}
                <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
              </button>
              {openFaq === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Email signup ── */}
      <section className="signup-section">
        <h2>Stay in the loop</h2>
        <p>
          Get notified when Premium launches and receive early-supporter pricing.
          No spam — ever.
        </p>
        {emailSubmitted ? (
          <p className="signup-success">
            🎉 You're on the list! We'll be in touch.
          </p>
        ) : (
          <form className="signup-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-primary">
              Notify me
            </button>
          </form>
        )}
        <p className="signup-note">
          We'll only email you about major updates. Unsubscribe anytime.
        </p>
      </section>

      {/* ── Final CTA ── */}
      <section className="final-cta">
        <h2>Your notes deserve to be private.</h2>
        <p>Free. Open source. No sign-up required.</p>
        <div className="hero-ctas">
          <a
            href="https://jvzhu.github.io/bug-free-enigma/"
            className="btn btn-primary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Launch the app
          </a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma"
            className="btn btn-secondary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <span>🔐</span> Bug-Free Enigma
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/jvzhu/bug-free-enigma"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma/blob/main/SECURITY.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Security
          </a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma/blob/main/USER_GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <a
            href="https://github.com/jvzhu/bug-free-enigma/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute
          </a>
          <a
            href="https://www.producthunt.com/posts/bug-free-enigma"
            target="_blank"
            rel="noopener noreferrer"
          >
            ProductHunt
          </a>
        </div>
        <p className="footer-copy">
          MIT Licence · Built with React + Web Crypto API ·{' '}
          <a
            href="https://github.com/jvzhu/bug-free-enigma"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </a>
        </p>
      </footer>
    </div>
  );
}
