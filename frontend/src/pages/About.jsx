import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Seo from "../components/Seo";
import OmarFoto from "../assets/images/about/OmarFotoCompleta.jpg";
import { useLocalePath } from "../config/routes";

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

function About() {
  const { t } = useTranslation();
  const { path } = useLocalePath();
  const story = t("about.story", { returnObjects: true });

  const { ref: storyRef,    visible: storyVisible    } = useVisible(0.08);
  const { ref: quoteRef,    visible: quoteVisible    } = useVisible(0.3);
  const { ref: ctaInnerRef, visible: ctaInnerVisible } = useVisible(0.3);
  const { ref: ctaTitleRef, visible: ctaTitleVisible } = useVisible(0.3);

  return (
    <div className="about">
      <Seo
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        page="about"
      />

      {/* 01 — HERO */}
      <section className="abt-hero">
        <div className="abt-hero__inner">
          <h1 className="abt-hero__title">{t("about.hero.title")}</h1>
          <p className="abt-hero__sub">{t("about.hero.subtitle")}</p>
        </div>
      </section>

      {/* 02 — HISTORIA */}
      <section className="abt-story">
        <div className="abt-story__layout">
          <div className="abt-story__photo">
            <img src={OmarFoto} alt={t("about.photoAlt")} />
          </div>
          <div className="abt-story__text-col">
            <div
              ref={storyRef}
              className={`abt-story__body${storyVisible ? " abt-story__body--visible" : ""}`}
            >
              {story.map((p) => (
                <p
                  key={p.text}
                  className={`abt-story__p${p.variant ? ` abt-story__p--${p.variant}` : ""}`}
                >
                  {p.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CITA */}
      <section className="abt-quote">
        <div
          ref={quoteRef}
          className={`abt-section-inner abt-quote__inner${quoteVisible ? " abt-quote__inner--visible" : ""}`}
        >
          <blockquote className="abt-quote__text">
            {t("about.quote.line1")}<br />{t("about.quote.line2")}
          </blockquote>
        </div>
      </section>

      {/* 04 — CTA FINAL */}
      <section className="abt-cta">
        <div
          ref={ctaInnerRef}
          className={`abt-section-inner abt-cta__inner${ctaInnerVisible ? " abt-cta__inner--visible" : ""}`}
        >
          <h2
            ref={ctaTitleRef}
            className={`abt-cta__title${ctaTitleVisible ? " abt-cta__title--visible" : ""}`}
          >
            {t("about.closing.title")}
          </h2>
          <p className="abt-cta__sub">{t("about.closing.text")}</p>
          <Button to={path("contact")} variant="primary" size="lg">
            {t("about.closing.cta")} <span className="btn-arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default About;
