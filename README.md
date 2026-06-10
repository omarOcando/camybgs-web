# CAMY | Business Growth Solutions — Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)

Sitio web oficial de CAMY Business Growth Solutions. Plataforma de marketing digital para la captación de clientes, construida con React + Vite en el frontend y Node.js + Express en el backend.

**Frontend** – React + Vite · SPA con animaciones, formulario de contacto y diseño responsive

**Backend** – Node.js + Express · API para gestión del formulario de contacto e integración con Systeme.io

---

## ⚙️ Tech Stack

### Frontend
* React 19
* React Router
* Context API
* SCSS modular
* Vite

### Backend
* Node.js
* Express
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
├── backend/
│   └── src/
│       ├── api/
│       │   ├── controllers/
│       │   ├── models/
│       │   └── routes/
│       ├── config/
│       └── utils/
└── frontend/
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

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:3000`
Frontend: `http://localhost:5173`

---

## 🔐 Variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend/`:

```env
MONGO_URI=
PORT=3000
RESEND_API_KEY=
SYSTEME_API_KEY=
```

---

## 🌐 Infraestructura de producción

| Capa | Servicio | Detalle |
|---|---|---|
| Dominio | `camybgs.com` | DNS apuntando a Vercel |
| Frontend | Vercel | Auto-deploy desde `master` en GitHub |
| Backend | Railway | Auto-deploy desde `master` en GitHub |
| Base de datos | MongoDB Atlas | Conectada al backend vía `MONGO_URI` |
| Email | Resend | Notificaciones del formulario de contacto |
| CRM | Systeme.io | Integración para captación de leads |

> Cada push a `master` redeploya automáticamente tanto el frontend (Vercel) como el backend (Railway).

---

## 👤 Autor

**Omar Ocando** · Full Stack Developer
📧 info@camybgs.com · 🌍 Colonia, Alemania · [linkedin.com/in/omar-ocando-mederos](https://www.linkedin.com/in/omar-ocando-mederos/)
