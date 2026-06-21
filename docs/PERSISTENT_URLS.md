# Persistent URLs (PURLs) for Bug-Free Enigma

This document describes the persistent URLs (PURLs) set up for Bug-Free Enigma using Stanford's PURL service. PURLs provide stable, long-lived URLs that won't break even if the underlying target changes.

---

## Why Persistent URLs?

- **Stability**: Survives hosting migrations, domain changes, or platform updates
- **Shareability**: Easy-to-remember, short URLs for marketing and documentation
- **Longevity**: Useful for academic citations, long-term references, and archival purposes
- **Redirect flexibility**: Update target URLs without changing shared links

---

## Current PURL Mappings

| PURL | Target | Purpose | Use Case |
|------|--------|---------|----------|
| `purl.stanford.edu/bug-free-enigma` | `https://jvzhu.github.io/bug-free-enigma/` | Main application | Primary app link for marketing |
| `purl.stanford.edu/bug-free-enigma-landing` | `https://jvzhu.github.io/bug-free-enigma/landing.html` | Landing page | Marketing, ProductHunt description |
| `purl.stanford.edu/bug-free-enigma-repo` | `https://github.com/jvzhu/bug-free-enigma` | GitHub repository | Developer reference, contributions |
| `purl.stanford.edu/bug-free-enigma-ph` | `https://www.producthunt.com/posts/bug-free-enigma` | ProductHunt launch | Social sharing, press kit |
| `purl.stanford.edu/bug-free-enigma-security` | `https://github.com/jvzhu/bug-free-enigma/blob/main/SECURITY.md` | Security documentation | Compliance, audit trails |
| `purl.stanford.edu/bug-free-enigma-docs` | `https://github.com/jvzhu/bug-free-enigma/blob/main/USER_GUIDE.md` | User guide | Help documentation |

---

## How to Set Up PURLs

### Prerequisites

