import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { build } from "vite";

// ─── PRERENDERIZADO DEL <head> ───────────────────────────────────────────────
// Se ejecuta después de "vite build" (npm run build:render). Para cada página
// pública escribe dist/<ruta>/index.html con su idioma, título, descripción,
// canonical, hreflang y etiquetas og/twitter, para quien no ejecuta
// JavaScript (vistas previas de WhatsApp y redes, primera lectura de los
// buscadores).
//
// El cuerpo no se toca: <div id="root"> sigue vacío y el navegador arranca
// igual que siempre (loader y animaciones incluidos). Las etiquetas llevan
// data-seo-static, así que main.jsx las quita al arrancar y <Seo /> pone las
// suyas, como con las de index.html.
//
// Las etiquetas salen del propio <Seo /> de cada página: se renderiza en Node
// con react-helmet-async sustituido por un capturador (prerender/helmet-capture.jsx).

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "node_modules/.prerender");

// 1. Compilar la entrada del prerenderizado para Node
await build({
  root,
  logLevel: "warn",
  resolve: {
    alias: { "react-helmet-async": path.join(root, "scripts/prerender/helmet-capture.jsx") },
  },
  build: {
    ssr: path.join(root, "scripts/prerender/entry.jsx"),
    outDir: ssrDir,
    emptyOutDir: true,
  },
});

const { renderPages } = await import(pathToFileURL(path.join(ssrDir, "entry.js")).href);
const pages = await renderPages();

// 2. Quitar del index.html compilado las etiquetas genéricas (data-seo-static)
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const STATIC_TAG = /^[ \t]*(?:<(?:meta|link)\s+data-seo-static\b[\s\S]*?\/?>|<title data-seo-static>[\s\S]*?<\/title>)[ \t]*\n/gm;
const removed = template.match(STATIC_TAG)?.length ?? 0;
const EXPECTED_STATIC_TAGS = 11;
if (removed !== EXPECTED_STATIC_TAGS) {
  throw new Error(
    `[prerender] index.html has ${removed} data-seo-static tags, expected ${EXPECTED_STATIC_TAGS}. ` +
    "If index.html changed on purpose, update EXPECTED_STATIC_TAGS."
  );
}
const base = template.replace(STATIC_TAG, "");

// 3. Un HTML por página, con su idioma y sus etiquetas (tras el viewport,
// donde estaban las genéricas)
const VIEWPORT = /^([ \t]*)<meta name="viewport"[^>]*>\n/m;
if (!VIEWPORT.test(base)) throw new Error("[prerender] viewport meta not found in index.html");

for (const { path: pagePath, lang, tags } of pages) {
  const html = base
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(VIEWPORT, (line, indent) => line + tags.map((tag) => `${indent}${tag}\n`).join(""));

  const outDir = path.join(distDir, pagePath);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`[prerender] ${pagePath} (${lang}, ${tags.length} tags)`);
}

await rm(ssrDir, { recursive: true, force: true });
