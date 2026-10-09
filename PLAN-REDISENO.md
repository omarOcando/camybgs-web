# Plan del rediseño de camybgs.com (fase 1, solo español)

> Documento de trabajo para continuar el rediseño en una conversación nueva.
> Complementa a `BRIEF-REDISENO.md`, que tiene el alcance y los textos definitivos (Anexo).
> Última actualización: 9 de octubre de 2026, tras el visto bueno de la Fase 5 (commit `892f0ba`).

## Cómo retomar
1. Leer `BRIEF-REDISENO.md` completo (incluido el Anexo) y este documento.
2. Confirmar la rama: `git branch --show-current` → `rediseno-2026`.
3. Empezar por la **siguiente fase pendiente** (ahora la **Fase 6**), solo cuando Omar haya dado el visto bueno a la anterior.

---

## 1. Forma de trabajo
- **Rama:** todo se hace en `rediseno-2026`. No tocar `master` ni hacer merge hasta que Omar lo apruebe. Existe la etiqueta `v1-antes-rediseno` para volver a la versión anterior.
- **Una fase cada vez.**
- **Al terminar cada fase o ajuste:**
  1. `cd frontend && npm run lint && npm run build`. El lint debe seguir en los **12 problemas previos** y ninguno nuevo (ver §5).
  2. Commit en `rediseno-2026`, con el mensaje terminado en la línea `Co-Authored-By` de Claude.
  3. **Pedir confirmación a Omar antes del push.**
  4. Después del push, **esperar el visto bueno de Omar en la vista previa de Vercel** antes de empezar la siguiente fase.
- Responder siempre en español.
- Para revisar los cambios, comprobar en el navegador:
  - anchos de 320 a 1440 px;
  - **con barra de scroll clásica** (Chrome headless la oculta por defecto: lanzar Playwright con `ignoreDefaultArgs: ["--hide-scrollbars"]`) y sin ella;
  - con `prefers-reduced-motion`.
- Playwright **no** se instala en el proyecto: va en un directorio temporal y se usa el Chrome del sistema (`channel: "chrome"`).

---

## 2. Cómo está hecho el proyecto (resumen)
- **Stack:** React 19 + Vite + React Router 7 + SCSS (`frontend/src/styles/`) + react-helmet-async. Despliegue en Vercel: SPA estática + función serverless `frontend/api/contact.js`.
- **`backend/`:** Express, legado. **No se toca.**
- **Idiomas:** react-i18next (desde la Fase 0).
  - Textos en `frontend/src/locales/es.json` (por página: `common`, `nav`, `footer`, `seo`, `home`, `servicios`, `bond`, `proyectos`, `sobreMi`, `contacto`, `leadMagnet`).
  - Inicialización en `frontend/src/i18n.js`. El inglés se añadirá después con un `en.json`; en esta fase no se crea.
  - Los legales (Impressum, Datenschutz) se quedan fuera de `es.json`.
- **Configuración** en `frontend/src/config/site.js`:
  - interruptores del lead magnet (`SHOW_LEAD_POPUP` y `SHOW_LEAD_FLOAT_BTN`, ambos `false`) y su URL (`LEAD_MAGNET_URL`);
  - `CONTACT` (WhatsApp, teléfono, Telegram, Signal, email);
  - `BOND_SALES_URL` y `BOND_DEMO_URL`.
- **Componentes clave:**
  - `layout/Header.jsx`: menú `NAV_LINKS` + botón de música.
  - `layout/Footer.jsx`.
  - `Loader.jsx`: al terminar, activa la Home con la prop `active`.
  - `Seo.jsx`.
  - `data/projects.js`: fuente única de proyectos y testimonios.
  - `WhatsAppButton.jsx`.
  - `AuroraMandala.jsx`: **no modificar el shader**.
  - `ContactRadial.jsx`: menú radial del hero.
- **Formulario de contacto:** `pages/Contacto.jsx` → `services/contactService.js` → `api/contact.js`. Este último:
  - guarda en Mongo (`lib/Contact.js`, colección `leads-web`);
  - crea el contacto en Systeme con la etiqueta `2049193` (`lib/systeme.js`);
  - envía el email con Resend (`lib/email.js`).

