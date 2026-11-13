# Approved architecture · 2026-11-11

Bruno approved the static Astro architecture with React islands, TypeScript, Tailwind and Vite Plus. The application replaces all tracked Next legacy source in the existing repository, preserving Git history/remote and selected certificates/links.

- `pages`: `/` PT, `/en/` EN, true 404, generated robots file.
- `layouts/SiteLayout`: document, shared styles and head.
- `views/PortfolioPage`: explicit composition; one source for both locales.
- `features`: sections and interactive behaviors; CSS colocated by concern.
- `content`: typed shared facts and localized text, stable IDs; no CMS/runtime i18n package.
- `components`: small shared UI, static landscape, SEO and locale navigation.
- React hydrates copying and temporary résumé notices. Audio uses a static button, restores session state inline before first paint and binds small DOM handlers; this avoids resetting its appearance during document navigation. Static content and static SVGs never require hydration. CSS handles simple states; Motion handles coordinated control transitions.
- Native locale navigation, stable anchors updated with the visible section, progressive cross-document view transitions and reduced-motion support. The language marker and its labels have separate snapshot layers so the marker cannot cover the text. Sound defaults off each session and is restored during locale navigation, never autoplayed.
- Shared `ExternalLink.astro` enforces a new tab with `noopener noreferrer` for external sites and PDFs; React résumé links mirror the policy. The built-HTML verifier checks this and keeps internal/locale navigation in the same tab.
- Experience duration: static initial value + tiny browser update, no global timer.
- GitHub activity: build-time public snapshot + retained fallback; optional collection before builds. Scheduled CI uploads a refreshed static artifact, with no deploy implied.
- Production build emits cacheable hashed CSS/JS/fonts. Essential content, alternate/canonical metadata, structured data, sitemap and social images are present without browser JavaScript.

The full design/career context remains at `../../ai-context/` in the original workspace. Architecture proposal: `../../ai-context/portfolio/arquitetura/proposta.md`. New standalone checkouts should use these repository docs for technical continuity and request missing personal context only when needed.

## Hosting boundary

Static deployment is intentionally unconfigured. Apply equivalent redirects/status/cache rules for the chosen provider, including true missing-page status, removed blog/API paths and old document URLs. `_redirects`/`_headers` are templates compatible with Netlify/Cloudflare. No automatic domain/provider/account changes are part of this implementation.

## Locale and arrival refinement

Native cross-document View Transitions name translated content blocks and preserve separate header/marker/image snapshots. Locale navigation stores a short-lived reading anchor for restoration before the new document is revealed. Supported browsers animate; other browsers retain normal static navigation. Entry animation is a block opacity fade, skipped for locale arrivals, hash navigation and reduced motion. Essential content remains server-rendered HTML. Typography uses local Nunito 400/600, with the regular reading weight preloaded and the OFL license preserved. The shared presentation layer defines the accepted composition and text/control roles.

## Refino 8 migration · 2026-11-13

The authorized composition uses a continuous rounded reading surface, integrated complete header navigation, and Experience before Projects. Global account activity lives in the document footer. Location and résumé are in Contact; project names are external destinations. All essential content remains Astro-rendered.

Contextual audio is opt-in and browser-only; consecutive hover entries have no shared cooldown, and hover tails do not suppress action voices. Coordinated page interactions are in `lib/page-interactions.js`, alongside existing section navigation and media-viewer modules. The media canvas supports pull-to-dismiss while retaining Escape, close control and focus return. The shared presentation layer is `styles/presentation.css`; comparison-only prototype modes are excluded.
