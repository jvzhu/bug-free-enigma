# Persistent URLs (PURLs) for Bug-Free Enigma

This document describes the persistent URLs (PURLs) set up for Bug-Free Enigma using Archive.org's PURL service. PURLs provide stable, long-lived URLs that won't break even if the underlying target changes.

---

## Why Persistent URLs?

- **Stability**: Survives hosting migrations, domain changes, or platform updates
- **Shareability**: Easy-to-remember, short URLs for marketing and documentation
- **Longevity**: Useful for academic citations, long-term references, and archival purposes
- **Redirect flexibility**: Update target URLs without changing shared links

---

## Current PURL Mappings (Archive.org)

| PURL | Target | Purpose | Use Case |
|------|--------|---------|----------|
| `purl.archive.org/bug-free-enigma` | `https://jvzhu.github.io/bug-free-enigma/` | Main application | Primary app link for marketing |
| `purl.archive.org/bug-free-enigma-landing` | `https://jvzhu.github.io/bug-free-enigma/landing.html` | Landing page | Marketing, ProductHunt description |
| `purl.archive.org/bug-free-enigma-repo` | `https://github.com/jvzhu/bug-free-enigma` | GitHub repository | Developer reference, contributions |
| `purl.archive.org/bug-free-enigma-ph` | `https://www.producthunt.com/posts/bug-free-enigma` | ProductHunt launch | Social sharing, press kit |
| `purl.archive.org/bug-free-enigma-security` | `https://github.com/jvzhu/bug-free-enigma/blob/main/SECURITY.md` | Security documentation | Compliance, audit trails |
| `purl.archive.org/bug-free-enigma-docs` | `https://github.com/jvzhu/bug-free-enigma/blob/main/USER_GUIDE.md` | User guide | Help documentation |

---

## ✅ Live PURLs — Ready to Use

All 6 PURLs are now **live and active** on Archive.org:

```
🔐 Main App:      purl.archive.org/bug-free-enigma
🌐 Landing Page:  purl.archive.org/bug-free-enigma-landing
⭐ GitHub Repo:   purl.archive.org/bug-free-enigma-repo
🎯 ProductHunt:   purl.archive.org/bug-free-enigma-ph
🔒 Security:      purl.archive.org/bug-free-enigma-security
📚 Docs:          purl.archive.org/bug-free-enigma-docs
```

---

## Using PURLs in Marketing Materials

### Email Campaigns

```markdown
Try Bug-Free Enigma: purl.archive.org/bug-free-enigma
GitHub: purl.archive.org/bug-free-enigma-repo
ProductHunt: purl.archive.org/bug-free-enigma-ph
```

### Social Media

```
🔐 Bug-Free Enigma is live!
Secure, encrypted notes → purl.archive.org/bug-free-enigma
⭐ Star on GitHub → purl.archive.org/bug-free-enigma-repo
🎯 Support on ProductHunt → purl.archive.org/bug-free-enigma-ph
```

### Documentation & README

```markdown
## Quick Links

- 🚀 [Live App](purl.archive.org/bug-free-enigma)
- 🌐 [Landing Page](purl.archive.org/bug-free-enigma-landing)
- 📚 [Documentation](purl.archive.org/bug-free-enigma-docs)
- 🔐 [Security Details](purl.archive.org/bug-free-enigma-security)
- ⭐ [GitHub Repo](purl.archive.org/bug-free-enigma-repo)
- 🎯 [ProductHunt](purl.archive.org/bug-free-enigma-ph)
```

### QR Codes

Generate QR codes pointing to PURLs for print materials:
- `purl.archive.org/bug-free-enigma` → App QR code
- `purl.archive.org/bug-free-enigma-ph` → ProductHunt QR code

Use a QR generator like:
- https://qr-code-generator.com/
- https://www.qr-code-generator.com/
- Built into most design tools (Figma, Canva, etc.)

---

## Updating PURL Targets

If you move hosting or change URLs:

1. Log into Archive.org PURL dashboard
2. Select the PURL identifier
3. Update the **Target URL**
4. Save changes
5. All existing links automatically redirect to the new target

**Example scenario:**
- Current: `purl.archive.org/bug-free-enigma` → `jvzhu.github.io/...`
- If you move to `app.bug-free-enigma.com`:
  - Just update the target in PURL dashboard
  - All shared links still work ✓

---

## PURL Best Practices

### ✅ Do

