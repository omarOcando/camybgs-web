import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";

// ─── DATA ────────────────────────────────────────────────────────────────────

const WEB_SERVICES = [
  {
    title: "Landing page",
    for: "campañas publicitarias, lanzamientos, captación de leads",
    desc: "Una sola página diseñada para un objetivo específico: captar leads, vender un producto, promocionar un servicio o evento. Mensaje claro, llamado a la acción directo y nada que distraiga.",
    items: ["Diseño a medida", "CTA optimizado (formulario, WhatsApp, compra)", "Sin menú de navegación complejo", "Adaptada a todos los dispositivos"],
  },
  {
    title: "Portafolio",
    for: "diseñadores, fotógrafos, músicos, arquitectos, freelancers",
    desc: "Sitio de 3–5 páginas diseñado para mostrar tu trabajo y experiencia. Incluye inicio, sobre mí, proyectos y contacto. Enfocado en impacto visual y credibilidad.",
    items: ["3–5 páginas", "Galería de proyectos y trabajos", "Sección sobre mí y contacto", "Adaptada a todos los dispositivos"],
  },
  {
    title: "Corporativo",
    for: "negocios que quieren una presencia profesional completa",
    desc: "Sitio completo de 5–8 páginas para presentar tu negocio de forma profesional. Incluye inicio, servicios, sobre nosotros, galería o portfolio, contacto y páginas legales.",
    items: ["5–8 páginas", "Sección de servicios", "Galería o portfolio", "Contacto y páginas legales", "Adaptada a todos los dispositivos"],
  },
  {
    title: "Corporativo + reservas",
    for: "médicos, terapeutas, coaches, restaurantes, academias",
    desc: "Todo lo del sitio corporativo más funcionalidades avanzadas de contacto: formulario conectado al email, sistema de reservas o citas online (Calendly, Reservio o similar), botones de WhatsApp y llamada.",
    items: ["Todo lo del sitio corporativo", "Sistema de reservas online integrado", "Formulario conectado al email", "Botones de WhatsApp y llamada", "Adaptada a todos los dispositivos"],
  },
  {
    title: "Ecommerce",
    for: "tiendas físicas que quieren vender online, negocios de productos digitales",
    desc: "Tienda online completa con catálogo de productos, carrito de compra, pasarela de pago integrada (Stripe, PayPal o similar) y gestión de pedidos. Disponible sobre Shopify o con desarrollo personalizado.",
    items: ["Catálogo de productos", "Carrito y pasarela de pago (Stripe, PayPal)", "Gestión de pedidos", "SEO básico incluido", "Adaptada a todos los dispositivos"],
  },
  {
    title: "Sistema a medida",
    for: "negocios con procesos propios y lógica específica",
    desc: "Aplicación web construida desde cero para tu negocio. Puede incluir gestión de clientes, reservas, pagos, panel de administración, integraciones con herramientas externas y automatizaciones. No es un template — es exactamente lo que tu negocio necesita.",
    items: ["Desarrollo personalizado", "Panel de administración", "Integraciones a medida (CRMs, email, pagos)", "Automatizaciones", "Adaptada a todos los dispositivos"],
  },
];

const MARKETING_SERVICES = [
  {
    title: "Mantenimiento web",
    for: "clientes que quieren tranquilidad sin preocuparse por la parte técnica",
    desc: "Supervisión mensual de tu sitio para que siempre esté funcionando. Actualizaciones de plugins y software, copias de seguridad, monitoreo de velocidad y disponibilidad, y pequeños ajustes de contenido.",
    items: ["Actualizaciones de plugins y software", "Copias de seguridad", "Monitoreo de velocidad y disponibilidad", "Pequeños ajustes de contenido"],
  },
  {
    title: "SEO básico + reportes",
    for: "negocios que quieren aparecer en Google de forma orgánica",
    desc: "Optimización mensual para mejorar tu posicionamiento en Google. Análisis de palabras clave, optimización de títulos y descripciones, mejoras técnicas de velocidad y reporte mensual con resultados. Trabajo consistente que da resultados en 3–6 meses.",
    items: ["Análisis de palabras clave", "Optimización de títulos y descripciones", "Mejoras técnicas de velocidad", "Reporte mensual de posicionamiento"],
  },
  {
    title: "Gestión Meta Ads",
    for: "negocios listos para invertir en publicidad en Facebook e Instagram",
    desc: "Campañas completas en Meta: diseño de anuncios, definición de audiencias, publicación, optimización continua y seguimiento de resultados. Tú te enfocas en tu negocio.",
    items: ["Diseño de anuncios", "Definición de audiencias", "Optimización continua", "Seguimiento de resultados"],
  },
  {
    title: "Marketing completo (Systeme.io)",
    for: "coaches, consultores y formadores que venden cursos o servicios online",
    desc: "Gestión completa de tu sistema de marketing en Systeme.io. Configuración y optimización de túneles, campañas de email marketing, etiquetado de contactos, automatizaciones y reportes de conversión.",
    items: ["Configuración y optimización de túneles", "Campañas de email marketing", "Etiquetado y automatizaciones", "Reportes de conversión"],
  },
];

