import { useState, useEffect, useRef } from "react";

// Texto que entra con fundido y zoom suave (como los títulos de la Home)
// cuando aparece en pantalla. Uso: <Reveal as="h2" className="...">…</Reveal>
function Reveal({ as = "div", className = "", threshold = 0.2, children }) {
  const Tag = as;
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

  const classes = ["reveal-zoom", visible && "reveal-zoom--visible", className].filter(Boolean).join(" ");
  return <Tag ref={ref} className={classes}>{children}</Tag>;
}

export default Reveal;
