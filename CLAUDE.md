# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page personal portfolio (React + TypeScript + Vite) for Sandesh Gadal, hosted at
sandeshgadal.com.np. No backend, no routing, no test suite. It's one scrolling page assembled
from section components that render typed content from `src/app/data/`.

**Read `.claude/README.md` first.** It indexes the architecture, design system, content guide,
feature list, roadmap and decision log in `.claude/docs/`.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b (strict type-check) then vite build
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test runner. `npm run build` is the correctness gate.

`package.json` pins `vite` to `npm:rolldown-vite@7.2.5` via `overrides`. Use npm (lockfile is
`package-lock.json`).

## Essentials

- **Content** lives in `src/app/data/` (`profile`, `projects`, `experience`, `skills`, `writing`).
  Edit data, not components, to change what the site says. Links are defined once in `profile.ts`.
- **Page order** is the list in `src/app/App.tsx`. Each section uses `<Section id index title>`
  from `components/section.tsx`; renumber `index` props if you reorder.
- **Theming**: dark-first; light/dark via `.theme-dark` on `<html>`, set before paint by an inline script in
  `index.html`, then managed by `useTheme()` in `src/app/lib/hooks.ts` (owned by the navbar).
  Brand tokens (`--blue`, `--yellow`, `--ink`, `--paper`, …) live in `src/styles/theme.css` and are
  mapped to Tailwind with `@theme inline` in `src/styles/index.css`. Use tokens, never hex values.
- **Design rules**: `.claude/docs/design-system.md` ("Midnight & Lime": dark-first, electric-lime accent, violet secondary,
  Schibsted Grotesk display, three.js hero orb, GSAP scroll effects via `useGsap`).
- **Command palette**: ⌘K in `components/command-menu.tsx`; add new sections to its list too.
- **Copy rules**: `.claude/docs/content-guide.md`. Never invent metrics, dates or clients; ask.
- **UI primitives**: `src/app/components/ui/` is vendored shadcn/Radix. Only `Input`/`Textarea` are used.
  Compose; don't edit internals unless fixing a real bug.
- **Contact form**: EmailJS via `src/app/services/mail.ts`, keys `VITE_EMAILJS_*` in `.env` (gitignored).
- **Analytics**: GTM `GTM-KVSS658B` hardcoded in `index.html`.
- **Imports**: no `@/` alias; use relative paths.