const WA_NUMBER = "491778587715";
const waUrl = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const PACKAGES = [
  {
    name: "Starter",
    tagline: "Para empezar con fuerza",
    items: ["Sitio web corporativo moderno y profesional", "Mantenimiento web mensual", "10% de descuento combinado"],
    ideal: "Negocios que quieren presencia online sin complicarse. Tu web lista y alguien que la cuida. Sin sorpresas técnicas.",
    recommended: false,
    waUrl: waUrl("Hola Omar, me interesa el paquete Starter — sitio web + mantenimiento. ¿Podemos hablar? 👋"),
  },
  {
    name: "Growth",
    tagline: "La opción más completa",
    items: ["Sitio web corporativo", "Mantenimiento mensual", "SEO mensual + reportes", "Marketing completo (Systeme.io)", "10% de descuento combinado"],
    ideal: "Negocios que no solo quieren existir online, sino crecer. Tú te enfocas en tu negocio y yo me encargo del resto. Ideal para coaches, consultores y formadores con volumen de trabajo.",
    recommended: true,
    waUrl: waUrl("Hola Omar, me interesa el paquete Growth — sitio web + SEO + marketing. ¿Podemos hablar? 👋"),
  },
  {
    name: "Premium",
    tagline: "Para dominar tu mercado",
    items: ["Plataforma web a medida", "Gestión de clientes, reservas y pagos", "Mantenimiento mensual", "SEO continuo", "Marketing completo (Systeme.io)", "10% de descuento combinado"],
    ideal: "Negocios que quieren delegar su infraestructura digital completamente: web a medida, marketing, automatización y resultados sin límites.",
    recommended: false,
    waUrl: waUrl("Hola Omar, me interesa el paquete Premium — plataforma a medida + marketing completo. ¿Podemos hablar? 👋"),
  },
];

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

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Servicios() {
  const [webRef,  webVisible]  = useSection(0.1);
  const [mktRef,  mktVisible]  = useSection(0.1);
  const [pkgRef,  pkgVisible]  = useSection(0.1);
  const [ctaRef,  ctaVisible]  = useSection(0.3);

  const [webCategoryRef,  webCategoryVisible]  = useSection(0.2);
  const [webTitleRef,     webTitleVisible]     = useSection(0.2);
  const [mktCategoryRef,  mktCategoryVisible]  = useSection(0.2);
  const [mktTitleRef,     mktTitleVisible]     = useSection(0.2);
  const [pkgCategoryRef,  pkgCategoryVisible]  = useSection(0.2);
  const [pkgTitleRef,     pkgTitleVisible]     = useSection(0.2);
  const [ctaTitleRef,     ctaTitleVisible]     = useSection(0.3);

  return (
    <div className="servicios">

      {/* 01 — HERO */}
      <section className="srv-hero">
        <div className="srv-hero__inner">
          <h1 className="srv-hero__title">Lo que puedo hacer por ti</h1>
          <p className="srv-hero__sub">Eliges lo que necesitas. Yo me encargo del resto.</p>
        </div>
      </section>

      {/* 02 — WEB */}
      <section className="srv-web">
        <div className="srv-section-inner">
          <h2 ref={webCategoryRef} className={`srv-section__category${webCategoryVisible ? " srv-section__category--visible" : ""}`}>PROYECTOS ÚNICOS</h2>
          <h3 ref={webTitleRef} className={`srv-section__title${webTitleVisible ? " srv-section__title--visible" : ""}`}>Tu presencia digital, construida para convertir</h3>
          <p className="srv-section__sub srv-section__sub--nowrap">No solo te hago un sitio bonito y creativo. Sino también que trabaje para ti.</p>
          <div ref={webRef} className={`srv-section__cards${webVisible ? " srv-section__cards--visible" : ""}`}>
            {WEB_SERVICES.map((s, i) => (
              <article key={i} className="srv-card">
                <h3 className="srv-card__title">{s.title}</h3>
                <p className="srv-card__for">Para quién: {s.for}</p>
                <p className="srv-card__desc">{s.desc}</p>
                <p className="srv-card__includes-label">Incluye:</p>
                <ul className="srv-card__list">
                  {s.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="srv-section__footnote">Los proyectos web empiezan desde €400. El precio final depende del alcance y las necesidades de tu negocio.<br/>Escríbeme y en 24 horas te doy una propuesta concreta.</p>
        </div>
      </section>

      {/* 03 — MARKETING */}
      <section className="srv-marketing">
        <div className="srv-section-inner">
          <h2 ref={mktCategoryRef} className={`srv-section__category${mktCategoryVisible ? " srv-section__category--visible" : ""}`}>SERVICIOS MENSUALES</h2>
          <h3 ref={mktTitleRef} className={`srv-section__title srv-section__title--light${mktTitleVisible ? " srv-section__title--visible" : ""}`}>Te ven. Te eligen. Te pagan.</h3>
          <p className="srv-section__sub srv-section__sub--light">El mejor sitio del mundo no sirve de nada si nadie lo ve.</p>
          <div ref={mktRef} className={`srv-section__cards srv-section__cards--2col${mktVisible ? " srv-section__cards--visible" : ""}`}>
            {MARKETING_SERVICES.map((s, i) => (
              <article key={i} className="srv-card srv-card--dark">
                <h3 className="srv-card__title">{s.title}</h3>
                <p className="srv-card__for">Para quién: {s.for}</p>
                <p className="srv-card__desc">{s.desc}</p>
                <p className="srv-card__includes-label">Incluye:</p>
                <ul className="srv-card__list">
                  {s.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="srv-section__footnote srv-section__footnote--light">Los servicios mensuales empiezan desde €80/mes.<br/>Dependiendo de lo que necesites, podemos diseñar un plan a tu medida. Hablemos.</p>
        </div>
      </section>

      {/* 04 — PAQUETES */}
      <section className="srv-packages">
        <div className="srv-section-inner">
          <h2 ref={pkgCategoryRef} className={`srv-section__category${pkgCategoryVisible ? " srv-section__category--visible" : ""}`}>PAQUETES</h2>
          <h3 ref={pkgTitleRef} className={`srv-section__title srv-section__title--light${pkgTitleVisible ? " srv-section__title--visible" : ""}`}>La forma más inteligente de crecer</h3>
          <p className="srv-section__sub srv-section__sub--light">Web + Marketing juntos. Más potencia, mejor precio.</p>
          <div ref={pkgRef} className={`srv-packages__grid${pkgVisible ? " srv-packages__grid--visible" : ""}`}>
            {PACKAGES.map((p, i) => (
              <article key={i} className={`srv-pkg-card${p.recommended ? " srv-pkg-card--recommended" : ""}`}>
                {p.recommended && <span className="srv-pkg-card__badge">★ RECOMENDADO</span>}
                <h3 className="srv-pkg-card__name">{p.name}</h3>
                <p className="srv-pkg-card__tagline">{p.tagline}</p>
                <ul className="srv-pkg-card__list">
                  {p.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div className="srv-pkg-card__ideal">
                  <span className="srv-pkg-card__ideal-label">Ideal para:</span>
                  <p>{p.ideal}</p>
                </div>
                <Button href={p.waUrl} target="_blank" variant="primary" size="lg">
                  Quiero este <span className="btn-arrow">→</span>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — ¿NO SABES CUÁL ELEGIR? */}
      <section className="srv-cta">
        <div ref={ctaRef} className={`srv-section-inner srv-cta__inner${ctaVisible ? " srv-cta__inner--visible" : ""}`}>
          <h2 ref={ctaTitleRef} className={`srv-cta__title${ctaTitleVisible ? " srv-cta__title--visible" : ""}`}>¿No sabes por dónde empezar?</h2>
          <p className="srv-cta__text">Normal. Cuéntame dónde estás y qué necesitas.<br/>En 30 minutos te digo exactamente qué te conviene.</p>
          <Button to="/contacto" variant="primary" size="xl">
            Hablemos gratis
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Servicios;
