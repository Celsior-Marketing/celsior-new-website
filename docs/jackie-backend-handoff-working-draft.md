# Celsior Website Backend and Navigation Handoff - Working Draft

## Purpose

This working document gathers the current state of the static Celsior website for backend readiness, navigation mapping, SEO/meta checks, CTA routing, forms, analytics, legal pages, and launch-readiness items.

This is a working audit document, not the final sign-off document.

## Current Repo / Deployment

- Repo: `celsior-new-website`
- Deployment: GitHub `main` to Vercel
- Dev URL: `https://dev.celsiortech.us/`
- Current site type: Static HTML with shared global navbar/footer/modal behavior in `shared.js`

## Audit Snapshot

- HTML pages scanned: 60
- Links found: 656
- Buttons/CTAs found by audit: 712
- Native forms found: 0
- Script references found: 220
- Potential raw issues found: 582

Raw issue counts by category:

- Accessibility: 551
- SEO: 21
- Content/SEO: 10

## Backend Scope Checklist

- [ ] All contact forms
- [ ] Favicon
- [ ] Metadata, meta tags, Open Graph tags
- [ ] Internal linking of pages and relevant redirects
- [ ] CTA forms
- [ ] reCAPTCHA
- [ ] Sitemap
- [ ] Privacy Policy
- [ ] Google Analytics
- [ ] Google Tag Manager
- [ ] Robots.txt
- [ ] Google Search Console
- [ ] Security testing
- [ ] Responsiveness
- [ ] Page load speed and Core Web Vitals
- [ ] Cookie consent banner and cookie policy
- [ ] Terms of Use / Terms of Service page
- [ ] Accessibility statement
- [ ] CCPA opt-out mechanism if applicable

## Page Inventory

| URL | File | Title | Meta Description | H1 Count | H1 Text | Shared JS | GA | GTM | HubSpot | reCAPTCHA |
|---|---|---|---|---:|---|---|---|---|---|---|
| `/Capabilities` | `Capabilities.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Legacy systems slow you down. AI-led engineering gets you ahead. | yes | no | no | no | no |
| `/Our_Focus` | `Our_Focus.html` | Celsior | AI-First Digital Engineering | Present | 1 | AI-First
         digital
        engineering that evolves at the speed of your business. | yes | no | no | no | no |
| `/Solutions` | `Solutions.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/about/who-we-are` | `about/who-we-are/index.html` | About Celsior — Celsior | MISSING | 1 | Engineering Partner for Regulated Industries. | yes | no | no | no | no |
| `/about-leadership` | `about-leadership/index.html` | About Celsior — Celsior | MISSING | 1 | Engineering Partner for Regulated Industries. | yes | no | no | no | no |
| `/about` | `about.html` | About Celsior — Celsior | MISSING | 1 | Engineering Partner for Regulated Industries. | yes | no | no | no | no |
| `/ai-adoption` | `ai-adoption.html` | Celsior | AI-First Digital Engineering | Present | 1 | Deploy AI that regulators can audit and businesses can  trust | yes | no | no | no | no |
| `/ai-and-data` | `ai-and-data.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Make decisions in hours, not weeks. | yes | no | no | no | no |
| `/ai-first-digital-engineering` | `ai-first-digital-engineering.html` | Celsior | AI-First Digital Engineering | Present | 1 | AI-First
         digital
        engineering that evolves at the speed of your business. | yes | no | no | no | no |
