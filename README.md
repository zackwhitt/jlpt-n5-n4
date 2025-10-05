# JLPT N5–N4 Study App (PWA)

A minimal offline-first PWA scaffold to study Japanese from JLPT N5 to N4.

## Quick start

```bash
npm i
npm run dev
```

Then visit the local dev URL printed by Vite.

## Build

```bash
npm run build && npm run preview
```

The PWA manifest and service worker are provided by `vite-plugin-pwa`.


## Share it with non‑technical users

### Option A — Host it (recommended)
1. Push this folder to a GitHub repo (default branch: `main`).
2. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The included workflow (`.github/workflows/deploy.yml`) will build and publish your site.
4. Share the Pages URL. Users open it and tap **Install** on the banner to add it like a native app.

### Option B — Netlify/Vercel
- Netlify: drag the `dist/` folder from `npm run build` into the Netlify UI, or connect your repo. The included `public/_redirects` handles SPA routing.
- Vercel: connect the repo, set framework to Vite (defaults are fine).

### Installing the PWA
- **Android (Chrome/Edge):** visit the link → Install banner appears → Install.
- **iPhone/iPad (Safari):** tap **Share** → **Add to Home Screen**.
- **Desktop (Chrome/Edge):** address bar → Install icon (or three‑dot menu → **Install app**).

No app store accounts required. Updates are automatic; users get new versions on next visit.
