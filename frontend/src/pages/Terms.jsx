import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import TermsEs from "./legal/TermsEs";
import TermsEn from "./legal/TermsEn";

// Condiciones generales en el idioma activo del sitio (español por defecto).
// Ruta: /condiciones (ES) y /en/terms (EN).
function Terms() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";

  return (
    <main className="legal">
      <Seo
        title={isEn ? "Terms and Conditions · CAMY" : "Condiciones generales · CAMY"}
        description={isEn
          ? "General terms and conditions for the web design, development and maintenance services of CAMY Business Growth Solutions."
          : "Condiciones generales de los servicios de diseño, desarrollo y mantenimiento web de CAMY Business Growth Solutions."}
        page="terms"
      />
      <div className="legal__inner">
        {isEn ? <TermsEn /> : <TermsEs />}
      </div>
    </main>
  );
}

export default Terms;
