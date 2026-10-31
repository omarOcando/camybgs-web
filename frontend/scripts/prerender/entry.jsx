import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../../src/locales/es.json";
import en from "../../src/locales/en.json";
import { LANGS, ROUTES } from "../../src/config/routes";
import Home from "../../src/pages/Home";
import Services from "../../src/pages/Services";
import Bond from "../../src/pages/Bond";
import Projects from "../../src/pages/Projects";
import About from "../../src/pages/About";
import Contact from "../../src/pages/Contact";
import Impressum from "../../src/pages/Impressum";
import Privacy from "../../src/pages/Privacy";
import Terms from "../../src/pages/Terms";
import { takeCaptured } from "./helmet-capture";

// Páginas que se prerenderizan: las del sitemap y Bond, que está fuera de él
// pero necesita su noindex en el HTML inicial. Fuera queda la confirmación de
// suscripción (noindex).
const PAGES = {
  home: Home,
  services: Services,
  bond: Bond,
  projects: Projects,
  about: About,
  contact: Contact,
  impressum: Impressum,
  privacy: Privacy,
  terms: Terms,
};

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Nombres de props de React → atributos HTML
const ATTR_NAMES = { hrefLang: "hreflang" };

function toHtml(element) {
  const { children, ...props } = element.props;
  // El título puede llegar como texto o como varios trozos
  if (element.type === "title") {
    return `<title data-seo-static>${escapeHtml([children].flat().join(""))}</title>`;
  }
  const attrs = Object.entries(props)
    .map(([name, value]) => `${ATTR_NAMES[name] ?? name}="${escapeHtml(value)}"`)
    .join(" ");
  return `<${element.type} data-seo-static ${attrs} />`;
}

// [{ path, lang, tags }] con las etiquetas del <head> de cada página
export async function renderPages() {
  const result = [];
  for (const lang of LANGS) {
    await i18n.changeLanguage(lang);
    for (const [page, Page] of Object.entries(PAGES)) {
      const path = ROUTES[page][lang];
      takeCaptured();
      renderToStaticMarkup(
        <StaticRouter location={path}>
          <Page active={false} />
        </StaticRouter>
      );
      const elements = takeCaptured();
      const htmlLang = elements.find((el) => el.type === "html")?.props.lang ?? lang;
      const tags = elements.filter((el) => el.type !== "html").map(toHtml);
      result.push({ path, lang: htmlLang, tags });
    }
  }
  return result;
}