| `/ai-innovation` | `ai-innovation.html` | AI & Innovation — Celsior | MISSING | 1 | Enterprise AI That Runs in Production, Not Just Pilots. | yes | no | no | no | no |
| `/ai-led-engineering` | `ai-led-engineering.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Legacy systems slow you down. AI-led engineering gets you ahead. | yes | no | no | no | no |
| `/ai-upskilling` | `ai-upskilling.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | The return on your AI investment depends entirely on whether your workforce can act on it. Celsior ensures they can. | yes | no | no | no | no |
| `/banking-financial-services` | `banking-financial-services/index.html` | Banking & Financial Services — Celsior | Present | 2 | Banking & Financial Services / 20+ Institutions / Decades of data. Dozens of systems. 
Zero unified picture. We fix that. | yes | no | no | no | no |
| `/banking-financial-services` | `banking-financial-services.html` | Banking & Financial Services — Celsior | Present | 2 | Banking & Financial Services / 20+ Institutions / Decades of data. Dozens of systems. 
Zero unified picture. We fix that. | yes | no | no | no | no |
| `/capabilities/ai-and-data` | `capabilities/ai-and-data/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Make decisions in hours, not weeks. | yes | no | no | no | no |
| `/capabilities/ai-led-engineering` | `capabilities/ai-led-engineering/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Legacy systems slow you down. AI-led engineering gets you ahead. | yes | no | no | no | no |
| `/capabilities/cloud-and-infrastructure-engineering` | `capabilities/cloud-and-infrastructure-engineering/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Cut cloud costs by 35% while deploying twice as fast. | yes | no | no | no | no |
| `/capabilities/digital-operations-and-security` | `capabilities/digital-operations-and-security/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Resolve incidents in minutes, not hours. Prevent  breaches before they happen. | yes | no | no | no | no |
| `/capabilities` | `capabilities/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Legacy systems slow you down. AI-led engineering gets you ahead. | yes | no | no | no | no |
| `/capabilities/security-and-governance` | `capabilities/security-and-governance/index.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Pass audits without slowing down delivery.  Deploy AI without regulatory risk. | yes | no | no | no | no |
| `/celsior-ai-lab` | `celsior-ai-lab/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | Stop funding AI programs that stop at the 
 pilot stage. | yes | no | no | no | no |
| `/celsior-ai-lab` | `celsior-ai-lab.html` | Celsior | AI-First Digital Engineering | Present | 1 | Stop funding AI programs that stop at the 
 pilot stage. | yes | no | no | no | no |
| `/cloud-infrastructure-engineering` | `cloud-infrastructure-engineering.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Cut cloud costs by 35% while deploying twice as fast. | yes | no | no | no | no |
| `/cost-efficiency` | `cost-efficiency.html` | Celsior | AI-First Digital Engineering | Present | 1 | Engineering efficiency that  pays   for itself. | yes | no | no | no | no |
| `/design-lab` | `design-lab/index.html` | Celsior | AI-First Digital Engineering | Present | 2 | Design Lab · CX Journey Design / Stop building products your customers 

 didn't ask for. | yes | no | no | no | no |
| `/design-lab` | `design-lab.html` | Celsior | AI-First Digital Engineering | Present | 2 | Design Lab · CX Journey Design / Stop building products your customers 

 didn't ask for. | yes | no | no | no | no |
| `/digital-experience` | `digital-experience.html` | Celsior | AI-First Digital Engineering | Present | 1 | Experience the difference. Engineered for your customer. | yes | yes | no | no | no |
| `/digital-operations` | `digital-operations.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Resolve incidents in minutes, not hours. Prevent  breaches before they happen. | yes | no | no | no | no |
| `/frameworks-accelerators` | `frameworks-accelerators/index.html` | Celsior | AI-First Digital Engineering | Present | 2 | Frameworks and Accelerators / SAI pilots are easy. Getting them to production  without rebuilding everything is the hard part. | yes | no | no | no | no |
| `/frameworks-accelerators` | `frameworks-accelerators.html` | Celsior | AI-First Digital Engineering | Present | 2 | Frameworks and Accelerators / SAI pilots are easy. Getting them to production  without rebuilding everything is the hard part. | yes | no | no | no | no |
| `/gcc-nearshore` | `gcc-nearshore.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | The engineering depth your programs need. On the time zone your teams can work with. | yes | no | no | no | no |
| `/hire-train-deploy` | `hire-train-deploy.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/how-we-deliver` | `how-we-deliver.html` | How we Deliver — Celsior | MISSING | 1 | Flexible Delivery Models Built for Regulated Enterprises. | yes | no | no | no | no |
| `/how-we-do-it` | `how-we-do-it.html` | How We Do It › AI/ML Engineering — Celsior | Present | 1 | AI/ML Engineering 
         Built for Regulated 
         Industries. | yes | no | no | no | no |
| `/` | `index.html` | Celsior — Modernize. Operate. Innovate. | Present | 5 | Engineer Faster. Ship Smarter. Scale  Without
            Limits / From systems that  hold your business back,   to  AI   that moves it forward. / Banking / Insurance / Healthcare | yes | no | no | no | no |
