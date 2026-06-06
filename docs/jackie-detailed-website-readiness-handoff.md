# Celsior Website Readiness and Backend Handoff

## Purpose

This document captures the current readiness state of the Celsior static website for staging review, backend setup, launch readiness, and final handoff.

It is intended to answer the request for a detailed document covering:

- All pages
- All buttons and where they point
- Forms and CTA form behavior
- Metadata, meta tags, favicon, sitemap, robots, redirects
- Google Analytics, Google Tag Manager, and Google Search Console readiness
- Privacy, cookies, terms, accessibility, and compliance items
- Responsiveness, performance, Core Web Vitals, and security testing
- Open items and pending confirmations

This is a working handoff document. Final approval/sign-off should happen after the remaining developer pages, analytics IDs, legal pages, and production-domain decisions are confirmed.

## Current Site and Deployment Context

| Item | Current Detail |
|---|---|
| Current site type | Static HTML website |
| Shared global code | `shared.js` controls navbar, mobile drawer, mega menu, footer, and HubSpot modal behavior |
| Repository | `celsior-new-website` |
| Deployment flow | GitHub `main` branch to Vercel |
| Current staging/dev URL | `https://dev.celsiortech.us/` |
| WordPress future state | Planned later; current work should not conflict with future WordPress build |

## Executive Summary

- The website is currently being completed on staging/dev.
- A backend readiness audit has been generated from the repo.
- Page readiness, CTA/button mapping, legal/backend checklist, and open items have been separated into tracker files.
- Analytics/GTM/Search Console are not currently implemented in the static site files and should be handled during final staging/pre-launch setup.
- `robots.txt` and `sitemap.xml` are not currently present and should be finalized after the full page list and production domain are confirmed.
- Some 404s may be expected while remaining developer pages are still pending.
- The final handoff should combine this document plus the tracker CSV files for detailed review.

## Backend Scope Checklist

| Area | Current Finding | Recommended Action | Timing | Priority | Status |
|---|---|---|---|---|---|
| Google Analytics | No GA4/gtag snippet detected in current static site files. | Confirm GA4 Measurement ID and tracking strategy before implementation. | Final staging / pre-launch | High | Pending confirmation |
| Google Tag Manager | No GTM container snippet detected in current static site files. | Confirm whether Celsior uses GTM and provide GTM Container ID. | Final staging / pre-launch | High | Pending confirmation |
| Google Search Console | No Search Console verification tag/file detected in current static site files. | Confirm property type and verification method. | Final launch setup | High | Pending confirmation |
| robots.txt | robots.txt not found in repo root. | Create robots.txt after final dev/prod indexing strategy is confirmed. | Pre-launch | High | Not started |
| sitemap.xml | sitemap.xml not found in repo root. | Generate sitemap after final page list and production domain are confirmed. | Pre-launch | High | Not started |
| Privacy Policy | Needs confirmation. | Confirm final privacy policy page/content and link placement. | Pre-launch | High | Needs review |
| Terms of Use / Terms of Service | Needs confirmation. | Confirm legal page/content and footer link. | Pre-launch | Medium | Needs review |
| Cookie Consent and Cookie Policy | Needs confirmation. | Confirm cookie policy and whether consent banner is required based on tracking/cookies used. | Before analytics launch | High | Needs review |
| Contact Forms / CTA Forms | No native form tags found in repo audit. HubSpot/modal form behavior appears to be handled globally. | Confirm HubSpot form IDs, routing, notification recipients, thank-you behavior, spam protection, and CRM mapping. | Staging review | High | Needs review |
| reCAPTCHA | No reCAPTCHA implementation detected in static files. | Confirm whether HubSpot forms provide spam protection or whether reCAPTCHA is required. | Before form go-live | Medium | Pending confirmation |
| Accessibility Statement | Needs confirmation. | Confirm whether an accessibility statement page is required and link it in footer/legal area if needed. | Pre-launch | Medium | Needs review |
| CCPA Opt-Out Mechanism | Needs applicability confirmation. | Confirm with legal/compliance whether CCPA/CPRA opt-out link or mechanism is applicable. | Pre-launch | Medium | Pending legal confirmation |
| Security Testing | Not performed as part of repo audit. | Run basic launch checks: HTTPS, security headers, exposed files, form spam protection, third-party scripts. | Pre-launch | High | Not started |
| Responsiveness | Needs visual QA across key pages. | Test homepage, nav, partner pages, industry pages, and key capability pages across desktop/tablet/mobile. | Staging review | High | Needs QA |
| Core Web Vitals / Page Speed | Not measured as part of repo audit. | Run Lighthouse/PageSpeed on homepage and key landing pages after page set is complete. | Pre-launch | High | Not started |

