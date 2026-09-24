# Milne Bay Province – Division of Education Website

> Official website for the **Milne Bay Province Division of Education**, Papua New Guinea.
> A web portal providing public educational information, news, policies, selection lists, staff portals, and an admin back-end.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend (Public SPA)](#frontend-public-spa)
  - [Routing](#routing)
  - [Pages & Components](#pages--components)
  - [Site Search](#site-search)
  - [Styling](#styling)
- [Backend (Admin & API)](#backend-admin--api)
  - [API Routes](#api-routes)
  - [Admin Pages](#admin-pages)
  - [Authentication](#authentication)
  - [Database](#database)
- [Security](#security)
- [Changelog Rule](#changelog-rule)
- [Deployment](#deployment)
- [Local Development](#local-development)
- [Contact Information](#contact-information)

---

## Overview

The site has **two layers**:

1. **Public SPA** — A vanilla HTML/CSS/JS single-page application served from `public/`. A custom client-side router lazy-loads page components on demand.
2. **Next.js back-end** — A **Next.js 16 / React 19** app in `src/` powering the admin dashboard (`/admin`) and REST API (`/api`), backed by MySQL with graceful fallback to mock data.

The Next.js server rewrites all public routes (e.g. `/home`, `/about`) to `/site.html`, where the SPA's own router takes over.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (`create-next-app`) | App shell for `/admin` and `/api` routes |
| React 19 | Admin dashboard UI |
| Vanilla HTML/CSS/JS | Public SPA shell, router, components |
| MySQL (Railway) | Persistent data (news, notices, policies, students, contacts, banners) |
| `mysql2` | MySQL driver (with mock-data fallback) |
| DOMPurify 3.0.6 | XSS-safe HTML sanitisation for SPA content |
| Lucide Icons | SVG icon set |
| Inter / Outfit (Google Fonts) | Typography |
| Vercel | Hosting (GitHub auto-deploy integration) |

---

## Project Structure

```
mbp-site/
├── package.json            # Next.js 16 app (npm run dev / build / start)
├── next.config.mjs         # SPA rewrites (public routes -> /site.html) + security headers
├── src/
│   ├── middleware.js       # Auth guard for /admin and protected /api routes
│   ├── app/                # Next.js routes
│   │   ├── layout.js       # Root layout (admin)
│   │   ├── globals.css
│   │   ├── api/            # REST endpoints (banners, news, notices, policies, ...)
│   │   └── admin/          # Admin dashboard pages
│   └── lib/
│       ├── database.js     # MySQL pool (Railway) + auto-seed
│       └── data.js         # Data access, mock-data fallback helpers
├── public/
│   ├── site.html           # SPA shell (header, footer, search overlay, router bootstrap)
│   ├── router.js           # Client-side SPA router
│   ├── search.js           # Site-wide internal search index + engine
│   ├── styles.css          # Main stylesheet (design system, all components)
│   ├── slider.css          # Hero slider / news ticker styles
│   ├── assets/             # Served images (slider, about, plans, downloads, ...)
│   └── components/         # Lazy-loaded page components (home.js, about.js, ...)
├── assets/                 # Source asset originals (a separate working copy)
├── vercel.json             # Legacy SPA rewrites (kept for compatibility)
└── setup_db.sql            # MySQL schema seed script
```

---

## Frontend (Public SPA)

The application shell is `public/site.html` (`<base href="/">`). It loads:

- `public/router.js` — the `Router` class (History API + lazy component loading)
- `public/search.js` — the `SiteSearch` global used by the search overlay

### Routing

The public routes live in `public/router.js` and are matched by `next.config.mjs` rewrites in the browser:

| URL Path | Component File |
|---|---|
| `/`, `/home` | `components/home.js` |
| `/about` | `components/about.js` |
| `/basic` | `components/basic.js` |
| `/post` | `components/post.js` |
| `/vet` | `components/vet.js` |
| `/fode` | `components/fode.js` |
| `/news`, `/news/:id` | `components/news.js` |
| `/contact` | `components/contact.js` |
| `/policy` | `components/policy.js` |
| `/calendar` | `components/calendar.js` |
| `/jobs` | `components/jobs.js` |
| `/exams` | `components/exams.js` |
| `/parents` | `components/parents.js` |
| `/elearning` | `components/elearning.js` |

**How it works:**

1. Intercepts all `[data-link]` anchor clicks and calls `history.pushState`.
2. Lazily injects the component `<script>` on first visit (`window.<Component>`).
3. Calls `component.render()` for the HTML string, sanitises it with **DOMPurify** (allows `<style>` and `data-lucide`), and injects into `<main id="app-content">`.
4. Calls `component.afterRender()` for page JavaScript (sliders, counters, lightbox, ticker).
5. Updates the nav bar's active-page highlight and resolves URL hashes.

All components follow this interface:

```js
window.MyComponent = {
    async render() { return `<html string>`; },
    afterRender()  { /* DOM logic after injection */ }
};
```

### Pages & Components

- **Home** (`home.js`) — Responsive hero slider (aspect-ratio based, images shown in full via `contain`), Quick Access grid, Educational Pathways, Staff Hub, animated stat counters, live Notice Board, Latest News with scrolling **news ticker**, Provincial Education Plans (scroll-in animations + floating cover), Resource Library downloads.
- **About** (`about.js`) — Banner, 4-photo image gallery, Land & People with the **Milne Bay map** (click-to-zoom lightbox with zoom buttons + scroll/pinch), Gender Equity section.
- **Basic** (`basic.js`) — Elementary/Primary education info and enrolment tables.
- **Post Primary** (`post.js`) — Secondary pathways with Grade 9/11 selection lists (view/download, preview modal).
- **VET** (`vet.js`) — Technical & vocational education content and the dynamic 2024 VET centre selection list (managed in admin).
- **FODE** (`fode.js`) — Flexible Open & Distance Education content and selection list.
- **News** (`news.js`) — News slider, breaking ticker, latest articles, and full article views (`/news/:id`).
- **Contact** (`contact.js`) — Contact details and a working contact form (posts to `/api/contacts`).
- **Policy** (`policy.js`) — Categorised policy documents from the database.
- **Calendar / Jobs / Exams / Parents / E-Learning** — Content pages driven by configuration/data.

### Site Search

The gold **Search** pill button in the nav bar opens a fullscreen overlay. `public/search.js` provides `window.SiteSearch`:

- A static index of all 14 pages (title + keywords).
- Live content merged at runtime from `/api/news`, `/api/notices`, and `/api/policies`.
- Ranked, debounced search (title hits weigh more). Results render as clickable, tagged items that navigate via the SPA router and close the overlay.

### Styling

- **`styles.css`** — CSS design system using custom properties (`--mbp-blue`, `--mbp-green`, `--mbp-gold`, `--mbp-red`, `--glass-*`). Covers glassmorphism header, footer, cards, tables, modals, lightbox, search results, and responsive breakpoints (`≤1024px`, `≤900px`, `≤768px`).
- **`slider.css`** — Hero slider layout and news ticker keyframes.

---

## Backend (Admin & API)

### API Routes

Public GET endpoints (no auth): `students`, `notices`, `news`, `latest-news`, `banners`, `policies`, `contacts` (read-only). All mutations require a session.

| Endpoint | Description |
|---|---|
| `/api/login` | Admin login (sets `mbp_admin_session` cookie) |
| `/api/news` | List/create/update/delete news articles |
| `/api/latest-news` | Ticker items |
| `/api/notices` | Notice Board entries |
| `/api/policies` | Policy documents + categories |
| `/api/banners` | Configurable news page banner management |
| `/api/students` | Selection-list students (view/download) |
| `/api/vet-students` | VET centre selection-list candidates (view/download) |
| `/api/contacts` | Contact submissions |
| `/api/submit-contact` | Public contact form submission |
| `/api/upload` | Admin file uploads (e.g. policy PDFs) |

### Admin Pages

`/admin` is a React dashboard with pages for **dashboard, students, vet-students, news, latest-news, notices, policies, banners, and contacts**. Bulk CSV upload and student export are supported.

### Authentication

`src/middleware.js` guards every `/admin/*` and protected `/api/*` route with the `mbp_admin_session` cookie. Public read-only GETs of the list endpoints remain open. Unauthenticated admin access redirects to `/admin`.

### Database

`src/lib/database.js` connects to **MySQL on Railway** (env: `MYSQL_URL`/`DB_PASS` etc.). On first connection it auto-seeds the schema. Every call re-validates the pool (failures are not cached). If the database is unreachable, `src/lib/data.js` falls back to bundled **mock data** so the site never goes down. DB write/read errors are surfaced to the admin UI as the real error messages.

---

## Security

- SPA HTML is sanitised with **DOMPurify** before injection (XSS defence).
- Admin/API routes require the session cookie (set via `/api/login`).
- `next.config.mjs` adds `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Strict-Transport-Security` headers.
- No secrets are committed; database credentials come from environment variables.

---

## Changelog Rule

> **Rule:** Whenever code, assets, or configuration change, add an entry to `CHANGELOG.md` under **Last Changes** (newest first). The entry must contain the commit message summary, the date, and a one-line description of what changed. This keeps the changelog authoritative for "what changed last".

See [CHANGELOG.md](./CHANGELOG.md) for the running log.

---

## Deployment

The site is hosted on **Vercel**. Pushing to `main` on GitHub triggers an automatic Vercel production deploy (GitHub integration) — no manual step needed after `git push origin main`.

- GitHub repository: https://github.com/Wicked3000/mbp-site
- Production URL is managed in the Vercel dashboard (project: `mbp-site`).

To deploy manually with the CLI (requires login once): `npx vercel --prod`.

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
```

Requirements:

- **Node.js** (v22+ recommended; uses standard Web APIs).
- (Optional) **XAMPP** if you want a local MySQL — Apache on ports 80/443, MySQL on 3306. The app falls back to mock data without a database.

> Do NOT open `site.html` via `file://` — the router requires an HTTP server (use the Next.js dev server).

---

## Contact Information

| | |
|---|---|
| **Organisation** | Milne Bay Province Division of Education |
| **Phone** | (+675) 6410603 / (+675) 6411305 |
| **Email** | support@mbp.education.gov.pg |
| **Address** | Free Mail Bag, Alotau, Milne Bay Province, Papua New Guinea |

**External Links:**
- Department of Education PNG: https://www.education.gov.pg/
- Teaching Service Commission: https://www.tsc.gov.pg/
- National Library & Archives: https://www.nla.gov.pg/

---

*© 2026 Milne Bay Province – Division of Education. Developed & Hosted by the NDoE.*