# CAMY | Business Growth Solutions — Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Render](https://img.shields.io/badge/Render-Static%20%2B%20Web%20Service-46E3B7?style=flat&logo=render&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

Sitio web oficial de CAMY Business Growth Solutions ([camybgs.com](https://www.camybgs.com)), en español e inglés, construido con React + Vite.

Publicado en **Render** (descrito en `render.yaml`): un sitio estático para la SPA y un web service Express en Frankfurt para la API, los dos bajo el mismo dominio.

**Frontend** – React + Vite · SPA con animaciones, formulario de contacto, versión en inglés y diseño responsive

**API** – Formulario de contacto (`POST /api/contact`) y confirmación del doble opt-in (`GET /api/confirm-consent`) · persistencia en MongoDB, emails con Resend e integración con Systeme.io. La lógica está en `frontend/lib/`; los handlers, en `frontend/api/`, y los sirve el servidor Express (`frontend/server/`).

> ⚠️ El directorio `backend/` (Node.js + Express) es código legado: ya no se despliega ni se usa en producción.

---

## ⚙️ Tech Stack

### Frontend
* React 19
* React Router 7
* react-i18next (español e inglés)
* react-helmet-async (SEO por página)
* SCSS modular
* Vite

### API (Express en Render)
* Node.js 22 + Express 5
* MongoDB + Mongoose
* Resend (email transaccional)
* Systeme.io API

---

## 📄 Páginas

El español va sin prefijo; el inglés, bajo `/en`. Fuente única de las direcciones: `frontend/src/config/routes.js`. El idioma lo decide la URL (nadie es redirigido según el navegador).

| Página | Español | Inglés |
|---|---|---|
| Home | `/` | `/en` |
| Servicios | `/servicios` | `/en/services` |
| Proyectos | `/proyectos` | `/en/projects` |
| Sobre mí | `/sobre-mi` | `/en/about` |
| Contacto | `/contacto` | `/en/contact` |
| Impressum | `/impressum` | `/en/impressum` |
| Política de privacidad | `/privacidad` | `/en/privacy` |
| Condiciones generales | `/condiciones` | `/en/terms` |
| Bond (oculta mientras `SHOW_BOND` sea `false`; redirige a la Home) | `/bond` | `/en/bond` |
| Confirmación del doble opt-in (noindex, fuera del sitemap) | `/confirmar-suscripcion` | `/en/confirm-subscription` |

**Redirecciones** (direcciones antiguas, en `render.yaml` y en `App.jsx`):

| Desde | Hacia |
|---|---|
| `/resultados` | `/proyectos` |
| `/mi-trabajo` | `/proyectos` |
| `/datenschutz` | `/privacidad` |
| `/tarjeta` | WhatsApp (302 desde la API; QR de las tarjetas de visita) |

---

## 📁 Estructura del proyecto

```
CamyWeb/
├── render.yaml          # Blueprint de Render (API + sitio estático)
├── backend/             # legado — no desplegado, no usado en producción
└── frontend/
    ├── api/             # handlers de la API (los importa server/index.js)
    │   ├── contact.js           # POST /api/contact
    │   └── confirm-consent.js   # GET /api/confirm-consent (doble opt-in)
    ├── server/
    │   └── index.js     # servidor Express de Render: handlers de api/ + /tarjeta
    ├── scripts/
    │   └── prerender.js # <head> de cada página pública (npm run build:render)
    ├── lib/             # lógica compartida (MongoDB, Resend, Systeme, doble opt-in)
    ├── public/          # sitemap.xml, robots.txt, favicon
    ├── vercel.json      # resto de Vercel, ya sin uso (ver Pendientes)
    └── src/
        ├── assets/
        ├── components/
        ├── config/      # routes.js (direcciones) y site.js (contacto, interruptores, menú)
        ├── context/
        ├── data/        # projects.js: proyectos y testimonios
        ├── locales/     # es.json y en.json
        ├── pages/
        │   └── legal/   # textos de Impressum, Privacidad y Condiciones (ES y EN)
        ├── services/
        └── styles/
```

---

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/CamyWeb.git
cd CamyWeb/frontend
npm install
npm run dev            # frontend en http://localhost:5173
```

```bash
npm run start:api      # API Express en http://localhost:3000 (lee las variables del entorno)
npm run build:render   # build de producción + prerenderizado del <head> (el que usa Render)
npm run lint
```

---

## 🔐 Variables de entorno

Las de la API, descritas en `frontend/.env.example`. En Render van en el servicio `camybgs-api` → Environment. El sitio estático solo necesita `NODE_VERSION` (ya definida en `render.yaml`).

| Variable | Valor en producción |
|---|---|
| `NODE_VERSION` | `22` (en `render.yaml`) |
| `MONGO_URI` | Cluster de Atlas, base **`camyDB`** (`camyweb-preview` solo para pruebas) |
| `RESEND_API_KEY` | Clave de Resend (dominio camybgs.com verificado) |
| `EMAIL_USER` | Correo al que llega el aviso del formulario |
| `SYSTEME_API_KEY` | Clave de la API de Systeme.io |
| `CONSENT_SECRET` | Firma de los enlaces del doble opt-in. Si cambia, los enlaces ya enviados dejan de valer |
| `SITE_URL` | `https://www.camybgs.com` |
| `ALLOWED_ORIGINS` | `https://www.camybgs.com,https://camybgs.com` (es también el valor por defecto) |

---

## 🌐 Infraestructura de producción

| Capa | Servicio | Detalle |
|---|---|---|
| Dominio | `camybgs.com` (DNS en IONOS) | Apunta al sitio estático de Render |
| Frontend | Render, sitio estático (`camybgs-web`) | SPA con el `<head>` prerenderizado; reenvía `/api/*` y `/tarjeta` a la API, así que todo va bajo el mismo dominio |
| API | Render, web service Starter en Frankfurt (`camybgs-api`) | `frontend/server/index.js` · health check en `/api/health` |
| Base de datos | MongoDB Atlas | `camyDB` en producción (`leads-web` y `email-consents`), `camyweb-preview` para pruebas |
| Email | Resend | Aviso del formulario y email de confirmación del doble opt-in |
| CRM | Systeme.io | Un contacto por consulta, con la etiqueta de su interés |

**Despliegue:** los dos servicios despliegan desde `master`. Cada push a `master` redespliega la web y la API.

**Si algo falla:** *Rollback* al despliegue anterior en el panel de Render (en cada servicio). Existe además la etiqueta `v1-antes-rediseno` con la versión anterior al rediseño.

> **Railway y Vercel ya no forman parte de la infraestructura.** El backend Express en `backend/` es código legado sin despliegue activo.

---

## 🧭 Convenciones del código

- **Direcciones:** nunca escribir rutas a mano en los enlaces. Usar `useLocalePath()` de `config/routes.js`: `to={path("contact")}`. Una página nueva se añade en `ROUTES`, en `App.jsx`, en `scripts/prerender/entry.jsx` (si es pública), en `public/sitemap.xml` y como rewrite en `render.yaml` (si no, la recarga directa sirve el `<head>` genérico).
- **Textos:** en `src/locales/es.json` y `en.json`, con las mismas claves (comprobar la paridad al añadir textos). Inglés británico ("colour", "organise") y el euro delante ("€799"). No se traducen los nombres de producto (One, Multi, Custom, Basic, Plus, Bond) ni "Impressum".
- **Legales** (Impressum, Privacidad y Condiciones): fuera de los JSON, en `src/pages/legal/`. Los datos del proveedor y la fecha de revisión, en `src/pages/legal/provider.js`.
- **Casilla de consentimiento de emails:** el texto y su versión están en `lib/consentText.js` (fuente única: lo muestra `Contact.jsx` y lo guarda `api/contact.js`). **Si cambia el texto, hay que cambiar la versión.**
- **Interesados del formulario:** `lib/interests.js` es la fuente única de los valores, el texto del email y la etiqueta de Systeme. La API y Mongo mantienen los nombres de campo en español (`nombre`, `profesion`, `interes`, `mensaje`); `services/contactService.js` los traduce.
- **Lint:** `npm run lint` da hoy 21 problemas previos (`process` en `lib/`, `only-export-components` en `NotificationContext.jsx` y `exhaustive-deps` en los hooks de visibilidad). La regla es no añadir ninguno nuevo.
- **`AuroraMandala.jsx`:** no modificar el shader.

### Activar Bond (`SHOW_BOND` en `src/config/site.js`)

Con `false`, Bond desaparece de toda la web (menú, footer, sección de la Home, panel y preguntas del FAQ de Servicios, opción del formulario) y `/bond` redirige a la Home. Al ponerlo en `true`, además, a mano:

1. `public/sitemap.xml`: añadir `/bond` y `/en/bond` (con sus `hreflang`), después de Servicios.
2. `render.yaml`: añadir los rewrites de `/bond` y `/en/bond` a su `index.html` (el prerender ya los genera solo).
3. `index.html`: volver a añadir `"Plataforma de gestión de clientes"` al `serviceType` del JSON-LD.
4. Rellenar `BOND_SALES_URL` y `BOND_DEMO_URL` en `config/site.js` (hoy son marcadores `#PENDIENTE-`).
5. Revisar en móvil, tablet y escritorio la Home y Servicios con el bloque de Bond.

Con `npm run dev`, `/bond` se ve aunque `SHOW_BOND` sea `false` (solo hay que escribir la dirección). El código y el CSS de la hero animada (`components/BondHero/`) no entran en el build de producción hasta poner `true`; el logo y Orbitron sí se copian a `dist/assets`, pero nada los referencia.

---

## 🗓️ Proceso mensual: borrar los consentimientos de quien se da de baja

Lo hace Omar **una vez al mes** (por ejemplo, el día 1) y, además, **en el momento** si alguien pide la baja por email, WhatsApp o teléfono.

**Por qué:** la política de privacidad (apartado 6) promete borrar la prueba del consentimiento cuando la persona se da de baja. Systeme gestiona la baja de los envíos, pero no sabe nada de la colección `email-consents` de Mongo: hay que borrarla a mano.

### Paso 1 — Sacar de Systeme quién se ha dado de baja
1. Entrar en Systeme → **Contactos**.
2. Filtrar los contactos **dados de baja** (que ya no reciben emails) desde la última revisión. *La primera vez, anotar aquí el nombre exacto del filtro en Systeme para no tener que buscarlo de nuevo:* `______`.
3. Si alguien pidió la baja por otro medio (email, WhatsApp, teléfono): darle de baja también en Systeme, quitarle la etiqueta **consentimiento-emails** (`2222022`) y añadirlo a la lista.
4. Apuntar los emails en una lista. Si la lista está vacía, saltar al paso 2 bis.

### Paso 2 — Borrar sus documentos en Atlas
1. Entrar en MongoDB Atlas → el cluster → **Browse Collections** (Data Explorer).
2. Abrir la base **`camyDB`** (la real, **no** `camyweb-preview`) → colección **`email-consents`**.
3. Para cada email de la lista:
   - En **Filter** escribir `{ email: "julia@tunegocio.com" }` (siempre **en minúsculas**: así se guardan) y pulsar **Apply**.
   - Comprobar que los documentos que salen son de esa persona. Puede haber varios: uno por cada vez que marcó la casilla y, con el doble opt-in, alguno en `status: "pending"` si no lo confirmó (esos se borran solos a los 30 días, pero se pueden borrar ya).
   - Borrarlos todos (icono de papelera en cada documento, o la opción de borrar los documentos del filtro si Atlas la ofrece).
   - Volver a aplicar el filtro: debe salir **0 documentos**.

   *Alternativa con `mongosh`, para varias personas a la vez:*
   ```js
   use camyDB
   db["email-consents"].deleteMany({ email: { $in: ["julia@tunegocio.com", "otro@ejemplo.com"] } })
   ```
   El resultado `deletedCount` debe coincidir con el número de documentos que había.

### Paso 2 bis — Etiquetas que Systeme no llegó a poner
Con el doble opt-in, la etiqueta **consentimiento-emails** (`2222022`) se añade cuando la persona pulsa el enlace del email de confirmación. Si Systeme falla en ese momento, el consentimiento queda confirmado pero sin etiqueta (el error sale en los logs de `camybgs-api` en Render, con `[CONSENT]`).
1. En Atlas/Compass, colección **`email-consents`** de **`camyDB`**, filtrar:
   ```js
   { status: "confirmed", systemeTagged: false }
   ```
2. Para cada documento: en Systeme, buscar el contacto por su email y añadirle la etiqueta **consentimiento-emails** a mano (si el contacto no existe, crearlo con ese email).
3. En Compass, cambiar `systemeTagged` a `true` en ese documento (editar el documento → **Update**), para que no vuelva a salir en el filtro.

### Paso 3 — No borrar nada más
- Las **consultas** (`leads-web`) no se tocan: se borran solas a los 24 meses (índice TTL `createdAt_1`, `expireAfterSeconds: 63072000`).
- En Systeme el contacto se queda **dado de baja** (no borrarlo): es lo que impide volver a escribirle por error. Si la persona pide además que se borren **todos** sus datos (derecho de supresión), borrar también el contacto de Systeme y sus documentos de `leads-web`.

### Paso 4 — Dejar constancia
Anotar la revisión en la tabla (fecha y número de personas; **sin emails**, para no copiar datos personales aquí):

| Fecha | Bajas tratadas | Documentos borrados | Notas |
|---|---|---|---|
| | | | |

### Para más adelante (opción B, sin implementar)
Una función `api/consent-unsubscribe.js` que recibe un aviso (webhook) de Systeme y borra los documentos de ese email, protegida con un secreto compartido. Antes hay que comprobar en Systeme qué evento existe para la baja. Si no lo hay, usar una automatización que quite la etiqueta `2222022` al darse de baja, más el webhook de "etiqueta quitada".

---

## 📌 Pendientes

- **Datos de Bond:** `BOND_SALES_URL` (página de venta en Systeme) y `BOND_DEMO_URL` (reserva de la demo) en `config/site.js`, antes de activar Bond.
- **Restos de Vercel:** quitar el proyecto y los dominios de Vercel y borrar `frontend/vercel.json`. Los handlers de `frontend/api/` se quedan (los usa `server/index.js`), aunque podrían moverse a `server/`. `lib/emailConsentFlow.js` todavía mira `VERCEL_ENV`/`VERCEL_URL` para las vistas previas; en Render no hacen nada.
- **Archivos pesados:** los vídeos de testimonios (12 MB y 20 MB), la música de fondo (6 MB) y `mockupMiniAuditoria.png` (2,6 MB; solo se descarga si se activa el popup).
- **Omar:** logo nuevo sin "MARKETING · WEB", imagen Open Graph nueva y revisión con calma de `en.json`.
- **Dependencias:** `npm audit` avisa de vulnerabilidades en las dependencias.

---

## 👤 Autor

**Omar Ocando** · Full Stack Developer
📧 info@camybgs.com · 🌍 Colonia, Alemania · [linkedin.com/in/omar-ocando-mederos](https://www.linkedin.com/in/omar-ocando-mederos/)
