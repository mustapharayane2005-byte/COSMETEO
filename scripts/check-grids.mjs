// Contrôle : nombre de produits annoncé = nombre de cartes rendues, sur chaque page catégorie et chaque page marque.
// Usage : npm run build && npm start (autre terminal) puis `npm run check:grids` (BASE_URL=http://localhost:3000 par défaut).
// Échoue (code 1) au moindre écart. Pas de dépendance : lit le HTML rendu par le serveur.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.BASE_URL ?? "http://localhost:3000";
const products = JSON.parse(readFileSync(join(root, "src/data/products.json"), "utf8"));
const slugify = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cats = [...readFileSync(join(root, "src/data/categories.ts"), "utf8").matchAll(/slug: "([^"]+)",\r?\n\s+name: "[^"]+",\r?\n\s+href: "\/boutique\//g)].map((m) => m[1]);
const brands = [...new Set(products.map((p) => p.brand))];

const pages = [
  ...cats.map((c) => ({ url: `/boutique/${c}`, expected: products.filter((p) => p.famille === c || p.aussiDans.includes(c)).length })),
  ...brands.map((b) => ({ url: `/marques/${slugify(b)}`, expected: products.filter((p) => p.brand === b).length })),
  { url: "/boutique", expected: products.length, brandsOnly: true },
  { url: "/nouveautes", expected: null },
];

let fails = 0;
for (const { url, expected, brandsOnly } of pages) {
  const res = await fetch(base + url);
  const html = await res.text();
  if (res.status !== 200) { console.log(`ÉCHEC ${url} : HTTP ${res.status}`); fails++; continue; }
  const grid = html.match(/<ul[^>]*data-cols="[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
  const cards = grid ? new Set([...grid[1].matchAll(/href="\/produit\/([^"]+)"/g)].map((m) => m[1])).size : 0;
  const announced = Number(html.replace(/<!-- -->/g, "").match(/>\s*(\d+)\s+produits?\s*</)?.[1] ?? (grid ? NaN : 0));
  // Réveil par défaut : aucune carte ne doit dépendre d'une classe posée par script.
  const hidden = grid && /data-reveal/.test(grid[1]);
  const ok = (brandsOnly || announced === cards) && (expected === null || cards === expected) && !hidden;
  if (!ok) fails++;
  console.log(`${ok ? "OK    " : "ÉCHEC "}${url.padEnd(34)} annoncé ${announced} | cartes ${cards} | catalogue ${expected ?? "—"}${hidden ? " | data-reveal sur les cartes" : ""}`);
}
console.log(fails ? `\n${fails} page(s) en échec` : `\nToutes les pages sont cohérentes (${pages.length})`);
process.exit(fails ? 1 : 0);