## Analytics, GTM, Search Console, Sitemap and Robots

### Current Finding

- No GA4/gtag snippet was detected in the current static site files.
- No Google Tag Manager container snippet was detected in the current static site files.
- No Google Search Console verification tag/file was detected in the current static site files.
- `robots.txt` was not found in the repo root.
- `sitemap.xml` was not found in the repo root.

### Recommended Decision

- Do not blindly add old production analytics to the dev/staging domain.
- Confirm whether staging should be untracked, separately tracked, or filtered out.
- Confirm the final production domain before generating sitemap and robots rules.
- Add GA/GTM globally only after the correct IDs and tracking strategy are confirmed.
- Search Console verification should be handled during final launch setup, especially if domain-level DNS verification already exists.

## Page Readiness Summary

| Priority | Page URL | File | Title | Meta | H1 Count | Shared JS | HubSpot | Primary Gaps |
|---|---|---|---|---|---:|---|---|---|
| P2 - Other | `/Capabilities` | `Capabilities.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 16 image alt items |
| P2 - Other | `/Our_Focus` | `Our_Focus.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P2 - Other | `/Solutions` | `Solutions.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P2 - Company | `/about/who-we-are` | `about/who-we-are/index.html` | About Celsior — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P2 - Company | `/about-leadership` | `about-leadership/index.html` | About Celsior — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P2 - Company | `/about` | `about.html` | About Celsior — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P1 - Main site page | `/ai-adoption` | `ai-adoption.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/ai-and-data` | `ai-and-data.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P1 - Main site page | `/ai-first-digital-engineering` | `ai-first-digital-engineering.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/ai-innovation` | `ai-innovation.html` | AI & Innovation — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P1 - Main site page | `/ai-led-engineering` | `ai-led-engineering.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 16 image alt items |
| P1 - Main site page | `/ai-upskilling` | `ai-upskilling.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P1 - Industry | `/banking-financial-services` | `banking-financial-services/index.html` | Banking & Financial Services — Celsior | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 6 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P1 - Industry | `/banking-financial-services` | `banking-financial-services.html` | Banking & Financial Services — Celsior | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 6 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P1 - Main site page | `/capabilities/ai-and-data` | `capabilities/ai-and-data/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P1 - Main site page | `/capabilities/ai-led-engineering` | `capabilities/ai-led-engineering/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 16 image alt items |
| P1 - Main site page | `/capabilities/cloud-and-infrastructure-engineering` | `capabilities/cloud-and-infrastructure-engineering/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P1 - Main site page | `/capabilities/digital-operations-and-security` | `capabilities/digital-operations-and-security/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P1 - Main site page | `/capabilities` | `capabilities/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 16 image alt items |
| P1 - Main site page | `/capabilities/security-and-governance` | `capabilities/security-and-governance/index.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 12 image alt items |
| P2 - Other | `/celsior-ai-lab` | `celsior-ai-lab/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 18 image alt items |
| P2 - Other | `/celsior-ai-lab` | `celsior-ai-lab.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 18 image alt items |
| P2 - Other | `/cloud-infrastructure-engineering` | `cloud-infrastructure-engineering.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P2 - Other | `/cost-efficiency` | `cost-efficiency.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P2 - Other | `/design-lab` | `design-lab/index.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 12 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P2 - Other | `/design-lab` | `design-lab.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 12 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P2 - Other | `/digital-experience` | `digital-experience.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GTM not present / 15 image alt items |
| P2 - Other | `/digital-operations` | `digital-operations.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 10 image alt items |
| P2 - Other | `/frameworks-accelerators` | `frameworks-accelerators/index.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 6 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P2 - Other | `/frameworks-accelerators` | `frameworks-accelerators.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 6 image alt items / Content/SEO: Multiple H1s found: 2 / Content/SEO: Multiple H1s found: 2 |
| P2 - Other | `/gcc-nearshore` | `gcc-nearshore.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P2 - Other | `/hire-train-deploy` | `hire-train-deploy.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P2 - Other | `/how-we-deliver` | `how-we-deliver.html` | How we Deliver — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P2 - Other | `/how-we-do-it` | `how-we-do-it.html` | How We Do It › AI/ML Engineering — Celsior | Present | 1 | yes | no | GA not present / GTM not present |
| P0 - Homepage | `/` | `index.html` | Celsior — Modernize. Operate. Innovate. | Present | 5 | yes | no | H1 count: 5 / GA not present / GTM not present / Content/SEO: Multiple H1s found: 5 |
| P2 - Other | `/industries` | `industries.html` | Industries — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P2 - Other | `/managed-programs` | `managed-programs.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/our-focus/ai-adoption` | `our-focus/ai-adoption/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/our-focus/ai-first-digital-engineering` | `our-focus/ai-first-digital-engineering/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/our-focus/cost-and-efficiency` | `our-focus/cost-and-efficiency/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/our-focus/digital-experience` | `our-focus/digital-experience/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GTM not present / 15 image alt items |
| P1 - Main site page | `/our-focus` | `our-focus/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P1 - Main site page | `/our-focus/risk-and-compliance` | `our-focus/risk-and-compliance/index.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P2 - Other | `/partner-ecosystem` | `partner-ecosystem.html` | Partner Ecosystem — Celsior | Present | 1 | yes | no | GA not present / GTM not present |
| P1 - Partner | `/partners/guidewire` | `partners/guidewire/index.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 3 image alt items / Content/SEO: Multiple H1s found: 2 |
| P1 - Partner | `/partners` | `partners/index.html` | Partner Ecosystem — Celsior | Present | 1 | yes | no | GA not present / GTM not present |
| P1 - Partner | `/partners/jack-henry` | `partners/jack-henry/index.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 3 image alt items / Content/SEO: Multiple H1s found: 2 |
| P1 - Partner | `/partners/servicenow` | `partners/servicenow/index.html` | Celsior / AI-First Digital Engineering | Present | 2 | yes | no | H1 count: 2 / GA not present / GTM not present / 3 image alt items / Content/SEO: Multiple H1s found: 2 |
| P2 - Other | `/risk-compliance` | `risk-compliance.html` | Celsior / AI-First Digital Engineering | Present | 1 | yes | no | GA not present / GTM not present / 15 image alt items |
| P2 - Other | `/security-governance` | `security-governance.html` | Celsior / Capabilities — AI-Led Engineering | Present | 1 | yes | no | GA not present / GTM not present / 12 image alt items |
| P1 - Main site page | `/solutions/ai-upskilling` | `solutions/ai-upskilling/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/solutions/gcc-and-nearshore` | `solutions/gcc-and-nearshore/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/solutions` | `solutions/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/solutions/managed-programs` | `solutions/managed-programs/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/solutions/teams-as-a-service` | `solutions/teams-as-a-service/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P1 - Main site page | `/solutions/technology-consulting` | `solutions/technology-consulting/index.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P2 - Other | `/success-stories` | `success-stories/index.html` | About Celsior — Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |
| P2 - Other | `/teams-as-a-service` | `teams-as-a-service.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 16 image alt items / SEO: Missing meta description |
| P2 - Other | `/technology-consulting` | `technology-consulting.html` | Celsior / Solutions — Managed Programs | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / 10 image alt items / SEO: Missing meta description |
| P2 - Other | `/what-we-solve` | `what-we-solve.html` | AI Readiness — What We Solve / Celsior | Missing | 1 | yes | no | Missing meta description / GA not present / GTM not present / SEO: Missing meta description |

