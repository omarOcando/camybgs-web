import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PrivacyDemoEs from "./legal/PrivacyDemoEs";
import PrivacyDemoEn from "./legal/PrivacyDemoEn";

// Política de privacidad del demo de Bond en el idioma activo del sitio.
// Ruta: /privacidad-demo (ES) y /en/privacy-demo (EN). Fuera del menú, del
// sitemap y de los buscadores (noindex); se enlaza desde el pie de /privacidad.
function PrivacyDemo() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";

  return (
    <main className="legal">
      <Seo
        title={isEn
          ? "Bond Demo Privacy Policy — CAMY Business Growth Solutions"
          : "Política de privacidad del demo de Bond — CAMY Business Growth Solutions"}
        description={isEn
          ? "How personal data is processed in the Bond demo at demo.camybgs.com."
          : "Cómo se tratan los datos personales en el demo de Bond (demo.camybgs.com)."}
        page="privacyDemo"
        noindex
      />
      <div className="legal__inner">
        {isEn ? <PrivacyDemoEn /> : <PrivacyDemoEs />}
      </div>
    </main>
  );
}

export default PrivacyDemo;
