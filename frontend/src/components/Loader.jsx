import { useEffect, useState } from "react";
import logoSrc from "../assets/images/LogoCamyDarkBG.png";

function Loader({ onFinish }) {
  const [visible,  setVisible]  = useState(false);
  const [fadeOut,  setFadeOut]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const DURATION    = 3000;
    const INTERVAL_MS = 30;
    const steps       = DURATION / INTERVAL_MS;
    let current       = 0;

    const t0 = setTimeout(() => setVisible(true), 50);

    const iv = setInterval(() => {
      current++;
      setProgress(Math.min(Math.round((current / steps) * 100), 100));
      if (current >= steps) clearInterval(iv);
    }, INTERVAL_MS);

    const t1 = setTimeout(() => setFadeOut(true),  DURATION);
    const t2 = setTimeout(() => onFinish(),         DURATION + 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(iv);
    };
  }, [onFinish]);

  return (
    <div className={`loader${visible ? " loader--visible" : ""}${fadeOut ? " loader--fadeOut" : ""}`}>
      <div className="loader__content">
        <img src={logoSrc} alt="CAMY" className="loader__logo" />
      </div>

      <p className="loader__tagline serif">Preparando tu experiencia...</p>

      <div className="loader__bottom">
        <span className="loader__percent">{progress}%</span>
        <div className="loader__bar">
          <div className="loader__progress" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

export default Loader;
