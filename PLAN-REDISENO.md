# Plan del rediseño de camybgs.com (fase 1, solo español)

> Documento de trabajo para continuar el rediseño en una conversación nueva.
> Complementa a `BRIEF-REDISENO.md`, que tiene el alcance y los textos definitivos (Anexo).
> Última actualización: 10 de octubre de 2026 (revisión en móvil, `SHOW_BOND`, versión en inglés y selector de idioma).

## Cómo retomar
1. Leer `BRIEF-REDISENO.md` completo (incluido el Anexo) y este documento, sobre todo el **resumen de la última sesión** (abajo).
2. Confirmar la rama: `git branch --show-current` → `rediseno-2026`.
3. Seguir por el punto **"Siguiente"** del resumen de la última sesión.

## Resumen de las últimas sesiones

### Sesión del 9 de octubre de 2026 (commit `edc779f`)
- **Hecho:**
  - Escritorio: colores, tamaños, animaciones y botones unificados.
  - Móvil: footer sin separador, hero de la Home centrado, menú del iPhone SE repartido, tamaños de títulos y botones de Bond.
  - Fuentes servidas desde el propio sitio (@fontsource, sin Google Fonts).
  - Casilla opcional de consentimiento de emails, con la etiqueta **consentimiento-emails** (`2222022`) en Systeme.
  - Legales reescritos en ES y EN (se muestra ES hasta que exista el selector de idioma).
- **Decidido el 10 de octubre:** TTL de 24 meses en `leads-web`; consentimientos guardados aparte, sin TTL (ver §3).
- **Tareas de Omar:**
  - Verificar el dominio camybgs.com en Resend.
  - Pedir el DPA a Systeme y configurar el doble opt-in.
  - Que un asesor o un generador alemán revise los legales antes de publicar.
  - Al migrar a Render, actualizar el apartado de alojamiento de la política de privacidad.
- **Hecho el 10 de octubre:** revisión en móvil de las páginas pendientes, interruptor `SHOW_BOND` (en `false`), versión completa en inglés y selector de idioma (ver §3, "Decisiones del 10 de octubre").
- **Siguiente:** la revisión en tablet (ojo: allí el botón es más grande que en escritorio) y en horizontal **la hace Omar** con el visor. Pendientes: revisión de `en.json` por Omar y prerenderizado al migrar a Render (§5).

---

## 1. Forma de trabajo
- **Rama:** todo se hace en `rediseno-2026`. No tocar `master` ni hacer merge hasta que Omar lo apruebe. Existe la etiqueta `v1-antes-rediseno` para volver a la versión anterior.
- **Una fase cada vez.**
- **Al terminar cada fase o ajuste:**
  1. `cd frontend && npm run lint && npm run build`. El lint debe seguir en los **11 problemas previos** y ninguno nuevo (ver §5).
  2. Commit en `rediseno-2026`, con el mensaje terminado en la línea `Co-Authored-By` de Claude.
  3. **Pedir confirmación a Omar antes del push.**
  4. Después del push, **esperar el visto bueno de Omar en la vista previa de Vercel** antes de empezar la siguiente fase.
