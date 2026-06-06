# Cleanup Plan

## Phase 1: Safe Documentation and Audit

No site behavior changes.

- Add repo documentation
- Generate page inventory
- Generate routing/link inventory
- Document navbar and footer structure
- Add simple check script

## Phase 2: Link and Routing Audit

No deletion yet.

- Identify canonical pages
- Identify duplicate flat HTML pages
- Identify legacy URLs
- Identify broken internal links
- Identify footer links that point to old parent pages

## Phase 3: Controlled Cleanup

Only after audit.

- Convert outdated links to canonical clean URLs
- Add redirect/compatibility strategy where needed
- Remove confirmed unused duplicate files
- Keep each cleanup as a separate commit

## Phase 4: Code Organization

Higher risk, later phase.

- Split `shared.js` into smaller modules
- Move shared CSS into files
- Standardize formatting
- Add lightweight quality checks
