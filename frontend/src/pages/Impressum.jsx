import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import ImpressumEs from "./legal/ImpressumEs";
import ImpressumEn from "./legal/ImpressumEn";

// Muestra el Impressum en el idioma activo del sitio (español por defecto)
function Impressum() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === "en";

  return (
    <main className="legal">
      <Seo
        title="Impressum — CAMY Business Growth Solutions"
        description={isEn
          ? "Legal notice pursuant to § 5 DDG for CAMY Business Growth Solutions, Omar Jose Ocando Mederos."
          : "Información legal conforme al § 5 DDG de CAMY Business Growth Solutions, Omar Jose Ocando Mederos."}
        path="/impressum"
      />
      <div className="legal__inner">
        {isEn ? <ImpressumEn /> : <ImpressumEs />}
      </div>
    </main>
  );
}

export default Impressum;
