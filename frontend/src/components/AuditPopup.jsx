import { useEffect, useState } from "react";
import mockupSrc from "../assets/images/mockupMiniAuditoria.png";

const DELAY_MS   = 20000;
const SESSION_KEY = "auditPopupSeen";

function AuditPopup() {
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
        <button className="audit-popup__close" onClick={close} aria-label="Cerrar">✕</button>

        <p className="audit-popup__title serif">¿Sabes cómo te ve internet?</p>
        <p className="audit-popup__tagline">
          Solicita tu mini auditoría gratuita<br />de tu presencia digital
        </p>

        <img src={mockupSrc} alt="Mini Auditoría CAMY" className="audit-popup__mockup" />

        <a
          href="https://omar-ocando.systeme.io/mini-auditoria"
          target="_blank"
          rel="noopener noreferrer"
          className="button button--primary button--lg"
        >
          Quiero mi auditoría gratis <span className="btn-arrow">→</span>
        </a>
      </div>
    </div>
  );
}

export default AuditPopup;
