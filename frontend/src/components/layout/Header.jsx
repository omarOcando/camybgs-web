import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import logoSrc       from "../../assets/images/LogoCamyDarkBG.png";
import logoMobileSrc from "../../assets/images/LogoCamySoloDarkBG.png";
import audioSrc from "../../assets/audios/leberch-ambient-electronics-524300.mp3";

const NAV_LINKS = [
  { to: "/",           label: "Home",      end: true },
  { to: "/servicios",  label: "Servicios"  },
  { to: "/resultados", label: "Resultados" },
  { to: "/sobre-mi",   label: "Sobre Mí"   },
  { to: "/mi-trabajo", label: "Mi Trabajo" },
  { to: "/contacto",   label: "Contacto"   },
];

// Gotas irregulares — parte inferior, clusters y tamaños muy variados
const DROPS = [
  { left:  "3%", w: 11, h: 15, dt: "0.36s", dur: "0.44s" },
  { left:  "7%", w:  6, h:  8, dt: "0.54s", dur: "0.35s" },
  { left: "12%", w: 15, h: 18, dt: "0.41s", dur: "0.50s" },
  { left: "16%", w:  7, h:  9, dt: "0.67s", dur: "0.37s" },
  { left: "17%", w:  4, h:  5, dt: "0.82s", dur: "0.30s" }, // cluster con 16%
  { left: "29%", w:  9, h: 12, dt: "0.48s", dur: "0.42s" },
  { left: "38%", w:  5, h:  7, dt: "0.62s", dur: "0.33s" },
  { left: "46%", w: 13, h: 17, dt: "0.39s", dur: "0.48s" },
  { left: "51%", w:  6, h:  8, dt: "0.71s", dur: "0.36s" },
  { left: "52%", w:  3, h:  5, dt: "0.87s", dur: "0.28s" }, // cluster con 51%
  { left: "61%", w:  8, h: 11, dt: "0.55s", dur: "0.40s" },
  { left: "73%", w: 12, h: 16, dt: "0.43s", dur: "0.46s" },
  { left: "78%", w:  5, h:  7, dt: "0.66s", dur: "0.34s" },
  { left: "80%", w:  7, h: 10, dt: "0.77s", dur: "0.38s" }, // cluster con 78%
  { left: "89%", w:  9, h: 13, dt: "0.51s", dur: "0.43s" },
  { left: "96%", w:  6, h:  8, dt: "0.73s", dur: "0.36s" },
];

// Salpicado inferior — clusters irregulares, gaps reales, tamaños muy variados
const SPLATS_B = [
  // Cluster A: zona izquierda densa (1–9%)
  { left:  "1%", w:  3, h: 2, dt: "0.81s", oy:  9 },
  { left:  "4%", w: 11, h: 7, dt: "0.69s", oy: 14 },
  { left:  "6%", w:  2, h: 2, dt: "1.05s", oy: 32 },
  { left:  "9%", w:  5, h: 4, dt: "0.91s", oy: 19 },
  // GAP: 9% → 24%
  { left: "25%", w:  7, h: 5, dt: "0.74s", oy:  8 },
  // GAP: 25% → 33%
  // Cluster B
  { left: "34%", w:  3, h: 3, dt: "0.97s", oy: 24 },
  { left: "36%", w:  9, h: 6, dt: "0.73s", oy: 10 },
  { left: "38%", w:  2, h: 2, dt: "1.13s", oy: 28 },
  // GAP: 38% → 47%
  // Cluster C: zona media muy densa
  { left: "48%", w:  6, h: 4, dt: "0.85s", oy: 12 },
  { left: "50%", w: 12, h: 8, dt: "0.67s", oy:  6 },
  { left: "51%", w:  2, h: 3, dt: "1.09s", oy: 21 },
  { left: "54%", w:  4, h: 3, dt: "0.96s", oy: 17 },
  // GAP: 54% → 63%
  { left: "64%", w:  5, h: 4, dt: "0.78s", oy: 11 },
  { left: "67%", w:  2, h: 2, dt: "1.07s", oy: 26 },
  // GAP: 67% → 74%
  // Cluster D: zona derecha densa (75–83%)
  { left: "75%", w:  8, h: 5, dt: "0.72s", oy:  7 },
  { left: "76%", w:  3, h: 3, dt: "1.11s", oy: 34 },
  { left: "79%", w: 10, h: 7, dt: "0.65s", oy:  9 },
  { left: "81%", w:  2, h: 2, dt: "0.99s", oy: 22 },
  { left: "83%", w:  5, h: 4, dt: "0.86s", oy: 16 },
  // GAP: 83% → 92%
  { left: "93%", w:  4, h: 6, dt: "0.76s", oy: 13 },
  { left: "95%", w:  2, h: 2, dt: "1.06s", oy: 29 },
  { left: "98%", w:  6, h: 3, dt: "0.88s", oy: 11 },
];

