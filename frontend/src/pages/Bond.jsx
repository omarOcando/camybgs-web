import { lazy, Suspense, useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BondGallery from "../components/BondGallery";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import {
  BOND_SALES_URL, BOND_DEMO_URL, SHOW_BOND_PAGE, SHOW_BOND_CASE, SHOW_BOND_AVV,
  SHOW_BOND_MARKETING, SHOW_BOND_VIDEO_EN,
} from "../config/site";
import { useLocalePath } from "../config/routes";
import { PROJECTS } from "../data/projects";

// Hero animada. Con SHOW_BOND_PAGE = false, su código y su CSS quedan fuera del
// build de producción (la condición se resuelve al compilar). El logo y Orbitron
// sí se copian a dist/assets, pero sin ninguna referencia: no se cargan.
const loadBondHero = () => import("../components/BondHero/BondHero");
const BondHero = SHOW_BOND_PAGE || import.meta.env.DEV ? lazy(loadBondHero) : null;

// Reserva el sitio de la hero mientras carga. Sin esto, la sección 1 subiría
// arriba unos instantes. Es un <section> para no alterar los fondos alternos.
const BondHeroSlot = () => <section className="bond-hero-slot" aria-hidden="true" />;

// Vídeos en public/videos (no pasan por el build)
const VIDEO_SRC = "/videos/bond.mp4";
const VIDEO_POSTER = "/videos/bond-poster.jpg";

// ─── COMPONENTES ─────────────────────────────────────────────────────────────

// Siempre las mismas dos acciones, en pestaña nueva: demo (dorado) y pago (vinotinto)
function Actions({ demo, start }) {
  const { t } = useTranslation();
  const newTab = <span className="visually-hidden"> {t("common.newTab")}</span>;
  return (
    <Reveal base="bond-rise" className="bond-actions">
      {demo && (
        <Button href={BOND_DEMO_URL} target="_blank" variant="gold" size="lg">
          {demo}{newTab}
        </Button>
      )}
      {start && (
        <Button href={BOND_SALES_URL} target="_blank" variant="wine" size="lg">
          {start}{newTab}
        </Button>
      )}
    </Reveal>
  );
}

// after: contenido a todo el ancho, fuera de la columna central
function Section({ title, children, className = "", after }) {
  return (
    <section className={`bond-section${className ? ` ${className}` : ""}`}>
      <div className="bond-section__inner">
        {title && <Reveal as="h2" className="bond-section__title">{title}</Reveal>}
        {children}
      </div>
      {after}
    </section>
  );
}

function CheckList({ items, mark = "gold" }) {
  return (
    <ul className={`bond-list bond-list--${mark}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

// Lista con la primera parte de cada línea destacada
function LeadList({ items }) {
  return (
    <ul className="bond-list bond-list--gold">
      {items.map((item) => (
        <li key={item.lead}><strong>{item.lead}</strong> {item.text}</li>
      ))}
    </ul>
  );
}

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`bond-faq__item${open ? " bond-faq__item--open" : ""}`}>
      <h3 className="bond-faq__question">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{question}</span>
          <span className="bond-faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="bond-faq__answer"
        inert={!open}
      >
        <div className="bond-faq__answer-inner">{children}</div>
      </div>
    </div>
  );
}

// ─── PÁGINA ──────────────────────────────────────────────────────────────────

// active: false mientras está el Loader, para que la animación no empiece detrás
function Bond({ active = true }) {
  const { t } = useTranslation();
  const { lang, path } = useLocalePath();
  const list = (key) => t(key, { returnObjects: true });

  // Se descarga durante el Loader, para que esté lista cuando este termine
  useEffect(() => {
    if (BondHero) loadBondHero();
  }, []);

  const ramses = PROJECTS.find((p) => p.id === "ramses");
  const showVideo = lang !== "en" || SHOW_BOND_VIDEO_EN;
  const subscriptionItems = [
    ...list("bond.pricing.subscription.items"),
    ...(SHOW_BOND_MARKETING ? [t("bond.pricing.subscription.marketing")] : []),
    t("bond.pricing.subscription.noLockIn"),
  ];
  const providers = [
    ...list("bond.faq.providers.rows"),
    ...(SHOW_BOND_MARKETING ? [list("bond.faq.providers.systeme")] : []),
  ];
  const dataItems = [
    list("bond.data.hosting"),
    ...(SHOW_BOND_AVV ? [list("bond.data.avv")] : []),
    ...list("bond.data.items"),
  ];

  return (
    <div className="bond">
      <Seo
        title={t("seo.bond.title")}
        description={t("seo.bond.description")}
        page="bond"
        noindex
      />

      {/* 00 — HERO ANIMADA */}
      {BondHero && (active ? (
        <Suspense fallback={<BondHeroSlot />}>
          <BondHero />
        </Suspense>
      ) : <BondHeroSlot />)}

      {/* 01 — CABECERA */}
      <Section className="bond-intro">
        <Reveal as="p" base="bond-rise" className="bond-tag">{t("bond.intro.tag")}</Reveal>
        <Reveal as="h2" className="bond-section__title">{t("bond.intro.title")}</Reveal>
        <Reveal as="p" className="bond-lead">{t("bond.intro.subtitle")}</Reveal>
        {showVideo && (
          <Reveal base="bond-rise" className="bond-video" threshold={0.1}>
            {/* Sin autoplay: solo se reproduce si lo pulsa quien visita */}
            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              controls
              playsInline
              preload="metadata"
              aria-label={t("bond.intro.videoLabel")}
            />
          </Reveal>
        )}
        <Actions demo={t("bond.cta.demo")} start={t("bond.cta.start")} />
        <Reveal as="p" base="bond-rise" className="bond-note">{t("bond.intro.note")}</Reveal>
      </Section>

      {/* 02 — ¿TE SUENA? */}
      <Section title={t("bond.pain.title")} className="bond-pain">
        <Reveal base="bond-rise"><CheckList items={list("bond.pain.items")} mark="wine" /></Reveal>
        <Reveal as="p" className="bond-closing">{t("bond.pain.closing")}</Reveal>
      </Section>

      {/* 03 — PRESENTAMOS BOND */}
      <Section
        title={t("bond.about.title")}
        className="bond-about"
        after={<Reveal base="bond-rise" threshold={0.1}><BondGallery /></Reveal>}
      >
        <Reveal as="p" className="bond-lead">{t("bond.about.text")}</Reveal>
      </Section>

      {/* 04 — QUÉ HACE BOND */}
      <Section title={t("bond.features.title")}>
        <Reveal base="bond-cards" className="bond-grid" threshold={0.1}>
          <div className="bond-card">
            <h3 className="bond-card__title">{t("bond.features.forYou.title")}</h3>
            <LeadList items={list("bond.features.forYou.items")} />
          </div>
          <div className="bond-card">
            <h3 className="bond-card__title">{t("bond.features.forClients.title")}</h3>
            <LeadList items={list("bond.features.forClients.items")} />
          </div>
        </Reveal>
        <Actions demo={t("bond.features.cta")} />
      </Section>

      {/* 05 — BOND HABLA TU IDIOMA */}
      <Section title={t("bond.language.title")}>
        <Reveal as="p" className="bond-lead">{t("bond.language.text")}</Reveal>
        <Reveal as="p" className="bond-lead">{t("bond.language.languages")}</Reveal>
      </Section>

      {/* 06 — CASO REAL (oculto con SHOW_BOND_CASE = false) */}
      {SHOW_BOND_CASE && (
        <Section title={t("bond.case.title")}>
          <Reveal as="p" className="bond-lead">{t("bond.case.text")}</Reveal>
          <Reveal as="figure" base="bond-rise" className="bond-testimonial">
            <video
              src={ramses.video}
              controls
              playsInline
              preload="metadata"
              aria-label={t("home.projects.videoLabel", { name: t("home.projects.items.ramses.name") })}
            />
            <figcaption>
              <strong>{t("home.projects.items.ramses.name")}</strong>
              <span>{t("home.projects.items.ramses.meta")}</span>
            </figcaption>
          </Reveal>
          <Actions demo={t("bond.case.cta")} />
        </Section>
      )}

      {/* 07 — ¿ES BOND PARA TI? */}
      <Section title={t("bond.fit.title")}>
        <Reveal base="bond-cards" className="bond-grid" threshold={0.1}>
          <div className="bond-card">
            <h3 className="bond-badge bond-badge--gold">{t("bond.fit.yes.title")}</h3>
            <CheckList items={list("bond.fit.yes.items")} />
          </div>
          <div className="bond-card">
            <h3 className="bond-badge bond-badge--wine">{t("bond.fit.no.title")}</h3>
            <CheckList items={list("bond.fit.no.items")} mark="wine" />
          </div>
        </Reveal>
      </Section>

      {/* 08 — CÓMO EMPEZAMOS */}
      <Section title={t("bond.steps.title")}>
        <Reveal as="ol" base="bond-cards" className="bond-steps" threshold={0.1}>
          {list("bond.steps.items").map((step) => (
            <li key={step.lead} className="bond-card">
              <strong>{step.lead}</strong> {step.text}
            </li>
          ))}
        </Reveal>
        <Reveal as="p" base="bond-rise" className="bond-note">{t("bond.steps.note")}</Reveal>
      </Section>

      {/* 09 — PRECIO */}
      <Section title={t("bond.pricing.title")}>
        <Reveal base="bond-cards" className="bond-grid" threshold={0.1}>
          <div className="bond-card">
            <h3 className="bond-card__title">{t("bond.pricing.setup.title")}</h3>
            <p className="bond-price">{t("bond.pricing.setup.price")}</p>
            <p className="bond-badge bond-badge--wine">{t("bond.pricing.setup.badge")}</p>
            <CheckList items={list("bond.pricing.setup.items")} />
          </div>
          <div className="bond-card">
            <h3 className="bond-card__title">{t("bond.pricing.subscription.title")}</h3>
            <p className="bond-price">{t("bond.pricing.subscription.price")}</p>
            <CheckList items={subscriptionItems} />
          </div>
        </Reveal>
        <Reveal as="p" base="bond-rise" className="bond-payment">
          <strong>{t("bond.pricing.paymentLead")}</strong> {t("bond.pricing.paymentText")}
        </Reveal>
        <Actions demo={t("bond.pricing.ctaDemo")} start={t("bond.pricing.ctaStart")} />
        <Reveal as="p" base="bond-rise" className="bond-note">{t("bond.pricing.note")}</Reveal>
      </Section>

      {/* 10 — TUS DATOS, SEGUROS */}
      <Section title={t("bond.data.title")} className="bond-data">
        <Reveal base="bond-rise" threshold={0.1}><LeadList items={dataItems} /></Reveal>
      </Section>

      {/* 11 — PREGUNTAS FRECUENTES */}
      <Section title={t("bond.faq.title")}>
        <Reveal base="bond-rise" className="bond-faq" threshold={0.1}>
          {list("bond.faq.items").map((item) => (
            <FaqItem key={item.q} question={item.q}><p>{item.a}</p></FaqItem>
          ))}
          <FaqItem question={t("bond.faq.providers.q")}>
            <table className="bond-providers">
              <thead>
                <tr>
                  <th scope="col">{t("bond.faq.providers.headProvider")}</th>
                  <th scope="col">{t("bond.faq.providers.headPurpose")}</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>{t(SHOW_BOND_MARKETING ? "bond.faq.providers.noteWithSysteme" : "bond.faq.providers.note")}</p>
          </FaqItem>
        </Reveal>
      </Section>

      {/* 12 — LLAMADA FINAL */}
      <Section title={t("bond.final.title")} className="bond-final">
        <Reveal as="p" className="bond-lead">{t("bond.final.text")}</Reveal>
        <Actions demo={t("bond.cta.demo")} start={t("bond.cta.start")} />
      </Section>

      {/* 13 — PIE */}
      <footer className="bond-footer">
        <span>{t("bond.footer.copyright")}</span>
        <span className="bond-footer__sep" aria-hidden="true" />
        <Link to={path("impressum")}>Impressum</Link>
        <Link to={path("privacy")}>Datenschutz</Link>
      </footer>
    </div>
  );
}

export default Bond;