- Responder siempre en español.
- **Regla para la revisión en móvil (y para cualquier ajuste de diseño posterior):**
  - El diseño ajustado en la sesión del 9 de octubre (commit `edc779f`) está **aprobado**. No cambiar nada de escritorio ni de las partes de móvil ya revisadas.
  - Limitar los cambios a los **estilos de móvil de las páginas pendientes**. Si un cambio puede afectar a otros tamaños de pantalla o a componentes compartidos (botones, footer, menú, tarjetas), **avisar a Omar y explicárselo antes de hacerlo**.
  - Antes de cada cambio, enseñar a Omar qué se quiere cambiar y por qué. **Los cambios, de uno en uno.**
  - Después de cada cambio, comprobar que escritorio (**1280 y 1440 px**) se ve **exactamente igual** que antes (capturas de referencia tomadas antes del primer cambio y comparadas píxel a píxel).
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
  - Inglés en `frontend/src/locales/en.json` (mismas claves que `es.json`; comprobar la paridad al añadir textos).
  - Inicialización en `frontend/src/i18n.js`: el idioma lo decide la URL. Direcciones de cada página en `frontend/src/config/routes.js` (`ROUTES`, `useLocalePath()`, `pageFromPath()`); **nunca escribir rutas a mano** en enlaces: `to={path("contacto")}`.
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
  - crea el contacto en Systeme con **solo** la etiqueta de su interés (`lib/interests.js` + `lib/systeme.js`);
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
  - Systeme: **una sola etiqueta según el interés**. ~~Se mantenía la 2049193 (lead-web)~~: Omar decidió en la Fase 6 que la web nueva **no** la usa.
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
   - En escritorio, 2 líneas: "Tienes algo que decir" / "Haz que tu web lo haga sentir" (sin puntos desde el 10 oct).
   - En móvil puede ocupar más líneas, pero:
     - siempre con el salto entre las dos frases;
     - "Tienes algo que decir" en **una sola línea entre 320 y 767 px**;
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
2. **Placeholders de Contacto:** "Julia Smith", "julia@tunegocio.com", "Coach, panadería, yoga…" (acortado el 10 oct para que quepa en móvil) y "Qué haces y qué quieres que tu web transmita". ✅
3. **Pantalla de éxito:** "…si quieres ver cómo trabajo, echa un vistazo a mis proyectos." ✅
4. **Mensaje de WhatsApp en Contacto:** "Hola Omar, me gustaría hablar contigo sobre una web para mi negocio." ✅
5. **`/tarjeta`:** se queda en inglés, sin cambios. ✅
6. **Base de datos de Preview:** `camyweb-preview`, en el mismo cluster (`MONGO_URI` de Preview). La base real es `camyDB`. El índice `email_1` de la colección real se borra al publicar y se comprueba después del merge (el código antiguo puede volver a crearlo).
7. **Etiquetas de Systeme:** cada contacto recibe **solo** la etiqueta de su interés, sin la `2049193` (lead-web). ✅ IDs: `one` 2220930 (interes-web-one), `multi` 2220931 (interes-web-multi), `custom` 2220932 (interes-web-custom), `bond` 2220933 (interes-bond), `mantenimiento` 2220934 (interes-mantenimiento), `nose` 2220935 (interes-no-sabe). Las etiquetas lead-web y lead-magnet-auditoria las borra Omar después de publicar (§6).

### Decisiones del 10 de octubre de 2026
1. **Borrado automático a los 24 meses:** sí. ✅ Índice TTL sobre `createdAt` en `leads-web` (`lib/Contact.js`, 730 días) y plazo actualizado en la política de privacidad (ES y EN). Al publicar, ver §6 (pasos 3 y 5). Omar contará las consultas antiguas en Atlas el día de publicar.
2. **Titulares del hero sin punto final** en todas las páginas **salvo Bond** ("Bond."). La Home sin ningún punto, siempre con el salto entre las dos frases. El slogan del footer no cambia. ✅
3. **Revisión en móvil de las páginas pendientes (hecha):** formulario de Contacto (campos a 16 px, más anchos, "Coach, panadería, yoga…"); títulos de cierre de Sobre mí, Contacto y Proyectos con `$fs-section-title-mobile` (la de Servicios), altura de línea 1.05 y `text-wrap: balance` (también el subtítulo de Sobre mí), solo en móvil; espacios no separables en "+15 %" y en "§ número" de los legales. El filtro de Proyectos no se toca. **La revisión en tablet y en horizontal la hace Omar** con el visor.
4. **Interruptor `SHOW_BOND` (`config/site.js`), ahora en `false`:** ✅ Con `false` Bond desaparece de toda la web: menú y footer (`NAV_LINKS`), sección de la Home, panel de Servicios, preguntas del FAQ marcadas con `"bond": true` en `es.json` y la opción "Plataforma Bond" del formulario; `/bond` redirige a la Home (`<Navigate replace>`). La API sigue aceptando `interes: "bond"` (no hace daño). **Al volver a ponerlo en `true`, a mano:**
   - `public/sitemap.xml`: volver a añadir `<url><loc>https://www.camybgs.com/bond</loc><lastmod>…</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>` después de `/servicios`.
   - `index.html`: volver a añadir `"Plataforma de gestión de clientes"` al `serviceType` del JSON-LD.
   - Revisar en tablet y móvil la Home y Servicios con el bloque de Bond.
