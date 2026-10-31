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

El español va sin prefijo y el inglés bajo `/en` (fuente única: `src/config/routes.js`). Redirecciones y despliegue: ver el README de la raíz.

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
| Bond, página de ventas oculta (redirige a la Home mientras `SHOW_BOND_PAGE` sea `false`) | `/bond` | `/en/bond` |

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
├── config/
├── context/
├── data/
├── locales/
├── pages/
│   └── legal/
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
npm run dev            # http://localhost:5173
npm run start:api      # API Express en http://localhost:3000
npm run build:render   # build + prerenderizado del <head> (el que usa Render)
```

---

## 🎨 Arquitectura de estilos

SCSS modular organizado en capas:

* `abstracts/` — variables y tokens de diseño
* `base/` — reset y tipografía global
* `components/` — estilos de componentes reutilizables
* `pages/` — estilos específicos por página
