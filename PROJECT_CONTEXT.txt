# PROJECT_CONTEXT.md — Diakhite Air Proteger website

**Audience:** an AI coding assistant with no prior exposure to this repository.
**Purpose:** enough context to make correct changes without exploring first.

| Field | Value |
| --- | --- |
| Commit documented | `bd6c1bc366dac0eda8078d5b93c2c7220314a28e` (`bd6c1bc`) |
| Commit subject | `feat: add Hydraulique to CVC services offering` |
| Commit date | 2026-08-28 19:42:12 +0000 |
| Branch | `cursor/cvc-plumbing-services-95cc` |
| Working tree at time of writing | Source tree clean; context files are the documentation change |
| Documentation status | Context reflects source commit `bd6c1bc`, immediately before this documentation commit |
| Verified at this SHA | `next typegen`, `tsc --noEmit`, ESLint, production build, HTTP, image optimizer, responsive browser, metadata, schema, anchor, and navigation checks pass |

> This context reflects source commit `bd6c1bc` immediately before its own documentation commit. Later source changes require re-verifying the affected sections.

---

## 1. TL;DR for the assistant

- Marketing website for a French ventilation/HVAC company publicly branded **"Diakhite Air Proteger"**. The registered legal denomination remains **"AIR PROTEGER"**. Single locale, French only (`<html lang="fr">`), French route slugs.
- Stack: **Next.js 16.3.2 App Router** + **React 19.2.8** + **TypeScript 5.9.3 (strict)** + **Tailwind CSS v4.3.3**. Package manager is **npm** (`package-lock.json`, lockfileVersion 3). Node **≥ 20.9.0**.
- **This is Next.js 16, not 13/14/15.** Read section 2 before writing any code. Most pre-16 patterns you know are removed or renamed.
- **Tailwind is v4.** There is no `tailwind.config.js` and there never should be. Tokens live in `@theme {}` inside `src/app/globals.css`. Never emit `@tailwind base;` / `@tailwind components;` / `@tailwind utilities;`.
- **Everything is a Server Component except the three focused interactive leaves:** `src/components/layout/SiteShell.tsx`, `src/components/layout/MobileMenu.tsx`, and `src/components/home/ProcessCarousel.tsx`. Do not widen these boundaries without a concrete interactivity need.
- **Do NOT "simplify" `SiteShell.tsx` away, and do NOT move menu state into `Navbar`.** It exists for two hard technical reasons (section 8.1). Collapsing it re-breaks the mobile menu.
- **Do NOT convert `MobileMenu.tsx`'s inline styles to Tailwind classes** as a drive-by cleanup. It is deliberate (section 8.2). It is acknowledged technical debt, but changing it requires re-verifying the stacking-context fix.
- **All image paths must go through `src/data/images.ts`.** Never inline a URL or `/images/...` path in a component.
- `/services` is a complete static editorial page with exactly five ordered disciplines: Chauffage, Ventilation, Climatisation, Hydraulique, then Plomberie & sanitaire. `/contact` has a polished semantic form foundation and contact-details panel; online submission is deliberately disabled because there is no transport. `/mentions-legales` publishes verified company facts. `/a-propos`, `/realisations`, and `/blog` share a polished `ComingSoon` state. There is no CMS or detail routes.
- `src/data/site.ts` is the source of truth for the brand, production URL, contact details, registered office, and legal identifiers. The phone is user-confirmed; the email remains an existing, unverified contact value.
- 13 internal `<Link>` instances point at **9 routes that do not exist** (section 9.6). This is known. Do not treat a 404 as a new bug you introduced.

---

## 2. Critical Next.js 16 warnings

This is the highest-value section. Your training data likely predates Next.js 16 and will produce deprecated or removed patterns. Source: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` (bundled, version-matched).

### 2.1 Quick reference table

| Topic | Pre-16 (WRONG here) | Next.js 16 (CORRECT) |
| --- | --- | --- |
| Bundler | `next dev --turbopack` | Turbopack is **default** for `next dev` AND `next build`. The flag is unnecessary. Opt out with `--webpack`. |
| Linting | `next lint` | **`next lint` is REMOVED.** Run `eslint` directly. `next build` no longer lints. The `eslint` key in `next.config.ts` is also removed. |
| Middleware | `middleware.ts`, `export function middleware()` | **`proxy.ts`**, `export function proxy()`. Runtime is **nodejs-only and not configurable** — there is no `edge` runtime for `proxy`. Config flags renamed (`skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`). |
| Request APIs | `const { slug } = params` | **Async-only.** `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` must be awaited. Synchronous access is fully removed (not just deprecated). |
| Route prop types | `{ params }: { params: { slug: string } }` | Global type helpers **`PageProps<'/route'>`**, **`LayoutProps<'/route'>'`**, **`RouteContext<'/route'>`**. |
| Type helper import | `import type { PageProps } from 'next'` | **Do NOT import them.** They are declared in `declare global` in generated files and are ambiently available. |
| Typegen output | `.next/types/` | `next typegen` writes `.next/dev/types/` (dev) — see section 2.3. |
| `revalidateTag` | `revalidateTag('posts')` | **`revalidateTag('posts', 'max')`** — the second `cacheLife` argument is required. One-arg form is a TypeScript error. |
| `cacheLife` / `cacheTag` | `unstable_cacheLife`, `unstable_cacheTag` | **Stabilized.** `import { cacheLife, cacheTag } from 'next/cache'`. |
| New cache APIs | — | **`updateTag(tag)`** (Server-Actions-only, read-your-writes, expires + refreshes in the same request) and **`refresh()`** (refresh the client router from a Server Action), both from `next/cache`. |
| PPR | `experimental: { ppr: true }`, `export const experimental_ppr = true` | **`cacheComponents: true`** at the top level of the config. The experimental flag and the route-segment export are removed. |
| `dynamicIO` / `useCache` | `experimental.dynamicIO`, `experimental.useCache` | Removed. Fold into `cacheComponents`. |
| Turbopack config | `experimental: { turbopack: {} }` | Top-level `turbopack: {}`. |
| Runtime config | `serverRuntimeConfig`, `publicRuntimeConfig`, `next/config` | **Removed.** Use `process.env` / `NEXT_PUBLIC_*`. For true runtime reads, `await connection()` from `next/server` first. |
| Parallel routes | implicit fallback | Every parallel-route slot **requires an explicit `default.js`/`default.tsx`** or the build fails. |
| Dev output dir | `.next/` | **`next dev` writes `.next/dev/`**, separate from `next build`, so the two can run concurrently. A lockfile prevents two `next dev` on one project. |
| `next/legacy/image` | supported | Deprecated. Use `next/image`. |
| AMP | `next/amp`, `useAmp`, `amp` config | Fully removed. |
| `devIndicators` | `appIsrStatus`, `buildActivity`, `buildActivityPosition` | Removed (indicator itself remains). |
| `unstable_rootParams` | supported | Removed. Use `next/root-params`. |
| Scroll behavior | Next overrode `scroll-behavior: smooth` during navigation | No longer overridden by default. Opt in with `data-scroll-behavior="smooth"` on `<html>`. **Relevant here:** `globals.css` sets `html { scroll-behavior: smooth }` and `layout.tsx` does **not** set the attribute, so route transitions animate the scroll rather than jumping. |
| Build output | `size` / `First Load JS` columns | Removed from `next build` output. |
| ESLint config | `.eslintrc.json` | `@next/eslint-plugin-next` defaults to **flat config**. This repo already uses `eslint.config.mjs`. |
| Node / TS / browsers | Node 18 ok | **Node ≥ 20.9.0**, TypeScript ≥ 5.1, Chrome/Edge/Firefox 111+, Safari 16.4+. |

### 2.2 `next/image` defaults changed (breaking)

| Option | Pre-16 default | 16 default | Consequence here |
| --- | --- | --- | --- |
| `images.minimumCacheTTL` | 60 s | **14400 s (4 h)** | Unsplash images cache for 4 h by default. |
| `images.qualities` | all allowed | **`[75]`** | A `quality={85}` prop is **coerced to 75**. To use other values you must list them in `images.qualities`. Note `src/data/images.ts` embeds `q=85` / `q=80` in the **Unsplash URL query string** — that is Unsplash's own parameter and is unaffected by this Next.js setting. |
| `images.imageSizes` | `[16, 32, 48, ...]` | **`16` removed** | Smaller `srcset`. |
| `images.maximumRedirects` | unlimited | **3** | — |
| `images.dangerouslyAllowLocalIP` | n/a | **`false`** — local IP optimization blocked | — |
| `images.domains` | supported | **Deprecated** | Use `remotePatterns`. This repo already does. |
| local `src` with query string | allowed | Requires **`images.localPatterns[].search`** | If you add e.g. `<Image src="/images/logo/ventila-logo.svg?v=2" />`, you must configure `localPatterns`. |

### 2.3 The global route type helpers — how they actually work here

`src/app/layout.tsx` uses `LayoutProps<"/">` with **no import statement**. That is correct and intentional.

