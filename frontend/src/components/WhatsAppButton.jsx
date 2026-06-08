import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import waIcon from "../assets/images/BolaWA.png";

function WhatsAppButton() {
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
      href="https://wa.me/491778587715"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-btn${visible ? " whatsapp-btn--visible" : ""}`}
      aria-label="Contactar por WhatsApp"
    >
      <img src={waIcon} alt="WhatsApp" />
    </a>
  );
}

export default WhatsAppButton;
