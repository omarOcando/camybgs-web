// Fotos del aro de la página de Bond, por idioma. key: texto en
// bond.gallery.items.<key>. Solo capturas del demo: sin barra del navegador y
// sin datos personales.
import esHome from "../assets/images/bond-gallery/es-home.webp";
import esPortalMessagesMobile from "../assets/images/bond-gallery/es-portal-messages-mobile.webp";
import esAgenda from "../assets/images/bond-gallery/es-agenda.webp";
import esClientsMobile from "../assets/images/bond-gallery/es-clients-mobile.webp";
import esPortalToday from "../assets/images/bond-gallery/es-portal-today.webp";
import esHomeMobile from "../assets/images/bond-gallery/es-home-mobile.webp";
import esPayments from "../assets/images/bond-gallery/es-payments.webp";
import esPortalPayments from "../assets/images/bond-gallery/es-portal-payments.webp";
import enClients from "../assets/images/bond-gallery/en-clients.webp";
import enPortalSessionsMobile from "../assets/images/bond-gallery/en-portal-sessions-mobile.webp";
import enPortalToday from "../assets/images/bond-gallery/en-portal-today.webp";
import enAgendaMobile from "../assets/images/bond-gallery/en-agenda-mobile.webp";
import enPortalPayments from "../assets/images/bond-gallery/en-portal-payments.webp";
import enPaymentsMobile from "../assets/images/bond-gallery/en-payments-mobile.webp";
import enLanguage from "../assets/images/bond-gallery/en-language.webp";
import enPortalPaymentsMobile from "../assets/images/bond-gallery/en-portal-payments-mobile.webp";

export const BOND_GALLERY = {
  es: [
    { key: "home",                 src: esHome,                 device: "desktop" },
    { key: "portalMessagesMobile", src: esPortalMessagesMobile, device: "mobile" },
    { key: "agenda",               src: esAgenda,               device: "desktop" },
    { key: "clientsMobile",        src: esClientsMobile,        device: "mobile" },
    { key: "portalToday",          src: esPortalToday,          device: "desktop" },
    { key: "homeMobile",           src: esHomeMobile,           device: "mobile" },
    { key: "payments",             src: esPayments,             device: "desktop" },
    { key: "portalPayments",       src: esPortalPayments,       device: "desktop" },
  ],
  en: [
    { key: "clients",              src: enClients,              device: "desktop" },
    { key: "portalSessionsMobile", src: enPortalSessionsMobile, device: "mobile" },
    { key: "portalToday",          src: enPortalToday,          device: "desktop" },
    { key: "agendaMobile",         src: enAgendaMobile,         device: "mobile" },
    { key: "portalPayments",       src: enPortalPayments,       device: "desktop" },
    { key: "paymentsMobile",       src: enPaymentsMobile,       device: "mobile" },
    { key: "language",             src: enLanguage,             device: "desktop" },
    { key: "portalPaymentsMobile", src: enPortalPaymentsMobile, device: "mobile" },
  ],
};