## CTA and Button Destination Map

This section lists probable CTAs/buttons and their current destinations. It should be reviewed by page owners to confirm final destination, form behavior, and whether any CTA should be changed.

### /

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to an Expert | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore the AI-First Digital Engineering Platform | `#capabilities` | Same-page anchor / contact section | Needs Review |  |
| Learn More | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Get Started | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Business Leaders | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Technology Leaders | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Owners | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Operations, Vendors, Program Managers | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /Capabilities

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Transformation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /Our_Focus

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Modernization → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Cloud Engineering → | `#` | Placeholder / needs final URL | Needs Review |  |
| Learn About Teams-as-a-Service → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule Consultation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /Solutions

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /about

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /about-leadership

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /about/who-we-are

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /ai-adoption

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore CAFE Framework → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore HALO Framework → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore PACE Platform → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Readiness | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /ai-and-data

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request a Data Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Transform Your Data Estate → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /ai-first-digital-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Modernization → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Cloud Engineering → | `#` | Placeholder / needs final URL | Needs Review |  |
| Learn About Teams-as-a-Service → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule Consultation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /ai-innovation

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /ai-led-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Transformation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /ai-upskilling

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Upskilling Programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Productivity Loss | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Role Readiness | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Adoption Risk | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Governance Gaps | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /banking-financial-services

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Schedule a Discovery Call | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Download Capabilities Deck | `#` | Placeholder / needs final URL | Needs Review |  |
| Schedule a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore Our Focus Areas | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Front-End Modernization at Scale | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Enterprise Platform Rollout | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Digital Market Expansion | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Transformation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities/ai-and-data

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request a Data Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Transform Your Data Estate → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities/ai-led-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Transformation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities/cloud-and-infrastructure-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Our Framework | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Cloud Journey → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities/digital-operations-and-security

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request an Operations Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Frameworks | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Strengthen Your Operations → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /capabilities/security-and-governance

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request a Governance Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Frameworks | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Build Governance That Scales → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /celsior-ai-lab

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Modernization → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Cloud Engineering → | `#` | Placeholder / needs final URL | Needs Review |  |
| Learn About Teams-as-a-Service → | `#` | Placeholder / needs final URL | Needs Review |  |
| Read More | `#` | Placeholder / needs final URL | Needs Review |  |
| Start with an AI Readiness Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore The Lab | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Pilot Review → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /cloud-infrastructure-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Our Framework | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Start Your Cloud Journey → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /cost-efficiency

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Cost Structure → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our Cost & Efficiency Practice | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Core Structure | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Meeting | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /design-lab

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore The Lab | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Pilot Review → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /digital-experience

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our R&C Practice → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment → | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Conversation | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /digital-operations

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request an Operations Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Frameworks | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Strengthen Your Operations → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /frameworks-accelerators

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to Our Healthcare Team | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Download Our Capabilities Overview | `#` | Placeholder / needs final URL | Needs Review |  |
| Request a Briefing | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore the Portfolio | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Automation and Intelligence Tools | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Vertical AI Solutions | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| AI Enterprise Platforms | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /gcc-nearshore

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our delivery models | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talk to our nearshore team | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talent Access | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Efficiency | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Time Zone Alignment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Delivery Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /hire-train-deploy

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /how-we-deliver

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /how-we-do-it

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore AI Readiness | `index.html` | Other / needs review | Needs Review |  |
| Explore AI Enablement | `index.html` | Other / needs review | Needs Review |  |
| Explore Automation | `index.html` | Other / needs review | Needs Review |  |
| Explore Delivery Model | `index.html` | Other / needs review | Needs Review |  |
| Explore Engineering Pods | `index.html` | Other / needs review | Needs Review |  |
| See Industry Practices | `index.html` | Other / needs review | Needs Review |  |
| Request an Architecture Review | `index.html#contact` | Other / needs review | Needs Review |  |
| Download Capability Brief | `#` | Placeholder / needs final URL | Needs Review |  |

