# 📊 Analytics & Tracking Setup — Bug-Free Enigma

Complete guide for setting up GA4, ProductHunt UTM tracking, and a
conversion funnel dashboard.

---

## 1. Google Analytics 4 (GA4) Setup

### Step 1 — Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin → Create Account** (or use existing account)
3. Click **Create Property**
4. Name: `Bug-Free Enigma`
5. Select your **timezone** and **currency**
6. Click **Next** → Business details → Click **Create**
7. Choose **Web** → Enter `https://jvzhu.github.io` as the website URL
8. Stream name: `Bug-Free Enigma GitHub Pages`
9. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2 — Add GA4 to the App

Add the following to `/public/index.html` inside the `<head>` tag:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_title: 'Bug-Free Enigma',
    page_location: window.location.href
  });
</script>
```

Replace `G-XXXXXXXXXX` with your real Measurement ID.

### Step 3 — Custom Event Tracking

Add these events to key user actions in the React app:

```javascript
// Helper function (add to src/utils/analytics.js)
export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// Usage examples:
trackEvent('note_created');
trackEvent('note_encrypted');
trackEvent('note_exported', { format: 'json' });
trackEvent('biometric_setup');
trackEvent('producthunt_click');
trackEvent('github_star_click');
trackEvent('email_signup');
trackEvent('dark_mode_toggle', { mode: 'dark' });
trackEvent('session_locked');
```

### Step 4 — Key Events to Track

| Event Name | Trigger | Category |
|-----------|---------|----------|
| `note_created` | User clicks "+ New Note" | Engagement |
| `note_encrypted` | User encrypts a note | Feature Use |
| `note_exported` | User exports notes | Feature Use |
| `search_used` | User types in search | Engagement |
| `dark_mode_toggle` | User toggles dark mode | UI |
| `biometric_setup` | User sets up WebAuthn | Feature Use |
| `producthunt_click` | User clicks PH badge | Acquisition |
| `github_click` | User clicks GitHub link | Acquisition |
| `email_signup` | Email waitlist signup | Conversion |
| `session_locked` | Session auto-locks | Security |
| `landing_page_view` | Landing page visited | Acquisition |

---

## 2. ProductHunt UTM Tracking

### UTM Parameter Structure

Use this URL format for all ProductHunt traffic:

```
https://jvzhu.github.io/bug-free-enigma/?utm_source=producthunt&utm_medium=launch&utm_campaign=ph-launch-2026
```

### UTM Parameters Explained

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `utm_source` | `producthunt` | Traffic source |
| `utm_medium` | `launch` | Marketing medium |
| `utm_campaign` | `ph-launch-2026` | Campaign identifier |
| `utm_content` | `badge` / `button` / `link` | Specific link variant |

### UTM URLs for Different Contexts

```bash
# ProductHunt website URL (in submission)
https://jvzhu.github.io/bug-free-enigma/?utm_source=producthunt&utm_medium=launch&utm_campaign=ph-launch-2026&utm_content=submission

# Tweet links
https://jvzhu.github.io/bug-free-enigma/?utm_source=twitter&utm_medium=social&utm_campaign=ph-launch-2026&utm_content=tweet-v1

# Reddit posts
https://jvzhu.github.io/bug-free-enigma/?utm_source=reddit&utm_medium=social&utm_campaign=ph-launch-2026&utm_content=r-webdev

# LinkedIn posts
https://jvzhu.github.io/bug-free-enigma/?utm_source=linkedin&utm_medium=social&utm_campaign=ph-launch-2026&utm_content=launch-post

# Email waitlist
https://jvzhu.github.io/bug-free-enigma/?utm_source=email&utm_medium=newsletter&utm_campaign=ph-launch-2026&utm_content=waitlist-launch

# Dev.to article
https://jvzhu.github.io/bug-free-enigma/?utm_source=devto&utm_medium=article&utm_campaign=ph-launch-2026

# HN post
https://jvzhu.github.io/bug-free-enigma/?utm_source=hackernews&utm_medium=social&utm_campaign=ph-launch-2026
```

---

## 3. Conversion Funnel

### Funnel Definition

```
Stage 1: AWARENESS
  ├── ProductHunt visitor
  ├── Social media click
  ├── Organic search
  └── Referral

Stage 2: ACQUISITION (Landing Page Visit)
  └── Metric: sessions, bounce rate, avg. time on page