- `next dev`, `next build` and `next typegen` generate `.next/dev/types/routes.d.ts`.
- That file contains `declare global { interface PageProps<...> ...; type LayoutProps<...> ...; type RouteContext<...> ... }`.
- `next-env.d.ts` (generated, gitignored, **do not edit**) pulls it in:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";
```

- `tsconfig.json` also includes `".next/types/**/*.ts"` and `".next/dev/types/**/*.ts"`.

Current generated route union (regenerate after adding a route):

```ts
type AppRoutes = "/" | "/a-propos" | "/blog" | "/contact" | "/realisations" | "/services"
type LayoutRoutes = "/"
```

**Consequence:** `tsc --noEmit` only succeeds because `.next/dev/types/` already exists on this machine. On a clean checkout it fails. Always run `npx next typegen` before `npx tsc --noEmit` in CI (section 9.7).

**Note:** `typedRoutes` is *not* enabled in `next.config.ts`, so `<Link href>` is plain `string` and the 10 broken links in section 9.6 do **not** fail the type check.

### 2.4 Tailwind CSS v4 — no JS config

Tailwind v4 is CSS-first. In this repo:

- `postcss.config.mjs` registers exactly one plugin: `@tailwindcss/postcss`.
- `src/app/globals.css` starts with `@import "tailwindcss";`.
- Design tokens are declared with `@theme { --color-navy-900: #080f1e; ... }`.
- Custom utilities are declared with the v4 **`@utility`** directive, not as plain `.class` rules.

**Never** do any of the following:

```css
/* WRONG — v3 syntax, will not work */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// WRONG — do not create this file
// tailwind.config.js
module.exports = { content: [...], theme: { extend: { colors: {...} } } }
```

There is no `content` array; v4 discovers sources automatically.

---

## 3. Exact dependency versions

`package.json`:

```json
{
  "name": "diakhite-air-proteger",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.3.2",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.2",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

Resolved versions from `package-lock.json` (lockfileVersion 3, 439 packages):

| Package | Declared | **Locked** | Kind |
| --- | --- | --- | --- |
| `next` | `16.3.2` | **16.3.2** | runtime |
| `react` | `19.2.8` | **19.2.8** | runtime |
| `react-dom` | `19.2.8` | **19.2.8** | runtime |
| `@tailwindcss/postcss` | `^4` | **4.3.3** | dev |
| `tailwindcss` | `^4` | **4.3.3** | dev |
| `typescript` | `^5` | **5.9.3** | dev |
| `eslint` | `^9` | **9.39.5** | dev |
| `eslint-config-next` | `16.3.2` | **16.3.2** | dev |
| `@types/node` | `^20` | **20.19.43** | dev |
| `@types/react` | `^19` | **19.2.18** | dev |
| `@types/react-dom` | `^19` | **19.2.5** | dev |

Environment notes:

- **Package manager: npm.** Use `npm install` / `npm ci`. There is no `pnpm-lock.yaml`, `yarn.lock` or `bun.lockb`.
- **Node requirement: `>=20.9.0`** (from `next@16.3.2` `engines`). Dev machine observed running Node v22.14.0, npm 10.9.7.
- **Zero runtime dependencies beyond Next/React.** No `clsx`, no `tailwind-merge`, no `framer-motion`, no icon library, no form library, no CMS client. `src/lib/utils.ts` hand-rolls `cn()` specifically to avoid adding `clsx`. All icons are hand-inlined SVG. Keep it that way (section 11).

---

## 4. Full file tree

```
/workspace
├── AGENTS.md                     Agent rules; contains the managed `nextjs-agent-rules`
│                                 block re-written by `next dev`. Commit it if it shows
│                                 up dirty; deleting it only regenerates it.
├── CLAUDE.md                     One line: `@AGENTS.md` (pointer only).
├── README.md                     Minimal. Still documents `npm run lint` as "Run ESLint" —
│                                 accurate, since the script is `eslint`, not `next lint`.
├── package.json                  Deps + 4 scripts. `lint` is bare `eslint`.
├── package-lock.json             npm lockfile, lockfileVersion 3.
├── next.config.ts                ONLY setting: images.remotePatterns → images.unsplash.com.
├── postcss.config.mjs            Single plugin: @tailwindcss/postcss. (Tailwind v4 entry.)
├── eslint.config.mjs             Flat config: eslint-config-next core-web-vitals + typescript.
├── tsconfig.json                 strict; `@/*` → `./src/*`; includes .next/types + .next/dev/types.
├── next-env.d.ts                 GENERATED, gitignored, DO NOT EDIT. Pulls in route typegen.
├── tsconfig.tsbuildinfo          GENERATED (incremental build cache). Gitignored via *.tsbuildinfo.
├── .gitignore                    Ignores /node_modules, /.next/, /out/, /build, .env*, *.tsbuildinfo,
│                                 next-env.d.ts.
├── .next/                        GENERATED. Only `.next/dev/` exists (no production build yet).
│                                 `.next/dev/types/{routes,root-params,cache-life}.d.ts` + validator.ts
│
├── public/
│   ├── file.svg                  DEAD — create-next-app scaffold leftover. Unreferenced.
│   ├── globe.svg                 DEAD — scaffold leftover. Unreferenced.
│   ├── next.svg                  DEAD — scaffold leftover. Unreferenced.
│   ├── vercel.svg                DEAD — scaffold leftover. Unreferenced.
│   ├── window.svg                DEAD — scaffold leftover. Unreferenced.
│   └── images/
│       ├── about/ventilation-installation.svg         ORPHANED placeholder (see note)
│       ├── hero/conduits-ventilation-metalliques-
│       │        professionnels.jpg                    ACTIVE homepage LCP photograph
│       ├── hero/ventilation-hero.svg                  ORPHANED placeholder
│       ├── logo/ventila-logo.svg                      ORPHANED-ish: referenced by
│       │                                              images.logo.main but no component
│       │                                              reads images.logo. Logo is inline SVG.
│       ├── projects/projet-0{1,2,3,4}.svg             ORPHANED placeholders (4 files)
│       └── services/{ventilation-residentielle,
│                     ventilation-commerciale,
│                     ventilation-industrielle,
│                     maintenance-ventilation}.svg     ORPHANED placeholders (4 files)
│
└── src/
    ├── app/
    │   ├── layout.tsx            Root layout. SERVER. Metadata, fonts, global Organization
    │   │                         JSON-LD, <SiteShell>{children}</SiteShell> + <Footer/>.
    │   ├── page.tsx              Home route `/`. SERVER. Composes the 5 home sections.
    │   ├── globals.css           THE design system. Tailwind v4 @theme tokens + @utility classes.
    │   ├── favicon.ico           Brand app-icon fallback (16, 32, and 48px).
    │   ├── icon.svg              Scalable brand app icon; blue field + white fan motif.
    │   ├── a-propos/page.tsx     SERVER. Polished shared coming-soon state.
    │   ├── blog/page.tsx         SERVER. Polished shared coming-soon state.
    │   ├── contact/page.tsx      SERVER. Metadata + contact-page composition.
    │   ├── mentions-legales/
    │   │   └── page.tsx          SERVER. Verified company facts and route metadata.
    │   ├── realisations/page.tsx SERVER. Polished shared coming-soon state.
    │   └── services/page.tsx     Full editorial page. SERVER. Metadata + JSON-LD composition.
    │
    ├── components/
    │   ├── home/
    │   │   ├── Hero.tsx          SERVER. Full-bleed hero; renders <Process/> as last child.
    │   │   ├── Process.tsx       SERVER. 4-step glass strip and centralized step content.
    │   │   ├── ProcessCarousel.tsx **CLIENT**. Mobile scroll/dot synchronization only.
    │   │   ├── Services.tsx      SERVER. Light-background service cards (carousel → grid).
    │   │   ├── AboutPreview.tsx  SERVER. Text + stats + image, 1 col → 2 cols at lg.
    │   │   ├── Projects.tsx      SERVER. Portfolio cards, carousel → 2×2 → 12-col bento.
    │   │   └── ContactCTA.tsx    SERVER. Slim brand-blue CTA band.
    │   ├── layout/
    │   │   ├── SiteShell.tsx     **CLIENT** ("use client"). Owns `menuOpen`. Load-bearing —
    │   │   │                     read section 8.1 before touching.
    │   │   ├── Navbar.tsx        SERVER. Fixed header + animated hamburger. Exports `navLinks`.
    │   │   ├── MobileMenu.tsx    **CLIENT** ("use client"). Viewport-level overlay. Inline
    │   │   │                     styles are deliberate — read section 8.2.
    │   │   └── Footer.tsx        SERVER. 4-column footer. Contains 5 broken links.
    │   ├── services/
    │   │   ├── ServicesHero.tsx          SERVER. Hero, breadcrumb, H1 and primary CTAs.
    │   │   ├── ExpertiseIntro.tsx        SERVER. Light editorial introduction.
    │   │   ├── ServicesEditorialGrid.tsx SERVER. Five-service asymmetric editorial layout.
    │   │   ├── WhyChooseUs.tsx           SERVER. Supportable trust themes.
    │   │   ├── ServicesProcess.tsx       SERVER. Five-step ordered process.
    │   │   └── ServicesCTA.tsx           SERVER. Contact CTA using repository facts.
    │   ├── contact/
    │   │   ├── ContactHero.tsx    SERVER. Route eyebrow, single H1 and introduction.
    │   │   ├── ContactForm.tsx    SERVER. Semantic form foundation; no active transport.
    │   │   └── ContactDetails.tsx SERVER. Phone, email, address and `/services` link.
    │   └── ui/
    │       ├── Button.tsx        SERVER. Link-or-button polymorph. 3 variants × 3 sizes.
    │       ├── Container.tsx     SERVER. Thin wrapper over `.site-container`.
    │       ├── SectionHeading.tsx SERVER. eyebrow + <h2> + description. Hardcodes <h2>.
    │       ├── GlassCard.tsx     **DEAD CODE.** Zero importers. See section 9.9.
    │       └── ComingSoon.tsx    SERVER. Shared one-H1 state for incomplete routes.
    │
    ├── data/
    │   ├── images.ts             Centralised image registry. THE single source of image paths.
    │   ├── service-page.ts       Five ordered service areas + trust and process contracts.
    │   ├── site.ts               Brand/contact/legal facts + production URL and Organization ID.
    │   ├── services.ts           `Service` interface + 4 services. Hrefs are all broken.
    │   └── projects.ts           `Project` interface + 4 projects. Hrefs are all broken.
    │
    └── lib/
        └── utils.ts             `cn()` — 3-line clsx replacement.
```

**Note on `public/images/`:** these 13 SVGs were the original placeholders. Commit `687f244` ("real Unsplash images") repointed `src/data/images.ts` at `images.unsplash.com` URLs but left the files in place. The homepage hero now uses the active local JPEG `hero/conduits-ventilation-metalliques-professionnels.jpg`; do not delete it with the placeholders. Only `logo/ventila-logo.svg` is still named in code (`images.logo.main`), and nothing reads `images.logo`; its embedded wordmark has nevertheless been updated to the current public brand so the tracked asset is not stale. All 13 SVG placeholders are safe to delete; 5 root-level scaffold SVGs likewise.

### Files that do NOT exist (and that you may be tempted to assume)

`middleware.ts` / `proxy.ts`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.*`, `not-found.tsx`, `error.tsx`, `loading.tsx`, `template.tsx`, `route.ts` (no API routes), `tailwind.config.*`, `.env*`, any test file or test runner, any CI workflow (`.github/`), and `/politique-confidentialite`.

---

## 5. Per-file breakdown

Server/Client rule for this repo: **Server Component unless the file contains a `"use client"` directive before statements.** The three client entries are `SiteShell`, `MobileMenu`, and the focused `ProcessCarousel` leaf.

### 5.1 `src/app/layout.tsx` — Server Component

Root layout. Server because it exports `metadata` (only legal in a Server Component) and holds no state.

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Diakhite Air Proteger — Solutions de ventilation performantes",
    template: "%s | Diakhite Air Proteger",
  },
  description: "Nous concevons, installons et entretenons des systèmes de ventilation efficaces, économiques et durables. Résidentiel, commercial et industriel.",
  keywords: [ /* 8 French/HVAC keywords, incl. AIR PROTEGER */ ],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) { ... }
```

Key details:

- **`LayoutProps<"/">` is used with no import.** See section 2.3. Do not add `import type { LayoutProps }`.
- Fonts: `Geist` and `Geist_Mono` from `next/font/google`, `display: "swap"`, `subsets: ["latin"]`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`. `globals.css` maps those into Tailwind via `@theme inline`.
- DOM shape — memorize this, section 8 depends on it:

```tsx
<html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
  <body className="min-h-full flex flex-col bg-navy-900 text-white">
    <SiteShell>{children}</SiteShell>   {/* → <Navbar/> <MobileMenu/> <main class="flex-1"/> */}
    <Footer />
  </body>
</html>
```

- `<body>` is `flex flex-col`; `<main>` inside `SiteShell` is `flex-1`, which is what keeps the footer at the bottom on short pages.
- `metadataBase` comes from `site.url`. The body begins with one native JSON-LD script describing the legal `Organization`; it uses `JSON.stringify(...).replace(/</g, "\\u003c")` per the bundled Next.js 16 guide. `<html>` has **no** `data-scroll-behavior="smooth"` while `globals.css` sets `scroll-behavior: smooth` — under Next 16 semantics route changes animate rather than jump (section 2.1).
- **The `<Footer/>` sits outside `SiteShell`,** so it is a plain Server Component and is not part of the client boundary.

### 5.2 `src/app/page.tsx` — Server Component

Home route `/`. No props, no metadata of its own (inherits the layout default title).

```tsx
export default function HomePage() {
  return (
    <>
      {/* Hero renders <Process /> as its last child so the glass step panel
          overlays the hero photograph. */}
      <Hero />
      <Services />
      <AboutPreview />
      <Projects />
      <ContactCTA />
    </>
  );
}
```

Gotcha: **`Process` is not rendered here.** It is a child of `Hero`. Adding `<Process />` to this list renders it twice.

### 5.3 Contact, legal, and incomplete route pages — all Server Components

`src/app/contact/page.tsx` composes `ContactHero`, `ContactForm`, and `ContactDetails`. It exports
route-specific canonical, robots, Open Graph, and Twitter metadata. `ContactHero` owns the route's
single H1; form and contact-detail sections use H2 headings.

The form contains labeled name, e-mail, optional telephone, project/service, building, message,
and required consent controls. It intentionally has no action, Server Action, client event handler,
API route, storage, or transport. Its submit button is disabled and says
`Envoi en ligne prochainement`; nearby copy states that entered values are neither transmitted nor
stored. The repository `mailto:` address is available both in the form notice and contact panel.

`src/app/mentions-legales/page.tsx` provides exactly one H1, static canonical/robots/Open
Graph/Twitter metadata, and semantic sections for AIR PROTEGER's verified publisher identity,
registration, activity, registered office, and contact details. It intentionally omits officer
names and unsupported hosting/editor information. The registered-office caveat does not imply
walk-in access.

`src/app/{a-propos,blog,realisations}/page.tsx` each renders the shared `ComingSoon` Server
Component with route-specific French copy. `ComingSoon` provides exactly one H1 and links to `/`,
`/services`, and `/contact`. It uses `Container`, `Button`, existing color tokens, and no client JS.
Metadata descriptions accurately describe the in-progress content without inventing claims.

### 5.4 `src/components/layout/SiteShell.tsx` — **CLIENT COMPONENT**

`"use client"` is on line 1. This is the app's only stateful shell. Read section 8.1 for *why* it exists.

```tsx
const LG_BREAKPOINT = 1024;

interface SiteShellProps {
  children: React.ReactNode;
}

export default function SiteShell({ children }: SiteShellProps)
```

Implementation:

```tsx
const [menuOpen, setMenuOpen] = useState(false);
const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
const closeMenu  = useCallback(() => setMenuOpen(false), []);

useEffect(() => {
  if (!menuOpen) return;
  const handleResize = () => {
    if (window.innerWidth >= LG_BREAKPOINT) setMenuOpen(false);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [menuOpen]);

return (
  <>
    <Navbar onMenuToggle={toggleMenu} menuOpen={menuOpen} />
    <MobileMenu isOpen={menuOpen} onClose={closeMenu} links={navLinks} />
    <main className="flex-1">{children}</main>
  </>
);
```

Key details and gotchas:

- **Render order is load-bearing:** `Navbar`, then `MobileMenu`, then `<main>`. `MobileMenu` must be a **sibling** of both.
- The resize listener only attaches while the menu is open. Rationale: the hamburger is `lg:hidden`, so a menu left open while the viewport grows past `lg` would be undismissable.
- `navLinks` is imported from `./Navbar` and passed down. `Navbar` is a Server Component, but a `"use client"` module may still import a plain serializable `const` from it — the array is inlined into the client bundle, the component is not.
- `children` crosses the client boundary as an already-rendered RSC payload, so **the page content stays a Server Component** despite being nested inside a client component. Do not "fix" this by adding `"use client"` downstream.

### 5.5 `src/components/layout/Navbar.tsx` — Server Component

Server despite `onClick`: the click handler is the `onMenuToggle` **prop received from a client parent**, so the JSX is authored in a Server Component but the callback identity comes from the client. This compiles because `Navbar` is only ever rendered by `SiteShell` (a client component), which makes it part of the client render tree at runtime.

> If you add a hook (`useState`, `useEffect`, …) to this file it will fail. Lift state to `SiteShell` instead.

Exported API:

```tsx
export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

interface NavbarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export default function Navbar({ onMenuToggle, menuOpen }: NavbarProps)
```

Key implementation details:

- Header shell: `fixed top-0 left-0 right-0 z-[60] bg-navy-950/90 backdrop-blur-xl border-b border-white/5`. **The `backdrop-blur-xl` here is the root cause of the whole `SiteShell` design** (section 8.1). The `z-[60]` is deliberately above `MobileMenu`'s `z-50`.
- Nav bar height is `h-16` = **4rem**. Multiple other files hardcode 4rem to clear it (`Hero` `pt-16`, `MobileMenu` `paddingTop: "4rem"`, stub pages `pt-24`). Changing `h-16` requires updating all of them.
- The public wordmark is a compact two-line lockup sourced from `site.brand`: `Diakhite Air` over `Proteger`. Narrow-screen typography drops from 15/9px to 13/8px so the logo, phone, and unchanged hamburger controls fit without overlap at 320px.
- Desktop links + phone + CTA are `hidden lg:flex`; mobile phone + hamburger are `flex lg:hidden`. The `lg` (1024px) breakpoint matches `SiteShell`'s `LG_BREAKPOINT`.
- **Animated hamburger.** Three `<span>`s share a base class:

