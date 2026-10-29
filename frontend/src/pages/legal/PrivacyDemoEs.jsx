import { CONTACT } from "../../config/site";
import { PROVIDER } from "./provider";

// Política de privacidad del demo de Bond (demo.camybgs.com), en español
function PrivacyDemoEs() {
  const mail = (
    <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
  );

  return (
    <>
      <h1 className="legal__title">Política de privacidad de la demo de Bond</h1>
      <p className="legal__meta">Última actualización: 29 de octubre de 2026</p>

      <p className="legal__p">
        Esta página explica qué hacemos con tus datos cuando pruebas la demo de Bond en
        demo.camybgs.com. La demo sirve para enseñar cómo funciona la plataforma: no es un
        servicio real de acompañamiento.
      </p>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Quién es el responsable</h2>
        <address className="legal__address">
          {PROVIDER.name}, que opera como {PROVIDER.business}.<br />
          {PROVIDER.street}, {PROVIDER.city} (Alemania).<br />
          Número de IVA: {PROVIDER.vatId}.<br />
          Email: {mail}.
        </address>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. Qué datos tratamos y para qué</h2>
        <ul className="legal__list">
          <li>
            Al reservar: nombre, apellidos (si los escribes), email, idioma, la zona horaria
            de tu navegador y tu consentimiento. Para guardar tu cita, enviarte el enlace para
            confirmarla y los avisos de la cita.
          </li>
          <li>
            Al usar tu espacio: una cookie técnica de sesión y tus citas. Para mantenerte
            conectado y mostrarte tus sesiones.
          </li>
          <li>
            Si lo usas: tus check-ins, tus mensajes y tu foto de perfil (opcional, la puedes
            quitar cuando quieras).
          </li>
          <li>
            Pagos: la demo usa el modo de prueba de Stripe. No se cobra nada de verdad y no
            debes introducir datos de una tarjeta real.
          </li>
        </ul>
        <p className="legal__p">
          Los mensajes, los check-ins y las notas pueden contener datos sobre tu salud o
          bienestar. Por eso se guardan cifrados y solo los ve la persona a quien van
          dirigidos.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Por qué podemos tratar tus datos</h2>
        <ul className="legal__list">
          <li>Para prestarte lo que pides al reservar y usar la demo.</li>
          <li>
            Los datos de salud o bienestar que compartas, solo con tu consentimiento
            explícito, que das al marcar la casilla de la reserva (art. 9.2.a RGPD), y solo
            para acompañarte en la demo. Puedes retirarlo cuando quieras escribiendo a{" "}
            {mail} o borrando tu cuenta desde «Tus datos».
          </li>
          <li>
            Interés legítimo: proteger el servicio, por ejemplo limitando los intentos de
            acceso repetidos.
          </li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Con quién compartimos tus datos</h2>
        <p className="legal__p">
          No vendemos tus datos. Usamos estos proveedores, que los tratan solo por encargo
          nuestro y bajo contrato:
        </p>
        <ul className="legal__list">
          <li>Render (alojamiento de la aplicación): Frankfurt, UE.</li>
          <li>MongoDB Atlas (base de datos): Frankfurt, UE.</li>
          <li>Scaleway (copias de seguridad cifradas): París, UE.</li>
          <li>Resend (emails de acceso, reserva y avisos): Estados Unidos.</li>
          <li>Stripe (pagos de prueba): Stripe Payments Europe, Irlanda.</li>
        </ul>
        <p className="legal__p">
          Render, MongoDB y Resend son empresas de Estados Unidos. Aunque Render y MongoDB
          guardan los datos en Frankfurt, pueden acceder a ellos desde allí para prestar su
          servicio. Esas transferencias están protegidas con las cláusulas contractuales tipo
          de la Unión Europea y, en el caso de Render y Resend, con su certificación en el
          Marco de Privacidad de Datos UE-EE. UU.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. Cuánto tiempo guardamos tus datos</h2>
        <ul className="legal__list">
          <li>Tu cuenta y todo lo que contiene: mientras la tengas. Si la borras, se elimina.</li>
          <li>Una reserva sin confirmar: 30 minutos.</li>
          <li>El enlace de acceso por email: 15 minutos y un solo uso.</li>
          <li>Tu sesión abierta en un dispositivo: hasta 90 días, que se renuevan con el uso.</li>
          <li>
            Copias de seguridad: 30 días como máximo. Un dato borrado puede seguir en una
            copia hasta que caduca.
          </li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Tus derechos</h2>
        <p className="legal__p">
          Desde «Tus datos», en tu espacio, puedes descargar una copia de tus datos, corregir
          tu nombre y tu idioma, y borrar tu cuenta (lo confirmas con un enlace que te llega
          por email). Para cualquier otro derecho (oposición, limitación, cambiar tu email),
          escribe a {mail}. Respondemos en un mes como máximo.
        </p>
        <p className="legal__p">
          Si crees que no hemos tratado bien tus datos, puedes reclamar ante la autoridad de
          protección de datos de Renania del Norte-Westfalia (LDI NRW) o ante la de tu país.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Seguridad y cookies</h2>
        <p className="legal__p">
          Todo viaja cifrado (HTTPS). Los mensajes, las notas y las copias de seguridad se
          guardan cifrados. La demo usa una sola cookie, técnica y necesaria, para mantener
          tu sesión. No usa cookies de publicidad ni de análisis, ni carga scripts ni fuentes
          de terceros.
        </p>
      </section>
    </>
  );
}

export default PrivacyDemoEs;
