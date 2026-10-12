import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { useLocalePath } from "../config/routes";

// Destino del enlace del email de confirmación (doble opt-in). La API
// api/confirm-consent redirige aquí con ?status=confirmed|already|error.
const STATUSES = ["confirmed", "already", "error"];

function ConfirmSubscription() {
  const { t } = useTranslation();
  const { path } = useLocalePath();
  const [params] = useSearchParams();
  const status = STATUSES.includes(params.get("status")) ? params.get("status") : "error";
  const isError = status === "error";

  return (
    <div className="confirm-subscription">
      <Seo
        title={t("seo.confirmSubscription.title")}
        description={t("seo.confirmSubscription.description")}
        page="confirmSubscription"
        noindex
      />

      <section className="csub-hero">
        <div className="csub-hero__inner">
          <h1 className="csub-hero__title">{t(`confirmSubscription.${status}.title`)}</h1>
          <p className="csub-hero__sub">{t(`confirmSubscription.${status}.text`)}</p>
          <Button to={path(isError ? "contact" : "home")} variant="primary" size="lg">
            {t(isError ? "confirmSubscription.ctaContact" : "confirmSubscription.ctaHome")}{" "}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmSubscription;