### /industries

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /managed-programs

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Modernization → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Cloud Engineering → | `#` | Placeholder / needs final URL | Needs Review |  |
| Learn About Teams-as-a-Service → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule Consultation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus/ai-adoption

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore CAFE Framework → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore HALO Framework → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore PACE Platform → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Readiness | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus/ai-first-digital-engineering

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Modernization → | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Cloud Engineering → | `#` | Placeholder / needs final URL | Needs Review |  |
| Learn About Teams-as-a-Service → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule Consultation → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus/cost-and-efficiency

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Cost Structure → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our Cost & Efficiency Practice | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Core Structure | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Meeting | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus/digital-experience

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our R&C Practice → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment → | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Conversation | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /our-focus/risk-and-compliance

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our R&C Practice → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment → | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Conversation | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /partner-ecosystem

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Guidewire Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Jack Henry Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore ServiceNow Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Contact Us About Dynatrace | `#` | Placeholder / needs final URL | Needs Review |  |
| Talk to a Practice Lead | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Individual Partner Pages | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Our Partner Practices | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talk to a Practice Lead | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /partners

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Guidewire Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Jack Henry Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore ServiceNow Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Contact Us About Dynatrace | `#` | Placeholder / needs final URL | Needs Review |  |
| Talk to a Practice Lead | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Individual Partner Pages | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Our Partner Practices | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talk to a Practice Lead | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /partners/guidewire

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Download Case Study | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Guidewire Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Jack Henry Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore ServiceNow Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Contact Us About Dynatrace | `#` | Placeholder / needs final URL | Needs Review |  |
| Book Your Free Consultation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| BOOK A FREE CONSULTATION | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /partners/jack-henry

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Download Case Study | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Guidewire Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Jack Henry Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore ServiceNow Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Contact Us About Dynatrace | `#` | Placeholder / needs final URL | Needs Review |  |
| Book Your Free Consultation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| BOOK A FREE CONSULTATION | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /partners/servicenow

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Download Case Study | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Guidewire Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore Jack Henry Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Explore ServiceNow Practice | `#` | Placeholder / needs final URL | Needs Review |  |
| Contact Us About Dynatrace | `#` | Placeholder / needs final URL | Needs Review |  |
| Book Your Platform Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| BOOK A FREE CONSULTATION | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /risk-compliance

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Explore Further → | `#` | Placeholder / needs final URL | Needs Review |  |
| Get Started | `#consultation` | Same-page anchor / contact section | Needs Review |  |
| Speak with Our R&C Practice → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment → | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Assess Your Control Environment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Conversation | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /security-governance

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Request a Governance Assessment | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Frameworks | `#assessment` | Same-page anchor / contact section | Needs Review |  |
| Build Governance That Scales → | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| View case study | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions/ai-upskilling

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore Our Upskilling Programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Schedule a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Productivity Loss | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Role Readiness | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Adoption Risk | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Governance Gaps | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions/gcc-and-nearshore

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our delivery models | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talk to our nearshore team | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talent Access | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Efficiency | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Time Zone Alignment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Delivery Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions/managed-programs

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions/teams-as-a-service

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /solutions/technology-consulting

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start a conversation about your architecture → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| See our approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore our work | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Architecture Debt | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Integration Complexity | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Regulatory Exposure | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talent Retention | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /success-stories

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Talk to us | `index.html#contact` | Other / needs review | Needs Review |  |
| Back to Home | `index.html` | Other / needs review | Needs Review |  |
| Get in touch | `index.html#contact` | Other / needs review | Needs Review |  |

