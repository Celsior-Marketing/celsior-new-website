import fs from "fs/promises";
import path from "path";

const WP_API_BASE = process.env.WP_API_BASE || "https://cms.celsiortech.com/wp-json/wp/v2";
const OUT_DIR = path.join(process.cwd(), "blogs");

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getImage(post) {
  return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
}

function readingTime(html = "") {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function articleHtml(post) {
  const title = post.title?.rendered || "Celsior Blog";
  const img = getImage(post);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(stripHtml(title))} | Celsior</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="/">
  <style>
    .wp-blog-article{max-width:920px;margin:0 auto;padding:120px 24px 80px;}
    .wp-blog-back{display:inline-block;margin-bottom:28px;color:#2563eb;font-weight:700;text-decoration:none;}
    .wp-blog-meta{color:#64748b;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;}
    .wp-blog-article h1{font-size:clamp(34px,5vw,58px);line-height:1.08;letter-spacing:-.04em;margin:0 0 28px;color:#0f172a;}
    .wp-blog-hero-img{width:100%;border-radius:16px;margin:10px 0 36px;display:block;}
    .wp-blog-content{font-size:18px;line-height:1.75;color:#374151;}
    .wp-blog-content p{margin:0 0 22px;}
    .wp-blog-content h2{margin:42px 0 18px;font-size:30px;line-height:1.2;color:#0f172a;}
    .wp-blog-content h3{margin:32px 0 14px;font-size:24px;color:#0f172a;}
    .wp-blog-content a{color:#2563eb;text-decoration:underline;}
    .wp-blog-content img{max-width:100%;height:auto;border-radius:12px;}
    .wp-blog-content ul,.wp-blog-content ol{margin:0 0 24px 24px;}
    .wp-blog-cta{margin:56px 0 0;padding:30px 36px;border-radius:16px;background:#0b1020;color:#fff;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;}
    .wp-blog-cta p{margin:0;font-size:20px;font-weight:700;line-height:1.3;}
    .wp-blog-cta a{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;padding:13px 26px;border-radius:10px;white-space:nowrap;transition:background .2s,transform .2s;}
    .wp-blog-cta a:hover{background:#1d4ed8;transform:translateY(-2px);}
  </style>
</head>
<body>
  <article class="wp-blog-article">
    <a class="wp-blog-back" href="/blogs">← Back to blogs</a>
    <div class="wp-blog-meta">${date} · ${readingTime(post.content?.rendered)} min read</div>
    <h1>${title}</h1>
    ${img ? `<img class="wp-blog-hero-img" src="${img}" alt="${escapeHtml(stripHtml(title))}">` : ""}
    <div class="wp-blog-content">${post.content?.rendered || ""}</div>
    <div class="wp-blog-cta">
      <p>Ready to modernize with Celsior?</p>
      <a href="/contact-us">Contact us →</a>
    </div>
  </article>
  <script src="/shared.js"></script>
</body>
</html>`;
}

async function main() {
  const url = `${WP_API_BASE}/posts?_embed&per_page=100`;
  console.log(`Fetching WordPress posts: ${url}`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status}`);

  const posts = await res.json();
  await fs.mkdir(OUT_DIR, { recursive: true });

  const data = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    excerpt: stripHtml(post.excerpt?.rendered),
    date: post.date,
    link: `/blogs/${post.slug}`,
    image: getImage(post),
    readingTime: readingTime(post.content?.rendered)
  }));

  await fs.writeFile(
    path.join(OUT_DIR, "blog-data.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), posts: data }, null, 2)
  );

  for (const post of posts) {
    const dir = path.join(OUT_DIR, post.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), articleHtml(post));
  }

  console.log(`Generated ${posts.length} blog article pages and blog-data.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
