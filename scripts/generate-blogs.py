#!/usr/bin/env python3

import json
import re
import html
import urllib.request
from pathlib import Path
from datetime import datetime

WP_API_BASE = "https://cms.celsiortech.com/wp-json/wp/v2"
ROOT = Path.cwd()
OUT_DIR = ROOT / "blogs"

def fetch_posts():
    url = WP_API_BASE + "/posts?_embed&per_page=100&orderby=date&order=desc&_cb=" + datetime.utcnow().strftime("%Y%m%d%H%M%S")
    print("Fetching WordPress posts:", url)
    req = urllib.request.Request(url, headers={
        "User-Agent": "CelsiorStaticBlogGenerator/1.0",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
    })
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))

def strip_html(value):
    value = value or ""
    value = re.sub(r"<[^>]*>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value

def escape_html(value):
    return html.escape(value or "", quote=True)

def reading_time(content):
    words = re.findall(r"\w+", strip_html(content))
    return max(1, int((len(words) + 219) / 220))

def format_date(date_str):
    try:
        dt = datetime.strptime(date_str[:19], "%Y-%m-%dT%H:%M:%S")
        return "{} {}, {}".format(dt.strftime("%b"), dt.day, dt.year)
    except Exception:
        return date_str[:10]

def embedded_image(post):
    embedded = post.get("_embedded") or {}
    media = embedded.get("wp:featuredmedia") or []
    if isinstance(media, list) and media:
        return media[0].get("source_url") or ""
    return ""

def yoast_image(post):
    imgs = (post.get("yoast_head_json") or {}).get("og_image") or []
    if isinstance(imgs, list) and imgs and imgs[0].get("url"):
        return imgs[0]["url"]
    return ""

def first_content_image(content):
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content or "", re.I)
    return match.group(1) if match else ""

def image_from_size(post, preferred_sizes):
    embedded = post.get("_embedded") or {}
    media = embedded.get("wp:featuredmedia") or []
    if isinstance(media, list) and media:
        sizes = (media[0].get("media_details") or {}).get("sizes") or {}
        for size_name in preferred_sizes:
            item = sizes.get(size_name)
            if item and item.get("source_url"):
                return item.get("source_url")
        return media[0].get("source_url") or ""
    return ""

def get_card_image(post):
    content = post.get("content", {}).get("rendered", "")
    return (
        image_from_size(post, ["medium_large", "medium", "large", "full"])
        or yoast_image(post)
        or first_content_image(content)
    )

def get_hero_image(post):
    content = post.get("content", {}).get("rendered", "")
    return (
        image_from_size(post, ["large", "full", "medium_large"])
        or embedded_image(post)
        or yoast_image(post)
        or first_content_image(content)
    )

def remove_first_content_image(content):
    return re.sub(
        r'^\s*<p>\s*<img[^>]*>\s*</p>\s*',
        "",
        content or "",
        count=1,
        flags=re.I
    )

def article_html(post):
    title_html = post.get("title", {}).get("rendered", "") or "Celsior Blog"
    title_text = strip_html(title_html)
    safe_title = escape_html(title_text)

    raw_content = post.get("content", {}).get("rendered", "") or ""
    content = remove_first_content_image(raw_content)

    image = get_hero_image(post)
    date = format_date(post.get("date", ""))
    mins = reading_time(content)

    hero = ""
    if image:
        hero = '<img class="wp-blog-hero-img" src="{}" alt="{}">'.format(
            escape_html(image),
            safe_title
        )

    return '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{title} | Celsior</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="/">
  <style>
    .wp-blog-article{{max-width:920px;margin:0 auto;padding:120px 24px 80px;}}
    .wp-blog-back{{display:inline-block;margin-bottom:28px;color:#2563eb;font-weight:700;text-decoration:none;}}
    .wp-blog-meta{{color:#64748b;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;}}
    .wp-blog-article h1{{font-size:clamp(34px,5vw,58px);line-height:1.08;letter-spacing:-.04em;margin:0 0 28px;color:#0f172a;}}
    .wp-blog-hero-img{{width:100%;border-radius:16px;margin:10px 0 36px;display:block;}}
    .wp-blog-content{{font-size:18px;line-height:1.75;color:#374151;}}
    .wp-blog-content p{{margin:0 0 22px;}}
    .wp-blog-content h2{{margin:42px 0 18px;font-size:30px;line-height:1.2;color:#0f172a;}}
    .wp-blog-content h3{{margin:32px 0 14px;font-size:24px;color:#0f172a;}}
    .wp-blog-content a{{color:#2563eb;text-decoration:underline;}}
    .wp-blog-content img{{max-width:100%;height:auto;border-radius:12px;}}
    .wp-blog-content ul,.wp-blog-content ol{{margin:0 0 24px 24px;}}
    .wp-blog-cta{{margin:56px 0 0;padding:30px 36px;border-radius:16px;background:#0b1020;color:#fff;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;}}
    .wp-blog-cta p{{margin:0;font-size:20px;font-weight:700;line-height:1.3;}}
    .wp-blog-cta a{{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;padding:13px 26px;border-radius:10px;white-space:nowrap;transition:background .2s,transform .2s;}}
    .wp-blog-cta a:hover{{background:#1d4ed8;transform:translateY(-2px);}}
  </style>
</head>
<body>
  <article class="wp-blog-article">
    <a class="wp-blog-back" href="/blogs">← Back to blogs</a>
    <div class="wp-blog-meta">{date} · {mins} min read</div>
    <h1>{title}</h1>
    {hero}
    <div class="wp-blog-content">{content}</div>
    <div class="wp-blog-cta">
      <p>Ready to modernize with Celsior?</p>
      <a href="/contact-us">Contact us →</a>
    </div>
  </article>
  <script src="/shared.js"></script>
</body>
</html>'''.format(
        title=safe_title,
        date=date,
        mins=mins,
        hero=hero,
        content=content
    )

def main():
    posts = fetch_posts()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    blog_data = []

    for post in posts:
        slug = post.get("slug")
        if not slug:
            continue

        content = post.get("content", {}).get("rendered", "") or ""
        title_text = strip_html(post.get("title", {}).get("rendered", ""))
        excerpt_text = strip_html(post.get("excerpt", {}).get("rendered", ""))

        blog_data.append({
            "id": post.get("id"),
            "slug": slug,
            "title": title_text,
            "excerpt": excerpt_text,
            "date": post.get("date"),
            "link": "/blogs/" + slug,
            "image": get_card_image(post),
            "readingTime": reading_time(content)
        })

        article_dir = OUT_DIR / slug
        article_dir.mkdir(parents=True, exist_ok=True)
        (article_dir / "index.html").write_text(article_html(post), encoding="utf-8")

    generated = {
        "generatedAt": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "posts": blog_data
    }

    (OUT_DIR / "blog-data.json").write_text(
        json.dumps(generated, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )

    print("Generated posts:", len(blog_data))
    if blog_data:
        print("Latest title:", blog_data[0]["title"])
        print("Latest link:", blog_data[0]["link"])
        print("Latest image:", blog_data[0]["image"])

if __name__ == "__main__":
    main()
