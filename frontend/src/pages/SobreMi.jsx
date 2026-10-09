import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Seo from "../components/Seo";
import OmarFoto from "../assets/images/sobre-mi/OmarFotoCompleta.jpg";

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

function SobreMi() {
  const { t } = useTranslation();
  const story = t("sobreMi.story", { returnObjects: true });

  const { ref: storyRef,    visible: storyVisible    } = useVisible(0.08);
  const { ref: quoteRef,    visible: quoteVisible    } = useVisible(0.3);
  const { ref: ctaInnerRef, visible: ctaInnerVisible } = useVisible(0.3);
  const { ref: ctaTitleRef, visible: ctaTitleVisible } = useVisible(0.3);

  return (
    <div className="sobre-mi">
      <Seo
        title={t("seo.sobreMi.title")}
        description={t("seo.sobreMi.description")}
        path="/sobre-mi"
      />

      {/* 01 — HERO */}
      <section className="sob-hero">
        <div className="sob-hero__inner">
          <h1 className="sob-hero__title">{t("sobreMi.hero.title")}</h1>
          <p className="sob-hero__sub">{t("sobreMi.hero.subtitle")}</p>
        </div>
      </section>

      {/* 02 — HISTORIA */}
      <section className="sob-story">
        <div className="sob-story__layout">
          <div className="sob-story__photo">
            <img src={OmarFoto} alt={t("sobreMi.photoAlt")} />
          </div>
          <div className="sob-story__text-col">
            <div
              ref={storyRef}
              className={`sob-story__body${storyVisible ? " sob-story__body--visible" : ""}`}
            >
              {story.map((p) => (
                <p
                  key={p.text}
                  className={`sob-story__p${p.variant ? ` sob-story__p--${p.variant}` : ""}`}
                >
                  {p.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CITA */}
      <section className="sob-quote">
        <div
          ref={quoteRef}
          className={`sob-section-inner sob-quote__inner${quoteVisible ? " sob-quote__inner--visible" : ""}`}
        >
          <blockquote className="sob-quote__text">
            {t("sobreMi.quote.line1")}<br />{t("sobreMi.quote.line2")}
          </blockquote>
        </div>
      </section>

      {/* 04 — CTA FINAL */}
      <section className="sob-cta">
        <div
          ref={ctaInnerRef}
          className={`sob-section-inner sob-cta__inner${ctaInnerVisible ? " sob-cta__inner--visible" : ""}`}
        >
          <h2
            ref={ctaTitleRef}
            className={`sob-cta__title${ctaTitleVisible ? " sob-cta__title--visible" : ""}`}
          >
            {t("sobreMi.closing.title")}
          </h2>
          <p className="sob-cta__sub">{t("sobreMi.closing.text")}</p>
          <Button to="/contacto" variant="primary" size="xl">
            {t("sobreMi.closing.cta")} <span className="btn-arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default SobreMi;
