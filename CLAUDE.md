# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern static academic homepage for Yusong Wang (PhD candidate, AI4Science). Hosted on GitHub Pages at https://yusowa0716.github.io/. Data-driven architecture: all content lives in JSON files, rendered by vanilla JS.

## Development

No build system, no package manager, no framework. Plain HTML/CSS/JS with `fetch()` for JSON data.

- **Preview locally**: `python3 -m http.server` (required — `fetch()` doesn't work over `file://`)
- **Deploy**: Push to `main` branch; GitHub Pages auto-deploys

## Architecture

```
index.html          — Semantic HTML shell (no hardcoded content)
css/style.css       — Design system: CSS custom properties, dark/light themes, responsive
js/main.js          — Data loading, DOM rendering, interactions (theme, nav, scroll-reveal)
data/
  profile.json      — Personal info, bio, social links, research interests, collaborators
  publications.json — All publications
  news.json         — News entries
  competitions.json — Competition entries
  CV_Yusong_Wang.pdf
images/             — Publication preview images and profile photo
```

### Data Flow

`main.js` fetches all 4 JSON files in parallel via `Promise.all`, then calls render functions that inject HTML into the empty section containers in `index.html`.

### CSS Theming

All colors and spacing use CSS custom properties defined in `:root` (light) and `[data-theme="dark"]` (dark). The `data-theme` attribute on `<html>` controls the active theme, persisted in `localStorage`.

### Key Patterns

- **Author formatting**: In `publications.json`, wrap the site owner's name in `**double asterisks**` — `main.js` converts this to `<strong>` tags
- **Publication titles**: Allow inline HTML (e.g., `<sup>` for superscripts like P<sup>3</sup>M)
- **Image hover**: Publications with an `imageHover` field show a second image on card hover via CSS opacity transition
- **Highlighted papers**: `"highlight": true` in publications.json gives a gold-bordered card
- **Scroll reveal**: Elements with class `reveal` animate in via IntersectionObserver

## Updating Content

Edit the JSON files in `data/` — no HTML changes needed. See `CONTENT-GUIDE.md` for detailed instructions.
