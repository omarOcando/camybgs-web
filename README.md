# CAMY | Business Growth Solutions — Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Render](https://img.shields.io/badge/Render-Static%20%2B%20Web%20Service-46E3B7?style=flat&logo=render&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

Sitio web oficial de CAMY Business Growth Solutions. Plataforma de marketing digital para la captación de clientes, construida con React + Vite.

**En migración de Vercel a Render** (descrita en `render.yaml`): un sitio estático para la SPA y un web service Express en Frankfurt para la API. Mientras se prueba Render, Vercel sigue funcionando igual con `frontend/api/` y `frontend/vercel.json`; se retirarán después del cambio de DNS.

**Frontend** – React + Vite · SPA con animaciones, formulario de contacto y diseño responsive

**API** – Formulario de contacto (`POST /api/contact`) y confirmación del doble opt-in (`GET /api/confirm-consent`) · persistencia en MongoDB, emails con Resend e integración con Systeme.io. La lógica está en `frontend/lib/`; la sirven las funciones de Vercel (`frontend/api/`) y el servidor Express de Render (`frontend/server/`), que reutiliza esos mismos handlers.

> ⚠️ El directorio `backend/` (Node.js + Express) es código legado: ya no se despliega ni se usa en producción.

---

## ⚙️ Tech Stack

### Frontend
* React 19
* React Router
* Context API
* SCSS modular
* Vite

### API (Express en Render · funciones de Vercel durante la transición)
* Node.js 22 + Express 5
* MongoDB + Mongoose
* Resend (email transaccional)
* Systeme.io API

---

## 📄 Páginas

| Ruta | Página |
|---|---|
| `/` | Home |
| `/servicios` | Servicios |
| `/resultados` | Resultados |
| `/sobre-mi` | Sobre mí |
| `/mi-trabajo` | Mi trabajo |
| `/contacto` | Contacto |
| `/impressum` | Impressum |
| `/privacidad` | Política de privacidad (`/datenschutz` redirige con 301) |
| `/condiciones` | Condiciones generales (EN: `/en/terms`) |

---

## 📁 Estructura del proyecto

```
CamyWeb/
├── render.yaml         # Blueprint de Render (API + sitio estático)
├── backend/            # legado — no desplegado, no usado en producción
│   └── src/
│       ├── api/
│       │   ├── controllers/
│       │   ├── models/
│       │   └── routes/
│       ├── config/
│       └── utils/
└── frontend/
    ├── api/             # funciones de Vercel (se retirarán tras la migración)
    │   ├── contact.js           # POST /api/contact
    │   └── confirm-consent.js   # GET /api/confirm-consent (doble opt-in)
    ├── server/
    │   └── index.js     # servidor Express de Render: mismos handlers + /tarjeta
    ├── scripts/
    │   └── prerender.js # <head> de cada página pública (npm run build:render)
    ├── lib/             # lógica compartida (MongoDB, Resend, Systeme, doble opt-in)
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        └── styles/
```

---

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/CamyWeb.git
cd CamyWeb
```

### Frontend + API
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

```bash
npm run start:api      # API Express en http://localhost:3000 (lee las variables del entorno)
npm run build:render   # build de producción + prerenderizado del <head> (el que usa Render)
```

---

## 🔐 Variables de entorno

Las de la API, descritas en `frontend/.env.example`. En Render van en el servicio `camybgs-api` (Environment); en Vercel, en Project Settings → Environment Variables. El sitio estático solo necesita `NODE_VERSION`.

```env
MONGO_URI=
RESEND_API_KEY=
EMAIL_USER=
SYSTEME_API_KEY=
CONSENT_SECRET=
SITE_URL=
ALLOWED_ORIGINS=   # solo Render
```

---

## 🌐 Infraestructura de producción

| Capa | Servicio | Detalle |
|---|---|---|
| Dominio | `camybgs.com` (DNS en IONOS) | Hoy apunta a Vercel; pasará a Render al publicar |
| Frontend | Render, sitio estático (`camybgs-web`) | SPA con el `<head>` prerenderizado; reenvía `/api/*` y `/tarjeta` a la API, así que todo va bajo el mismo dominio |
| API | Render, web service Starter en Frankfurt (`camybgs-api`) | `frontend/server/index.js` |
| Base de datos | MongoDB Atlas | `camyDB` en producción, `camyweb-preview` para pruebas |
| Email | Resend | Notificaciones del formulario de contacto |
| CRM | Systeme.io | Integración para captación de leads |

> Cada push a la rama del Blueprint (`rediseno-2026` durante las pruebas, `master` al publicar) redespliega los dos servicios de Render. **Railway ya no forma parte de la infraestructura** — el backend Express en `backend/` es código legado sin despliegue activo.

---

## 👤 Autor

**Omar Ocando** · Full Stack Developer
📧 info@camybgs.com · 🌍 Colonia, Alemania · [linkedin.com/in/omar-ocando-mederos](https://www.linkedin.com/in/omar-ocando-mederos/)
