import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoSrc from "../../assets/images/LogoCamySoloDarkBG.png";
import { NAV_LINKS, CONTACT } from "../../config/site";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img src={logoSrc} alt={t("footer.logoAlt")} className="footer__logo-img" />
      </Link>

      <p className="footer__tagline">{t("footer.slogan")}</p>

      <nav className="footer__nav" aria-label={t("footer.navLabel")}>
        {NAV_LINKS.map(({ to, key }) => (
          <Link key={to} to={to}>{t(`nav.links.${key}`)}</Link>
        ))}
      </nav>

      <div className="footer__legal">
        <Link to="/impressum">Impressum</Link>
        <span className="footer__dot" aria-hidden="true">•</span>
        <Link to="/datenschutz">Datenschutz</Link>
      </div>

      <a href={`mailto:${CONTACT.email}`} className="footer__email">{CONTACT.email}</a>

      <div className="footer__copyright">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}

export default Footer;
