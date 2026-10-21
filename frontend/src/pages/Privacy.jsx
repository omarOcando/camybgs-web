import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import { useLocalePath } from "../config/routes";
import PrivacyEs from "./legal/PrivacyEs";
import PrivacyEn from "./legal/PrivacyEn";

// Política de privacidad en el idioma activo del sitio (español por defecto).
// Ruta: /privacidad (ES) y /en/privacy (EN). /datenschutz redirige a /privacidad.
function Privacy() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";
  const { path } = useLocalePath();

  return (
    <main className="legal">
      <Seo
        title={isEn
          ? "Privacy Policy — CAMY Business Growth Solutions"
          : "Política de privacidad — CAMY Business Growth Solutions"}
        description={isEn
          ? "How CAMY Business Growth Solutions processes personal data on this website."
          : "Cómo trata CAMY Business Growth Solutions los datos personales en este sitio web."}
        page="privacy"
      />
      <div className="legal__inner">
        {isEn ? <PrivacyEn /> : <PrivacyEs />}

        {/* Enlace discreto a la política del demo de Bond (fuera del menú) */}
        <hr className="legal__divider" />
        <p className="legal__footnote">
          <Link className="legal__link" to={path("privacyDemo")}>
            {isEn ? "Bond demo privacy policy" : "Política de privacidad del demo de Bond"}
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Privacy;
