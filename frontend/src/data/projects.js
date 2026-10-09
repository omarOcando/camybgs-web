import ramsesImg from "../assets/images/mi-trabajo/ramsesImg.webp";
import vivamexicoImg from "../assets/images/mi-trabajo/vivamexicoImg.webp";
import testimonioRamses from "../assets/videos/clients-testimonials/testimonio-ramses.mp4";
import testimonioVivaMexico from "../assets/videos/clients-testimonials/testimonio-viva-mexico.mp4";

// ─── PROYECTOS ───────────────────────────────────────────────────────────────
// Fuente única de proyectos y testimonios. Aquí van solo los datos que no
// dependen del idioma; los textos de cada proyecto están en es.json, bajo
// proyectos.items.<id> (página Proyectos) y home.projects.items.<id> (Home).
// Si el nombre de la tarjeta (name) es el del cliente, no se repite en la
// línea de cliente (client): ahí va solo profesión · ciudad.
//
// category: "One" | "Multi" | "Custom" | "Bond". El filtro de Proyectos solo
// muestra las categorías que tienen al menos un proyecto.
// link: null deja el botón "Ver proyecto" desactivado.
// testimonial: true muestra su vídeo en la Home y en Proyectos. videoAspect es
// opcional: relación de aspecto nativa del vídeo (ej. "640 / 466") en vez del
// recuadro vertical 9:16 por defecto.

export const PROJECTS = [
  {
    id: "ramses",
    category: "Custom",
    tech: ["React", "Node.js", "MongoDB", "Express", "Systeme.io"],
    link: null,
    image: ramsesImg,
    testimonial: true,
    video: testimonioRamses,
  },
  {
    id: "vivamexico",
    category: "Multi",
    tech: ["React", "Vite", "react-i18next", "Google Analytics 4"],
    link: "https://mexikanische-musik.de",
    image: vivamexicoImg,
    testimonial: true,
    video: testimonioVivaMexico,
    videoAspect: "640 / 466",
  },
];

// Orden en que aparecen las categorías en el filtro
export const CATEGORIES = ["One", "Multi", "Custom", "Bond"];
