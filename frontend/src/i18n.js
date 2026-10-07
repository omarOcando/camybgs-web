import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";

// ─── IDIOMAS ─────────────────────────────────────────────────────────────────
// Por ahora solo español. Para añadir inglés: crear locales/en.json y
// registrarlo aquí en `resources` (en: { translation: en }).

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

export default i18n;