| `/industries` | `industries.html` | Industries — Celsior | MISSING | 1 | Built for the Three Most Regulated Sectors in Enterprise Technology. | yes | no | no | no | no |
| `/managed-programs` | `managed-programs.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/our-focus/ai-adoption` | `our-focus/ai-adoption/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | Deploy AI that regulators can audit and businesses can  trust | yes | no | no | no | no |
| `/our-focus/ai-first-digital-engineering` | `our-focus/ai-first-digital-engineering/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | AI-First
         digital
        engineering that evolves at the speed of your business. | yes | no | no | no | no |
| `/our-focus/cost-and-efficiency` | `our-focus/cost-and-efficiency/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | Engineering efficiency that  pays   for itself. | yes | no | no | no | no |
| `/our-focus/digital-experience` | `our-focus/digital-experience/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | Experience the difference. Engineered for your customer. | yes | yes | no | no | no |
| `/our-focus` | `our-focus/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | AI-First
         digital
        engineering that evolves at the speed of your business. | yes | no | no | no | no |
| `/our-focus/risk-and-compliance` | `our-focus/risk-and-compliance/index.html` | Celsior | AI-First Digital Engineering | Present | 1 | Regulated by design. Resilient by architecture. | yes | no | no | no | no |
| `/partner-ecosystem` | `partner-ecosystem.html` | Partner Ecosystem — Celsior | Present | 1 | Your Platform Investment Performs Better  With a Certified Practice Behind It. | yes | no | no | no | no |
| `/partners/guidewire` | `partners/guidewire/index.html` | Celsior | AI-First Digital Engineering | Present | 2 | GUIDEWIRE TECHNICAL PARTNER · P&C INSURANCE INTELLIGENCE / Take your Guidewire platform from implementation to competitive advantage. | yes | no | no | no | no |
| `/partners` | `partners/index.html` | Partner Ecosystem — Celsior | Present | 1 | Your Platform Investment Performs Better  With a Certified Practice Behind It. | yes | no | no | no | no |
| `/partners/jack-henry` | `partners/jack-henry/index.html` | Celsior | AI-First Digital Engineering | Present | 2 | JACK HENRY FINTECH INTEGRATION NETWORK MEMBER · BANKING INTELLIGENCE / Community and regional banks that outperform their peers run tighter operations on Jack Henry. | yes | no | no | no | no |
| `/partners/servicenow` | `partners/servicenow/index.html` | Celsior | AI-First Digital Engineering | Present | 2 | ServiceNow Implementation Partner • BFSI Intelligence / Structured Service Operations for  Regulated Industries. On ServiceNow. | yes | no | no | no | no |
| `/risk-compliance` | `risk-compliance.html` | Celsior | AI-First Digital Engineering | Present | 1 | Regulated by design. Resilient by architecture. | yes | no | no | no | no |
| `/security-governance` | `security-governance.html` | Celsior | Capabilities — AI-Led Engineering | Present | 1 | Pass audits without slowing down delivery.  Deploy AI without regulatory risk. | yes | no | no | no | no |
| `/solutions/ai-upskilling` | `solutions/ai-upskilling/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | The return on your AI investment depends entirely on whether your workforce can act on it. Celsior ensures they can. | yes | no | no | no | no |
| `/solutions/gcc-and-nearshore` | `solutions/gcc-and-nearshore/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | The engineering depth your programs need. On the time zone your teams can work with. | yes | no | no | no | no |
| `/solutions` | `solutions/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/solutions/managed-programs` | `solutions/managed-programs/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/solutions/teams-as-a-service` | `solutions/teams-as-a-service/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/solutions/technology-consulting` | `solutions/technology-consulting/index.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Technology architecture thatconverts risk into revenue. | yes | no | no | no | no |
| `/success-stories` | `success-stories/index.html` | About Celsior — Celsior | MISSING | 1 | Engineering Partner for Regulated Industries. | yes | no | no | no | no |
| `/teams-as-a-service` | `teams-as-a-service.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Your platforms should deliver what they promised on day one. We make sure they do. | yes | no | no | no | no |
| `/technology-consulting` | `technology-consulting.html` | Celsior | Solutions — Managed Programs | MISSING | 1 | Technology architecture thatconverts risk into revenue. | yes | no | no | no | no |
| `/what-we-solve` | `what-we-solve.html` | AI Readiness — What We Solve | Celsior | MISSING | 1 | AI Ambition. 
         Zero Readiness 
         Gap. | yes | no | no | no | no |

## Forms Status

No native `<form>` tags were found in the scanned HTML files. Forms may be handled through HubSpot scripts/modals in `shared.js` or embedded externally.

## CTA / Button Destination Map - Needs Human Review

The audit identifies probable CTAs/buttons automatically. This section needs cleanup into a final button-by-button map.

| Page | Button / Link Label | Destination | Class |
|---|---|---|---|
| `/Capabilities` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/Capabilities` | Start Your Transformation → | `(button/no href)` | `btn-ghost` |
| `/Capabilities` | Book a Discovery Call | `(button/no href)` | `btn-white` |
| `/Capabilities` |  | `(button/no href)` | `ch-arr` |
| `/Capabilities` |  | `(button/no href)` | `ch-arr` |
| `/Capabilities` | How do you ensure continuity when modernizing critical systems? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | What's different about AI-led engineering compared to traditional development? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | Can you work with our existing technology stack and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | How quickly can engineering teams start seeing results? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | Do you provide ongoing support after initial development or modernization? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | How do you handle data security and regulatory compliance? | `(button/no href)` | `faq__trigger` |
| `/Capabilities` | View case study | `(button/no href)` | `c-cta` |
| `/Our_Focus` | Explore Modernization → | `#` | `solution-link` |
| `/Our_Focus` | Explore Cloud Engineering → | `#` | `solution-link` |
| `/Our_Focus` | Learn About Teams-as-a-Service → | `#` | `solution-link` |
| `/Our_Focus` | Get Started | `#consultation` | `em-cta` |
| `/Our_Focus` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/Our_Focus` | Explore Our Approach | `(button/no href)` | `btn-ghost` |
| `/Our_Focus` | Schedule Consultation → | `(button/no href)` | `btn-white` |
| `/Our_Focus` | How is AI-first engineering different from traditional modernization consulting? | `(button/no href)` | `faq__trigger` |
| `/Our_Focus` | What happens to our institutional knowledge during modernization? | `(button/no href)` | `faq__trigger` |
| `/Our_Focus` | Can you modernize systems while they're still running production workloads? | `(button/no href)` | `faq__trigger` |
| `/Our_Focus` | How do you ensure cloud transformation doesn't just move our cost problem to a
              different platform? | `(button/no href)` | `faq__trigger` |
| `/Our_Focus` | What level of access do you need to our existing systems? | `(button/no href)` | `faq__trigger` |
| `/Our_Focus` | How long until we see measurable results? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/Solutions` | Explore our managed programs | `(button/no href)` | `btn-ghost` |
| `/Solutions` | Book a Discovery Call | `(button/no href)` | `btn-white` |
| `/Solutions` | Platform
              Stability | `(button/no href)` | `gacc-btn` |
