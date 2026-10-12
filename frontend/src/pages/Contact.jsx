import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { submitContact } from "../services/contactService";
import { CONTACT, SHOW_BOND } from "../config/site";
import { INTEREST_VALUES } from "../../lib/interests.js";
import { getEmailConsentText } from "../../lib/consentText.js";
import { useLocalePath } from "../config/routes";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

// Campos de texto del formulario (el desplegable "interest" va aparte)
const TEXT_FIELDS = [
  { name: "name",       type: "text"  },
  { name: "email",      type: "email" },
  { name: "profession", type: "text"  },
];

const EMPTY_FORM = { name: "", email: "", profession: "", interest: "", message: "" };

// ─── HOOK ────────────────────────────────────────────────────────────────────

function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    const rafId = requestAnimationFrame(() => obs.observe(el));
    return () => { cancelAnimationFrame(rafId); obs.disconnect(); };
  }, []);
  return { ref, visible };
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Contact() {
  const { t, i18n } = useTranslation();
  const { path } = useLocalePath();
  const [form, setForm]     = useState(EMPTY_FORM);
  const [emailConsent, setEmailConsent] = useState(false); // casilla opcional de campañas
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState("");

  const { ref: formsTitleRef, visible: formsTitleVisible } = useVisible(0.2);
  const { ref: colsRef,       visible: colsVisible       } = useVisible(0.1);
  const { ref: stepsTitleRef, visible: stepsTitleVisible } = useVisible(0.2);
  const { ref: stepsRef,      visible: stepsVisible      } = useVisible(0.1);
  const { ref: dataRef,       visible: dataVisible       } = useVisible(0.15);

  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t("contact.whatsapp.message"))}`;
  const steps = t("contact.steps.items", { returnObjects: true });
  const dataItems = [
    { key: "email",    value: CONTACT.email,             href: `mailto:${CONTACT.email}` },
    { key: "whatsapp", value: "+49 177 858 7715",        href: waUrl },
    { key: "location", value: t("contact.data.locationValue"), href: null },
  ];

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(form).some(v => !v.trim())) {
      setError(t("contact.form.errorRequired"));
      return;
    }
    setSending(true);
    try {
      await submitContact({ ...form, emailConsent, lang: i18n.resolvedLanguage });
      setSent(true);
    } catch {
      setError(t("contact.form.errorSend"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact">
      <Seo
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
        page="contact"
      />

      {/* 01 — HERO */}
      <section className="ctc-hero">
        <div className="ctc-hero__inner">
          <h1 className="ctc-hero__title">{t("contact.hero.title")}</h1>
          <p className="ctc-hero__sub">{t("contact.hero.subtitle")}</p>
        </div>
      </section>

      {/* 02 — FORMAS DE CONTACTO */}
      <section className="ctc-forms">
        <div className="ctc-section-inner">
          <h2
            ref={formsTitleRef}
            className={`ctc-forms__title${formsTitleVisible ? " ctc-forms__title--visible" : ""}`}
          >
            {t("contact.intro.title")}
          </h2>
          <p className="ctc-forms__sub">{t("contact.intro.subtitle")}</p>

          <div ref={colsRef} className={`ctc-cols${colsVisible ? " ctc-cols--visible" : ""}`}>

            {/* ── Columna izquierda — Formulario ── */}
            <div className="ctc-col">
              <h3 className="ctc-col__title">{t("contact.form.title")}</h3>

              {sent ? (
                <div className="ctc-success">
                  <p className="ctc-success__headline">{t("contact.success.headline")}</p>
                  <p className="ctc-success__text">{t("contact.success.text1")}</p>
                  {emailConsent && (
                    <p className="ctc-success__text">{t("contact.success.consentPending")}</p>
                  )}
                  <p className="ctc-success__text">{t("contact.success.text2")}</p>
                  <Button to={path("projects")} variant="primary" size="lg">
                    {t("contact.success.cta")} <span className="btn-arrow" aria-hidden="true">→</span>
                  </Button>
                </div>
              ) : (
                <form className="ctc-form" onSubmit={handleSubmit} noValidate>
                  {TEXT_FIELDS.map(f => (
                    <div key={f.name} className="ctc-form__field">
                      <label className="ctc-form__label" htmlFor={`ctc-${f.name}`}>
                        {t(`contact.form.fields.${f.name}.label`)}
                      </label>
                      <input
                        className="ctc-form__input"
                        id={`ctc-${f.name}`}
                        name={f.name}
                        type={f.type}
                        placeholder={t(`contact.form.fields.${f.name}.placeholder`)}
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-interest">
                      {t("contact.form.fields.interest.label")}
                    </label>
                    <select
                      className="ctc-form__input ctc-form__input--select"
                      id="ctc-interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>{t("contact.form.fields.interest.placeholder")}</option>
                      {INTEREST_VALUES.filter(v => SHOW_BOND || v !== "bond").map(v => (
                        <option key={v} value={v}>{t(`contact.form.interestOptions.${v}`)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-message">
                      {t("contact.form.fields.message.label")}
                    </label>
                    <textarea
                      className="ctc-form__input ctc-form__input--textarea"
                      id="ctc-message"
                      name="message"
                      placeholder={t("contact.form.fields.message.placeholder")}
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Consentimiento opcional para campañas por email (desmarcado por defecto).
                      El texto sale de lib/consentText.js, no de es.json: es el que se guarda como prueba */}
                  <label className="ctc-form__consent">
                    <input
                      type="checkbox"
                      className="ctc-form__checkbox"
                      checked={emailConsent}
                      onChange={(e) => setEmailConsent(e.target.checked)}
                    />
                    <span>{getEmailConsentText(i18n.resolvedLanguage).text}</span>
                  </label>

                  {error && <p className="ctc-form__error" role="alert">{error}</p>}

                  <p className="ctc-form__privacy">
                    {t("contact.form.privacy")}{" "}
                    <Link to={path("privacy")} className="ctc-form__privacy-link">
                      {t("contact.form.privacyLink")}
                    </Link>.
                  </p>

                  <Button type="submit" variant="primary" size="lg" disabled={sending}>
                    {sending
                      ? t("contact.form.sending")
                      : <>{t("contact.form.submit")} <span className="btn-arrow" aria-hidden="true">→</span></>}
                  </Button>
                </form>
              )}
            </div>

            {/* ── Columna derecha — WhatsApp ── */}
            <div className="ctc-col ctc-col--wa">
              <h3 className="ctc-col__title">{t("contact.whatsapp.title")}</h3>
              <div className="ctc-wa-card">
                <svg className="ctc-wa-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path fill="white" d="M24 10.4C16.5 10.4 10.4 16.5 10.4 24c0 2.4.6 4.6 1.7 6.6L10 38l7.6-2c1.8 1 3.9 1.6 6.1 1.6 7.5 0 13.6-6.1 13.6-13.6S31.5 10.4 24 10.4zm7.8 19.3c-.3.9-1.8 1.7-2.5 1.8-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5-6-5.3-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .7.5.3.7.9 2.2 1 2.4.1.2.2.4 0 .7-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.4.2.6.1.8-.1.3-.3.8-.9 1.1-1.2.3-.3.5-.2.9-.1.4.1 2.4 1.1 2.8 1.3.4.2.7.3.8.5.1.4-.1 1.6-.4 2.2z"/>
                </svg>
                <p className="ctc-wa-text">{t("contact.whatsapp.text")}</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="button button--lg ctc-wa-btn">
                  {t("contact.whatsapp.cta")} <span className="btn-arrow" aria-hidden="true">→</span>
                  <span className="visually-hidden"> {t("common.newTab")}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 03 — QUÉ PASA DESPUÉS */}
      <section className="ctc-steps">
        <div className="ctc-section-inner">
          <h2
            ref={stepsTitleRef}
            className={`ctc-steps__title${stepsTitleVisible ? " ctc-steps__title--visible" : ""}`}
          >
            {t("contact.steps.title")}
          </h2>
          <ol ref={stepsRef} className={`ctc-steps__grid${stepsVisible ? " ctc-steps__grid--visible" : ""}`}>
            {steps.map((desc, i) => (
              <li key={desc} className="ctc-step">
                <span className="ctc-step__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="ctc-step__desc">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — DATOS DIRECTOS */}
      <section className="ctc-data">
        <div
          ref={dataRef}
          className={`ctc-section-inner ctc-data__inner${dataVisible ? " ctc-data__inner--visible" : ""}`}
        >
          <div className="ctc-data__grid">
            {dataItems.map(item => (
              <div key={item.key} className="ctc-data-item">
                <span className="ctc-data-item__label">{t(`contact.data.${item.key}`)}</span>
                {item.href
                  ? <a
                      href={item.href}
                      className="ctc-data-item__value ctc-data-item__value--link"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  : <span className="ctc-data-item__value">{item.value}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