Stage 3: ACTIVATION (First Note Created)
  └── Metric: note_created events / sessions

Stage 4: RETENTION (Return Visit)
  └── Metric: returning users / total users

Stage 5: REVENUE (Email Signup / Premium Intent)
  └── Metric: email_signup events, producthunt_click
```

### GA4 Funnel Exploration Setup

1. In GA4, go to **Explore → Blank**
2. Change technique to **Funnel exploration**
3. Add steps:
   - Step 1: `session_start` (any visit)
   - Step 2: `first_visit` (new users)
   - Step 3: `note_created` (activation)
   - Step 4: `note_encrypted` (power user)
   - Step 5: `email_signup` (conversion)

---

## 4. Dashboard Templates

### Google Looker Studio Dashboard

1. Go to [lookerstudio.google.com](https://lookerstudio.google.com)
2. Create a new report
3. Connect GA4 data source
4. Add the following charts:

**Overview Cards (top row):**
- Total users (last 7 days)
- New users
- Sessions
- Bounce rate

**Traffic Sources (pie chart):**
- Dimensions: `Session source`
- Metric: `Sessions`

**Feature Usage (bar chart):**
- Dimensions: `Event name`
- Metric: `Event count`
- Filter: event_name in [note_created, note_encrypted, note_exported, search_used]

**Daily Active Users (line chart):**
- Dimension: `Date`
- Metric: `Active users`
- Date range: Last 30 days

**Geographic Map:**
- Dimension: `Country`
- Metric: `Users`

**Campaign Performance (table):**
- Dimensions: `Session campaign`, `Session source`, `Session medium`
- Metrics: `Sessions`, `Engaged sessions`, `Engagement rate`

---

## 5. Real-Time Launch Dashboard Setup

### During Launch Day

Open these tabs in your browser:

1. **GA4 Real-Time Report:**
   `analytics.google.com → Reports → Real-time`

2. **GitHub Traffic:**
   `github.com/jvzhu/bug-free-enigma → Insights → Traffic`

3. **ProductHunt:**
   Your product page — watch upvotes and rank

4. **Twitter Analytics:**
   `analytics.twitter.com` — impressions and engagements

### Key Metrics to Record Every Hour

| Time | PH Rank | PH Votes | GA Sessions | GitHub Stars |
|------|---------|----------|-------------|-------------|
| 12 AM | | | | |
| 6 AM | | | | |
| 12 PM | | | | |
| 6 PM | | | | |
| 12 AM (end) | | | | |

---

## 6. Post-Launch Analytics Report Template

Use this template for your Day 1 retrospective:

```markdown
# Bug-Free Enigma — Launch Day Analytics Report

**Date:** [LAUNCH_DATE]
**Report Period:** 24 hours (12:00 AM – 11:59 PM PST)

## Traffic Summary
- Total sessions: [X]
- Unique users: [X]
- Top traffic source: [SOURCE]
- Bounce rate: [X]%
- Average session duration: [X] min

## ProductHunt Performance
- Final rank: #[X]
- Total upvotes: [X]
- Total comments: [X]
- Click-through to website: [X]

## GitHub
- Stars gained: [X]
- Forks: [X]
- New issues: [X]
- Views: [X]

## Feature Engagement
- Notes created: [X] events
- Notes encrypted: [X] events
- Exports: [X]
- Email signups: [X]

## Top Performing Content
1. [Tweet/post with most impressions]
2. [Second best]
3. [Third best]

## Key Learnings
- [Learning 1]
- [Learning 2]
- [Learning 3]

## Action Items for Week 2
- [ ] [Action 1]
- [ ] [Action 2]
```

---

## 7. Privacy-Respecting Analytics Alternative

If you prefer not to use Google Analytics (aligns with the privacy-first
nature of the app), consider these alternatives:

| Tool | Cost | Notes |
|------|------|-------|
| [Plausible](https://plausible.io) | $9/month | Privacy-first, GDPR compliant, cookieless |
| [Fathom](https://usefathom.com) | $14/month | Privacy-focused, simple dashboard |
| [Umami](https://umami.is) | Free (self-host) | Open source, GDPR compliant |
| [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) | Free | Cookieless, privacy-first |

**Recommended:** Plausible or Cloudflare Analytics — both are cookieless,
GDPR-compliant, and align with the app's privacy-first messaging.
