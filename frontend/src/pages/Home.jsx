import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Seo from "../components/Seo";
import AuroraMandala from "../components/AuroraMandala";
import ContactRadial from "../components/ContactRadial";
import aboutPhoto from "../assets/images/home/Omar.jpg";
import aboutPhotoMovil from "../assets/images/home/OmarMovil.jpg";
import { PROJECTS } from "../data/projects";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useFadeIn(threshold = 0.2) {
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
  }, []);
  return { ref, visible };
}

// ─── DATA ────────────────────────────────────────────────────────────────────

// Color de la tarjeta de cada web (mismo orden que home.offer.plans)
const OFFER_COLORS = ["#6B1530", "#1D1D2E", "#F04E23"];

const TESTIMONIALS = PROJECTS.filter((p) => p.testimonial);

// Añade el modificador --visible a una clase cuando el bloque ya se ve
const reveal = (base, visible) => `${base}${visible ? ` ${base}--visible` : ""}`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Home({ active = false }) {
  const { t } = useTranslation();
  const list = (key) => t(key, { returnObjects: true });

  const { ref: problemTitleRef,  visible: problemTitleVisible  } = useFadeIn();
  const { ref: problemCardsRef,  visible: problemCardsVisible  } = useFadeIn(0.15);
  const { ref: problemClosingRef, visible: problemClosingVisible } = useFadeIn();
  const { ref: howTitleRef,      visible: howTitleVisible      } = useFadeIn();
  const { ref: howIntroRef,      visible: howIntroVisible      } = useFadeIn();
  const { ref: howPillarsRef,    visible: howPillarsVisible    } = useFadeIn(0.15);
  const { ref: howClosingRef,    visible: howClosingVisible    } = useFadeIn();
  const { ref: offerTitleRef,    visible: offerTitleVisible    } = useFadeIn();
  const { ref: offerGridRef,     visible: offerGridVisible     } = useFadeIn(0.15);
  const { ref: bondRef,          visible: bondVisible          } = useFadeIn(0.2);
  const { ref: projectsTitleRef, visible: projectsTitleVisible } = useFadeIn();
  const { ref: projectsGridRef,  visible: projectsGridVisible  } = useFadeIn(0.15);
  const { ref: processTitleRef,  visible: processTitleVisible  } = useFadeIn();
  const { ref: processStepsRef,  visible: processStepsVisible  } = useFadeIn(0.1);
  const { ref: aboutTitleRef,    visible: aboutTitleVisible    } = useFadeIn();
  const { ref: aboutRef,         visible: aboutVisible         } = useFadeIn(0.15);
  const { ref: closingTitleRef,  visible: closingTitleVisible  } = useFadeIn();
  const { ref: closingTextRef,   visible: closingTextVisible   } = useFadeIn();

  return (
    <div className={`home${active ? " home--active" : ""}`}>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
      />

      {/* Fondo fijo de toda la Home: se monta al terminar el Loader */}
      {active && <AuroraMandala />}

      {/* 01 — HERO */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            <span className="home-hero__title-line">{t("home.hero.titleLine1")}</span>{" "}
            <span className="home-hero__title-line">{t("home.hero.titleLine2")}</span>
          </h1>
          <p className="home-hero__subtitle">
            <span className="home-hero__subtitle-line">{t("home.hero.subtitleLine1")}</span>{" "}
            <span className="home-hero__subtitle-line">{t("home.hero.subtitleLine2")}</span>
          </p>

          <div className="home-hero__cta-wrapper">
            <ContactRadial />
          </div>
        </div>
      </section>

      {/* 02 — EL PROBLEMA */}
      <section className="home-problem">
        <div className="home-section-inner">
          <h2 ref={problemTitleRef} className={reveal("home-section-title", problemTitleVisible)}>
            {t("home.problem.title")}
          </h2>
          <div ref={problemCardsRef} className={reveal("home-problem__cards", problemCardsVisible)}>
            {list("home.problem.pains").map((p) => (
              <article key={p.title} className="home-card home-problem__card">
                <h3 className="home-card__title">{p.title}</h3>
                <p className="home-card__text">{p.text}</p>
              </article>
            ))}
          </div>
          <p ref={problemClosingRef} className={`home-section-closing ${reveal("home-fade-zoom", problemClosingVisible)}`}>
            {t("home.problem.closing")}
          </p>
        </div>
      </section>

      {/* 03 — CÓMO LO HAGO */}
      <section className="home-how">
        <div className="home-section-inner">
          <h2 ref={howTitleRef} className={reveal("home-section-title", howTitleVisible)}>
            {t("home.how.title")}
          </h2>
          <p ref={howIntroRef} className={`home-section-intro ${reveal("home-fade-zoom", howIntroVisible)}`}>
            <span className="home-section-intro__line">{t("home.how.introLine1")}</span>{" "}
            <span className="home-section-intro__line">{t("home.how.introLine2")}</span>
          </p>
          <div ref={howPillarsRef} className={reveal("home-how__pillars", howPillarsVisible)}>
            {list("home.how.pillars").map((p) => (
              <article key={p.title} className="home-card home-how__pillar">
                <h3 className="home-card__title">{p.title}</h3>
                <p className="home-card__text">{p.text}</p>
              </article>
            ))}
          </div>
          <p ref={howClosingRef} className={`home-section-closing ${reveal("home-fade-zoom", howClosingVisible)}`}>
            {t("home.how.closing")}
          </p>
        </div>
      </section>

      {/* 04 — OFERTA RESUMIDA */}
      <section className="home-offer">
        <div className="home-section-inner">
          <h2 ref={offerTitleRef} className={reveal("home-section-title", offerTitleVisible)}>
            {t("home.offer.title")}
          </h2>
          <div ref={offerGridRef} className={reveal("home-offer__grid", offerGridVisible)}>
            {list("home.offer.plans").map((plan, i) => (
              // Tarjeta giratoria: se da la vuelta al pasar el ratón, al tocarla o con el foco
              <article key={plan.name} className="home-offer__card" tabIndex={0}>
                <div className="home-offer__card-inner">
                  <div className="home-offer__card-front" style={{ background: OFFER_COLORS[i] }}>
                    <h3 className="home-offer__card-name">{plan.name}</h3>
                    <span className="home-offer__card-from">{plan.priceOnce}</span>
                  </div>
                  <div className="home-offer__card-back" style={{ background: OFFER_COLORS[i] }}>
                    <span className="home-offer__card-back-title" aria-hidden="true">{plan.name}</span>
                    <p className="home-offer__card-text">{plan.text}</p>
                    <p className="home-offer__card-price">
                      <strong>{plan.priceOnce}</strong> {plan.priceMonthly}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={reveal("home-offer__notes", offerGridVisible)}>
            <p className="home-offer__included">{t("home.offer.included")}</p>
            <p className="home-offer__plans-line">{t("home.offer.plansLine")}</p>
            <Button to="/servicios" variant="ghost" size="lg" className="home-link-cta">
              {t("home.offer.cta")} <span className="btn-arrow">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 05 — BOND DESTACADO */}
      <section className="home-bond">
        <div className="home-section-inner">
          <div className={reveal("bond-panel-stage", bondVisible)}>
            <div className="bond-panel-stage__halo" aria-hidden="true" />
            <div ref={bondRef} className={reveal("bond-panel", bondVisible)}>
              <span className="bond-panel__tag">
                <span className="bond-panel__tag-star" aria-hidden="true">★</span>
                {t("home.bond.tag")}
              </span>
              <h2 className="bond-panel__title">
                <span className="bond-panel__title-name">{t("home.bond.titleName")}</span>{" "}
                <span className="bond-panel__title-tagline">{t("home.bond.titleTagline")}</span>
              </h2>
              <p className="bond-panel__text">
                <span className="bond-panel__text-line">{t("home.bond.textLine1")}</span>{" "}
                <span className="bond-panel__text-line">{t("home.bond.textLine2")}</span>
              </p>
              <Button to="/bond" variant="primary" size="lg">
                {t("home.bond.cta")} <span className="btn-arrow">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — PROYECTOS Y TESTIMONIOS */}
      <section className="home-testimonials">
        <div className="home-section-inner">
          <h2 ref={projectsTitleRef} className={reveal("home-section-title", projectsTitleVisible)}>
            {t("home.projects.title")}
          </h2>
          <div ref={projectsGridRef} className={reveal("home-testimonials__grid", projectsGridVisible)}>
            {TESTIMONIALS.map((p) => {
              const item = list(`home.projects.items.${p.id}`);
              return (
                <article key={p.id} className="home-testimonials__card">
                  <div
                    className={`home-testimonials__card-video${p.videoAspect ? " home-testimonials__card-video--native" : ""}`}
                    style={p.videoAspect ? { "--card-video-ratio": p.videoAspect } : undefined}
                  >
                    <video
                      src={p.video}
                      preload="metadata"
                      controls
                      playsInline
                      aria-label={t("home.projects.videoLabel", { name: item.name })}
                      onLoadedMetadata={(e) => { e.target.currentTime = 0.01; }}
                    />
                  </div>
                  <div className="home-testimonials__card-info">
                    <span className="home-testimonials__card-name">{item.name}</span>
                    <span className="home-testimonials__card-profession">{item.meta}</span>
                    <p className="home-testimonials__card-text">{item.text}</p>
                    {item.result && (
                      <p className="home-testimonials__card-result">
                        <strong>{t("home.projects.resultLabel")}</strong> {item.result}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <Button to="/proyectos" variant="ghost" size="lg" className={`home-link-cta home-reveal-cta${projectsGridVisible ? " home-reveal-cta--visible" : ""}`}>
            {t("home.projects.cta")} <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

      {/* 07 — PROCESO */}
      <section className="home-process">
        <div className="home-section-inner">
          <h2 ref={processTitleRef} className={reveal("home-section-title", processTitleVisible)}>
            {t("home.process.title")}
          </h2>
          <ol ref={processStepsRef} className={reveal("home-process__timeline", processStepsVisible)}>
            {list("home.process.steps").map((step, i) => (
              <li key={step.title} className="home-process__step">
                <div className="home-process__step-number" aria-hidden="true">{i + 1}</div>
                <div className="home-process__step-card">
                  <h3 className="home-process__step-title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 08 — LA PERSONA DETRÁS DE CAMY */}
      <section className="home-about">
        <div className="home-section-inner">
          <h2 ref={aboutTitleRef} className={reveal("home-section-title", aboutTitleVisible)}>
            {t("home.about.title")}
          </h2>
          <div ref={aboutRef} className={reveal("home-about__inner", aboutVisible)}>
            <picture className="home-about__photo">
              <source media="(max-width: 900px)" srcSet={aboutPhotoMovil} />
              <img src={aboutPhoto} alt={t("home.about.photoAlt")} />
            </picture>
            <div className="home-about__text">
              {list("home.about.paragraphs").map((text) => (
                <p key={text}>{text}</p>
              ))}
              <Button to="/sobre-mi" variant="ghost" size="lg" className={`home-link-cta home-reveal-cta${aboutVisible ? " home-reveal-cta--visible" : ""}`}>
                {t("home.about.cta")} <span className="btn-arrow">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — CIERRE */}
      <section className="home-final-cta">
        <div className="home-section-inner home-final-cta__inner">
          <h2 ref={closingTitleRef} className={reveal("home-section-title", closingTitleVisible)}>
            {t("home.closing.title")}
          </h2>
          <p ref={closingTextRef} className={`home-final-cta__sub ${reveal("home-fade-zoom", closingTextVisible)}`}>
            <span className="home-final-cta__sub-line">{t("home.closing.textLine1")}</span>{" "}
            <span className="home-final-cta__sub-line">{t("home.closing.textLine2")}</span>
          </p>
          <Button to="/contacto" variant="primary" size="lg">
            {t("home.closing.cta")} <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Home;
