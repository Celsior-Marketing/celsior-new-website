/**
 * shared.js — Celsior site-wide nav + footer injector
 * Include this script on EVERY page (load with `defer`). Active nav item
 * is auto-detected from the URL filename; you can override with
 * <body data-page="how">.
 *
 * Pages: home | solve | how | deliver | ai | industries | partners | about
 *
 * Homepage safety: the script auto-skips injection if the page already
 * ships its own <nav id="navbar"> or <footer id="siteFooterLight">, OR
 * if <body data-shared="off"> is set. So you can drop
 *   <script src="shared.js" defer></script>
 * into index.html without producing duplicate headers/footers.
 */
(function () {
  if (window.__celsiorSharedLoaded) return;
  window.__celsiorSharedLoaded = true;

  /* ─── 0a. SITE-WIDE CONFIG (edit IDs once they exist) ───────────────
     Leave any value as '' to disable that integration. See SETUP.md.
  ─────────────────────────────────────────────────────────────────── */
  const SITE_CONFIG = (window.SITE_CONFIG = Object.assign({
    favicon: 'https://res.cloudinary.com/dyhze7fmf/image/upload/celsior-new-website/Favicon_l8iwo5.png',
    siteName: 'Pyramid Consulting',
    defaultDescription: 'AI-first digital engineering partner for regulated industries — modernizing critical systems, operationalizing AI, and building resilience at scale.',
    defaultOgImage: '',           // optional absolute URL
    twitterHandle: '',            // e.g. '@pyramidci'
    ga4MeasurementId: '',         // e.g. 'G-XXXXXXX'
    gtmContainerId: '',           // e.g. 'GTM-XXXXXXX'
    gscVerificationCode: '',      // Search Console meta-tag content
    recaptchaSiteKey: '',         // reCAPTCHA v3 site key
    policiesBase: 'policies/',    // folder where the 7 PDFs live, relative to site root
  }, window.SITE_CONFIG || {}));

  /* ─── 0b. FAVICON + SEO META + GTM/GA + GSC ─────────────────────── */
  (function injectHead() {
    const head = document.head;
    const link = (rel, href, extra) => { const l = document.createElement('link'); l.rel = rel; l.href = href; if (extra) Object.assign(l, extra); return l; };
    const meta = (attr, val, content) => { const m = document.createElement('meta'); m.setAttribute(attr, val); m.content = content; return m; };

    if (SITE_CONFIG.favicon) {
      head.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="shortcut icon"]').forEach(n => n.remove());
      head.appendChild(link('icon', SITE_CONFIG.favicon, { type: 'image/png' }));
      head.appendChild(link('apple-touch-icon', SITE_CONFIG.favicon));
      head.appendChild(link('shortcut icon', SITE_CONFIG.favicon));
    }

    if (!document.querySelector('meta[name="viewport"]')) head.appendChild(meta('name', 'viewport', 'width=device-width, initial-scale=1, viewport-fit=cover'));
    if (!document.querySelector('meta[name="description"]')) head.appendChild(meta('name', 'description', SITE_CONFIG.defaultDescription));
    if (!document.querySelector('meta[name="theme-color"]')) head.appendChild(meta('name', 'theme-color', '#11224F'));
    if (!document.querySelector('meta[name="robots"]')) head.appendChild(meta('name', 'robots', 'index, follow, max-image-preview:large'));

    const titleText = (document.title && document.title.trim()) || SITE_CONFIG.siteName;
    if (!document.title) document.title = titleText;
    const descEl = document.querySelector('meta[name="description"]');
    const descText = (descEl && descEl.content) || SITE_CONFIG.defaultDescription;
    const pageUrl = location.origin + location.pathname;

    const og = [
      ['og:title', titleText], ['og:description', descText],
      ['og:type', 'website'], ['og:url', pageUrl], ['og:site_name', SITE_CONFIG.siteName],
    ];
    if (SITE_CONFIG.defaultOgImage) og.push(['og:image', SITE_CONFIG.defaultOgImage]);
    og.forEach(([p, c]) => { if (!document.querySelector('meta[property="' + p + '"]')) head.appendChild(meta('property', p, c)); });

    const tw = [
      ['twitter:card', SITE_CONFIG.defaultOgImage ? 'summary_large_image' : 'summary'],
      ['twitter:title', titleText], ['twitter:description', descText],
    ];
    if (SITE_CONFIG.twitterHandle) tw.push(['twitter:site', SITE_CONFIG.twitterHandle]);
    if (SITE_CONFIG.defaultOgImage) tw.push(['twitter:image', SITE_CONFIG.defaultOgImage]);
    tw.forEach(([n, c]) => { if (!document.querySelector('meta[name="' + n + '"]')) head.appendChild(meta('name', n, c)); });

    if (!document.querySelector('link[rel="canonical"]')) head.appendChild(link('canonical', pageUrl));

    if (SITE_CONFIG.gscVerificationCode && !document.querySelector('meta[name="google-site-verification"]')) {
      head.appendChild(meta('name', 'google-site-verification', SITE_CONFIG.gscVerificationCode));
    }

    if (!document.querySelector('script[data-ld="org"]')) {
      const s = document.createElement('script');
      s.type = 'application/ld+json'; s.setAttribute('data-ld', 'org');
      s.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'Pyramid Consulting, Inc.', url: location.origin, logo: SITE_CONFIG.favicon
      });
      head.appendChild(s);
    }

    // Consent-gated loader; cookie banner calls this on Accept
    window.__loadAnalytics = function loadAnalytics() {
      if (window.__analyticsLoaded) return;
      window.__analyticsLoaded = true;
      if (SITE_CONFIG.gtmContainerId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        const gtm = document.createElement('script');
        gtm.async = true;
        gtm.src = 'https://www.googletagmanager.com/gtm.js?id=' + SITE_CONFIG.gtmContainerId;
        head.appendChild(gtm);
      }
      if (SITE_CONFIG.ga4MeasurementId) {
        const ga = document.createElement('script');
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + SITE_CONFIG.ga4MeasurementId;
        head.appendChild(ga);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        const ccpaOut = localStorage.getItem('ccpa_opt_out') === '1';
        window.gtag('config', SITE_CONFIG.ga4MeasurementId, {
          anonymize_ip: true,
          allow_ad_personalization_signals: !ccpaOut,
        });
      }
      if (SITE_CONFIG.recaptchaSiteKey && !window.grecaptcha) {
        const rc = document.createElement('script');
        rc.async = true; rc.defer = true;
        rc.src = 'https://www.google.com/recaptcha/api.js?render=' + SITE_CONFIG.recaptchaSiteKey;
        head.appendChild(rc);
      }
    };
  })();

  /* ─── 0c. SKIP-LINK for keyboard accessibility ─────────────────── */
  (function skipLink() {
    if (document.getElementById('skipToMain')) return;
    const a = document.createElement('a');
    a.id = 'skipToMain'; a.href = '#main'; a.textContent = 'Skip to main content';
    a.style.cssText = 'position:fixed;top:-100px;left:8px;z-index:99999;background:#0F172A;color:#fff;padding:10px 16px;border-radius:8px;font:600 14px/1 system-ui,sans-serif;transition:top .15s;';
    a.addEventListener('focus', () => { a.style.top = '8px'; });
    a.addEventListener('blur', () => { a.style.top = '-100px'; });
    document.addEventListener('DOMContentLoaded', () => document.body.prepend(a), { once: true });
  })();



  /* ─── 0.  LEGACY LINK NORMALIZER ────────────────────────────────────
     Some existing pages, especially index.html, ship their own header and
     may still contain old URLs. Normalize those links before any guard can
     skip injection, and intercept clicks as a second safety net.
  ─────────────────────────────────────────────────────────────────── */
  const LEGACY_LINK_MAP = {
    'what-we-solve.html': 'Our_Focus.html',
    'how-we-do-it.html': 'Capabilities.html',
    'how-we-deliver.html': 'Solutions.html',
    'our_focus.html': 'Our_Focus.html',
    'capabilties.html': 'Capabilities.html',
    'capabilities.html': 'Capabilities.html',
    'solutions.html': 'Solutions.html',
  };

  function normalizeLegacyHref(rawHref) {
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return rawHref;
    try {
      const url = new URL(rawHref, window.location.href);
      if (url.origin !== window.location.origin && !/^(file:)$/.test(window.location.protocol)) return rawHref;
      const file = (url.pathname.split('/').pop() || '').toLowerCase();
      const replacement = LEGACY_LINK_MAP[file];
      if (!replacement) return rawHref;
      const folder = url.pathname.slice(0, Math.max(0, url.pathname.lastIndexOf('/') + 1));
      return `${folder}${replacement}${url.search}${url.hash}`;
    } catch (_) {
      const clean = rawHref.split('#')[0].split('?')[0].split('/').pop().toLowerCase();
      const replacement = LEGACY_LINK_MAP[clean];
      return replacement ? rawHref.replace(/[^/?#]+\.html/i, replacement) : rawHref;
    }
  }

  function rewriteLegacyLinks(root) {
    (root || document).querySelectorAll('a[href]').forEach(function (link) {
      const fixedHref = normalizeLegacyHref(link.getAttribute('href'));
      if (fixedHref && fixedHref !== link.getAttribute('href')) link.setAttribute('href', fixedHref);
    });
  }

  function keepLegacyLinksNormalized() {
    rewriteLegacyLinks(document);
    document.addEventListener('DOMContentLoaded', function () { rewriteLegacyLinks(document); }, { once: true });
    window.addEventListener('load', function () { rewriteLegacyLinks(document); }, { once: true });
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.target && mutation.target.matches && mutation.target.matches('a[href]')) {
            rewriteLegacyLinks(mutation.target.parentNode || document);
          }
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) rewriteLegacyLinks(node);
          });
        });
      }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    }
  }

  function installLegacyClickGuard() {
    document.addEventListener('click', function (event) {
      const link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!link) return;
      const currentHref = link.getAttribute('href');
      const fixedHref = normalizeLegacyHref(currentHref);
      if (!fixedHref || fixedHref === currentHref) return;
      event.preventDefault();
      link.setAttribute('href', fixedHref);
      window.location.href = fixedHref;
    }, true);
  }

  /* ─── 1.  OPT-OUT / EXISTING ELEMENT DETECTION ─────────────────────
     Clean site-wide rule:
       • shared.js is the single source of truth for secondary-page nav/footer.
       • Existing complete homepage nav/footer are respected, so no duplicates.
       • Missing or empty placeholders are filled independently.
  ─────────────────────────────────────────────────────────────────── */
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', function () {
      keepLegacyLinksNormalized();
      installLegacyClickGuard();
      window.__celsiorSharedLoaded = false;
      const s = document.createElement('script');
      s.src = (document.currentScript && document.currentScript.src) || 'shared.js';
      s.defer = true;
      document.head.appendChild(s);
    }, { once: true });
    return;
  }
  keepLegacyLinksNormalized();
  installLegacyClickGuard();

  if (document.body.dataset.shared === 'off') {
    console.info('[shared.js] Skipped injection — body[data-shared="off"].');
    return;
  }

  function hasUsableNav() {
    const nav = document.getElementById('navbar');
    return !!(nav && nav.querySelector('a[href], button, .nav-link, .nav-logo'));
  }

  function hasUsableFooter() {
    const footer = document.getElementById('siteFooterLight') || document.querySelector('footer');
    return !!(footer && footer.querySelector('a[href], .fl-grid, .fl-brand, .fl-bottom'));
  }

  const shouldInjectNav = !hasUsableNav();
  const shouldInjectFooter = !hasUsableFooter();

  if (!shouldInjectNav && !shouldInjectFooter) {
    console.info('[shared.js] Existing complete nav and footer found — normalized links only.');
  }

  /* ─── 0.5. INJECT GLOBAL CARD STYLES ────────────────────────────── */
  (function injectGlobalCardStyles() {
    if (document.getElementById('celsior-global-cards')) return;
    const style = document.createElement('style');
    style.id = 'celsior-global-cards';
    style.textContent = `
/* ═══════════════════════ UNIFIED CARD HOVER EFFECT ═════════════════
   Applying gradient border and shadow on hover across all content cards
   ═══════════════════════════════════════════════════════════════════ */
.aw-card:hover, 
.fp-card:hover, 
.ops-cost-card:hover, 
.ops-cost-cards > div:not([style*="position:absolute"]):hover,
.insight-card:hover, 
.outcome-card:hover,
.drawer-mega-feature:hover,
.drawer-mega-card:hover,
.mz-feature-card:hover,
.mz-assess-card:hover {
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(135deg, #f3c969 0%, #5cc8ba 55%, #6aa9ff 100%) border-box !important;
  box-shadow: 0 18px 40px -28px rgba(11,79,143,0.25) !important;
  z-index: 2 !important;
  transform: translateY(-2px) !important;
  border-color: transparent !important;
  border-width: 1px !important;
  border-style: solid !important;
}


/* ═══════════════════════ IMAGE CARD BRIGHTNESS ═════════════════════════
   Reduces the black overlay on image cards to keep the top of the image bright
   ════════════════════════════════════════════════════════════════════════════ */
.solution-cards article::before,
.pr-card-overlay,
.oa-card-overlay,
.blog-card-overlay,
.ag-card-overlay,
#agent-team .ag-card-overlay {
  background: linear-gradient(180deg, transparent 0%, transparent 80%, rgba(6,10,20,0.98) 100%) !important;
}

.solution-cards img,
.pr-card-bg,
.oa-card-bg,
.blog-card-bg,
.ag-card-img,
#agent-team .ag-card-img {
  opacity: 1 !important;
  filter: none !important;
}
    `;
    document.head.appendChild(style);
  })();

  if (!shouldInjectNav && !shouldInjectFooter) {
    return;
  }

  /* ─── 1.  INJECT CSS ──────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
/* ═══════════════════════ SHARED TOKENS ════════════════════════════ */
:root {
  --white:#ffffff; --bg:#f5f6fa; --ink:#0d1127; --ink-mid:#3a4060;
  --muted:#7b82a0; --border:rgba(15,20,50,0.09); --border-md:rgba(15,20,50,0.15);
  --accent:#2254f4; --accent-lt:rgba(34,84,244,0.09); --nav-h:68px;
  --font-head:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
  --font-body:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
  --ease-expo:cubic-bezier(0.16,1,0.3,1); --btn-gradient:#11224F;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--white);color:var(--ink);font-family:var(--font-body);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
body.menu-open{overflow:hidden;}
a{text-decoration:none;color:inherit;}ul{list-style:none;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#f0f0f5;}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:4px;}

/* ═══════════════════════ NAVBAR ════════════════════════════════════ */
#navbar{position:fixed;inset:0 0 auto 0;z-index:1000;height:var(--nav-h);display:flex;align-items:center;padding:0 52px;transition:background .45s ease,box-shadow .45s ease,border-color .45s ease;border-bottom:1px solid transparent;}
#navbar.scrolled{background:rgba(255,255,255,.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);box-shadow:0 2px 28px rgba(15,20,80,.07);}
.nav-logo{display:flex;align-items:center;flex-shrink:0;margin-right:44px;}
.logo-img{height:28px;width:auto;display:block;filter:brightness(0) invert(1);transition:filter .4s ease;}
#navbar.scrolled .logo-img{filter:brightness(0);}
.nav-links{display:flex;align-items:center;gap:2px;flex:1;}
.nav-item{position:static;}
.nav-link{display:inline-flex;align-items:center;gap:5px;padding:7px 13px;font-family:var(--font-body);font-size:.8rem;font-weight:600;letter-spacing:.01em;border-radius:6px;cursor:pointer;user-select:none;white-space:nowrap;color:rgba(255,255,255,.82);transition:color .2s,background .2s;}
.nav-link{cursor:pointer;}
.nav-link:hover{color:var(--white);background:rgba(255,255,255,.1);text-decoration:none;}
.nav-item.active>.nav-link{color:var(--white);background:rgba(255,255,255,.13);}
#navbar.scrolled .nav-link{color:var(--ink-mid);}
#navbar.scrolled .nav-link:hover{color:var(--accent);background:var(--accent-lt);}
#navbar.scrolled .nav-item.active>.nav-link{color:var(--accent);background:var(--accent-lt);}
.nav-item.nav-current>.nav-link{color:var(--white) !important;background:rgba(255,255,255,.15) !important;}
#navbar.scrolled .nav-item.nav-current>.nav-link{color:var(--accent) !important;background:var(--accent-lt) !important;}
a.nav-link{text-decoration:none;}
.chevron{width:11px;height:11px;opacity:.5;transition:transform .25s var(--ease-expo),opacity .2s;flex-shrink:0;}
.nav-item.active>.nav-link .chevron{transform:rotate(180deg);opacity:1;}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.btn-nav-solid{display:inline-flex;align-items:center;gap:8px;padding:9px 22px;font-family:var(--font-body);font-size:.8rem;font-weight:700;border-radius:6px;border:1.5px solid rgba(255,255,255,.5);cursor:pointer;background:transparent;color:var(--white);transition:background .2s,border-color .2s,color .2s,transform .22s var(--ease-expo),box-shadow .22s;}
.btn-nav-solid:hover{background:var(--white);color:var(--ink);border-color:var(--white);transform:translateY(-2px);}
#navbar.scrolled .btn-nav-solid{background:var(--btn-gradient);color:var(--white);border-color:transparent;}
#navbar.scrolled .btn-nav-solid:hover{background:#111;box-shadow:0 8px 28px rgba(0,0,0,.32);}
.nav-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;margin-left:auto;width:38px;height:38px;background:none;border:none;cursor:pointer;padding:6px;border-radius:6px;transition:background .2s;}
.nav-hamburger:hover{background:rgba(255,255,255,.1);}
#navbar.scrolled .nav-hamburger:hover{background:var(--accent-lt);}
.ham-line{width:100%;height:2px;background:var(--white);border-radius:2px;transition:background .4s,transform .3s,opacity .3s;transform-origin:center;}
#navbar.scrolled .ham-line{background:var(--ink);}
.nav-hamburger.open .ham-line:nth-child(1){transform:translateY(7px) rotate(45deg);}
.nav-hamburger.open .ham-line:nth-child(2){opacity:0;transform:scaleX(0);}
.nav-hamburger.open .ham-line:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
@media(max-width:1280px){#navbar{padding:0 32px;}.nav-link{padding:7px 9px;font-size:.76rem;}.btn-nav-solid{padding:8px 16px;}.nav-logo{margin-right:28px;}}@media(max-width:1139px){.nav-links,.nav-right{display:none;}.nav-hamburger{display:flex;}#navbar{padding:0 24px;}}

/* ═══════════════════════ MOBILE DRAWER ════════════════════════════ */
.mobile-drawer{position:fixed;inset:0;z-index:999;display:flex;pointer-events:none;}
.drawer-backdrop{position:absolute;inset:0;background:rgba(7,9,20,.55);opacity:0;transition:opacity .35s ease;}
.drawer-panel{position:absolute;top:0;right:0;width:min(360px,88vw);height:100%;background:var(--white);box-shadow:-20px 0 60px rgba(15,20,80,.18);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .4s var(--ease-expo);overflow-y:auto;-webkit-overflow-scrolling:touch;}
.mobile-drawer.open{pointer-events:auto;}
.mobile-drawer.open .drawer-backdrop{opacity:1;}
.mobile-drawer.open .drawer-panel{transform:translateX(0);}
.drawer-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);flex-shrink:0;}
.drawer-logo{height:24px;width:auto;filter:brightness(0);}
.drawer-close{width:34px;height:34px;background:var(--bg);border:1px solid var(--border);border-radius:8px;display:grid;place-items:center;cursor:pointer;color:var(--ink-mid);transition:background .2s,color .2s;}
.drawer-close:hover{background:var(--accent-lt);color:var(--accent);}
.drawer-nav{flex:1;padding:12px 0;}
.drawer-item{border-bottom:1px solid var(--border);}
.drawer-link{display:flex;align-items:center;justify-content:space-between;padding:15px 24px;font-family:var(--font-body);font-size:.9rem;font-weight:600;color:var(--ink);cursor:pointer;transition:color .15s,background .15s;user-select:none;}
.drawer-link:hover{color:var(--accent);background:var(--accent-lt);}
.drawer-link.active{color:var(--accent);}
.drawer-chevron{width:16px;height:16px;color:var(--muted);transition:transform .25s var(--ease-expo),color .2s;flex-shrink:0;}
.drawer-link.active .drawer-chevron{transform:rotate(180deg);color:var(--accent);}
.drawer-sub{display:none;background:var(--bg);padding:8px 0;}
.drawer-sub.open{display:block;}
.drawer-sub-group{padding:10px 24px 4px;}
.drawer-sub-head{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;padding-left:10px;border-left:2px solid var(--accent);}
.drawer-sub a{display:block;padding:6px 24px 6px 34px;font-size:.8rem;font-weight:500;color:var(--ink-mid);transition:color .15s;}
.drawer-sub a:hover{color:var(--accent);}
.drawer-cta{padding:20px 24px;border-top:1px solid var(--border);flex-shrink:0;}
.drawer-cta-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:var(--btn-gradient);color:var(--white);font-family:var(--font-body);font-size:.875rem;font-weight:700;border-radius:8px;border:none;cursor:pointer;text-align:center;transition:opacity .2s,transform .2s;}
.drawer-cta-btn:hover{opacity:.88;transform:translateY(-1px);}

