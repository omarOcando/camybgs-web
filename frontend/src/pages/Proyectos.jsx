import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Seo from "../components/Seo";
import { PROJECTS, CATEGORIES } from "../data/projects";

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

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL = "all";

// Solo las categorías con al menos un proyecto, para que ningún filtro lleve
// a una lista vacía. Las demás aparecen solas al añadir proyectos.
const FILTERS = [ALL, ...CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c))];

const TESTIMONIALS = PROJECTS.filter((p) => p.testimonial);

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Proyectos() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState(ALL);

  const { ref: filterBtnsRef,     visible: filterBtnsVisible     } = useVisible(0.2);
  const { ref: projectsRef,       visible: projectsVisible       } = useVisible(0.1);
  const { ref: testimonialsRef,   visible: testimonialsVisible   } = useVisible(0.15);
  const { ref: ctaInnerRef,       visible: ctaInnerVisible       } = useVisible(0.3);

  const filtered = activeFilter === ALL
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="proyectos">
      <Seo
        title={t("seo.proyectos.title")}
        description={t("seo.proyectos.description")}
        path="/proyectos"
      />

      {/* 01 — HERO */}
      <section className="proj-hero">
        <div className="proj-hero__inner">
          <h1 className="proj-hero__title">{t("proyectos.hero.title")}</h1>
          <p className="proj-hero__sub">{t("proyectos.hero.subtitle")}</p>
        </div>
      </section>

      {/* 02 — FILTRO Y PROYECTOS */}
      <section className="proj-portfolio">
        <div className="proj-section-inner">

          <div
            ref={filterBtnsRef}
            role="group"
            aria-label={t("proyectos.filters.label")}
            className={`proj-filters${filterBtnsVisible ? " proj-filters--visible" : ""}`}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={activeFilter === f}
                className={`proj-filter-btn${activeFilter === f ? " proj-filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === ALL ? t("proyectos.filters.all") : f}
              </button>
            ))}
          </div>

          <div ref={projectsRef} className={`proj-projects${projectsVisible ? " proj-projects--visible" : ""}`}>
            {filtered.map((p) => {
              const item = t(`proyectos.items.${p.id}`, { returnObjects: true });
              return (
                <article key={p.id} className="proj-card">
                  <span className="proj-card__type">{item.tag}</span>

                  <div className="proj-card__preview">
                    <img src={p.image} alt={t("proyectos.card.imageAlt", { name: item.name })} className="proj-card__preview-img" />
                  </div>

                  <h2 className="proj-card__name">{item.name}</h2>
                  <p className="proj-card__client">{item.client}</p>

                  <p className="proj-card__label">{t("proyectos.card.challenge")}</p>
                  <p className="proj-card__text">{item.challenge}</p>

                  <p className="proj-card__label">{t("proyectos.card.work")}</p>
                  <p className="proj-card__text">{item.work}</p>

                  <p className="proj-card__label">{t("proyectos.card.result")}</p>
                  <p className="proj-card__result">{item.result}</p>

                  <div className="proj-card__tech">
                    {p.tech.map((tech) => <span key={tech} className="proj-card__tech-tag">{tech}</span>)}
                  </div>

                  {p.link
                    ? (
                      <a
                        href={p.link}
                        className="proj-card__visit-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("proyectos.card.visitLabel", { name: item.name })}
                      >
                        {t("proyectos.card.visit")} →
                      </a>
                    )
                    : <button type="button" className="proj-card__visit-btn" disabled>{t("proyectos.card.visit")} →</button>
                  }
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 03 — TESTIMONIOS */}
      <section className="proj-testimonials">
        <div className="proj-section-inner">
          <h2 className="proj-testimonials__title">{t("proyectos.testimonials.title")}</h2>
          <div ref={testimonialsRef} className={`proj-testimonials__grid${testimonialsVisible ? " proj-testimonials__grid--visible" : ""}`}>
            {TESTIMONIALS.map((p) => {
              const name = t(`proyectos.items.${p.id}.name`);
              return (
                <figure key={p.id} className="proj-testimonials__card">
                  <div
                    className="proj-testimonials__video"
                    style={p.videoAspect ? { "--card-video-ratio": p.videoAspect } : undefined}
                  >
                    <video
                      src={p.video}
                      preload="metadata"
                      controls
                      playsInline
                      aria-label={t("proyectos.testimonials.videoLabel", { name })}
                      onLoadedMetadata={(e) => { e.target.currentTime = 0.01; }}
                    />
                  </div>
                  <figcaption className="proj-testimonials__name">{name}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 — CIERRE */}
      <section className="proj-cta">
        <div
          ref={ctaInnerRef}
          className={`proj-section-inner proj-cta__inner${ctaInnerVisible ? " proj-cta__inner--visible" : ""}`}
        >
          <h2 className="proj-cta__title">{t("proyectos.closing.title")}</h2>
          <p className="proj-cta__sub">{t("proyectos.closing.text")}</p>
          <Button to="/contacto" variant="primary" size="xl">
            {t("proyectos.closing.cta")} <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Proyectos;