### /teams-as-a-service

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start the conversation | `#contact` | Same-page anchor / contact section | Needs Review |  |
| Explore our managed programs | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Book a Discovery Call | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Platform Stability | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Security & Compliance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Cost Optimization | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Upgrade Governance | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /technology-consulting

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start a conversation about your architecture → | `#contact` | Same-page anchor / contact section | Needs Review |  |
| See our approach | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Explore our work | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Architecture Debt | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Integration Complexity | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Regulatory Exposure | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Talent Retention | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

### /what-we-solve

| Button / CTA Label | Current Destination | Destination Type | Status | Notes |
|---|---|---|---|---|
| Start AI Readiness Assessment | `#sec-assess` | Same-page anchor / contact section | Needs Review |  |
| See Why AI Stalls | `#sec-challenge` | Same-page anchor / contact section | Needs Review |  |
| Explore | `#` | Placeholder / needs final URL | Needs Review |  |
| Request AI Readiness Assessment | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |
| Download the AI Readiness Framework | `(button/no href)` | Button / JS action - needs manual check | Needs Review |  |

## Forms and CTA Forms

### Current Finding

- The repo audit did not find native `<form>` tags in the scanned HTML files.
- Form behavior appears to be handled through HubSpot scripts/modals and global CTA logic in `shared.js`.

