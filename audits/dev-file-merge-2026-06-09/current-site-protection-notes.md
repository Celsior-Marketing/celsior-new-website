# Current site protection notes before 2026-06-09 developer page merge

Protect these existing changes while merging developer files:

1. shared.js must not be replaced casually.
   - Current shared.js includes footer/legal PDF links.
   - HubSpot CTA modal system.
   - 4 HubSpot form mappings.
   - Partner logo cards.
   - Clean navbar URL architecture.
   - Cookie/GDPR popup.
   - AI-first CTA fallback redirect.

2. Legal footer links must remain:
   - GDPR local PDF
   - CCPA/CRA local PDF
   - Privacy local PDF
   - Reasonable Accommodation local PDF
   - Web Accessibility local PDF
   - Privacy Introduction local PDF
   - Microsoft privacy external

3. CTA/form behavior must remain:
   - Talk/contact/schedule/book CTAs open HubSpot form unless explicitly routed.
   - Schedule Consultation on AI-first page opens form.
   - Explore Our Approach on AI-first page routes to /capabilities/ai-led-engineering.

4. URL architecture to preserve:
   - /contact-us or /contact, if created, should be clean folder route.
   - /our-focus/risk-and-compliance
   - /industries/insurance
   - /industries/healthcare

5. Every new/replaced page must use:
   - <script src="/shared.js">
   - no relative shared.js path
   - no old .html href routes
   - clean internal URLs
