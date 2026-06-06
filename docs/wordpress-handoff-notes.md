# WordPress Handoff Notes

## Purpose

This document captures guidance for the future WordPress implementation.

The static site should be treated as the latest design/content reference, but not necessarily as the final technical architecture.

## Recommended WordPress Setup

Use a structured page-building approach with reusable components or ACF-style field groups.

Recommended editable field groups:

- Global Navbar
- Global Footer
- Page Hero
- Section Header
- Card Grid
- CTA Block
- Logo/Partner Grid
- Case Study Teaser
- Blog/News Listing
- HubSpot Form / Modal CTA
- SEO Metadata

## Important Global Components

### Navbar

The current desktop top-level navbar labels are dropdown triggers only. They should not navigate to parent pages.

Dropdown child links should remain clickable.

### Footer

Footer columns and links should be CMS-editable later.

### HubSpot Forms

HubSpot form IDs and modal helper text should be editable through CMS/config later.

## Migration Guardrails

- Do not hardcode major marketing copy in templates if it can be made editable.
- Avoid making every visual detail editable; keep design consistency.
- Reuse component fields across pages where possible.
- Keep URLs clean and human-readable.
- Preserve approved content from the static site review phase.
