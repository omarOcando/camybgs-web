import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import ramsesImg from "../assets/images/mi-trabajo/ramsesImg.png";
import pinterestImg from "../assets/images/mi-trabajo/pinterestImg.png";
import mercedesImg from "../assets/images/mi-trabajo/mercedesImg.png";

// ─── DATA ────────────────────────────────────────────────────────────────────

const FILTERS = ["Todos", "Landing pages", "Portafolios", "Corporativos", "Corporativos + reservas", "Ecommerce", "Sistemas a medida", "Marketing digital"];

const PROJECTS = [
  {
    name: "Coach de relaciones de pareja",
    category: ["Sistemas a medida", "Corporativos", "Corporativos + reservas", "Marketing digital"],
    type: "Sistema de gestión de clientes",
    client: "Ramsés Viloria - Frankfurt, Alemania",
    challenge: "Necesitaba un sistema propio con enfoque en su modelo de negocio, para gestionar clientes, reservas y pagos, sin depender de herramientas genéricas.",
    work: "Desarrollo de plataforma completa premium personalizada con panel de administración, gestión de citas, clientes y lógica de negocio específica.",
    result: "4 clientes nuevos en los primeros 45 días. ROI positivo desde el segundo mes.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Systeme.io"],
    link: null,
    image: ramsesImg,
  },
  {
    name: "Réplica de Pinterest",
    category: ["Portafolios"],
    type: "Aplicación web interactiva",
    client: "Pinterest — Julio 2025",
    challenge: "Integración de APIs externas y programación asíncrona en JavaScript.",
    work: "Desarrollo de una aplicación interactiva de búsqueda de imágenes que replica la funcionalidad principal de Pinterest: el usuario introduce una búsqueda y la app obtiene y muestra imágenes en tiempo real.",
    result: "Dominio de consumo de APIs, JavaScript asíncrono y maquetación dinámica.",
    tech: ["HTML", "SCSS", "JavaScript"],
    link: "https://omarocando.github.io/pinterestRep/",
    image: pinterestImg,
  },
  {
    name: "Réplica de Mercedes-Benz",
    category: ["Landing pages", "Corporativos"],
    type: "Sitio web corporativo",
    client: "Mercedes-Benz — Abril 2025",
    challenge: "CSS avanzado, diseño responsivo y técnicas de desarrollo front-end mediante la recreación de una landing page de referencia de alto nivel.",
    work: "Desarrollo de landing page responsiva con elementos de diseño modernos y componentes interactivos, replicando la estética premium de Mercedes-Benz.",
    result: "Dominio de CSS avanzado, diseño responsivo y maquetación de páginas de alto impacto visual.",
    tech: ["HTML", "CSS"],
    link: "https://omarocando.github.io/landing_page/",
    image: mercedesImg,
  },
];

