// ─── CONFIGURACIÓN DEL SITIO ─────────────────────────────────────────────────
// Datos y interruptores (no textos: los textos van en locales/es.json).

// Lead magnet: popup y botón flotante. Desactivados hasta que exista el nuevo
// test "¿Tu web dice lo que eres?"; para reactivarlos basta con poner true y
// cambiar la URL.
export const SHOW_LEAD_POPUP     = false;
export const SHOW_LEAD_FLOAT_BTN = false;
export const LEAD_MAGNET_URL     = "https://omar-ocando.systeme.io/mini-auditoria";

export const CONTACT = {
  whatsapp: "491778587715",
  phone:    "+491778587715",
  telegram: "https://t.me/camybgs",
  signal:   "https://signal.me/#eu/mo9KAFhNA6tBa1SyzGaPQ_iVoc_LUJPN9xAN6-CcfHxmDv2Xs31LtKi0FmkmrjVE",
  email:    "info@camybgs.com",
};

// Interruptor de Bond. Con false desaparece de toda la web: menú y footer,
// sección de la Home, panel y pregunta del FAQ de Servicios y opción del
// formulario; /bond redirige a la Home. Al cambiarlo, actualizar también a
// mano public/sitemap.xml y el serviceType del JSON-LD de index.html
// (README.md, "Activar Bond").
export const SHOW_BOND = true;

// Página de ventas de Bond (/descubre-bond y /en/discover-bond): es una página
// oculta, sin menú, noindex y fuera del sitemap. Con false redirige a la Home
// (en npm run dev se ve siempre). Se activa a la vez que SHOW_BOND: los botones
// de /bond llevan aquí y, con false, acabarían en la Home.
export const SHOW_BOND_PAGE = true;

// Versión en inglés de la página de ventas (/en/discover-bond), oculta hasta
// tener sus túneles en inglés. Con false: /en/discover-bond redirige a /en/bond,
// /en/bond no muestra los botones "Discover Bond in detail", el selector de
// idioma de /descubre-bond lleva a /en/bond y no se prerenderiza (añadir también
// su rewrite en render.yaml al activarlo). En npm run dev se ve siempre.
// Los textos en inglés se conservan en en.json.
export const SHOW_BOND_PAGE_EN = false;

// Partes de la página de ventas ocultas hasta confirmarlas: el caso real
// (sección 6), el marketing con Systeme (línea de la sección 9, y Systeme como proveedor en
// la pregunta "¿Quién más trata los datos?") y el vídeo de /en/discover-bond,
// hasta tener la versión en inglés (en /descubre-bond se ve siempre).
export const SHOW_BOND_CASE      = false;
// Línea del contrato de encargado del tratamiento, AVV/DPA (sección 10): activada
export const SHOW_BOND_AVV       = true;
export const SHOW_BOND_MARKETING = false;
export const SHOW_BOND_VIDEO_EN  = false;

// Menú principal (cabecera y footer). key es la página de config/routes.js
// (la dirección depende del idioma) y el texto está en nav.links.<key>
export const NAV_LINKS = [
  { key: "home", end: true },
  { key: "services" },
  { key: "bond" },
  { key: "projects" },
  { key: "about" },
  { key: "contact" },
].filter((link) => SHOW_BOND || link.key !== "bond");

export const BOND_SALES_URL = "https://shop.camybgs.com/bond-montaje";
export const BOND_DEMO_URL  = "https://my.camybgs.com/demo-bond";

// Imagen al compartir /bond y /descubre-bond (props de <Seo />). Lleva el texto
// en español: las versiones en inglés siguen con og-image.jpg. Mide 1200×630,
// como og-image.jpg; og:image:width y og:image:height vienen de index.html.
export const BOND_SHARE_IMAGE_ES = {
  image: "https://www.camybgs.com/bond-ventas-redes.jpg",
  imageAlt: "Bond, la plataforma de gestión para coaches",
};
