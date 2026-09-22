# CAMY | Business Growth Solutions — Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat&logo=vercel&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

Sitio web oficial de CAMY Business Growth Solutions. Plataforma de marketing digital para la captación de clientes, construida con React + Vite y desplegada íntegramente en Vercel: la SPA como sitio estático y el formulario de contacto como función serverless.

**Frontend** – React + Vite · SPA con animaciones, formulario de contacto y diseño responsive

**API** – Función serverless en Vercel (`frontend/api/contact.js`) · gestión del formulario de contacto, persistencia en MongoDB, notificación por email e integración con Systeme.io

> ⚠️ El directorio `backend/` (Node.js + Express) es código legado: ya no se despliega ni se usa en producción. Todo el tráfico de `/api/contact` es servido por la función serverless de Vercel.

---

## ⚙️ Tech Stack

### Frontend
* React 19
* React Router
* Context API
* SCSS modular
* Vite

### API (Vercel Serverless Functions)
* Node.js
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
| `/datenschutz` | Datenschutz |

---

## 📁 Estructura del proyecto

```
CamyWeb/
├── backend/            # legado — no desplegado, no usado en producción
│   └── src/
│       ├── api/
│       │   ├── controllers/
│       │   ├── models/
│       │   └── routes/
│       ├── config/
│       └── utils/
└── frontend/
    ├── api/
    │   └── contact.js  # función serverless de Vercel (POST /api/contact)
    ├── lib/
    │   ├── db.js        # conexión a MongoDB (Mongoose, con caché de conexión)
    │   ├── Contact.js   # modelo Mongoose
    │   ├── email.js     # notificación por email vía Resend
    │   └── systeme.js   # integración con Systeme.io
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

> Para ejecutar la función serverless (`frontend/api/contact.js`) en local con el mismo runtime que Vercel, usa `vercel dev` en lugar de (o junto a) `npm run dev`.

---

## 🔐 Variables de entorno

Configurar en el proyecto de Vercel (Project Settings → Environment Variables), o en un `.env` dentro de `frontend/` para desarrollo local con `vercel dev`:

```env
MONGO_URI=
RESEND_API_KEY=
SYSTEME_API_KEY=
```

---

## 🌐 Infraestructura de producción

| Capa | Servicio | Detalle |
|---|---|---|
| Dominio | `camybgs.com` | DNS apuntando a Vercel |
| Frontend | Vercel | SPA estática, auto-deploy desde `master` en GitHub |
| API | Vercel (Serverless Function) | `frontend/api/contact.js`, mismo proyecto y deploy que el frontend |
| Base de datos | MongoDB Atlas | Conectada a la función serverless vía `MONGO_URI` |
| Email | Resend | Notificaciones del formulario de contacto |
| CRM | Systeme.io | Integración para captación de leads |

> Cada push a `master` redeploya automáticamente frontend y función serverless como un único proyecto en Vercel. **Railway ya no forma parte de la infraestructura** — el backend Express en `backend/` es código legado sin despliegue activo.

---

## 👤 Autor

**Omar Ocando** · Full Stack Developer
📧 info@camybgs.com · 🌍 Colonia, Alemania · [linkedin.com/in/omar-ocando-mederos](https://www.linkedin.com/in/omar-ocando-mederos/)