const STEPS = [
  { num: "01", title: "Escucho",             desc: "Antes de tocar una sola línea de código, entiendo tu negocio, tu cliente y tu objetivo." },
  { num: "02", title: "Investigo",           desc: "Realizo investigaciones sobre los problemas, deseos y obstáculos de tu cliente." },
  { num: "03", title: "Diseño el mensaje",   desc: "El diseño sigue a la estrategia. No al revés." },
  { num: "04", title: "Construyo",           desc: "Desarrollo limpio, rápido y preparado para crecer." },
  { num: "05", title: "Entrego y acompaño",  desc: "No desaparezco al entregar. Me aseguro de que funcione." },
];

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
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function MiTrabajo() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const { ref: filterTitleRef,   visible: filterTitleVisible   } = useVisible(0.2);
  const { ref: filterBtnsRef,    visible: filterBtnsVisible    } = useVisible(0.2);
  const { ref: projectsRef,      visible: projectsVisible      } = useVisible(0.1);
  const { ref: processTitleRef,  visible: processTitleVisible  } = useVisible(0.2);
  const { ref: stepsRef,         visible: stepsVisible         } = useVisible(0.1);
  const { ref: ctaInnerRef,      visible: ctaInnerVisible      } = useVisible(0.3);
  const { ref: ctaTitleRef,      visible: ctaTitleVisible      } = useVisible(0.3);

  const filtered = activeFilter === "Todos"
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(activeFilter));

  return (
    <div className="mi-trabajo">

      {/* 01 — HERO */}
      <section className="mt-hero">
        <div className="mt-hero__inner">
          <h1 className="mt-hero__title">Mi trabajo habla por mí.</h1>
          <p className="mt-hero__sub">Cada proyecto es una solución real a un problema real.<br/>Sin efectos especiales.</p>
        </div>
      </section>

      {/* 02 + 03 — FILTROS & GRID */}
      <section className="mt-portfolio">
        <div className="mt-section-inner">

          <h2 ref={filterTitleRef} className={`mt-filters__title${filterTitleVisible ? " mt-filters__title--visible" : ""}`}>
            Filtra por lo que te interesa
          </h2>

          <div ref={filterBtnsRef} className={`mt-filters__buttons${filterBtnsVisible ? " mt-filters__buttons--visible" : ""}`}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`mt-filter-btn${activeFilter === f ? " mt-filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div ref={projectsRef} className={`mt-projects${projectsVisible ? " mt-projects--visible" : ""}`}>
            {filtered.map(p => (
              <article key={p.name} className="mt-project-card">
                <span className="mt-card__type">{p.type}</span>

                <div className="mt-card__preview">
                  {p.image
                    ? <img src={p.image} alt={`Preview ${p.name}`} className="mt-card__preview-img" />
                    : <div className="mt-card__preview-placeholder" aria-hidden="true">
                        <svg width="44" height="33" viewBox="0 0 44 33" fill="none">
                          <rect x="0.5" y="0.5" width="43" height="32" rx="3.5" stroke="currentColor" strokeOpacity="0.25"/>
                          <circle cx="12" cy="11" r="4" stroke="currentColor" strokeOpacity="0.3"/>
                          <path d="M1 27l10-9 8 7 7-6 18 12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                  }
                </div>

                <h3 className="mt-card__name">{p.name}</h3>
                <p className="mt-card__client">{p.client}</p>

                <p className="mt-card__label">Reto</p>
                <p className="mt-card__text">{p.challenge}</p>

                <p className="mt-card__label">Lo que hice</p>
                <p className="mt-card__text">{p.work}</p>

                <p className="mt-card__label">→ Resultado</p>
                <p className="mt-card__result">{p.result}</p>

                {p.link
                  ? <a href={p.link} className="mt-card__visit-btn" target="_blank" rel="noopener noreferrer">Ver proyecto →</a>
                  : <button className="mt-card__visit-btn" disabled>Ver proyecto →</button>
                }

                <div className="mt-card__tech">
                  {p.tech.map(t => <span key={t} className="mt-card__tech-tag">{t}</span>)}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 04 — CÓMO TRABAJO */}
      <section className="mt-process">
        <div className="mt-section-inner">
          <h2
            ref={processTitleRef}
            className={`mt-process__title${processTitleVisible ? " mt-process__title--visible" : ""}`}
          >
            Cada proyecto sigue el mismo principio:<br />entender antes de diseñar.
          </h2>
          <div ref={stepsRef} className={`mt-steps${stepsVisible ? " mt-steps--visible" : ""}`}>
            {STEPS.map(s => (
              <div key={s.num} className="mt-step">
                <span className="mt-step__num">{s.num}</span>
                <p className="mt-step__title">{s.title}</p>
                <p className="mt-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — CTA FINAL */}
      <section className="mt-cta">
        <div
          ref={ctaInnerRef}
          className={`mt-section-inner mt-cta__inner${ctaInnerVisible ? " mt-cta__inner--visible" : ""}`}
        >
          <h2
            ref={ctaTitleRef}
            className={`mt-cta__title${ctaTitleVisible ? " mt-cta__title--visible" : ""}`}
          >
            ¿Quieres un proyecto así para tu negocio?
          </h2>
          <p className="mt-cta__sub">
            Cuéntame qué necesitas.<br/>En 30 minutos te digo si puedo ayudarte y cómo.
          </p>
          <Button to="/contacto" variant="primary" size="xl">
            Hablemos <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default MiTrabajo;
