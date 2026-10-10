// Convertit products.csv (séparateur « ; », UTF-8) en src/data/products.json.
// Usage : npm run catalogue. Source de données unique de la boutique.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csv = readFileSync(join(root, "products.csv"), "utf8").replace(/^﻿/, "");

const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Parse un CSV à séparateur « ; » (guillemets doubles gérés). */
function parse(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ";") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((v) => v !== "")) rows.push(row);
  return rows;
}

// Familles de la boutique (src/data/categories.ts), lues sans dépendance TypeScript.
const catSrc = readFileSync(join(root, "src/data/categories.ts"), "utf8");
const familles = [...catSrc.matchAll(/slug: "([^"]+)",\r?\n\s+name: "([^"]+)",\r?\n\s+href: "\/boutique\//g)].map((m) => ({ slug: m[1], name: m[2] }));
const familleBySlug = (label) => {
  const n = norm(label);
  return familles.find((f) => norm(f.name) === n || f.slug === slugify(label));
};

const [head, ...lines] = parse(csv);
const col = Object.fromEntries(head.map((h, i) => [h.trim(), i]));
for (const k of ["id", "nom", "marque", "categorie", "prix_fcfa", "stock"]) {
  if (!(k in col)) { console.error(`Colonne manquante : ${k}`); process.exit(1); }
}

const out = [];
const skipped = [];
const issues = [];
const slugs = new Set();

for (const r of lines) {
  const g = (k) => (r[col[k]] ?? "").trim();
  const id = g("id");
  const problems = [];
  // Prix vide = « Prix bientôt disponible » (achat désactivé) ; sinon entier > 0.
  const price = g("prix_fcfa") === "" ? undefined : Number(g("prix_fcfa"));
  if (price !== undefined && (!Number.isInteger(price) || price <= 0)) problems.push(`prix invalide « ${g("prix_fcfa")} »`);
  const old = g("ancien_prix_fcfa");
  if (old && (price === undefined || !Number.isInteger(Number(old)) || Number(old) <= price)) problems.push(`ancien prix incohérent « ${old} »`);
  const fam = familleBySlug(g("categorie"));
  if (!fam) problems.push(`catégorie inconnue « ${g("categorie")} »`);
  const aussi = g("aussi_dans").split(/[,/]/).map((s) => s.trim()).filter(Boolean).map((l) => {
    const f = familleBySlug(l);
    if (!f) problems.push(`aussi_dans inconnue « ${l} »`);
    return f?.slug;
  }).filter(Boolean);
  const stock = norm(g("stock"));
  if (!["disponible", "indisponible"].includes(stock)) problems.push(`stock inconnu « ${g("stock")} »`);
  if (!g("nom") || !g("marque")) problems.push("nom ou marque vide");
  const def = g("image_definitive");
  let slug = slugify(`${g("marque")} ${g("nom")}`);
  if (slugs.has(slug)) problems.push(`slug en double « ${slug} »`);
  if (problems.length) { issues.push(`${id} ${g("nom")} : ${problems.join(" ; ")}`); continue; }
  slugs.add(slug);
  const badge = g("badge");
  out.push({
    id,
    slug,
    name: g("nom"),
    brand: g("marque"),
    famille: fam.slug,
    aussiDans: aussi.filter((s) => s !== fam.slug),
    ...(g("format") && { format: g("format") }),
    ...(price !== undefined && { price }),
    ...(old && { oldPrice: Number(old) }),
    stock,
    ...(g("description") && { description: g("description") }),
    ...(def && { image: `/products/${def}` }),
    ...(badge && { badge }),
  });
}

// Ordre d'affichage : catégorie (ordre de la boutique), marque, nom.
const famOrder = new Map(familles.map((f, i) => [f.slug, i]));
const cmp = (a, b) => a.localeCompare(b, "fr", { sensitivity: "base" });
out.sort((a, b) => (famOrder.get(a.famille) - famOrder.get(b.famille)) || cmp(a.brand, b.brand) || cmp(a.name, b.name));

writeFileSync(join(root, "src/data/products.json"), JSON.stringify(out, null, 2) + "\n");
writeFileSync(join(root, "src/data/catalogue-meta.json"), JSON.stringify({ promos: out.filter((p) => p.oldPrice).length }, null, 2) + "\n");
console.log(`${out.length} produit(s) écrit(s) dans src/data/products.json`);
if (skipped.length) console.log(`\nIgnorés (a_verifier) :\n- ${skipped.join("\n- ")}`);
if (issues.length) console.log(`\nLignes incohérentes (non importées) :\n- ${issues.join("\n- ")}`);
