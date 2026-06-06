#!/usr/bin/env python3
from pathlib import Path
import re
import csv
from html import unescape

ROOT = Path(".")
OUT = Path("audits/backend-readiness")
OUT.mkdir(parents=True, exist_ok=True)

html_files = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts)

def clean_url_for_file(p: Path) -> str:
    s = str(p).replace("\\", "/").lstrip("./")
    if s == "index.html":
        return "/"
    if s.endswith("/index.html"):
        return "/" + s[:-len("/index.html")]
    if s.endswith(".html"):
        return "/" + s[:-len(".html")]
    return "/" + s

def find_one(pattern, text, flags=re.I|re.S):
    m = re.search(pattern, text, flags)
    return unescape(m.group(1).strip()) if m else ""

def find_all(pattern, text, flags=re.I|re.S):
    return [unescape(m.strip()) for m in re.findall(pattern, text, flags)]

def strip_tags(s):
    return re.sub(r"<[^>]+>", " ", s or "").strip()

page_rows = []
link_rows = []
button_rows = []
image_rows = []
form_rows = []
script_rows = []
issue_rows = []

for p in html_files:
    text = p.read_text(errors="ignore")
    url = clean_url_for_file(p)

    title = find_one(r"<title[^>]*>(.*?)</title>", text)
    meta_desc = find_one(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']', text)
    canonical = find_one(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)["\']', text)
    h1s = [strip_tags(x) for x in find_all(r"<h1[^>]*>(.*?)</h1>", text)]
    favicon = find_all(r'<link[^>]+rel=["\'][^"\']*icon[^"\']*["\'][^>]+href=["\']([^"\']+)["\']', text)
    og_title = find_one(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']*)["\']', text)
    og_desc = find_one(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']*)["\']', text)
    og_image = find_one(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']*)["\']', text)

    has_gtm = "googletagmanager.com/gtm.js" in text or "GTM-" in text
    has_ga = "gtag(" in text or "google-analytics.com" in text or "G-" in text
    has_recaptcha = "recaptcha" in text.lower()
    has_hubspot = "hsforms" in text.lower() or "hubspot" in text.lower()
    has_shared = "/shared.js" in text or "shared.js" in text

    page_rows.append({
        "file": str(p).lstrip("./"),
        "url": url,
        "title": title,
        "meta_description": meta_desc,
        "canonical": canonical,
        "h1_count": len(h1s),
        "h1_text": " | ".join(h1s[:5]),
        "favicon_found": "yes" if favicon else "no",
        "og_title": og_title,
        "og_description": og_desc,
        "og_image": og_image,
        "has_shared_js": "yes" if has_shared else "no",
        "has_gtm": "yes" if has_gtm else "no",
        "has_ga": "yes" if has_ga else "no",
        "has_hubspot": "yes" if has_hubspot else "no",
        "has_recaptcha": "yes" if has_recaptcha else "no",
    })

    if not title:
        issue_rows.append([url, str(p), "SEO", "Missing <title>"])
    if not meta_desc:
        issue_rows.append([url, str(p), "SEO", "Missing meta description"])
    if len(h1s) == 0:
        issue_rows.append([url, str(p), "Content/SEO", "Missing H1"])
    if len(h1s) > 1:
        issue_rows.append([url, str(p), "Content/SEO", f"Multiple H1s found: {len(h1s)}"])
    if not has_shared:
        issue_rows.append([url, str(p), "Global shell", "shared.js not detected"])

    # Links
    for m in re.finditer(r'<a\b([^>]*)>(.*?)</a>', text, flags=re.I|re.S):
        attrs, inner = m.group(1), m.group(2)
        href = find_one(r'href=["\']([^"\']*)["\']', attrs)
        label = strip_tags(inner)
        classes = find_one(r'class=["\']([^"\']*)["\']', attrs)
        if href:
            link_rows.append({
                "source_file": str(p).lstrip("./"),
                "source_url": url,
                "label": label[:180],
                "href": href,
                "class": classes
            })
            if any(x in classes.lower() for x in ["btn", "cta"]) or any(x in label.lower() for x in ["contact", "talk", "start", "explore", "download", "learn", "view", "request", "get"]):
                button_rows.append({
                    "source_file": str(p).lstrip("./"),
                    "source_url": url,
                    "button_label": label[:180],
                    "href": href,
                    "class": classes
                })

    # Buttons
    for m in re.finditer(r'<button\b([^>]*)>(.*?)</button>', text, flags=re.I|re.S):
        attrs, inner = m.group(1), m.group(2)
        label = strip_tags(inner)
        classes = find_one(r'class=["\']([^"\']*)["\']', attrs)
        button_rows.append({
            "source_file": str(p).lstrip("./"),
            "source_url": url,
            "button_label": label[:180],
            "href": "(button/no href)",
            "class": classes
        })

    # Images
    for m in re.finditer(r'<img\b([^>]*)>', text, flags=re.I|re.S):
        attrs = m.group(1)
        src = find_one(r'src=["\']([^"\']*)["\']', attrs)
        alt = find_one(r'alt=["\']([^"\']*)["\']', attrs)
        classes = find_one(r'class=["\']([^"\']*)["\']', attrs)
        image_rows.append({
            "source_file": str(p).lstrip("./"),
            "source_url": url,
            "src": src,
            "alt": alt,
            "class": classes
        })
        if src and not alt:
            issue_rows.append([url, str(p), "Accessibility", f"Image missing alt text: {src[:100]}"])

    # Forms
    for m in re.finditer(r'<form\b([^>]*)>', text, flags=re.I|re.S):
        attrs = m.group(1)
        action = find_one(r'action=["\']([^"\']*)["\']', attrs)
        classes = find_one(r'class=["\']([^"\']*)["\']', attrs)
        form_rows.append({
            "source_file": str(p).lstrip("./"),
            "source_url": url,
            "form_action": action,
            "class": classes
        })

    # Scripts
    for src in find_all(r'<script[^>]+src=["\']([^"\']+)["\']', text):
        script_rows.append({
            "source_file": str(p).lstrip("./"),
            "source_url": url,
            "script_src": src
        })

def write_csv(name, rows):
    path = OUT / name
    if not rows:
        path.write_text("")
        return
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

write_csv("pages.csv", page_rows)
write_csv("links.csv", link_rows)
write_csv("buttons-and-ctas.csv", button_rows)
write_csv("images.csv", image_rows)
write_csv("forms.csv", form_rows)
write_csv("scripts.csv", script_rows)

with (OUT / "issues.csv").open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["url", "file", "category", "issue"])
    writer.writerows(issue_rows)