---

## 3. Decisiones de Omar

### Dudas D1–D12
- **D1 — Fondo AuroraMandala:**
  - Va detrás de **toda la Home**, desde el hero hasta el footer.
  - Las secciones de la Home son transparentes (sin fondos arena, noche ni vinotinto) y **sin velo** detrás de los textos.
  - La legibilidad se revisará sección por sección **después de la Fase 2**.
  - El mandala se monta cuando termina el Loader.
- **D2 — Idiomas:** react-i18next con `es.json`. Los legales quedan fuera y no se tocan en esta fase.
- **D3 — Nombre:**
  - Se mantiene "CAMY | Business Growth Solutions" en el footer, el JSON-LD y los legales.
  - Solo se actualizan las descripciones que hablan de marketing o captación.
- **D4 — Formulario:**
  - "¿Qué te interesa?" es **obligatorio**, con "Selecciona una opción" al principio.
  - Opciones visibles (sin artículos): Web One · Web Multi · Web Custom · Plataforma Bond · Mantenimiento (Basic o Plus) · Aún no lo sé.
  - Systeme: **se mantiene la etiqueta 2049193** y se añade **una etiqueta según el interés**. Omar creará las etiquetas y pasará los IDs; mientras tanto, marcadores.
  - Si alguien escribe otra vez con el mismo email, **también se guarda en Mongo** (no perder mensajes).
- **D5 — Imagen Open Graph:** se mantiene la actual. Omar hará una nueva en Canva más adelante.
- **D6 — Título de la sección de proyectos de la Home:** "Me alegra mucho compartir sus logros…".
- **D7 — Erratas:**
  - Hero sin coma: "…forma y movimiento expresan…".
  - En Bond, "sin perderse entre chats" se queda igual.
- **D8 — Proyectos:**
  - Testimonios: solo vídeo + nombre.
  - Ramsés sin enlace (botón "Ver proyecto" desactivado).
  - Viva México con la lista de tecnologías del Anexo.
- **D9 — Llamada y botón del hero:**
  - La llamada usa el mismo número que WhatsApp (+49 177 858 7715).
  - "Hablemos de tu web" abre un **menú radial** (hecho en la Fase 1):
    - solo iconos redondos con el color de cada app;
    - salen girando desde el centro, uno tras otro, y se colocan alrededor del botón sin dibujar ningún círculo;
    - el botón queda semitransparente y los iconos flotan con un vaivén;
    - se cierran pulsando fuera, pulsando el botón o con Esc;
    - en móvil el radio es más pequeño;
    - con reduced-motion solo hay fundido;
    - accesible, con tooltip al pasar el ratón.
- **D10 — Textos menores:** los adapto yo al nuevo tono y **se los enseño a Omar para aprobarlos**: pantalla de éxito del formulario, placeholders, texto del Loader y mensajes predefinidos de WhatsApp y `/tarjeta` (este último está en inglés).
- **D11 — Redirecciones:**
  - `/resultados` y `/mi-trabajo` → `/proyectos` con `"statusCode": 301` en `vercel.json` (`permanent: true` daría un 308).
  - Además, `<Navigate replace>` en el router.
  - Al migrar a Render habrá que replicarlas.
- **D12 — Limpieza:**
  - Se borran el vídeo del hero, las imágenes de Pinterest y Mercedes, `Resultados.jsx`, `MiTrabajo.jsx` y los SCSS antiguos.
  - `backend/` no se toca.

