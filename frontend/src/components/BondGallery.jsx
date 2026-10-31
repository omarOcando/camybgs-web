import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BOND_GALLERY } from "../data/bondGallery";
import { useLocalePath } from "../config/routes";

const DEG = 180 / Math.PI;
const EASE_MS = 170;      // cuanto mayor, más lento gira el aro
const DRAG_THRESHOLD = 6; // px para distinguir arrastrar de pulsar
const MOBILE_WIDTH = 768; // $mobile: hasta aquí, sin foco de luz ni reducción extra

const wrap = (index, total) => ((index % total) + total) % total;

// Aro elíptico: cada foto entra por la izquierda desde el fondo, llega al
// frente y se va por la derecha. rotation es un número continuo: cuando vale i,
// la foto i está delante. Las fotos se colocan a mano en cada cuadro para que
// recorran la curva de verdad (una transición CSS iría en línea recta).
function placeRing(stage, items, rotation) {
  const width = stage.clientWidth;
  const radiusX = width * 0.62;
  const radiusZ = Math.min(Math.max(width * 0.9, 560), 1200);
  const lift = Math.min(width * 0.09, 130); // las de atrás, más arriba
  const step = (Math.PI * 2) / items.length;
  const isMobile = width <= MOBILE_WIDTH;

  items.forEach((item, i) => {
    const angle = (rotation - i) * step;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const depth = (cos + 1) / 2; // 1 delante, 0 detrás
    const x = sin * radiusX;
    const y = (depth - 1) * lift;
    const z = (cos - 1) * radiusZ;
    // Como un seguidor de luz: solo la foto de delante queda iluminada
    const light = isMobile ? 0.3 + depth * 0.7 : 0.14 + depth ** 6 * 0.86;
    const scale = isMobile ? 1 : 0.7 + depth ** 2 * 0.3;
    item.style.transform =
      `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${sin * 58}deg) scale(${scale})`;
    item.style.zIndex = Math.round(depth * 100);
    item.style.filter = `brightness(${light})`;
  });
}

function BondGallery() {
  const { t } = useTranslation();
  const { lang } = useLocalePath();
  const photos = BOND_GALLERY[lang];
  const total = photos.length;

  const [front, setFront] = useState(0);
  const stageRef = useRef(null);
  const itemsRef = useRef([]);
  const rotation = useRef(0);
  const target = useRef(0);
  const frame = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);

  const paint = () => {
    if (stageRef.current) placeRing(stageRef.current, itemsRef.current, rotation.current);
  };

  const animate = () => {
    let last = null;
    cancelAnimationFrame(frame.current);
    const tick = (now) => {
      const blend = 1 - Math.exp(((last ?? now) - now) / EASE_MS);
      last = now;
      rotation.current += (target.current - rotation.current) * blend;
      if (Math.abs(target.current - rotation.current) < 0.001) rotation.current = target.current;
      paint();
      if (rotation.current !== target.current) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  const goTo = (next) => {
    target.current = next;
    setFront(wrap(next, total));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotation.current = next;
      paint();
    } else {
      animate();
    }
  };

  // Una foto del fondo viene al frente por el camino corto; la de delante da paso a la siguiente
  const handlePhoto = (index) => {
    if (dragged.current) return;
    const distance = wrap(index - target.current, total);
    if (distance === 0) goTo(target.current + 1);
    else goTo(target.current + (distance > total / 2 ? distance - total : distance));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") goTo(target.current - 1);
    if (e.key === "ArrowLeft") goTo(target.current + 1);
  };

  const handlePointerDown = (e) => {
    dragged.current = false;
    drag.current = { x: e.clientX, rotation: rotation.current };
    cancelAnimationFrame(frame.current);
  };

  const handlePointerMove = (e) => {
    if (!drag.current) return;
    const delta = e.clientX - drag.current.x;
    if (!dragged.current && Math.abs(delta) < DRAG_THRESHOLD) return;
    dragged.current = true;
    rotation.current = drag.current.rotation + delta / (stageRef.current.clientWidth * 0.3);
    paint();
  };

  const handlePointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    goTo(dragged.current ? Math.round(rotation.current) : target.current);
  };

  useLayoutEffect(paint, []);

  useEffect(() => {
    const observer = new ResizeObserver(paint);
    observer.observe(stageRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const caption = t(`bond.gallery.items.${photos[front].key}`);

  return (
    <div
      className="bond-gallery"
      role="group"
      aria-roledescription={t("bond.gallery.role")}
      aria-label={t("bond.gallery.label")}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={stageRef}
        className="bond-gallery__stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {photos.map((photo, i) => (
          <button
            key={photo.key}
            ref={(el) => { itemsRef.current[i] = el; }}
            type="button"
            className={`bond-gallery__item bond-gallery__item--${photo.device}`}
            aria-label={t(`bond.gallery.items.${photo.key}`)}
            aria-current={i === front ? "true" : undefined}
            tabIndex={i === front ? 0 : -1}
            onClick={() => handlePhoto(i)}
          >
            <img src={photo.src} alt="" loading="lazy" decoding="async" draggable="false" />
          </button>
        ))}
      </div>

      <div className="bond-gallery__controls">
        <button
          type="button"
          className="bond-gallery__arrow"
          aria-label={t("bond.gallery.previous")}
          onClick={() => goTo(target.current + 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className="bond-gallery__caption" aria-live="polite">{caption}</p>
        <button
          type="button"
          className="bond-gallery__arrow"
          aria-label={t("bond.gallery.next")}
          onClick={() => goTo(target.current - 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default BondGallery;
