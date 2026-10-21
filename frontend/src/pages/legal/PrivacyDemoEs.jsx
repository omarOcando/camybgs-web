import { CONTACT } from "../../config/site";
import { PROVIDER, LEGAL_UPDATED } from "./provider";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Política de privacidad del demo de Bond (demo.camybgs.com), en español
function PrivacyDemoEs() {
  return (
    <>
      <h1 className="legal__title">Política de privacidad del demo de Bond</h1>
      <p className="legal__meta">Última actualización: {LEGAL_UPDATED.es}</p>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Responsable del tratamiento</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Alemania<br />
          <br />
          Correo electrónico:{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
        <p className="legal__p">
          En demo.camybgs.com puedes probar Bond, mi plataforma de gestión de clientes.
          Es una demostración: los pagos se hacen en modo de prueba y no se cobra nada real.
          Te pido que no escribas en ella datos de salud ni otros datos sensibles.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Qué datos trato</h2>
        <ul className="legal__list">
          <li>
            Si reservas una sesión: tu nombre, tu email, el idioma y la zona horaria de tu
            navegador, y la fecha y versión del consentimiento que aceptas.
          </li>
          <li>
            Si entras en el portal: tus citas, tus check-ins, tus mensajes, los resúmenes
            compartidos y tus pagos (importe y estado).
          </li>
          <li>No uso los datos del demo para enviarte marketing.</li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Para qué y con qué base</h2>
        <p className="legal__p">
          Para gestionar tu reserva y tu cuenta de prueba (art. 6.1.b RGPD), para guardar la
          prueba de tu consentimiento (art. 6.1.c RGPD) y para mantener la seguridad del
          servicio (art. 6.1.f RGPD).
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Quién me ayuda</h2>
        <p className="legal__p">
          Estos proveedores son encargados del tratamiento: tratan los datos por mi cuenta y
          siguiendo mis instrucciones (art. 28 del RGPD), salvo Stripe en lo que se explica
          abajo.
        </p>
        <ul className="legal__list">
          <li>Render (alojamiento de la aplicación, servidores en Frankfurt, Alemania).</li>
          <li>MongoDB Atlas (base de datos, servidores en Frankfurt, Alemania).</li>
          <li>Resend (envío de los emails de la reserva y del acceso).</li>
          <li>Scaleway (copias de seguridad cifradas, servidores en París, Francia).</li>
          <li>
            Stripe Payments Europe Ltd., Irlanda (página de pago). Stripe recoge en su propia
            página los datos del pago; yo no veo ni guardo los datos de tu tarjeta. Para la
            prevención del fraude y sus obligaciones legales, Stripe actúa como responsable
            independiente y conserva los datos del cobro según su propia política de
            privacidad, también si borras tu cuenta en el demo.
          </li>
        </ul>
        <p className="legal__p">
          Algunos de estos proveedores pertenecen a empresas de fuera de la UE; en ese caso,
          las transferencias se amparan en las cláusulas contractuales tipo de la Comisión
          Europea o en el Marco de Privacidad de Datos UE-EE. UU.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Cuánto tiempo los guardo</h2>
        <p className="legal__p">
          Hasta que borres tu cuenta. Las copias de seguridad se conservan como máximo 30
          días; pasado ese plazo, lo borrado desaparece también de ellas. Puedo reiniciar el
          demo en cualquier momento, lo que borra sus datos.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Tus derechos</h2>
        <p className="legal__p">
          Desde la sección «Tus datos» del portal puedes descargar tus datos y borrar tu
          cuenta tú mismo.
        </p>
        <p className="legal__p">
          En relación con tus datos personales, tienes derecho a:
        </p>
        <ul className="legal__list">
          <li>acceder a ellos y saber cómo los trato (art. 15 del RGPD);</li>
          <li>rectificarlos si son incorrectos (art. 16 del RGPD);</li>
          <li>solicitar su supresión (art. 17 del RGPD);</li>
          <li>solicitar la limitación del tratamiento (art. 18 del RGPD);</li>
          <li>recibirlos en un formato estructurado y transmitirlos a otro responsable (art. 20 del RGPD);</li>
          <li>retirar en cualquier momento el consentimiento que hayas dado, con efectos para el futuro (art. 7, apartado 3, del RGPD);</li>
          <li>presentar una reclamación ante una autoridad de control (art. 77 del RGPD).</li>
        </ul>
        <p className="legal__p">
          Para ejercerlos, basta con que me escribas a{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          La autoridad de control competente para mí es la{" "}
          <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong>{" "}
          (Kavalleriestraße 2-4, 40213 Düsseldorf,{" "}
          <a className="legal__link" href="https://www.ldi.nrw.de" {...ext}>www.ldi.nrw.de</a>),
          aunque también puedes dirigirte a la autoridad de tu país de residencia.
        </p>

        <h3 className="legal__h3">Derecho de oposición (art. 21 del RGPD)</h3>
        <p className="legal__p">
          <strong>
            Cuando trato tus datos sobre la base de mi interés legítimo (art. 6, apartado 1,
            letra f, del RGPD), puedes oponerte en cualquier momento a ese tratamiento por
            motivos relacionados con tu situación particular. En ese caso dejaré de tratarlos,
            salvo que existan motivos legítimos imperiosos que prevalezcan sobre tus intereses,
            o que el tratamiento sirva para formular, ejercer o defender reclamaciones.
          </strong>
        </p>
      </section>
    </>
  );
}

export default PrivacyDemoEs;