```
absolute left-1/2 top-1/2 -ml-2 -mt-[0.75px] w-4 h-[1.5px] bg-white rounded-full transition-all duration-300 ease-in-out
```

  Per-line state:
  | Line | closed | open |
  | --- | --- | --- |
  | top | `-translate-y-[5px]` | `translate-y-0 rotate-45` |
  | middle | `opacity-100 scale-x-100` | `opacity-0 scale-x-0` |
  | bottom | `translate-y-[5px]` | `translate-y-0 -rotate-45` |

  **Gotcha, documented in the file:** centering uses `left-1/2 top-1/2` + negative margins (`-ml-2 -mt-[0.75px]`) instead of `-translate-x-1/2 -translate-y-1/2`. Tailwind v4 emits the discrete `translate` CSS property, so a centering translate would be **overwritten** by the animation's translate. Do not "clean this up" into translate-based centering.

- Accessibility on the button: `aria-label` toggles `"Fermer le menu"` / `"Ouvrir le menu"`, plus `aria-expanded={menuOpen}` and `aria-controls="mobile-navigation"` (which matches `MobileMenu`'s `id`).
- Phone number `+33651644657` / display `06 51 64 46 57` comes from `site.contact.phone` in every navigation, footer, contact, and services CTA occurrence. It is user-confirmed and intentionally takes precedence over third-party directory numbers.
- Local helpers (not exported): `LogoIcon()`, `PhoneIcon({ className }: { className?: string })`.

### 5.6 `src/components/layout/MobileMenu.tsx` — **CLIENT COMPONENT**

`"use client"` on line 29 (after the long leading doc comment — that is legal, the directive must precede *statements*, not comments).

```tsx
interface NavLink {
  readonly href: string;
  readonly label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: readonly NavLink[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps)
```

Note `links: readonly NavLink[]` with `readonly` members — required because `navLinks` is `as const`.

Two effects, both early-returning when closed:

1. **Escape to close** — `document.addEventListener("keydown", ...)`, deps `[isOpen, onClose]`.
2. **Scroll lock on BOTH `<html>` and `<body>`** — deps `[isOpen]`:

```tsx
const root = document.documentElement;
const { body } = document;
const previous = { root: root.style.overflow, body: body.style.overflow };
root.style.overflow = "hidden";
body.style.overflow = "hidden";
return () => {
  root.style.overflow = previous.root;
  body.style.overflow = previous.body;
};
```

  **Why both:** `globals.css` sets `html { overflow-x: hidden }`. Because the root element's overflow is therefore no longer `visible`, `<body>`'s overflow **stops propagating to the viewport** and `<html>` becomes the scrolling element. Locking `body` alone would leave the page scrollable behind the overlay. Prior inline values are captured and restored rather than blanket-cleared. **Do not simplify this to a body-only lock** unless you also remove `html { overflow-x: hidden }` (section 9.5).

Root element (`id="mobile-navigation"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Menu de navigation"`, `aria-hidden={!isOpen}`) is styled entirely with an inline `style` object:

```js
{
  position: "fixed", inset: 0, width: "100%", height: "100dvh", zIndex: 50,
  display: "flex", flexDirection: "column",
  background: "rgba(4, 8, 16, 0.97)",
  backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? "translateY(0)" : "translateY(-20px)",
  visibility: isOpen ? "visible" : "hidden",
  transition: `opacity 280ms ease-in-out, transform 280ms ease-in-out, visibility 0s linear ${isOpen ? "0s" : "280ms"}`,
  pointerEvents: isOpen ? "auto" : "none",
  overflowX: "hidden", overflowY: "auto",
  paddingTop: "4rem",
}
```

Critical behaviours:

- **Permanently mounted.** Toggled via opacity/transform/visibility/pointer-events so it can animate on the way **out** as well as in. Unmounting on close would skip the exit transition. Do not convert this to `{isOpen && <div .../>}`.
- **`visibility` is stepped, not interpolated:** `0s linear 0s` on open, `0s linear 280ms` on close, so the exit animation is not cut short. `visibility: hidden` also removes the panel's links from the tab order while closed (this is what fixes the old focusability bug — section 9.3).
- **There is no close button and no separate backdrop element.** This root *is* the backdrop. Consequently there is **no click-outside-to-close** region: only the navbar hamburger, a nav link, or `Escape` dismisses it. The navbar's animated hamburger *is* the close control.
- **`paddingTop: "4rem"`** reserves space for the header, which paints **above** this overlay (`z-60` vs `z-50`). Combined with `box-sizing: border-box` (from the global `*` reset) the total height stays `100dvh`.
- An in-overlay close button is **architecturally impossible** here, as the file comment explains: a `z-index` inside this element cannot escape the overlay's own `z-50` stacking context, so it would render under the header — invisible and unclickable. Do not re-add one without also restructuring the z-index hierarchy.
- Children: a `<nav aria-label="Navigation mobile">` mapping `links` to `<Link onClick={onClose}>`, then a footer block with the `tel:` link and a `/contact` CTA. **Hover states are implemented with `onMouseEnter` / `onMouseLeave` handlers that mutate `e.currentTarget.style`** — a consequence of the inline-style approach; there is no `:hover` selector available inline.
- Local helper: `PhoneIcon()` (no props).

### 5.7 `src/components/layout/Footer.tsx` — Server Component

No props. Rendered directly by `layout.tsx`, outside `SiteShell`.

Two module-level link arrays (not exported):

```tsx
const services = [
  { href: "/services/residentiel", label: "Ventilation Résidentielle" },
  { href: "/services/commercial",  label: "Ventilation Commerciale" },
  { href: "/services/industriel",  label: "Ventilation Industrielle" },
  { href: "/services/entretien",   label: "Entretien & Maintenance" },
];

const company = [
  { href: "/a-propos",     label: "À propos" },
  { href: "/realisations", label: "Nos Réalisations" },
  { href: "/blog",         label: "Blog" },
  { href: "/contact",      label: "Contact" },
];
```

- Layout: `<footer className="bg-navy-950 border-t border-white/6">` → `<Container className="py-12 md:py-16">` → `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`. Brand column spans `sm:col-span-2 lg:col-span-2`.
- Contact block uses `<address className="not-italic">` with **emoji** as icons (📞 ✉️ 📍), plus the verified registered office and concise AIR PROTEGER legal identity.
- Bottom bar: `© {new Date().getFullYear()} Diakhite Air Proteger. Tous droits réservés.` — **`new Date()` in a Server Component means the year is baked in at render time.** Fine for a dynamically rendered page; if you later make this statically cached, the year will freeze.
- Column headers use `<h3>`. On the stub pages this yields `h3` without a preceding `h1` (section 9.4).
- **All 4 `services` hrefs plus `/politique-confidentialite` are 404s** (section 9.6). `/mentions-legales` now exists.
- Local helper: `LogoIcon()` — a byte-identical duplicate of `Navbar`'s. Not shared.

### 5.8 `src/components/home/Hero.tsx` — Server Component

No props. Static content; no interactivity.

```tsx
<section
  className="relative flex flex-col min-h-[85svh] md:min-h-svh pb-6 md:pb-10"
  aria-labelledby="hero-heading"
>
```

- **`85svh` below `md`, full `svh` from `md` up.** Rationale in the file: on a short viewport (320×568) the hero should be driven by its content rather than padded out to a full screen. `svh` (small viewport height) avoids mobile-browser URL-bar jump.
- Background: absolutely positioned `-z-10` wrapper containing `<Image src={images.hero.ventilation} alt="Conduits de ventilation métalliques dans un intérieur moderne" fill sizes="100vw" className="object-cover" priority />`. The registry points this homepage-only image at a local progressive JPEG dominated by polished galvanized ductwork. **`priority` is set — this is the LCP image.** Keep it.
- Two stacked gradient overlays:
  - `bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/55 md:to-navy-950/30` — left-heavy for text legibility; the right stop stays darker below `md` because the copy spans the full width there.
  - `bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/60` — top/bottom fade.
- Content wrapper `flex-1 flex items-center pt-16` — the `pt-16` (4rem) clears the fixed navbar.
- Inner: `<div className="site-container w-full py-10 sm:py-14 md:py-20 lg:py-28">` → `<div className="max-w-2xl">`. Note it uses the **`site-container` utility directly**, not the `<Container>` component.
- **The app's only `<h1>`:** `<h1 id="hero-heading" className="hero-title text-white mb-4 md:mb-7">` with `<span className="text-brand-500">ventilation</span>` highlighted mid-sentence.
- Sub-copy uses the `lead` utility. CTAs are `flex flex-wrap` so buttons wrap to their own line rather than shrinking; both are `size="lg"`.
- **Last child is `<Process />`.** This placement is what creates the design's overlap: `Process` renders a glass panel *inside* the hero `<section>`, on top of the photograph. It replaced an earlier `-mb-8 sm:-mb-10` negative margin that pulled the panel into the next section. Nothing is positioned out of flow, so the panel can never widen the document.
- Local helper: `DocumentIcon()` (no props).

### 5.9 `src/components/home/Process.tsx` — Server Component

**Extracted from `Hero.tsx` at this exact commit (`674f6b9`).** Previously inline in `Hero`. No props, not exported as a type.

```tsx
const steps = [
  { num: "01", title: "Évaluation",   desc: "Analyse de vos besoins",           icon: <EvalIcon /> },
  { num: "02", title: "Conception",   desc: "Solution sur mesure",              icon: <ConceptionIcon /> },
  { num: "03", title: "Installation", desc: "Mise en œuvre professionnelle",    icon: <InstallIcon /> },
  { num: "04", title: "Entretien",    desc: "Suivi et maintenance",             icon: <EntretienIcon /> },
];

export default function Process()
```

- Root: `<div className="relative z-10 site-container">` wrapping the glass panel `bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5`.
- Two blocks: a desktop-only static progress bar (`hidden md:flex`) and `<ProcessCarousel>`, which owns the responsive steps row plus mobile dots.
- `Process` remains a Server Component and keeps the `steps` array as the single content definition. It passes serializable title labels and server-rendered step children to the focused client leaf; `Hero` and `page.tsx` remain Server Components.
- **`role="list"` + `role="listitem"` on `<div>`s** is intentional: `scroll-snap-row` sets `display: flex` (and `grid` at `md`), which strips the implicit list semantics from a real `<ul>`.
- The step number is `md:hidden` inside each card (mobile) and shown in the desktop progress bar instead.
- The desktop progress-bar highlight remains intentionally static at step 01; it is not mobile carousel state.
- Step icons hardcode `stroke="#60a5fa"` (= `--color-brand-400`) rather than using `currentColor`. Changing the brand palette will not update them.
- Local helpers: `EvalIcon()`, `ConceptionIcon()`, `InstallIcon()`, `EntretienIcon()`.

### 5.9.1 `src/components/home/ProcessCarousel.tsx` — Client Component

- This is the smallest client boundary for Process interaction. It accepts `children: ReactNode` and `stepLabels: readonly string[]`; no homepage, Hero, or page-level client boundary was added.
- `activeIndex` state initializes to `0` on both server and client and is the only source of truth for dot state.
- A passive React `onScroll` handler schedules one `requestAnimationFrame` calculation. The calculation reads the actual scroll-container and card rectangles and selects the card center nearest the container center; it contains no hardcoded card widths.
- `ResizeObserver` re-synchronizes after container/card geometry changes. Cleanup disconnects it and cancels any queued animation frame.
- Each dot is a real 44×44px `<button>` with a small visual pill, a French `aria-label`, and `aria-current="step"` only when active. Activation computes the target from current DOM rectangles and calls `scrollTo`; reduced-motion users receive instant (`auto`) scrolling.
- Active dots are blue and elongated, inactive dots gray, with a 200ms transition. `motion-reduce:transition-none` removes the transition property. The entire dot row stays `md:hidden`.

### 5.10 `src/components/home/Services.tsx` — Server Component

Exports only the default. Two internal components.

```tsx
export default function Services()
function ServiceCard({ service }: { service: Service })
function ServiceIcon({ type }: { type: Service["icon"] })  // type: "home" | "building" | "factory" | "wrench"
```

- **This is the only light-background section:** `<section className="bg-slate-50 section-y">`. Consequently `SectionHeading` is passed `theme="light"`, and the "Voir tout" link uses `text-brand-600 hover:text-brand-700` rather than the `brand-400/300` pair used on dark sections.
- `SectionHeading` receives a **JSX `title`** (a `<>...<br />...</>` fragment), which is why `SectionHeadingProps.title` is `ReactNode` and not `string`.
- Grid: `<div className="scroll-snap-row md:grid-cols-2 lg:grid-cols-4">`. **Only the column count is declared in markup** — the flex→grid switch is owned by the `scroll-snap-row` utility itself (section 6).
- `ServiceCard` is a `<Link href={service.href}>` with `scroll-snap-item w-[240px] sm:w-[260px] md:w-auto group block relative overflow-hidden rounded-2xl bg-navy-800 aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]`.
  - The **aspect ratio is the card's height source**, which matters because all its content is `absolute inset-0`.
  - `sizes="(max-width: 639px) 240px, (max-width: 767px) 260px, (max-width: 1023px) 47vw, 305px"` — deliberately matched to the rendered widths at each breakpoint. If you change the card widths or column counts, update `sizes` too.
  - `aria-label={`${service.title} — ${service.description}`}` supplies the accessible name; `alt` is separate and descriptive.
- `ServiceIcon` dispatches on the 4-value `icon` union with `if` chains and a fallback (`wrench`). **Adding a value to `Service["icon"]` will NOT produce a type error here** — it silently falls through to the wrench icon. Update both places.
- Icons hardcode `stroke="#60a5fa"`.

### 5.11 `src/components/home/AboutPreview.tsx` — Server Component

No props, no exports besides the default.

```tsx
const stats = [
  { value: "10+",  label: "Années\nd'expérience", icon: <ClockIcon /> },
  { value: "250+", label: "Projets\nréalisés",    icon: <ProjectsIcon /> },
  { value: "98%",  label: "Clients\nsatisfaits",  icon: <StarIcon /> },
];
```

- `<section className="bg-navy-800 section-y" aria-labelledby="about-heading">`.
- Grid `grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`. **DOM order is text-then-image and there is no `order-*` swapping** — the file comment notes this explicitly. An earlier version used `order-1`/`order-2`; that was removed. Do not re-add it.
- Stats grid is **`grid-cols-2 sm:grid-cols-3`**, with the last card getting `col-span-2 sm:col-span-1`, producing a 2+1 layout below `sm`. Rationale in the file: three columns at 320px left only ~64px of text width and broke "d'expérience" mid-word.
- `stat.label` contains a **literal `\n`**, rendered via the `whitespace-pre-line` class so each stat breaks at the same point on every screen. (An earlier duplicate `style={{ whiteSpace: "pre-line" }}` was removed.)
- Image: `sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 46vw, 608px"`, wrapper `aspect-[4/3] lg:aspect-[5/4]`.
- **Gotcha:** the play-button `<button aria-label="Voir notre vidéo de présentation">` has **no `onClick`** — it is non-functional decoration. Wiring it up requires a client component.
- Local helpers: `ClockIcon()`, `ProjectsIcon()`, `StarIcon()` — these correctly use `stroke="currentColor"` and inherit `text-brand-400` from the parent.

### 5.12 `src/components/home/Projects.tsx` — Server Component

```tsx
const categoryColors: Record<string, string> = {
  Industriel:  "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Commercial:  "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Résidentiel: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const slots = [ /* 4 entries, `as const` */ ] as const;
const fallbackSlot = { className: "", sizes: "(max-width: 767px) 300px, 47vw" };

export default function Projects()

function ProjectCard({
  project,
  className = "",
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;      // REQUIRED — no default
})
```

The `slots` array pairs a grid span with the `sizes` string that span actually renders at:

| i | `className` | `sizes` |
| --- | --- | --- |
| 0 | `lg:col-span-7 lg:row-span-2` | `(max-width: 639px) 256px, (max-width: 767px) 300px, (max-width: 1023px) 47vw, (max-width: 1279px) 56vw, 740px` |
| 1 | `lg:col-span-5` | `... (max-width: 1279px) 40vw, 525px` |
| 2 | `lg:col-span-5` | `... (max-width: 1279px) 40vw, 525px` |
| 3 | `lg:col-span-12` | `... (max-width: 1279px) 95vw, 1280px` |

Consumed as `const slot = slots[i] ?? fallbackSlot;` — so adding a 5th project degrades gracefully instead of crashing. **If you add projects, extend `slots` or the extra cards get no `lg:` span.**

- Container: `<div className="scroll-snap-row md:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-12 lg:auto-rows-[200px]">`. The `auto-rows-*` values are the **height source from `md` up**.
- `md` keeps every card one column wide. The file comment records why: letting card 4 span both columns left an empty cell at 768/834px.
- `ProjectCard` class string:

```
scroll-snap-item w-[256px] sm:w-[300px] md:w-auto aspect-[4/3] md:aspect-auto group relative overflow-hidden rounded-2xl bg-navy-700 ${className}
```

  **`aspect-[4/3] md:aspect-auto` is the fix for the collapsed-card bug** (section 9.1). All card content is `absolute inset-0`, so below `md` — where the row is flex with no `auto-rows` — the card had no height and collapsed to 0px. Do not remove the aspect ratio, and do not remove `md:aspect-auto` (which hands height control back to the grid rows).
- `categoryColors` is keyed by the **French category string** with an accent (`Résidentiel`). A typo silently falls back to `bg-slate-500/20 text-slate-300 border-slate-500/30`.
- `aria-label={`Projet : ${project.title} — ${project.category}, ${project.location}`}`; the year is shown as `{project.location} · {project.year}`.

### 5.13 `src/components/home/ContactCTA.tsx` — Server Component

No props.

- `<section className="bg-brand-600 band-y" aria-label="Demander un devis">` — **the only consumer of the `band-y` utility.**
- Uses `aria-label` on the section rather than `aria-labelledby`, because it has no heading.
- Inner: `flex flex-col sm:flex-row items-center justify-between gap-4`.
- The phone icon circle is `hidden sm:flex` (hidden on the narrowest screens).
- The `Button` is given `className="border-white/50 text-white hover:bg-white/15 hover:border-white whitespace-nowrap flex-shrink-0 w-full sm:w-auto"` on top of `variant="outline"` — **`w-full sm:w-auto` makes it full-width while stacked** for an easier tap target, then intrinsic width once it sits beside the message. This relies on `cn()` being a naive join with no conflict resolution (see 5.17).
- Local helper: `PhoneIcon()` — hardcodes `fill="white"` (the other `PhoneIcon` variants use `currentColor`).

### 5.14 `src/components/ui/Button.tsx` — Server Component

Renders `<Link>` when `href` is set, otherwise `<button>`.

```tsx
type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;                              // default "primary"
  size?: Size;                                    // default "md"
  href?: string;
  external?: boolean;                             // default false
  children: ReactNode;                            // REQUIRED
  className?: string;
  type?: "button" | "submit" | "reset";           // default "button"
  onClick?: () => void;                           // no event arg
  "aria-label"?: string;
  disabled?: boolean;
  tabIndex?: number;
}

export default function Button({ ... }: ButtonProps)
```

Class tables, verbatim:

```tsx
const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 border border-brand-600 hover:border-brand-500",
  outline:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/60",
  ghost: "bg-transparent text-current hover:bg-white/10 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2 min-h-11",
  lg: "px-7 py-3.5 text-base gap-2 min-h-11 md:px-8 md:py-4 md:text-lg",
};

const base =
  "inline-flex items-center justify-center text-center font-semibold rounded-full transition-all duration-200 select-none max-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
```

Composition order: `cn(base, variants[variant], sizes[size], className)`.

Gotchas — read before calling:

- **`onClick` takes no arguments** (`() => void`). If you need the event, widen the type.
- **`onClick`, `disabled` and `type` are silently dropped when `href` is set** — the link branch only forwards `href`, `className`, `aria-label`, `tabIndex` and the external props.
- **`disabled` on the link branch does nothing.** There is no disabled-link handling.
- `external: true` adds `target="_blank" rel="noopener noreferrer"`. It only applies on the link branch.
- `min-h-11` (44px) is a **floor, not a size** — `md`/`lg` already resolve taller. It only guarantees the minimum comfortable touch target if the font scale shrinks. `sm` deliberately has no floor.
- Because `cn()` does not de-duplicate conflicting Tailwind classes, a `className` override works **only by CSS source order**, not specificity. It happens to work for the `ContactCTA` and `AboutPreview` overrides. It is fragile — verify visually when overriding.
- The variants assume a **dark** background (`text-white`, `border-white/30`). There is no light-background variant; `Services` (on `bg-slate-50`) uses a plain `<Link>` instead of `Button`.

### 5.15 `src/components/ui/Container.tsx` — Server Component

```tsx
interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;   // default "div"
}

export default function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("site-container", className)}>{children}</Tag>;
}
```

- Purely a wrapper over the `.site-container` utility (section 6.3).
- `as` is typed `ElementType`, so `<Container as="section">` or `<Container as={SomeComponent}>` both compile. No extra props are forwarded — only `className` and `children`.
- **Not used consistently.** `Hero` and `Process` apply `site-container` directly as a class instead. Both are valid; the utility is the real contract.

### 5.16 `src/components/ui/SectionHeading.tsx` — Server Component

```tsx
interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;                    // REQUIRED — accepts JSX, not just string
  description?: string;                // string only, NOT ReactNode
  align?: "left" | "center";           // default "left"
  /** "dark" = white title on dark bg; "light" = navy title on light bg */
  theme?: "dark" | "light";            // default "dark"
  className?: string;
  headingId?: string;                  // → id on the <h2>, pairs with aria-labelledby
}

export default function SectionHeading({ ... }: SectionHeadingProps)
```

Rendered structure and exact classes:

| Part | Classes | Notes |
| --- | --- | --- |
| wrapper `<div>` | `max-w-2xl` + (`mx-auto text-center` if `align === "center"`) + `className` | `max-w-2xl` = 42rem |
| eyebrow `<p>` | `text-sm font-semibold tracking-[0.15em] uppercase mb-3` + `text-brand-400` (dark) / `text-brand-600` (light) | rendered only if `eyebrow` truthy |
| heading `<h2>` | `section-title mb-4` + `text-white` (dark) / `text-navy-800` (light) | `id={headingId}` |
| description `<p>` | `lead` + `text-slate-400` (dark) / `text-slate-600` (light) | rendered only if `description` truthy |

Gotchas:

- **The heading level is hardcoded `<h2>`.** There is no `as` / `level` prop. This is the direct cause of the missing-`<h1>` bug on all five sub-pages (section 9.4). Adding an `as?: "h1" | "h2" | "h3"` prop is the natural fix.
- `align="center"` is **never used** anywhere in the codebase — untested path.
- `description` is `string`, so you cannot pass `<br/>` or `<strong>` in it. Pass JSX via `title` instead, or extend the type.
- Callers that need to kill the bottom margin pass `className="mb-0"` (`Services`, `Projects`). Note the `<h2>` keeps its own `mb-4` regardless.

### 5.17 `src/lib/utils.ts` — Server-safe utility module

```ts
/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to clsx for this project's needs.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

- Accepts `string | undefined | null | false`. **Does NOT accept objects or arrays** (`cn({ active: true })` is a type error) — it is not a clsx drop-in.
- **Does NOT resolve Tailwind conflicts** (it is not `tailwind-merge`). `cn("px-4", "px-8")` yields `"px-4 px-8"`; the winner is decided by CSS source order.
- No `"use client"`, no imports — safe on both sides of the boundary.

### 5.18 `src/components/ui/GlassCard.tsx` — Server Component, **DEAD CODE**

Zero importers at this commit (verified: the only occurrences of the identifier are inside the file itself).

```tsx
type Shade = "light" | "medium" | "dark";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;   // default "div"
  shade?: Shade;      // default "dark"
}

