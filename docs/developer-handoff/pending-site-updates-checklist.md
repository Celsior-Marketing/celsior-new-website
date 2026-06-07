# Celsior Website Pending Updates Checklist

## Purpose

This checklist captures items still missing, incomplete, or pending on the current Celsior staging site after the latest page updates.

This is intended for developer review and update planning. It is not a confirmation that all items should be fixed by the marketing team directly.

## Recently Added / Updated

- Partner dropdown updated from text chips to logo cards.
- Healthcare page added at `/industries/healthcare`.
- Insurance page added at `/industries/insurance`.
- SynthetiX page added at `/frameworks-accelerators/synthetix`.
- Navbar mapping updated:
  - Industries → Healthcare
  - Industries → Insurance
  - AI & Innovation → SynthetiX

## Pending: Footer

The footer is not final and needs developer review/update.

Known footer gaps:

- Privacy Policy link is still placeholder.
- Cookie Policy link is still placeholder.
- Terms of Use link is still placeholder.
- Accessibility link is still placeholder.
- Sitemap link is still placeholder.
- Social media links are still placeholders.
- Some footer company links point to generic/repeated destinations.
- Footer needs confirmation against final sitemap and final legal/social URLs.

Developer to confirm/update:

- Final footer columns
- Final footer labels
- Final footer links
- Final legal links
- Final social links
- Whether sitemap should be visible in footer
- Whether cookie/accessibility/CCPA links are required

## Pending: Missing / Unfinished Pages

Some pages are still expected to be updated or delivered.

Developer to confirm:

- Final list of all pages in scope
- Which pages are complete
- Which pages are pending
- Which old/static fallback pages should remain
- Which old/static fallback pages should be removed or redirected
- Whether any pages require redirects from old `.html` paths

## Pending: CTA and Button Links

Multiple CTAs still use placeholder links such as `href="#"`.

Developer/content owner to confirm:

- Which CTAs should open HubSpot forms
- Which CTAs should point to internal pages
- Which CTAs should point to downloadable assets
- Which CTAs should remain placeholders until assets are ready
- Which CTAs should be removed if no destination exists

## Pending: Legacy `.html` Links

Some legacy/fallback files still contain `.html` style links.

Developer to confirm:

- Whether these pages are still used
- Whether clean URLs should replace `.html` links
- Whether redirects are needed
- Whether old flat files should remain for compatibility

## Pending: SEO / Semantic Cleanup

Known cleanup items:

- Healthcare page has more than one H1.
- SynthetiX page has more than one H1.
- Some pages may need title/meta validation.
- Some page sections may need final heading hierarchy review.

Developer to confirm/update:

- One primary H1 per page
- Final page titles
- Final meta descriptions
- Open Graph / social preview tags
- Canonical URL approach

## Pending: Backend / Launch Readiness

Still to be confirmed before production launch:

- Google Analytics / GA4 ID
- Google Tag Manager ID, if used
- Google Search Console verification method
- `robots.txt`
- `sitemap.xml`
- Cookie consent banner
- Privacy Policy
- Terms of Use
- Accessibility Statement
- CCPA/CPRA opt-out requirement, if applicable
- reCAPTCHA / spam protection for forms
- Core Web Vitals / page speed testing
- Security testing
- Final redirect rules

## Notes

The current staging site is usable for review, but the above items should be addressed before production launch.

The marketing team should not make major structural fixes without developer confirmation, especially for footer, redirects, legal pages, analytics, and final page inventory.
