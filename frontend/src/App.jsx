import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import { NotificationProvider } from "./context/NotificationContext";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import SobreMi from "./pages/SobreMi";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import AuditPopup from "./components/AuditPopup";
import AuditFloatBtn from "./components/AuditFloatBtn";
import { SHOW_LEAD_POPUP, SHOW_LEAD_FLOAT_BTN } from "./config/site";

function App() {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

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
            <Route path="/"           element={<Home active={!loading} />} />
            <Route path="/servicios"  element={<Servicios />} />
            <Route path="/proyectos"  element={<Proyectos />} />
            <Route path="/sobre-mi"   element={<SobreMi />} />
            <Route path="/contacto"   element={<Contacto />} />
            <Route path="/impressum"  element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
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
