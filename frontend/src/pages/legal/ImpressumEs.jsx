import { CONTACT } from "../../config/site";
import { PROVIDER, PHONE_DISPLAY } from "./provider";

// Impressum en español. El nombre "Impressum" no se traduce: es el término
// legal alemán (§ 5 DDG) y así lo reconoce cualquier usuario en Alemania.
function ImpressumEs() {
  return (
    <>
      <h1 className="legal__title">Impressum</h1>
      <p className="legal__meta">Información conforme al §&nbsp;5 de la DDG (Ley alemana de servicios digitales)</p>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Proveedor del sitio web</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Alemania
        </address>
        <p className="legal__p">
          <strong>Teléfono:</strong>{" "}
          <a className="legal__link" href={`tel:${CONTACT.phone}`}>{PHONE_DISPLAY}</a>
          <br />
          <strong>Correo electrónico:</strong>{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Datos fiscales</h2>
        <p className="legal__p">
          <strong>Número fiscal (Steuernummer):</strong> {PROVIDER.taxNumber}
          <br />
          <strong>Número de IVA intracomunitario conforme al §&nbsp;27a UStG:</strong> {PROVIDER.vatId}
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Responsable del contenido conforme al §&nbsp;18, apartado 2, del MStV</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Alemania
        </address>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Resolución de litigios con consumidores</h2>
        <p className="legal__p">
          No estoy dispuesto ni obligado a participar en procedimientos de resolución de
          litigios ante una junta de arbitraje de consumo (§&nbsp;36 VSBG). Si tienes cualquier
          reclamación, escríbeme directamente a{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{" "}
          y buscaremos una solución.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Responsabilidad por los contenidos</h2>
        <p className="legal__p">
          Elaboro los contenidos de este sitio web con el mayor cuidado. Como proveedor de
          servicios, soy responsable de mis propios contenidos conforme a las leyes generales
          (§&nbsp;7, apartado 1, de la DDG). Según los §§&nbsp;8 a 10 de la DDG, no estoy obligado a
          supervisar la información de terceros transmitida o almacenada, ni a investigar
          circunstancias que indiquen una actividad ilícita. Las obligaciones de eliminar o
          bloquear el uso de información conforme a las leyes generales no se ven afectadas.
          Una responsabilidad en este sentido solo es posible desde el momento en que se tenga
          conocimiento de una infracción concreta. En cuanto tenga conocimiento de una
          infracción, eliminaré esos contenidos de inmediato.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Responsabilidad por los enlaces</h2>
        <p className="legal__p">
          Este sitio contiene enlaces a sitios web externos de terceros (por ejemplo, WhatsApp,
          Telegram, Signal o las webs de mis clientes), sobre cuyos contenidos no tengo ninguna
          influencia. Por eso no puedo asumir ninguna responsabilidad por esos contenidos
          ajenos. De los contenidos de las páginas enlazadas es siempre responsable su
          proveedor u operador. En el momento de enlazarlas, revisé las páginas por posibles
          infracciones y no detecté contenidos ilícitos. Sin indicios concretos de una
          infracción, no es razonable un control permanente de las páginas enlazadas. En cuanto
          tenga conocimiento de una infracción, eliminaré esos enlaces de inmediato.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Derechos de autor</h2>
        <p className="legal__p">
          Los textos, diseños, imágenes y vídeos creados por mí para este sitio web están
          sujetos al derecho de autor alemán. Su reproducción, edición, distribución o
          cualquier tipo de explotación fuera de los límites de esa ley requieren mi
          autorización previa por escrito. Las descargas y copias de este sitio solo están
          permitidas para uso privado y no comercial.
        </p>
        <p className="legal__p">
          Los vídeos de testimonios y las imágenes de proyectos se publican con el permiso de
          los clientes correspondientes, que conservan sus derechos. Cuando un contenido no ha
          sido creado por mí, respeto los derechos de terceros. Si aun así detectas una posible
          infracción de derechos de autor, te agradezco que me lo comuniques; en cuanto tenga
          conocimiento de ella, retiraré ese contenido de inmediato.
        </p>
      </section>
    </>
  );
}

export default ImpressumEs;