summary = []
summary.append("# Backend Readiness Audit Summary")
summary.append("")
summary.append(f"- HTML pages scanned: {len(html_files)}")
summary.append(f"- Links found: {len(link_rows)}")
summary.append(f"- Buttons/CTAs found: {len(button_rows)}")
summary.append(f"- Images found: {len(image_rows)}")
summary.append(f"- Forms found: {len(form_rows)}")
summary.append(f"- Script references found: {len(script_rows)}")
summary.append(f"- Potential issues found: {len(issue_rows)}")
summary.append("")
summary.append("## Generated Files")
summary.append("")
summary.append("- `pages.csv` — page-level SEO/meta/global script inventory")
summary.append("- `links.csv` — all anchor links")
summary.append("- `buttons-and-ctas.csv` — probable buttons and CTAs")
summary.append("- `images.csv` — image URLs and alt text")
summary.append("- `forms.csv` — native forms")
summary.append("- `scripts.csv` — script references")
summary.append("- `issues.csv` — potential missing metadata/accessibility/global shell issues")
summary.append("")
summary.append("## Backend Scope Checklist")
summary.append("")
for item in [
    "All contact forms",
    "Favicon",
    "Metadata and meta tags",
    "Internal linking and redirects",
    "CTA forms",
    "reCAPTCHA",
    "Sitemap",
    "Privacy Policy",
    "Google Analytics",
    "Google Tag Manager",
    "Robots.txt",
    "Google Search Console",
    "Security testing",
    "Responsiveness",
    "Page load speed and Core Web Vitals",
    "Cookie consent banner and cookie policy",
    "Terms of Use / Terms of Service page",
    "Accessibility statement",
    "CCPA opt-out mechanism if applicable",
]:
    summary.append(f"- [ ] {item}")

(OUT / "summary.md").write_text("\n".join(summary) + "\n")

print(f"Scanned {len(html_files)} HTML files")
print(f"Wrote audit files to {OUT}")
print(f"Potential issues found: {len(issue_rows)}")
