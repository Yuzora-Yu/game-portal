import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "dist");
const excluded = new Set([
  ".git",
  ".github",
  "node_modules",
  "dist",
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

console.log("Build complete: static game portal copied to dist/.");
