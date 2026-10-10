import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoSrc from "../../assets/images/LogoCamySoloDarkBG.png";
import { NAV_LINKS, CONTACT } from "../../config/site";
import { useLocalePath } from "../../config/routes";

function Footer() {
  const { t } = useTranslation();
  const { path } = useLocalePath();

  return (
    <footer className="footer">
      <div className="footer__brand">
        <Link to={path("home")} className="footer__logo">
          <img src={logoSrc} alt={t("footer.logoAlt")} className="footer__logo-img" />
        </Link>
        <span className="footer__sep" aria-hidden="true" />
        <p className="footer__tagline">{t("footer.slogan")}</p>
      </div>

      <nav className="footer__nav" aria-label={t("footer.navLabel")}>
        {NAV_LINKS.map(({ key }) => (
          <Link key={key} to={path(key)}>{t(`nav.links.${key}`)}</Link>
        ))}
      </nav>

      <div className="footer__legal">
        <Link to={path("impressum")}>Impressum</Link>
        <span className="footer__dot" aria-hidden="true">•</span>
        <Link to={path("datenschutz")}>{t("footer.privacy")}</Link>
      </div>

      <a href={`mailto:${CONTACT.email}`} className="footer__email">{CONTACT.email}</a>

      <div className="footer__copyright">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}

export default Footer;
