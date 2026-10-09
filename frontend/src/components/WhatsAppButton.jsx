import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONTACT } from "../config/site";
import waIcon from "../assets/images/BolaWA.png";

function WhatsAppButton() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contacto") return null;

  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn${visible ? " whatsapp-btn--visible" : ""}`}
      aria-label={`${t("common.whatsappButton")} ${t("common.newTab")}`}
    >
      <img src={waIcon} alt="" />
    </a>
  );
}

export default WhatsAppButton;
