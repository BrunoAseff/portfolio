# Portfolio instructions

Astro static + React islands + TypeScript + Tailwind + Vite Plus. Keep all essential content in generated HTML. Do not reintroduce the removed Next app, blog, API route, runtime backend or full-page React hydration.

Start with `docs/architecture.md` and `docs/refinements.md`. In the career workspace, read `../ai-context/CONTINUAR.md` and its linked backlog for the complete product context. That external directory includes personal/internal context and must not be copied into this public repository.

V3 is the validated visual reference. The migration is separate from the deliberately deferred refinement stage. Preserve its hierarchy, palette, type and content until the user requests those refinements. Do not fix one component in isolation without auditing the full composition. Do not present unavailable résumé PDFs as updated.

Run `vp run verify` after substantive changes. Use `vp run dev/build/preview` for Astro; `vp dev/build` start Vite directly and do not replace framework commands. Keep scripts and lockfile reproducible. Preserve the repository Git history and user edits. Publication requires the corresponding user task; no deployment is configured here.
