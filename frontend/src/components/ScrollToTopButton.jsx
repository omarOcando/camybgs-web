import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopButton() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const isContacto = pathname === "/contacto";

  return (
    <button
      onClick={handleClick}
      className={`scroll-top-btn${visible ? " scroll-top-btn--visible" : ""}${isContacto ? " scroll-top-btn--solo" : ""}`}
      aria-label="Volver al inicio"
    >
      △
    </button>
  );
}

export default ScrollToTopButton;
