import { useEffect, useRef } from "react";
// Orbitron alojada en el propio sitio, como Outfit y DM Serif Display (main.jsx).
// Se importa aquí y no en main.jsx para que viaje solo con la hero.
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import { mountBondHero } from "./bondHeroEngine";
import logo from "./bond-logo.webp";
import "./BondHero.css";

/**
 * Hero animada de Bond.
 * Uso: <BondHero />            (versión para la web)
 *      <BondHero showReplay /> (con botón "Repetir", útil para revisarla)
 */
export default function BondHero({ showReplay = false }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = mountBondHero(rootRef.current, logo);
    return cleanup;
  }, []);

  return (
    <section className="bh-hero" ref={rootRef} aria-label="Bond">
      <div className="bh-light-top" />
      <div className="bh-light-floor" />
      <canvas className="bh-stage" aria-hidden="true" />
      <div
        className="bh-logo-box"
        role="img"
        aria-label="Logo de Bond: símbolo de infinito dorado y verde"
      />
      <div className="bh-word">
        <h1 className="bh-bond">BOND</h1>
        <div className="bh-bond bh-reflect" aria-hidden="true">BOND</div>
        <div className="bh-floor-line" />
      </div>
      <div className="bh-vignette" />
      <div className="bh-grain" />
      {showReplay && (
        <button className="bh-replay" type="button">Repetir</button>
      )}
    </section>
  );
}
