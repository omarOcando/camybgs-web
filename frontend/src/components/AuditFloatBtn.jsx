import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbFileCheck } from "react-icons/tb";
import { LEAD_MAGNET_URL } from "../config/site";

function AuditFloatBtn() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={LEAD_MAGNET_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`audit-float-btn${visible ? " audit-float-btn--visible" : ""}`}
      aria-label={t("leadMagnet.floatBtn.label")}
    >
      <TbFileCheck />
      <span className="audit-float-btn__tooltip">{t("leadMagnet.floatBtn.label")}</span>
    </a>
  );
}

export default AuditFloatBtn;
