# Backend — CAMY BGS

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-22B573?style=flat&logo=gmail&logoColor=white)

API REST en Node.js + Express para el sitio web de CAMY Business Growth Solutions.

Responsable de:
* Recepción y almacenamiento de mensajes del formulario de contacto
* Envío de email de notificación al recibir un contacto
* Sincronización de contactos con Systeme.io

---

## ⚙️ Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* Nodemailer
* Systeme.io API

---

## 📁 Estructura

```
src/
├── api/
│   ├── controllers/
│   │   └── contact.controller.js
│   ├── models/
│   │   └── Contact.js
│   └── routes/
│       └── contact.routes.js
├── config/
│   └── db.js
└── utils/
    ├── email.js
    └── systeme.js
```

---

## 🔌 API Endpoints

### Contacto

```
POST /api/contact
```

Body esperado:
```json
{
  "nombre": "string",
  "email": "string",
  "profesion": "string",
  "mensaje": "string"
}
```

---

## 🚀 Ejecución

```bash
npm install
npm run dev
```

Servidor: `http://localhost:3000`

---

## 🔐 Variables de entorno

Crear `.env` en la raíz del backend:

```env
MONGO_URI=
PORT=3000
EMAIL_USER=
EMAIL_PASS=
SYSTEME_API_KEY=
```