const shades: Record<Shade, string> = {
  light: "bg-white/5 backdrop-blur-xl border border-white/10",
  medium: "bg-white/8 backdrop-blur-xl border border-white/12",
  dark: "bg-navy-800/80 backdrop-blur-xl border border-white/8",
};

export default function GlassCard({ children, className, as: Tag = "div", shade = "dark" }: GlassCardProps) {
  return <Tag className={cn(shades[shade], className)}>{children}</Tag>;
}
```

Note: `shades.dark` is **exactly** the glass treatment `Process.tsx` open-codes (`bg-navy-800/80 backdrop-blur-xl border border-white/10`, modulo `white/8` vs `white/10`), and `shades.light` is exactly the pattern in section 6.5. Either adopt this component or delete it — do not leave both.

---

## 6. Design system reference

Single source of truth: **`src/app/globals.css`** (202 lines). There is no other stylesheet and no CSS modules.

File order: `@import "tailwindcss"` → `@theme inline` (fonts) → `@theme` (colors) → `:root` scale tokens + 3 media queries → base reset → `@utility` definitions → scrollbar → focus ring.

### 6.1 Color tokens (`@theme`)

```css
@theme {
  /* Navy */
  --color-navy-950: #040810;
  --color-navy-900: #080f1e;
  --color-navy-800: #0c1528;
  --color-navy-700: #111e38;
  --color-navy-600: #162640;
  --color-navy-500: #1a2d4f;
  --color-navy-400: #233e6b;

  /* Brand blue */
  --color-brand-700: #1d4ed8;
  --color-brand-600: #2563eb;
  --color-brand-500: #3b82f6;
  --color-brand-400: #60a5fa;
  --color-brand-300: #93c5fd;
  --color-brand-100: #dbeafe;
}
```

| Token | Hex | Where it is used |
| --- | --- | --- |
| `--color-navy-950` | `#040810` | Navbar bg (`/90`), footer bg, hero gradients, card gradient bottoms, MobileMenu fill (`rgba(4,8,16,0.97)`) |
| `--color-navy-900` | `#080f1e` | **`body` background** (also hardcoded as `background-color: #080f1e`), stub-page bg, gradient mid-stops |
| `--color-navy-800` | `#0c1528` | `AboutPreview` section bg, `Process` panel bg (`/80`), service card bg, `SectionHeading` light-theme title color |
| `--color-navy-700` | `#111e38` | `Projects` section bg **and** project card bg |
| `--color-navy-600` | `#162640` | **unused** |
| `--color-navy-500` | `#1a2d4f` | **unused** |
| `--color-navy-400` | `#233e6b` | **unused** |
| `--color-brand-700` | `#1d4ed8` | primary button `active:`, light-theme link hover |
| `--color-brand-600` | `#2563eb` | primary button, logo tile, `ContactCTA` bg, light-theme eyebrow/link, scrollbar thumb, focus ring, MobileMenu CTA |
| `--color-brand-500` | `#3b82f6` | primary button hover, `<h1>` highlight word, active scroll dot |
| `--color-brand-400` | `#60a5fa` | dark-theme eyebrow, hero eyebrow, stat icons, all hardcoded SVG strokes, `Button` focus outline |
| `--color-brand-300` | `#93c5fd` | `Projects` "Tous les projets" link hover |
| `--color-brand-100` | `#dbeafe` | **unused as a token** (`ContactCTA` uses Tailwind's built-in `text-blue-100`) |

**Tailwind utilities generated by each `--color-*` token.** Declaring `--color-navy-900: #080f1e` in `@theme` makes the whole color utility family available for that name:

| Utility family | Examples for `navy-900` |
| --- | --- |
| background | `bg-navy-900`, `bg-navy-900/80` (any `/opacity`) |
| text | `text-navy-900` |
| border | `border-navy-900`, `border-t-navy-900`, … |
| gradient stops | `from-navy-900`, `via-navy-900`, `to-navy-900` |
| ring / outline | `ring-navy-900`, `outline-navy-900` |
| divide / accent / caret | `divide-navy-900`, `accent-navy-900`, `caret-navy-900` |
| shadow / SVG | `shadow-navy-900`, `fill-navy-900`, `stroke-navy-900` |
| decoration | `decoration-navy-900` |
| arbitrary reference | `var(--color-navy-900)` in any arbitrary value |

The same applies to every `brand-*` token. `--font-sans` / `--font-mono` in `@theme inline` generate `font-sans` / `font-mono`.

**Tailwind's own default palette is still fully available** and is used alongside these tokens: `slate-300/400/500/600`, `slate-50` (the `Services` background), `white`, `blue-100`, `amber-500/300`, `sky-500/300`, `emerald-500/300`.

### 6.2 Scale tokens (`:root`, responsive)

These are plain CSS custom properties (**not** `@theme`), so they generate no utilities — they are consumed by the `@utility` definitions below.

```css
:root {
  --gutter: 1rem;
  --section-py: 4rem;
  --band-py: 1.25rem;
  --content-max: 1280px;
}

@media (min-width: 640px)  { :root { --gutter: 1.5rem; } }
@media (min-width: 768px)  { :root { --section-py: 5rem; --band-py: 1.5rem; } }
@media (min-width: 1024px) { :root { --gutter: 2rem; --section-py: 6rem; } }
```

Resolved values:

| Token | < 640 | ≥ 640 (`sm`) | ≥ 768 (`md`) | ≥ 1024 (`lg`) |
| --- | --- | --- | --- | --- |
| `--gutter` | 1rem | 1.5rem | 1.5rem | **2rem** |
| `--section-py` | 4rem | 4rem | **5rem** | **6rem** |
| `--band-py` | 1.25rem | 1.25rem | **1.5rem** | 1.5rem |
| `--content-max` | 1280px | 1280px | 1280px | 1280px |

**This is the single source of truth for spacing rhythm.** To change the page gutter or section rhythm globally, edit these four tokens — not individual components.

### 6.3 Base reset

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  background-color: #080f1e;
  color: #ffffff;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Two consequences worth knowing: `html { overflow-x: hidden }` is why `MobileMenu` must lock **both** `html` and `body` (section 5.6 / 9.5); `html { scroll-behavior: smooth }` without `data-scroll-behavior="smooth"` means Next 16 will not neutralize it during route transitions (section 2.1).

### 6.4 Custom utilities — full rule bodies, verbatim

All eight are Tailwind v4 **`@utility`** definitions, which means they support variants (`md:section-y` would work) and participate in Tailwind's own layer/order.

```css
@utility site-container {
  width: 100%;
  max-width: calc(var(--content-max) + 2 * var(--gutter));
  margin-inline: auto;
  padding-inline: var(--gutter);
}
```

> Padding-based, not width-based. The box is always 100% wide and the gutter is real padding, so **a child can never be laid out wider than the visible area**. Max width is content (1280px) + both gutters, so the content column caps at exactly 1280px on wide screens. This replaced an earlier `width: min(100% - 2rem, 1280px)` approach that allowed horizontal overflow.

```css
@utility section-y {
  padding-block: var(--section-py);
}
```

```css
@utility band-y {
  padding-block: var(--band-py);
}
```

```css
@utility hero-title {
  /* 36px at 320 → 83px at 1280 → caps at 88px, matching the
     previous 6.5vw curve at both ends without the flat stretch
     below 554px. */
  font-size: clamp(2.25rem, 4.9vw + 1.27rem, 5.5rem);
  /* 1.05 rather than 1.0 so accented capitals (É, À) are not clipped */
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.025em;
  overflow-wrap: break-word;
}
```

```css
@utility section-title {
  font-size: clamp(1.75rem, 2.25vw + 0.9rem, 2.75rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-wrap: balance;
  overflow-wrap: break-word;
}
```

```css
@utility lead {
  font-size: clamp(1rem, 0.6vw + 0.88rem, 1.25rem);
  line-height: 1.65;
}
```

```css
@utility scroll-snap-row {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.5rem;

  @media (min-width: 768px) {
    display: grid;
    overflow-x: visible;
    scroll-snap-type: none;
    padding-bottom: 0;
  }
}

.scroll-snap-row::-webkit-scrollbar {
  display: none;
}
```

> **`scroll-snap-row` owns its own flex→grid switch at 768px.** Consumers declare *only* the column count (`md:grid-cols-2 lg:grid-cols-4`) and, where needed, row height (`md:auto-rows-[220px]`). The switch lives in the utility rather than as an `md:grid` class in markup because this custom utility and Tailwind's utilities share specificity — owning both states removes the cascade race entirely. **Do not add `md:grid` in markup; it is redundant and reintroduces the race.**
>
> Note `.scroll-snap-row::-webkit-scrollbar` is the **only plain class selector** in the file (a pseudo-element cannot be expressed inside `@utility`).

```css
@utility scroll-snap-item {
  flex-shrink: 0;
  scroll-snap-align: start;
}
```

> `scroll-snap-item` does **not** provide a height. Cards using it must supply their own height source: an `aspect-*` ratio below `md` (both `Services` and `Projects` do) and/or the grid's `auto-rows-*` from `md` up. Forgetting this collapses cards to 0px — see section 9.1.

### 6.5 Fixed decoration (not utilities)

```css
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #2563eb;
  border-radius: 2px;
}

:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
  border-radius: 4px;
}
```

Both hardcode `#2563eb` rather than `var(--color-brand-600)`.

### 6.6 The glass-morphism pattern

The canonical form, used for translucent panels on dark backgrounds:

```
bg-white/5 backdrop-blur-xl border border-white/10
```

Variants actually in the codebase:

| Location | Classes | Notes |
| --- | --- | --- |
| `GlassCard` `shade="light"` | `bg-white/5 backdrop-blur-xl border border-white/10` | the canonical pattern (dead code) |
| `GlassCard` `shade="medium"` | `bg-white/8 backdrop-blur-xl border border-white/12` | dead code |
| `GlassCard` `shade="dark"` | `bg-navy-800/80 backdrop-blur-xl border border-white/8` | dead code |
| `Process` panel | `bg-navy-800/80 backdrop-blur-xl border border-white/10` | the live "dark" glass panel |
| `AboutPreview` stat cards | `bg-white/5 border border-white/8` | **no blur** (nothing behind to blur) |
| `Navbar` header | `bg-navy-950/90 backdrop-blur-xl border-b border-white/5` | **this blur creates the stacking context — section 8.1** |
| `AboutPreview` play button | `bg-white/15 border border-white/30 backdrop-blur-sm` | `blur-sm`, not `xl` |
| `MobileMenu` root | `rgba(4,8,16,0.97)` + `blur(24px)` (inline) | `blur(24px)` ≡ `backdrop-blur-xl` |

**Critical:** `backdrop-filter` creates a new stacking context **and** a containing block for `position: fixed` descendants. Every time you add `backdrop-blur-*` to an ancestor, any `fixed` child inside it becomes positioned relative to that ancestor instead of the viewport. This is the single most important CSS fact in this codebase.

### 6.7 Fluid typography summary

| Utility | `font-size` | 320px | 768px | 1280px | 1920px | Other |
| --- | --- | --- | --- | --- | --- | --- |
| `hero-title` | `clamp(2.25rem, 4.9vw + 1.27rem, 5.5rem)` | 36px (floor) | ~58px | ~83px | 88px (cap) | `lh 1.05`, `fw 800`, `ls -0.025em`, `overflow-wrap: break-word` |
| `section-title` | `clamp(1.75rem, 2.25vw + 0.9rem, 2.75rem)` | 28px (floor) | ~32px | ~43px | 44px (cap) | `lh 1.15`, `fw 700`, `ls -0.02em`, `text-wrap: balance` |
| `lead` | `clamp(1rem, 0.6vw + 0.88rem, 1.25rem)` | 16px (floor) | ~18px | ~20px | 20px (cap) | `lh 1.65` |

The `vw + rem` pairing (rather than bare `vw`) is deliberate: it makes growth gradual instead of snapping flat between the clamp bounds. `overflow-wrap: break-word` exists so long French words ("performantes", "d'expérience") break instead of overflowing.

### 6.8 Breakpoints and target device widths

Tailwind v4 defaults are unmodified. **Only `sm`, `md` and `lg` are used anywhere in `src/`** — no `xl:` or `2xl:` prefix appears in the codebase.

| Prefix | Min width | Role in this design |
| --- | --- | --- |
| `sm` | **640px** | gutter 1rem→1.5rem; card widths grow; stats 2-col→3-col; `ContactCTA` stacks→row; footer 1-col→2-col |
| `md` | **768px** | **the big one.** `scroll-snap-row` flips flex→grid; hero goes `85svh`→`svh`; section padding 4rem→5rem; band padding 1.25rem→1.5rem |
| `lg` | **1024px** | gutter 1.5rem→2rem; section padding 5rem→6rem; **hamburger disappears / desktop nav appears** (matches `SiteShell.LG_BREAKPOINT = 1024`); `AboutPreview` 1-col→2-col; `Projects` 2-col→12-col bento; footer →4-col |
| `xl` | 1280px | available, unused as a prefix. 1280px is `--content-max`, so the container caps here. |
| `2xl` | 1536px | available, unused |

Explicit media queries in `globals.css` mirror these: `640px` (gutter), `768px` (section/band padding + the `scroll-snap-row` switch), `1024px` (gutter + section padding).

Target device widths the responsive work is tuned for:

| Width | Device class | Notable behaviour |
| --- | --- | --- |
| **320** | iPhone SE (1st gen) / smallest supported | `hero-title` at its 36px floor; `AboutPreview` stats forced to 2+1 because 3 columns broke "d'expérience"; hero uses `85svh` so content drives height |
| **360** | small Android | carousel cards 240–256px wide, one visible + peek |
| **375** | iPhone SE 2/3, iPhone 12 mini | — |
| **390** | iPhone 12/13/14 | — |
| **430** | iPhone 15/16 Pro Max | still below `sm`; single-column everything |
| **640** | `sm` boundary | gutter →1.5rem, stats →3 columns, footer →2 columns |
| **768** | iPad portrait / `md` boundary | carousels become grids; `Projects` 2×2 with `auto-rows-[220px]`; `Services` 2 columns |
| **834** | iPad Air portrait | explicitly named in the `Projects` comment: card 4 must NOT span both columns here or it leaves an empty cell |
| **1024** | iPad landscape / `lg` boundary | desktop nav appears; `Projects` 12-col bento; `AboutPreview` side-by-side; gutter →2rem |
| **1280** | laptop / `--content-max` | content column hits its 1280px cap; gutters keep growing the viewport but not the content |
| **1440** | desktop | content stays 1280px, centered |
| **1920** | large desktop | `hero-title` at its 88px cap, `section-title` at 44px |

---

## 7. Data layer contracts

Five modules in `src/data/`. All are plain typed constants — **no fetching, no async, no CMS.** They are imported directly into Server and Client Components.

### 7.1 `src/data/images.ts` — the image registry

```ts
/**
 * Centralised image registry.
 * All image paths in the application must reference this file.
 * Replace placeholder SVGs with production images — the paths stay the same.
 */
export const images = {
  hero: {
    ventilation: "/images/hero/conduits-ventilation-metalliques-professionnels.jpg",
    // Original generated photograph of polished HVAC ductwork
  },

  services: {
    residential: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format&fit=crop",
    // Modern living room interior
    commercial: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
    // Modern office interior
    industrial: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    // Industrial pipes/factory
    maintenance: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop",
    // Technician doing HVAC maintenance
  },

  servicePage: {
    hero: "/images/services/systemes-techniques-cvc-batiment.jpg",
    airConditioning: "/images/services/unites-climatisation-batiment.jpg",
    heating: "/images/services/chauffage-radiateur-batiment.jpg",
    professional: "/images/services/ventilation-professionnelle-bureaux.jpg",
    hydraulicNetwork: "/images/services/reseaux-hydrauliques-cvc-batiment.jpg",
    plumbingNetwork: "/images/services/reseau-plomberie-batiment.jpg",
    plumbingFittings: "/images/services/reseau-plomberie-raccords.jpg",
    technicalIntervention: "/images/services/intervention-technique-equipement.jpg",
  },

  about: {
    main: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    // Modern building exterior with glass facade
  },

  projects: {
    project01: "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80&auto=format&fit=crop",
    // Industrial facility/warehouse
    project02: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format&fit=crop",
    // Office building
    project03: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&auto=format&fit=crop",
    // Residential building
    project04: "https://images.unsplash.com/photo-1565108476672-9dc7f7caeb61?w=800&q=80&auto=format&fit=crop",
    // Factory/industrial
  },

  logo: {
    main: "/images/logo/ventila-logo.svg",
  },
} as const;

export type ImageKey = typeof images;
```

Shape: `{ hero: { ventilation }, services: { residential, commercial, industrial, maintenance }, servicePage: { hero, airConditioning, heating, professional, hydraulicNetwork, plumbingNetwork, plumbingFittings, technicalIntervention }, about: { main }, projects: { project01..project04 }, logo: { main } }` — a two-level `category → name → path` map, `as const` so every value is a string literal type.

**THE RULE: all image paths must flow through this file. No scattered paths.**

- Never write `<Image src="https://..." />` or `<Image src="/images/..." />` in a component. Always `import { images } from "@/data/images"` (or reach it indirectly via `service.image` / `project.image`, which are themselves populated from this registry).
- Why: swapping the whole site's imagery is then a one-file change. Commit `d5c2aa5` repointed only the homepage hero entry from Unsplash to the local generated HVAC photograph; `Hero` changed only its descriptive French alt text.
- **Adding a remote host requires editing `next.config.ts`.** Only `images.unsplash.com` is allowlisted:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
```

  Use `remotePatterns`, never the deprecated `images.domains` (section 2.2).
- Consumers: `images.hero.ventilation` (`Hero`), `images.servicePage.*` (`ServicesHero` and `service-page.ts`), `images.about.main` (`AboutPreview`), `images.services.*` (via `data/services.ts`), `images.projects.*` (via `data/projects.ts`). **`images.logo` has no consumer** — both logos are inline SVG.
- `ImageKey` is exported but unused. Misleadingly named: it is the type of the whole registry object, not a key union.
- The `q=85` / `q=80` in these URLs are **Unsplash** parameters and are unrelated to Next.js's `images.qualities` (section 2.2).

### 7.2 `src/data/services.ts`

```ts
import { images } from "./images";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: "home" | "building" | "factory" | "wrench";
  href: string;
}

