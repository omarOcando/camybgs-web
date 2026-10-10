import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import i18n from "./i18n";
import { LANGS, ROUTES, langFromPath } from "./config/routes";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import { NotificationProvider } from "./context/NotificationContext";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import SobreMi from "./pages/SobreMi";
import Bond from "./pages/Bond";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AuditPopup from "./components/AuditPopup";
import AuditFloatBtn from "./components/AuditFloatBtn";
import { SHOW_LEAD_POPUP, SHOW_LEAD_FLOAT_BTN, SHOW_BOND } from "./config/site";

function App() {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);
  const { pathname } = useLocation();

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
    servicios:   () => <Servicios />,
    bond:        (lang) => (SHOW_BOND ? <Bond /> : <Navigate to={ROUTES.home[lang]} replace />),
    proyectos:   () => <Proyectos />,
    sobreMi:     () => <SobreMi />,
    contacto:    () => <Contacto />,
    impressum:   () => <Impressum />,
    datenschutz: () => <Datenschutz />,
  };

  return (
    <NotificationProvider>
      {loading && <Loader onFinish={handleFinish} />}
      <div className={`appFade${loading ? " appFade--hidden" : ""}`}>
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
          </Routes>
        </MainLayout>
      </div>
    </NotificationProvider>
  );
}

export default App;