// Salpicado superior — fragmentos irregulares, clusters y gaps marcados
const SPLATS_T = [
  // Cluster inicio
  { left:  "3%", w:  7, h:  4, dt: "0.52s", oy: 16 },
  { left:  "5%", w:  2, h:  5, dt: "0.74s", oy: 28 },
  { left:  "7%", w: 10, h:  3, dt: "0.41s", oy: 11 },
  // GAP: 7% → 18%
  { left: "19%", w:  4, h:  6, dt: "0.64s", oy: 21 },
  // GAP: 19% → 33%
  // Cluster compacto
  { left: "34%", w:  8, h:  5, dt: "0.48s", oy: 14 },
  { left: "36%", w:  3, h:  3, dt: "0.80s", oy: 29 },
  { left: "37%", w:  2, h:  6, dt: "0.71s", oy: 19 },
  // GAP: 37% → 53%
  // Cluster denso
  { left: "54%", w:  5, h:  3, dt: "0.58s", oy: 12 },
  { left: "56%", w:  2, h:  2, dt: "0.87s", oy: 33 },
  { left: "58%", w:  9, h:  6, dt: "0.44s", oy: 17 },
  { left: "60%", w:  3, h:  4, dt: "0.76s", oy: 24 },
  // GAP: 60% → 70%
  { left: "71%", w:  6, h:  3, dt: "0.55s", oy: 13 },
  { left: "74%", w:  2, h:  4, dt: "0.84s", oy: 27 },
  // GAP: 74% → 83%
  // Cluster final
  { left: "84%", w:  5, h:  7, dt: "0.49s", oy: 18 },
  { left: "86%", w:  3, h:  2, dt: "0.90s", oy: 31 },
  { left: "90%", w:  8, h:  4, dt: "0.60s", oy: 15 },
  { left: "94%", w:  4, h:  3, dt: "0.77s", oy: 22 },
];

const WAVE_FLAT = "M 2 15 L 26 15";

function buildWavePath(t, scale) {
  const cy = 15;
  const env = (2.8
    + 2.2 * Math.sin(t * 0.31)
    + 1.1 * Math.sin(t * 0.71 + 1.1)
    + 0.6 * Math.abs(Math.sin(t * 0.19))) * scale;

  let d = `M 2 ${cy}`;
  for (let x = 2; x <= 26; x++) {
    const y = cy
      + env         * Math.sin(0.42 * x + t)
      + 1.4 * scale * Math.sin(0.85 * x + t * 1.7 + 0.9)
      + 0.9 * scale * Math.sin(0.23 * x + t * 0.55 + 2.3)
      + 0.5 * scale * Math.sin(1.6  * x + t * 2.8 + 0.4);
    d += ` L ${x} ${Math.max(3, Math.min(27, y)).toFixed(2)}`;
  }
  return d;
}

