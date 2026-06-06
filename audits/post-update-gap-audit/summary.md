# Post Update Website Gap Audit

Generated after adding Healthcare, Insurance, SynthetiX pages and partner logo navigation update.

## Summary

- Footer still needs final update.
- Footer legal links are placeholder links.
- Footer social links are placeholder links.
- Some footer company links currently point to repeated/generic destinations.
- Multiple page CTAs still use href="#" placeholders.
- Some old .html links still exist in legacy/fallback pages.
- Healthcare and SynthetiX pages have multiple H1 tags and need semantic cleanup.

## Footer Placeholder Links

294:.fl-social-btn{width:40px;height:40px;border-radius:9px;border:1.5px solid var(--fl-border-md);background:#f5f6fa;display:flex;align-items:center;justify-content:center;text-decoration:none;color:var(--fl-ink-soft);transition:background .22s,border-color .22s,color .22s,transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s;}
295:.fl-social-btn:hover{background:#000;border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.22);}
296:.fl-social-btn svg{width:16px;height:16px;display:block;}
303:.fl-col-links{display:flex;flex-direction:column;gap:1px;}
304:.fl-col-link{display:inline-flex;align-items:center;gap:8px;padding:7px 9px;border-radius:7px;font-size:.8rem;font-weight:500;color:var(--fl-ink-soft);text-decoration:none;transition:color .17s,background .17s,padding-left .2s cubic-bezier(.16,1,.3,1);position:relative;}
305:.fl-col-link::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:2px;height:0;border-radius:2px;background:var(--fl-accent);transition:height .22s cubic-bezier(.16,1,.3,1);}
306:.fl-col-link:hover{color:var(--fl-accent);background:var(--fl-accent-lt);padding-left:15px;}
307:.fl-col-link:hover::before{height:16px;}
325:.fl-legal-link{font-size:.7rem;font-weight:500;color:var(--fl-muted);padding:4px 12px;border-right:1px solid var(--fl-ghost);transition:color .15s;}
326:.fl-legal-link:last-child{border-right:none;}
327:.fl-legal-link:first-child{padding-left:0;}
328:.fl-legal-link:hover{color:var(--fl-accent);}
982:        <a href="#" class="fl-social-btn" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
983:        <a href="#" class="fl-social-btn" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25h6.988l4.26 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg></a>
984:        <a href="#" class="fl-social-btn" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
985:        <a href="#" class="fl-social-btn" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
986:        <a href="#" class="fl-social-btn" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
992:    <div class="fl-col"><p class="fl-col-head">Solutions</p><nav class="fl-col-links"><a href="/our-focus" class="fl-col-link">Core Banking Modernization</a><a href="/our-focus" class="fl-col-link">Cloud Transformation</a><a href="/our-focus" class="fl-col-link">Technical Debt Reduction</a><a href="/our-focus" class="fl-col-link">Regulatory Readiness</a><a href="/our-focus" class="fl-col-link">Digital Experience</a><a href="/our-focus" class="fl-col-link">Enterprise AI Enablement</a></nav></div>
993:    <div class="fl-col"><p class="fl-col-head">Services</p><nav class="fl-col-links"><a href="/capabilities" class="fl-col-link">Application Engineering</a><a href="/capabilities" class="fl-col-link">Platform Engineering</a><a href="/capabilities" class="fl-col-link">Cloud &amp; DevOps</a><a href="/capabilities" class="fl-col-link">Data &amp; AI Engineering</a><a href="/capabilities" class="fl-col-link">Security &amp; Governance</a><a href="/capabilities" class="fl-col-link">ITSM &amp; Operations</a></nav></div>
994:    <div class="fl-col"><p class="fl-col-head">Delivery</p><nav class="fl-col-links"><a href="/solutions" class="fl-col-link">GCC Build &amp; Operate</a><a href="/solutions" class="fl-col-link">BOT Model</a><a href="/solutions" class="fl-col-link">Mexico &amp; LATAM Nearshore</a><a href="/solutions" class="fl-col-link">Engineering Pods</a><a href="/solutions" class="fl-col-link">Hire-Train-Deploy <span class="fl-badge">New</span></a></nav></div>
995:    <div class="fl-col"><p class="fl-col-head">AI &amp; Innovation</p><nav class="fl-col-links"><a href="/ai-innovation" class="fl-col-link">Celsior AI Lab</a><a href="/ai-innovation" class="fl-col-link">Agentic Workflows</a><a href="/ai-innovation" class="fl-col-link">AI Copilots</a><a href="/ai-innovation" class="fl-col-link">CAFE Framework</a><a href="/ai-innovation" class="fl-col-link">HALO Framework</a><a href="/ai-innovation" class="fl-col-link">GenAI Accelerators</a></nav></div>
996:    <div class="fl-col"><p class="fl-col-head">Company</p><nav class="fl-col-links"><a href="/about/who-we-are" class="fl-col-link">Who We Are</a><a href="/about/who-we-are" class="fl-col-link">Our Leadership</a><a href="/about/who-we-are" class="fl-col-link">AI-first Philosophy</a><a href="/about/who-we-are" class="fl-col-link">Success Stories</a><a href="/about/who-we-are" class="fl-col-link">Newsroom</a><a href="/about/who-we-are" class="fl-col-link">Careers</a><a href="/#contact" class="fl-col-link">Contact Us</a></nav></div>
1008:    <nav class="fl-legal" aria-label="Legal"><a href="#" class="fl-legal-link">Privacy Policy</a><a href="#" class="fl-legal-link">Cookie Policy</a><a href="#" class="fl-legal-link">Terms of Use</a><a href="#" class="fl-legal-link">Accessibility</a><a href="#" class="fl-legal-link">Sitemap</a></nav>

## Placeholder CTA Links

./risk-compliance.html:3532:            <a class="solution-link" href="#">Explore Further →</a>
./risk-compliance.html:3544:            <a class="solution-link" href="#">Explore Further →</a>
./risk-compliance.html:3556:            <a class="solution-link" href="#">Explore Further →</a>
./risk-compliance.html:3771:      <a href="#">
./risk-compliance.html:3786:      <a href="#">
./risk-compliance.html:3801:      <a href="#">
./risk-compliance.html:3834:      <a href="#"
./risk-compliance.html:3851:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./risk-compliance.html:3867:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./risk-compliance.html:3883:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./risk-compliance.html:3906:        <a href="#">beneath heading Speak with our R&C practice <span aria-hidden="true">→</span></a>
./ai-first-digital-engineering.html:3507:            <a class="solution-link" href="#">Explore Modernization →</a>
./ai-first-digital-engineering.html:3522:            <a class="solution-link" href="#">Explore Cloud Engineering →</a>
./ai-first-digital-engineering.html:3537:            <a class="solution-link" href="#">Learn About Teams-as-a-Service →</a>
./ai-first-digital-engineering.html:3760:      <a href="#">
./ai-first-digital-engineering.html:3775:      <a href="#">
./ai-first-digital-engineering.html:3790:      <a href="#">
./ai-first-digital-engineering.html:3805:      <a href="#">
./ai-first-digital-engineering.html:3837:      <a href="#"
./ai-first-digital-engineering.html:3855:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-first-digital-engineering.html:3872:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-first-digital-engineering.html:3889:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-first-digital-engineering.html:3955:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./index.html:765:            <p class="spec-desc">Solve risk, cost, and modernization challenges</p><a href="#" class="spec-link">→ Go to
./index.html:778:            <p class="spec-desc">Evaluate engineering and architecture capabilities</p><a href="#" class="spec-link">→
./index.html:791:            <p class="spec-desc">ServiceNow, Guidewire, Jack Henry expertise</p><a href="#" class="spec-link">→ Go to
./index.html:804:            <p class="spec-desc">Delivery models, GCC, managed services</p><a href="#" class="spec-link">→ Go to
./index.html:5222:        <a href="#" class="careers-row careers-row--featured">
./index.html:5250:        <a href="#" class="careers-row">
./index.html:5286:        <a href="#" class="careers-row">
./index.html:6234:            </div><a class="nc-arrow" href="#" aria-label="Read article"><svg class="nc-arrow-svg" viewBox="0 0 18 18"
./index.html:6250:            </div><a class="nc-arrow" href="#" aria-label="Read article"><svg class="nc-arrow-svg" viewBox="0 0 18 18"
./index.html:6266:            </div><a class="nc-arrow" href="#" aria-label="Read article"><svg class="nc-arrow-svg" viewBox="0 0 18 18"
./index.html:6601:      <a href="#" class="outcomes-all">All case studies <span aria-hidden="true">→</span></a>
./index.html:6617:            <a class="oc-read" href="#">Read <span aria-hidden="true">→</span></a>
./index.html:6635:            <a class="oc-read" href="#">Read <span aria-hidden="true">→</span></a>
./index.html:6653:            <a class="oc-read" href="#">Read <span aria-hidden="true">→</span></a>
./security-governance.html:3218:          <a class="acc-readmore" href="#">
./security-governance.html:3243:          <a class="acc-readmore" href="#">
./security-governance.html:3268:          <a class="acc-readmore" href="#">
./security-governance.html:3391:      <a href="#">
./security-governance.html:3406:      <a href="#">
./security-governance.html:3421:      <a href="#">
./security-governance.html:3455:      <a href="#"
./security-governance.html:3472:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./security-governance.html:3488:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./security-governance.html:3504:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./security-governance.html:3569:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/ai-and-data/index.html:3220:          <a class="acc-readmore" href="#">
./capabilities/ai-and-data/index.html:3247:          <a class="acc-readmore" href="#">
./capabilities/ai-and-data/index.html:3272:          <a class="acc-readmore" href="#">
./capabilities/ai-and-data/index.html:3395:      <a href="#">
./capabilities/ai-and-data/index.html:3410:      <a href="#">
./capabilities/ai-and-data/index.html:3425:      <a href="#">
./capabilities/ai-and-data/index.html:3459:      <a href="#"
./capabilities/ai-and-data/index.html:3476:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-and-data/index.html:3492:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-and-data/index.html:3508:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-and-data/index.html:3570:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/index.html:3219:          <a class="acc-readmore" href="#">
./capabilities/index.html:3244:          <a class="acc-readmore" href="#">
./capabilities/index.html:3269:          <a class="acc-readmore" href="#">
./capabilities/index.html:3392:      <a href="#">
./capabilities/index.html:3407:      <a href="#">
./capabilities/index.html:3422:      <a href="#">
./capabilities/index.html:3437:      <a href="#">
./capabilities/index.html:3470:      <a href="#"
./capabilities/index.html:3487:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/index.html:3503:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/index.html:3519:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/index.html:3585:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/security-and-governance/index.html:3219:          <a class="acc-readmore" href="#">
./capabilities/security-and-governance/index.html:3244:          <a class="acc-readmore" href="#">
./capabilities/security-and-governance/index.html:3269:          <a class="acc-readmore" href="#">
./capabilities/security-and-governance/index.html:3392:      <a href="#">
./capabilities/security-and-governance/index.html:3407:      <a href="#">
./capabilities/security-and-governance/index.html:3422:      <a href="#">
./capabilities/security-and-governance/index.html:3456:      <a href="#"
./capabilities/security-and-governance/index.html:3473:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/security-and-governance/index.html:3489:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/security-and-governance/index.html:3505:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/security-and-governance/index.html:3567:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/cloud-and-infrastructure-engineering/index.html:3230:          <a class="acc-readmore" href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3255:          <a class="acc-readmore" href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3280:          <a class="acc-readmore" href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3403:      <a href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3418:      <a href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3433:      <a href="#">
./capabilities/cloud-and-infrastructure-engineering/index.html:3511:      <a href="#"
./capabilities/cloud-and-infrastructure-engineering/index.html:3528:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/cloud-and-infrastructure-engineering/index.html:3544:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/cloud-and-infrastructure-engineering/index.html:3560:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/cloud-and-infrastructure-engineering/index.html:3587:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/ai-led-engineering/index.html:3219:          <a class="acc-readmore" href="#">
./capabilities/ai-led-engineering/index.html:3244:          <a class="acc-readmore" href="#">
./capabilities/ai-led-engineering/index.html:3269:          <a class="acc-readmore" href="#">
./capabilities/ai-led-engineering/index.html:3392:      <a href="#">
./capabilities/ai-led-engineering/index.html:3407:      <a href="#">
./capabilities/ai-led-engineering/index.html:3422:      <a href="#">
./capabilities/ai-led-engineering/index.html:3437:      <a href="#">
./capabilities/ai-led-engineering/index.html:3470:      <a href="#"
./capabilities/ai-led-engineering/index.html:3487:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-led-engineering/index.html:3503:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-led-engineering/index.html:3519:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/ai-led-engineering/index.html:3582:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./capabilities/digital-operations-and-security/index.html:3219:          <a class="acc-readmore" href="#">
./capabilities/digital-operations-and-security/index.html:3244:          <a class="acc-readmore" href="#">
./capabilities/digital-operations-and-security/index.html:3269:          <a class="acc-readmore" href="#">
./capabilities/digital-operations-and-security/index.html:3392:      <a href="#">
./capabilities/digital-operations-and-security/index.html:3407:      <a href="#">
./capabilities/digital-operations-and-security/index.html:3422:      <a href="#">
./capabilities/digital-operations-and-security/index.html:3456:      <a href="#"
./capabilities/digital-operations-and-security/index.html:3473:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/digital-operations-and-security/index.html:3489:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/digital-operations-and-security/index.html:3505:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./capabilities/digital-operations-and-security/index.html:3567:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./celsior-ai-lab/index.html:3636:            <a class="solution-link" href="#">Explore Modernization →</a>
./celsior-ai-lab/index.html:3648:            <a class="solution-link" href="#">Explore Cloud Engineering →</a>
./celsior-ai-lab/index.html:3660:            <a class="solution-link" href="#">Learn About Teams-as-a-Service →</a>
./celsior-ai-lab/index.html:3686:      <a href="#" class="approach-btn">Read More</a>
./celsior-ai-lab/index.html:3806:      <a href="#">
./celsior-ai-lab/index.html:3821:      <a href="#">
./celsior-ai-lab/index.html:3836:      <a href="#">
./celsior-ai-lab/index.html:3927:      <a href="#"
./celsior-ai-lab/index.html:3944:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./celsior-ai-lab/index.html:3960:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./celsior-ai-lab/index.html:3976:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./celsior-ai-lab/index.html:4000:        <a href="#">Speak to an AI Lab Architect <span aria-hidden="true">→</span></a>
./ai-and-data.html:3219:          <a class="acc-readmore" href="#">
./ai-and-data.html:3246:          <a class="acc-readmore" href="#">
./ai-and-data.html:3271:          <a class="acc-readmore" href="#">
./ai-and-data.html:3394:      <a href="#">
./ai-and-data.html:3409:      <a href="#">
./ai-and-data.html:3424:      <a href="#">
./ai-and-data.html:3458:      <a href="#"
./ai-and-data.html:3475:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-and-data.html:3491:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-and-data.html:3507:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-and-data.html:3572:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./partner-ecosystem.html:4122:            <a class="acc-readmore" href="#">Explore Guidewire Practice</a>
./partner-ecosystem.html:4148:            <a class="acc-readmore" href="#">Explore Jack Henry Practice</a>
./partner-ecosystem.html:4174:            <a class="acc-readmore" href="#">Explore ServiceNow Practice</a>
./partner-ecosystem.html:4200:            <a class="acc-readmore" href="#">Contact Us About Dynatrace</a>
./partner-ecosystem.html:4618:        <a href="#" class="cta-band-btn-outline"> Explore Individual Partner Pages</a>
./cloud-infrastructure-engineering.html:3229:          <a class="acc-readmore" href="#">
./cloud-infrastructure-engineering.html:3254:          <a class="acc-readmore" href="#">
./cloud-infrastructure-engineering.html:3279:          <a class="acc-readmore" href="#">
./cloud-infrastructure-engineering.html:3402:      <a href="#">
./cloud-infrastructure-engineering.html:3417:      <a href="#">
./cloud-infrastructure-engineering.html:3432:      <a href="#">
./cloud-infrastructure-engineering.html:3513:      <a href="#"
./cloud-infrastructure-engineering.html:3530:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./cloud-infrastructure-engineering.html:3546:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./cloud-infrastructure-engineering.html:3562:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./cloud-infrastructure-engineering.html:3589:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./what-we-solve.html:868:        <a href="#" class="sc-link">Read Story <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:886:        <a href="#" class="sc-link">Read Story <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:904:        <a href="#" class="sc-link">Read Story <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:922:        <a href="#" class="sc-link">Read Story <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:943:        <a href="#" class="br-arrow">Explore <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:949:        <a href="#" class="br-arrow">Explore <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./what-we-solve.html:955:        <a href="#" class="br-arrow">Explore <svg viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./Our_Focus.html:3507:            <a class="solution-link" href="#">Explore Modernization →</a>
./Our_Focus.html:3522:            <a class="solution-link" href="#">Explore Cloud Engineering →</a>
./Our_Focus.html:3537:            <a class="solution-link" href="#">Learn About Teams-as-a-Service →</a>
./Our_Focus.html:3760:      <a href="#">
./Our_Focus.html:3775:      <a href="#">
./Our_Focus.html:3790:      <a href="#">
./Our_Focus.html:3805:      <a href="#">
./Our_Focus.html:3837:      <a href="#"
./Our_Focus.html:3855:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./Our_Focus.html:3872:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./Our_Focus.html:3889:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./Our_Focus.html:3957:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./hire-train-deploy.html:3122:      <a href="#">
./hire-train-deploy.html:3137:      <a href="#">
./hire-train-deploy.html:3152:      <a href="#">
./hire-train-deploy.html:3184:      <a href="#"
./hire-train-deploy.html:3202:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./hire-train-deploy.html:3219:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./hire-train-deploy.html:3237:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./hire-train-deploy.html:3260:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./frameworks-accelerators.html:4557:        <a href="#">Speak to a specialist<span aria-hidden="true"> →</span></a>
./frameworks-accelerators.html:4814:        <a href="#" class="cta-band-btn-outline">Download Our Capabilities Overview</a>
./industries/healthcare/index.html:4994:          <a href="#" class="ps-cta">Explore AI-first Digital engineering platform</a>
./industries/healthcare/index.html:5929:      <a href="#"
./industries/healthcare/index.html:5946:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./industries/healthcare/index.html:5962:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./industries/healthcare/index.html:5978:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./industries/healthcare/index.html:6143:        <a href="#" class="cta-band-btn-outline">Download Our Capabilities Overview</a>
./industries/insurance/index.html:5985:            <a href="#" class="dc-feature-card-link">Omnichannel intake</a>
./industries/insurance/index.html:5992:            <a href="#" class="dc-feature-card-link">One Inc integration</a>
./industries/insurance/index.html:5999:            <a href="#" class="dc-feature-card-link">C4 automation rules</a>
./industries/insurance/index.html:6006:            <a href="#" class="dc-feature-card-link">RPS roof logic</a>
./industries/insurance/index.html:6076:        <p class="dc-expertise-text">This Duck Creek transformation experience positions Celsior uniquely to deliver <a href="#">end-to-end claims modernization</a> — from omnichannel intake through intelligent settlement — with speed and confidence.</p>
./solutions/gcc-and-nearshore/index.html:3169:      <a href="#">
./solutions/gcc-and-nearshore/index.html:3184:      <a href="#">
./solutions/gcc-and-nearshore/index.html:3199:      <a href="#">
./solutions/gcc-and-nearshore/index.html:3231:      <a href="#"
./solutions/gcc-and-nearshore/index.html:3248:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/gcc-and-nearshore/index.html:3265:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/gcc-and-nearshore/index.html:3281:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/gcc-and-nearshore/index.html:3304:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./solutions/index.html:3123:      <a href="#">
./solutions/index.html:3138:      <a href="#">
./solutions/index.html:3153:      <a href="#">
./solutions/index.html:3185:      <a href="#"
./solutions/index.html:3203:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/index.html:3220:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/index.html:3238:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/index.html:3261:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./solutions/teams-as-a-service/index.html:3119:      <a href="#">
./solutions/teams-as-a-service/index.html:3134:      <a href="#">
./solutions/teams-as-a-service/index.html:3149:      <a href="#">
./solutions/teams-as-a-service/index.html:3181:      <a href="#"
./solutions/teams-as-a-service/index.html:3199:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/teams-as-a-service/index.html:3216:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/teams-as-a-service/index.html:3234:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/teams-as-a-service/index.html:3257:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./solutions/ai-upskilling/index.html:3163:      <a href="#">
./solutions/ai-upskilling/index.html:3178:      <a href="#">
./solutions/ai-upskilling/index.html:3193:      <a href="#">
./solutions/ai-upskilling/index.html:3225:      <a href="#"
./solutions/ai-upskilling/index.html:3242:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/ai-upskilling/index.html:3259:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/ai-upskilling/index.html:3275:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/ai-upskilling/index.html:3298:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./solutions/technology-consulting/index.html:3099:      <a href="#">
./solutions/technology-consulting/index.html:3114:      <a href="#">
./solutions/technology-consulting/index.html:3129:      <a href="#">
./solutions/technology-consulting/index.html:3161:      <a href="#"
./solutions/technology-consulting/index.html:3178:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/technology-consulting/index.html:3195:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/technology-consulting/index.html:3211:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/technology-consulting/index.html:3234:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./solutions/managed-programs/index.html:3119:      <a href="#">
./solutions/managed-programs/index.html:3134:      <a href="#">
./solutions/managed-programs/index.html:3149:      <a href="#">
./solutions/managed-programs/index.html:3181:      <a href="#"
./solutions/managed-programs/index.html:3199:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/managed-programs/index.html:3216:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/managed-programs/index.html:3234:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./solutions/managed-programs/index.html:3257:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./ai-led-engineering.html:3218:          <a class="acc-readmore" href="#">
./ai-led-engineering.html:3243:          <a class="acc-readmore" href="#">
./ai-led-engineering.html:3268:          <a class="acc-readmore" href="#">
./ai-led-engineering.html:3391:      <a href="#">
./ai-led-engineering.html:3406:      <a href="#">
./ai-led-engineering.html:3421:      <a href="#">
./ai-led-engineering.html:3436:      <a href="#">
./ai-led-engineering.html:3469:      <a href="#"
./ai-led-engineering.html:3486:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-led-engineering.html:3502:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-led-engineering.html:3518:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-led-engineering.html:3584:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./ai-upskilling.html:3162:      <a href="#">
./ai-upskilling.html:3177:      <a href="#">
./ai-upskilling.html:3192:      <a href="#">
./ai-upskilling.html:3224:      <a href="#"
./ai-upskilling.html:3241:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-upskilling.html:3258:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-upskilling.html:3274:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./ai-upskilling.html:3297:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./digital-operations.html:3218:          <a class="acc-readmore" href="#">
./digital-operations.html:3243:          <a class="acc-readmore" href="#">
./digital-operations.html:3268:          <a class="acc-readmore" href="#">
./digital-operations.html:3391:      <a href="#">
./digital-operations.html:3406:      <a href="#">
./digital-operations.html:3421:      <a href="#">
./digital-operations.html:3455:      <a href="#"
./digital-operations.html:3472:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./digital-operations.html:3488:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./digital-operations.html:3504:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./digital-operations.html:3569:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./our-focus/ai-first-digital-engineering/index.html:3508:            <a class="solution-link" href="#">Explore Modernization →</a>
./our-focus/ai-first-digital-engineering/index.html:3523:            <a class="solution-link" href="#">Explore Cloud Engineering →</a>
./our-focus/ai-first-digital-engineering/index.html:3538:            <a class="solution-link" href="#">Learn About Teams-as-a-Service →</a>
./our-focus/ai-first-digital-engineering/index.html:3761:      <a href="#">
./our-focus/ai-first-digital-engineering/index.html:3776:      <a href="#">
./our-focus/ai-first-digital-engineering/index.html:3791:      <a href="#">
./our-focus/ai-first-digital-engineering/index.html:3806:      <a href="#">
./our-focus/ai-first-digital-engineering/index.html:3838:      <a href="#"
./our-focus/ai-first-digital-engineering/index.html:3856:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/ai-first-digital-engineering/index.html:3873:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/ai-first-digital-engineering/index.html:3890:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/ai-first-digital-engineering/index.html:3954:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./our-focus/index.html:3508:            <a class="solution-link" href="#">Explore Modernization →</a>
./our-focus/index.html:3523:            <a class="solution-link" href="#">Explore Cloud Engineering →</a>
./our-focus/index.html:3538:            <a class="solution-link" href="#">Learn About Teams-as-a-Service →</a>
./our-focus/index.html:3761:      <a href="#">
./our-focus/index.html:3776:      <a href="#">
./our-focus/index.html:3791:      <a href="#">
./our-focus/index.html:3806:      <a href="#">
./our-focus/index.html:3838:      <a href="#"
./our-focus/index.html:3856:          <div class="insight-foot"><span>6 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/index.html:3873:          <div class="insight-foot"><span>8 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/index.html:3890:          <div class="insight-foot"><span>5 min read</span><a href="#" class="insight-readlink">Read <svg width="12"
./our-focus/index.html:3958:        <a href="#">Speak to our team <span aria-hidden="true">→</span></a>
./our-focus/risk-and-compliance/index.html:3539:            <a class="solution-link" href="#">Explore Further →</a>
./our-focus/risk-and-compliance/index.html:3551:            <a class="solution-link" href="#">Explore Further →</a>

## Old .html Links

./industries.html:190:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./industries.html:191:        <a href="index.html" class="btn-g">Back to Home</a>
./industries.html:203:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./industries.html:205:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./industries.html:206:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./industries.html:207:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./industries.html:208:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./industries.html:209:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./industries.html:210:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./industries.html:211:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./industries.html:212:          <a href="about.html" class="dummy-nav-link">About</a>
./about.html:190:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./about.html:191:        <a href="index.html" class="btn-g">Back to Home</a>
./about.html:203:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./about.html:205:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./about.html:206:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./about.html:207:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./about.html:208:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./about.html:209:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./about.html:210:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./about.html:211:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./about.html:212:          <a href="about.html" class="dummy-nav-link">About</a>
./ai-innovation.html:190:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./ai-innovation.html:191:        <a href="index.html" class="btn-g">Back to Home</a>
./ai-innovation.html:203:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./ai-innovation.html:205:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./ai-innovation.html:206:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./ai-innovation.html:207:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./ai-innovation.html:208:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./ai-innovation.html:209:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./ai-innovation.html:210:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./ai-innovation.html:211:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./ai-innovation.html:212:          <a href="about.html" class="dummy-nav-link">About</a>
./about/who-we-are/index.html:191:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./about/who-we-are/index.html:192:        <a href="index.html" class="btn-g">Back to Home</a>
./about/who-we-are/index.html:204:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./about/who-we-are/index.html:206:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./about/who-we-are/index.html:207:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./about/who-we-are/index.html:208:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./about/who-we-are/index.html:209:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./about/who-we-are/index.html:210:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./about/who-we-are/index.html:211:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./about/who-we-are/index.html:212:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./about/who-we-are/index.html:213:          <a href="about.html" class="dummy-nav-link">About</a>
./about-leadership/index.html:191:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./about-leadership/index.html:192:        <a href="index.html" class="btn-g">Back to Home</a>
./about-leadership/index.html:204:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./about-leadership/index.html:206:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./about-leadership/index.html:207:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./about-leadership/index.html:208:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./about-leadership/index.html:209:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./about-leadership/index.html:210:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./about-leadership/index.html:211:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./about-leadership/index.html:212:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./about-leadership/index.html:213:          <a href="about.html" class="dummy-nav-link">About</a>
./how-we-do-it.html:1393:        <a href="index.html" class="bridge-card-link">Explore AI Readiness
./how-we-do-it.html:1401:        <a href="index.html" class="bridge-card-link">Explore AI Enablement
./how-we-do-it.html:1409:        <a href="index.html" class="bridge-card-link">Explore Automation
./how-we-do-it.html:1671:        <a href="index.html" class="fwd-card-cta">Explore Delivery Model
./how-we-do-it.html:1679:        <a href="index.html" class="fwd-card-cta">Explore Engineering Pods
./how-we-do-it.html:1687:        <a href="index.html" class="fwd-card-cta">See Industry Practices
./how-we-do-it.html:1911:        <a href="index.html#contact" class="faq-cta-btn">Request an Architecture Review
./how-we-do-it.html:1960:      <a href="index.html#contact" class="btn-primary">Request an Architecture Review
./success-stories/index.html:191:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./success-stories/index.html:192:        <a href="index.html" class="btn-g">Back to Home</a>
./success-stories/index.html:204:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./success-stories/index.html:206:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./success-stories/index.html:207:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./success-stories/index.html:208:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./success-stories/index.html:209:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./success-stories/index.html:210:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./success-stories/index.html:211:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./success-stories/index.html:212:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./success-stories/index.html:213:          <a href="about.html" class="dummy-nav-link">About</a>
./how-we-deliver.html:190:        <a href="index.html#contact" class="btn-p">Talk to us <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
./how-we-deliver.html:191:        <a href="index.html" class="btn-g">Back to Home</a>
./how-we-deliver.html:203:        <a href="index.html#contact" class="btn-p" style="margin:0 auto;display:inline-flex;">Get in touch</a>
./how-we-deliver.html:205:          <a href="index.html" class="dummy-nav-link">← Homepage</a>
./how-we-deliver.html:206:          <a href="what-we-solve.html" class="dummy-nav-link">What we Solve</a>
./how-we-deliver.html:207:          <a href="how-we-do-it.html" class="dummy-nav-link">How we Do it</a>
./how-we-deliver.html:208:          <a href="how-we-deliver.html" class="dummy-nav-link">How we Deliver</a>
./how-we-deliver.html:209:          <a href="ai-innovation.html" class="dummy-nav-link">AI &amp; Innovation</a>
./how-we-deliver.html:210:          <a href="industries.html" class="dummy-nav-link">Industries</a>
./how-we-deliver.html:211:          <a href="partner-ecosystem.html" class="dummy-nav-link">Partner Ecosystem</a>
./how-we-deliver.html:212:          <a href="about.html" class="dummy-nav-link">About</a>

## New Page Title and H1 Check


### industries/healthcare/index.html
7:  <title>Celsior | Healthcare Technology Solutions</title>
8:  <meta name="description"
3899:      <h1 class = "hero-eyebrow">Healthcare & Life Sciences Practice</h1>
3900:      <h1 class="hero-heading">Built for every layer of the healthcare ecosystem.<br> From claims to clinical care.

### industries/insurance/index.html
7:  <title>Celsior | Insurance Technology Solutions</title>
8:  <meta name="description"
3876:      <h1 class="hero-heading">Your legacy systems

### frameworks-accelerators/synthetix/index.html
7:  <title>Celsior | Synthetix AI-First Digital Engineering Accelerator</title>
8:  <meta name="description"
2550:      <h1 class="hero-eyebrow">AI-FIRST DIGITAL ENGINEERING PLATFORM</h1>
2551:      <h1 class="hero-heading">Agents that build, not assist.