5. **Consentimientos de emails aparte, sin TTL:** ✅ Colección **`email-consents`** (`lib/EmailConsent.js`): `email`, `createdAt` (fecha), `text` (texto exacto de la casilla), `version` y `lang`. Se guarda un documento por cada envío con la casilla marcada.
   - El texto y la versión están en **`lib/consentText.js`**, que es la fuente única: lo muestra `Contacto.jsx` y lo guarda `api/contact.js`. Por eso ese texto ya no está en `es.json`. **Si cambia el texto, hay que cambiar la versión.**
   - Política de privacidad (ES y EN), apartado 6: qué se guarda, dónde, base legal (art. 6.1.c en relación con el 7.1 del RGPD) y que se borra con la baja.
   - **Borrado al darse de baja:**
     - **A — proceso manual una vez al mes: aprobado por Omar ✅.** Paso a paso en **§7**.
     - **B — automático con webhook de Systeme: para más adelante**, sin implementar. Una función `api/consent-unsubscribe.js` que recibe el aviso de Systeme y borra los documentos de ese email, protegida con un secreto compartido. **Antes hay que comprobar en Systeme** qué evento existe para la baja (si no lo hay, usar una automatización que quite la etiqueta `2222022` al darse de baja, más el webhook de "etiqueta quitada").
6. **Versión en inglés y selector de idioma:** ✅ (traducción aprobada por ahora; **Omar revisará `en.json` con calma más adelante**).
   - **Rutas `/en` traducidas:** `/en`, `/en/services`, `/en/bond`, `/en/projects`, `/en/about`, `/en/contact`, `/en/impressum`, `/en/privacy`. Fuente única: `src/config/routes.js`. El español sigue sin prefijo.
   - **Siempre español al entrar:** el idioma lo decide la URL; nadie es redirigido según el navegador.
   - **Selector redondo en la cabecera** (`Header.jsx`, `.header__lang-btn`): mismo aspecto que el botón de música, a su derecha, con el código del **otro** idioma ("EN" / "ES"); enlaza a la misma página en el otro idioma. En escritorio el botón de música no se mueve; en tablet y móvil queda entre la música y el menú; por debajo de 375 px los dos botones redondos bajan a 30 px para que quepan.
   - **Inglés británico** ("colour", "organise"), precios con el euro delante ("€799", "€77/month"). Textos fijados por Omar: slogan "Your website, a mirror of your message."; titular "You have something to say" / "Let your website make them feel it" (sin punto final). Los nombres de producto (One, Multi, Custom, Basic, Plus, Bond) e "Impressum" no se traducen.
   - Titular de la Home en inglés, solo en móvil: tamaño calculado para que "You have something to say" quepa en una línea (`.home-hero__title--en`); el español no cambia.
   - SEO: cada página con `lang`, `canonical` de su idioma y `hreflang` (es, en, x-default); `sitemap.xml` con las dos versiones de cada página.
   - Casilla de emails: texto en inglés en `lib/consentText.js`, misma versión.
   - Lo que no se traduce: el email de aviso a Omar y las etiquetas de Systeme siguen en español.

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

### ✅ Fase 6 — Sobre mí + Contacto (hecha, visto bueno de Omar)
Commits `f6ff283`, `e25fe04`, `13d157c` y `07f8dd5`.
- **Sobre mí:** párrafo nuevo (sin la etiqueta NUEVO), "cada cliente al que ayudo a mostrarse tal como es" y la cita nueva. Textos en `es.json` → `sobreMi` (la historia es una lista `{ text, variant }`) y `seo.sobreMi`.
- **Contacto:** textos en `es.json` → `contacto` y `seo.contacto`; "Profesión o negocio", "Cuéntame tu proyecto" y `<select>` obligatorio "¿Qué te interesa?" (valores `one`, `multi`, `custom`, `bond`, `mantenimiento`, `nose`). Pasos de "¿Y después qué?" en un `<ol>`.
- **`lib/interests.js`:** fuente única de los valores, el texto del email y el `tagId` de Systeme. La usan `api/contact.js` (validación), `lib/Contact.js` (`enum`) y `Contacto.jsx` (opciones).
- **Systeme:** cada contacto recibe **solo** la etiqueta de su interés (sin la `2049193`).
- **Email:** cabecera "Nuevo mensaje", filas "Profesión o negocio" e "Interés", y el interés en el asunto.
- **Emails repetidos:** sin `unique` en el schema ni `catch` del error 11000. El índice `email_1` de la base real se borra al publicar (§6).
- `prefers-reduced-motion` en Sobre mí y Contacto. Textos D10 aprobados (ver "Preguntas de la Fase 6").
- **Prueba real en la vista previa (base `camyweb-preview`):** dos envíos con el mismo email → pantalla de éxito, dos emails, dos documentos en Mongo (solo índice `_id`) y el contacto de Systeme con interes-bond e interes-web-one. ✅