| `/Solutions` | Security
              & Compliance | `(button/no href)` | `gacc-btn` |
| `/Solutions` | Cost Optimization | `(button/no href)` | `gacc-btn` |
| `/Solutions` | Upgrade
              Governance | `(button/no href)` | `gacc-btn` |
| `/Solutions` | What's the difference between a Managed Program and a traditional support
              contract? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | How do you structure operational accountability — and what does an SLA actually
              cover? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | Do you manage the platform alongside our internal team, or do you replace that function
              entirely? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | How do you handle platform upgrades without disrupting our production
              environment? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | What happens if our platform requirements change mid-program? | `(button/no href)` | `faq__trigger` |
| `/Solutions` | How does a Managed Program begin — and how long before we see operational
              stability? | `(button/no href)` | `faq__trigger` |
| `/about/who-we-are` | Talk to us | `index.html#contact` | `btn-p` |
| `/about/who-we-are` | Back to Home | `index.html` | `btn-g` |
| `/about/who-we-are` | Get in touch | `index.html#contact` | `btn-p` |
| `/about-leadership` | Talk to us | `index.html#contact` | `btn-p` |
| `/about-leadership` | Back to Home | `index.html` | `btn-g` |
| `/about-leadership` | Get in touch | `index.html#contact` | `btn-p` |
| `/about` | Talk to us | `index.html#contact` | `btn-p` |
| `/about` | Back to Home | `index.html` | `btn-g` |
| `/about` | Get in touch | `index.html#contact` | `btn-p` |
| `/ai-adoption` | Explore CAFE Framework → | `#` | `solution-link` |
| `/ai-adoption` | Explore HALO Framework → | `#` | `solution-link` |
| `/ai-adoption` | Explore PACE Platform → | `#` | `solution-link` |
| `/ai-adoption` | Get Started | `#consultation` | `em-cta` |
| `/ai-adoption` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/ai-adoption` | Assess Your Readiness | `(button/no href)` | `btn-ghost` |
| `/ai-adoption` | Explore Our Approach | `(button/no href)` | `btn-white` |
| `/ai-adoption` | How is enterprise AI adoption different from running pilots? | `(button/no href)` | `faq__trigger` |
| `/ai-adoption` | What does "responsible AI" actually mean in production? | `(button/no href)` | `faq__trigger` |
| `/ai-adoption` | We already have agents deployed. Why would we need PACE? | `(button/no href)` | `faq__trigger` |
| `/ai-adoption` | How does CAFE compress development from 12 months to 90 days? | `(button/no href)` | `faq__trigger` |
| `/ai-adoption` | What's required from our team during AI adoption? | `(button/no href)` | `faq__trigger` |
| `/ai-adoption` | How do you ensure AI systems meet regulatory requirements like EU AI Act or HIPAA? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | Request a Data Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/ai-and-data` | Transform Your Data Estate → | `(button/no href)` | `btn-ghost` |
| `/ai-and-data` |  | `(button/no href)` | `ch-arr` |
| `/ai-and-data` |  | `(button/no href)` | `ch-arr` |
| `/ai-and-data` | How do you handle sensitive data in regulated industries like healthcare and banking? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | What's the difference between your data platform approach and traditional BI implementations? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | Can you work with our existing data investments and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | How quickly can we start seeing results from data and AI projects? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | What happens when data quality issues surface during implementation? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | Do you provide ongoing support for data platforms and AI models? | `(button/no href)` | `faq__trigger` |
| `/ai-and-data` | View case study | `(button/no href)` | `c-cta` |
| `/ai-first-digital-engineering` | Explore Modernization → | `#` | `solution-link` |
| `/ai-first-digital-engineering` | Explore Cloud Engineering → | `#` | `solution-link` |
| `/ai-first-digital-engineering` | Learn About Teams-as-a-Service → | `#` | `solution-link` |
| `/ai-first-digital-engineering` | Get Started | `#consultation` | `em-cta` |
| `/ai-first-digital-engineering` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/ai-first-digital-engineering` | Explore Our Approach | `(button/no href)` | `btn-ghost` |
| `/ai-first-digital-engineering` | Schedule Consultation → | `(button/no href)` | `btn-white` |
| `/ai-first-digital-engineering` | How is AI-first engineering different from traditional modernization consulting? | `(button/no href)` | `faq__trigger` |
| `/ai-first-digital-engineering` | What happens to our institutional knowledge during modernization? | `(button/no href)` | `faq__trigger` |
| `/ai-first-digital-engineering` | Can you modernize systems while they're still running production workloads? | `(button/no href)` | `faq__trigger` |
| `/ai-first-digital-engineering` | How do you ensure cloud transformation doesn't just move our cost problem to a
              different platform? | `(button/no href)` | `faq__trigger` |
| `/ai-first-digital-engineering` | What level of access do you need to our existing systems? | `(button/no href)` | `faq__trigger` |
| `/ai-first-digital-engineering` | How long until we see measurable results? | `(button/no href)` | `faq__trigger` |
| `/ai-innovation` | Talk to us | `index.html#contact` | `btn-p` |
| `/ai-innovation` | Back to Home | `index.html` | `btn-g` |
| `/ai-innovation` | Get in touch | `index.html#contact` | `btn-p` |
| `/ai-led-engineering` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/ai-led-engineering` | Start Your Transformation → | `(button/no href)` | `btn-ghost` |
| `/ai-led-engineering` | Book a Discovery Call | `(button/no href)` | `btn-white` |
| `/ai-led-engineering` |  | `(button/no href)` | `ch-arr` |
| `/ai-led-engineering` |  | `(button/no href)` | `ch-arr` |
| `/ai-led-engineering` | How do you ensure continuity when modernizing critical systems? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | What's different about AI-led engineering compared to traditional development? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | Can you work with our existing technology stack and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | How quickly can engineering teams start seeing results? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | Do you provide ongoing support after initial development or modernization? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | How do you handle data security and regulatory compliance? | `(button/no href)` | `faq__trigger` |
| `/ai-led-engineering` | View case study | `(button/no href)` | `c-cta` |
| `/ai-upskilling` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/ai-upskilling` | Explore Our Upskilling Programs | `(button/no href)` | `btn-ghost` |
| `/ai-upskilling` | Schedule a Discovery Call | `(button/no href)` | `btn-white` |
| `/ai-upskilling` | Productivity Loss | `(button/no href)` | `gacc-btn` |
| `/ai-upskilling` | Role Readiness | `(button/no href)` | `gacc-btn` |
| `/ai-upskilling` | Adoption Risk | `(button/no href)` | `gacc-btn` |
| `/ai-upskilling` | Governance Gaps | `(button/no href)` | `gacc-btn` |
| `/ai-upskilling` | How quickly can you deploy a program across a large enterprise? | `(button/no href)` | `faq__trigger` |
| `/ai-upskilling` | Do you train on our internal tools and proprietary systems? | `(button/no href)` | `faq__trigger` |
| `/ai-upskilling` | How do you handle employees who resist adopting new ways of working? | `(button/no href)` | `faq__trigger` |
| `/ai-upskilling` | What governance does the program include? | `(button/no href)` | `faq__trigger` |
| `/ai-upskilling` | How do you price a program of this scale? | `(button/no href)` | `faq__trigger` |
| `/ai-upskilling` | How does a Managed Program begin — and how long before we see operational
              stability? | `(button/no href)` | `faq__trigger` |