export const services: Service[] = [
  {
    id: "residentiel",
    title: "Résidentiel",
    description: "Confort et air sain au quotidien",
    image: images.services.residential,
    icon: "home",
    href: "/services/residentiel",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Solutions efficaces pour vos locaux",
    image: images.services.commercial,
    icon: "building",
    href: "/services/commercial",
  },
  {
    id: "industriel",
    title: "Industriel",
    description: "Systèmes robustes haute performance",
    image: images.services.industrial,
    icon: "factory",
    href: "/services/industriel",
  },
  {
    id: "entretien",
    title: "Entretien",
    description: "Maintenance et dépannage rapide",
    image: images.services.maintenance,
    icon: "wrench",
    href: "/services/entretien",
  },
];
```

- `icon` is a **closed 4-value union**. Its renderer (`ServiceIcon` in `Services.tsx`) uses `if` chains with a `wrench` fallback, so adding a union member does **not** produce a compile error — it silently renders a wrench. Update both files.
- `id` values are the French slugs and match the last segment of `href`.
- **All 4 `href`s are 404s** (section 9.6).
- `Service` is re-exported through `import { services, type Service } from "@/data/services"` in `Services.tsx`.

### 7.3 `src/data/projects.ts`

```ts
import { images } from "./images";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: "projet-01",
    title: "Centre Logistique Industriel",
    category: "Industriel",
    location: "Lyon",
    year: "2024",
    image: images.projects.project01,
    href: "/realisations/centre-logistique",
  },
  {
    id: "projet-02",
    title: "Immeuble de Bureaux",
    category: "Commercial",
    location: "Paris",
    year: "2023",
    image: images.projects.project02,
    href: "/realisations/immeuble-bureaux",
  },
  {
    id: "projet-03",
    title: "Résidence Haut de Gamme",
    category: "Résidentiel",
    location: "Bordeaux",
    year: "2023",
    image: images.projects.project03,
    href: "/realisations/residence-haut-gamme",
  },
  {
    id: "projet-04",
    title: "Usine Agroalimentaire",
    category: "Industriel",
    location: "Toulouse",
    year: "2022",
    image: images.projects.project04,
    href: "/realisations/usine-agroalimentaire",
  },
];
```

- **`category` is `string`, not a union** — deliberately loose, but it means the `categoryColors` lookup in `Projects.tsx` (keyed `Industriel` / `Commercial` / `Résidentiel`, accent included) is unchecked and silently falls back to slate on a typo. Consider narrowing to `"Industriel" | "Commercial" | "Résidentiel"`.
- `year` is a **string**, not a number.
- **All 4 `href`s are 404s** (section 9.6).
- The array has exactly 4 entries, which pairs positionally with the 4-entry `slots` array in `Projects.tsx`. Adding a 5th project falls back to `fallbackSlot` (no `lg:` span).

### 7.4 `src/data/site.ts`

`site` centralizes the `Diakhite Air Proteger` display brand (`Diakhite Air` / `Proteger` in the
two-line wordmark), production URL, user-confirmed phone, existing contact email, and AIR PROTEGER
legal facts. Verified values include SIREN
`987 925 013`, head-office SIRET `987 925 013 00011`, SAS legal form, creation date
`3 juin 2025`, registered office `10 avenue Normandie Niemen, 77290 Mitry-Mory`, APE
`43.22B`, capital `1 000 €`, VAT number, active status, and `987 925 013 R.C.S. Meaux`.
`organizationId` is the stable `${site.url}/#organization` JSON-LD identifier.