function Header() {
  const [menuState, setMenuState] = useState("closed");
  const [isPlaying, setIsPlaying] = useState(false);
  const isOpen = menuState === "open";

  const audioRef       = useRef(null);
  const wavePathRef    = useRef(null);
  const animRef        = useRef(null);
  const ampScaleRef    = useRef(0);
  const targetScaleRef = useRef(0);
  const burgerRef      = useRef(null);

  const openMenu  = () => setMenuState("open");
  const closeMenu = () => {
    setMenuState("closing");
    setTimeout(() => setMenuState("closed"), 700);
  };

  const startLoop = () => {
    const loop = (ts) => {
      const target = targetScaleRef.current;
      // Lerp suave hacia el objetivo
      ampScaleRef.current += (target - ampScaleRef.current) * 0.06;
      const s = ampScaleRef.current;

      if (wavePathRef.current) {
        if (s < 0.004 && target === 0) {
          // Llegó a plana — resetea y detiene el loop
          wavePathRef.current.setAttribute("d", WAVE_FLAT);
          animRef.current = null;
          return;
        }
        wavePathRef.current.setAttribute("d", buildWavePath(ts / 300, s));
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current?.play().catch(() => {});
      ampScaleRef.current  = 0;
      targetScaleRef.current = 1;
      startLoop();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      targetScaleRef.current = 0;
      // El loop sigue corriendo y reduce la amplitud hasta llegar a plana
      setIsPlaying(false);
    }
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // Limpia las animaciones de entrada del burger una vez terminadas,
  // para que los transforms de apertura del menú funcionen sin conflictos.
  useEffect(() => {
    const timer = setTimeout(() => {
      burgerRef.current?.querySelectorAll("span").forEach(s => {
        s.style.animation = "none";
      });
    }, 6300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateAngle = () => {
      const angle = -Math.atan2(window.innerHeight, window.innerWidth) * (180 / Math.PI);
      document.documentElement.style.setProperty("--nav-stripe-angle",  `${angle.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--nav-counter-angle", `${(-angle).toFixed(2)}deg`);
    };
    updateAngle();
    window.addEventListener("resize", updateAngle);
    return () => window.removeEventListener("resize", updateAngle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Filtro SVG — bordes rugosos tipo pintura */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="paint-rough" x="-5%" y="-40%" width="110%" height="180%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02 0.055"
              numOctaves="4"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="paint-rough-b" x="-5%" y="-40%" width="110%" height="180%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.03 0.07"
              numOctaves="3"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="9"
              xChannelSelector="G"
              yChannelSelector="R"
            />
          </filter>
        </defs>
      </svg>

      <audio ref={audioRef} loop src={audioSrc} />

      <header className={`header${isOpen ? " header--menu-open" : ""}`}>
        <div className="header__left">
          <NavLink
            to="/"
            className="header__logo"
            onClick={menuState !== "closed" ? closeMenu : undefined}
          >
            <img src={logoSrc}       alt="CAMY" className="header__logo-img header__logo-img--desktop" />
            <img src={logoMobileSrc} alt="CAMY" className="header__logo-img header__logo-img--mobile" />
          </NavLink>

          <button
            className={`header__music-btn${isPlaying ? " header__music-btn--playing" : ""}`}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            <svg width="28" height="30" viewBox="0 0 28 30" aria-hidden="true">
              <path
                ref={wavePathRef}
                d={WAVE_FLAT}
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button
          ref={burgerRef}
          className={`header__burger${isOpen ? " header__burger--open" : ""}`}
          onClick={isOpen ? closeMenu : openMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Fondo oscuro con blur */}
      <div
        className={`nav-backdrop${isOpen ? " nav-backdrop--visible" : ""}`}
        onClick={closeMenu}
      />

      <nav className={`nav-panel nav-panel--${menuState}`} aria-hidden={!isOpen}>
        <div className="nav-panel__stripe">
          <div className="nav-panel__stripe-bg" aria-hidden="true" />
          <div className="nav-panel__stripe-rough-b" aria-hidden="true" />

          <ul className="nav-panel__list">
            {NAV_LINKS.map(({ to, label, end }, i) => (
              <Fragment key={to}>
                <li
                  className="nav-panel__item"
                  style={{ "--i": NAV_LINKS.length - 1 - i }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    className="nav-panel__link"
                    onClick={closeMenu}
                  >
                    {label}
                  </NavLink>
                </li>
                {i < NAV_LINKS.length - 1 && (
                  <li className="nav-panel__sep" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </ul>
        </div>

        <div className="nav-panel__drips" aria-hidden="true">
          {DROPS.map((d, i) => (
            <span
              key={i}
              className="nav-panel__drop"
              style={{ left: d.left, width: `${d.w}px`, height: `${d.h}px`, "--dt": d.dt, "--dur": d.dur }}
            />
          ))}
          {SPLATS_B.map((s, i) => (
            <span
              key={i}
              className="nav-panel__splat-b"
              style={{ left: s.left, width: `${s.w}px`, height: `${s.h}px`, top: `calc(100% + ${s.oy}px)`, "--dt": s.dt }}
            />
          ))}
          {SPLATS_T.map((s, i) => (
            <span
              key={i}
              className="nav-panel__splat-t"
              style={{ left: s.left, width: `${s.w}px`, height: `${s.h}px`, bottom: `calc(100% + ${s.oy}px)`, "--dt": s.dt }}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

export default Header;
