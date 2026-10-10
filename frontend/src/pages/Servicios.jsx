import { useState, useEffect, useRef, useId } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { SHOW_BOND } from "../config/site";

// ─── HOOK ────────────────────────────────────────────────────────────────────

function useSection(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    const rafId = requestAnimationFrame(() => obs.observe(el));
    return () => { cancelAnimationFrame(rafId); obs.disconnect(); };
  }, [threshold]);
  return [ref, visible];
}

// Añade el modificador --visible a una clase cuando el bloque ya se ve
const reveal = (base, visible) => `${base}${visible ? ` ${base}--visible` : ""}`;

// ─── FAQ (acordeón) ──────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`srv-faq__item${open ? " srv-faq__item--open" : ""}`}>
      <h3 className="srv-faq__question">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{q}</span>
          <span className="srv-faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="srv-faq__answer"
        inert={!open}
      >
        <div className="srv-faq__answer-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Servicios() {
  const { t } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });

  const [websRef,     websVisible]     = useSection(0.1);
  const [includedRef, includedVisible] = useSection(0.15);
  const [paymentRef,  paymentVisible]  = useSection(0.2);
  const [plansRef,    plansVisible]    = useSection(0.15);
  const [bondRef,     bondVisible]     = useSection(0.2);
  const [faqRef,      faqVisible]      = useSection(0.1);
  const [startRef,    startVisible]    = useSection(0.15);

  const columns = list("servicios.payment.columns");

  return (
    <div className="servicios">
      <Seo
        title={t("seo.servicios.title")}
        description={t("seo.servicios.description")}
        path="/servicios"
      />

      {/* 01 — HERO */}
      <section className="srv-hero">
        <div className="srv-hero__inner">
          <h1 className="srv-hero__title">{t("servicios.hero.title")}</h1>
          <p className="srv-hero__sub">{t("servicios.hero.subtitle")}</p>
        </div>
      </section>

      {/* 02 — TU WEB: ONE · MULTI · CUSTOM */}
      <section className="srv-webs">
        <div className="srv-section-inner">
          <Reveal as="h2" className="srv-section__title srv-section__title--dark">{t("servicios.webs.title")}</Reveal>
          <div ref={websRef} className={reveal("srv-webs__grid", websVisible)}>
            {list("servicios.webs.items").map((w) => (
              <article key={w.name} className="srv-card">
                <h3 className="srv-card__title">{w.name}</h3>
                <p className="srv-card__for">
                  <strong>{t("servicios.webs.labels.for")}</strong> {w.for}
                </p>
                <div className="srv-card__includes">
                  <p className="srv-card__label">{t("servicios.webs.labels.includes")}</p>
                  <p className="srv-card__desc">{w.includes}</p>
                </div>
                <dl className="srv-card__facts">
                  <div>
                    <dt>{t("servicios.webs.labels.duration")}</dt>
                    <dd>{w.duration}</dd>
                  </div>
                  <div>
                    <dt>{t("servicios.webs.labels.price")}</dt>
                    <dd>
                      <strong className="srv-card__price">{w.priceOnce}</strong>
                      <span className="srv-card__price-monthly">{w.priceMonthly}</span>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — INCLUIDO EN TODAS */}
      <section className="srv-included">
        <div className="srv-section-inner srv-included__inner">
          <Reveal as="h2" className="srv-section__title srv-section__title--dark">{t("servicios.included.title")}</Reveal>
          <div ref={includedRef} className={reveal("srv-slide", includedVisible)}>
            <ul className="srv-included__list">
              {list("servicios.included.items").map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="srv-included__extra">
              <strong>{t("servicios.included.extraLabel")}</strong> {t("servicios.included.extra")}
            </p>
          </div>
        </div>
      </section>

      {/* 04 — PAGA COMO PREFIERAS */}
      <section className="srv-payment">
        <div className="srv-section-inner srv-payment__inner">
          <Reveal as="h2" className="srv-section__title srv-section__title--dark">{t("servicios.payment.title")}</Reveal>
          <Reveal as="p" className="srv-section__sub srv-section__sub--dark">{t("servicios.payment.text")}</Reveal>
          <div ref={paymentRef} className={reveal("srv-slide", paymentVisible)}>
            <table className="srv-payment__table">
              <caption className="visually-hidden">{t("servicios.payment.caption")}</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="visually-hidden">{columns.web}</span></th>
                  <th scope="col">{columns.once}</th>
                  <th scope="col">{columns.monthly}</th>
                </tr>
              </thead>
              <tbody>
                {list("servicios.payment.rows").map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td data-label={columns.once}>{r.once}</td>
                    <td data-label={columns.monthly}>{r.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="srv-section__note srv-section__note--dark">{t("servicios.payment.note")}</p>
          </div>
        </div>
      </section>

      {/* 05 — DESPUÉS DEL LANZAMIENTO: BASIC · PLUS */}
      <section className="srv-plans">
        <div className="srv-section-inner srv-plans__inner">
          <Reveal as="h2" className="srv-section__title srv-section__title--dark">{t("servicios.plans.title")}</Reveal>
          <Reveal as="p" className="srv-section__sub srv-section__sub--dark">
            <span className="srv-section__sub-line">{t("servicios.plans.subtitleLine1")}</span>{" "}
            <span className="srv-section__sub-line">{t("servicios.plans.subtitleLine2")}</span>
          </Reveal>
          <div ref={plansRef} className={reveal("srv-plans__grid", plansVisible)}>
            {list("servicios.plans.items").map((p) => (
              <article key={p.name} className="srv-card srv-plan">
                <h3 className="srv-card__title">{p.name}</h3>
                <p className="srv-plan__price">{p.price}</p>
                <p className="srv-card__desc">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="srv-section__note srv-section__note--dark">{t("servicios.plans.note")}</p>
        </div>
      </section>

      {/* 06 — BOND (oculto con SHOW_BOND = false) */}
      {SHOW_BOND && <section className="srv-bond">
        <div className="srv-section-inner srv-bond__inner">
          <div className={reveal("bond-panel-stage", bondVisible)}>
            <div className="bond-panel-stage__halo" aria-hidden="true" />
            <div ref={bondRef} className={reveal("bond-panel", bondVisible)}>
              <span className="bond-panel__tag">
                <span className="bond-panel__tag-star" aria-hidden="true">★</span>
                {t("servicios.bond.tag")}
              </span>
              <p className="bond-panel__kicker">{t("servicios.bond.kicker")}</p>
              <h2 className="bond-panel__title">
                <span className="bond-panel__title-name">{t("servicios.bond.titleName")}</span>{" "}
                <span className="bond-panel__title-tagline">{t("servicios.bond.titleTagline")}</span>
              </h2>
              <p className="bond-panel__text">{t("servicios.bond.text")}</p>
              <ul className="srv-bond__price">
                {list("servicios.bond.price").map((line) => (
                  <li key={line.label}>
                    <strong>{line.label}</strong> {line.value}
                  </li>
                ))}
              </ul>
              <Button to="/bond" variant="primary" size="lg">
                {t("servicios.bond.cta")} <span className="btn-arrow">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>}

      {/* 07 — PREGUNTAS FRECUENTES */}
      <section className="srv-faq">
        <div className="srv-section-inner srv-faq__inner">
          <Reveal as="h2" className="srv-section__title srv-section__title--dark">{t("servicios.faq.title")}</Reveal>
          <div ref={faqRef} className={`srv-faq__list ${reveal("srv-slide", faqVisible)}`}>
            {list("servicios.faq.items")
              .filter((f) => SHOW_BOND || !f.bond) // preguntas de Bond: "bond": true en es.json
              .map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* 08 — ASÍ EMPEZAMOS */}
      <section className="srv-start">
        <div className="srv-section-inner srv-start__inner">
          <Reveal as="h2" className="srv-section__title">{t("servicios.start.title")}</Reveal>
          <ol ref={startRef} className={reveal("srv-start__steps", startVisible)}>
            {list("servicios.start.steps").map((s, i) => (
              <li key={s.title} className="srv-start__step">
                <span className="srv-start__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="srv-start__title">{s.title}</h3>
                <p className="srv-start__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <Button to="/contacto" variant="primary" size="lg">
            {t("servicios.start.cta")} <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Servicios;
