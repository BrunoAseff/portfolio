# Cloudflare deployment

The site is an Astro static build. Cloudflare Workers Static Assets serves `dist/`
without a runtime application server. `cloudflare.config.ts` fixes the Worker name,
compatibility date, trailing-slash behavior, real 404 fallback and observability.

## Build and release

```sh
pnpm install --frozen-lockfile
pnpm exec vp run verify
pnpm run deploy
```

`deploy` runs the pinned official Cloudflare CLI as `cf deploy dist`. Passing the
directory explicitly uploads Astro's already verified output. It does not ask the
CLI to detect or rewrite the framework. No Astro adapter or server hydration is
required. `_headers` and `_redirects` ship with the assets.

GitHub Actions runs `.github/workflows/verify.yml`: `verify` builds and uploads the
static artifact; `deploy` runs only after it succeeds, on a push to `main`, or on
the hourly schedule/manual run from `main` when the refreshed public commit differs
from the one served in production. It uploads that exact artifact without
rebuilding. Pull requests and unchanged scheduled runs do not deploy. Cloudflare CLI is version-pinned; the token is
a repository secret exposed only to the deploy step, restricted to Worker
`portfolio` (Individual Workers Editor). It is independent of Lazúli's build token.
The post-deploy check verifies both locales, PDFs, legacy redirects, headers,
404 handling and static assets. The package manager and Node versions are pinned.

## Domain boundary

The portfolio owns only `brunoaseff.com.br` and `www.brunoaseff.com.br`. Do not use
a wildcard Worker route or change nameservers, zone-wide TLS settings, email
records, or the `lazuli` Worker. Lazúli, its API and analytics have independent
hostnames and must retain their records and deployments.

Before cutover, verify the workers.dev deployment, both locales, the real 404,
legacy redirects, PDF downloads, headers and a hashed asset. After cutover,
verify these on the production domain and compare Lazúli's DNS/HTTP baseline.

Rollback: deploy a previously verified version of Worker `portfolio`. The Vercel
project has been retired; restoring its old DNS records would not restore that
origin. The DNS backup kept outside this repository is historical evidence, not
a working Vercel rollback target.

The initial deployment status and account resource identifiers are recorded in
the private workspace continuity documents, not as credentials in this repository.
