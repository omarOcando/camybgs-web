import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaShieldAlt } from "react-icons/fa";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { useLocalePath } from "../config/routes";
import { SHOW_BOND_PAGE_EN, BOND_SHARE_IMAGE_ES } from "../config/site";

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

// Lleva a la página de ventas, siempre en pestaña nueva. En inglés, oculto
// mientras SHOW_BOND_PAGE_EN sea false (en npm run dev se ve siempre)
function DiscoverButton({ className = "" }) {
  const { t } = useTranslation();
  const { lang, path } = useLocalePath();
  if (lang === "en" && !SHOW_BOND_PAGE_EN && !import.meta.env.DEV) return null;
  return (
    <div className={`bond-buttons ${className}`}>
      <Button href={path("discoverBond")} target="_blank" variant="primary" size="lg">
        {t("bondSite.cta")} <span className="btn-arrow" aria-hidden="true">→</span>
        <span className="visually-hidden"> {t("common.newTab")}</span>
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

// active: false mientras está el Loader, para que la entrada no ocurra detrás
function Bond({ active = true }) {
  const { t } = useTranslation();
  const { lang } = useLocalePath();
  const list = (key) => t(key, { returnObjects: true });

  const { ref: featuresRef, visible: featuresVisible } = useVisible(0.1);

  return (
    <div className={`bond-site${active ? " bond-site--active" : ""}`}>
      <Seo
        title={t("seo.bondSite.title")}
        description={t("seo.bondSite.description")}
        page="bond"
        {...(lang === "es" && BOND_SHARE_IMAGE_ES)}
      />

      {/* 01 — HERO */}
      <section className="bond-hero">
        <div className="bond-hero__inner">
          <span className="bond-panel__tag bond-hero__tag">
            <span className="bond-panel__tag-star" aria-hidden="true">★</span>
            {t("bondSite.hero.tag")}
          </span>
          <h1 className="bond-hero__title">{t("bondSite.hero.title")}</h1>
          <p className="bond-hero__subtitle">{t("bondSite.hero.subtitle")}</p>
          <p className="bond-hero__text">
            <span className="bond-hero__text-line">{t("bondSite.hero.textLine1")}</span>{" "}
            <span className="bond-hero__text-line">{t("bondSite.hero.textLine2")}</span>
          </p>
          <DiscoverButton className="bond-hero__buttons" />
        </div>
      </section>

      {/* 02 — PARA QUIÉN ES */}
      <section className="bond-audience">
        <div className="bond-section-inner bond-audience__inner">
          <Reveal as="h2" className="bond-section-title">{t("bondSite.audience.title")}</Reveal>
          <Reveal as="p" className="bond-audience__text">
            <span className="bond-audience__text-line">{t("bondSite.audience.textLine1")}</span>{" "}
            <span className="bond-audience__text-line">{t("bondSite.audience.textLine2")}</span>
          </Reveal>
          <Reveal as="p" className="bond-audience__pain">{t("bondSite.audience.pain")}</Reveal>
        </div>
      </section>

      {/* 03 — QUÉ HACE BOND */}
      <section className="bond-features">
        <div className="bond-section-inner">
          <Reveal as="h2" className="bond-section-title bond-section-title--light">{t("bondSite.features.title")}</Reveal>
          <div ref={featuresRef} className={`bond-features__grid${featuresVisible ? " bond-features__grid--visible" : ""}`}>
            <FeatureList title={t("bondSite.features.forYou.title")}     items={list("bondSite.features.forYou.items")} />
            <FeatureList title={t("bondSite.features.forClients.title")} items={list("bondSite.features.forClients.items")} />
          </div>
          <Reveal as="p" base="srv-slide" className="bond-features__trust">
            <FaShieldAlt aria-hidden="true" />
            <span>{t("bondSite.features.trust")}</span>
          </Reveal>
        </div>
      </section>

      {/* 04 — PRECIO Y CIERRE */}
      <section className="bond-pricing">
        <div className="bond-section-inner bond-pricing__inner">
          <Reveal as="h2" className="bond-section-title">{t("bondSite.pricing.title")}</Reveal>
          <Reveal as="ul" base="srv-slide" className="bond-pricing__price">
            {list("bondSite.pricing.price").map((line) => (
              <li key={line.label}>
                <strong>{line.label}</strong> {line.value}
              </li>
            ))}
          </Reveal>
          <Reveal as="p" className="bond-pricing__text">
            <span className="bond-pricing__text-line">{t("bondSite.pricing.textLine1")}</span>{" "}
            <span className="bond-pricing__text-line">{t("bondSite.pricing.textLine2")}</span>
          </Reveal>
          <Reveal base="srv-slide"><DiscoverButton /></Reveal>
        </div>
      </section>

    </div>
  );
}

export default Bond;
