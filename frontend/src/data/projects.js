import ramsesImg from "../assets/images/mi-trabajo/ramsesImg.png";
import vivamexicoImg from "../assets/images/mi-trabajo/vivamexicoImg.png";
import pinterestImg from "../assets/images/mi-trabajo/pinterestImg.png";
import mercedesImg from "../assets/images/mi-trabajo/mercedesImg.png";
import testimonioRamses from "../assets/videos/clients-testimonials/testimonio-ramses.mp4";
import testimonioVivaMexico from "../assets/videos/clients-testimonials/testimonio-viva-mexico.mp4";

// ─── PROYECTOS ───────────────────────────────────────────────────────────────
// Fuente única de datos de proyectos/clientes. Cada proyecto se escribe una
// sola vez aquí y las páginas (Mi Trabajo, Resultados, Home) consumen de este
// array los campos que necesitan.
//
// Campos de portafolio (Mi Trabajo): name, category, type, client, challenge,
// work, result, tech, link, image.
// Campos de caso de éxito (Resultados), solo si caseStudy === true: caseClient,
// sector, location, problem, solution, video (result se reutiliza del bloque
// de portafolio).
// Campos de testimonio (Home), solo si testimonial === true: testimonialName,
// profession, testimonialText, video. videoAspect es opcional: relación de
// aspecto nativa del video (ej. "640 / 466") para mostrarlo en desktop en su
// tamaño original en vez del recuadro vertical 9:16 por defecto.

export const PROJECTS = [
  {
    id: "ramses",

    // Mi Trabajo
    name: "Coach de relaciones de pareja",
    category: ["Sistemas a medida", "Corporativos", "Corporativos + reservas", "Marketing digital"],
    type: "Sistema de gestión de clientes",
    client: "Ramsés Viloria - Frankfurt, Alemania",
    challenge: "Necesitaba un sistema propio con enfoque en su modelo de negocio, para gestionar clientes, reservas y pagos, sin depender de herramientas genéricas.",
    work: "Desarrollo de plataforma completa premium personalizada con panel de administración, gestión de citas, clientes y lógica de negocio específica.",
    result: "4 clientes nuevos en los primeros 45 días. ROI positivo desde el segundo mes.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Systeme.io"],
    link: null,
    image: ramsesImg,

    // Resultados
    caseStudy: true,
    caseClient: "Ramsés Viloria",
    sector: "Coach de relaciones de pareja",
    location: "Frankfurt, Alemania",
    problem: "5 años de experiencia como coach dependiendo 100% de referidos. Presencia digital pobre y sin un sistema de organización ni captación de clientes.",
    solution: "Sistema completo premium de gestión de clientes, con foco en su modelo de negocios. Creación de identidad de marca, integración de harramientas de Marketing, campaña de Meta Ads segmentada a su cliente ideal.",
    video: testimonioRamses,

    // Home
    testimonial: true,
    testimonialName: "Ramsés Viloria",
    profession: "Coach de relaciones de pareja",
    testimonialText: "Próximamente — los resultados hablan solos.",
  },
  {
    id: "vivamexico",

    // Mi Trabajo
    name: "Viva México",
    category: ["Corporativos"],
    type: "Sitio web corporativo bilingüe",
    client: "Javier Reyes - NRW, Alemania",
    challenge: "Reemplazar su sitio web anterior (WordPress desactualizado) por uno nuevo, sin perder el posicionamiento SEO ya ganado en Google, con soporte bilingüe (alemán/español) ya que su clientela incluye tanto locales como la comunidad latina en Alemania.",
    work: "SPA bilingüe (DE/ES) con React 19 + Vite, con galería de fotos y videos, sección de repertorio con muestras de audio, propuestas de formato (dúo/trío/mariachi completo), formulario de contacto, integración de Google Analytics 4 y Meta Pixel, consentimiento de cookies conforme a normativa alemana (DSGVO), y migración completa de contenido y redirects SEO desde el sitio WordPress anterior. Deploy manual vía SFTP a hosting compartido de IONOS.",
    result: "Sitio lanzado exitosamente, sustituyendo al anterior sin pérdida de posicionamiento.",
    tech: ["React 19", "Vite 8", "React Router", "react-i18next", "SCSS", "vanilla-cookieconsent", "Formspree", "Google Analytics 4", "Meta Pixel"],
    link: "https://mexikanische-musik.de",
    image: vivamexicoImg,

    // Resultados
    caseStudy: true,
    caseClient: "Javier Reyes",
    sector: "Entretenimiento — banda de mariachi profesional, activa desde 1992",
    location: "NRW, Alemania",
    problem: "Reemplazar su sitio web anterior (WordPress desactualizado) por uno nuevo, sin perder el posicionamiento SEO ya ganado en Google, con soporte bilingüe (alemán/español) ya que su clientela incluye tanto locales como la comunidad latina en Alemania.",
    solution: "SPA bilingüe (DE/ES) con React 19 + Vite, con galería de fotos y videos, sección de repertorio con muestras de audio, propuestas de formato (dúo/trío/mariachi completo), formulario de contacto, integración de Google Analytics 4 y Meta Pixel, consentimiento de cookies conforme a normativa alemana (DSGVO), y migración completa de contenido y redirects SEO desde el sitio WordPress anterior. Deploy manual vía SFTP a hosting compartido de IONOS.",
    video: testimonioVivaMexico,
    videoAspect: "640 / 466",

    // Home
    testimonial: true,
    testimonialName: "Viva México",
    profession: "Banda de mariachi profesional",
  },
  {
    id: "pinterest",

    name: "Réplica de Pinterest",
    category: ["Portafolios"],
    type: "Aplicación web interactiva",
    client: "Pinterest",
    challenge: "Integración de APIs externas y programación asíncrona en JavaScript.",
    work: "Desarrollo de una aplicación interactiva de búsqueda de imágenes que replica la funcionalidad principal de Pinterest: el usuario introduce una búsqueda y la app obtiene y muestra imágenes en tiempo real.",
    result: "Dominio de consumo de APIs, JavaScript asíncrono y maquetación dinámica.",
    tech: ["HTML", "SCSS", "JavaScript"],
    link: "https://omarocando.github.io/pinterestRep/",
    image: pinterestImg,
  },
  {
    id: "mercedes",

    name: "Réplica de Mercedes-Benz",
    category: ["Landing pages", "Corporativos"],
    type: "Sitio web corporativo",
    client: "Mercedes-Benz",
    challenge: "CSS avanzado, diseño responsivo y técnicas de desarrollo front-end mediante la recreación de una landing page de referencia de alto nivel.",
    work: "Desarrollo de landing page responsiva con elementos de diseño modernos y componentes interactivos, replicando la estética premium de Mercedes-Benz.",
    result: "Dominio de CSS avanzado, diseño responsivo y maquetación de páginas de alto impacto visual.",
    tech: ["HTML", "CSS"],
    link: "https://omarocando.github.io/landing_page/",
    image: mercedesImg,
  },
];
