# CHANGELOG

All notable changes to the Milne Bay Province – Division of Education website are documented here, newest first. See the [Changelog Rule](./README.md#changelog-rule).

---

## Last Changes

### 2026-09-24 — Fixed WhatsApp form dropdown and checkbox visibility
- Added `wa-select` CSS for the District dropdown with dark theme options (white text on #0a192f, selected option in green)
- Fixed checkbox topic labels: changed from `flex-direction: column` to `align-items: flex-start` for proper layout

### 2026-09-24 — Made WhatsApp community section full width
- The WhatsApp Community Subscription card now spans the full viewport width (with side margins) matching the rest of the homepage sections, instead of being centered at max 800px.

### 2026-09-24 — Added WhatsApp community subscription section to homepage
- Added a **WhatsApp Community Subscription** section to the public homepage featuring a subscription form (Name, Phone with PNG formatting, District, Notification Topics checkboxes) with real-time carrier detection (Digicel/Telikom/Vodafone PNG), live status indicator, and wa.me fallback confirmation. Fetches from `/api/whatsapp-subscribe`.

### 2026-09-24 — Added WhatsApp Subscriber management
- Added `whatsapp_subscribers` MySQL table, mock-data fallback, and `/api/whatsapp-subscribe` (POST) and `/api/whatsapp-subscribers` (GET/DELETE) API routes for WhatsApp group/channel subscription management.
- Added an admin **WhatsApp Subscribers** tab (`/admin/whatsapp`) with a list view showing phone, name, source, and subscription date, plus delete functionality and search/filter.
- Updated `src/middleware.js` to protect `/api/whatsapp-subscribers` admin routes.
- Added `mockWhatsappSubscribers` seed data and auto-seed logic in `src/lib/data.js` and `setup_db.sql`.
- Updated `src/components/AdminHeader.js` with a new WhatsApp Subscribers nav item.

### 2026-09-24 — Removed the Resource Library Highlights section from the homepage
- Deleted the "Document & Resource Library" band (2026 Academic Calendar, PEB Circulars, Syllabus Updates, School Fee Structures download cards) and its `.resource-grid`/`.resource-card` CSS. The `.download-btn` class is retained because it is still used by the Policy and Calendar pages.

### 2026-09-24 — Moved the Educational Pathways section above FODE and VET
- The "Educational Pathways" pillars section (Early Childhood, Primary, Secondary, VET) now sits directly after "Explore Our Districts" and before the FODE Learning Portal feature and VET section, so the page opens with the educational journey before the specialized portals.

### 2026-09-24 — Replaced the FODE Distance Learning service card with an Academic Calendar card
- The E-Services & Citizen Hub grid no longer duplicates the FODE portal (already covered by the FODE Learning Portal feature band above). Replaced the "FODE Distance Learning" card with an "Academic Calendar" card (`calendar` icon, blue, links to `/calendar`) so each hub destination is unique.

### 2026-09-24 — Fixed VET card icon rendering and gave Agriculture its own icon
- Root cause: Lucide's `createIcons()` replaces each `<i data-lucide>` with an `<svg>`, so the original `.vet-card i` / `.vet-badge i` / `.vet-btn i` rules never matched the rendered SVGs — the icons stayed at default 24px, uncolored and misaligned. Retargeted the rules at `svg` (`.vet-card svg` 44px gold, `.vet-badge svg` 14px, `.vet-btn svg` 17px).
- Replaced the Agriculture card's `tree` icon (more forestry than farming) with `sprout`, a dedicated crop/growth icon.

### 2026-09-24 — Styled the VET section on the homepage
- The VET section had no styling (bare text on the page). Added a full style system in `styles.css` matching the FODE section's quality but with its own warm amber vocational-training identity: dark gradient panel, "Vocational Technical Training" badge, 3 trade cards (Agriculture, Mechanical, Hospitality) with lift + gold hover glow, and a gold gradient "View VET Programs" pill CTA with sliding arrow. Responsive 3 → 1 columns.

### 2026-09-24 — Removed the Centre Locations link from the FODE dashboard footer
- Deleted the "Centre Locations" link (and its map-pin icon) from the homepage FODE dashboard footer; only the "Free for registered Milne Bay students" status text remains.

### 2026-09-24 — Fixed the FODE Exam Results icon (it was not rendering)
- The Exam Results row in the homepage FODE dashboard used `data-lucide="square-poll-vertical"`, which is a Font Awesome icon name and does not exist in Lucide — so it rendered as a blank box. Replaced it with the valid Lucide icon `trophy` (single icon, as intended).

### 2026-09-24 — Added a map-pin icon to the Centre Locations footer link
- Added a `<i data-lucide="map-pin">` icon before the "Centre Locations" link in the FODE dashboard footer (`.fode-dash-foot`) so the link is visually distinguishable alongside the "Free for registered Milne Bay students" status text.

### 2026-09-24 — Removed the Quick Access section from the homepage
- Removed the Quick Access glass card (Explore / Quick Access / Popular services, one click away) and its 8 icon tiles along with all `.qa-*` grid/tile CSS. The new E-Services & Citizen Hub grid already covers those destinations (School Finder, Policy Documents, Exam Results, Parent Portal, etc.), so no functionality is lost.
- Kept the generic `.qa-btn` CTA styling (still used by View All News and Download Full Plan) and updated the README + search index description of the home page.

### 2026-09-24 — Rebuilt the homepage body with provincial-portal sections
- Added a **Key Statistics band** that floats over the hero slider: 4 animated counters (345 Active Schools, 48,500 Enrolled Students, 1,850 Teachers, 100% FODE Outreach) with per-card accent icons (the old separate stats section was removed; the counter animation now runs on the band with `+`/`%` suffix support). Slider dots were raised so the overlapping band never covers them.
- Added an **Explore Our Districts** section: 4 white profile cards (Alotau, Esa'ala, Kiriwina/Goodenough, Samarai/Murua) with photo headers, badges, education facts and a **View District Profile** button opening a new backdrop-blur modal (HQ, LLGs, schools coverage, FODE outreach, highlights). Responsive 4 → 2 → 1 columns.
- Added a **FODE Learning Portal** feature band (dark navy gradient): FODE pitch, two mini feature cards, gold/ghost CTAs to `/fode` and `/post`, plus a white "Digital Resource Center" dashboard card linking to Course & Assignment Downloads (`/post`), Exam Results (`/exams`) and VET (`/vet`).
- Added an **E-Services & Citizen Hub** grid: 6 service cards (FODE Portal, EMIS School Finder, Policy Documents, Selection Lists, Parent Portal, Exam Results) with gradient icon squares and hover lift. Responsive 3 → 2 → 1 columns.

### 2026-09-24 — Made the Quick Access section full width
- The Quick Access glass card now spans the full viewport width (with 1.25rem side margins and a 22px radius) instead of being capped at 1060px.
- The 8 icon tiles now sit in a single 8-column row on wide desktops (grid capped at 1200px and centered), dropping to 4 columns at ≤1100px and 2 columns below 768px, so the whole band on phones remains a compact 2×4 grid.

### 2026-09-24 — Redesigned the Quick Access section
- Rebuilt the homepage Quick Access as a glass card (rounded, soft shadow, white gradient) with a kicker + title + subtitle header.
- Each of the 8 services is now a white tile with a circular gradient icon chip (rotating blue/gold/green/red accents) and a bold label; hover lifts the tile and scales the chip.
- Responsive: 4 columns on desktop, 2 on tablets/small screens, 1 on phones. The beige flat box and square buttons were removed; the generic `.qa-btn` CTA styling (View All News / Download Plan) is preserved.

### 2026-09-24 — Redesigned the Welcome Message "Learn More" button
- Replaced the generic Quick-Access-style button with a dedicated `.welcome-btn`: gold gradient pill (matching the site's search pill), bold white label, arrow icon that slides on hover, plus lift + glow hover effect.

### 2026-09-24 — Fix Quick Access overlapping the Welcome Message
- Removed the negative `margin-top` on `.quick-access-section` (previously used to overlap the hero slider) so it no longer collides with the welcome card, and added bottom spacing to the welcome section.

### 2026-09-24 — Homepage Welcome Message section
- Added a **Welcome Message** card to the public homepage between the hero slider and Quick Access grid, driven by a new `/api/welcome` endpoint and a `welcome_messages` MySQL table (auto-seeded, mock fallback included).
- Added an admin **Welcome Message** tab (`/admin/welcome`) to edit the kicker, heading, body text (paragraph-aware), image (upload/URL) and show/hide toggle.
- Added `.welcome-section` styles (two-column glass card, responsive layout); `setup_db.sql`, middleware, README and CHANGELOG updated.

### 2026-09-24 — Page Banner Manager for About/Basic/Post/VET/FODE
- Added an admin **Page Banners** tab (`/admin/page-banners`) to customize the banner image, title and subtitle shown on the About, Basic Education, Post Primary, VET and FODE pages (with image upload, inline previews, and Open Page links).
- Added a new `page_banners` MySQL table (auto-created and seeded idempotently, `INSERT IGNORE` per page key) plus `mockPageBanners` fallback in `src/lib/data.js`, and a `/api/page-banners` API (public GET read by `?page=`, admin PATCH).
- Public pages now fetch their banner live via a new `public/components/pageBanner.js` helper (defaults preserved if unset); `setup_db.sql`, middleware, README and CHANGELOG updated.

### 2026-09-24 — Contact forms now require a phone number
- The public contact form now has a mandatory phone number field (validated 7–20 chars) sent with each submission for building a WhatsApp-ready contact bank.
- `/api/submit-contact` now requires and persists the phone number; the `contacts` table gained a `phone` column (with auto-migration for existing databases) and mock data includes phones.
- Admin Contact Messages now show a Phone Number column (searchable), a one-click WhatsApp chat action, and a phone/WhatsApp link in the message detail view.

### 2026-09-24 — Contact page overlay restyle
- Changed the contact page background overlay gradient to `linear-gradient(346deg, rgb(47 54 65 / 85%), rgb(61 30 30 / 80%))`.

### 2026-09-24 — Dynamic FODE selection list with admin management
- The FODE page (`/fode`) "2024 FODE Selection List" section is now dynamic: intake lists and candidates are fetched live from the back-end and can be viewed (inline accordion) or downloaded.
- Added `/api/fode-students` API (public GET read, admin POST/DELETE) and a new `fode_students` MySQL table (auto-seeded with the FODE Intake 2026 list, mock-data fallback included).
- Added an admin management page at `/admin/fode-students` (add / delete / bulk CSV upload / export .TXT) with a new "FODE Selection List" item in the admin sidebar.
- Added `fode_students` table + seed data to `setup_db.sql`.

### 2026-09-24 — Dynamic VET selection list with admin management
- The VET page (`/vet`) "2024 VET Selection List" section is now dynamic: centres and candidates are fetched live from the back-end and can be viewed (inline accordion) or downloaded.
- Added `/api/vet-students` API (public GET read, admin POST/DELETE) and a new `vet_students` MySQL table (auto-seeded with the Kwato VET 2024 list, mock-data fallback included).
- Added an admin management page at `/admin/vet-students` (add / delete / bulk CSV upload / export .TXT) with a new "VET Selection List" item in the admin sidebar.
- Added `vet_students` table + seed data to `setup_db.sql`.

### 2026-09-24 — Documentation & changelog rule
- Rewrote `README.md` to document the current architecture (public SPA + Next.js admin/API + Railway MySQL with mock fallback) and added a mandatory Changelog Rule.
- Added `CHANGELOG.md` with a running history of recent changes.
- Added the "document last changes" rule to `AGENTS.md`.

### 2026-09-24 — Working internal site search
- Added `public/search.js` providing `window.SiteSearch`: a static index of all 14 pages plus live news, notices, and policy documents.
- Wired the fullscreen search overlay (`#site-search-input`) to debounced live results, Enter-to-search, ranked results with page/news/notice/policy tags, click-to-navigate (closes overlay), and a no-results message.
- Added search results styles (`#search-results`, `.search-result-item`, etc.).

### 2026-09-24 — Search restyled as a gold pill button
- The nav-bar Search item is now a distinct gold-gradient pill button with white icon/text and a hover glow, separated from the flat page links.

### 2026-09-24 — Nav bar polish
- Nav items now have a refined hover (pill background, lift, animated gradient underline) and an **active-page highlight** driven by `window.updateActiveNav()` (hooked into the router).

### 2026-09-24 — About page image gallery
- Replaced the 4 placeholder slots on the About page with real photos (`img1.png`, `img2.jpg`, `img3.jpg`, `img4.jpg`); gallery now also displays on mobile (was hidden).

### 2026-09-24 — About map interaction
- The Milne Bay map now has a hover hint ("Click to view full map") and opens a fullscreen lightbox with zoom in/out/reset buttons plus scroll-wheel and pinch zoom (Escape / backdrop / ✕ to close).

### 2026-09-24 — Hero slider images & responsiveness
- Slider switched from `background-size: cover` to `contain` with aspect-ratio-based heights (mobile 16/10, tablet 2/1, desktop 211/100) so banner images display fully on any device — no more half-cropped images.
- Replaced all three slider images (now PNGs: `mbp-img1.png`, `mbp-img2.png`, `mbp-img3.png`).

### 2026-09-24 — Plans section animations
- Provincial Education Plans thumbnail now animates on scroll-into-view (fade + rise), gently floats, and has a hover lift with gold border; all disabled under `prefers-reduced-motion`.

### 2026-09-24 — Mobile Latest News fixes
- News ticker stacks label-above-marquee on mobile; news cards get tighter padding, shorter thumbnails, and viewport-constrained sizing.

### 2026-09-24 — Policy files via upload
- Admin policy form now uses file uploads instead of URLs (`/api/upload` + `/api/policies`).

### 2026-09-24 — Security fixes, admin policies, stub pages
- Hardened headers, added admin policies UI, seed content for remaining stub pages (`policy`, `calendar`, `jobs`, `exams`, `parents`, `elearning`).

### 2026-09-23 — News banner management
- Added configurable news-page banner management in the admin dashboard.

### 2026-09-22 — Selection list fixes
- Fixed all audit findings and Grade 11 selection list issues on the Post Primary page.

### 2026-09-20 — Database error passthrough
- API now returns actual `mysql2` error messages to the admin UI instead of generic fallbacks.

### 2026-09-19 — Railway MySQL integration
- Added Railway MySQL connection with **auto-seed** on first connect, per-call connection retry (no cached failures), and **mock-data fallback** so the site functions without a database.
- Moved SPA rewrites from middleware to `next.config.mjs`; middleware now handles auth only.

### 2026-09-17 — Student administration
- Added Grade 9 / Grade 11 selection list support, bulk CSV student upload, student export, and unified admin button styles (mock-data only at that time).