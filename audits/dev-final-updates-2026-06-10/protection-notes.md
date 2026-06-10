# Protection notes before 2026-06-10 final developer updates

Do not blindly replace these:

- shared.js
- Footer/legal PDF links
- HubSpot CTA modal system
- Partner logo cards
- Clean URL routing
- /contact-us route
- AI-first "Explore Our Approach" CTA fallback
- Vercel/GitHub deployment setup

Merge rule:

- Developer HTML pages can be compared and merged page-by-page.
- Developer shared.js must not replace ours directly.
- If developer shared.js has useful additions, cherry-pick only those additions.
- Every merged page must use /shared.js, clean internal URLs, no old .html hrefs, no duplicate shared.js includes.