### Preguntas de la Fase 1
1. **Icono de Llamada:** Fuego CAMY (#F04E23). ✅
2. **Legibilidad:** no se toca ahora; se revisa sección por sección después de la Fase 2.
3. **Logo:** se queda como está (la imagen todavía dice "MARKETING · WEB"). Omar pasará una versión nueva más adelante.
4. **Titular del hero:** ✅
   - En escritorio, 2 líneas: "Tienes algo que decir." / "Haz que tu web lo haga sentir.".
   - En móvil puede ocupar más líneas, pero:
     - siempre con el salto entre las dos frases;
     - "Tienes algo que decir." en **una sola línea entre 320 y 767 px**;
     - sin palabra sola en la última línea de la segunda frase.

### Preguntas de la Fase 2
1. **Tarjeta Multi** (fondo Noche, apenas se distingue del fondo oscuro): se ve en la revisión de legibilidad.
2. **Errata del Anexo:** "…ni por qué deberías ayudarlo" → "…ni por qué debería elegirte." ✅ Corregida en `es.json` y en el brief.
3. **Título y descripción SEO de la Home:** se cambian en la Fase 7.
4. **Proyectos en la Home:** nombre, profesión · ciudad, texto del Anexo y "Resultado:" destacado (Ramsés). ✅ La regla "solo vídeo + nombre" (D8) es para `/proyectos`.

### Preguntas de la Fase 3
1. **Título de los testimonios en `/proyectos`:** "En sus propias palabras". ✅
2. **Línea de cliente de las tarjetas:** si el título de la tarjeta es el nombre del cliente, no se repite en la línea de cliente. Ramsés queda "Coach de relaciones de pareja · Frankfurt". ✅ Aplicar la misma regla a las tarjetas futuras.
3. **`sitemap.xml`:** se actualiza en la Fase 7.
4. **Imágenes pesadas de las tarjetas:** se comprimen en la Fase 7 (ver Fase 7 y §5).

### Preguntas de la Fase 4
1. **Logo del footer:** la versión que solo dice "CAMY" (`LogoCamySoloDarkBG.png`) hasta que Omar pase el logo nuevo. ✅
2. **Redes sociales:** sin redes en el footer. Se quitó el bloque comentado (eran las redes de Ramsés y el LinkedIn de Omar). ✅
3. **Precio de Bond:** en dos líneas, con las etiquetas destacadas: "**Montaje:** 999 € (o en cuotas desde 96 €/mes)" y "**Suscripción:** 99 €/mes". ✅ Actualizado en el Anexo. **Mismo formato en el bloque de Bond de Servicios** (Fase 5).

### Preguntas de la Fase 5
1. **FAQ:** título visible "Preguntas frecuentes". ✅
2. **Tabla de pago:** la primera columna no lleva título visible (solo un texto para lectores de pantalla). ✅

### Preguntas de la Fase 6 (textos D10)
1. **Loader:** se queda "Preparando tu experiencia...". ✅
2. **Placeholders de Contacto:** "Julia Smith", "julia@tunegocio.com", "Coach, panadería, estudio de yoga…" y "Qué haces y qué quieres que tu web transmita". ✅
3. **Pantalla de éxito:** "…si quieres ver cómo trabajo, echa un vistazo a mis proyectos." ✅
4. **Mensaje de WhatsApp en Contacto:** "Hola Omar, me gustaría hablar contigo sobre una web para mi negocio." ✅
5. **`/tarjeta`:** se queda en inglés, sin cambios. ✅
6. **Base de datos de Preview:** una aparte en el mismo cluster (`MONGO_URI` de Preview con otro nombre de base de datos). El índice `email_1` de la colección real se borra al publicar y se comprueba después del merge (el código antiguo puede volver a crearlo).

---

## 4. Fases

### ✅ Fase 0 — Base técnica (hecha, visto bueno de Omar)
Commit `a1f2fe8`.
- Instalados `i18next` + `react-i18next`. Creados `src/i18n.js` y `src/locales/es.json`.
- Creado `src/config/site.js` con interruptores, URL del lead magnet, datos de contacto y URL de Bond (con marcadores).
- `AuditPopup` y `AuditFloatBtn` toman la URL de la config y sus textos de `es.json`. Están **ocultos** por configuración, sin borrarlos.

### ✅ Fase 1 — Hero + AuroraMandala + menú radial (hecha, visto bueno de Omar)
Commits `eaadf25`, `260caf8`, `b82c280` y `961ca6f`.
- `<AuroraMandala />` sin cambios, montado en `Home.jsx` cuando `active` es `true`. Es fijo, con z-index 0.
- Por encima del canvas van `.home > section` (`position: relative; z-index: 1`) y `.footer` (`position: relative; z-index: 1`).
- Todas las secciones de `_home.scss` son transparentes; los títulos y textos que eran oscuros pasaron a arena.
- Hero:
  - `home.hero.titleLine1` / `titleLine2` en `es.json`, cada una en un `span.home-hero__title-line`;
  - en escritorio, `white-space: nowrap`;
  - en móvil (≤ 768 px), tamaño `clamp(24px, 100cqi / 9.8, 44px)` medido sobre `.home-hero__content` (`container-type: inline-size`), con respaldo en `vw`, y `text-wrap: balance`;
  - espacio no separable entre "haga" y "sentir.".
- Fuera el vídeo, el contador y el typewriter. Borrado `HomeVideoBG1.mp4`.
- `components/ContactRadial.jsx` + `styles/components/_contact-radial.scss`:
  - espiral con `rotate → translateX → rotate inverso`;
  - ángulos 215°, 325°, 35° y 145°;
  - `--r` de 128 px en escritorio y 100 px en móvil.
### ✅ Fase 2 — Resto de la Home (hecha, visto bueno de Omar)
Commits `bf568ee` y `5db79da`.
- Secciones 2–9 en el orden del brief, con todos los textos en `es.json` (`home.problem`, `how`, `offer`, `bond`, `projects`, `process`, `about`, `closing`; las listas se leen con `returnObjects`).
- Piezas compartidas en `_home.scss`: `.home-section-title` (+ `--visible`), `.home-section-intro`, `.home-section-closing`, `.home-card` (tarjeta arena de El problema y Cómo lo hago) y `.home-reveal-cta`.
- Todos los observadores usan `useFadeIn` desestructurado (`{ ref: xRef, visible: xVisible }`): la regla `react-hooks/refs` no admite leer `.visible` de un objeto que contiene un ref.
- Oferta: tarjetas giratorias (`.home-offer__card`) que también giran con el toque o el foco (`tabIndex={0}`).
- Proyectos de la Home: textos en `home.projects.items.<id>` según el `id` de `data/projects.js`.
- Proceso: `<ol>` con 5 pasos; la línea entre pasos va en `.home-process__step::before`.
- Rejilla de testimonios con `minmax(0, 340fr) minmax(0, 560fr)`: corregido el desbordamiento de 3 px.
- `prefers-reduced-motion`: sin entradas animadas en las secciones 2–9.
- **Ojo:** las reglas móviles del hero están en el bloque `@media (max-width: $mobile)` del final de `_home.scss`. Si se reescribe ese bloque, conservarlas.

### ✅ Fase 3 — Proyectos + redirecciones (hecha, visto bueno de Omar)
Commits `6685369` y `5e0cdb0`.
- `data/projects.js`: solo Ramsés (`category: "Custom"`) y Viva México (`"Multi"`), con los datos que no dependen del idioma (`tech`, `link`, `image`, `video`, `videoAspect`, `testimonial`) y `CATEGORIES` (orden del filtro: One · Multi · Custom · Bond).
- Textos de cada proyecto en `es.json` → `proyectos.items.<id>` (`name`, `tag`, `client`, `challenge`, `work`, `result`). Título y descripción SEO en `seo.proyectos`.
- `pages/Proyectos.jsx` + `styles/pages/_proyectos.scss` (prefijo `proj-`, basado en el antiguo `mt-`):
  - filtro calculado con los datos (hoy: Todos · Multi · Custom), con `aria-pressed`;
  - tarjetas con el diseño de `mt-project-card`, en 2 columnas (1 en ≤ 900 px); Ramsés con "Ver proyecto" desactivado;
  - testimonios "En sus propias palabras": vídeo + nombre;
  - cierre con botón a `/contacto`.
- `/resultados` y `/mi-trabajo`: 301 en `frontend/vercel.json` + `<Navigate replace>` en `App.jsx`.
- Menú: "Resultados" y "Mi Trabajo" sustituidos por una sola entrada "Proyectos" (el orden definitivo llega en la Fase 4). Botón de éxito de Contacto: "Ver proyectos →" a `/proyectos`.
- Borrados `Resultados.jsx`, `MiTrabajo.jsx`, su SCSS y las imágenes de Pinterest y Mercedes.
- Lint: baja a **12 problemas previos** (9 errores y 3 advertencias).

### ✅ Fase 4 — Bond + menú + footer (hecha, visto bueno de Omar)
Commits `bc39322` y `0377e5d`.
- `pages/Bond.jsx` + `styles/pages/_bond.scss` (prefijo `bond-`): hero (Noche), "Para quién es" (Arena), "Qué hace Bond" con dos tarjetas Arena sobre Noche y la línea del RGPD, precio y cierre (Vinotinto). Textos en `es.json` → `bond` y `seo.bond`.
- Botones externos (`ExternalButtons`): `BOND_SALES_URL` y `BOND_DEMO_URL` en pestaña nueva, con aviso para lectores de pantalla (`common.newTab` + clase global `.visually-hidden` en `_typography.scss`).
- Precio en `bond.pricing.price` como lista `{ label, value }`: una línea por importe.
- `NAV_LINKS` en `config/site.js` (`{ to, key, end }`), compartido por `Header.jsx` y `Footer.jsx`; textos en `nav.links.<key>`. También pasaron a `es.json` los `aria-label` de la cabecera y el `alt` del logo. El diseño del menú no cambia.
- Footer: logo solo "CAMY" + slogan + menú + Impressum · Datenschutz + email (`CONTACT.email`) + "© CAMY | Business Growth Solutions {{year}}" (`footer.copyright`).

### ✅ Fase 5 — Servicios (hecha, visto bueno de Omar)
Commit `892f0ba`.
- `pages/Servicios.jsx` + `styles/pages/_servicios.scss` reescrito (prefijo `srv-`). Textos en `es.json` → `servicios` y `seo.servicios`.
- Tarjetas One/Multi/Custom (para quién, qué incluye, duración y valor), "Incluido en todas" + extra de idiomas.
- Tabla de pago al contado o en cuotas: tabla accesible que en móvil pasa a tarjetas.
- Planes Basic y Plus, bloque Bond (precio en dos líneas, botón a `/bond`), FAQ en acordeón accesible y "Así empezamos" con botón a `/contacto`.
- Entradas animadas desactivadas con `prefers-reduced-motion`.

### ⏳ Fase 6 — Sobre mí + Contacto (formulario de punta a punta)
> **En curso (9 oct 2026).** Hecho en código (sin push): Sobre mí y Contacto con textos en `es.json`, `<select>` obligatorio, `interes` en todo el backend, `lib/interests.js` (valores, texto del email y `tagId` de Systeme con marcador `null`), emails repetidos permitidos, `prefers-reduced-motion` en las dos páginas y textos D10 aprobados (ver "Preguntas de la Fase 6"). **Falta:** IDs de etiquetas, borrar `email_1`, variables de entorno de Preview y la prueba real (avisar a Omar antes de cualquier escritura en Mongo, Systeme o Resend). - **Sobre mí:** los cambios del Anexo (párrafo NUEVO sin la etiqueta, la frase "cada cliente al que ayudo a mostrarse tal como es" y la cita nueva). Los textos van a `es.json`.
- **Contacto:**
  - textos nuevos;
  - "Profesión o negocio" y "Cuéntame tu proyecto";
  - `<select>` obligatorio con valores internos `one`, `multi`, `custom`, `bond`, `mantenimiento` y `nose`, y los textos visibles de la D4.
- **Backend serverless:** añadir `interes` en:
  - `contactService.js`;
  - `api/contact.js`, con validación contra una lista de valores permitidos;
  - `lib/Contact.js`;
  - `lib/email.js`: fila "Interés" y cabecera "Nuevo mensaje" en lugar de "Nuevo lead".
- **Systeme:** se mantiene la etiqueta `2049193` (`SYSTEME_BASE_TAG_ID`) y se añade la de `INTERESTS[interes].tagId`, con IDs con marcador. Si falta un ID, se omite sin romper el envío.
- **Emails repetidos:** quitar `unique: true` del schema y el `catch` del error 11000. **Además hay que borrar el índice único `email_1` de la colección `leads-web` en Atlas**: Mongoose no lo borra solo. Lo hace Omar, o Claude con su permiso.
- Enseñar a Omar los textos menores de la D10.
- **Prueba:** envío real desde la vista previa de Vercel (`vite dev` no ejecuta `/api`). Comprobar el email, Mongo (incluido un segundo envío con el mismo email) y las etiquetas de Systeme.

### ⏳ Fase 7 — SEO, limpieza y revisión final
- Títulos y descripciones de la tabla §7 del brief, en `es.json`.
- `index.html`:
  - description, OG y Twitter con los textos nuevos;
  - se mantienen el nombre y la imagen OG;
  - en el JSON-LD, actualizar `description` y `serviceType`.
- `sitemap.xml`: quitar `/resultados` y `/mi-trabajo`, añadir `/bond` y `/proyectos`, actualizar `lastmod`.
- **Comprimir las imágenes de las tarjetas de proyecto** (`assets/images/mi-trabajo/ramsesImg.png` ≈ 3 MB y `vivamexicoImg.png` ≈ 7,7 MB), por ejemplo a WebP/JPG del tamaño en que se muestran.
- Grep de restos de marketing, leads, ventas, captación y mini-audit fuera de los legales. Revisar los `alt` y `aria-label`.
- Revisión responsive completa y criterios de terminado (§9 del brief).
- Resumen final con todos los `#PENDIENTE-*`.

---

## 5. Pendientes y cosas a recordar

**Datos que debe pasar Omar** (en el código hay marcadores):

| Marcador | Dónde | Qué falta |
|---|---|---|
| `#PENDIENTE-telegram` | `config/site.js` → `CONTACT.telegram` | Usuario o enlace de Telegram |
| `#PENDIENTE-signal` | `config/site.js` → `CONTACT.signal` | Enlace de Signal |
| `#PENDIENTE-bond-venta` | `config/site.js` → `BOND_SALES_URL` | Página de venta de Bond en Systeme |
| `#PENDIENTE-bond-demo` | `config/site.js` → `BOND_DEMO_URL` | URL para reservar la demo |
| `#PENDIENTE-systeme-tag-*` | `lib/interests.js` → `INTERESTS.<valor>.tagId` | IDs de las 6 etiquetas de interés en Systeme (`null` = se omite) |

**Otras cosas que dependen de Omar:**
- Confirmar si los vídeos de testimonios actuales se mantienen o hay nuevos.
- Logo nuevo sin "MARKETING · WEB" (más adelante).
- Imagen Open Graph nueva hecha en Canva (más adelante).
- Borrar el índice único `email_1` en Atlas (Fase 6).

**Avisos técnicos:**
- ~~Desbordamiento de 3 px de la tarjeta de vídeo de Viva México~~: corregido en la Fase 2.
- **Imágenes pesadas (Fase 7):** las capturas de las tarjetas de `/proyectos` pesan ≈ 3 MB (Ramsés) y ≈ 7,7 MB (Viva México). Comprimirlas en la Fase 7.
- **Los 12 problemas de lint previos** (9 errores y 3 advertencias, ya estaban antes del rediseño; eran 14 hasta la Fase 3):
  - `process` no definido en `frontend/lib/*.js` (código de Node que se lintea como navegador);
  - `react-refresh/only-export-components` en `NotificationContext.jsx`;
  - `exhaustive-deps` (falta `threshold`) en los hooks `useVisible` y `useFadeIn` de varias páginas.

  No son de este rediseño. La regla es que no aparezca ninguno nuevo.
- **Dependencias:** `npm install` avisa de 20 vulnerabilidades en las dependencias del proyecto. Quedan fuera de esta fase.
- **Legibilidad sobre el aurora:** revisarla sección por sección después de la Fase 2, sin velo salvo que Omar lo pida. Incluye la tarjeta Multi (fondo Noche).
- **Fuera de esta fase:** migración a Render (justo después, como tarea aparte), versión en inglés, test "¿Tu web dice lo que eres?" y reescritura de los legales. El texto de Datenschutz menciona Systeme.io "für Marketingzwecke".
