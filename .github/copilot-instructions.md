## Quick orientation for AI coding agents

This is a small Create React App (CRA) site for "De Waal Psychology". The goal for contributors is to edit static content, styles, and static assets (images/fonts) — there is no backend API in this repo.

- Framework: React 18 + react-scripts (CRA). See `package.json` scripts: `npm start`, `npm test`, `npm run build`, `npm run deploy` (uses `gh-pages`).
- Entry points: `src/index.js` -> `src/App.js` -> `src/pages/Home.js` (the entire site is currently mounted in `Home`).

## Key files and patterns (do this first)
- Content lives in `src/utils/content.js`. Update text, lists (services, resources, books) here rather than hard-coding in components.
- Visuals & fonts: `src/assets/` contains images (`herobanner.png`, `logo.svg`, etc.) and `.ttf` font files. Fonts are wired via `src/styles/App.scss` using `@font-face` and then used in `.hero-text` etc.
- Styles: single SCSS file `src/styles/App.scss`. Follow existing variable usage (e.g. `$hero-height`) and nesting patterns.
- Parallax: `react-scroll-parallax` is used. `src/App.js` wraps the app with `ParallaxProvider`; `Home.js` uses `ParallaxBanner`, `ParallaxBannerLayer`, and `Parallax`.

## Conventions & examples (concrete edits)
- To change the site title shown in the hero, edit `content.title` in `src/utils/content.js` and update `Home.js` to consume it (currently the hero text is hard-coded to "De Waal Psychology").
- To replace the hero image: swap `src/assets/herobanner.png` and keep the same import in `src/pages/Home.js` (banner imported as `bannerImg`).
- To add a new font: place `.ttf` in `src/assets`, add an `@font-face` entry in `src/styles/App.scss` and import the font file (relative path) or import it in `src/App.js` if you prefer explicit JS import.

## Build, test, deploy notes
- Local dev: `npm start` — CRA dev server on http://localhost:3000.
- Tests: `npm test` (uses `@testing-library/react`). `src/setupTests.js` is present.
- Production build: `npm run build`.
- Deploy: `npm run deploy` — project uses `gh-pages` to publish to the `homepage` in `package.json` (http://antonvoltchok.github.io/dwp/).
- Note: `proxy` in `package.json` currently points to the GitHub Pages URL; this is likely unused for local API proxying and can be removed if backend APIs are added.

## Developer tips and gotchas
- Routing is commented out in `src/App.js` (Router + Routes commented). If enabling routing, update CRA `homepage`/base path considerations before deploying.
- The project is static — there are no API calls or environment variables to manage. Changes are mostly content, style, and images.
- License / fonts: `src/temp/FONTS/` contains license/readme files (OFL, Read_Me_First). Check those before using fonts commercially.

## Where to look for quick edits
- Text/content: `src/utils/content.js`
- Hero/landing layout: `src/pages/Home.js` and `src/styles/App.scss`
- Fonts & assets: `src/assets/*` and `src/temp/FONTS/*` (licenses)
- Entry point / app wrapper: `src/App.js` and `src/index.js`

If any section above is unclear or you'd like more examples (PR template suggestions, branching rules, or CI commands), tell me which area to expand and I'll iterate.
