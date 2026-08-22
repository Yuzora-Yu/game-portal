import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const errors = [];
const exists = async (target) => access(target).then(() => true, () => false);
const normalize = (value) => String(value).replaceAll("\\", "/");

const manifestPath = path.join(root, "config", "game-pages.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const games = Array.isArray(manifest.games) ? manifest.games : [];

if (!games.length) errors.push("config/game-pages.json has no games.");

const numbers = new Set();
const slugs = new Set();
const pageFiles = new Set();

for (const game of games) {
  const expectedStem = `GAME${game.number}_${game.slug}`;
  const expectedPage = `${expectedStem}.html`;
  const expectedAssets = `assets/game-pages/${expectedStem}`;

  if (!/^\d{2}$/.test(String(game.number))) errors.push(`${game.title}: number must be two digits.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(game.slug))) errors.push(`${game.title}: slug is invalid.`);
  if (game.page_file !== expectedPage) errors.push(`${game.title}: page_file must be ${expectedPage}.`);
  if (normalize(game.asset_dir) !== expectedAssets) errors.push(`${game.title}: asset_dir must be ${expectedAssets}.`);
  if (numbers.has(game.number)) errors.push(`Duplicate game number: ${game.number}.`);
  if (slugs.has(game.slug)) errors.push(`Duplicate game slug: ${game.slug}.`);
  if (pageFiles.has(game.page_file)) errors.push(`Duplicate page file: ${game.page_file}.`);
  numbers.add(game.number);
  slugs.add(game.slug);
  pageFiles.add(game.page_file);

  if (!(await exists(path.join(root, game.page_file)))) errors.push(`Missing page: ${game.page_file}.`);
  if (!(await exists(path.join(root, ...normalize(game.asset_dir).split("/"))))) errors.push(`Missing asset directory: ${game.asset_dir}.`);
}

const rootEntries = await readdir(root, { withFileTypes: true });
for (const entry of rootEntries) {
  if (entry.isFile() && /^GAME\d{2}_.+\.html$/.test(entry.name) && !pageFiles.has(entry.name)) {
    errors.push(`Unregistered game page: ${entry.name}.`);
  }
}

const assetRootEntries = await readdir(path.join(root, "assets"), { withFileTypes: true });
for (const entry of assetRootEntries) {
  if (!entry.isFile()) continue;
  if (/^(?:prisma-|kanji-crash-|char-face-|monster-)/.test(entry.name)) {
    errors.push(`Page-specific image must not remain at assets root: assets/${entry.name}.`);
  }
}

const scanFiles = [
  "index.html",
  "styles.css",
  "scripts/prisma-characters.js",
  "developer/news-editor.js",
  ...games.map((game) => game.page_file)
];

const referencedAssets = new Set();
for (const relativeFile of scanFiles) {
  const source = await readFile(path.join(root, relativeFile), "utf8");
  for (const match of source.matchAll(/(?:\.\/|\.\.\/)?assets\/[A-Za-z0-9_./-]+\.(?:avif|gif|ico|jpe?g|png|svg|webp)/gi)) {
    let value = match[0].replace(/^\.\.\//, "").replace(/^\.\//, "");
    referencedAssets.add(value);
  }
  for (const game of games) {
    for (const legacy of game.legacy_page_files || []) {
      if (source.includes(legacy)) errors.push(`${relativeFile}: legacy page URL remains: ${legacy}.`);
    }
  }
}

for (const asset of referencedAssets) {
  if (!(await exists(path.join(root, ...asset.split("/"))))) errors.push(`Missing referenced asset: ${asset}.`);
}

const newsSource = await readFile(path.join(root, "scripts", "news-data.js"), "utf8");
const newsContext = { window: {} };
vm.createContext(newsContext);
vm.runInContext(newsSource, newsContext, { filename: "scripts/news-data.js" });
const posts = newsContext.window.NEWS_POSTS;
if (!Array.isArray(posts) || !posts.length) {
  errors.push("scripts/news-data.js must contain at least one NEWS_POSTS entry.");
} else {
  for (const post of posts) {
    if (!post.id || !post.date || !post.title || !post.url) errors.push(`Incomplete news record: ${post.id || "(unknown)"}.`);
    const relativeArticle = String(post.url || "").replace(/^\.\//, "");
    if (relativeArticle && !(await exists(path.join(root, ...relativeArticle.split("/"))))) {
      errors.push(`Missing news article: ${post.url}.`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Structure validation passed: ${games.length} game pages, ${referencedAssets.size} referenced assets, ${posts.length} news posts.`);
}
