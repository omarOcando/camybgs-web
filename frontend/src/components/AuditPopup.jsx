import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import mockupSrc from "../assets/images/mockupMiniAuditoria.png";
import { LEAD_MAGNET_URL } from "../config/site";

const DELAY_MS   = 20000;
const SESSION_KEY = "auditPopupSeen";

function AuditPopup() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setAnimate(true));
    }, DELAY_MS);

    return () => clearTimeout(t);
  }, []);

  function close() {
    setAnimate(false);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 350);
  }

  if (!visible) return null;

  return (
    <div className={`audit-popup__overlay${animate ? " audit-popup__overlay--in" : ""}`}>
      <div
        className={`audit-popup${animate ? " audit-popup--in" : ""}`}
      >
        <button className="audit-popup__close" onClick={close} aria-label={t("leadMagnet.popup.close")}>✕</button>

        <p className="audit-popup__title serif">{t("leadMagnet.popup.title")}</p>
        <p className="audit-popup__tagline">
          {t("leadMagnet.popup.taglineLine1")}<br />{t("leadMagnet.popup.taglineLine2")}
        </p>

        <img src={mockupSrc} alt={t("leadMagnet.popup.mockupAlt")} className="audit-popup__mockup" />

        <a
          href={LEAD_MAGNET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--primary button--lg"
        >
          {t("leadMagnet.popup.cta")} <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>
  );
}

export default AuditPopup;
