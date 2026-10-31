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
export const SHOW_BOND = false;

// Página de ventas de Bond (/bond y /en/bond), independiente de SHOW_BOND: es
// una página oculta, sin menú, noindex y fuera del sitemap. Con false redirige
// a la Home (en npm run dev se ve siempre).
export const SHOW_BOND_PAGE = false;

// Partes de la página de ventas ocultas hasta confirmarlas: el caso real
// (sección 6), la línea del contrato de tratamiento de datos, AVV (sección 10),
// el marketing con Systeme (línea de la sección 9, y Systeme como proveedor en
// la pregunta "¿Quién más trata los datos?") y el vídeo de /en/bond, hasta tener
// la versión en inglés (en /bond se ve siempre).
export const SHOW_BOND_CASE      = false;
export const SHOW_BOND_AVV       = false;
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

export const BOND_SALES_URL = "#PENDIENTE-pago";
export const BOND_DEMO_URL  = "#PENDIENTE-demo";
