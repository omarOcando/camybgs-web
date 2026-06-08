# Frontend — CAMY BGS

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

SPA en React + Vite para el sitio web de CAMY Business Growth Solutions.

---

## ⚙️ Tech Stack

* React 19
* React Router
* Context API
* SCSS modular
* Vite

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

## 📁 Estructura

```
src/
├── assets/
│   ├── audios/
│   ├── images/
│   └── videos/
├── components/
│   └── layout/
├── context/
├── pages/
├── services/
└── styles/
    ├── abstracts/
    ├── base/
    ├── components/
    │   └── layout/
    └── pages/
```

---

## 🚀 Ejecución

```bash
npm install
npm run dev
```

Aplicación: `http://localhost:5173`

---

## 🎨 Arquitectura de estilos

SCSS modular organizado en capas:

* `abstracts/` — variables y tokens de diseño
* `base/` — reset y tipografía global
* `components/` — estilos de componentes reutilizables
* `pages/` — estilos específicos por página
