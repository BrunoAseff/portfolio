# Bruno Aseff · portfolio

Portfólio pessoal de Bruno Aseff, com experiências, projetos e contato.

Static Astro site with React islands, TypeScript, Tailwind CSS and Vite Plus. Portuguese at `/`, English at `/en/`. No server, database, CMS or blog.

## Develop and verify

Use Node 24 LTS (see `.node-version`) and Vite Plus:

```sh
vp install
vp run dev
vp run verify
vp run preview
vp run social # regenerate PT/EN share images after changing name/role
```

`vp run build` creates `dist/` and verifies its HTML, SEO and local asset references. `vp run check:astro` checks `.astro` and TSX templates; `vp check` covers the toolchain's lint/type/format checks. `vp test run` covers date boundaries, content contracts and public activity normalization. Set `ASTRO_TELEMETRY_DISABLED=1` to disable Astro telemetry.

## Edit content

`src/content/` holds shared facts and typed PT/EN text. Add projects in `projects.ts`, experiences in `experience.ts`, credentials in `education.ts`. Shared links and résumé availability live in `site.ts`. Add both languages together. The single composition is `src/views/PortfolioPage.astro`; routes only select a locale. Each feature owns its markup and CSS. `src/styles/global.css` loads them in a deliberate order, with responsive overrides last; preserve that cascade.

Bricolage WOFF2 is bundled from Fontsource, with its OFL notice in `src/assets/fonts/`. Static SVG geometry renders at build time. Motion/React are used for copying and résumé feedback; static sections do not hydrate. The sound button is static HTML with an inline session-state bootstrap before the first paint, avoiding a false muted state during navigation. See `NOTICE.md`.

## Public activity

```sh
vp run sync:activity
```

This network step reads the account's most recently pushed public repositories (forks and archived repositories excluded) and keeps the newest non-merge commit on a default branch. The public events feed is not used: it omits pushes made by merging pull requests. `GITHUB_TOKEN` is optional and build-only. Fetch failure keeps the last valid cache/baseline without changing its timestamp. The site itself makes no GitHub request for each visitor.

CI refreshes the snapshot on every non-PR run. An hourly schedule on `main` compares the fresh commit with the one served at brunoaseff.com.br and redeploys only when it changed; code changes still deploy on push to `main`. The snapshot committed in `src/data/` is only the local/offline baseline.

## Static hosting

Publish `dist/` to the chosen provider after the publication step is requested. No provider is assumed. `_redirects` and `_headers` provide Netlify/Cloudflare-compatible rules; adapt equivalent redirects/cache/status behavior on another host. Never configure an SPA fallback for arbitrary URLs. Removed blog and API paths should return 404, or 410 if configured by the host.

Production URLs are generated for `https://brunoaseff.com.br`. Set `SITE_NOINDEX=1` during a preview build to emit `noindex` and disallow crawling; serve preview responses with matching `X-Robots-Tag` if supported. Rebuild without it for production.

## Known deferred materials and refinements

The updated PT/EN résumé has not been produced. Its entries in `site.ts` remain null; controls show an honest update notice and never serve the old PDF. The four selected projects, three certificates and v3 presentation were migrated. The agreed post-migration nitpicks have been applied; undecided visual/content refinements remain deferred. See `docs/refinements.md` and `AGENTS.md` before redesigning anything.
