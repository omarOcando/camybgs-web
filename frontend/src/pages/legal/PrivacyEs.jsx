import { CONTACT } from "../../config/site";
import { PROVIDER, PHONE_DISPLAY, LEGAL_UPDATED } from "./provider";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Política de privacidad en español
function PrivacyEs() {
  return (
    <>
      <h1 className="legal__title">Política de privacidad</h1>
      <p className="legal__meta">Última actualización: {LEGAL_UPDATED.es}</p>

      {/* ── 1 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Responsable del tratamiento</h2>
        <p className="legal__p">
          El responsable del tratamiento de tus datos personales en este sitio web, en el
          sentido del Reglamento General de Protección de Datos (RGPD), es:
        </p>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Alemania<br />
          <br />
          Teléfono:{" "}
          <a className="legal__link" href={`tel:${CONTACT.phone}`}>{PHONE_DISPLAY}</a><br />
          Correo electrónico:{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
        <p className="legal__p">
          No estoy obligado a designar un delegado de protección de datos. Para cualquier
          pregunta sobre tus datos, escríbeme directamente a la dirección anterior.
        </p>
      </section>

      {/* ── 2 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. Resumen</h2>
        <p className="legal__p">
          Trato tus datos personales solo cuando es necesario para mostrarte este sitio web,
          para responder a tus consultas o porque tú me has dado tu consentimiento. Este sitio
          no utiliza cookies, ni herramientas de análisis o seguimiento, ni publicidad. Las
          fuentes tipográficas, las imágenes, los vídeos y la música se alojan en el propio
          sitio, sin cargarse desde servidores de terceros.
        </p>
        <p className="legal__p">
          A continuación te explico qué datos se tratan, con qué finalidad, sobre qué base
          legal, quién los recibe y durante cuánto tiempo se conservan.
        </p>
      </section>

      {/* ── 3 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Alojamiento y entrega del sitio web</h2>
        <p className="legal__p">
          Este sitio web está alojado en <strong>Vercel Inc.</strong> (EE. UU.). Cada vez que
          visitas una página, el servidor de Vercel procesa automáticamente los datos técnicos
          necesarios para entregártela: tu dirección IP, la fecha y hora de acceso, la página
          solicitada, la página de procedencia, el navegador y el sistema operativo. Vercel
          también ejecuta el servicio que recibe los datos del formulario de contacto
          (apartado 5).
        </p>
        <p className="legal__p">
          <strong>Finalidad y base legal:</strong> la entrega técnica, la estabilidad y la
          seguridad del sitio web (por ejemplo, la defensa frente a ataques). La base legal es
          mi interés legítimo en un sitio web seguro y que funcione correctamente (art. 6,
          apartado 1, letra f, del RGPD).
        </p>
        <p className="legal__p">
          <strong>Conservación:</strong> estos datos de registro los conserva Vercel durante
          un periodo limitado según sus condiciones y después se eliminan. Yo no los combino
          con otros datos ni los utilizo para identificarte.
        </p>
        <p className="legal__p">
          <strong>Transferencia a terceros países:</strong> Vercel puede tratar datos en
          EE. UU. La transferencia se basa en las cláusulas contractuales tipo de la Comisión
          Europea (art. 46, apartado 2, letra c, del RGPD). Más información:{" "}
          <a className="legal__link" href="https://vercel.com/legal/privacy-policy" {...ext}>
            vercel.com/legal/privacy-policy
          </a>.
        </p>
      </section>

      {/* ── 4 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Cookies y almacenamiento en tu navegador</h2>
        <p className="legal__p">
          Este sitio web no utiliza cookies ni tecnologías similares de seguimiento, y no
          guarda ni lee información en tu dispositivo más allá de lo técnicamente necesario
          para mostrarte las páginas que solicitas (§ 25, apartado 2, n.º 2, de la TDDDG, ley
          alemana de protección de datos en telecomunicaciones y servicios digitales). Por eso
          no necesitas aceptar ningún aviso de cookies.
        </p>
      </section>

      {/* ── 5 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. Formulario de contacto</h2>
        <p className="legal__p">
          Si me escribes a través del formulario de contacto, trato los datos que introduces:
          nombre, correo electrónico, profesión o negocio, el servicio que te interesa y tu
          mensaje, junto con la fecha de envío. Todos los campos son necesarios para poder
          responderte; sin ellos no puedo atender tu consulta.
        </p>
        <p className="legal__p">
          <strong>Finalidad y base legal:</strong> responder a tu consulta y, si procede,
          preparar una propuesta. La base legal es la aplicación de medidas precontractuales a
          petición tuya (art. 6, apartado 1, letra b, del RGPD) y, en los demás casos, mi
          interés legítimo en atender las consultas que recibo (art. 6, apartado 1, letra f,
          del RGPD).
        </p>
        <p className="legal__p">
          <strong>Destinatarios:</strong> para gestionar tu consulta utilizo los siguientes
          proveedores, que tratan los datos en mi nombre como encargados del tratamiento
          (art. 28 del RGPD):
        </p>
        <ul className="legal__list">
          <li>
            <strong>MongoDB Atlas</strong> (MongoDB, Inc., EE. UU.): base de datos en la que se
            guarda tu consulta. Los datos se almacenan en servidores de Fráncfort (Alemania).
          </li>
          <li>
            <strong>Systeme.io</strong> (ITACWT Limited, Dublín, Irlanda): mi sistema de gestión
            de contactos (CRM). Recibe tu nombre, tu correo electrónico y una etiqueta con el
            servicio que te interesa. Según su política de privacidad, sus servidores están en
            Irlanda (UE).
          </li>
          <li>
            <strong>Resend</strong> (Resend, Inc., EE. UU.): envía a mi correo un aviso con el
            contenido de tu consulta.
          </li>
          <li>
            <strong>Vercel</strong> (Vercel Inc., EE. UU.): recibe el formulario y lo transmite
            a los servicios anteriores (apartado 3).
          </li>
        </ul>
        <p className="legal__p">
          <strong>Transferencia a terceros países:</strong> MongoDB, Resend y Vercel son
          empresas estadounidenses, por lo que no puede descartarse un acceso a los datos
          desde EE. UU. Estas transferencias se basan en la decisión de adecuación de la
          Comisión Europea para el Marco de Privacidad de Datos UE-EE. UU. (art. 45 del RGPD),
          en la medida en que la empresa esté certificada, y en las cláusulas contractuales
          tipo de la Comisión Europea (art. 46, apartado 2, letra c, del RGPD).
        </p>
        <p className="legal__p">
          <strong>Conservación:</strong> la consulta que envías por el formulario se borra
          automáticamente de la base de datos 24 meses después de su envío (la constancia de
          tu consentimiento para recibir emails, si lo das, se rige por el apartado 6). En el resto de
          sistemas (correo electrónico y Systeme.io) conservo tus datos mientras sea necesario
          para atender tu consulta y, si no llegamos a colaborar, los elimino como máximo 24
          meses después de nuestro último contacto. Si se celebra un contrato, se aplican los
          plazos de conservación mercantiles y fiscales que establece la ley.
        </p>
      </section>

      {/* ── 6 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Emails ocasionales (consentimiento opcional)</h2>
        <p className="legal__p">
          En el formulario de contacto puedes marcar, de forma voluntaria, una casilla para
          recibir emails ocasionales con ideas, novedades e información útil para tu negocio.
          Solo si la marcas, tu contacto en Systeme.io recibe una etiqueta que lo identifica
          como suscrito. Si no la marcas, solo te escribiré para responder a tu consulta.
        </p>
        <p className="legal__p">
          <strong>Base legal:</strong> tu consentimiento (art. 6, apartado 1, letra a, del
          RGPD, y § 7, apartado 2, de la UWG, ley alemana contra la competencia desleal).
        </p>
        <p className="legal__p">
          <strong>Prueba del consentimiento:</strong> para poder demostrar que lo diste (art.
          7, apartado 1, del RGPD), guardo tu correo electrónico, la fecha, el texto exacto de
          la casilla que aceptaste y la versión de ese texto. Se guardan en MongoDB Atlas
          (servidores de Fráncfort, Alemania), aparte de tu consulta y sin el borrado
          automático del apartado 5. Base legal: art. 6, apartado 1, letra c, del RGPD, en
          relación con su art. 7, apartado 1. Conservo esta constancia mientras sigas
          suscrito y la elimino cuando te das de baja.
        </p>
        <p className="legal__p">
          <strong>Baja:</strong> puedes retirar tu consentimiento en cualquier momento, sin
          coste, mediante el enlace de baja incluido en cada email o escribiéndome a{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          La retirada no afecta a la licitud de los envíos anteriores. Tras tu baja, dejo de
          enviarte estos emails y elimino la etiqueta; conservo únicamente el dato necesario
          para no volver a escribirte.
        </p>
      </section>

      {/* ── 7 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Contacto por email, teléfono o mensajería</h2>
        <p className="legal__p">
          Si me escribes por correo electrónico o me llamas, trato los datos que me
          comunicas (por ejemplo, nombre, número de teléfono y contenido de la consulta)
          para atender tu petición. La base legal es la misma que en el apartado 5.
        </p>
        <p className="legal__p">
          En este sitio encontrarás enlaces para escribirme por <strong>WhatsApp</strong>,{" "}
          <strong>Telegram</strong> o <strong>Signal</strong>. Son simples enlaces: mientras no
          los pulses, no se transmite ningún dato a esos servicios. Si decides contactarme por
          uno de ellos, el proveedor correspondiente (WhatsApp Ireland Ltd., Telegram FZ-LLC o
          Signal Technology Foundation) trata tus datos bajo su propia responsabilidad y según
          su política de privacidad. Si prefieres no usarlos, puedes escribirme por correo
          electrónico.
        </p>
      </section>

      {/* ── 8 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">8. Enlaces externos</h2>
        <p className="legal__p">
          Este sitio contiene enlaces a otros sitios web, como las webs de mis clientes o
          páginas alojadas en Systeme.io. Al pulsarlos sales de mi sitio, y el operador de la
          web de destino es responsable del tratamiento de tus datos allí.
        </p>
      </section>

      {/* ── 9 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">9. Cifrado SSL/TLS</h2>
        <p className="legal__p">
          Por motivos de seguridad, este sitio utiliza cifrado SSL/TLS. Lo reconoces porque la
          dirección empieza por «https://» y aparece un candado en la barra del navegador. Así,
          los datos que me envías no pueden ser leídos por terceros durante la transmisión.
        </p>
      </section>

      {/* ── 10 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">10. Tus derechos</h2>
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

      {/* ── 11 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">11. Decisiones automatizadas</h2>
        <p className="legal__p">
          No tomo decisiones automatizadas ni elaboro perfiles en el sentido del art. 22 del
          RGPD.
        </p>
      </section>

      {/* ── 12 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">12. Cambios en esta política</h2>
        <p className="legal__p">
          Actualizo esta política cuando cambian los servicios que utilizo o la normativa
          aplicable. La versión vigente es siempre la publicada en esta página.
        </p>
      </section>
    </>
  );
}

export default PrivacyEs;
