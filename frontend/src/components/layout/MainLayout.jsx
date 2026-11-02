import { useLocation } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { pageFromPath } from "../../config/routes";

function MainLayout({ children }) {
  const { pathname } = useLocation();
  // La página de ventas de Bond va sin menú ni footer (lleva su propio pie)
  const isDiscoverBond = pageFromPath(pathname) === "discoverBond";

  return (
    <div className="main-layout">
      {!isDiscoverBond && <Header />}

      <main className="main-layout__content">
        {children}
      </main>

      {!isDiscoverBond && <Footer />}
    </div>
  );
}

export default MainLayout;