Registry research was accessed 2026-08-28. Societe.com was the user-provided source; the French
Annuaire des Entreprises/INSEE/RNE record and public BODACC-derived data were used to cross-check.
The email is not registry-verified (`verified: false`). Do not turn that flag into a public claim,
and do not add officers, birth data, employee/revenue estimates, risk scores, certifications,
opening hours, service areas, or other unsupported directory fields.

---

## 8. Architecture decisions and WHY

**Read this before "fixing" anything in `src/components/layout/`.** Each item below is a deliberate choice with a failure mode attached.

### 8.1 Why `SiteShell.tsx` exists — the load-bearing decision

Two independent constraints force it into existence:

1. **`app/layout.tsx` is a Server Component**, so it cannot hold `useState`. The `menuOpen` boolean has to live in a client component somewhere.
2. **The `<header>` in `Navbar.tsx` carries `backdrop-blur-xl`.** `backdrop-filter` creates a new **stacking context** and a containing block for `position: fixed` descendants. Any fixed-position element rendered *inside* that header is trapped: it positions relative to the 4rem-tall header instead of the viewport, and its `z-index` cannot escape the header's own layer.

Therefore `MobileMenu` **must be a DOM sibling of `<main>`**, not a descendant of `<header>`. The nearest common owner of `Navbar` and `MobileMenu` has to hold the state — and it must be a client component. That owner is `SiteShell`, a deliberately thin `"use client"` wrapper:

```tsx
<Navbar onMenuToggle={toggleMenu} menuOpen={menuOpen} />
<MobileMenu isOpen={menuOpen} onClose={closeMenu} links={navLinks} />
<main className="flex-1">{children}</main>
```

**Explicit prohibitions:**

- **Do NOT move menu state into `Navbar`.** It would force `MobileMenu` to render inside the header, re-trapping it in the blur's stacking context.
- **Do NOT render `MobileMenu` inside the `<header>`** for any reason.
- **Do NOT delete `SiteShell` and add `"use client"` to `layout.tsx`.** That would make the entire app a client tree and break `export const metadata`.
- **Do NOT reorder** the three children.
- Keep `SiteShell` thin. Every new import here enters the client bundle.

Historical note: commit `a05d5d3` is literally titled "refactor mobile menu as viewport-level overlay (fixes stacking context)". This has already been broken once and fixed.

### 8.2 Why `MobileMenu.tsx` uses inline styles

**Status at this commit: yes, still fully inline.** The root element, the `<nav>`, every `<Link>`, and the footer CTA block are all styled with `style={{ ... }}` objects. There is not a single Tailwind class in the component's markup. Hover states are implemented with `onMouseEnter` / `onMouseLeave` handlers mutating `e.currentTarget.style`.

**This is deliberate**, introduced during the stacking-context fix (`a05d5d3` → `d16d6a9` → `5dd76e8`) to bypass Tailwind specificity/cascade ordering while the positioning bug was being isolated. Inline styles have the highest non-`!important` precedence, which removed the cascade as a variable while the real problem (the ancestor `backdrop-filter`) was being found.

**This is known technical debt.** It is a reasonable target for cleanup, but not a drive-by one:

- The inline `transition` string encodes non-obvious behaviour that must survive any rewrite: `visibility 0s linear 0s` on open vs `visibility 0s linear 280ms` on close, so the exit animation is not truncated. Expressing stepped, direction-dependent `visibility` timing in Tailwind requires arbitrary variants.
- `height: "100dvh"` + `paddingTop: "4rem"` + inherited `box-sizing: border-box` are interdependent.
- Converting hover handlers back to `:hover` classes changes when styles apply during the transition.

If you do convert it: change one block at a time and verify the overlay still positions against the viewport (not the header) at 320px, 390px and 1023px, and that the exit animation still plays for the full 280ms.

### 8.3 The z-index hierarchy

Documented at the top of `MobileMenu.tsx`. Four layers:

| Layer | Value | Element | Why |
| --- | --- | --- | --- |
| Header | **`z-[60]`** | `Navbar`'s `<header>` (`fixed`) | Paints **above** the overlay so the logo stays readable and the hamburger stays clickable while the menu is open. The hamburger *is* the close control. |
| Mobile menu | **`z-50`** (inline `zIndex: 50`) | `MobileMenu` root (`fixed`) | Below the navbar, above **all** page content. Reserves `paddingTop: 4rem` for the header that paints over it. |
| Process strip | **`z-10`** | `Process` root `<div>` (`relative`) | Lifts the glass panel above the hero's background image within the hero section. |
| Hero background | **`-z-10`** | `Hero`'s background wrapper (`absolute`) | Pushes the photo + gradients behind the hero's own content. |
| Page content | `z-auto` | everything else | normal flow |

**Consequences you must respect:**

- Because the header paints above the overlay, an **in-overlay close button is architecturally impossible**: a `z-index` set inside `MobileMenu` cannot escape `MobileMenu`'s own `z-50` stacking context, so the button would render *under* the header — invisible and unclickable. Commit `5dd76e8` removed the overlay's top bar for exactly this reason. Do not re-add one.
- The `4rem` in `MobileMenu`'s `paddingTop` is coupled to `Navbar`'s `h-16`. Change one, change both.
- Any new `fixed` overlay (modal, toast, cookie banner) must be a sibling of `<main>` — rendered from `SiteShell` or via a portal to `document.body` — and must pick a z-index consciously relative to 60/50.

### 8.4 Why `Process` IS a separate component (as of this commit)

**It was extracted from `Hero.tsx` in the commit this document describes** (`674f6b9`, "…Process extraction"). Before that, the four-step strip was inline JSX inside `Hero`. So: `src/components/home/Process.tsx` exists and is a real, separate component.

But note the **non-obvious composition**: `Process` is *not* rendered by `page.tsx`. It is rendered as the **last child of the `Hero` `<section>`**:

```tsx
// Hero.tsx, last element inside <section>
<Process />
```

That placement is the design requirement, not an accident: being inside the hero section is what makes the glass panel overlay the hero photograph, producing the reference design's overlap. It replaced an earlier `-mb-8 sm:-mb-10` negative margin that pulled the panel down into the following section. Because nothing is positioned out of flow, the panel can never widen the document (a real overflow bug the negative-margin version had).

**Do not:**

- Add `<Process />` to `page.tsx` — it would render twice.
- Move `<Process />` out of the `<section>` to "clean up" the composition — you lose the overlap and reintroduce the need for negative margins.
- Reorder it above the hero content — it must be the last child.

### 8.5 Server Components by default

Only `src/components/layout/SiteShell.tsx`, `src/components/layout/MobileMenu.tsx`, and `src/components/home/ProcessCarousel.tsx` contain `"use client"`. `ProcessCarousel` is a focused leaf for mobile Process scrolling; the 5 home section owners, all 4 `ui/` components, `Navbar`, `Footer`, all 6 pages, the root layout, and everything in `data/` and `lib/` remain Server Components.

Notes:

- `Navbar.tsx` has an `onClick`, but no `"use client"`: the handler is the `onMenuToggle` **prop passed down from `SiteShell`**. Because `SiteShell` is a client component, `Navbar` is part of the client render tree at runtime without needing its own directive. **Adding a hook to `Navbar` will fail** — lift the state to `SiteShell`.
- `children` passed through `SiteShell` stays a Server Component. Nesting inside a client component does not client-ify the subtree.
- `SectionHeading`, `Button`, `Container`, `GlassCard` are all server-safe. `Button` renders a `<button>` with an optional `onClick`, so it is only usable interactively from within a client tree.
- Practical consequence: browser state and APIs stay inside an explicit focused client leaf. `ProcessCarousel` owns only Process scroll state; unrelated interaction belongs in another leaf, or in `SiteShell` only for shell-level concerns.

### 8.6 Other deliberate choices

- **Hand-rolled `cn()` instead of `clsx` + `tailwind-merge`** — a conscious zero-dependency choice. It does not resolve class conflicts; overrides win by source order. Accept the limitation or justify the dependency.
- **All icons are hand-inlined SVG**, no icon library. `LogoIcon` and `PhoneIcon` are duplicated across `Navbar`, `Footer`, `MobileMenu` and `ContactCTA` rather than shared. Deliberate for now (avoids a barrel import in the client bundle); consolidating is fine but low value.
- **`scroll-snap-row` owns the flex→grid switch** rather than markup using `md:grid` — because the custom utility and Tailwind's utilities share specificity, and owning both states removes the cascade race. Do not add `md:grid` in markup.
- **Padding-based `site-container`** rather than `width: min(...)` — so a full-width child can never be laid out wider than the visible area. This is an overflow fix, not a style preference.
- **`role="list"` / `role="listitem"` on `<div>`s in `Process`** — because `display: flex`/`grid` strips implicit list semantics from a real `<ul>`.
- **Hardcoded `#080f1e` in `body`** duplicating `--color-navy-900`, and `#2563eb` in the scrollbar/focus rules duplicating `--color-brand-600`. Minor debt; if you change the palette, grep for the hex values too.

---

## 9. Known issues / open bugs

Each item was **verified against commit `674f6b9`**. Several were fixed by the in-flight responsive work; the status column reflects the current tree, not the original report.

| # | Issue | Status at `674f6b9` |
| --- | --- | --- |
| 9.1 | `Projects` cards collapse on mobile | **FIXED** |
| 9.2 | `MobileMenu` close button vs navbar z-index | **FIXED** (button removed) |
| 9.3 | Menu links focusable while closed | **FIXED** |
| 9.4 | No `<h1>` on the five sub-pages | **FIXED** |
| 9.5 | `html { overflow-x: hidden }` vs body scroll lock | **MITIGATED, root cause remains** |
| 9.6 | 10 internal links to non-existent routes | **OPEN** |
| 9.7 | `tsc --noEmit` depends on a pre-existing `.next/` | **OPEN** |
| 9.8 | Orphaned SVG placeholders in `public/` | **OPEN** |
| 9.9 | `GlassCard.tsx` is dead code | **OPEN (confirmed dead)** |

### 9.1 Projects section height on mobile — **FIXED**

The card is `<Link>` whose only content is `absolute inset-0`. Below `md` the row is flex with no `auto-rows`, so the card had no height source and collapsed to 0px. Fixed by adding `aspect-[4/3] md:aspect-auto` to the card class (with an explanatory comment in the file). From `md` up, `md:auto-rows-[220px]` / `lg:auto-rows-[200px]` supply the height instead.

**Do not remove either half.** Dropping `aspect-[4/3]` re-collapses mobile; dropping `md:aspect-auto` fights the grid rows.

### 9.2 MobileMenu close button vs navbar z-index — **FIXED**

