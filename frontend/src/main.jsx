import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import App from "./App";
import "./styles/main.scss";

// Las metas de index.html marcadas con data-seo-static son para quien no
// ejecuta JavaScript (previsualizaciones de WhatsApp, redes…). Con React 19,
// Helmet no las sustituye, así que se quitan aquí y cada página pone las suyas
// con <Seo />; si no, habría dos description, dos canonical, etc.
document.querySelectorAll("head [data-seo-static]").forEach((el) => el.remove());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
