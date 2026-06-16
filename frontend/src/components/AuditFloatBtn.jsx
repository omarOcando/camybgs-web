import { useState, useEffect } from "react";
import { TbFileCheck } from "react-icons/tb";

function AuditFloatBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://omar-ocando.systeme.io/mini-auditoria"
      target="_blank"
      rel="noopener noreferrer"
      className={`audit-float-btn${visible ? " audit-float-btn--visible" : ""}`}
      aria-label="Auditoría gratis"
    >
      <TbFileCheck />
      <span className="audit-float-btn__tooltip">Auditoría gratis</span>
    </a>
  );
}

export default AuditFloatBtn;
