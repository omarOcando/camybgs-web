import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";
import { langFromPath, DEFAULT_LANG } from "./config/routes";

// ─── IDIOMAS ─────────────────────────────────────────────────────────────────
// Textos en locales/<idioma>.json. El idioma lo decide la URL (/en/... es
// inglés): aquí se fija al arrancar y App.jsx lo sincroniza al navegar.

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: langFromPath(window.location.pathname),
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

export default i18n;