/* ═══════════════════════ MEGA BACKDROP + PANELS ════════════════════ */
#mega-backdrop{position:fixed;inset:0;z-index:800;background:transparent;pointer-events:none;transition:background .3s;}
#mega-backdrop.on{background:rgba(7,9,20,.45);pointer-events:auto;}
.mega-root{position:fixed;top:var(--nav-h);left:0;right:0;z-index:850;pointer-events:none;}
.mega-panel{position:absolute;inset:0 auto auto 0;width:100%;background:linear-gradient(118deg,#fbfcff 0%,#f3f8ff 46%,#e9f1ff 100%);border-bottom:1px solid rgba(34,84,244,.12);box-shadow:0 30px 80px rgba(15,20,80,.16);padding:46px 52px 50px;display:none;opacity:0;transform:translateY(-10px);pointer-events:none;overflow:hidden;}
.mega-panel.open{display:block;pointer-events:auto;}
.mega-inner{position:relative;z-index:2;max-width:1320px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1.16fr .92fr;gap:0;}
.mega-zone{padding:0 42px;border-right:1px solid var(--border);min-width:0;}
.mega-zone:first-child{padding-left:0;}
.mega-zone:last-child{padding-right:0;border-right:none;}

/* — left intro zone — */
.mz-label{font-family:var(--font-head);font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;display:flex;align-items:center;gap:12px;}
.mz-label::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--border-md),transparent);}
.mz-title{font-family:var(--font-head);font-size:1.34rem;font-weight:700;line-height:1.18;color:var(--ink);margin-bottom:12px;letter-spacing:-.02em;}
.mz-desc{font-size:.82rem;line-height:1.6;color:var(--muted);margin-bottom:22px;max-width:300px;}
.mz-list{display:flex;flex-direction:column;gap:8px;}
.mz-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#fff;border:1px solid var(--border);border-radius:10px;font-size:.84rem;font-weight:600;color:var(--ink);box-shadow:0 1px 2px rgba(15,20,80,.03);transition:border-color .3s var(--ease-expo),transform .3s var(--ease-expo),box-shadow .3s,color .2s;}
.mz-item:hover{border-color:var(--accent);color:var(--accent);transform:translateX(5px);box-shadow:0 10px 26px rgba(34,84,244,.13);}
.mz-item svg{width:14px;height:14px;color:var(--muted);transition:transform .3s var(--ease-expo),color .2s;flex-shrink:0;}
.mz-item:hover svg{color:var(--accent);transform:translateX(3px);}
.mz-pills{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;}
.partner-logo-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;}
.partner-logo-grid .partner-logo-card:last-child:nth-child(odd){grid-column:1 / -1;}
.partner-logo-card{display:flex;align-items:center;justify-content:center;min-height:56px;padding:10px 14px;background:#fff;border:1px solid var(--border);border-radius:10px;text-decoration:none;transition:transform .18s,border-color .18s,box-shadow .18s;overflow:hidden;}
.partner-logo-card:hover{transform:translateY(-1px);border-color:rgba(32,86,255,.28);box-shadow:0 10px 24px rgba(20,30,70,.10);}
.partner-logo-img{max-width:100%;max-height:28px;width:auto;height:auto;object-fit:contain;display:block;}
.drawer-partner-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;}
.drawer-partner-card{display:flex;align-items:center;justify-content:center;min-height:48px;padding:9px 10px;background:#fff;border:1px solid var(--border);border-radius:9px;text-decoration:none;overflow:hidden;}
.drawer-partner-logo{max-width:100%;max-height:24px;width:auto;height:auto;object-fit:contain;display:block;}

.mz-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:8px;border:1px solid var(--border);font-size:.74rem;font-weight:600;color:var(--ink-mid);background:#fff;transition:border-color .2s,color .2s,transform .25s var(--ease-expo);}
.mz-pill:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px);}
.mz-pill .p-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;}

