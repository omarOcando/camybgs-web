import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import i18n from "./i18n";
import { LANGS, ROUTES, langFromPath, hasLoader } from "./config/routes";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import { NotificationProvider } from "./context/NotificationContext";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Bond from "./pages/Bond";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import ConfirmSubscription from "./pages/ConfirmSubscription";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AuditPopup from "./components/AuditPopup";
import AuditFloatBtn from "./components/AuditFloatBtn";
import { SHOW_LEAD_POPUP, SHOW_LEAD_FLOAT_BTN, SHOW_BOND } from "./config/site";

function App() {
  const { pathname } = useLocation();
  // El loader solo se ve en la primera carga, y no en las páginas sin loader
  const [loading, setLoading] = useState(() => hasLoader(pathname));
  const handleFinish = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  // El idioma sigue a la URL (también con atrás/adelante). useLayoutEffect:
  // se cambia antes de pintar, sin un instante en el idioma anterior.
  useLayoutEffect(() => {
    const lang = langFromPath(pathname);
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [pathname]);

  // Páginas y su elemento según el idioma (Bond: interruptor SHOW_BOND)
  const pages = {
    home:        () => <Home active={!loading} />,
    services:    () => <Services />,
    bond:        (lang) => (SHOW_BOND ? <Bond /> : <Navigate to={ROUTES.home[lang]} replace />),
    projects:    () => <Projects />,
    about:       () => <About />,
    contact:     () => <Contact />,
    impressum:   () => <Impressum />,
    privacy:     () => <Privacy />,
    confirmSubscription: () => <ConfirmSubscription />,
  };

  return (
    <NotificationProvider>
      {loading && <Loader onFinish={handleFinish} />}
      {/* inert: mientras el Loader la tapa, la página no recibe foco ni la leen los lectores de pantalla */}
      <div className={`appFade${loading ? " appFade--hidden" : ""}`} inert={loading}>
        <ScrollToTop />
        {SHOW_LEAD_POPUP && <AuditPopup />}
        {SHOW_LEAD_FLOAT_BTN && <AuditFloatBtn />}
        <WhatsAppButton />
        <ScrollToTopButton />
        <MainLayout>
          <Routes>
            {/* Cada página en los dos idiomas (direcciones en config/routes.js) */}
            {LANGS.flatMap((lang) => Object.entries(pages).map(([page, element]) => (
              <Route key={`${lang}-${page}`} path={ROUTES[page][lang]} element={element(lang)} />
            )))}
            {/* Rutas antiguas: también hay redirección 301 en vercel.json */}
            <Route path="/resultados" element={<Navigate to="/proyectos" replace />} />
            <Route path="/mi-trabajo" element={<Navigate to="/proyectos" replace />} />
            <Route path="/datenschutz" element={<Navigate to="/privacidad" replace />} />
          </Routes>
        </MainLayout>
      </div>
    </NotificationProvider>
  );
}

export default App;