### ⏳ Fase 7 — SEO, limpieza y revisión final
> **En curso (9 oct 2026).** Hecho en código (sin push), pendiente del visto bueno de Omar:
- **SEO:** `seo.home` en `es.json` (la Home usa `t()`); las 6 páginas tienen ya el título y la descripción de la tabla §7 del brief.
- **`index.html`:** description, OG y Twitter con el título y la descripción de la Home ("CAMY · Diseño web que comunica", aprobado por Omar ✅); imagen OG sin cambios. JSON-LD: `name` sin cambios (D3), `description` y `serviceType` nuevos (Diseño web, Desarrollo web, SEO básico, Mantenimiento web, Plataforma de gestión de clientes).
- **Metas duplicadas (ya pasaba antes del rediseño):** con React 19, react-helmet-async v3 no sustituye las metas de `index.html`, así que cada página tenía dos `description`, dos `canonical`, etc. Ahora las metas fijas llevan `data-seo-static` (para las previsualizaciones sin JavaScript) y `main.jsx` las quita al arrancar. Comprobado: una de cada por página.
- **`sitemap.xml`:** fuera `/resultados` y `/mi-trabajo`; dentro `/bond` y `/proyectos`; `lastmod` 2026-10-09 (los legales mantienen 2026-06-10, no han cambiado).
- **Imágenes de las tarjetas:** WebP de 1400 px de ancho (se muestran a ≈ 600 px) → `ramsesImg.webp` 57 KB (antes 3 MB) y `vivamexicoImg.webp` 79 KB (antes 7,7 MB). Borrados los PNG.
- **Restos de marketing:** solo quedan los esperados (lead magnet oculto por configuración, "Business Growth Solutions" por la D3, la colección `leads-web` y los legales).
- **`aria-label` sueltos** de `WhatsAppButton` y `ScrollToTopButton` → `es.json` (`common.whatsappButton`, `common.scrollTop`) con los mismos textos. El icono de WhatsApp pasa a `alt=""` (el enlace ya tiene su `aria-label`, que ahora avisa de la pestaña nueva).
- **Hero con `prefers-reduced-motion`:** el botón "Hablemos de tu web" entraba subiendo; ahora solo con fundido.
- **Revisión:** las 6 páginas a 320, 375, 768 (tablet vertical), 1024 (tablet horizontal) y 1440 px con barra de scroll clásica: sin scroll horizontal. Con reduced-motion no se queda nada invisible. `/resultados` y `/mi-trabajo` → `/proyectos` en el router.
- **Falta:** visto bueno de Omar en la vista previa y los pendientes de §5.

---

## 5. Pendientes y cosas a recordar

**Datos que debe pasar Omar** (en el código hay marcadores):

| Marcador | Dónde | Qué falta |
|---|---|---|
| `#PENDIENTE-telegram` | `config/site.js` → `CONTACT.telegram` | Usuario o enlace de Telegram |
| `#PENDIENTE-signal` | `config/site.js` → `CONTACT.signal` | Enlace de Signal |
| `#PENDIENTE-bond-venta` | `config/site.js` → `BOND_SALES_URL` | Página de venta de Bond en Systeme |
| `#PENDIENTE-bond-demo` | `config/site.js` → `BOND_DEMO_URL` | URL para reservar la demo |

