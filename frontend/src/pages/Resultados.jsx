import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import testimonialRamses from "../assets/videos/clients-testimonials/testimonio-ramses.mp4";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

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

// ─── STAT ITEM ───────────────────────────────────────────────────────────────

function StatItem({ value, suffix = "", label, enabled, delay = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => {
      let start = null;
      const DURATION = 1600;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / DURATION, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [enabled, value, delay]);

  return (
    <div className="res-stat">
      <span className="res-stat__number">{count}{suffix}</span>
      <span className="res-stat__label">{label}</span>
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 6,  suffix: "",  label: "Proyectos completados", delay: 0   },
  { value: 3,  suffix: "",  label: "Clientes beneficiados",  delay: 150 },
  { value: 2,  suffix: "",  label: "Países",                 delay: 300 },
  { value: 2,  suffix: "+", label: "Años de experiencia",    delay: 450 },
];

const CASES = [
  {
    client:   "Ramsés Viloria",
    sector:   "Coach de relaciones de pareja",
    location: "Frankfurt, Alemania",
    problem:  "5 años de experiencia como coach dependiendo 100% de referidos. Presencia digital pobre y sin un sistema de organización ni captación de clientes.",
    solution: "Sistema completo premium de gestión de clientes, con foco en su modelo de negocios. Creación de identidad de marca, integración de harramientas de Marketing, campaña de Meta Ads segmentada a su cliente ideal.",
    result:   "4 clientes nuevos en los primeros 45 días. ROI positivo desde el segundo mes.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Resultados() {
  const { ref: statsIntroRef, visible: statsIntroVisible } = useVisible(0.2);
  const { ref: statsGridRef,  visible: statsGridVisible  } = useVisible(0.2);
  const { ref: casesTitleRef, visible: casesTitleVisible } = useVisible(0.2);
  const { ref: casesListRef,  visible: casesListVisible  } = useVisible(0.1);
  const { ref: ctaInnerRef,   visible: ctaInnerVisible   } = useVisible(0.3);
  const { ref: ctaTitleRef,   visible: ctaTitleVisible   } = useVisible(0.3);

  return (
    <div className="resultados">

      {/* 01 — HERO */}
      <section className="res-hero">
        <div className="res-hero__inner">
          <h1 className="res-hero__title">Resultados reales. Sin adornos.</h1>
          <p className="res-hero__sub">Aquí los hechos</p>
        </div>
      </section>

      {/* 02 — NÚMEROS */}
      <section className="res-stats">
        <div className="res-section-inner">
          <h2 ref={statsIntroRef} className={`res-stats__intro${statsIntroVisible ? " res-stats__intro--visible" : ""}`}>
            Empezamos con pocos.<br/>Pero cada uno importó.
          </h2>
          <div ref={statsGridRef} className={`res-stats__grid${statsGridVisible ? " res-stats__grid--visible" : ""}`}>
            {STATS.map((s, i) => (
              <StatItem key={i} {...s} enabled={statsGridVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* 03 — CASOS DE ÉXITO */}
      <section className="res-cases">
        <div className="res-section-inner">
          <h2 ref={casesTitleRef} className={`res-cases__title${casesTitleVisible ? " res-cases__title--visible" : ""}`}>
            Disfruta estos maravillosos logros:
          </h2>
          <div ref={casesListRef} className={`res-cases__list${casesListVisible ? " res-cases__list--visible" : ""}`}>
            {CASES.map((c, i) => (
              <article key={i} className="res-case">
                <div className="res-case__header">
                  <div className="res-case__avatar">
                    <span>{c.client.charAt(0)}</span>
                  </div>
                  <div className="res-case__identity">
                    <span className="res-case__sector">{c.sector}</span>
                    <p className="res-case__client">{c.client}</p>
                    <p className="res-case__location">{c.location}</p>
                  </div>
                </div>

                <div className="res-case__content">
                  <div className="res-case__body">
                    <div className="res-case__block">
                      <span className="res-case__block-label">Problema</span>
                      <p>{c.problem}</p>
                    </div>
                    <div className="res-case__block">
                      <span className="res-case__block-label">Lo que hice</span>
                      <p>{c.solution}</p>
                    </div>
                    <div className="res-case__block res-case__block--result">
                      <span className="res-case__block-label">→ Resultado</span>
                      <p>{c.result}</p>
                    </div>
                  </div>

                  <div className="res-case__testimonial">
                    <video className="res-case__testimonial-video" src={testimonialRamses} preload="metadata" controls playsInline onLoadedMetadata={(e) => { e.target.currentTime = 0.01; }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CTA FINAL */}
      <section className="res-cta">
        <div ref={ctaInnerRef} className={`res-section-inner res-cta__inner${ctaInnerVisible ? " res-cta__inner--visible" : ""}`}>
          <h2 ref={ctaTitleRef} className={`res-cta__title${ctaTitleVisible ? " res-cta__title--visible" : ""}`}>
            Tú mereces estar en esta lista…
          </h2>
          <p className="res-cta__sub">
            Háblame sin temor. Sin compromisos. Solo resultados.
          </p>
          <Button to="/contacto" variant="primary" size="xl">
            Hazlo ahora <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Resultados;