- Stanford Digital Repository (SDR) account or access
- Or public PURL service with API access (e.g., Archive.org's PURL service)

### Step 1: Register with PURL Service

1. Visit https://purl.stanford.edu/
2. Log in with Stanford credentials (or use public alternative)
3. Navigate to "Create" or "Manage" section

### Step 2: Create PURL for Main App

1. **Identifier**: `bug-free-enigma`
2. **Target URL**: `https://jvzhu.github.io/bug-free-enigma/`
3. **Type**: Redirect
4. **Description**: Main Bug-Free Enigma application - AES-GCM-256 encrypted notes
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma` → app

### Step 3: Create PURL for Landing Page

1. **Identifier**: `bug-free-enigma-landing`
2. **Target URL**: `https://jvzhu.github.io/bug-free-enigma/landing.html`
3. **Type**: Redirect
4. **Description**: Bug-Free Enigma landing page with features and pricing
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma-landing` → landing

### Step 4: Create PURL for GitHub Repository

1. **Identifier**: `bug-free-enigma-repo`
2. **Target URL**: `https://github.com/jvzhu/bug-free-enigma`
3. **Type**: Redirect
4. **Description**: Bug-Free Enigma GitHub repository (MIT license, open source)
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma-repo` → GitHub

### Step 5: Create PURL for ProductHunt

1. **Identifier**: `bug-free-enigma-ph`
2. **Target URL**: `https://www.producthunt.com/posts/bug-free-enigma`
3. **Type**: Redirect
4. **Description**: Bug-Free Enigma ProductHunt launch post
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma-ph` → ProductHunt

### Step 6: Create PURL for Security Documentation

1. **Identifier**: `bug-free-enigma-security`
2. **Target URL**: `https://github.com/jvzhu/bug-free-enigma/blob/main/SECURITY.md`
3. **Type**: Redirect
4. **Description**: Bug-Free Enigma security documentation and cryptography details
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma-security` → Security docs

### Step 7: Create PURL for User Guide

1. **Identifier**: `bug-free-enigma-docs`
2. **Target URL**: `https://github.com/jvzhu/bug-free-enigma/blob/main/USER_GUIDE.md`
3. **Type**: Redirect
4. **Description**: Bug-Free Enigma user guide and feature documentation
5. **Save**

Result: `purl.stanford.edu/bug-free-enigma-docs` → User guide

---

## Using PURLs in Marketing Materials

### Email Campaigns

```markdown
Try Bug-Free Enigma: purl.stanford.edu/bug-free-enigma
GitHub: purl.stanford.edu/bug-free-enigma-repo
ProductHunt: purl.stanford.edu/bug-free-enigma-ph
```

### Social Media

```
🔐 Bug-Free Enigma is live!
Secure, encrypted notes → purl.stanford.edu/bug-free-enigma
⭐ Star on GitHub → purl.stanford.edu/bug-free-enigma-repo
```

### Documentation & README

```markdown
## Links

- 🚀 [Live App](purl.stanford.edu/bug-free-enigma)
- 🌐 [Landing Page](purl.stanford.edu/bug-free-enigma-landing)
- 📚 [Documentation](purl.stanford.edu/bug-free-enigma-docs)
- 🔐 [Security Details](purl.stanford.edu/bug-free-enigma-security)
- ⭐ [GitHub Repo](purl.stanford.edu/bug-free-enigma-repo)
- 🎯 [ProductHunt](purl.stanford.edu/bug-free-enigma-ph)
```

### QR Codes

Generate QR codes pointing to PURLs for print materials:
- `purl.stanford.edu/bug-free-enigma` → App QR code
- `purl.stanford.edu/bug-free-enigma-ph` → ProductHunt QR code

---

## Updating PURL Targets

If you move hosting or change URLs:

1. Log into PURL service
2. Select the PURL identifier
3. Update the **Target URL**
4. Save changes
5. All existing links automatically redirect to the new target

**Example scenario:**
- Current: `purl.stanford.edu/bug-free-enigma` → `jvzhu.github.io/...`
- If you move to `app.bug-free-enigma.com`:
  - Just update the target in PURL dashboard
  - All shared links still work ✓

---

## PURL Best Practices

### ✅ Do

- **Use consistent naming**: All PURLs follow `purl.stanford.edu/bug-free-enigma-*` pattern
- **Document purpose**: Add descriptions in PURL metadata
- **Version documentation**: Keep this file updated with current mappings
- **Test regularly**: Verify PURLs resolve correctly
- **Use in stable contexts**: Marketing materials, press kit, documentation
- **Monitor clicks**: Some PURL services provide analytics

### ❌ Don't

- **Change identifiers**: Once a PURL is shared, don't rename it
- **Point to temporary URLs**: PURLs should target stable, long-term locations
- **Overuse for internal links**: Reserve PURLs for external, shared contexts
- **Forget to update**: If you move hosting, update PURL targets promptly

---

## Monitoring & Analytics

If your PURL service provides analytics:

1. Track which PURLs get the most clicks
2. Monitor redirect health (any 404s?)
3. Seasonal patterns (spikes around ProductHunt launch?)
4. Geographic distribution of users

**Example dashboard queries:**
```
- Which PURL drove the most traffic from ProductHunt?
- How many clicks on purl.stanford.edu/bug-free-enigma-ph?
- Geographic distribution of purl.stanford.edu/bug-free-enigma users?
```

---

## Alternative PURL Services

If Stanford PURL doesn't work for you, consider:

| Service | URL | Features | Notes |
|---------|-----|----------|-------|
| Archive.org PURL | purl.archive.org | Free, public | Good for long-term archival |
| Bit.ly | bit.ly | Short links, analytics | Commercial, but free tier available |
| TinyURL | tinyurl.com | Simple, free | Basic shortening |
| Custom domain | yourdomain.com | Full control | Requires domain registration |

---

## Example: ProductHunt Launch Integration

For your ProductHunt launch, use PURLs in:

1. **Submission description**:
   ```
   Live app: purl.stanford.edu/bug-free-enigma
   GitHub: purl.stanford.edu/bug-free-enigma-repo
   ```

2. **Maker's first comment**:
   ```
   Security docs: purl.stanford.edu/bug-free-enigma-security
   Feature tour: purl.stanford.edu/bug-free-enigma-landing
   ```

3. **Social posts**:
   ```
   🔐 Just launched on ProductHunt!
   purl.stanford.edu/bug-free-enigma-ph
   #buildinpublic #privacy
   ```

4. **Email campaigns**:
   ```
   Try it free: purl.stanford.edu/bug-free-enigma
   Support us on ProductHunt: purl.stanford.edu/bug-free-enigma-ph
   ```

---

## Contact & Support

For PURL-related questions:
- Stanford Digital Repository: https://purl.stanford.edu/
- Email: purl-admin@stanford.edu
- Documentation: https://sul-dlss.github.io/purl/

For Bug-Free Enigma-specific questions:
- GitHub Issues: https://github.com/jvzhu/bug-free-enigma/issues
- Security: See SECURITY.md

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-06-21 | Vivien Zhu | Initial PURL documentation |