**Otras cosas que dependen de Omar:**
- Confirmar si los vídeos de testimonios actuales se mantienen o hay nuevos.
- Logo nuevo sin "MARKETING · WEB" (más adelante).
- Imagen Open Graph nueva hecha en Canva (más adelante).
- **Revisar con calma `frontend/src/locales/en.json`** (la traducción está aprobada por ahora).
- Lo que le toca al publicar: ver la checklist de publicación (§6).

**Avisos técnicos:**
- ~~Desbordamiento de 3 px de la tarjeta de vídeo de Viva México~~: corregido en la Fase 2.
- ~~Imágenes pesadas de las tarjetas~~: comprimidas en la Fase 7. **Siguen pesando** (fuera del alcance, para más adelante): los vídeos de testimonios (12 MB y 20 MB), la música de fondo (6 MB) y `mockupMiniAuditoria.png` (2,6 MB; solo se descarga si se activa el popup).
- **Los 11 problemas de lint previos** (8 errores y 3 advertencias, ya estaban antes del rediseño; eran 14 hasta la Fase 3 y 12 hasta la Fase 6):
  - `process` no definido en `frontend/lib/*.js` (código de Node que se lintea como navegador);
  - `react-refresh/only-export-components` en `NotificationContext.jsx`;
  - `exhaustive-deps` (falta `threshold`) en los hooks `useVisible` y `useFadeIn` de varias páginas.

  No son de este rediseño. La regla es que no aparezca ninguno nuevo.
- **`VITE_API_URL`:** ya no la usa el código (el formulario llama a `/api/contact`, relativa, desde la migración a funciones de Vercel). Omar puede borrarla de Vercel (Production y Preview) y del `.env` local cuando quiera.
- **Dependencias:** `npm install` avisa de 20 vulnerabilidades en las dependencias del proyecto. Quedan fuera de esta fase.
- **Legibilidad sobre el aurora:** revisarla sección por sección después de la Fase 2, sin velo salvo que Omar lo pida. Incluye la tarjeta Multi (fondo Noche).
- **Para la migración a Render** (justo después, como tarea aparte):
  - **Prerenderizado** (generar el HTML de cada página al compilar), para que las vistas previas de WhatsApp y redes salgan en el idioma correcto: hoy leen `index.html` sin JavaScript y un enlace `/en/...` se ve en español.
  - Replicar las redirecciones de `vercel.json` (D11 y `/tarjeta`) y la reescritura de todas las rutas a `index.html`.
  - Actualizar el apartado de alojamiento de la política de privacidad (ES y EN).
- **Fuera de esta fase:** test "¿Tu web dice lo que eres?". (La versión en inglés y la reescritura de los legales ya están hechas.)

---

## 6. Checklist de publicación (merge de `rediseno-2026` en `master`)
Solo con la aprobación de Omar. En este orden:
1. **Antes del merge:** lint y build en verde, y la vista previa revisada por Omar.
2. **Variables de entorno de Production en Vercel:** comprobar que `MONGO_URI` apunta a la base real **`camyDB`** (no a `camyweb-preview`).
3. **Atlas:** borrar el índice único `email_1` de **`camyDB.leads-web`** (la base real; **no** `camyweb-preview`), justo antes o justo después del merge. El código antiguo puede volver a crearlo mientras siga en línea.
   **Además, antes del merge:** contar en `camyDB.leads-web` los documentos con más de 24 meses (730 días), porque **se borrarán solos en cuanto se cree el índice TTL** (lo crea Mongoose al arrancar el código nuevo, con la primera petición al formulario). En Atlas → Data Explorer, filtro `{ createdAt: { $lt: ISODate("<hoy menos 730 días>") } }`. Si hay alguno y Omar quiere conservarlo, exportarlo antes.
