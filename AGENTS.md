<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Rules

## Document last changes (mandatory)

- Refer to `README.md` for an accurate description of the site architecture (public SPA in `public/`, Next.js admin/API in `src/`, Railway MySQL with mock fallback).
- **After every change** (code, assets, or config) add an entry to `CHANGELOG.md` under **Last Changes**, newest first, with the date, the commit-message summary, and a one-line description. Do not leave the changelog stale.
- Read `README.md` and `CHANGELOG.md` before starting work so you understand the current state of the project.
