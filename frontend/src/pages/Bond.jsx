import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaShieldAlt } from "react-icons/fa";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { BOND_SALES_URL, BOND_DEMO_URL } from "../config/site";

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
  }, [threshold]);
  return { ref, visible };
}

// ─── COMPONENTES ─────────────────────────────────────────────────────────────

// Botones a Systeme (venta y demo): siempre en pestaña nueva
function ExternalButtons({ sales, demo, className = "" }) {
  const { t } = useTranslation();
  const newTab = <span className="visually-hidden"> {t("common.newTab")}</span>;
  return (
    <div className={`bond-buttons ${className}`}>
      <Button href={BOND_SALES_URL} target="_blank" variant="primary" size="lg">
        {sales} <span className="btn-arrow" aria-hidden="true">→</span>{newTab}
      </Button>
      <Button href={BOND_DEMO_URL} target="_blank" variant="ghost-light" size="lg" className="bond-buttons__demo">
        {demo}{newTab}
      </Button>
    </div>
  );
}

function FeatureList({ title, items }) {
  return (
    <div className="bond-features__card">
      <h3 className="bond-features__card-title">{title}</h3>
      <ul className="bond-features__list">
        {items.map((item) => (
          <li key={item.lead}>
            <strong>{item.lead}</strong> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── PÁGINA ──────────────────────────────────────────────────────────────────

function Bond() {
  const { t } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });

  const { ref: audienceRef, visible: audienceVisible } = useVisible(0.2);
  const { ref: featuresRef, visible: featuresVisible } = useVisible(0.1);
  const { ref: pricingRef,  visible: pricingVisible  } = useVisible(0.25);

  return (
    <div className="bond">
      <Seo
        title={t("seo.bond.title")}
        description={t("seo.bond.description")}
        path="/bond"
      />

      {/* 01 — HERO */}
      <section className="bond-hero">
        <div className="bond-hero__inner">
          <span className="bond-tag">{t("bond.hero.tag")}</span>
          <h1 className="bond-hero__title">{t("bond.hero.title")}</h1>
          <p className="bond-hero__subtitle">{t("bond.hero.subtitle")}</p>
          <p className="bond-hero__text">{t("bond.hero.text")}</p>
          <ExternalButtons
            sales={t("bond.hero.ctaSales")}
            demo={t("bond.hero.ctaDemo")}
            className="bond-hero__buttons"
          />
        </div>
      </section>

      {/* 02 — PARA QUIÉN ES */}
      <section className="bond-audience">
        <div
          ref={audienceRef}
          className={`bond-section-inner bond-audience__inner${audienceVisible ? " bond-audience__inner--visible" : ""}`}
        >
          <h2 className="bond-section-title">{t("bond.audience.title")}</h2>
          <p className="bond-audience__text">{t("bond.audience.text")}</p>
          <p className="bond-audience__pain">{t("bond.audience.pain")}</p>
        </div>
      </section>

      {/* 03 — QUÉ HACE BOND */}
      <section className="bond-features">
        <div className="bond-section-inner">
          <h2 className="bond-section-title bond-section-title--light">{t("bond.features.title")}</h2>
          <div ref={featuresRef} className={`bond-features__grid${featuresVisible ? " bond-features__grid--visible" : ""}`}>
            <FeatureList title={t("bond.features.forYou.title")}     items={list("bond.features.forYou.items")} />
            <FeatureList title={t("bond.features.forClients.title")} items={list("bond.features.forClients.items")} />
          </div>
          <p className="bond-features__trust">
            <FaShieldAlt aria-hidden="true" />
            <span>{t("bond.features.trust")}</span>
          </p>
        </div>
      </section>

      {/* 04 — PRECIO Y CIERRE */}
      <section className="bond-pricing">
        <div
          ref={pricingRef}
          className={`bond-section-inner bond-pricing__inner${pricingVisible ? " bond-pricing__inner--visible" : ""}`}
        >
          <h2 className="bond-section-title bond-section-title--light">{t("bond.pricing.title")}</h2>
          <ul className="bond-pricing__price">
            {list("bond.pricing.price").map((line) => (
              <li key={line.label}>
                <strong>{line.label}</strong> {line.value}
              </li>
            ))}
          </ul>
          <p className="bond-pricing__text">{t("bond.pricing.text")}</p>
          <ExternalButtons
            sales={t("bond.pricing.ctaSales")}
            demo={t("bond.pricing.ctaDemo")}
          />
        </div>
      </section>

    </div>
  );
}

export default Bond;