4. **Merge** en `master` y comprobar el despliegue en camybgs.com.
5. **Atlas, después del merge:** comprobar en `camyDB.leads-web` que `email_1` no ha vuelto. Si está, borrarlo otra vez. Comprobar también que existe el índice TTL `createdAt_1` con `expireAfterSeconds: 63072000` (730 días); aparece después del primer envío del formulario (paso 7). Si no aparece, crearlo a mano en Atlas → Indexes con esos valores.
6. **Systeme (lo hace Omar, justo después de publicar):** borrar las etiquetas **lead-web** (`2049193`) y **lead-magnet-auditoria**. Antes no: la web actual todavía las usa.
7. Un envío real del formulario en camybgs.com (avisando antes): email recibido, documento en Mongo con `interes` y contacto en Systeme solo con su etiqueta de interés. Con la casilla de emails marcada: etiqueta `consentimiento-emails` en Systeme y un documento en `camyDB.email-consents` con el texto y la versión. Después, volver al paso 5 para comprobar el índice TTL (y borrar el documento de prueba de `email-consents`).
8. Si algo falla: *Instant Rollback* en Vercel o la etiqueta `v1-antes-rediseno`.
9. **A partir de la publicación:** poner un recordatorio mensual para el proceso de bajas (§7).


---

## 7. Proceso mensual: borrar los consentimientos de quien se da de baja
Lo hace Omar **una vez al mes** (por ejemplo, el día 1) y, además, **en el momento** si alguien pide la baja por email, WhatsApp o teléfono. Empieza a aplicarse cuando la web nueva esté publicada.

**Por qué:** la política de privacidad (apartado 6) promete borrar la prueba del consentimiento cuando la persona se da de baja. Systeme gestiona la baja de los envíos, pero no sabe nada de la colección `email-consents` de Mongo: hay que borrarla a mano.

### Paso 1 — Sacar de Systeme quién se ha dado de baja
1. Entrar en Systeme → **Contactos**.
2. Filtrar los contactos **dados de baja** (que ya no reciben emails) desde la última revisión. *La primera vez, anotar aquí el nombre exacto del filtro en Systeme para no tener que buscarlo de nuevo:* `______`.
3. Si alguien pidió la baja por otro medio (email, WhatsApp, teléfono): darle de baja también en Systeme, quitarle la etiqueta **consentimiento-emails** (`2222022`) y añadirlo a la lista.
4. Apuntar los emails en una lista. Si la lista está vacía, terminar aquí y saltar al paso 4.

### Paso 2 — Borrar sus documentos en Atlas
1. Entrar en MongoDB Atlas → el cluster → **Browse Collections** (Data Explorer).
2. Abrir la base **`camyDB`** (la real, **no** `camyweb-preview`) → colección **`email-consents`**.
3. Para cada email de la lista:
   - En **Filter** escribir `{ email: "julia@tunegocio.com" }` (siempre **en minúsculas**: así se guardan) y pulsar **Apply**.
   - Comprobar que los documentos que salen son de esa persona (puede haber varios: uno por cada vez que marcó la casilla).
   - Borrarlos todos (icono de papelera en cada documento, o la opción de borrar los documentos del filtro si Atlas la ofrece).
   - Volver a aplicar el filtro: debe salir **0 documentos**.

   *Alternativa con `mongosh`, para varias personas a la vez:*
   ```js
   use camyDB
   db["email-consents"].deleteMany({ email: { $in: ["julia@tunegocio.com", "otro@ejemplo.com"] } })
   ```
   El resultado `deletedCount` debe coincidir con el número de documentos que había.

### Paso 3 — No borrar nada más
- Las **consultas** (`leads-web`) no se tocan: se borran solas a los 24 meses.
- En Systeme el contacto se queda **dado de baja** (no borrarlo): es lo que impide volver a escribirle por error. Si la persona pide además que se borren **todos** sus datos, eso es otra cosa (derecho de supresión): borrar también el contacto de Systeme y sus documentos de `leads-web`.

### Paso 4 — Dejar constancia
Anotar la revisión en la tabla (fecha y número de personas; **sin emails**, para no copiar datos personales aquí):

| Fecha | Bajas tratadas | Documentos borrados | Notas |
|---|---|---|---|
| | | | |

### Para más adelante (opción B, sin implementar)
Una función `api/consent-unsubscribe.js` que recibe un aviso (webhook) de Systeme y borra los documentos de ese email, protegida con un secreto compartido. Antes hay que comprobar en Systeme qué evento existe para la baja. Si no lo hay, usar una automatización que quite la etiqueta `2222022` al darse de baja, más el webhook de "etiqueta quitada".
