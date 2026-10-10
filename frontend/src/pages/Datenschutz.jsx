import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import PrivacyEs from "./legal/PrivacyEs";
import PrivacyEn from "./legal/PrivacyEn";

// Política de privacidad en el idioma activo del sitio (español por defecto).
// La ruta sigue siendo /datenschutz para no romper enlaces existentes.
function Datenschutz() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";

  return (
    <main className="legal">
      <Seo
        title={isEn
          ? "Privacy Policy — CAMY Business Growth Solutions"
          : "Política de privacidad — CAMY Business Growth Solutions"}
        description={isEn
          ? "How CAMY Business Growth Solutions processes personal data on this website."
          : "Cómo trata CAMY Business Growth Solutions los datos personales en este sitio web."}
        page="datenschutz"
      />
      <div className="legal__inner">
        {isEn ? <PrivacyEn /> : <PrivacyEs />}
      </div>
    </main>
  );
}

export default Datenschutz;
