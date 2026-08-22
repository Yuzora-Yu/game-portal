import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const out = path.join(root, "dist");
const excluded = new Set([
  ".git",
  ".github",
  "node_modules",
  "dist",
  "config",
  "docs",
  "worker",
  "tools",
  "skills",
  "package.json",
  "package-lock.json",
  "wrangler.jsonc",
  "README.md",
  "ads.txt.example"
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (excluded.has(entry.name)) continue;
  const src = path.join(root, entry.name);
  const dest = path.join(out, entry.name);
  await cp(src, dest, { recursive: entry.isDirectory() });
}

const newsSource = await readFile(path.join(root, "scripts", "news-data.js"), "utf8");
const newsContext = { window: {} };
vm.createContext(newsContext);
vm.runInContext(newsSource, newsContext, { filename: "scripts/news-data.js" });

const posts = Array.isArray(newsContext.window.NEWS_POSTS)
  ? [...newsContext.window.NEWS_POSTS].sort((a, b) => String(b.date).localeCompare(String(a.date)))
  : [];

if (!posts.length) {
  throw new Error("NEWS_POSTS is empty. Refusing to build a news archive with zero entries.");
}

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const formatDate = (value) => {
  const parts = String(value).split("-");
  return parts.length === 3 ? parts.join(".") : String(value);
};

function renderNewsItems(items) {
  return items.map((post) => [
    `          <li data-news-id="${escapeHtml(post.id)}">`,
    `            <a href="${escapeHtml(post.url || "#")}">`,
    `              <time datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date))}</time>`,
    `              <span>${escapeHtml(post.title)}</span>`,
    `              <small>${escapeHtml(post.category || "NEWS")}</small>`,
    "            </a>",
    "          </li>"
  ].join("\n")).join("\n");
}

async function preRenderNews(relativeFile, items) {
  const outputFile = path.join(out, relativeFile);
  const html = await readFile(outputFile, "utf8");
  const listPattern = /(<ol\b[^>]*\bid="news-list"[^>]*>)[\s\S]*?(<\/ol>)/;
  if (!listPattern.test(html)) {
    throw new Error(`${relativeFile}: #news-list was not found.`);
  }
  const rendered = html.replace(listPattern, `$1\n${renderNewsItems(items)}\n        $2`);
  await writeFile(outputFile, rendered, "utf8");
}

await preRenderNews("index.html", posts.slice(0, 3));
await preRenderNews("news.html", posts);

console.log(`Build complete: static game portal copied to dist/; ${posts.length} news posts pre-rendered.`);
