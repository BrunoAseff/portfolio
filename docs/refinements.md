# Current refinement state

## Refino 8 migrated · 2026-11-13

Bruno authorized applying refino 8 to the real application. Composition, local Nunito typography, integrated navigation light, supporting text roles, contextual audio/volume, locale transitions, icons, spacing and media drag are implemented. The global activity summary is in the footer, location/résumé in Contact. Previous prototypes are historical references, not the operational application.

Full verification passed: formatting/lint, Astro checks, 17 tests, static build and HTML/SEO/assets verifier. Browser checks covered copy, language/audio persistence, return navigation, media drag and narrow layouts. Browser screenshots remained unavailable; these checks do not imply a complete perceptual/audio review. Landscape, updated résumé materials and publication remain deferred. Migration does not close the wider refinement backlog.

## Historical records

# Deferred refinements after v3

## Current contact/activity direction

Three rendered alternatives were compared after the incremental changes were rejected. The selected activity uses a small GitHub-to-commit branch graphic and compact context. Bruno also requested the full repository prefix restored (e.g. BrunoAseff/lazuli); display the complete activity.repository. Bruno approved the composition, then requested the visible “Último commit” / “Latest commit” label; added. Contact improved; his latest request removed the leading envelope and tooltip, keeping email at **15px/25px** and Copy icon/text adjacent. Destination marks and the contact-specific résumé variant remain. These instructions supersede the older 18px/17px and tooltip experiments described below. No contact/activity cards. The study/QA pages were removed before delivery; no broad delight research or publishing occurred.

## Earlier implementation history

Bruno authorized the agreed nitpicks after validating the migration on 2026-11-11. R02–R07 and R09 are implemented; R01/R08/R10–R13 still need the corresponding design decisions. Migration alone did not close these items. Full acceptance criteria live in `../../ai-context/portfolio/implementacao-e-refinamentos.md` in the career workspace.

- R01: placement/relationship of location and accumulated experience.
- R02 (implemented): navigation spacing and relationship to opening actions.
- R03 (implemented): email copy versus mailto and the opening email action.
- R04 (implemented): résumé placement/prominence and quick revisit access.
- R05 (implemented): company period right-alignment on desktop versus stacking.
- R06 (implemented): evaluate removing Lazúli's main-project label.
- R07 (implemented): activity detail moved to the close of Projects; source/time, repository, message and explicit GitHub action refined.
- R08: real project image/hover preview/platform or technology icons; choose selectively.
- R09 (implemented): certificate arrow motion.
- R10: final landscape/araucaría design; keep static abstract background intent.
- R11: motion/audio polish, interruption, reduced motion and consistency.
- R12: PT/EN copy refinements.
- R13: final composition, hierarchy, contrast, responsive/accessibility audit after refinements.

Still needed before calling the whole product finished: updated PT/EN résumé, chosen project imagery if adopted, host redirect verification and publication verification. No legacy résumé is served as current. The application migration can be complete while these product tasks remain open.

Navigation regressions corrected: hash follows manual scrolling and clears at the top; locale switching reads the current section rather than a stale click. PT/EN labels stay above the moving marker snapshot. The sound preference is applied before first paint and has no React hydration step to temporarily mute it. These fixes do not complete R11's future motion/audio polish.

## Focused follow-up · 2026-11-11

Lazúli now links to https://lazuli.brunoaseff.com.br/ in both locales. External sites and PDFs open in a new tab; section and locale navigation remain in the current tab. The initial contact/activity cards were rejected by Bruno: inconsistent with the page, unnecessary surfaces, scattered information and redundant labels. They have been removed. Contact now keeps selectable email and Copy adjacent, with profiles/résumé grouped below. The commit is a compact message link with repository/time immediately below, without a visible title or duplicate GitHub CTA. Implementation is awaiting Bruno's visual evaluation; technical checks are not design approval.

Both locales checked at 320/390/640/1280 px; copy feedback and built-link policy verified. Future delight research (imagery, custom interactions, motion and references) was explicitly deferred by Bruno and has not started. These focused refinements do not close the broader pending visual work.

Follow-up after Bruno said merely undoing the cards was insufficient: email and Copy are now one action with a stable animated feedback area and selectable address. Email is the primary contact text (18px desktop/17px narrow), profiles/résumé are secondary (14px). Commit metadata is grouped above its 15px message link; the current-account prefix is omitted visually while the full repository remains in the title/data. No surfaces or duplicate CTA. Awaiting visual evaluation. Copy verified by click in EN and Enter in PT; narrow layouts checked in both languages. Print retains the email and hides only feedback.

## Accepted interaction migration

External-arrow and code gestures, clipboard/sound geometry morphs, activity branch tracing, contextual résumé notice and the original local navigation cursor are now in the application. The cursor no longer traverses intervening links. Project media controls retain their prototype positions: arrow bottom-right of the preview, Close top-right inside the expanded image. Real project screenshots and certificate peeks are integrated. No portrait, magnifier, floating side navigation, triangle replacement, document shake or back-arrow shake. Broader refinement work is paused pending design alignment; these changes do not close R11/R13 or resolve the reported whole-page language/loading experience.

## Refino migrated · 2026-11-12

Applied the accepted prototype direction to the real Astro components: wider reading column, clearer type/contrast, aligned project captures, block locale transitions, document/external/up gestures and temporary certificate previews. Restored Experience before Projects and reduced the local navigation indicator. The prototype actually rendered the system font; production now declares system-ui explicitly and avoids unused font downloads. Existing copy morph, activity hierarchy and audio preference remain.

Header composition and the Lazúli capture edge remain open for the next refinement round, alongside broader sound/motion work. Landscape remains deferred. Successful isolated checks do not constitute final visual approval. Vite Plus remains the project tool; memory-bounded direct Astro commands were needed for this validation run.
