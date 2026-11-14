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

Workers Builds should connect `BrunoAseff/portfolio` to Worker `portfolio`, with
root `/`, production branch `main`, build command `pnpm exec vp run verify`, and
deploy command `pnpm run deploy`. A failed verification must prevent deployment.
Use a dedicated portfolio build token, managed by Cloudflare; never commit a token.
The package manager and Node versions are pinned in the repository.

## Domain boundary

The portfolio owns only `brunoaseff.com.br` and `www.brunoaseff.com.br`. Do not use
a wildcard Worker route or change nameservers, zone-wide TLS settings, email
records, or the `lazuli` Worker. Lazúli, its API and analytics have independent
hostnames and must retain their records and deployments.

Before cutover, verify the workers.dev deployment, both locales, the real 404,
legacy redirects, PDF downloads, headers and a hashed asset. After cutover,
verify these on the production domain and compare Lazúli's DNS/HTTP baseline.

Rollback: restore only the portfolio apex/www records from the DNS backup kept
outside this public repository, or deploy a previously verified Worker version.
Do not delete the Vercel project until the replacement has been verified.

The initial deployment status and account resource identifiers are recorded in
the private workspace continuity documents, not as credentials in this repository.
