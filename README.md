# Milne Bay Province – Division of Education Website

> Official website for the **Milne Bay Province Division of Education**, Papua New Guinea.
> A modern Single-Page Application (SPA) providing public access to educational information, selection lists, news, staff portals, and more.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Pages & Components](#pages--components)
  - [Home](#home)
  - [About](#about)
  - [Basic Education](#basic-education)
  - [Post Primary](#post-primary)
  - [VET](#vet)
  - [FODE](#fode)
  - [News](#news)
  - [Contact](#contact)
  - [Stub Pages](#stub-pages)
- [Styling](#styling)
- [Security](#security)
- [Deployment](#deployment)
- [Local Development](#local-development)
- [Contact Information](#contact-information)

---

## Overview

This is a **vanilla HTML/CSS/JavaScript SPA** built without any frontend framework. It uses a custom client-side router that lazy-loads page components on demand. The site presents educational data, policies, student selection lists, news, and staff resources for the Milne Bay Province education division.

**Key characteristics:**

- Zero build tools or bundlers required
- Client-side routing via the History API (`pushState`)
- Components are loaded as plain `<script>` tags on first visit (lazy loading)
- HTML is sanitised with **DOMPurify** before injection to prevent XSS
- Icons provided by **Lucide**
- Fonts: **Inter** and **Outfit** (Google Fonts)
- Deployed on **Vercel** with SPA rewrite rules

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application shell (`index.html`) |
| Vanilla CSS | All styling (`styles.css`, `slider.css`) |
| Vanilla JavaScript | Router, components, and interactivity |
| DOMPurify 3.0.6 | XSS-safe HTML sanitisation |
| Lucide Icons | SVG icon set |
| Inter / Outfit (Google Fonts) | Typography |
| Vercel | Hosting and SPA routing |

---

## Project Structure

```
mbp-site/
├── index.html          # Application shell — header, footer, router bootstrap
├── router.js           # Client-side SPA router
├── styles.css          # Main stylesheet (design system, all component styles)
├── slider.css          # Hero slider / carousel styles
├── vercel.json         # Vercel deployment config (SPA rewrites)
├── assets/
│   ├── logo/           # MBP logo images
│   ├── slider/         # Hero slider images (island.png, school.png, culture.png)
│   ├── about/          # About page assets (milne_bay_map.jpg)
│   ├── basic/          # Basic Education page banner
│   ├── post/           # Post Primary page banner
│   ├── vet/            # VET page banner
│   ├── fode/           # FODE page banner
│   └── plans/          # Provincial Education Plan cover image
└── components/
    ├── home.js         # Home page component
    ├── about.js        # About page component
    ├── basic.js        # Basic Education component
    ├── post.js         # Post Primary component
    ├── vet.js          # VET component
    ├── fode.js         # FODE component
    ├── news.js         # News and Announcements component
    ├── contact.js      # Contact page component
    ├── policy.js       # Policy Documents (stub)
    ├── calendar.js     # Academic Calendar (stub)
    ├── jobs.js         # Job Vacancies (stub)
    ├── exams.js        # Exam Results (stub)
    ├── parents.js      # Parent Portal (stub)
    └── elearning.js    # E-Learning Portal (stub)
```

---

## Routing

The router is defined in `router.js` as a `Router` class, bootstrapped on `DOMContentLoaded`.

**Route table:**

| URL Path | Component | File |
|---|---|---|
| `/` | `HomeComponent` | `home.js` |
| `/home` | `HomeComponent` | `home.js` |
| `/about` | `AboutComponent` | `about.js` |
| `/basic` | `BasicComponent` | `basic.js` |
| `/post` | `PostComponent` | `post.js` |
| `/vet` | `VetComponent` | `vet.js` |
| `/fode` | `FodeComponent` | `fode.js` |
| `/news` | `NewsComponent` | `news.js` |
| `/contact` | `ContactComponent` | `contact.js` |
| `/policy` | `PolicyComponent` | `policy.js` |
| `/calendar` | `CalendarComponent` | `calendar.js` |
| `/jobs` | `JobsComponent` | `jobs.js` |
| `/exams` | `ExamsComponent` | `exams.js` |
| `/parents` | `ParentsComponent` | `parents.js` |
| `/elearning` | `ElearningComponent` | `elearning.js` |

**How it works:**

1. Intercepts all `[data-link]` anchor clicks and calls `history.pushState`.
2. Lazily loads the component script if not already in memory.
3. Calls `component.render()` to get the HTML string.
4. Sanitises output with DOMPurify (allows `<style>` tags and `data-lucide` attributes).
5. Injects into `<main id="app-content">`.
6. Calls `component.afterRender()` for page-specific JavaScript (sliders, counters, etc.).
7. Handles URL hash fragments with `scrollIntoView`.

---

## Pages & Components

All components follow this interface:

```js
window.MyComponent = {
    async render() { return `<html string>`; },
    afterRender()  { /* DOM logic after injection */ }
};
```

---

### Home

**Route:** `/home` | **File:** `components/home.js`

The main landing page. Contains:

- **Hero Slider** – 3-slide auto-advancing image carousel (5 s interval) with prev/next buttons and dot indicators.
- **Quick Access Grid** – 8 shortcut buttons: School Finder (external), Policy Documents, Calendar, Job Vacancies, News, Exam Results, Parent Portal, E-Learning.
- **Educational Pathways** – 4 pillar cards: Early Childhood, Primary, Secondary, VET.
- **Staff Hub** – Links to eRODSS Portal, School Grant Acquittal, and MyPaySlip (external NDoE apps).
- **Live Statistics** – Animated counters on scroll: 345+ Active Schools, 48,500+ Students, 1,850+ Teachers.
- **Official Notice Board** – 3 current notices (Term 3 fees, Teacher Postings 2026, Weather Alert).
- **Latest News** – 3 news cards with dates and summaries.
- **Provincial Education Plans** – Cover image with PDF download button.
- **Resource Library** – 4 downloadable resources: Academic Calendar, PEB Circulars, Syllabus Updates, School Fee Structures.

---

### About

**Route:** `/about` | **File:** `components/about.js`

- **Banner** – Full-width page header.
- **Image Gallery** – 4 placeholder image slots.
- **Land and People** – Map image plus geographic/demographic text: location, land area (16,200 km²), 150+ islands, population (~210,000), 48 languages.
- **Gender Equity in Education** – Discussion of enrolment disparity and the Gender Equity in Education Policy (DoE, 2003).

---

### Basic Education

**Route:** `/basic` | **File:** `components/basic.js`

- **Elementary Education** – Prep, E1, E2 (ages 6+, community language). Projected enrolment table (2007–2016).
- **Primary Education** – Grades 3–8 (ages 9–14), bilingual in lower primary. Projected enrolment table (2007–2016).
- **Planning & Policy** – Compulsory education targets and school learning improvement plans.

---

### Post Primary

**Route:** `/post` | **File:** `components/post.js`

- **Overview** – Description of secondary and high school pathways.
- **Grade 9 Selection List** – Interactive list for 13 schools with **View** (modal preview) and **Download** (`.txt` file) actions.
- **Grade 11 Selection List** – Interactive list for 8 schools with the same view/download functionality.
- **PDF Preview Modal** – Displays student data (No., Primary School, Candidate Name, Gender) with a preview watermark.

**Grade 9 Schools:** Cameron Secondary, Cape Vogel High, Duau High, Holy Name Secondary, Hagita Secondary, Kiriwina High, Kuiaro High, Misima High, Santa Maria Secondary, Suau High, Wesley Secondary, Woodlark Junior, Yeleyamba Junior High.

**Grade 11 Schools:** Cameron Secondary, Duau High, Holy Name Secondary, Hagita Secondary, Kiriwina High, Misima High, Santa Maria Secondary, Wesley Secondary.

---

### VET

**Route:** `/vet` | **File:** `components/vet.js`

- **Technical Vocational Education** – Overview for post-Grade 8 students. Projected enrolment table (Year 1 & Year 2, 2007–2016).
- **VET Centres** – Lists vocational centres in the province.
- **Plan & Strategy** – Expansion priorities and devolution of management.

---

### FODE

**Route:** `/fode` | **File:** `components/fode.js`

Flexible Open & Distance Education (Grades 9–12):

- **FODE Overview** – Distance education through study centres. Projected enrolment table (Grades 9–12, 2007–2016).
- **Plan & Strategy** – Policy on centre expansion and transition rates.
- **2024 FODE Selection List** – "FODE Intake 2026" with View and Download actions. Preview modal shows 16 students from LELOHOA and PABE primary schools.

---

### News

**Route:** `/news` | **File:** `components/news.js`

- **Hero Slider** – 3-slide news-themed carousel.
- **Breaking News Ticker** – Horizontally scrolling banner with current announcements.
- **Latest News Articles** – Grid of news cards with category labels, dates, thumbnails, and links.

---

### Contact

**Route:** `/contact` | **File:** `components/contact.js`

Two-column layout:

- **Contact Details:** Phone, Email, Postal Address.
- **Contact Form** – Name, Email, Message. Shows a browser alert on submission (no backend yet).

**Contact details:**
- Phone: (+675) 6410603 / (+675) 6411305
- Email: support@mbp.education.gov.pg
- Address: Free Mail Bag, Alotau, Milne Bay Province, PNG

---

### Stub Pages

The following pages are registered in the router with placeholder content pending development:

| Page | Route | File |
|---|---|---|
| Policy Documents | `/policy` | `components/policy.js` |
| Academic Calendar | `/calendar` | `components/calendar.js` |
| Job Vacancies | `/jobs` | `components/jobs.js` |
| Exam Results | `/exams` | `components/exams.js` |
| Parent Portal | `/parents` | `components/parents.js` |
| E-Learning | `/elearning` | `components/elearning.js` |

---

## Styling

- **`styles.css`** – Main design system using CSS custom properties for colour tokens (`--mbp-blue-dark`, `--mbp-green`, `--mbp-gold`, etc.). Covers all components including the glassmorphism header, footer, cards, tables, modals, and responsive breakpoints.
- **`slider.css`** – Styles for the hero image slider and news ticker animation.

**Design highlights:**
- Glassmorphism header with backdrop blur
- Animated background glow blobs (green, blue, gold)
- Floating social media buttons (Facebook, LinkedIn, WhatsApp)
- Mobile-responsive hamburger navigation
- Fullscreen search overlay (Escape or click-outside to close)

---

## Security

All component HTML strings are passed through **DOMPurify** before DOM injection:

```js
this.appContent.innerHTML = DOMPurify.sanitize(html, {
    ADD_TAGS: ['style'],       // Allow <style> tags inside components
    ADD_ATTR: ['data-lucide']  // Allow Lucide icon attributes
});
```

This prevents XSS attacks if any user-generated or external content is ever introduced.

---

## Deployment

The site is deployed on **Vercel**. The `vercel.json` configures a catch-all rewrite so all routes serve `index.html`, enabling the client-side router on direct URL access or page refresh:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**GitHub Repository:** https://github.com/Wicked3000/mbp-site

---

## Local Development

No build tools needed. Serve the project root with any static file server:

```bash
# Using npx serve (recommended)
npx serve . --listen 3000

# Using Python
python -m http.server 3000
```

Then open http://localhost:3000 in your browser.

> Do NOT open index.html directly via file:// — the router requires an HTTP server.

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
