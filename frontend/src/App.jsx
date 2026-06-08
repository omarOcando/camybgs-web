import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import { NotificationProvider } from "./context/NotificationContext";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Resultados from "./pages/Resultados";
import SobreMi from "./pages/SobreMi";
import MiTrabajo from "./pages/MiTrabajo";
import Contacto from "./pages/Contacto";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";

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
        <WhatsAppButton />
        <ScrollToTopButton />
        <MainLayout>
          <Routes>
            <Route path="/"           element={<Home active={!loading} />} />
            <Route path="/servicios"  element={<Servicios />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/sobre-mi"   element={<SobreMi />} />
            <Route path="/mi-trabajo"  element={<MiTrabajo />} />
            <Route path="/contacto"   element={<Contacto />} />
            <Route path="/impressum"  element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </MainLayout>
      </div>
    </NotificationProvider>
  );
}

export default App;
