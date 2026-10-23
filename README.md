# GAREMO Tours

The website of **GAREMO Tours**, a Tbilisi-based travel project offering small-group and private journeys across Georgia, and DMC services (group travel, pilgrimages, corporate and special interest tours) for travel partners in Georgia, Armenia and Azerbaijan.

It is a single-page site with a separate photo gallery, built around hand-drawn SVG illustrations and smooth scroll-driven animations.

## Features

- **Home page sections:** Hero, About, Founders, Tours, Travel, Gallery preview, Letters from guests, For travel partners, Contact
- **Gallery page** (`/gallery`): masonry feed with infinite loading and an animated lightbox
- **Animations:** GSAP timelines and ScrollTrigger for scroll reveals, SVG line drawing, parallax and micro-interactions. Every animation respects `prefers-reduced-motion`.
- **Light and dark theme** with a circular view-transition reveal
- **SEO:** metadata and canonical URLs, Open Graph and Twitter cards, JSON-LD (TravelAgency, WebSite, WebPage, ImageGallery, BreadcrumbList), sitemap with images, robots.txt, web app manifest and icons

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) (strict) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) with [Base UI](https://base-ui.com) |
| Animation | [GSAP 3](https://gsap.com) with `@gsap/react`, ScrollTrigger and DrawSVG |
| Icons | [Lucide](https://lucide.dev) |
| Fonts | Geist via `next/font` |
| Linting | ESLint 10 with `typescript-eslint` and React plugins |

## Project structure

```
garemotours/
├── public/                     # Static files served as-is
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout: fonts, global metadata, JSON-LD, header, theme script
│   │   ├── page.tsx            # Home page (composes all sections)
│   │   ├── gallery/            # /gallery page, its metadata and social images
│   │   ├── globals.css         # Tailwind setup, theme tokens (light and dark), keyframes
│   │   ├── sitemap.ts          # /sitemap.xml
│   │   ├── robots.ts           # /robots.txt
│   │   ├── manifest.ts         # /manifest.webmanifest
│   │   ├── opengraph-image.tsx # Generated social card (also used by twitter-image.tsx)
│   │   ├── apple-icon.tsx      # Generated iOS home screen icon
│   │   └── icon.svg            # Favicon
│   ├── assets/media/
│   │   ├── images/             # Photos (imported statically, optimised by next/image)
│   │   └── svgs/               # Source illustrations (converted into React components)
│   ├── components/             # One folder per feature or section
│   │   └── <feature>/
│   │       ├── views/          # React components (markup)
│   │       ├── hooks/          # Behaviour and animations (GSAP)
│   │       └── helpers/        # Content, constants and pure functions
│   └── lib/
│       ├── site.ts             # Site config: name, URL, description, contacts, colours
│       ├── seo.ts              # Structured data (JSON-LD) builders
│       ├── gsap.ts             # GSAP with registered plugins
│       ├── intro.ts            # Shared intro timings and reduced-motion query
│       ├── press.ts            # Pointer "press" and tilt effect for tiles
│       └── theme.ts            # Theme bootstrapping script
├── .env.example                # Environment variables template
├── next.config.ts
└── package.json
```

The sections under `src/components` are: `hero`, `about`, `divider`, `founders`, `tours`, `travel`, `gallery`, `letters`, `partners`, `contact`, plus the shared `header`, `backToTop`, `scrollbar`, `theme` and `ui`.

## Getting started

### Prerequisites

- **Node.js 20.9 or newer** (22 LTS recommended)
- **npm** (the repository includes `package-lock.json`)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url> garemotours
cd garemotours

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL of the site. Used for canonical URLs, sitemap, robots and structured data. Defaults to `https://garemotours.com`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No | Bing Webmaster Tools verification code |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build |
| `npm run build:pages` | Static export for GitHub Pages (run with `GITHUB_PAGES=true`, see Deployment) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint on `src` |
| `npm run check-all` | Generate route types, then run ESLint and the TypeScript type check |

## Conventions

- **Imports** use the `src/*` path alias, for example `import { siteConfig } from 'src/lib/site'`.
- **Functions** are written as arrow functions, including components and default exports.
- **Components** keep markup in `views/`, behaviour in `hooks/` and content in `helpers/`.
- **Animations:**
  - Use `useGSAP` with a `scope`, and `gsap.matchMedia()` with separate reduced-motion and full-motion branches.
  - Elements that animate in start with the `invisible` class and are revealed with `autoAlpha`.
  - Give every ScrollTrigger its own config object; never share one between tweens.
- **Content** (texts, tours, letters, contacts) lives in each feature's `helpers/index.ts`. Site-wide details live in `src/lib/site.ts`.

## Deployment

### GitHub Pages (current)

The site is published as a static export to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

- **One-time setup:** in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
- **What the workflow does:**
  - Runs `npm run build:pages` with `GITHUB_PAGES=true`. This switches `next.config.ts` to `output: 'export'`, applies the repository base path (for example `/garemo-tours`) and turns off Cache Components, which a static export does not support.
  - `scripts/optimizeImages.mjs` then writes resized WebP copies of every photo. `src/lib/imageLoader.ts` points `next/image` at them, since Pages cannot optimise images on request.
  - Uploads `out/` and deploys it.
- **Optional:** add `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` as repository **variables** (Settings → Secrets and variables → Actions → Variables).
- **Custom domain:** add it in Settings → Pages. The workflow picks up the new URL and drops the base path automatically.

To test the Pages build locally (in Git Bash; `MSYS_NO_PATHCONV` keeps the base path from being rewritten into a Windows path):

```bash
MSYS_NO_PATHCONV=1 GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/garemo-tours NEXT_PUBLIC_SITE_URL=https://wero444.github.io/garemo-tours npm run build:pages
```

Serve the `out/` folder under `/garemo-tours/` to preview it.

### Node.js hosting

The site also runs anywhere Next.js 16 runs, for example [Vercel](https://vercel.com). There, the full feature set (Cache Components, on-demand image optimisation) is used.

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. Run `npm run build`, then `npm run start` (or let your hosting platform do it).

After the first deploy on either host, submit the site's `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
