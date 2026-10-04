# Surespot Landing Page

Landing site for **Surespot** — food delivery for the Surespot brand (Lagos). Built with React, TypeScript, Vite, and Tailwind CSS.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **React Router** (for Terms of Service and Privacy Policy pages)

## Getting started

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project overview

- **Landing page** (`/`) — Hero, About, Popular Menu (static), Footer with contact and app store badges. Fade-in-up scroll animations on sections.
- **Terms of Service** (`/terms`) — Full terms with sidebar table of contents and scroll-spy (sidebar hidden on mobile/tablet).
- **Privacy Policy** (`/privacy`) — Same layout as Terms; customer privacy policy.

The popular menu is loaded from the backend (`GET /food-items/popular`) with a static fallback if the API is unreachable. The newsletter form posts to `POST /newsletter/subscribe`. Both go through same-origin `/api/*` (see below). Contact and links (Privacy, Terms, Support) are in the footer.

## Lint

```bash
npm run lint
```

## Deployment (self-hosted)

Same flow as the backend and admin dashboard: push to `main` → GitHub Actions builds the Docker image (nginx serving the Vite build), pushes it to GHCR, copies `compose-prod.yml` to the server and runs `docker compose up -d`.

- Server path: `/opt/surespot-landing-prod`, container `surespot-landing-prod`, bound to `127.0.0.1:5002`
- Host nginx site: [`deploy/surespot.ng.nginx.conf`](deploy/surespot.ng.nginx.conf) (`surespot.ng`, `www.surespot.ng`). It proxies `/` to the container and exposes only `/api/food-items/popular` and `/api/newsletter/subscribe` from the backend, so no CORS change is needed.
- GitHub secrets (same as other repos): `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_SSH_PORT`
- Optional GitHub *variables*: `VITE_APP_STORE_URL`, `VITE_PLAY_STORE_URL` (store badges fall back to the `#app` section when unset)
- `public/robots.txt` and `public/sitemap.xml` are served at the site root; add new routes to the sitemap and `DocHead.tsx`.

TLS (after DNS for `surespot.ng` points at the server):

```bash
sudo certbot --nginx -d surespot.ng -d www.surespot.ng --redirect
```
