import { useLocation } from "react-router-dom";

// ─── RUTAS POR IDIOMA ────────────────────────────────────────────────────────
// Fuente única de las direcciones de cada página. El español va sin prefijo;
// el inglés, bajo /en con las rutas traducidas. El idioma lo decide la URL
// (nadie es redirigido según el navegador).

export const LANGS = ["es", "en"];
export const DEFAULT_LANG = "es";

export const ROUTES = {
  home:        { es: "/",            en: "/en" },
  servicios:   { es: "/servicios",   en: "/en/services" },
  bond:        { es: "/bond",        en: "/en/bond" },
  proyectos:   { es: "/proyectos",   en: "/en/projects" },
  sobreMi:     { es: "/sobre-mi",    en: "/en/about" },
  contacto:    { es: "/contacto",    en: "/en/contact" },
  impressum:   { es: "/impressum",   en: "/en/impressum" },
  datenschutz: { es: "/datenschutz", en: "/en/privacy" },
};

const normalize = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

// Idioma de una dirección: /en y /en/... son inglés; el resto, español
export function langFromPath(pathname) {
  const p = normalize(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : DEFAULT_LANG;
}

// Página (clave de ROUTES) a la que corresponde una dirección, o null
export function pageFromPath(pathname) {
  const p = normalize(pathname);
  for (const [page, paths] of Object.entries(ROUTES)) {
    if (Object.values(paths).includes(p)) return page;
  }
  return null;
}

export const pathFor = (page, lang) => ROUTES[page][lang] ?? ROUTES[page][DEFAULT_LANG];

// Idioma actual (según la URL) y función para obtener la dirección de una
// página en ese idioma: const { lang, path } = useLocalePath(); path("contacto")
export function useLocalePath() {
  const lang = langFromPath(useLocation().pathname);
  return { lang, path: (page) => pathFor(page, lang) };
}
