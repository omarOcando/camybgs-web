import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import videoBg from "../assets/videos/HomeVideoBG1.mp4";
import aboutPhoto from "../assets/images/home/Omar.jpg";
import aboutPhotoMovil from "../assets/images/home/OmarMovil.jpg";

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useCounter() {
  const [count, setCount] = useState(
    () => Math.floor(Math.random() * 40000) + 10000
  );
  useEffect(() => {
    const STEPS = [1, 1, 2, 2, 3, 3, 5, 5, 8, 10, 12];
    let id;
    const tick = () => {
      setCount(c => c + STEPS[Math.floor(Math.random() * STEPS.length)]);
      id = setTimeout(tick, Math.random() * 1800 + 300);
    };
    id = setTimeout(tick, 700);
    return () => clearTimeout(id);
  }, []);
  return count;
}

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
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useTypewriter(text, startDelay = 0, speed = 55, enabled = true) {
  const [chars, setChars] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    setChars("");
    setDone(false);
    let i = 0, ivId;
    const toId = setTimeout(() => {
      ivId = setInterval(() => {
        i++;
        setChars(text.slice(0, i));
        if (i >= text.length) { clearInterval(ivId); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(toId); clearInterval(ivId); };
  }, [text, startDelay, speed, enabled]);
  return { chars, done };
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PAINS = [
  {
    title: "Nadie ve lo bueno que eres",
    text: "Eres excelente en lo que haces, tienes resultados, tienes experiencia…, pero afuera nadie lo aprecia porque no saben que estás. Eres el mejor secreto de tu sector...",
  },
  {
    title: "No sabes de dónde vendrá tu próximo cliente",
    text: "Dependes del boca a boca, de la suerte, de que alguien te recomiende. No hay sistema, no hay predecibilidad. Esa incertidumbre agota…",
  },
  {
    title: "Tienes likes, pero ningún cliente",
    text: "Publicas, te esfuerzas, consigues reacciones…, pero a fin de mes los likes no pagan las facturas. Algo no está funcionando y no tienes claro qué...",
  },
];

const SERVICES = [
  {
    title: "WEB",
    color: "#6B1530",
    items: ["Landing page", "Portafolio", "Corporativo", "Corporativo + reservas", "Ecommerce", "Sistema a medida"],
  },
  {
    title: "MARKETING",
    color: "#1D1D2E",
    items: ["Mantenimiento web", "SEO básico + reportes", "Gestión Meta Ads", "Marketing completo (Systeme.io)"],
  },
  {
    title: "PAQUETES",
    color: "#F04E23",
    items: ["Starter", "Growth", "Premium"],
  },
];

const PROCESS_STEPS = [
  "Pienso y entiendo tu negocio y tu cliente",
  "Diseño tu mensaje a su medida",
  "Construyo tu presencia digital para que te puedan ver",
  "Atraigo esos clientes a ti y observo los resultados",
];

const TESTIMONIALS = [
  { name: "Ramsés Viloria", profession: "Coach de relaciones de pareja", text: "Próximamente — los resultados hablan solos." },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Home({ active = false }) {
  const count = useCounter();
  const { chars: leftChars, done: leftDone } = useTypewriter("Mientras lees esto, hay", 400, 55, active);
  const { chars: rightChars, done: rightDone } = useTypewriter("que te están buscando...", 400, 55, active);

  const problemCardsRef = useRef(null);
  const [problemCardsVisible, setProblemCardsVisible] = useState(false);
  useEffect(() => {
    const el = problemCardsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setProblemCardsVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const servicesGridRef = useRef(null);
  const [servicesGridVisible, setServicesGridVisible] = useState(false);
  useEffect(() => {
    const el = servicesGridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setServicesGridVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const processTimelineRef = useRef(null);
  const [processTimelineVisible, setProcessTimelineVisible] = useState(false);
  useEffect(() => {
    const el = processTimelineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setProcessTimelineVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAboutVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const testimonialsRef = useRef(null);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTestimonialsVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { ref: problemTitleRef,      visible: problemTitleVisible      } = useFadeIn();
  const { ref: servicesTitleRef,     visible: servicesTitleVisible     } = useFadeIn();
  const { ref: processTitleRef,      visible: processTitleVisible      } = useFadeIn();
  const { ref: aboutTitleRef,        visible: aboutTitleVisible        } = useFadeIn();
  const { ref: testimonialsTitleRef, visible: testimonialsTitleVisible } = useFadeIn();
  const { ref: finalCtaTitleRef,     visible: finalCtaTitleVisible     } = useFadeIn();

  return (
    <div className={`home${active ? " home--active" : ""}`}>

      {/* 01 — HERO */}
      <section className="home-hero">
        <video className="home-hero__video" autoPlay muted loop playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="home-hero__overlay" />

        <div className="home-hero__content">
          <div className="home-hero__counter-row">
            <span className="home-hero__tagline">
              {leftChars}
              {!leftDone && <span className="home-hero__cursor" aria-hidden="true">|</span>}
            </span>

            <span className="home-hero__counter">
              {count.toLocaleString("de-DE")}
            </span>

            <span className="home-hero__tagline">
              {rightChars}
              {!rightDone && <span className="home-hero__cursor" aria-hidden="true">|</span>}
            </span>
          </div>

          <p className="home-hero__remate serif">Te pongo frente a ellos</p>

          <div className="home-hero__cta-wrapper">
            <Button to="/contacto" variant="primary" size="lg">
              Hablemos <span className="btn-arrow">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 02 — EL PROBLEMA */}
      <section className="home-problem">
        <div className="home-section-inner">
          <h2 ref={problemTitleRef} className={`home-problem__title${problemTitleVisible ? " home-problem__title--visible" : ""}`}>¿Te suena?</h2>
          <div ref={problemCardsRef} className={`home-problem__cards${problemCardsVisible ? " home-problem__cards--visible" : ""}`}>
            {PAINS.map((p, i) => (
              <article key={i} className="home-problem__card">
                <h3 className="home-problem__card-title">"{p.title}"</h3>
                <p className="home-problem__card-text">{p.text}</p>
              </article>
            ))}
          </div>
          <div className="home-problem__remate">
            <h3>El problema no eres tú, es que no te dejas ver...</h3>
            <h3 className="home-problem__remate-sub">Hay una clara solución!</h3>
          </div>
        </div>
      </section>

      {/* 03 — SERVICIOS */}
      <section className="home-services">
        <div className="home-section-inner">
          <h2 ref={servicesTitleRef} className={`home-services__title${servicesTitleVisible ? " home-services__title--visible" : ""}`}>Lo que puedo hacer por ti</h2>
          <div ref={servicesGridRef} className={`home-services__grid${servicesGridVisible ? " home-services__grid--visible" : ""}`}>
            {SERVICES.map((s) => (
              <div key={s.title} className="home-services__card">
                <div className="home-services__card-inner">
                  <div className="home-services__card-front" style={{ background: s.color }}>
                    <span className="home-services__card-name">{s.title}</span>
                  </div>
                  <div className="home-services__card-back" style={{ background: s.color }}>
                    <h3 className="home-services__card-back-title">{s.title}</h3>
                    <ul className="home-services__card-list">
                      {s.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button to="/servicios" variant="ghost" size="lg" className={`home-link-cta${servicesGridVisible ? " home-services__cta--visible" : ""}`}>
            Ver los detalles de mis servicios <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

      {/* 04 — CÓMO TRABAJO */}
      <section className="home-process">
        <div className="home-section-inner">
          <h2 ref={processTitleRef} className={`home-process__title${processTitleVisible ? " home-process__title--visible" : ""}`}>Así es como lo hago</h2>
          <div ref={processTimelineRef} className={`home-process__timeline${processTimelineVisible ? " home-process__timeline--visible" : ""}`}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="home-process__step">
                <div className="home-process__step-number">{i + 1}</div>
                <div className="home-process__step-card">
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
          <Button to="/servicios" variant="ghost" size="lg" className={`home-link-cta${processTimelineVisible ? " home-process__cta--visible" : ""}`}>
            ¿Quieres saber más? <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

      {/* 05 — DETRÁS DE CAMY */}
      <section className="home-about">
        <div className="home-section-inner">
          <h2 ref={aboutTitleRef} className={`home-about__title${aboutTitleVisible ? " home-about__title--visible" : ""}`}>La persona detrás de CAMY</h2>
          <div ref={aboutRef} className={`home-about__inner${aboutVisible ? " home-about__inner--visible" : ""}`}>
            <picture className="home-about__photo">
                <source media="(max-width: 900px)" srcSet={aboutPhotoMovil} />
                <img src={aboutPhoto} alt="Omar Ocando" />
              </picture>
            <div className="home-about__text">
              <p>Me llamo Omar Ocando, soy venezolano y vivo en Colonia, Alemania.</p>
              <p>Creé CAMY con un propósito muy claro: ayudar a profesionales como tú a conseguir los clientes que quieren y se merecen. Yo estuve ahí…</p>
              <p>Trabajo diferente…, hablo diferente…, porque no me importa la aprobación de nadie. Me importa que tu negocio crezca. Así es como yo gano…</p>
              <p>Hay una historia ruda y hermosa detrás del nombre que me gustaría contarte…</p>
              <Button to="/sobre-mi" variant="ghost-light" size="lg" className={`home-link-cta${aboutVisible ? " home-about__cta--visible" : ""}`}>
                Conoce más sobre CAMY <span className="btn-arrow">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — TESTIMONIOS */}
      <section className="home-testimonials">
        <div className="home-section-inner">
          <h2 ref={testimonialsTitleRef} className={`home-testimonials__title${testimonialsTitleVisible ? " home-testimonials__title--visible" : ""}`}>Me alegra tanto compartir sus logros…</h2>
          <div ref={testimonialsRef} className={`home-testimonials__grid${testimonialsVisible ? " home-testimonials__grid--visible" : ""}`}>
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="home-testimonials__card">
                <div className="home-testimonials__card-video" aria-label="Video testimonio">
                  <div className="home-testimonials__card-video-placeholder" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
                      <polygon points="16,13 30,20 16,27" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <p className="home-testimonials__card-video-soon">Próximamente — los resultados hablan solos.</p>
                  </div>
                </div>
                <div className="home-testimonials__card-info">
                  <span className="home-testimonials__card-name">{t.name}</span>
                  <span className="home-testimonials__card-profession">{t.profession}</span>
                </div>
              </article>
            ))}
          </div>
          <Button to="/resultados" variant="ghost" size="lg" className={`home-link-cta${testimonialsVisible ? " home-testimonials__cta--visible" : ""}`}>
            Ver más opiniones… <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

      {/* 07 — CTA FINAL */}
      <section className="home-final-cta">
        <div className="home-section-inner home-final-cta__inner">
          <h2 ref={finalCtaTitleRef} className={`home-final-cta__title serif${finalCtaTitleVisible ? " home-final-cta__title--visible" : ""}`}>
            Tu próximo cliente está por donde vamos a pasar…
          </h2>
          <p className="home-final-cta__sub">
            Sin pagos ciegos por clics, likes, o leads… <strong>VENTAS REALES.</strong>
          </p>
          <Button to="/contacto" variant="primary" size="xl">
            Hagámoslo ahora
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Home;