- **Use consistent naming**: All PURLs follow `purl.archive.org/bug-free-enigma-*` pattern
- **Document purpose**: Add descriptions in PURL metadata
- **Version documentation**: Keep this file updated with current mappings
- **Test regularly**: Verify PURLs resolve correctly
- **Use in stable contexts**: Marketing materials, press kit, documentation
- **Monitor usage**: Archive.org may provide analytics on your PURLs

### ❌ Don't

- **Change identifiers**: Once a PURL is shared, don't rename it
- **Point to temporary URLs**: PURLs should target stable, long-term locations
- **Overuse for internal links**: Reserve PURLs for external, shared contexts
- **Forget to update**: If you move hosting, update PURL targets promptly

---

## Archive.org PURL Features

**Archive.org's PURL service includes:**
- ✅ Free and open to the public
- ✅ Permanent archival (non-profit, mission-driven)
- ✅ Simple web interface
- ✅ API access (for advanced users)
- ✅ No expiration or takedown (unless illegal)
- ✅ Integrates with Internet Archive preservation

**Manage your PURLs:**
- Dashboard: https://archive.org/services/purl/
- Edit/update existing PURLs anytime
- View redirect chains and metadata

---

## ProductHunt Launch Integration

For your ProductHunt launch, use PURLs in:

### 1. Submission Description

```
🔐 Secure, encrypted notes — right in your browser

Features:
• AES-GCM-256 encryption (Web Crypto API)
• Zero backend — no servers, no accounts
• WebAuthn biometric login
• Session auto-lock
• Open source (MIT license)

🚀 Try it free: purl.archive.org/bug-free-enigma
📚 Learn more: purl.archive.org/bug-free-enigma-landing
⭐ GitHub: purl.archive.org/bug-free-enigma-repo
```

### 2. Maker's First Comment

```
Hey Product Hunt! 👋

I built Bug-Free Enigma because I was frustrated with note apps 
asking for my email and syncing data to unknown servers.

This is different:
✅ No backend at all
✅ Real encryption (AES-256)
✅ Free forever — no paywalls
✅ Open source — inspect the code

Security docs: purl.archive.org/bug-free-enigma-security
Feature tour: purl.archive.org/bug-free-enigma-landing
GitHub: purl.archive.org/bug-free-enigma-repo

Happy to answer any questions! 🙏
```

### 3. Social Posts

**Twitter:**
```
🚀 Just launched on @ProductHunt!

Secure, encrypted notes — no backend required.
AES-GCM-256 encryption powered by the browser's Web Crypto API.

Try it free: purl.archive.org/bug-free-enigma-ph

#ProductHunt #privacy #webdev #buildinpublic
```

**LinkedIn:**
```
Excited to announce the public launch of Bug-Free Enigma!

After months of building, I'm proud to launch a fully open-source, 
encrypted notes app that keeps your data completely private.

🔐 Zero backend
🔐 100% client-side encryption
🔐 MIT licensed

Live app: purl.archive.org/bug-free-enigma
ProductHunt: purl.archive.org/bug-free-enigma-ph
GitHub: purl.archive.org/bug-free-enigma-repo
```

### 4. Email Campaigns

**Subject:** 🚀 Bug-Free Enigma is LIVE on ProductHunt — try it free

```
Hi there,

The wait is over — Bug-Free Enigma is live today on ProductHunt! 🎉

🔐 Try it free (no sign-up): purl.archive.org/bug-free-enigma
🎯 Support us on ProductHunt: purl.archive.org/bug-free-enigma-ph
⭐ Star on GitHub: purl.archive.org/bug-free-enigma-repo

If you believe privacy matters, I'd love your support today.

Thank you for being part of this journey!

— Vivien
```

---

## Alternative PURL Services

If you ever need alternatives:

| Service | URL | Features | Notes |
|---------|-----|----------|-------|
| Archive.org PURL | purl.archive.org | Free, public, permanent | ← **Currently using** |
| Stanford PURL | purl.stanford.edu | Academic, formal | Requires Stanford affiliation |
| Bit.ly | bit.ly | Short links, analytics | Commercial, free tier |
| Custom domain | yourdomain.com | Full control | Requires domain registration |

---

## Contact & Support

**For PURL-related questions:**
- Archive.org PURL: https://archive.org/services/purl/
- Archive.org contact: https://archive.org/about/contact.php

**For Bug-Free Enigma questions:**
- GitHub Issues: https://github.com/jvzhu/bug-free-enigma/issues
- Security: See SECURITY.md

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-06-21 | Vivien Zhu | Initial PURL documentation (Stanford) |
| 2026-06-21 | Vivien Zhu | Updated to Archive.org PURLs (all 6 live) |