Resolved by **removing the close button entirely** (commit `5dd76e8`, "drop occluded mobile menu top bar"). The overlay now has no top bar of its own; `Navbar`'s animated hamburger is the close control, and it works because the header sits at `z-[60]` above the overlay's `z-50`.

**Do not re-add an in-overlay close button** — it cannot escape the overlay's own stacking context and would render under the header (section 8.3). Dismissal paths today: the hamburger, any nav link, and `Escape`. There is deliberately **no click-outside region**, because the overlay root *is* the backdrop.

### 9.3 Menu focusability when closed — **FIXED**

The overlay stays permanently mounted, so this was a real bug. It is now handled by `visibility: hidden` in the closed state, which removes descendants from the tab order (`pointer-events: none` alone would not have). The `visibility` transition is stepped so it applies immediately on open and is deferred 280ms on close, preserving the exit animation. `aria-hidden={!isOpen}` is also set.

Residual gap: there is **no focus trap and no focus restoration**. Opening the menu does not move focus into it, and closing does not return focus to the hamburger. `role="dialog" aria-modal="true"` is declared but not fully implemented. Low severity, still open if you want strict dialog semantics.

### 9.4 Missing `<h1>` on the five sub-pages — **FIXED**

`/services` already gained its H1 in `ServicesHero`. `/contact` now gets one H1 from
`ContactHero`, while `/a-propos`, `/realisations`, and `/blog` get one H1 from `ComingSoon`.
`SectionHeading` still correctly defaults to H2 for actual sections and was not changed.

### 9.5 `html { overflow-x: hidden }` vs the body scroll lock — **MITIGATED, root cause remains**

`globals.css` still sets `overflow-x: hidden` on **both** `html` and `body`. Because the root element's overflow is no longer `visible`, `<body>`'s overflow stops propagating to the viewport and `<html>` becomes the scrolling element — so a body-only scroll lock does nothing.

This is currently worked around in `MobileMenu` by locking **both** elements and restoring prior inline values (section 5.6). The lock works. But the underlying coupling is still there, and it is a trap: any future scroll-lock code (a modal, a lightbox) that follows the usual `document.body.style.overflow = "hidden"` recipe will silently fail.

Options: keep the double lock and document it (current state), or remove `html { overflow-x: hidden }` now that `site-container` is padding-based and the negative-margin overflow sources are gone — then re-verify no horizontal scrollbar appears at 320/360/430px. The `body { overflow-x: hidden }` can likely stay.

### 9.6 Internal links pointing at non-existent routes — **OPEN**

Routes that exist: `/`, `/a-propos`, `/blog`, `/contact`, `/mentions-legales`, `/realisations`, `/services` (confirmed against generated route types).

**9 unique non-existent routes, reached by 13 `<Link>` instances:**

| Broken route | Referenced from | Count |
| --- | --- | --- |
| `/services/residentiel` | `data/services.ts`, `Footer.tsx` | 2 |
| `/services/commercial` | `data/services.ts`, `Footer.tsx` | 2 |
| `/services/industriel` | `data/services.ts`, `Footer.tsx` | 2 |
| `/services/entretien` | `data/services.ts`, `Footer.tsx` | 2 |
| `/realisations/centre-logistique` | `data/projects.ts` | 1 |
| `/realisations/immeuble-bureaux` | `data/projects.ts` | 1 |
| `/realisations/residence-haut-gamme` | `data/projects.ts` | 1 |
| `/realisations/usine-agroalimentaire` | `data/projects.ts` | 1 |
| `/politique-confidentialite` | `Footer.tsx` | 1 |

Every service card on the home page, every project card, all four footer service links and the privacy link are 404s. There is also **no `not-found.tsx`**, so users get the framework default.

These do **not** fail `tsc` because `typedRoutes` is not enabled in `next.config.ts`. Enabling it would turn all 14 into compile errors — useful as a guardrail once the routes exist.

Fix paths: add `app/services/[slug]/page.tsx` + `app/realisations/[slug]/page.tsx` dynamic routes (remember `params` is a Promise — section 2.1), or point the hrefs at existing pages until detail pages are built. A privacy page still requires product/legal review rather than fabricated boilerplate.

### 9.7 `tsc --noEmit` passes only because `.next/` exists — **OPEN**

`npx tsc --noEmit` currently reports 0 errors, but that depends on `.next/dev/types/{routes,root-params}.d.ts` being present on disk from a previous `next dev`. On a clean checkout:

- `next-env.d.ts` (itself generated and gitignored) does `import "./.next/dev/types/routes.d.ts"` → unresolved module error.
- `LayoutProps<"/">` in `layout.tsx` → `Cannot find name 'LayoutProps'`.

**CI must run `next typegen` before type-checking.** The documented pattern is exactly:

```bash
npx next typegen && npx tsc --noEmit
```

`next typegen` loads `next.config.ts` using the production build phase, so any env vars the config needs must be available. There is currently **no CI workflow at all** (`.github/` does not exist), so nothing enforces this.

### 9.8 Orphaned SVG placeholders in `public/images/` — **OPEN**

Commit `687f244` swapped `src/data/images.ts` to Unsplash URLs but left all 13 placeholder SVGs on disk. Verified: no file in `src/` references any path under `public/images/`.

| Path | Referenced? |
| --- | --- |
| `public/images/hero/ventilation-hero.svg` | no |
| `public/images/about/ventilation-installation.svg` | no |
| `public/images/services/*.svg` (4 files) | no |
| `public/images/projects/projet-0{1..4}.svg` (4 files) | no |
| `public/images/logo/ventila-logo.svg` | named by `images.logo.main`, but **nothing reads `images.logo`** |

Also dead, from the `create-next-app` scaffold: `public/{file,globe,next,vercel,window}.svg` (5 files). All 18 files are safe to delete. Decide separately whether to keep `images.logo` as an entry.

### 9.9 `GlassCard.tsx` — **confirmed dead code**

Verified: the identifier `GlassCard` appears only inside `src/components/ui/GlassCard.tsx`. No importers.

Meanwhile the glass treatment is open-coded in `Process.tsx` (`bg-navy-800/80 backdrop-blur-xl border border-white/10`, i.e. `shade="dark"` with `white/10` instead of `white/8`) and in the `AboutPreview` stat cards. Either adopt `GlassCard` at those call sites or delete the file — leaving both is the worst option, since a reader cannot tell which is canonical.

Also unused at this commit: the `align="center"` branch of `SectionHeading`, the `ghost` and `sm`-size variants of `Button` (`sm` is used by `Navbar`; `ghost` is not used anywhere), `navy-600` / `navy-500` / `navy-400` and `brand-100` color tokens, the `ImageKey` type, and `images.logo`. The `band-y` utility is used by exactly one consumer (`ContactCTA`).

---

## 10. What's built vs not built

### Built and working

| Area | Detail |
| --- | --- |
| Responsive homepage | 5 sections (`Hero` + embedded `Process`, `Services`, `AboutPreview`, `Projects`, `ContactCTA`), tuned 320px → 1920px |
| Design system | `@theme` navy + brand palettes, responsive `:root` scale tokens, 8 `@utility` classes, fluid `clamp()` typography, branded scrollbar, global focus ring |
| Mobile navigation | Viewport-level overlay with animated hamburger, synchronized 280ms enter/exit, Escape-to-close, dual `html`+`body` scroll lock, auto-close past `lg` |
| Layout shell | Fixed `h-16` blurred header, sticky footer via flex, `SiteShell` client boundary correctly scoped |
| Carousel→grid pattern | `scroll-snap-row` / `scroll-snap-item`, hidden scrollbars, mobile snap carousels becoming grids at `md`; Process dots track and control all four snapped steps |
| Image pipeline | `next/image` with `fill` + hand-tuned `sizes` per breakpoint everywhere, `priority` on the local progressive-JPEG LCP hero, `remotePatterns` for remaining Unsplash assets, centralised registry |
| Metadata and structured data | Root metadata base and one global Organization JSON-LD; complete route metadata on `/services`, `/contact`, and `/mentions-legales` |
| Company/legal facts | Central `site.ts`, verified registered identity/address/identifiers, legal-notice route, and concise footer identity |
| Contact foundation | Responsive labeled form, required semantics, disabled honest submission state, user-confirmed phone, unverified existing email, and registered-office address |
| Accessibility basics | Exactly one H1 per existing route, `aria-labelledby` on sections, explicit form labels/help text, `aria-expanded`/`aria-controls` on the hamburger, decorative SVGs `aria-hidden`, `:focus-visible` ring, 44px touch-target floor |
| Toolchain hygiene | `tsc --noEmit` clean, `eslint --max-warnings 0` clean |

### Not built

| Area | Missing |
| --- | --- |
| **SEO remainder** | No `sitemap.ts`, `robots.ts`, `manifest.ts`, or `opengraph-image`; root Open Graph/Twitter defaults remain sparse. Route canonicals exist for services, contact, and legal notice |
| **Contact delivery** | No Server Action, email transport, storage, spam protection, or active online submit. The visible form foundation cannot send and says so; users can use the repository `mailto:` link |
| **CMS / data source** | None. `data/*.ts` are hardcoded arrays. No fetching, no `use cache`, no revalidation, no DB |
| **Animations** | No scroll reveal, no View Transitions, no `framer-motion`. Motion is limited to CSS UI transitions, the hamburger/overlay, smooth Process dot navigation, and native scroll snap; Process respects `prefers-reduced-motion` |
| **Sub-page content** | `/a-propos`, `/realisations`, and `/blog` intentionally remain concise shared coming-soon states; no fake editorial content |
| **Detail routes** | No `/services/[slug]`, no `/realisations/[slug]` (9 broken routes total with privacy — section 9.6), no `/politique-confidentialite` |
| **Error/loading UI** | No `not-found.tsx`, `error.tsx`, `loading.tsx`, `global-error.tsx` |
| **Testing** | No test runner, no tests, no Playwright/Vitest/Jest |
| **CI** | No `.github/`. Nothing runs `next typegen && tsc --noEmit` or eslint automatically (section 9.7) |
| **Unverified content** | Email `contact@ventila-solutions.fr` and marketing stats (10+/250+/98%) remain unverified; the homepage hero is an original generated asset and other imagery remains stock. Phone and legal company facts are no longer placeholders |
| **i18n** | Single hardcoded locale. No `next-intl`, no `[locale]` segment |
| **Analytics / consent** | None |

---

## 11. Conventions to follow

1. **French-language content.** All UI copy, `alt` text and `aria-label`s are in French. `<html lang="fr">`. Preserve accents and typographic details: `&nbsp;` before `?` and `!` (see `ContactCTA`: `Un projet&nbsp;? Parlons-en`), `·` as a separator, `→` in CTA labels, `œ` in "Mise en œuvre".
2. **French route slugs.** `/a-propos` (not `/about`), `/realisations` (not `/projects`), `/services`, `/contact`, `/blog`. Data `id`s follow suit: `residentiel`, `industriel`, `entretien`. Keep new routes French.
3. **kebab-case image filenames**, in a category subfolder: `public/images/<category>/<kebab-case-name>.<ext>` — e.g. `ventilation-residentielle.svg`, `maintenance-ventilation.svg`, `projet-01.svg`. Registry **keys** are camelCase (`project01`, `residential`, `maintenance`); note keys are English while filenames are French.
4. **Server Components by default.** Add `"use client"` only when interactivity genuinely requires it, and add it to the smallest possible leaf. Current client entries are `layout/SiteShell.tsx`, `layout/MobileMenu.tsx`, and `home/ProcessCarousel.tsx`. Do not add hooks to `Navbar` (section 8.5).
5. **`@/*` path alias → `src/*`.** Use `@/components/...`, `@/data/...`, `@/lib/...` for cross-directory imports. Relative imports are used only for true siblings (`./Navbar`, `./images`). Match the surrounding file.
6. **All images through `src/data/images.ts`** (section 7.1). Never inline a URL or `/images/...` path. New remote hosts require a `next.config.ts` `remotePatterns` entry.
7. **All spacing through the design tokens.** Use `site-container` / `<Container>`, `section-y`, `band-y`, `hero-title`, `section-title`, `lead` rather than re-guessing padding per component. To change rhythm globally, edit the `:root` tokens in `globals.css`.
8. **No new dependencies without justification.** The project deliberately ships only `next`, `react`, `react-dom`. Do not add `clsx`, `tailwind-merge`, `framer-motion`, or an icon library casually — `cn()` and inline SVGs exist precisely to avoid them.
9. **No `tailwind.config.js`, ever.** Tailwind v4 tokens go in `@theme {}` in `globals.css`; custom classes go in `@utility` blocks (section 2.4).
10. **Always supply a `sizes` prop with `<Image fill>`,** and match it to the actual rendered width at each breakpoint. Every existing call site does this deliberately; copy the pattern from the nearest component.
11. **Icons are inline SVG** with `aria-hidden="true"`, defined as un-exported local helpers at the bottom of the consuming file. Prefer `stroke="currentColor"` so the palette flows through (note several existing icons hardcode `#60a5fa` — do not propagate that).
12. **Every `<section>` gets an accessible name:** `aria-labelledby` pointing at a `SectionHeading` `headingId`, or `aria-label` when there is no heading (`ContactCTA`).
13. **Brand and legal-name distinction.** The public website brand is exactly **"Diakhite Air Proteger"** (without an accent), including UI, copy, metadata, and JSON-LD `name`. The verified registered legal denomination is **"AIR PROTEGER"** and must remain in legal copy and JSON-LD `legalName`. The package/repository slug stays `diakhite-air-proteger`. The existing `contact@ventila-solutions.fr` address is retained because no replacement was provided; it is brand-inconsistent and still requires owner confirmation.
14. **`AGENTS.md`'s managed block** (`<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END: -->`) is written and re-added by `next dev`. If it appears dirty, commit it with your work rather than reverting — reverting only re-creates the change.
15. **Comment style.** Existing files use section-divider comments (`{/* ── Section header ── */}`, `/* ─── Base ─── */`) and multi-line rationale comments that explain **why** a non-obvious choice was made (see `SiteShell`, `MobileMenu`, `Navbar`'s `burgerLine`, `Projects`'s `slots`). Match this: document constraints and trade-offs, not what the code obviously does.

