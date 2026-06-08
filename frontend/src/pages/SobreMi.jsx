import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
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
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function SobreMi() {
  const { ref: storyRef,    visible: storyVisible    } = useVisible(0.08);
  const { ref: quoteRef,    visible: quoteVisible    } = useVisible(0.3);
  const { ref: ctaInnerRef, visible: ctaInnerVisible } = useVisible(0.3);
  const { ref: ctaTitleRef, visible: ctaTitleVisible } = useVisible(0.3);

  return (
    <div className="sobre-mi">

      {/* 01 — HERO */}
      <section className="sob-hero">
        <div className="sob-hero__inner">
          <h1 className="sob-hero__title">
            Detrás de CAMY hay una historia ruda y hermosa.
          </h1>
          <p className="sob-hero__sub">Te la cuento…</p>
        </div>
      </section>

      {/* 02 — HISTORIA */}
      <section className="sob-story">
        <div className="sob-story__layout">
          <div className="sob-story__photo">
            <img src={OmarFoto} alt="Omar Ocando" />
          </div>
          <div className="sob-story__text-col">
            <div
              ref={storyRef}
              className={`sob-story__body${storyVisible ? " sob-story__body--visible" : ""}`}
            >
              <p className="sob-story__p">
                Nunca quise tener hijos.
              </p>
              <p className="sob-story__p">
                Durante años preferí la libertad: viajar, crear, moverme por el mundo sin anclas.
                Viví en 3 continentes, migré 5 veces, sobreviví 2 secuestros y 2 bancarrotas.
                He aprendido más de lo que cualquier universidad podría haberme enseñado.
              </p>
              <p className="sob-story__p sob-story__p--strong">
                Entonces, a mis 49 años, algo cambió…
              </p>
              <p className="sob-story__p">
                Por primera vez, quise ser padre... Y llegó Camila.
              </p>
              <p className="sob-story__p">
                Llegó en las mejores condiciones para ella y en las peores para mí…
              </p>
              <p className="sob-story__p">
                Alemania: un país extraordinario para traer y criar hijos, pero difícil para un
                latino sin idioma, sin red, con un acento que delata y una cultura que no siempre
                abre las puertas y que contrasta en formas profundas.
              </p>
              <p className="sob-story__p">
                En medio de todo este tumulto y con la incredulidad de los más cercanos como
                fondo, nació CAMY.
              </p>
              <p className="sob-story__p sob-story__p--strong">
                Una decisión desesperada, atrevida y un poco desequilibrada; como casi todo lo
                que he hecho en la vida que ha valido la pena…
              </p>
              <p className="sob-story__p">
                CAMY lleva el nombre de mi hija. Y cada cliente que ayudo a crecer, es un paso
                más hacia todo lo que quiero darle.
              </p>
              <p className="sob-story__p sob-story__p--highlight">
                No trabajo por un sueldo. Trabajo por ella.
              </p>
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
            "Hay una razón básica por la que soy tan directo, tan honesto y tan
            obsesionado con los resultados:<br/>No tengo tiempo que perder. Y tú tampoco."
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
            ¿Quieres trabajar con alguien que de verdad entiende lo que es empezar desde cero?
          </h2>
          <p className="sob-cta__sub">
            Hablemos. Sin compromisos. Sin formalismos.
          </p>
          <Button to="/contacto" variant="primary" size="xl">
            Hablemos ahora <span className="btn-arrow">→</span>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default SobreMi;
