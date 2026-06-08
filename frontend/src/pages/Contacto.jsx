import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { submitContact } from "../services/contactService";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const WA_NUMBER  = "491778587715";
const WA_MESSAGE = "Hola Omar, vi tu web y me gustaría saber cómo puedes ayudarme con mi negocio.";
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const STEPS = [
  { num: "01", desc: "Recibo tu mensaje y lo leo con atención. No hay robots, no hay plantillas." },
  { num: "02", desc: "Te respondo en menos de 24 horas con mis primeras impresiones." },
  { num: "03", desc: "Si encajamos, agendamos una llamada corta sin costo ni compromiso." },
  { num: "04", desc: "En esa llamada te digo exactamente qué haría por tu negocio y cómo." },
];

const DATA_ITEMS = [
  { label: "Email",      value: "info@camybgs.com",                             href: "mailto:info@camybgs.com" },
  { label: "WhatsApp",   value: "+49 177 858 7715",                            href: WA_URL },
  { label: "Ubicación",  value: "Colonia, Alemania — Toda Europa y Latinoamérica", href: null },
  { label: "LinkedIn",   value: "linkedin.com/in/omar-ocando-mederos",         href: "https://www.linkedin.com/in/omar-ocando-mederos/" },
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
    const rafId = requestAnimationFrame(() => obs.observe(el));
    return () => { cancelAnimationFrame(rafId); obs.disconnect(); };
  }, []);
  return { ref, visible };
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function Contacto() {
  const [form, setForm]     = useState({ nombre: "", email: "", profesion: "", mensaje: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState("");

  const { ref: formsTitleRef, visible: formsTitleVisible } = useVisible(0.2);
  const { ref: colsRef,       visible: colsVisible       } = useVisible(0.1);
  const { ref: stepsTitleRef, visible: stepsTitleVisible } = useVisible(0.2);
  const { ref: stepsRef,      visible: stepsVisible      } = useVisible(0.1);
  const { ref: dataRef,       visible: dataVisible       } = useVisible(0.15);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.profesion.trim() || !form.mensaje.trim()) {
      setError("Por favor rellena todos los campos.");
      return;
    }
    setSending(true);
    try {
      await submitContact(form);
      setSent(true);
    } catch {
      setError("Algo falló. Inténtalo de nuevo o escríbeme por WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contacto">

      {/* 01 — HERO */}
      <section className="ctc-hero">
        <div className="ctc-hero__inner">
          <h1 className="ctc-hero__title">Contáctame.</h1>
          <p className="ctc-hero__sub">Sin formularios interminables. Sin esperas. Solo hablemos.</p>
        </div>
      </section>

      {/* 02 — FORMAS DE CONTACTO */}
      <section className="ctc-forms">
        <div className="ctc-section-inner">
          <h2
            ref={formsTitleRef}
            className={`ctc-forms__title${formsTitleVisible ? " ctc-forms__title--visible" : ""}`}
          >
            Si tienes un negocio y quieres más clientes,<br />ya tenemos algo de qué hablar.
          </h2>
          <p className="ctc-forms__sub">
            Escríbeme por el medio que prefieras. Respondo en menos de 24 horas.
          </p>

          <div ref={colsRef} className={`ctc-cols${colsVisible ? " ctc-cols--visible" : ""}`}>

            {/* ── Columna izquierda — Formulario ── */}
            <div className="ctc-col">
              <h3 className="ctc-col__title">Escríbeme aquí</h3>

              {sent ? (
                <div className="ctc-success">
                  <p className="ctc-success__headline">¡Recibido! Ya estoy leyendo tu mensaje.</p>
                  <p className="ctc-success__text">
                    Gracias por escribirme. En menos de 24 horas tienes mi respuesta.
                  </p>
                  <p className="ctc-success__text">
                    Mientras tanto, si quieres conocer mejor cómo trabajo, echa un vistazo a mis proyectos.
                  </p>
                  <Button to="/mi-trabajo" variant="primary" size="md">
                    Ver mi trabajo →
                  </Button>
                </div>
              ) : (
                <form className="ctc-form" onSubmit={handleSubmit} noValidate>
                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-nombre">Nombre</label>
                    <input
                      className="ctc-form__input"
                      id="ctc-nombre"
                      name="nombre"
                      type="text"
                      placeholder="Julián Manrique"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-email">Email</label>
                    <input
                      className="ctc-form__input"
                      id="ctc-email"
                      name="email"
                      type="email"
                      placeholder="julianm@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-profesion">Profesión</label>
                    <input
                      className="ctc-form__input"
                      id="ctc-profesion"
                      name="profesion"
                      type="text"
                      placeholder="Astronauta"
                      value={form.profesion}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="ctc-form__field">
                    <label className="ctc-form__label" htmlFor="ctc-mensaje">¿Qué necesitas?</label>
                    <textarea
                      className="ctc-form__input ctc-form__input--textarea"
                      id="ctc-mensaje"
                      name="mensaje"
                      placeholder="Un sistema completo hecho a mi medida"
                      rows={4}
                      value={form.mensaje}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {error && <p className="ctc-form__error">{error}</p>}

                  <Button type="submit" variant="primary" size="lg" disabled={sending}>
                    {sending ? "Enviando…" : <>Enviar mensaje <span className="btn-arrow">→</span></>}
                  </Button>
                </form>
              )}
            </div>

            {/* ── Columna derecha — WhatsApp ── */}
            <div className="ctc-col ctc-col--wa">
              <h3 className="ctc-col__title">O escríbeme directo</h3>
              <div className="ctc-wa-card">
                <svg className="ctc-wa-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path fill="white" d="M24 10.4C16.5 10.4 10.4 16.5 10.4 24c0 2.4.6 4.6 1.7 6.6L10 38l7.6-2c1.8 1 3.9 1.6 6.1 1.6 7.5 0 13.6-6.1 13.6-13.6S31.5 10.4 24 10.4zm7.8 19.3c-.3.9-1.8 1.7-2.5 1.8-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5-6-5.3-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .7.5.3.7.9 2.2 1 2.4.1.2.2.4 0 .7-.1.2-.2.4-.4.6-.2.2-.4.5-.5.6-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.4.2.6.1.8-.1.3-.3.8-.9 1.1-1.2.3-.3.5-.2.9-.1.4.1 2.4 1.1 2.8 1.3.4.2.7.3.8.5.1.4-.1 1.6-.4 2.2z"/>
                </svg>
                <p className="ctc-wa-text">
                  Si prefieres algo más directo, escríbeme por WhatsApp. Sin filtros, sin secretarias, sin formularios.
                </p>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="ctc-wa-btn">
                  Abrir WhatsApp →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 03 — QUÉ PASA DESPUÉS */}
      <section className="ctc-steps">
        <div className="ctc-section-inner">
          <h2
            ref={stepsTitleRef}
            className={`ctc-steps__title${stepsTitleVisible ? " ctc-steps__title--visible" : ""}`}
          >
            ¿Y después qué?
          </h2>
          <div ref={stepsRef} className={`ctc-steps__grid${stepsVisible ? " ctc-steps__grid--visible" : ""}`}>
            {STEPS.map(s => (
              <div key={s.num} className="ctc-step">
                <span className="ctc-step__num">{s.num}</span>
                <p className="ctc-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — DATOS DIRECTOS */}
      <section className="ctc-data">
        <div
          ref={dataRef}
          className={`ctc-section-inner ctc-data__inner${dataVisible ? " ctc-data__inner--visible" : ""}`}
        >
          <div className="ctc-data__grid">
            {DATA_ITEMS.map(item => (
              <div key={item.label} className="ctc-data-item">
                <span className="ctc-data-item__label">{item.label}</span>
                {item.href
                  ? <a
                      href={item.href}
                      className="ctc-data-item__value ctc-data-item__value--link"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  : <span className="ctc-data-item__value">{item.value}</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contacto;