/* — center feature zone — */
.mz-feature-card{display:block;border-radius:14px;overflow:hidden;border:1px solid var(--border);box-shadow:0 14px 38px rgba(15,20,80,.12);background:#0b1020;position:relative;aspect-ratio:16/8;}
.mz-feature-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform .9s var(--ease-expo);}
.mz-feature-card:hover .mz-feature-img{transform:scale(1.12);}
.mz-feature-card::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(7,11,26,.82),rgba(7,11,26,.12) 62%,transparent);}
.mz-feature-cap{position:absolute;left:18px;right:18px;bottom:16px;z-index:2;color:#fff;font-family:var(--font-head);font-size:.94rem;font-weight:700;line-height:1.3;}
.mz-feature-cap em{color:#3ddc97;font-style:normal;}
.mz-feature-body{margin-top:18px;}
.mz-feat-pulse{animation:mzFeatPulse .32s ease;}
@keyframes mzFeatPulse{from{opacity:.25;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
.mz-feature-title{font-family:var(--font-head);font-size:1.06rem;font-weight:700;color:var(--ink);margin-bottom:8px;}
.mz-feature-desc{font-size:.82rem;line-height:1.62;color:var(--muted);margin-bottom:18px;}
.mz-explore{display:inline-flex;align-items:center;gap:9px;padding:11px 22px;background:linear-gradient(120deg, #0A2540 0%, #1B6FB8 50%, #4A8FD4 100%);color:#fff;font-size:.8rem;font-weight:700;border-radius:8px;transition:transform .3s var(--ease-expo),box-shadow .3s,background .2s;}
.mz-explore svg{transition:transform .3s var(--ease-expo);}
.mz-explore:hover{background:linear-gradient(120deg, #07203a 0%, #14579a 50%, #3f7ec0 100%);transform:translateY(-2px);box-shadow:0 12px 28px rgba(27,111,184,.34);}
.mz-explore:hover svg{transform:translateX(4px);}

/* — right assessment zone — */
.mz-assess-label{font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;}
.mz-assess-cards{display:flex;flex-direction:column;gap:14px;}
.mz-assess-card{display:flex;gap:14px;padding:18px;background:#fff;border:1px solid var(--border);border-radius:12px;box-shadow:0 1px 2px rgba(15,20,80,.03);cursor:pointer;transition:border-color .3s var(--ease-expo),transform .3s var(--ease-expo),box-shadow .3s;}
.mz-assess-card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 16px 36px rgba(34,84,244,.15);}
.mz-assess-icon{width:42px;height:42px;flex-shrink:0;border-radius:10px;background:var(--accent-lt);display:grid;place-items:center;color:var(--accent);transition:background .25s,color .25s;}
.mz-assess-card:hover .mz-assess-icon{background:var(--accent);color:#fff;}
.mz-assess-icon svg{width:20px;height:20px;}
.mz-assess-title{font-family:var(--font-head);font-size:.92rem;font-weight:700;color:var(--ink);margin-bottom:5px;line-height:1.25;}
.mz-assess-desc{font-size:.78rem;line-height:1.55;color:var(--muted);}

@media(max-width:1180px){.mega-inner{grid-template-columns:1fr 1fr;}.mega-zone{padding:0 30px;}.mega-zone:last-child{grid-column:1/-1;border-top:1px solid var(--border);border-right:none;margin-top:30px;padding:30px 0 0;}.mz-assess-cards{flex-direction:row;}.mz-assess-card{flex:1;}}
@media(max-width:1024px){.mega-panel{padding:32px;}}


/* ═══════════════════════ FOOTER ════════════════════════════════════ */
.site-footer-light{
  --cf-bg:#080b18;--cf-bg2:#0b0f20;--cf-ink:#e9edf6;--cf-mid:#aab3c9;
  --cf-soft:#828ca6;--cf-muted:#5c6580;--cf-border:rgba(255,255,255,0.08);
  --cf-border2:rgba(255,255,255,0.15);--cf-accent:#11224F;
  --cf-font:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
  background:var(--cf-bg);color:var(--cf-ink);font-family:var(--cf-font);
  -webkit-font-smoothing:antialiased;position:relative;z-index:2;overflow:hidden;border-top:1px solid var(--cf-border);
}
.site-footer-light::before{content:'';position:absolute;top:-180px;left:50%;transform:translateX(-50%);width:1100px;height:500px;background:radial-gradient(ellipse,rgba(59,111,255,.10) 0%,transparent 70%);pointer-events:none;z-index:0;}
.cf-wrap{position:relative;z-index:1;max-width:1340px;margin:0 auto;padding:0 56px;}
.cf-top{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:48px 28px;padding:66px 0 52px;}.cf-top .cf-brand{grid-row:1/3;}.cf-top .cf-col{border-left:1px solid var(--cf-border);padding-left:28px;}
.cf-brand{display:flex;flex-direction:column;}
.cf-logo{height:26px;width:auto;filter:brightness(0) invert(1);display:block;transition:opacity .25s;}
.cf-logo:hover{opacity:.7;}
.cf-tagline{font-size:.85rem;line-height:1.72;color:var(--cf-mid);margin-top:22px;max-width:300px;}
.cf-sub-head{font-size:.98rem;font-weight:700;color:var(--cf-ink);margin-top:30px;}
.cf-sub-desc{font-size:.78rem;line-height:1.6;color:var(--cf-soft);margin-top:9px;max-width:280px;}
.cf-subscribe{display:flex;margin-top:15px;max-width:300px;}
.cf-subscribe input{flex:1;min-width:0;background:rgba(255,255,255,.04);border:1px solid var(--cf-border2);border-right:none;border-radius:8px 0 0 8px;padding:11px 14px;font-family:inherit;font-size:.8rem;color:var(--cf-ink);outline:none;transition:border-color .2s,background .2s;}
.cf-subscribe input::placeholder{color:var(--cf-muted);}
.cf-subscribe input:focus{border-color:var(--cf-accent);background:rgba(255,255,255,.07);}
.cf-subscribe button{padding:0 20px;background:var(--cf-accent);border:none;border-radius:0 8px 8px 0;font-family:inherit;font-size:.8rem;font-weight:700;color:#fff;cursor:pointer;white-space:nowrap;transition:background .2s;}
.cf-subscribe button:hover{background:#1d3372;}
.cf-connect{font-size:.98rem;font-weight:700;color:var(--cf-ink);margin-top:32px;}
.cf-social{display:flex;gap:10px;margin-top:15px;}
.cf-social a{width:38px;height:38px;border-radius:9px;border:1px solid var(--cf-border2);background:rgba(255,255,255,.03);display:grid;place-items:center;color:var(--cf-mid);transition:background .22s,color .22s,transform .22s cubic-bezier(.16,1,.3,1),border-color .22s;}
.cf-social a:hover{background:var(--cf-accent);border-color:transparent;color:#fff;transform:translateY(-3px);}
.cf-social svg{width:16px;height:16px;}
.cf-col-head{font-size:.92rem;font-weight:700;color:var(--cf-ink);margin-bottom:18px;}
.cf-col-links{display:flex;flex-direction:column;gap:1px;}
.cf-col-link{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 0;font-size:.8rem;color:var(--cf-soft);transition:color .18s,padding-left .24s cubic-bezier(.16,1,.3,1);}
.cf-col-link span{flex:1;}
.cf-col-link svg{width:11px;height:11px;opacity:.35;transform:translateX(0);transition:opacity .2s,transform .24s cubic-bezier(.16,1,.3,1),color .2s;flex-shrink:0;color:var(--cf-soft);}
.cf-col-link:hover{color:var(--cf-ink);padding-left:6px;}
.cf-col-link:hover svg{opacity:1;transform:translateX(3px);color:var(--cf-accent);}
.cf-divider{position:relative;z-index:1;height:1px;background:var(--cf-border);max-width:1340px;margin:0 auto;}
.cf-mid{display:grid;grid-template-columns:repeat(4,1fr) 1.6fr;gap:36px 28px;padding:50px 0;align-items:start;}
.cf-contact-line{display:flex;gap:9px;font-size:.8rem;line-height:1.55;color:var(--cf-soft);margin-bottom:15px;align-items:flex-start;}
.cf-contact-line svg{width:14px;height:14px;flex-shrink:0;margin-top:2px;color:var(--cf-accent);}
.cf-contact-line a:hover{color:var(--cf-ink);}
.cf-cta{background:linear-gradient(135deg,rgba(59,111,255,.14),rgba(59,111,255,.02));border:1px solid var(--cf-border2);border-radius:16px;padding:30px;display:flex;align-items:center;gap:24px;}
.cf-cta-circle{width:64px;height:64px;flex-shrink:0;border-radius:50%;border:1px solid var(--cf-accent);display:grid;place-items:center;color:var(--cf-accent);transition:background .3s,color .3s,transform .35s cubic-bezier(.16,1,.3,1);}
.cf-cta:hover .cf-cta-circle{background:var(--cf-accent);color:#fff;transform:rotate(-12deg) scale(1.05);}
.cf-cta-circle svg{width:24px;height:24px;}
.cf-cta-title{font-size:1.14rem;font-weight:700;color:var(--cf-ink);line-height:1.25;}
.cf-cta-desc{font-size:.8rem;color:var(--cf-soft);margin:9px 0 13px;}
.cf-cta-link{display:inline-flex;align-items:center;gap:7px;font-size:.85rem;font-weight:700;color:var(--cf-accent);}
.cf-cta-link svg{width:14px;height:14px;transition:transform .24s cubic-bezier(.16,1,.3,1);}
.cf-cta-link:hover svg{transform:translateX(4px);}
.cf-bottom{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;max-width:1340px;margin:0 auto;padding:24px 56px 36px;border-top:1px solid var(--cf-border);}
.cf-copyright{font-size:.74rem;color:var(--cf-muted);line-height:1.5;}
.cf-legal{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;flex:1;justify-content:center;}
.cf-legal a{font-size:.74rem;color:var(--cf-soft);transition:color .15s;}
.cf-legal a:hover{color:var(--cf-ink);}
.cf-lang{display:flex;align-items:center;gap:8px;padding:9px 14px;border:1px solid var(--cf-border2);border-radius:8px;font-size:.78rem;color:var(--cf-mid);cursor:pointer;transition:border-color .2s,background .2s;}
.cf-lang:hover{border-color:var(--cf-accent);background:rgba(255,255,255,.03);}
.cf-lang svg{width:13px;height:13px;}
.cf-lang .cf-globe{color:var(--cf-accent);}
@media(max-width:1100px){.cf-top{grid-template-columns:repeat(3,1fr);}.cf-brand{grid-column:1/-1;grid-row:auto;}}
@media(max-width:680px){.cf-wrap{padding:0 24px;}.cf-top{grid-template-columns:1fr 1fr;padding:48px 0 40px;}.cf-top .cf-col{border-left:none;padding-left:0;}.cf-bottom{flex-direction:column;align-items:flex-start;padding:22px 24px 32px;}.cf-legal{justify-content:flex-start;}}

/* ═══════════════════════ MOBILE DRAWER — MEGA CARDS ════════════════
   Rich content (feature card + assessment cards) injected into each
   drawer-sub from MEGA_DATA so mobile users see the same depth as the
   desktop mega menu. Fully responsive across phones and tablets.
─────────────────────────────────────────────────────────────────── */
.drawer-mega{padding:14px 20px 18px;display:flex;flex-direction:column;gap:14px;}
.drawer-mega-feature{position:relative;display:block;border-radius:12px;overflow:hidden;border:1px solid var(--border);background:#0b1020;aspect-ratio:16/9;box-shadow:0 10px 28px rgba(15,20,80,.14);}
.drawer-mega-feature img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.drawer-mega-feature::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(7,11,26,.85),rgba(7,11,26,.15) 60%,transparent);}
.drawer-mega-cap{position:absolute;left:14px;right:14px;bottom:12px;z-index:2;color:#fff;font-family:var(--font-head);font-size:.82rem;font-weight:700;line-height:1.3;}
.drawer-mega-cap em{color:#3ddc97;font-style:normal;}
.drawer-mega-explore{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 16px;background:var(--accent);color:#fff;font-size:.78rem;font-weight:700;border-radius:8px;transition:background .2s,transform .2s;}
.drawer-mega-explore:hover{background:#1b46d8;transform:translateY(-1px);}
.drawer-mega-explore svg{width:12px;height:12px;}
.drawer-mega-assess-label{font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-top:4px;}
.drawer-mega-assess{display:flex;flex-direction:column;gap:10px;}
.drawer-mega-card{display:flex;gap:12px;padding:12px 14px;background:#fff;border:1px solid var(--border);border-radius:10px;box-shadow:0 1px 2px rgba(15,20,80,.04);transition:border-color .2s,transform .2s,box-shadow .2s;}
.drawer-mega-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 10px 22px rgba(34,84,244,.14);}
.drawer-mega-card .ic{width:34px;height:34px;flex-shrink:0;border-radius:8px;background:var(--accent-lt);display:grid;place-items:center;color:var(--accent);}
.drawer-mega-card .ic svg{width:16px;height:16px;}
.drawer-mega-card .bd{min-width:0;}
.drawer-mega-card .t{font-family:var(--font-head);font-size:.82rem;font-weight:700;color:var(--ink);line-height:1.25;margin-bottom:3px;}
.drawer-mega-card .d{font-size:.72rem;line-height:1.5;color:var(--muted);}
.drawer-mega-pills{display:flex;flex-wrap:wrap;gap:6px;}
.drawer-mega-pills a{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;border:1px solid var(--border);font-size:.7rem;font-weight:600;color:var(--ink-mid);background:#fff;}
.drawer-mega-pills a .p-dot{width:5px;height:5px;border-radius:50%;background:var(--accent);}

/* Drawer link list tightening on narrow screens */
@media(max-width:480px){
  .drawer-panel{width:min(420px,100vw);}
  .drawer-header{padding:16px 18px;}
  .drawer-link{padding:14px 18px;font-size:.88rem;}
  .drawer-sub-group{padding:10px 18px 4px;}
  .drawer-sub a{padding:6px 18px 6px 30px;font-size:.78rem;}
  .drawer-cta{padding:16px 18px;}
  .drawer-mega{padding:12px 16px 16px;}
}
@media(max-width:360px){
  .drawer-panel{width:100vw;}
  .drawer-mega-feature{aspect-ratio:16/10;}
}

/* Make the rest of the page more bulletproof on small screens */
@media(max-width:1139px){
  body.menu-open{position:fixed;width:100%;}
}

/* Global button override to match brand color #11224F */
.cta-btn:not(.cta-band-btn-white), .cta-band-btn:not(.cta-band-btn-white) {
  background: #11224F !important;
}

/* ═══════════════════════ GLOBAL STATS STRIP HOVER ═════════════════
   Adds interactive pastel hover to every .stats-grid .stat-col
   across all pages. 5 colours cycle via nth-child.
   ═══════════════════════════════════════════════════════════════════ */
.stats-grid .stat-col {
  border-radius: 12px;
  transition: background .35s ease, transform .35s ease, box-shadow .35s ease;
}
.stats-grid .stat-col:hover { transform: translateY(-3px); }
.stats-grid .stat-col:nth-child(5n+1):hover {
  background: rgba(18, 186, 160, .12);
  box-shadow: 0 14px 30px -20px rgba(18, 186, 160, .4);
}
.stats-grid .stat-col:nth-child(5n+2):hover {
  background: rgba(34, 84, 244, .10);
  box-shadow: 0 14px 30px -20px rgba(34, 84, 244, .4);
}
.stats-grid .stat-col:nth-child(5n+3):hover {
  background: rgba(212, 160, 23, .14);
  box-shadow: 0 14px 30px -20px rgba(212, 160, 23, .4);
}
.stats-grid .stat-col:nth-child(5n+4):hover {
  background: rgba(124, 58, 237, .11);
  box-shadow: 0 14px 30px -20px rgba(124, 58, 237, .4);
}
.stats-grid .stat-col:nth-child(5n+5):hover {
  background: rgba(232, 131, 74, .13);
  box-shadow: 0 14px 30px -20px rgba(232, 131, 74, .4);
}

}
`;
  document.head.appendChild(style);

  /* ─── 2.  DETERMINE ACTIVE PAGE ───────────────────────────────────── */
  // Priority: explicit body[data-page] override → auto-detect from URL filename.
  const PAGE_MAP = {
    'index.html': 'home',
    '': 'home',
    'our_focus.html': 'solve',
    'what-we-solve.html': 'solve',
    'capabilities.html': 'how',
    'how-we-do-it.html': 'how',
    'solutions.html': 'deliver',
    'how-we-deliver.html': 'deliver',
    'ai-innovation.html': 'ai',
    'industries.html': 'industries',
    'partner-ecosystem.html': 'partners',
    'about.html': 'about',
    'blogs.html': 'blog',
    'blog.html': 'blog',
  };
  let activePage = (document.body.dataset.page || '').toLowerCase();
  if (!activePage) {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    activePage = PAGE_MAP[file] || '';
  }

  /* ─── 3.  NAV HTML ───────────────────────────────────────────────── */
  const LOGO = 'https://cdn.fastpixel.io/fp/ret_img+v_80dc+q_lossy+to_webp/celsiortech.com%2Fwp-content%2Fuploads%2F2024%2F11%2FCelsior.svg';
  const CHEVRON_SVG = `<svg class="chevron" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const ARROW_SVG = `<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const navItems = [
    { key: 'solve', label: 'Our Focus', href: '/our-focus' },
    { key: 'how', label: 'Capabilities', href: '/capabilities' },
    { key: 'deliver', label: 'Solutions', href: '/solutions' },
    { key: 'ai', label: 'AI &amp; Innovation', href: '/ai-innovation/celsior-ai-lab' },
    { key: 'industries', label: 'Industries', href: '/industries' },
    { key: 'partners', label: 'Partner Ecosystem', href: '/partners' },
    { key: 'about', label: 'About', href: '/about' },
  ];

  const navLinksHTML = navItems.map(it => `
    <li class="nav-item${activePage === it.key ? ' nav-current' : ''}" data-menu="${it.key}">
      <a class="nav-link" role="button" tabindex="0" aria-haspopup="true" data-href="${it.href}">${it.label} ${CHEVRON_SVG}</a>
    </li>`).join('');

  const drawerDivHTML = `

    <!-- ═══════════════════════════════════════════════════════════
         MOBILE DRAWER  —  one <a href="..."> per line for easy editing
         Placeholder links point to the parent page.
         Search for "/* ← LINK */" to jump to any individual URL.
         ═══════════════════════════════════════════════════════════ -->

    <!-- ── OUR FOCUS ──────────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-solve">Our Focus<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-solve">

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Priorities</div>
          <a href="/our-focus/ai-first-digital-engineering">AI-First Digital Engineering</a>
          <a href="/our-focus/ai-adoption">AI Adoption</a>
          <a href="/our-focus/risk-and-compliance">Risk &amp; Compliance</a>
        </div>

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Outcomes</div>
          <a href="/our-focus/cost-and-efficiency">Cost &amp; Efficiency</a>
          <a href="/our-focus/digital-experience">Digital Experience</a>
        </div>

      </div>
    </div>

    <!-- ── CAPABILITIES ───────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-how">Capabilities<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-how">

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Engineering</div>
          <a href="/capabilities/ai-led-engineering">AI Led Engineering</a>
          <a href="/capabilities/cloud-and-infrastructure-engineering">Cloud &amp; Infrastructure Engineering</a>
          <a href="/capabilities/ai-and-data">AI &amp; Data</a>
        </div>

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Operations</div>
          <a href="/capabilities/digital-operations-and-security">Digital Operations &amp; Security</a>
          <a href="/capabilities/security-and-governance">Security &amp; Governance</a>
        </div>



      </div>
    </div>

    <!-- ── SOLUTIONS ──────────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-deliver">Solutions<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-deliver">

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Programs</div>
          <a href="/solutions/managed-programs">Managed Programs</a>
          <a href="/solutions/technology-consulting">Technology Consulting</a>
          <a href="/solutions/ai-upskilling">AI Upskilling</a>
        </div>

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Global Delivery</div>
          <a href="/solutions/gcc-and-nearshore">GCC &amp; Nearshore</a>
        </div>

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Talent Models</div>
          <a href="/solutions/teams-as-a-service">Teams-as-a-Service</a>
        </div>

      </div>
    </div>

    <!-- ── AI & INNOVATION ────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-ai">AI &amp; Innovation<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-ai">

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Products</div>
          <a href="/ai-innovation/frameworks-accelerators/synthetix">Synthetix</a>
          <a href="/ai-innovation/celsior-ai-lab">Celsior AI Lab</a>
          <a href="/ai-innovation/design-lab">Design Lab</a>
        </div>

        <div class="drawer-sub-group">
          <div class="drawer-sub-head">Programs</div>
          <a href="/ai-innovation/frameworks-accelerators">Frameworks &amp; Accelerators</a>
        </div>

      </div>
    </div>

    <!-- ── INDUSTRIES ─────────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-ind">Industries<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-ind">

        <div class="drawer-sub-group">
          <a href="/industries/banking-financial-services">Banking &amp; Financial Services</a>
          <a href="/industries/insurance">Insurance</a>
          <a href="/industries/healthcare">Healthcare</a>
        </div>

      </div>
    </div>

    <!-- ── PARTNER ECOSYSTEM ──────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-part">Partner Ecosystem<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-part">

        <div class="drawer-sub-group">
          <a href="/partners">Partners</a>
        </div>

      </div>
    </div>

    <!-- ── ABOUT ──────────────────────────────────────────────── -->
    <div class="drawer-item">
      <div class="drawer-link" data-drawer-toggle="d-about">About<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="drawer-sub" id="d-about">

        <div class="drawer-sub-group">
          <a href="/about/who-we-are">Who we are + Our Leadership</a>
          <a href="/about/ai-first-philosophy">AI-first Philosophy</a>
          <a href="/about">Success Stories</a>
          <a href="/blogs">Blogs</a>
          <a href="/about">Careers</a>
          <a href="/about">Events &amp; News</a>
        </div>

      </div>
    </div>

`;

  const FEATURE_IMG = 'https://res.cloudinary.com/dyhze7fmf/image/upload/celsior-new-website/fd85d9f6b205b835d020b87cf50dfc5490c63510_ntepey.png';
  const ITEM_CHEV = `<svg viewBox="0 0 12 12" fill="none"><path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IC_DOC = `<svg viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 16.5h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const IC_CHART = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 4v15a1 1 0 0 0 1 1h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 14l3-3 2.5 2.5L19 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const ASSESS_ICONS = [IC_DOC, IC_CHART];

  /* Data-driven mega panels. Links preserved from the original menus. */
  const MEGA_DATA = [
    {
      id: 'solve', label: 'Our Focus', title: 'AI-First Digital Engineering',
      desc: 'We build intelligent digital products and platforms that unlock efficiency, resilience, and growth.',
      explore: { label: 'Learn More', href: '/our-focus/ai-first-digital-engineering' },
      items: [
        { label: 'AI-First Digital Engineering', href: '/our-focus/ai-first-digital-engineering' },
        { label: 'AI Adoption', href: '/our-focus/ai-adoption' },
        { label: 'Risk &amp; Compliance', href: '/our-focus/risk-and-compliance' },
        { label: 'Cost &amp; Efficiency', href: '/our-focus/cost-and-efficiency' },
        { label: 'Digital Experience', href: '/our-focus/digital-experience' },
      ],
      feature: { cap: '<em>AI-First</em> digital engineering that evolves at the speed of your business.', title: 'AI-First Digital Engineering', desc: 'Build intelligent products, automate workflows, and modernize technology platforms with AI-driven engineering solutions.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781203449/our-focus-feature_awakwx.mp4' },
      assessTag: 'Pre Assessment',
      assess: [
        { title: 'Modernization Readiness Index', href: '/assessment-tools/modernization-readiness', desc: 'Score your modernization readiness with a prioritized roadmap.' },
        { title: '72 Hours Codebase Assessment', href: '/assessment-tools/codebase-assessment', desc: 'Automated review of your codebase delivered in 72 hours.' },
      ],
    },
    {
      id: 'how', label: 'Capabilities', title: 'Engineering &amp; Operations',
      desc: 'Modern engineering capabilities that move regulated enterprises faster, safer, and smarter.',
      explore: { label: 'Learn More', href: '/capabilities/ai-led-engineering' },
      items: [
        { label: 'AI Led Engineering', href: '/capabilities/ai-led-engineering' },
        { label: 'Cloud &amp; Infrastructure Engineering', href: '/capabilities/cloud-and-infrastructure-engineering' },
        { label: 'AI &amp; Data', href: '/capabilities/ai-and-data' },
        { label: 'Digital Operations &amp; Security', href: '/capabilities/digital-operations-and-security' },
        { label: 'Security &amp; Governance', href: '/capabilities/security-and-governance' },
      ],
      feature: { cap: '<em>Platform engineering</em> built for scale and resilience.', title: 'Platform Engineering at Scale', desc: 'Golden paths for global banks with 200+ engineering teams, delivered with governance built in from day one.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781206076/capabilities-feature_umennw.mp4' },
      assessTag: 'Pre Assessment',
      assess: [
        { title: 'GRC Maturity', href: '/assessment-tools/grc-assessment', desc: 'Assess governance, risk, and compliance maturity across your estate.' },
        { title: 'Guidewire Programme Health', href: '/assessment-tools/guidewire-programme-health', desc: 'Benchmark the health and delivery risk of your Guidewire programme.' },
      ],
    },
    {
      id: 'deliver', label: 'Solutions', title: 'Global Delivery Models',
      desc: 'Flexible operating models that match your scale, speed, and talent strategy.',
      explore: { label: 'Learn More', href: '/solutions/gcc-and-nearshore' },
      items: [
        { label: 'Managed Programs', href: '/solutions/managed-programs' },
        { label: 'Technology Consulting', href: '/solutions/technology-consulting' },
        { label: 'AI Upskilling', href: '/solutions/ai-upskilling' },
        { label: 'GCC &amp; Nearshore', href: '/solutions/gcc-and-nearshore' },
        { label: 'Teams-as-a-Service', href: '/solutions/teams-as-a-service' },
      ],
      feature: { cap: '<em>The right model</em> for your scale and goals.', title: 'GCC vs. Teams-as-a-Service', desc: 'Compare cost, control, and speed side by side to find the right operating model for your enterprise.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781205650/solutions-feature_bvxk2o.mp4' },
      assessTag: 'Pre Assessment',
      assess: [
        { title: '72 Hours Codebase Assessment', href: '/assessment-tools/codebase-assessment', desc: 'Automated review of your codebase delivered in 72 hours.' },
        { title: 'GRC Maturity', href: '/assessment-tools/grc-assessment', desc: 'Assess governance, risk, and compliance maturity across your estate.' },
      ],
    },
    {
      id: 'ai', label: 'AI &amp; Innovation', title: 'AI &amp; Innovation',
      desc: 'Products, labs, and frameworks that turn AI ambition into production reality.',
      explore: { label: 'Learn More', href: '/ai-innovation/frameworks-accelerators/synthetix' },
      items: [
        { label: 'Synthetix', href: '/ai-innovation/frameworks-accelerators/synthetix' },
        { label: 'Celsior AI Lab', href: '/ai-innovation/celsior-ai-lab' },
        { label: 'Design Lab', href: '/ai-innovation/design-lab' },
        { label: 'Frameworks &amp; Accelerators', href: '/ai-innovation/frameworks-accelerators' },
      ],
      feature: { cap: '<em>Synthetix</em> orchestrates policy, claims, and risk in real time.', title: 'Synthetix in Action', desc: 'See how our AI orchestration layer connects critical systems with enterprise-grade governance.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781204152/ai-innovation-feature_xmhaon.mp4' },
      assessTag: 'Live Demo',
      assess: [
        { title: 'AI Readiness Index', href: 'https://ai.celsiortech.us/', desc: 'Benchmark your AI maturity against industry peers.' },
        { title: 'GenAI Accelerators', href: '/ai-innovation/frameworks-accelerators', desc: 'Ship copilots and agentic workflows in weeks, not quarters.' },
      ],
    },
    {
      id: 'industries', label: 'Industries', title: 'Industries We Serve',
      desc: 'Deep domain expertise across the most regulated and complex sectors.',
      explore: { label: 'Learn More', href: '/blogs' },
      items: [
        { label: 'Banking &amp; Financial Services', href: '/industries/banking-financial-services' },
        { label: 'Insurance', href: '/industries/insurance' },
        { label: 'Healthcare', href: '/industries/healthcare' },
      ],
      feature: { cap: '<em>Modernize</em> without disruption.', title: 'Regulated Industry Playbook', desc: 'How leading banks, insurers, and health systems modernize critical systems with confidence.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781204851/industries-feature_paiw9p.mp4' },
      assessTag: 'Industry Brief',
      assess: [
        { title: 'Prior Authorization', href: '/assessment-tools/prior-auth-roi', desc: 'AI-driven prior authorization for faster, compliant approvals.' },
        { title: 'Risk &amp; Resilience Index', href: '/our-focus/risk-and-compliance', desc: 'Benchmark operational resilience against sector peers.' },
      ],
    },
    {
      id: 'partners', label: 'Partner Ecosystem', title: 'Partner Ecosystem',
      desc: 'A curated network of technology and implementation partners that amplify outcomes.',
      explore: { label: 'Learn More', href: '/partners' },
      items: [
        { label: 'Partners', href: '/partners' },
      ],
      partnerLogos: [
        { label: 'Jack Henry', href: '/partners/jack-henry', src: 'https://res.cloudinary.com/dyhze7fmf/image/upload/celsior-new-website/25_qqbbin.png' },
        { label: 'ServiceNow', href: '/partners/servicenow', src: 'https://res.cloudinary.com/dyhze7fmf/image/upload/celsior-new-website/26_pr8qv6.png' },
        { label: 'Guidewire', href: '/partners/guidewire', src: 'https://res.cloudinary.com/dyhze7fmf/image/upload/celsior-new-website/LOGOS_2_rne95i.png' },
      ],
      feature: { cap: '<em>Join</em> the Celsior ecosystem.', title: 'Become a Partner', desc: 'Partner with Celsior to deliver AI-first transformation for regulated enterprises worldwide.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781205216/partner-ecosystem-feature_jz8fm1.mp4' },
      assessTag: 'Partnerships',
      assess: [
        { title: 'Alliance Programs', href: '/partners', desc: 'Co-build and co-sell with our technology partners.' },
        { title: 'Integration Library', href: '/ai-innovation/frameworks-accelerators', desc: 'Pre-built accelerators across leading platforms.' },
      ],
    },
    {
      id: 'about', label: 'About', title: 'About Celsior',
      desc: 'Engineering-first culture, global teams, and a mission built for regulated enterprises.',
      explore: { label: 'Learn More', href: '/' },
      items: [
        { label: 'Who we are + Our Leadership', href: '/about/who-we-are' },
        { label: 'AI-first Philosophy', href: '/about/ai-first-philosophy' },
        { label: 'Blogs', href: '/blogs' },
      ],
      feature: { cap: '<em>Who We Are</em> — Engineering excellence and global collaboration.', title: 'Who We Are', desc: 'Building AI-first digital enterprises through engineering excellence, innovation, and global collaboration.', video: 'https://res.cloudinary.com/dyhze7fmf/video/upload/q_auto/f_auto/v1781203709/about-feature_sgqog4.mp4' },
      assessTag: 'Join Us',
      assess: [
        { title: 'Open Roles', href: 'https://pyramidci.com/career-overview/', desc: 'Explore engineering and consulting opportunities worldwide.' },
        { title: 'Our Leadership', href: '/about/who-we-are#leadership', desc: 'Meet the team driving Celsior\'s mission and vision.' },
      ],
    },
  ];

  /* Per-option feature copy — the middle feature card swaps to this on hover (SP 12-Jun, mapped from Celsior-Mega Menu Content.docx) */
  const FEATURE_DESCS = {
    'AI Adoption': 'Structured programs that take AI initiatives from proof of concept to production at enterprise scale.',
    'Risk &amp; Compliance': 'Technology solutions that satisfy regulatory requirements and strengthen audit readiness across regulated industries.',
    'Cost &amp; Efficiency': 'Automation and cloud optimization that reduce operating costs without sacrificing delivery quality.',
    'Digital Experience': 'Research-led product design and engineering that improves customer and employee experiences across every channel.',
    'AI-First Digital Engineering': 'AI-First digital engineering platform built with intelligence and a human loop at every layer, from architecture to deployment.',
    'AI Led Engineering': 'Faster software delivery through AI-assisted design, testing, and deployment across the full development lifecycle.',
    'Cloud &amp; Infrastructure Engineering': 'Multi-cloud architecture, migration, and managed infrastructure built for regulated, high-availability environments.',
    'AI &amp; Data': 'Data engineering and AI model deployment for enterprises that need governed, production-ready intelligence.',
    'Digital Operations &amp; Security': 'Continuous monitoring, incident response, and secure operations management for complex digital environments.',
    'Security &amp; Governance': 'Enterprise security architecture and governance frameworks that protect assets and satisfy regulatory requirements.',
    'Managed Programs': 'End-to-end program delivery where Celsior owns accountability from planning through execution and support.',
    'Technology Consulting': 'Strategic advisory that translates business objectives into executable technology roadmaps and architecture decisions.',
    'GCC &amp; Nearshore': 'Global Capability Center setup and nearshore delivery models that reduce cost and accelerate digital programs.',
    'Teams-as-a-Service': 'Pre-built, scalable engineering teams with defined roles, governance, and delivery cadence — ready to deploy.',
    'AI Upskilling': 'Structured training programs that build enterprise workforce capability in applied AI, data, and engineering.',
    'Synthetix': "Celsior's AI-first platform for building, running, and governing enterprise applications at speed and scale.",
    'Celsior AI Lab': 'Applied research and rapid prototyping that turns emerging AI capabilities into production-grade enterprise solutions.',
    'Design Lab': 'Human-centered design studio delivering research-led UX and interaction systems for complex enterprise products.',
    'Frameworks &amp; Accelerators': 'Pre-built accelerators and delivery toolkits that compress time-to-value across Celsior engineering engagements.',
    'Banking &amp; Financial Services': 'Technology and AI services for banks, capital markets, and fintech firms navigating modernization and compliance.',
    'Insurance': 'End-to-end digital and AI services across policy, underwriting, claims, and distribution for carriers and MGAs.',
    'Healthcare': 'Digital transformation and AI services for payors, providers, pharma, and medical device companies.',
    'Partners': 'A certified ecosystem of technology alliances — ServiceNow, Guidewire, Jack Henry, AWS, and more.',
    'ServiceNow': 'Certified implementation and managed services for enterprise workflow transformation and ITSM programs.',
    'Guidewire': 'Certified technical partnership delivering implementation, integration, and managed services for insurance carriers.',
    'Jack Henry': 'FIN member partnership enabling deep integration and digital modernization for community banks and credit unions.',
    'Who we are + Our Leadership': 'A digital engineering firm built on 30 years of Pyramid Consulting heritage, serving 125+ Fortune 500 clients.',
    'AI-first Philosophy': 'Intelligence is not a feature Celsior adds — it is how every engagement is designed, built, and delivered.',
    'Success Stories': 'Measurable outcomes across banking, insurance, and healthcare from Celsior engineering and AI programs.',
    'Blogs': 'Technical perspectives and industry analysis from Celsior practitioners across engineering, AI, and data.',
    'Careers': "Engineering, consulting, and AI roles on programs that matter, across the world's most complex industries.",
    'Events &amp; News': 'Conference appearances, press releases, and announcements from Celsior Technologies and Pyramid Consulting.',
  };

  /* Per-option video overlay captions — swapped on hover alongside title/desc */
  const FEATURE_CAPS = {
    'AI Adoption': '<em>AI adoption</em> programs that move from proof of concept to production.',
    'Risk &amp; Compliance': '<em>Risk &amp; compliance</em> engineering that satisfies regulators by design.',
    'Cost &amp; Efficiency': '<em>Cost &amp; efficiency</em> engineering that optimizes without compromise.',
    'Digital Experience': '<em>Digital experience</em> engineering that puts the customer journey first.',
    'AI-First Digital Engineering': '<em>AI-First</em> digital engineering that evolves at the speed of your business.',
    'AI Led Engineering': '<em>AI-led engineering</em> that accelerates delivery across the full lifecycle.',
    'Cloud &amp; Infrastructure Engineering': '<em>Cloud infrastructure</em> built for regulated, high-availability environments.',
    'AI &amp; Data': '<em>AI &amp; Data</em> engineering for governed, production-ready intelligence.',
    'Digital Operations &amp; Security': '<em>Secure operations</em> management for complex digital environments.',
    'Security &amp; Governance': '<em>Security &amp; governance</em> frameworks that protect and comply.',
    'Managed Programs': '<em>Managed programs</em> with end-to-end delivery accountability.',
    'Technology Consulting': '<em>Technology consulting</em> that translates strategy into architecture.',
    'GCC &amp; Nearshore': '<em>Global delivery</em> models that reduce cost and accelerate programs.',
    'Teams-as-a-Service': '<em>Scalable teams</em> with defined roles, governance, and delivery cadence.',
    'AI Upskilling': '<em>AI upskilling</em> programs that build enterprise workforce capability.',
    'Synthetix': '<em>Synthetix</em> orchestrates policy, claims, and risk in real time.',
    'Celsior AI Lab': '<em>AI Lab</em> turning emerging capabilities into production-grade solutions.',
    'Design Lab': '<em>Design Lab</em> delivering research-led UX for complex enterprise products.',
    'Frameworks &amp; Accelerators': '<em>Accelerators</em> that compress time-to-value across engagements.',
    'Banking &amp; Financial Services': '<em>Banking &amp; financial services</em> modernization and compliance.',
    'Insurance': '<em>Insurance</em> digital transformation across the value chain.',
    'Healthcare': '<em>Healthcare</em> digital transformation for payors, providers, and pharma.',
    'Partners': '<em>Join</em> the Celsior ecosystem.',
    'ServiceNow': '<em>ServiceNow</em> implementation and managed services for enterprises.',
    'Guidewire': '<em>Guidewire</em> certified partnership for insurance carriers.',
    'Jack Henry': '<em>Jack Henry</em> integration and modernization for community banking.',
    'Who we are + Our Leadership': '<em>Engineering-first</em> culture, global impact.',
    'AI-first Philosophy': '<em>AI-first philosophy</em> embedded in every engagement.',
    'Success Stories': '<em>Measurable outcomes</em> across regulated industries.',
    'Blogs': '<em>Technical perspectives</em> from Celsior practitioners.',
    'Careers': '<em>Join a team</em> building the future of AI-first engineering.',
    'Events &amp; News': '<em>Events &amp; news</em> from Celsior Technologies.',
  };

  function buildMegaPanel(d) {
    const items = d.items.map(it => {
      const fdesc = (FEATURE_DESCS[it.label] || d.feature.desc).replace(/"/g, '&quot;');
      const fcap = (FEATURE_CAPS[it.label] || d.feature.cap).replace(/"/g, '&quot;');
      return `<a class="mz-item" href="${it.href}" data-ftitle="${it.label}" data-fdesc="${fdesc}" data-fcap="${fcap}">${it.label} ${ITEM_CHEV}</a>`;
    }).join('');
    const pills = d.partnerLogos
      ? `<div class="partner-logo-grid">${d.partnerLogos.map(p => `<a class="partner-logo-card mz-item" href="${p.href}" title="${p.label}" data-ftitle="${p.label}" data-fdesc="${(FEATURE_DESCS[p.label] || d.feature.desc).replace(/"/g, '&quot;')}" data-fcap="${(FEATURE_CAPS[p.label] || d.feature.cap).replace(/"/g, '&quot;')}"><img class="partner-logo-img" src="${p.src}" alt="${p.label}" loading="lazy"/></a>`).join('')}</div>`
      : (d.pills ? `<div class="mz-pills">${d.pills.map(p => `<a class="mz-pill" href="${d.items[0].href}"><span class="p-dot"></span>${p}</a>`).join('')}</div>` : '');
    const assess = d.assess.map((a, i) => `
        <a class="mz-assess-card" href="${a.href || d.explore.href}">
          <div class="mz-assess-icon">${ASSESS_ICONS[i % ASSESS_ICONS.length]}</div>
          <div><div class="mz-assess-title">${a.title}</div><div class="mz-assess-desc">${a.desc}</div></div>
        </a>`).join('');
    return `
  <div class="mega-panel" id="menu-${d.id}">
    <div class="mega-inner">
      <div class="mega-zone">
        <div class="mz-label">${d.label}</div>
        <h3 class="mz-title">${d.title}</h3>
        <p class="mz-desc">${d.desc}</p>
        <div class="mz-list">${items}</div>
        ${pills}
      </div>
      <div class="mega-zone">
        <a class="mz-feature-card" href="${d.explore.href}">
          ${d.feature.video
        ? `<video class="mz-feature-img" autoplay muted loop playsinline preload="auto" poster="${FEATURE_IMG}"><source src="${d.feature.video}" type="video/mp4"></video>`
        : `<img class="mz-feature-img" src="${FEATURE_IMG}" alt="${d.feature.title}" loading="lazy"/>`}
          <div class="mz-feature-cap">${d.feature.cap}</div>
        </a>
        <div class="mz-feature-body">
          <div class="mz-feature-title">${d.feature.title}</div>
          <p class="mz-feature-desc">${d.feature.desc}</p>
          <a class="mz-explore" href="${d.explore.href}">${d.explore.label} ${ARROW_SVG}</a>
        </div>
      </div>
      <div class="mega-zone">
        <div class="mz-assess-label">${d.assessTag}</div>
        <div class="mz-assess-cards">${assess}</div>
      </div>
    </div>
  </div>`;
  }

  const megaPanelsHTML = MEGA_DATA.map(buildMegaPanel).join('\n');


  let backdropEl = document.getElementById('mega-backdrop');
  let navEl = document.getElementById('navbar');
  let drawerEl = document.getElementById('mobileDrawer');
  let megaRoot = document.getElementById('megaRoot');

  if (shouldInjectNav) {
    const oldNav = document.getElementById('navbar');
    if (oldNav) oldNav.remove();
    const oldBackdrop = document.getElementById('mega-backdrop');
    if (oldBackdrop) oldBackdrop.remove();
    const oldDrawer = document.getElementById('mobileDrawer');
    if (oldDrawer) oldDrawer.remove();
    const oldMegaRoot = document.getElementById('megaRoot');
    if (oldMegaRoot) oldMegaRoot.remove();

    // Inject backdrop + nav root
    backdropEl = document.createElement('div');
    backdropEl.id = 'mega-backdrop';
    document.body.insertBefore(backdropEl, document.body.firstChild);

    navEl = document.createElement('nav');
    navEl.id = 'navbar';
    navEl.innerHTML = `
      <a href="/" class="nav-logo">
        <img src="${LOGO}" alt="Celsior" class="logo-img"/>
      </a>
      <ul class="nav-links" id="navLinks">${navLinksHTML}</ul>
      <div class="nav-right">
        <a href="/contact-us" class="btn-nav-solid">Contact us ${ARROW_SVG}</a>
      </div>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
        <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
      </button>`;
    document.body.insertBefore(navEl, document.body.firstChild);

    /* Feature video fallback — if the video fails to load, show the image instead */
    navEl.querySelectorAll('video.mz-feature-img').forEach(v => {
      const toImage = () => {
        if (v.dataset.fbDone) return;
        v.dataset.fbDone = '1';
        const img = document.createElement('img');
        img.className = 'mz-feature-img';
        img.src = v.getAttribute('poster');
        img.alt = '';
        v.replaceWith(img);
      };
      v.addEventListener('error', toImage);
      const src = v.querySelector('source');
      if (src) src.addEventListener('error', toImage);
      /* also fall back only if literally nothing has loaded (quota/interstitial cases) */
      setTimeout(() => { if (v.readyState === 0 && v.networkState !== 2) toImage(); }, 15000);
      /* nudge playback when the menu opens (some browsers defer hidden-video autoplay) */
      const nudge = () => { if (v.paused && !v.dataset.fbDone) v.play().catch(() => { }); };
      const host = v.closest('.mega') || v.closest('[class*="mega"]') || navEl;
      host.addEventListener('mouseenter', nudge);
      document.addEventListener('visibilitychange', () => { if (!document.hidden) nudge(); });
    });

    // Drawer
    drawerEl = document.createElement('div');
    drawerEl.className = 'mobile-drawer';
    drawerEl.id = 'mobileDrawer';
    drawerEl.innerHTML = `
      <div class="drawer-backdrop" id="drawerBackdrop"></div>
      <div class="drawer-panel">
        <div class="drawer-header">
          <img src="${LOGO}" alt="Celsior" class="drawer-logo"/>
          <button class="drawer-close" id="drawerClose" aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <nav class="drawer-nav">${drawerDivHTML}</nav>
        <div class="drawer-cta">
          <a href="/contact-us" class="drawer-cta-btn">Contact us ${ARROW_SVG}</a>
        </div>
      </div>`;
    document.body.insertBefore(drawerEl, navEl.nextSibling);

    // Mega root
    megaRoot = document.createElement('div');
    megaRoot.className = 'mega-root';
    megaRoot.id = 'megaRoot';
    megaRoot.innerHTML = megaPanelsHTML;
    document.body.insertBefore(megaRoot, drawerEl.nextSibling);

    /* ─── 3b.  AUGMENT MOBILE DRAWER WITH MEGA CARDS ────────────────
       Inject the rich content (feature card + assessment cards + pills)
       from MEGA_DATA into each .drawer-sub so the mobile experience
       mirrors the desktop mega menu. Original drawer link groups are
       preserved untouched. */
    const DRAWER_MEGA_MAP = {
      'd-solve': 'solve', 'd-how': 'how', 'd-deliver': 'deliver', 'd-ai': 'ai',
      'd-ind': 'industries', 'd-part': 'partners', 'd-about': 'about'
    };
    Object.keys(DRAWER_MEGA_MAP).forEach(function (subId) {
      const sub = drawerEl.querySelector('#' + subId);
      if (!sub) return;
      const data = MEGA_DATA.find(function (m) { return m.id === DRAWER_MEGA_MAP[subId]; });
      if (!data) return;
      const pillsHTML = data.partnerLogos
        ? `<div class="drawer-partner-grid">${data.partnerLogos.map(function (p) { return `<a class="drawer-partner-card" href="${p.href}" title="${p.label}"><img class="drawer-partner-logo" src="${p.src}" alt="${p.label}" loading="lazy"/></a>`; }).join('')}</div>`
        : (data.pills ? `<div class="drawer-mega-pills">${data.pills.map(function (p) { return `<a href="${data.items[0].href}"><span class="p-dot"></span>${p}</a>`; }).join('')}</div>` : '');
      const assessHTML = (data.assess || []).map(function (a, i) {
        return `<a class="drawer-mega-card" href="${data.explore.href}">
          <div class="ic">${ASSESS_ICONS[i % ASSESS_ICONS.length]}</div>
          <div class="bd"><div class="t">${a.title}</div><div class="d">${a.desc}</div></div>
        </a>`;
      }).join('');
      const mega = document.createElement('div');
      mega.className = 'drawer-mega';
      mega.innerHTML = `
        <a class="drawer-mega-feature" href="${data.explore.href}" aria-label="${data.feature.title}">
          <img src="${FEATURE_IMG}" alt="${data.feature.title}" loading="lazy"/>
          <div class="drawer-mega-cap">${data.feature.cap}</div>
        </a>
        <a class="drawer-mega-explore" href="${data.explore.href}">${data.explore.label} ${ARROW_SVG}</a>
        ${pillsHTML}
        ${data.assessTag ? `<div class="drawer-mega-assess-label">${data.assessTag}</div>` : ''}
        <div class="drawer-mega-assess">${assessHTML}</div>
      `;
      sub.appendChild(mega);
    });
  }


  /* ─── 4.  FOOTER HTML ─────────────────────────────────────────────── */
  const footerEl = document.createElement('footer');
  footerEl.className = 'site-footer-light';
  footerEl.id = 'siteFooterLight';
  const CF_CHEV = `<svg viewBox="0 0 12 12" fill="none"><path d="M4 2.5L7.5 6L4 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  function cfCol(head, links) {
    return `<div class="cf-col"><p class="cf-col-head">${head}</p><nav class="cf-col-links">${links.map(l => `<a href="${l.href}" class="cf-col-link"><span>${l.label}</span>${CF_CHEV}</a>`).join('')
      }</nav></div>`;
  }

  footerEl.innerHTML = `
  <div class="cf-wrap">
    <div class="cf-top">
      <div class="cf-brand">
        <a href="/"><img src="${LOGO}" alt="Celsior" class="cf-logo"/></a>
        <p class="cf-tagline">AI-first digital engineering partner for regulated industries—modernizing critical systems, operationalizing AI, and building resilience at scale.</p>
        <p class="cf-sub-head">Stay informed</p>
        <p class="cf-sub-desc">Insights on AI, compliance, and operational resilience delivered to your inbox.</p>
        <div class="cf-subscribe">
          <input type="email" placeholder="Enter your work email" autocomplete="email"/>
          <button type="button">Subscribe</button>
        </div>
        <p class="cf-connect">Connect with us</p>
        <div class="cf-social">
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="#" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25h6.988l4.26 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg></a>
          <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
        </div>
        <p class="cf-col-head" style="margin:34px 0 14px;">Contact</p>
        <div class="cf-contact-line">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>
          <span>Pyramid Consulting, Inc.<br/>1000 Parkwood Circle, Suite 100<br/>Atlanta, GA 30339, USA</span>
        </div>
        <div class="cf-contact-line">
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 16l1 4v0a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          <a href="tel:+14045550198">+1 (404) 555-0198</a>
        </div>
        <div class="cf-contact-line">
          <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          <a href="mailto:info@pyramidconsulting.com">info@pyramidconsulting.com</a>
        </div>
      </div>
      ${cfCol('About', [
    { label: 'Who we are', href: '/about/who-we-are' },
    { label: 'AI first philosophy', href: '/about/ai-first-philosophy' },
    { label: 'Blogs', href: '/blogs' },
  ])}
      ${cfCol('Our Focus', [
    { label: 'AI-First Digital Engineering', href: '/our-focus/ai-first-digital-engineering' },
    { label: 'AI Adoption', href: '/our-focus/ai-adoption' },
    { label: 'Risk &amp; Compliance', href: '/our-focus/risk-and-compliance' },
    { label: 'Cost &amp; Efficiency', href: '/our-focus/cost-and-efficiency' },
    { label: 'Digital Experience', href: '/our-focus/digital-experience' },
  ])}
      ${cfCol('Capabilities', [
    { label: 'AI-Led Engineering', href: '/capabilities/ai-led-engineering' },
    { label: 'Cloud &amp; Infrastructure', href: '/capabilities/cloud-and-infrastructure-engineering' },
    { label: 'AI &amp; Data', href: '/capabilities/ai-and-data' },
    { label: 'Digital Operations &amp; Sec.', href: '/capabilities/digital-operations-and-security' },
    { label: 'Security &amp; Governance', href: '/capabilities/security-and-governance' },
  ])}
      ${cfCol('Solutions', [
    { label: 'Managed Programs', href: '/solutions/managed-programs' },
    { label: 'Technology Consulting', href: '/solutions/technology-consulting' },
    { label: 'GCC &amp; Nearshore', href: '/solutions/gcc-and-nearshore' },
    { label: 'Teams-as-a-Service', href: '/solutions/teams-as-a-service' },
    { label: 'AI Upskilling', href: '/solutions/ai-upskilling' },
  ])}
      ${cfCol('AI &amp; Innovation', [
    { label: 'Synthetix', href: '/ai-innovation/frameworks-accelerators/synthetix' },
    { label: 'Celsior AI Lab', href: '/ai-innovation/celsior-ai-lab' },
    { label: 'Design Lab', href: '/ai-innovation/design-lab' },
    { label: 'Frameworks &amp; Acc.', href: '/ai-innovation/frameworks-accelerators' },
  ])}
      ${cfCol('Industries', [
    { label: 'Banking &amp; Financial', href: '/industries/banking-financial-services' },
    { label: 'Insurance', href: '/industries/insurance' },
    { label: 'Healthcare', href: '/industries/healthcare' },
  ])}
    </div>
  </div>

  <div class="cf-bottom">
    <p class="cf-copyright">&copy; 2026 Pyramid Consulting, Inc. All rights reserved.</p>
    <nav class="cf-legal" aria-label="Legal">
      <a href="/assets/legal/gdpr-v1-6-072024.pdf" target="_blank" rel="noopener">GDPR</a>
      <a href="/assets/legal/ccpa-cra-v1-3-072024.pdf" target="_blank" rel="noopener">CCPA/CPRA</a>
      <a href="/assets/legal/web-privacy-policy.pdf" target="_blank" rel="noopener">Privacy</a>
      <a href="/assets/legal/pci-072025-reasonable-accomodation-policy.pdf" target="_blank" rel="noopener">Reasonable Accommodation Policy</a>
      <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener">Microsoft privacy statement</a>
      <a href="/assets/legal/web-accessibility-v1-2-072024.pdf" target="_blank" rel="noopener">Web accessibility</a>
      <a href="/assets/legal/privacy-policy-introduction-v2-072024.pdf" target="_blank" rel="noopener">Privacy introduction</a>
      <a href="#" data-action="cookie-prefs">Cookie Preferences</a>
    </nav>

    <div class="cf-lang">
      <svg class="cf-globe" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" stroke-width="1.6"/></svg>
      <span>English</span>
      <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </div>`;


  if (shouldInjectFooter) {
    const oldFooter = document.getElementById('siteFooterLight');
    if (oldFooter) oldFooter.remove();
    document.body.appendChild(footerEl);
    // Footer entrance micro-interactions (GSAP if present, IntersectionObserver-triggered)
    (function animateFooter() {
      if (typeof IntersectionObserver === 'undefined') return;
      const targets = footerEl.querySelectorAll('.cf-brand,.cf-top .cf-col,.cf-mid .cf-col,.cf-cta');
      if (typeof gsap === 'undefined') return;
      gsap.set(targets, { opacity: 0, y: 26 });
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            gsap.to(en.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' });
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      targets.forEach(t => io.observe(t));
    })();
  }

  if (!shouldInjectNav) return;

  /* ─── 5.  NAV JAVASCRIPT ──────────────────────────────────────────── */
  // Scroll state
  // Blog page: always show the "scrolled" (light) nav styling because the
  // page background is white from the top.
  const forceScrolled = activePage === 'blog';
  if (forceScrolled) {
    navEl.classList.add('scrolled', 'force-scrolled');
  }
  window.addEventListener('scroll', () => {
    if (forceScrolled) { navEl.classList.add('scrolled'); return; }
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  if (!forceScrolled) navEl.classList.toggle('scrolled', window.scrollY > 40);


  // Desktop mega menu
  const navItemEls = navEl.querySelectorAll('.nav-item[data-menu]');
  const bdEl = backdropEl;
  let active = null, timer = null;

  function openPanel(id) {
    clearTimeout(timer);
    if (active === id) return;
    if (active) killPanel(active, true);
    active = id;
    navItemEls.forEach(li => li.classList.toggle('active', li.dataset.menu === id));
    const panel = document.getElementById('menu-' + id);
    if (!panel) return;
    panel.classList.add('open');
    bdEl.classList.add('on');
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf(panel);
      gsap.to(panel, { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out' });
      gsap.from(panel.querySelectorAll('.mega-zone'), { opacity: 0, y: 10, duration: 0.34, stagger: 0.05, ease: 'power3.out', clearProps: 'opacity,transform' });
      gsap.from(panel.querySelectorAll('.mz-item,.mz-assess-card,.mz-pill'), { opacity: 0, y: 8, duration: 0.3, stagger: 0.025, ease: 'power2.out', delay: 0.08, clearProps: 'opacity,transform' });
    } else {
      panel.style.opacity = '1'; panel.style.transform = 'translateY(0)';
    }
  }

  function killPanel(id, fast) {
    const panel = document.getElementById('menu-' + id);
    if (!panel) return;
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf(panel);
      gsap.to(panel, { opacity: 0, y: -8, duration: fast ? 0.14 : 0.24, ease: 'power2.in', onComplete: () => panel.classList.remove('open') });
    } else {
      panel.classList.remove('open');
    }
    navItemEls.forEach(li => li.classList.remove('active'));
    bdEl.classList.remove('on');
    active = null;
  }

  const sched = () => { timer = setTimeout(() => { if (active) killPanel(active); }, 150); };
  const cancel = () => clearTimeout(timer);

  navItemEls.forEach(li => {
    li.addEventListener('mouseenter', () => openPanel(li.dataset.menu));
    li.addEventListener('mouseleave', sched);
    /* Click opens the mega-menu only — tabs no longer navigate to a page (SP 12-Jun) */
    const trigger = li.querySelector('.nav-link');
    if (trigger) {
      const toggle = e => {
        e.preventDefault();
        if (active === li.dataset.menu) killPanel(li.dataset.menu);
        else openPanel(li.dataset.menu);
      };
      trigger.addEventListener('click', toggle);
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') toggle(e);
      });
    }
  });
  megaRoot.addEventListener('mouseenter', cancel);
  megaRoot.addEventListener('mouseleave', sched);

  /* Hover-to-preview: middle feature card swaps title/desc/cap/CTA to the hovered left option (SP 12-Jun) */
  megaRoot.querySelectorAll('.mega-panel').forEach(panel => {
    const titleEl = panel.querySelector('.mz-feature-title');
    const descEl = panel.querySelector('.mz-feature-desc');
    const capEl = panel.querySelector('.mz-feature-cap');
    const cardEl = panel.querySelector('.mz-feature-card');
    const exploreEl = panel.querySelector('.mz-explore');
    const list = panel.querySelector('.mega-zone'); /* left column — boundary for revert (covers list + partner logos) */
    if (!titleEl || !descEl || !list) return;
    const def = {
      title: titleEl.textContent, desc: descEl.textContent,
      cap: capEl ? capEl.innerHTML : '',
      card: cardEl && cardEl.getAttribute('href'),
      explore: exploreEl && exploreEl.getAttribute('href'),
    };
    const swap = (t, ds, capHTML, href) => {
      titleEl.textContent = t; descEl.textContent = ds;
      if (capEl && capHTML) capEl.innerHTML = capHTML;
      if (cardEl && href) cardEl.setAttribute('href', href);
      if (exploreEl && href) exploreEl.setAttribute('href', href);
      titleEl.classList.remove('mz-feat-pulse'); void titleEl.offsetWidth; titleEl.classList.add('mz-feat-pulse');
      descEl.classList.remove('mz-feat-pulse'); void descEl.offsetWidth; descEl.classList.add('mz-feat-pulse');
      if (capEl) { capEl.classList.remove('mz-feat-pulse'); void capEl.offsetWidth; capEl.classList.add('mz-feat-pulse'); }
    };
    panel.querySelectorAll('.mz-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        swap(item.getAttribute('data-ftitle'), item.getAttribute('data-fdesc'), item.getAttribute('data-fcap'), item.getAttribute('href'));
      });
    });
    list.addEventListener('mouseleave', () => swap(def.title, def.desc, def.cap, def.card === undefined ? null : def.card));
  });

  bdEl.addEventListener('click', () => { if (active) killPanel(active); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && active) killPanel(active); });

  // Mobile drawer
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBack = document.getElementById('drawerBackdrop');

  function openDrawer() { mobileDrawer.classList.add('open'); hamburger.classList.add('open'); document.body.classList.add('menu-open'); }
  function closeDrawer() { mobileDrawer.classList.remove('open'); hamburger.classList.remove('open'); document.body.classList.remove('menu-open'); }

  hamburger.addEventListener('click', () => mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer());
  drawerClose.addEventListener('click', closeDrawer);
  drawerBack.addEventListener('click', closeDrawer);

  mobileDrawer.querySelectorAll('[data-drawer-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = document.getElementById(btn.dataset.drawerToggle);
      const isOpen = sub.classList.contains('open');
      mobileDrawer.querySelectorAll('.drawer-sub.open').forEach(el => el.classList.remove('open'));
      mobileDrawer.querySelectorAll('.drawer-link.active').forEach(el => el.classList.remove('active'));
      if (!isOpen) { sub.classList.add('open'); btn.classList.add('active'); }
    });
  });
  mobileDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ─── 6.  READY SIGNAL ───────────────────────────────────────────────
     Lets pages defer work (e.g. footer entrance animations) until after
     the nav + footer are safely in the DOM.
  ─────────────────────────────────────────────────────────────────── */
  window.__celsiorSharedDone = true;
  document.dispatchEvent(new CustomEvent('celsior:shared-ready'));

  /* ─── 7. COOKIE CONSENT ───────────────────────────────────────────
     Banner shows once per visitor (localStorage). Footer "Cookie
     Preferences" link reopens the modal. Analytics scripts only load
     after Accept.
  ─────────────────────────────────────────────────────────────────── */
  (function consent() {
    const CONSENT_KEY = 'cookie_consent_v1';
    const stored = localStorage.getItem(CONSENT_KEY);

    const css = document.createElement('style');
    css.textContent = `
      .ck-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:880px;margin:0 auto;background:rgba(8,11,24,0.96);color:#e9edf6;border:1px solid rgba(255,255,255,0.08);border-radius:14px;box-shadow:0 18px 50px -16px rgba(0,0,0,0.5);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:18px 20px;z-index:99998;display:flex;gap:16px;align-items:center;flex-wrap:wrap;font:14px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;}
      .ck-banner p{margin:0;flex:1;min-width:240px;color:#aab3c9;}
      .ck-banner strong{color:#ffffff;}
      .ck-banner a{color:#2254f4;text-decoration:underline;}
      .ck-btns{display:flex;gap:8px;flex-wrap:wrap;}
      .ck-btn{appearance:none;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.03);color:#e9edf6;padding:9px 16px;border-radius:8px;font:600 13px/1 inherit;cursor:pointer;transition:.15s;}
      .ck-btn:hover{border-color:#2254f4;color:#ffffff;background:rgba(255,255,255,0.08);}
      .ck-btn.primary{background:#2254f4;border-color:#2254f4;color:#fff;}
      .ck-btn.primary:hover{background:#1b46d8;border-color:#1b46d8;color:#fff;}
      .ck-modal{position:fixed;inset:0;background:rgba(5,7,16,0.8);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;z-index:99999;}
      .ck-modal-card{background:#0b0f20;border:1px solid rgba(255,255,255,0.08);border-radius:16px;max-width:520px;width:100%;padding:28px;font:14px/1.55 system-ui,sans-serif;color:#e9edf6;box-shadow:0 24px 60px rgba(0,0,0,0.65);}
      .ck-modal-card h3{margin:0 0 8px;font-size:1.15rem;color:#ffffff;font-weight:700;}
      .ck-modal-card p{margin:0 0 16px;color:#aab3c9;}
      .ck-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid rgba(255,255,255,0.08);}
      .ck-row:first-of-type{border-top:none;}
      .ck-row label{font-weight:600;}
      .ck-row small{display:block;font-weight:400;color:#828ca6;margin-top:2px;}
      .ck-switch {position:relative;display:inline-block;width:38px;height:22px;}
      .ck-switch input {opacity:0;width:0;height:0;}
      .ck-slider {position:absolute;cursor:pointer;inset:0;background-color:rgba(255,255,255,0.12);transition:.3s;border-radius:34px;border:1px solid rgba(255,255,255,0.08);}
      .ck-slider:before {position:absolute;content:"";height:14px;width:14px;left:3px;bottom:3px;background-color:#aab3c9;transition:.3s;border-radius:50%;}
      .ck-switch input:checked + .ck-slider {background-color:#2254f4;}
      .ck-switch input:checked + .ck-slider:before {transform:translateX(16px);background-color:#ffffff;}
      @media(max-width:520px){.ck-banner{padding:16px;border-radius:12px;}}
    `;
    document.head.appendChild(css);

    function buildBanner() {
      const b = document.createElement('div');
      b.className = 'ck-banner'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie consent');
      b.innerHTML = `
        <p><strong>We value your privacy.</strong> We use cookies to enhance your experience, analyze traffic, and personalize content. See our <a href="/assets/legal/web-privacy-policy.pdf" target="_blank" rel="noopener">Privacy Policy</a>.</p>
        <div class="ck-btns">
          <button class="ck-btn" data-act="reject">Reject all</button>
          <button class="ck-btn" data-act="prefs">Preferences</button>
          <button class="ck-btn primary" data-act="accept">Accept all</button>
        </div>`;
      b.addEventListener('click', e => {
        const act = e.target.dataset && e.target.dataset.act;
        if (!act) return;
        if (act === 'accept') { setConsent('all'); b.remove(); }
        else if (act === 'reject') { setConsent('essential'); b.remove(); }
        else if (act === 'prefs') { b.remove(); openPrefs(); }
      });
      return b;
    }

    function setConsent(level) {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ level, ts: Date.now() }));
      if (level === 'all' || level === 'analytics') {
        if (typeof window.__loadAnalytics === 'function') window.__loadAnalytics();
      }
    }

    function openPrefs() {
      const cur = (() => { try { return JSON.parse(localStorage.getItem(CONSENT_KEY)) || {}; } catch (_) { return {}; } })().level || 'essential';
      const m = document.createElement('div'); m.className = 'ck-modal';
      m.innerHTML = `
        <div class="ck-modal-card" role="dialog" aria-modal="true" aria-label="Cookie preferences">
          <h3>Cookie preferences</h3>
          <p>Choose which categories of cookies we may use. You can change this at any time from the footer.</p>
          <div class="ck-row"><label>Essential <small>Required for the site to function.</small></label><span style="font-size:0.8rem;color:#3ddc97;font-weight:600;">Always active</span></div>
          <div class="ck-row">
            <label for="ck-an">Analytics <small>Helps us understand site usage.</small></label>
            <label class="ck-switch">
              <input id="ck-an" type="checkbox" ${cur === 'all' || cur === 'analytics' ? 'checked' : ''}>
              <span class="ck-slider"></span>
            </label>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px;">
            <button class="ck-btn" data-act="cancel">Cancel</button>
            <button class="ck-btn primary" data-act="save">Save preferences</button>
          </div>
        </div>`;
      m.addEventListener('click', e => {
        if (e.target === m || (e.target.dataset && e.target.dataset.act === 'cancel')) m.remove();
        if (e.target.dataset && e.target.dataset.act === 'save') {
          const on = m.querySelector('#ck-an').checked;
          setConsent(on ? 'analytics' : 'essential');
          m.remove();
        }
      });
      document.body.appendChild(m);
    }

    // Show banner if no prior choice
    if (!stored) {
      document.body.appendChild(buildBanner());
    } else {
      try {
        const { level } = JSON.parse(stored);
        if (level === 'all' || level === 'analytics') {
          if (typeof window.__loadAnalytics === 'function') window.__loadAnalytics();
        }
      } catch (_) { }
    }

    // Wire footer "Cookie Preferences" link
    document.addEventListener('click', e => {
      const t = e.target.closest && e.target.closest('[data-action]');
      if (!t) return;
      if (t.dataset.action === 'cookie-prefs') { e.preventDefault(); openPrefs(); }
    });
  })();

  /* ─── HUBSPOT CTA MODAL SYSTEM ──────────────────────────────────────
     Restored from prior working shared.js.
     Keeps CTA/form behavior centralized while preserving current nav,
     footer, GDPR/cookie, and backend additions.
  ─────────────────────────────────────────────────────────────────── */
  function initCelsiorHubspotModals() {
    if (window.__celsiorHubspotModalReady) return;
    window.__celsiorHubspotModalReady = true;

    const FORM_SCRIPT_SRC = 'https://js.hsforms.net/forms/embed/developer/40221584.js';
    const PORTAL_ID = '40221584';
    const REGION = 'na1';

    const modalContent = {
      general: {
        title: 'Talk to a Celsior expert',
        helper: 'Share a few details and our team will get back to you shortly.',
        formId: '14603611-2306-41db-892b-61dd59e11a31'
      },
      assessment: {
        title: 'Request an assessment',
        helper: 'Tell us what you would like to evaluate, and we will help route the next step.',
        formId: 'f1c2bdcb-202d-49df-8698-b41c6abbb67d'
      },
      download: {
        title: 'Request the resource',
        helper: 'Submit your details and our team will share the relevant material.',
        formId: 'd01bacd7-cff8-4a16-a801-4c3c6aa0b9b8'
      },
      partner: {
        title: 'Start a partnership conversation',
        helper: 'Share your inquiry and the right team member will follow up.',
        formId: '982fe6de-6215-4904-916b-fd062836bddc'
      }
    };

    const ctaRules = [
      {
        type: 'assessment', phrases: [
          'assess your readiness',
          'request ai readiness assessment',
          'start ai readiness assessment',
          'start assessment',
          'modernization assessment',
          'request assessment'
        ]
      },
      {
        type: 'download', phrases: [
          'download capability brief',
          'download guide',
          'download the ai readiness framework',
          'download ai readiness framework',
          'access report',
          'view case study',
          'get the brief',
          'request resource'
        ]
      },
      {
        type: 'partner', phrases: [
          'partner with us',
          'explore partnership',
          'alliance inquiry',
          'vendor inquiry',
          'send inquiry'
        ]
      },
      {
        type: 'general', phrases: [
          'talk to an expert',
          'talk to a celsior expert',
          'talk to us',
          'talk to our practice lead',
          'speak to our team',
          'start the conversation',
          'book a discovery call',
          'schedule consultation',
          'schedule a consultation',
          'schedule a conversation',
          'get in touch',
          'get started',
          'start your transformation',
          'start your cloud journey',
          'submit request'
        ]
      }
    ];

    function normaliseText(text) {
      return (text || '')
        .replace(/\s+/g, ' ')
        .replace(/[→›»]/g, '')
        .trim()
        .toLowerCase();
    }

    function getModalTypeFromElement(el) {
      if (!el) return null;

      // Explicit override always wins.
      // HubSpot modal temporarily disabled site-wide.
      // To re-enable later, remove this return.
      return;
      // Usage: data-celsior-form="general|assessment|ai|resource"
      if (el.dataset && el.dataset.celsiorForm) return el.dataset.celsiorForm;

      const label = normaliseText(el.textContent || '');
      const href = normaliseText(el.getAttribute && el.getAttribute('href') || '');
      const cls = normaliseText(el.className || '');
      const page = normaliseText(window.location.pathname || '');
      const combined = `${label} ${href} ${cls} ${page}`;

      const ignoredClasses = [
        'blog-card',
        'insight-readlink',
        'acc-readmore',
        'explore__row-left',
        'explore__view-all',
        'faq__trigger',
        'gacc-btn',
        'ae-tab',
        'menu',
        'nav',
        'mz-item',
        'mz-pill',
        'partner-logo-card',
        'drawer-partner-card',
        'gw-engagement-toggle',
        'dc-engagement-toggle',
        /* Accordion / case-study rows are expand-toggles, not form CTAs — clicking them must
           never open the contact modal (SP 12-Jun "screen goes dark on click", common across pages) */
        'jh-acc-row',
        'jh-acc-header',
        'acc-row',
        'jh-acc-title',
        'ci-tab',
        'ci-tab-indicator',
        'aw-dot',
        'aw-arrow',
        'aw-dots',
        'ag-dot',
        'ks-dot',
        'ks-prev',
        'ks-next',
        'fem-dot',
        'fp-pill'
      ];

      if (ignoredClasses.some(c => cls.includes(c))) return null;
      if (cls.includes('-toggle') || cls.includes('_toggle') || cls.includes('-trigger') || cls.includes('_trigger')) return null;

      // Do not trigger forms for normal internal navigation unless it is a contact-style CTA.
      const isContactHref = href === '#contact' || href === '/#contact' || href.includes('index.html#contact');
      const isEmptyOrHashHref = href === '' || href === '#' || isContactHref;

      if (!isEmptyOrHashHref && href.startsWith('/')) {
        return null;
      }

      // Resource / gated content form.
      if (
        combined.includes('download') ||
        combined.includes('capabilities deck') ||
        combined.includes('capabilities overview') ||
        combined.includes('platform brief') ||
        combined.includes('brief') ||
        combined.includes('guide') ||
        combined.includes('report') ||
        combined.includes('resource') ||
        combined.includes('watch demo')
      ) {
        return 'resource';
      }

      // Assessment / diagnostic form.
      if (
        combined.includes('assessment') ||
        combined.includes('diagnostic') ||
        combined.includes('readiness') ||
        combined.includes('roi') ||
        combined.includes('data assessment') ||
        combined.includes('review your') ||
        combined.includes('review our') ||
        combined.includes('framework')
      ) {
        return 'assessment';
      }

      // AI / accelerator / demo form.
      if (
        combined.includes('ai-first') ||
        combined.includes('ai first') ||
        combined.includes('ai lab') ||
        combined.includes('synthetix') ||
        combined.includes('agentic') ||
        combined.includes('pilot') ||
        combined.includes('automation') ||
        combined.includes('request a demo') ||
        combined.includes('explore the platform') ||
        combined.includes('platform demo') ||
        page.includes('/ai-innovation') ||
        page.includes('/capabilities/ai-led-engineering') ||
        page.includes('/capabilities/ai-and-data')
      ) {
        if (
          label.includes('request a demo') ||
          label.includes('explore the platform') ||
          label.includes('start your transformation') ||
          label.includes('book a discovery call') ||
          label.includes('talk to') ||
          label.includes('speak to') ||
          label.includes('start the conversation')
        ) {
          return 'ai';
        }
      }

      // General contact / sales conversation form.
      if (
        isContactHref ||
        combined.includes('talk to') ||
        combined.includes('contact') ||
        combined.includes('get started') ||
        combined.includes('start the conversation') ||
        combined.includes('schedule') ||
        combined.includes('book') ||
        combined.includes('discovery call') ||
        combined.includes('consultation') ||
        combined.includes('speak to our team') ||
        combined.includes('speak to') ||
        combined.includes('connect with') ||
        combined.includes('get in touch')
      ) {
        return 'general';
      }

      // Fallback to older phrase rules from the restored system.
      for (const rule of ctaRules) {
        if (rule.phrases.some(phrase => label === phrase || label.includes(phrase))) {
          return rule.type;
        }
      }

      return null;
    }

    function ensureModalStyles() {
      if (document.getElementById('celsior-hs-modal-styles')) return;
      const style = document.createElement('style');
      style.id = 'celsior-hs-modal-styles';
      style.textContent = `
        .celsior-hs-modal-open{overflow:hidden;}
        .celsior-hs-modal{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:22px;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}
        .celsior-hs-modal.is-open{display:flex;}
        .celsior-hs-modal__overlay{position:absolute;inset:0;background:rgba(2,10,26,.80);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);}
        .celsior-hs-modal__dialog{position:relative;width:min(540px,100%);max-height:min(86vh,720px);overflow-y:auto;overflow-x:hidden;background:transparent!important;border:0!important;border-radius:18px!important;box-shadow:none!important;padding:0;color:#fff;scrollbar-width:thin;scrollbar-color:rgba(170,178,188,.55) rgba(255,255,255,.08);}
        .celsior-hs-modal__dialog::-webkit-scrollbar{width:4px;height:4px;}
        .celsior-hs-modal__dialog::-webkit-scrollbar-track{background:rgba(255,255,255,.06);border-radius:999px;}
        .celsior-hs-modal__dialog::-webkit-scrollbar-thumb{background:rgba(170,178,188,.58);border-radius:999px;}
        .celsior-hs-modal__dialog::-webkit-scrollbar-thumb:hover{background:rgba(200,206,214,.72);}
        .celsior-hs-modal__close{position:absolute;top:12px;right:12px;width:28px;height:28px;border:1px solid rgba(255,255,255,.34);border-radius:999px;background:rgba(255,255,255,.08);color:#fff;display:grid;place-items:center;cursor:pointer;font-size:19px;line-height:1;z-index:2;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
        .celsior-hs-modal__close:hover{background:rgba(255,255,255,.16);}
        .celsior-hs-modal__form-panel{display:none;}
        .celsior-hs-modal__form-panel.is-active{display:block;background:rgba(5,16,32,.20);border:1px solid rgba(255,255,255,.22);border-radius:18px;padding:22px 28px 20px;box-shadow:0 24px 70px rgba(0,0,0,.28);}
        .celsior-hs-modal__head{padding:0 42px 11px 0;margin:0 0 14px;border-bottom:1px solid rgba(255,255,255,.20);}
        .celsior-hs-modal__title{margin:0;color:#fff;font-size:24px;line-height:1.12;font-weight:760;letter-spacing:-.025em;text-shadow:0 2px 18px rgba(0,0,0,.28);}
        .celsior-hs-modal__helper{margin:6px 0 0;color:rgba(255,255,255,.78);font-size:13.5px;line-height:1.35;}
        .celsior-hs-modal .hs-form-html,.celsior-hs-modal .hs-form{width:100%;background:transparent!important;}
        .celsior-hs-modal .hs-form fieldset{max-width:100%!important;background:transparent!important;margin-bottom:8px!important;}
        .celsior-hs-modal .hs-form .hs-form-field{background:transparent!important;margin-bottom:10px!important;}
        .celsior-hs-modal .hs-form label{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;color:rgba(255,255,255,.92)!important;font-size:12.5px!important;font-weight:650!important;line-height:1.25!important;margin-bottom:5px!important;text-shadow:0 1px 12px rgba(0,0,0,.28);}
        .celsior-hs-modal .hs-form input,.celsior-hs-modal .hs-form select,.celsior-hs-modal .hs-form textarea{min-height:38px!important;height:38px!important;padding:8px 10px!important;border-radius:7px!important;border:1px solid rgba(255,255,255,.45)!important;box-shadow:0 8px 22px rgba(0,0,0,.14)!important;background:rgba(255,255,255,.96)!important;color:#101820!important;font-size:14px!important;}
        .celsior-hs-modal .hs-form textarea{height:64px!important;min-height:64px!important;}
        .celsior-hs-modal .hs-form input:focus,.celsior-hs-modal .hs-form select:focus,.celsior-hs-modal .hs-form textarea:focus{outline:2px solid rgba(255,255,255,.48)!important;outline-offset:1px!important;}
        .celsior-hs-modal .hs-form .hs-submit{margin-top:8px!important;}
        .celsior-hs-modal .hs-form input[type="submit"],.celsior-hs-modal .hs-button{height:38px!important;min-height:38px!important;padding:8px 18px!important;background:#11224F!important;border-color:#11224F!important;border-radius:7px!important;font-weight:700!important;color:#fff!important;box-shadow:0 10px 24px rgba(17,34,79,.24)!important;}
        @media (max-height:760px){.celsior-hs-modal{align-items:center;padding:14px 18px;}.celsior-hs-modal__dialog{max-height:calc(100vh - 28px);width:min(500px,100%);}.celsior-hs-modal__form-panel.is-active{padding:18px 24px 16px;border-radius:16px;}.celsior-hs-modal__close{top:9px;right:9px;}.celsior-hs-modal__head{margin-bottom:12px;padding-bottom:10px;}.celsior-hs-modal__title{font-size:22px;}.celsior-hs-modal__helper{font-size:13px;}.celsior-hs-modal .hs-form .hs-form-field{margin-bottom:7px!important;}.celsior-hs-modal .hs-form input,.celsior-hs-modal .hs-form select,.celsior-hs-modal .hs-form textarea{height:34px!important;min-height:34px!important;padding:6px 10px!important;}.celsior-hs-modal .hs-form textarea{height:52px!important;min-height:52px!important;}.celsior-hs-modal .hs-form input[type="submit"],.celsior-hs-modal .hs-button{height:36px!important;min-height:36px!important;}}
        @media (max-width:640px){.celsior-hs-modal{align-items:flex-start;overflow:auto;padding:18px 16px;}.celsior-hs-modal__dialog{width:100%;max-height:calc(100vh - 36px);margin:4px 0;padding:0;}.celsior-hs-modal__form-panel.is-active{padding:18px 18px 16px;border-radius:16px;}.celsior-hs-modal__close{top:8px;right:8px;}.celsior-hs-modal__title{font-size:22px;}.celsior-hs-modal__helper{font-size:13px;}}
      `;
      document.head.appendChild(style);
    }

    function ensureModalMarkup() {
      let modal = document.getElementById('celsiorHsModal');
      if (modal) return modal;
      ensureModalStyles();
      modal = document.createElement('div');
      modal.id = 'celsiorHsModal';
      modal.className = 'celsior-hs-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="celsior-hs-modal__overlay" data-celsior-modal-close></div>
        <div class="celsior-hs-modal__dialog" role="dialog" aria-modal="true" aria-label="Celsior form">
          <button class="celsior-hs-modal__close" type="button" aria-label="Close form" data-celsior-modal-close>×</button>
          ${Object.keys(modalContent).map(type => `<div class="celsior-hs-modal__form-panel" data-celsior-form-panel="${type}"><div class="celsior-hs-modal__head"><h2 class="celsior-hs-modal__title">${modalContent[type].title}</h2><p class="celsior-hs-modal__helper">${modalContent[type].helper}</p></div><div class="hs-form-html" data-region="${REGION}" data-form-id="${modalContent[type].formId}" data-portal-id="${PORTAL_ID}"></div></div>`).join('')}
        </div>
      `;
      document.body.appendChild(modal);

      if (!document.querySelector(`script[src="${FORM_SCRIPT_SRC}"]`)) {
        const hsScript = document.createElement('script');
        hsScript.src = FORM_SCRIPT_SRC;
        hsScript.defer = true;
        document.body.appendChild(hsScript);
      }

      modal.addEventListener('click', (event) => {
        if (event.target.closest('[data-celsior-modal-close]')) closeModal();
      });

      return modal;
    }

    function openModal(type) {
      const content = modalContent[type] || modalContent.general;
      const modal = ensureModalMarkup();
      const dialog = modal.querySelector('.celsior-hs-modal__dialog');
      if (dialog) dialog.setAttribute('aria-label', content.title);
      modal.querySelectorAll('[data-celsior-form-panel]').forEach(panel => {
        panel.classList.toggle('is-active', panel.dataset.celsiorFormPanel === type);
      });
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('celsior-hs-modal-open');
      setTimeout(() => {
        const firstInput = modal.querySelector('.celsior-hs-modal__form-panel.is-active input, .celsior-hs-modal__form-panel.is-active select, .celsior-hs-modal__form-panel.is-active textarea, .celsior-hs-modal__close');
        if (firstInput) firstInput.focus({ preventScroll: true });
      }, 250);
    }

    function closeModal() {
      const modal = document.getElementById('celsiorHsModal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('celsior-hs-modal-open');
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('a,button,[role="button"]');
      if (!trigger) return;
      if (trigger.closest('#celsiorHsModal')) return;
      const type = getModalTypeFromElement(trigger);
      if (!type) return;
      event.preventDefault();
      openModal(type);
    });
  }

  initCelsiorHubspotModals();



  /* ─── AI-FIRST PAGE CTA FALLBACK ───────────────────────────────────── */
  function forceAiFirstExploreCtaRedirect() {
    const isAiFirstPage = window.location.pathname.replace(/\/$/, '') === '/our-focus/ai-first-digital-engineering';
    if (!isAiFirstPage) return;

    const targetUrl = '/capabilities/ai-led-engineering';

    Array.from(document.querySelectorAll('a, button')).forEach(function (el) {
      const label = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (label !== 'explore our approach') return;

      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', targetUrl);
      }

      el.setAttribute('data-celsior-no-modal', 'true');

      el.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = targetUrl;
      }, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceAiFirstExploreCtaRedirect);
  } else {
    forceAiFirstExploreCtaRedirect();
  }


})();