| `/banking-financial-services` | Schedule a Discovery Call | `#contact` | `cta-band-btn-primary cta-band-btn` |
| `/banking-financial-services` | Download Capabilities Deck | `#` | `cta-band-btn-outline` |
| `/banking-financial-services` | Schedule a Discovery Call | `(button/no href)` | `btn-ghost` |
| `/banking-financial-services` | Explore Our Focus Areas | `(button/no href)` | `btn-white` |
| `/banking-financial-services` |  | `(button/no href)` | `ks-nav-btn` |
| `/banking-financial-services` |  | `(button/no href)` | `ks-nav-btn` |
| `/banking-financial-services` |  | `(button/no href)` | `oa-arrow` |
| `/banking-financial-services` |  | `(button/no href)` | `oa-arrow` |
| `/banking-financial-services` | Front-End Modernization at Scale | `(button/no href)` | `ci-tab` |
| `/banking-financial-services` | Enterprise Platform Rollout | `(button/no href)` | `ci-tab` |
| `/banking-financial-services` | Digital Market Expansion | `(button/no href)` | `ci-tab` |
| `/banking-financial-services` | Schedule a Discovery Call | `#contact` | `cta-band-btn-primary cta-band-btn` |
| `/banking-financial-services` | Download Capabilities Deck | `#` | `cta-band-btn-outline` |
| `/banking-financial-services` | Schedule a Discovery Call | `(button/no href)` | `btn-ghost` |
| `/banking-financial-services` | Explore Our Focus Areas | `(button/no href)` | `btn-white` |
| `/banking-financial-services` |  | `(button/no href)` | `ks-nav-btn` |
| `/banking-financial-services` |  | `(button/no href)` | `ks-nav-btn` |
| `/banking-financial-services` |  | `(button/no href)` | `oa-arrow` |
| `/banking-financial-services` |  | `(button/no href)` | `oa-arrow` |
| `/banking-financial-services` | Front-End Modernization at Scale | `(button/no href)` | `ci-tab` |
| `/banking-financial-services` | Enterprise Platform Rollout | `(button/no href)` | `ci-tab` |
| `/banking-financial-services` | Digital Market Expansion | `(button/no href)` | `ci-tab` |
| `/capabilities/ai-and-data` | Request a Data Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities/ai-and-data` | Transform Your Data Estate → | `(button/no href)` | `btn-ghost` |
| `/capabilities/ai-and-data` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/ai-and-data` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/ai-and-data` | How do you handle sensitive data in regulated industries like healthcare and banking? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | What's the difference between your data platform approach and traditional BI implementations? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | Can you work with our existing data investments and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | How quickly can we start seeing results from data and AI projects? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | What happens when data quality issues surface during implementation? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | Do you provide ongoing support for data platforms and AI models? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-and-data` | View case study | `(button/no href)` | `c-cta` |
| `/capabilities/ai-led-engineering` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities/ai-led-engineering` | Start Your Transformation → | `(button/no href)` | `btn-ghost` |
| `/capabilities/ai-led-engineering` | Book a Discovery Call | `(button/no href)` | `btn-white` |
| `/capabilities/ai-led-engineering` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/ai-led-engineering` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/ai-led-engineering` | How do you ensure continuity when modernizing critical systems? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | What's different about AI-led engineering compared to traditional development? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | Can you work with our existing technology stack and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | How quickly can engineering teams start seeing results? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | Do you provide ongoing support after initial development or modernization? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | How do you handle data security and regulatory compliance? | `(button/no href)` | `faq__trigger` |
| `/capabilities/ai-led-engineering` | View case study | `(button/no href)` | `c-cta` |
| `/capabilities/cloud-and-infrastructure-engineering` | Explore Our Framework | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities/cloud-and-infrastructure-engineering` | Start Your Cloud Journey → | `(button/no href)` | `btn-ghost` |
| `/capabilities/cloud-and-infrastructure-engineering` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/cloud-and-infrastructure-engineering` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/cloud-and-infrastructure-engineering` | How do you handle cloud migrations for applications we can't afford to take offline? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | What makes your cloud approach different from working directly with AWS, Azure, or Google Cloud? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | Can you help optimize cloud costs for environments already running in production? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | How quickly can we see results from cloud migration initiatives? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | What happens when applications break in cloud environments? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | Do you provide ongoing infrastructure management after migration? | `(button/no href)` | `faq__trigger` |
| `/capabilities/cloud-and-infrastructure-engineering` | View case study | `(button/no href)` | `c-cta` |
| `/capabilities/digital-operations-and-security` | Request an Operations Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities/digital-operations-and-security` | Explore Our Frameworks | `#assessment` | `cta-btn cta-band-btn-white` |
| `/capabilities/digital-operations-and-security` | Strengthen Your Operations → | `(button/no href)` | `btn-ghost` |
| `/capabilities/digital-operations-and-security` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/digital-operations-and-security` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/digital-operations-and-security` | How do you automate operations without losing control or creating new risks? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | What makes your ServiceNow approach different from standard implementations? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | Can you help secure environments that are already in production? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | How quickly can we see results from automation initiatives? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | What happens when automated processes fail or need human oversight? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | Do you provide ongoing management for operations and security platforms? | `(button/no href)` | `faq__trigger` |
| `/capabilities/digital-operations-and-security` | View case study | `(button/no href)` | `c-cta` |
| `/capabilities` | Start the conversation | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities` | Start Your Transformation → | `(button/no href)` | `btn-ghost` |
| `/capabilities` | Book a Discovery Call | `(button/no href)` | `btn-white` |
| `/capabilities` |  | `(button/no href)` | `ch-arr` |
| `/capabilities` |  | `(button/no href)` | `ch-arr` |
| `/capabilities` | How do you ensure continuity when modernizing critical systems? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | What's different about AI-led engineering compared to traditional development? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | Can you work with our existing technology stack and vendor relationships? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | How quickly can engineering teams start seeing results? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | Do you provide ongoing support after initial development or modernization? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | How do you handle data security and regulatory compliance? | `(button/no href)` | `faq__trigger` |
| `/capabilities` | View case study | `(button/no href)` | `c-cta` |
| `/capabilities/security-and-governance` | Request a Governance Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/capabilities/security-and-governance` | Explore Our Frameworks | `#assessment` | `cta-btn cta-band-btn-white` |
| `/capabilities/security-and-governance` | Build Governance That Scales  → | `(button/no href)` | `btn-ghost` |
| `/capabilities/security-and-governance` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/security-and-governance` |  | `(button/no href)` | `ch-arr` |
| `/capabilities/security-and-governance` | How do you build governance into AI systems without slowing down deployment? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | What makes your explainable AI different from standard machine learning implementations? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | Can you add governance to AI systems already running in production? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | How quickly can we deploy AI with full regulatory compliance? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | What happens when AI models drift or regulations change? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | Do you provide ongoing governance management for AI and data systems? | `(button/no href)` | `faq__trigger` |
| `/capabilities/security-and-governance` | View case study | `(button/no href)` | `c-cta` |
| `/celsior-ai-lab` | Explore Modernization → | `#` | `solution-link` |
| `/celsior-ai-lab` | Explore Cloud Engineering → | `#` | `solution-link` |
| `/celsior-ai-lab` | Learn About Teams-as-a-Service → | `#` | `solution-link` |
| `/celsior-ai-lab` | Read More | `#` | `approach-btn` |
| `/celsior-ai-lab` | Start with an AI Readiness Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/celsior-ai-lab` | Explore The Lab | `(button/no href)` | `btn-ghost` |
| `/celsior-ai-lab` | Schedule a Pilot Review → | `(button/no href)` | `btn-white` |
| `/celsior-ai-lab` | What is the starting point for a Celsior AI Lab engagement? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | How does the AI Lab differ from a standard implementation partner? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | At what stage does a program transition to managed operations? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | How does the AI Lab address regulatory requirements in Banking and Insurance? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | Can the AI Lab operate within our existing technology stack? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | What does a typical pilot-to-production timeline look like? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | Explore Modernization → | `#` | `solution-link` |
| `/celsior-ai-lab` | Explore Cloud Engineering → | `#` | `solution-link` |
| `/celsior-ai-lab` | Learn About Teams-as-a-Service → | `#` | `solution-link` |
| `/celsior-ai-lab` | Read More | `#` | `approach-btn` |
| `/celsior-ai-lab` | Start with an AI Readiness Assessment | `#contact` | `cta-btn cta-band-btn` |
| `/celsior-ai-lab` | Explore The Lab | `(button/no href)` | `btn-ghost` |
| `/celsior-ai-lab` | Schedule a Pilot Review → | `(button/no href)` | `btn-white` |
| `/celsior-ai-lab` | What is the starting point for a Celsior AI Lab engagement? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | How does the AI Lab differ from a standard implementation partner? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | At what stage does a program transition to managed operations? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | How does the AI Lab address regulatory requirements in Banking and Insurance? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | Can the AI Lab operate within our existing technology stack? | `(button/no href)` | `faq__trigger` |
| `/celsior-ai-lab` | What does a typical pilot-to-production timeline look like? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | Explore Our Framework | `#contact` | `cta-btn cta-band-btn` |
| `/cloud-infrastructure-engineering` | Start Your Cloud Journey → | `(button/no href)` | `btn-ghost` |
| `/cloud-infrastructure-engineering` |  | `(button/no href)` | `ch-arr` |
| `/cloud-infrastructure-engineering` |  | `(button/no href)` | `ch-arr` |
| `/cloud-infrastructure-engineering` | How do you handle cloud migrations for applications we can't afford to take offline? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | What makes your cloud approach different from working directly with AWS, Azure, or Google Cloud? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | Can you help optimize cloud costs for environments already running in production? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | How quickly can we see results from cloud migration initiatives? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | What happens when applications break in cloud environments? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | Do you provide ongoing infrastructure management after migration? | `(button/no href)` | `faq__trigger` |
| `/cloud-infrastructure-engineering` | View case study | `(button/no href)` | `c-cta` |
| `/cost-efficiency` | Explore Further → | `#` | `solution-link` |
| `/cost-efficiency` | Explore Further → | `#` | `solution-link` |
| `/cost-efficiency` | Explore Further → | `#` | `solution-link` |
| `/cost-efficiency` | Get Started | `#consultation` | `em-cta` |
| `/cost-efficiency` | Assess Your Cost Structure → | `#contact` | `cta-btn cta-band-btn` |
| `/cost-efficiency` | Speak with Our Cost & Efficiency Practice | `#assessment` | `cta-btn cta-band-btn-white` |
| `/cost-efficiency` | Assess Your Core Structure | `(button/no href)` | `btn-ghost` |
| `/cost-efficiency` | Book a Meeting | `(button/no href)` | `btn-white` |
| `/cost-efficiency` | How is this different from a standard cost-reduction program? | `(button/no href)` | `faq__trigger` |
| ... | Additional CTA/button rows omitted in this working draft: 462 | ... | ... |

## Known Pending / Developer Pages

Refer to `docs/pending-pages.md` for URLs that may currently be pending developer delivery.

## Raw Audit Files

- `audits/backend-readiness/pages.csv`
- `audits/backend-readiness/links.csv`
- `audits/backend-readiness/buttons-and-ctas.csv`
- `audits/backend-readiness/images.csv`
- `audits/backend-readiness/forms.csv`
- `audits/backend-readiness/scripts.csv`
- `audits/backend-readiness/issues.csv`