---

## 12. Commands

```bash
# Install (npm — do not switch package managers)
npm install          # or `npm ci` for a clean, lockfile-exact install

# Development — Turbopack is the default; do NOT add --turbopack
npm run dev          # → next dev        (http://localhost:3000, output in .next/dev)

# Production
npm run build        # → next build      (Turbopack by default; add --webpack to opt out)
npm start            # → next start      (requires a prior build)

# Lint — `next lint` is REMOVED in Next.js 16
npm run lint         # → eslint
npx eslint src/ --max-warnings 0        # currently: 0 problems

# Type check — generate route types FIRST, or LayoutProps<"/"> will not resolve
npx next typegen                        # writes .next/dev/types/ + next-env.d.ts
npx tsc --noEmit                        # currently: 0 errors
npx next typegen && npx tsc --noEmit    # the correct CI invocation
```

| Command | Script | Notes |
| --- | --- | --- |
| `npm run dev` | `next dev` | Turbopack default. Output `.next/dev`. A lockfile prevents two concurrent `next dev` on one project. Regenerates `AGENTS.md`'s managed block and `next-env.d.ts`. |
| `npm run build` | `next build` | Turbopack default. Separate output dir from dev, so build and dev can run concurrently. **Does not lint** (Next 16 removed that). No `size` / `First Load JS` columns in the output. |
| `npm start` | `next start` | Serves the production build. |
| `npm run lint` | `eslint` | Bare `eslint`, flat config from `eslint.config.mjs`. |
| `npx tsc --noEmit` | — | Needs `.next/**/types` present; run `next typegen` first on a clean checkout (section 9.7). |
| `npx next typegen` | — | Generates route types without a full build. Loads `next.config.ts` in the production phase. Introduced in 15.5. |

**Not available / do not suggest:** `next lint` (removed), `next export` (use `output: "export"`), `--turbo` (renamed then made default).

**Docs:** version-matched Next.js 16.3.2 documentation is bundled at `node_modules/next/dist/docs/`. Start with `01-app/02-guides/upgrading/version-16.md` for breaking changes and `01-app/03-api-reference/` for API details. Prefer these over recalled knowledge — they are authoritative for the exact installed version.

---

## 13. `/services` five-discipline editorial page (source commit `bd6c1bc`)

### 13.1 Composition and semantics

`src/app/services/page.tsx` remains a Server Component and renders a plain `<div>` because
`SiteShell` already owns the document `<main>`. Its section order is:

1. `ServicesHero` — local CVC-equipment LCP image, accessible breadcrumb, the route's single H1
   naming all five disciplines, and links to `/contact` and `#services`.
2. `ExpertiseIntro` — coordinated thermal, air, hydraulic-fluid, water, and lifecycle context.
3. `ServicesEditorialGrid` — the stable `id="services"` target and exactly five ordered service
   articles. Chauffage and Ventilation form a two-panel photographic introduction; Climatisation
   uses an image/text split; Hydraulique gets a distinctive full-width dark 8/4 asymmetric feature;
   Plomberie & sanitaire closes with a reversed image/text split.
4. `WhyChooseUs` — three neutral, supportable approach themes and `/a-propos` link.
5. `ServicesProcess` — ordered five-step sequence: need analysis, solution study, implementation,
   commissioning, then follow-up and maintenance.
6. `ServicesCTA` — `/contact`, phone, and email actions sourced from `site.ts`. The phone is
   user-confirmed; the existing email remains unverified.

Every section is named with `aria-labelledby`; service names are `<h3>` under section `<h2>`s.
Hydraulique links contextually to `#chauffage` and `#plomberie-sanitaire`; all five schema URLs use
the same visible article IDs.
All new components are Server Components. `Navbar`, `SiteShell`, `MobileMenu`, `Footer`, global
tokens, and unrelated routes were not changed.

### 13.2 Content contract

`src/data/service-page.ts` owns all substantial page copy:

- `ServicePageItem` has `id`, `title`, `eyebrow`, `summary`, `details`, optional image/alt, and
  a `treatment` discriminator (`feature | split | spotlight`).
- `servicePageItems` is the canonical taxonomy and ordering: `Chauffage`, `Ventilation`,
  `Climatisation`, `Hydraulique`, `Plomberie & sanitaire`.
- Hydraulique describes technical fluid distribution/circulation supporting heating and CVC.
  Plomberie & sanitaire separately describes building water supply, evacuation, and sanitary
  connections. This boundary avoids presenting domestic water networks as hydronic CVC.
- `trustThemes` and `serviceProcess` keep the approach and five process steps out of UI files.
- Copy deliberately makes no claim about specific hydraulic circuits, pumps, balancing,
  pressurization, calculations, capacities, materials, equipment brands, certification,
  regulatory compliance, service area, response time, guarantee, rating, or award.

### 13.3 Local image strategy

`images.servicePage` in `src/data/images.ts` is the only source of the page's image paths. The page
actively uses six distinct progressive JPEGs: one hero plus one for each discipline. Additional
older service-page registry images remain available but are not rendered by this taxonomy.
The active keys are `hero`, `heating`, `professional`, `airConditioning`, `hydraulicNetwork`, and
`plumbingFittings`; `plumbingNetwork` and `technicalIntervention` are retained but inactive here.

| Registry key | Local file | Source photo |
| --- | --- | --- |
| `hero` | `systemes-techniques-cvc-batiment.jpg` (2400×1600) | CVC equipment in a technical building volume |
| `airConditioning` | `unites-climatisation-batiment.jpg` (2000×1333) | exterior air-conditioning units |
| `heating` | `chauffage-radiateur-batiment.jpg` (2000×2667) | architectural radiator |
| `professional` | `ventilation-professionnelle-bureaux.jpg` (1800×1202) | contemporary office interior |
| `hydraulicNetwork` | `reseaux-hydrauliques-cvc-batiment.jpg` (1536×1024) | original generated hydronic mechanical room |
| `plumbingNetwork` | `reseau-plomberie-batiment.jpg` (2000×1500) | exposed technical pipework |
| `plumbingFittings` | `reseau-plomberie-raccords.jpg` (2000×3000) | plumbing fittings |
| `technicalIntervention` | `intervention-technique-equipement.jpg` (1800×1202) | equipment intervention |

New-asset SHA-256 values, in table order for the five added files:
`dcd6b6bcf21d924152decedcef99206b541ccbb6ade85d2215f5a41b8e01eeb2`,
`bafee0496d4ac7c91078748a9d4ee01c6a22b2b61f8f7359a1f11b62b7ec5929`,
`ed3f0ad4ab196b2344b85a4a2cc5799409d6435314a5bfc9e7fcacf86f32776a`,
`6faf7dda7b1f98bf97e78cb01e70839e834a33d825f036d5a520db01e3b330bf`, and
`6f3821fb70ddb195685096cb798754dced4bb68aba7f1d0f03d77a6852f1335d`.

The Hydraulique image was generated with Cursor on 2026-08-28 from a prompt requesting a realistic,
clean building mechanical room dominated by orderly hydronic HVAC pipes, with no people, domestic
fixtures, factory production line, text, logo, rust, grime, or leak. The generated 1536×1024 RGB
PNG was visually inspected, then converted with Sharp/mozjpeg to a 360,534-byte progressive
1536×1024 JPEG at quality 88 and 4:4:4 chroma. Its MIME is `image/jpeg`; SHA-256 is
`918d99242d64456fe40302d9648a2c518e235c3990c552b94e6ee3e69adf04b9`, unique among the local
service JPEGs. The filename and French alt describe the visible insulated technical pipe network.

Meaningful images use `next/image`, `fill`, aspect-ratio parents, responsive `sizes`, `object-cover`,
and French replacement alt text. Only the hero uses Next 16's `preload`; below-fold images retain
native lazy loading. The Hydraulique image uses a 4:3 mobile crop, 16:9 tablet crop, and an
image-dominant 8/4 desktop grid with a dedicated `sizes` string; it is not relabeled from another
discipline.

### 13.4 Route metadata and structured data

The route exports static metadata:

- Resolved title: `Services CVC, hydraulique et plomberie | Diakhite Air Proteger` (the route
  title relies on the root template, so the brand is not duplicated).
- Description names the five confirmed disciplines and broad installation, renovation, and
  maintenance lifecycle without geographic stuffing.
- Absolute canonical and Open Graph URL:
  `https://diakhite-air-proteger.vercel.app/services`.
- `index, follow`, `fr_FR` Open Graph website fields, Twitter `summary_large_image`, and the
  absolute local hero-image URL. No `keywords` field is added at route level.

One native `<script type="application/ld+json">` contains an `@graph` with:

- `BreadcrumbList` for Accueil → Services.
- `ItemList` of five visible `Service` entries whose URLs point to the corresponding in-page
  article IDs. Each provider references the global Organization by `@id`, avoiding a duplicate.

The JSON is serialized with `JSON.stringify(...).replace(/</g, "\\u003c")`; `next/script` is not
used. No location, price, rating, review, certification, or area-served property is present.

### 13.5 Validation

- `npx next typegen` — pass.
- `npx tsc --noEmit` — 0 errors.
- `npx eslint src/ --max-warnings 0` — 0 warnings.
- `npm run build` — pass; `/services` statically prerendered.
- Production runtime — `/services`, all linked existing route destinations, and the Hydraulique
  image optimizer return HTTP 200.
- Chrome checks at 320, 375, 390, 430, 768, 1024, 1440, and 1920 px find no horizontal overflow;
  exactly one H1, five H2s, thirteen service/approach/process H3s; the exact five-category visual
  and schema order; one global Organization; five `Service` entries referencing its existing
  `@id`; valid in-page anchors; and a complete Hydraulique image with nonzero natural width.
- The canonical, description, Open Graph/Twitter title architecture, public brand, legal name,
  confirmed phone, and retained email remain correct. No browser runtime exception was captured.
- Hero and Hydraulique screenshots were visually inspected at 320, 768, and 1440 px. The
  Hydraulique composition is stacked image-first on mobile/tablet and asymmetric image-dominant on
  desktop. The mobile menu still opens/closes as a fixed overlay at 390 px; desktop navigation
  replaces it at 1024 px.

Known limitation: the site-wide footer still links to missing service-detail and privacy routes, and
other unrelated pages still use remote Unsplash images (one existing project URL returns 404).
Those pre-existing issues are outside the `/services` scope.

---

## 14. Contact and coming-soon routes (source commit `0304d02`)

### 14.1 `/contact`

`src/app/contact/page.tsx` remains a Server Component and composes three focused Server
Components under `src/components/contact/`:

1. `ContactHero` — dark route introduction with the page's single H1.
2. `ContactForm` — light semantic form with visible labels, required and autocomplete attributes,
   48px fields, help text, native input types, a required carefully worded consent checkbox, and
   project/building options aligned with the existing service offering.
3. `ContactDetails` — sticky-at-desktop panel using the user-confirmed `06 51 64 46 57`,
   existing unverified `contact@ventila-solutions.fr`, and registered office at
   `10 avenue Normandie Niemen, 77290 Mitry-Mory`; it links to `/services` and does not imply
   public walk-in access.

There is deliberately no `"use client"`, form action, API endpoint, provider, database, or personal
data logging. The disabled submit control and two visible notices state that online sending is not
available and that entered values are not transmitted or stored. A direct `mailto:` is the usable
delivery path; it does not copy form values or claim successful delivery.

The route has an absolute `/contact` canonical on
`https://diakhite-air-proteger.vercel.app`, `index, follow`, `fr_FR` website Open Graph fields, and
Twitter summary metadata. The desktop layout is a minmax form/sidebar grid and remains stacked
below `lg`.

### 14.2 Shared incomplete-route state

`src/components/ui/ComingSoon.tsx` is a reusable Server Component for `/a-propos`,
`/realisations`, and `/blog`. Each route supplies its own eyebrow, H1, and concise French
description, while the shared state provides links to `/services`, `/contact`, and `/`. No fake
history, portfolio, article, availability, location, guarantee, or timing content was added.

---

## 15. Homepage hero HVAC photograph (source commit `d5c2aa5`)

The homepage LCP image is now the stable local asset
`public/images/hero/conduits-ventilation-metalliques-professionnels.jpg`, registered only as
`images.hero.ventilation`. The `/services` page now has its own CVC-equipment hero and remains
independent from the homepage image.

The image is an original generated asset produced with Cursor's image-generation tool on
2026-08-28. Its generation prompt requested a realistic professional architectural photograph
dominated by clean, polished galvanized/silver round HVAC ductwork in a bright modern interior,
with a calmer left side for hero copy and no people, text, logos, rust, grime, generic plumbing,
or machinery. Visual inspection confirmed that the filename and French alt text truthfully match
the result.

The generated 1536×1024 RGB PNG was converted with Sharp/mozjpeg to a 1536×1024, 232,999-byte,
progressive 8-bit RGB JPEG at quality 88 with 4:4:4 chroma. SHA-256:
`ac31031fe8cb583be44cfd70281159838b4e81487bfe441ee84edbae9a5c4d2a`.
The file has a valid JPEG signature/MIME. Next's 1920-wide optimizer request returns HTTP 200 as
a 97,108-byte WebP; the source is not enlarged beyond its intrinsic dimensions.

Validation at the source commit:

- `npx next typegen`, `npx tsc --noEmit`, `npx eslint src/ --max-warnings 0`,
  `npm run build`, and `git diff --check` pass.
- The production homepage and local hero optimizer endpoint both return HTTP 200.
- Chrome checks at 320×844, 375×812, 390×844, 430×932, 1024×768, 1440×900, and
  1920×1080 confirm prominent ductwork, preserved proportions via `object-fit: cover`, no hero
  distortion, and no horizontal overflow (`scrollWidth === clientWidth` at every width).
- No hydration exception, JavaScript console error, or hero-resource failure was captured.
  Existing unrelated network 404 logs remain from broken service-detail prefetches and the known
  dead `project04` Unsplash URL documented in sections 9.6 and 13.5.
