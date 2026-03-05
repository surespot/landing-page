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

The menu on the landing page uses **static data** (no backend). Contact and links (Privacy, Terms) are in the footer.

## Lint

```bash
npm run lint
```