### Items to Confirm

- Final HubSpot form IDs
- Which CTAs open which form/modal
- Form notification recipients
- CRM/list/workflow routing
- Thank-you behavior
- Spam protection / reCAPTCHA requirement

## Internal Linking and Redirects

### Current Principle

- Use clean URLs where possible, e.g. `/partners/guidewire`, `/capabilities/ai-and-data`, `/solutions/managed-programs`.
- Older flat `.html` files still exist in parts of the repo and should not be deleted until link/redirect impact is confirmed.
- Desktop top-level navbar labels are dropdown triggers only and should not navigate to standalone parent pages.

### Known New Partner Pages

- `/partners/guidewire`
- `/partners/jack-henry`
- `/partners/servicenow`

These have been added and confirmed working on dev.

## Legal, Compliance and Policy Items

These need confirmation before production launch:

- Privacy Policy
- Cookie Policy
- Cookie consent banner, depending on analytics/cookie usage
- Terms of Use / Terms of Service
- Accessibility Statement
- CCPA/CPRA opt-out mechanism, if applicable

## QA and Launch Testing

Required before final launch:

- Desktop, tablet, and mobile responsiveness checks
- Navbar and mobile drawer checks
- CTA/button click testing
- HubSpot form testing
- Page load speed and Core Web Vitals testing
- Security/basic exposure checks
- Sitemap/robots validation
- Metadata and Open Graph testing
- Search Console verification

## Open Items

| Category | Open Item | Priority | Status | Notes |
|---|---|---|---|---|
| Analytics | Confirm GA4 Measurement ID and whether to use existing old-site property or separate dev/prod setup. | High | Open |  |
| Search Console | Confirm if existing property covers dev/prod domain and what verification method is used. | High | Open |  |
| Forms | No native forms found in audit; confirm HubSpot forms/modal behavior and final form IDs. | High | Open |  |
| SEO | Several pages missing meta descriptions or using generic titles; needs page-by-page cleanup. | High | Open |  |
| Accessibility | Raw audit found many missing alt text instances; needs prioritization for meaningful images only. | High | Open |  |
| Legal | Privacy, Terms, Cookie Policy, Accessibility Statement and CCPA mechanism need confirmation. | High | Open |  |
| Sitemap/robots | Need sitemap.xml and robots.txt strategy for dev vs production. | High | Open |  |
| Pending pages | Some 404s may be expected until developer delivers remaining pages. | High | Open |  |

## Supporting Tracker Files

The following files support this handoff:

- `audits/jackie-handoff-trackers/page-readiness-summary-clean.csv`
- `audits/jackie-handoff-trackers/cta-button-map-clean.csv`
- `audits/jackie-handoff-trackers/legal-backend-readiness-summary.csv`
- `audits/jackie-handoff-trackers/backend-launch-checklist.csv`
- `audits/jackie-handoff-trackers/open-items.csv`
- `audits/backend-readiness/pages.csv`
- `audits/backend-readiness/links.csv`
- `audits/backend-readiness/buttons-and-ctas.csv`
- `audits/backend-readiness/images.csv`
- `audits/backend-readiness/forms.csv`
- `audits/backend-readiness/issues.csv`

## Recommended Final Handoff Format

Recommended final deliverables for Jackie:

1. A narrative Word/PDF document based on this file.
2. A spreadsheet tracker with tabs for page readiness, CTA map, backend/legal checklist, and open items.
3. A final launch checklist after the remaining pages, analytics IDs, legal pages, and production-domain decisions are confirmed.

