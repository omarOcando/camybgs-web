import { useState, useEffect, useRef, useId } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";
import { CONTACT } from "../config/site";

// ─── OPCIONES ────────────────────────────────────────────────────────────────
// angle: posición alrededor del botón en grados (0° = derecha, sentido horario).
// Arriba: 215° y 325°. Abajo: 35° y 145°.

const ITEMS = [
  { id: "whatsapp", Icon: FaWhatsapp,        angle: 215, href: `https://wa.me/${CONTACT.whatsapp}` },
  { id: "phone",    Icon: FaPhoneAlt,        angle: 325, href: `tel:${CONTACT.phone}` },
  { id: "telegram", Icon: FaTelegramPlane,   angle: 35,  href: CONTACT.telegram },
  { id: "signal",   Icon: FaSignalMessenger, angle: 145, href: CONTACT.signal },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function ContactRadial({ className = "" }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef      = useRef(null);
  const triggerRef   = useRef(null);
  const firstItemRef = useRef(null);
  const listId       = useId();

  // Cierre al pulsar fuera o con Esc
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Al abrir, el foco pasa al primer icono
  useEffect(() => {
    if (open) firstItemRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`contact-radial${open ? " contact-radial--open" : ""}${className ? ` ${className}` : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="button button--primary button--lg contact-radial__trigger"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(o => !o)}
      >
        {t("home.hero.cta")} <span className="btn-arrow">→</span>
      </button>

      <ul id={listId} className="contact-radial__items" aria-label={t("home.hero.ctaMenuLabel")}>
        {ITEMS.map((item, i) => {
          const { id, Icon, angle, href } = item;
          const label   = t(`home.hero.contactOptions.${id}`);
          const isWeb   = href.startsWith("http");
          const isBelow = angle > 0 && angle < 180;
          return (
            <li
              key={id}
              className={`contact-radial__slot${isBelow ? " contact-radial__slot--below" : ""}`}
              style={{ "--i": i, "--deg": angle }}
            >
              <a
                ref={i === 0 ? firstItemRef : undefined}
                href={href}
                className={`contact-radial__item contact-radial__item--${id}`}
                aria-label={label}
                tabIndex={open ? 0 : -1}
                target={isWeb ? "_blank" : undefined}
                rel={isWeb ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon aria-hidden="true" className="contact-radial__icon" />
                <span className="contact-radial__tooltip" aria-hidden="true">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContactRadial;
