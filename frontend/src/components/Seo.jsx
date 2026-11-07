import { Helmet } from "react-helmet-async";
import { LANGS, DEFAULT_LANG, pathFor, useLocalePath } from "../config/routes";

const SITE_URL = "https://www.camybgs.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const OG_LOCALE = { es: "es_ES", en: "en_GB" };

// page: clave de config/routes.js. La dirección canónica es la del idioma
// actual, con enlaces hreflang a la otra versión (x-default: español).
// noindex: páginas que no deben salir en buscadores (tampoco van al sitemap);
// sin canonical ni hreflang. Siempre queda un solo robots y un solo title.
// imageAlt: texto alternativo de la imagen al compartir (solo si se pasa).
function Seo({ title, description, page = "home", image = DEFAULT_IMAGE, imageAlt, noindex = false }) {
  const { lang } = useLocalePath();
  const url = `${SITE_URL}${pathFor(page, lang)}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex" : "index, follow"} />
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex && LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}${pathFor(page, l)}`} />
      ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${pathFor(page, DEFAULT_LANG)}`} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:locale" content={OG_LOCALE[lang]} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
    </Helmet>
  );
}

export default Seo;
