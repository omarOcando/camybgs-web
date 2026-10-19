import { Link } from "react-router-dom";
import { CONTACT } from "../../config/site";
import { ROUTES } from "../../config/routes";

const Email = () => (
  <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
);

// Condiciones generales de contratación en español
function TermsEs() {
  return (
    <>
      <h1 className="legal__title">Condiciones generales de contratación</h1>

      {/* ── 1 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Ámbito de aplicación</h2>
        <p className="legal__p">
          1.1 Estas condiciones se aplican a todos los servicios de diseño y desarrollo web,
          mantenimiento y servicios relacionados que presta CAMY – Business Growth Solutions,
          Omar José Ocando Mederos, Von-Klespe-Straße 17, 50226 Frechen (Alemania),{" "}
          <Email />, USt-IdNr.: DE460427719 (en adelante, "CAMY"), a sus clientes.
        </p>
        <p className="legal__p">
          1.2 Prevalece lo acordado por escrito en la propuesta aceptada por el cliente.
          Condiciones distintas del cliente solo se aplican si CAMY las acepta por escrito.
        </p>
        <p className="legal__p">
          1.3 "Consumidor" es toda persona física que contrata con fines ajenos a su actividad
          comercial o profesional; "empresario", quien contrata en ejercicio de dicha actividad.
        </p>
      </section>

      {/* ── 2 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. Celebración del contrato</h2>
        <p className="legal__p">
          2.1 Antes de contratar, CAMY envía al cliente una propuesta con el servicio, el precio
          final, el plazo y la fecha de inicio.
        </p>
        <p className="legal__p">
          2.2 El contrato se celebra cuando el cliente acepta la propuesta (por escrito, por
          email o mediante el pago del primer importe en la página de pago).
        </p>
      </section>

      {/* ── 3 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Servicios</h2>
        <p className="legal__p">
          3.1 El alcance de cada servicio (número de páginas, funciones, idiomas, SEO básico,
          páginas legales, etc.) es el descrito en la propuesta.
        </p>
        <p className="legal__p">
          3.2 Los plazos de entrega empiezan a contar cuando CAMY recibe el material completo del
          cliente (textos, imágenes, logotipos, accesos).
        </p>
        <p className="legal__p">
          3.3 CAMY presenta al cliente el diseño de la web (estructura y estilo) para su
          aprobación. Sobre el diseño aprobado, los cambios (textos, imágenes, colores y ajustes
          de diseño) son ilimitados hasta la aceptación de la entrega. Los cambios que alteren la
          estructura aprobada (nuevas páginas o secciones, nuevas funciones o una nueva
          estructura) se presupuestan aparte.
        </p>
      </section>

      {/* ── 4 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Precios y pago</h2>
        <p className="legal__p">
          4.1 Los precios son finales. Conforme al §&nbsp;19 UStG (régimen de pequeño
          empresario), CAMY no factura IVA.
        </p>
        <p className="legal__p">
          4.2 Salvo que la propuesta indique otra cosa, el pago se realiza en dos partes:
          50&nbsp;% al aceptar la propuesta (este pago reserva la fecha de inicio) y 50&nbsp;% a
          la entrega, antes de publicar la web o de transferir los archivos.
        </p>
        <p className="legal__p">
          4.3 Medios de pago: tarjeta, Apple Pay, Google Pay, PayPal, transferencia bancaria y
          Klarna. Las transferencias deben realizarse en un plazo de 7 días desde la factura.
        </p>
        <p className="legal__p">
          4.4 Pago a plazos con Klarna: si el cliente elige Klarna, celebra un contrato de
          financiación directamente con Klarna, según sus condiciones. CAMY recibe el importe
          completo y no es parte de esa financiación.
        </p>
        <p className="legal__p">
          4.5 Los planes mensuales (mantenimiento, hosting, Basic, Plus) se pagan por adelantado
          cada mes.
        </p>
      </section>

      {/* ── 5 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. Colaboración del cliente</h2>
        <p className="legal__p">
          5.1 El cliente entrega el material necesario en el plazo acordado y garantiza que tiene
          los derechos de uso de todo el material que aporta (textos, imágenes, marcas). El
          cliente exime a CAMY de reclamaciones de terceros por ese material.
        </p>
        <p className="legal__p">
          5.2 Si el cliente no entrega el material o no responde durante más de 30 días, CAMY
          puede reprogramar el proyecto a la siguiente fecha disponible. Los pagos realizados se
          mantienen para ese proyecto.
        </p>
      </section>

      {/* ── 6 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Entrega y aceptación</h2>
        <p className="legal__p">
          6.1 CAMY entrega la web en un enlace de prueba para su revisión.
        </p>
        <p className="legal__p">
          6.2 El cliente revisa la entrega en un plazo de 7 días y comunica por escrito los
          defectos que encuentre. Si no comunica defectos esenciales en ese plazo o publica la
          web, la entrega se considera aceptada.
        </p>
      </section>

      {/* ── 7 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Derechos de uso y propiedad</h2>
        <p className="legal__p">
          7.1 Con el pago completo, el cliente recibe los derechos de uso exclusivos, ilimitados
          en el tiempo y en el espacio, sobre el diseño y el código creados para su proyecto.
        </p>
        <p className="legal__p">
          7.2 Los componentes de terceros (tipografías, librerías, imágenes de bancos de
          imágenes, plugins) se rigen por sus propias licencias.
        </p>
        <p className="legal__p">
          7.3 CAMY puede mostrar el proyecto en su portfolio y en sus redes, salvo que el cliente
          se oponga por escrito.
        </p>
      </section>

      {/* ── 8 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">8. Dominio, hosting y planes mensuales</h2>
        <p className="legal__p">
          8.1 El dominio se registra a nombre del cliente. El cliente da a CAMY acceso para
          configurarlo.
        </p>
        <p className="legal__p">
          8.2 Los planes mensuales tienen una duración de un mes y se renuevan automáticamente.
          Pueden cancelarse en cualquier momento con efecto al final del mes en curso.
        </p>
      </section>

      {/* ── 9 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">9. Derecho de desistimiento (solo consumidores)</h2>
        <p className="legal__p">
          9.1 Los consumidores tienen derecho a desistir del contrato en un plazo de 14 días
          desde su celebración, sin indicar el motivo. Basta con comunicarlo de forma clara
          a <Email />. CAMY entrega las instrucciones y el formulario modelo de desistimiento
          junto con la propuesta.
        </p>
        <p className="legal__p">
          9.2 Si el consumidor pide expresamente que CAMY empiece el trabajo antes de que terminen
          los 14 días y desiste después, debe pagar la parte proporcional del trabajo ya
          realizado.
        </p>
        <p className="legal__p">
          9.3 El derecho de desistimiento se extingue cuando CAMY ha prestado el servicio por
          completo, si el consumidor pidió expresamente el inicio anticipado y confirmó saber que
          perdería este derecho al completarse el servicio.
        </p>
      </section>

      {/* ── 10 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">10. Responsabilidad</h2>
        <p className="legal__p">
          10.1 CAMY responde sin límite por dolo y negligencia grave, y por daños a la vida, el
          cuerpo o la salud.
        </p>
        <p className="legal__p">
          10.2 Por negligencia leve, CAMY solo responde por el incumplimiento de obligaciones
          contractuales esenciales, limitado al daño típico y previsible.
        </p>
        <p className="legal__p">
          10.3 CAMY no responde por el contenido aportado por el cliente ni por interrupciones de
          servicios de terceros (proveedores de hosting, dominios, pasarelas de pago, plataformas
          externas).
        </p>
      </section>

      {/* ── 11 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">11. Protección de datos</h2>
        <p className="legal__p">
          CAMY trata los datos personales conforme a su política de privacidad:{" "}
          <Link className="legal__link" to={ROUTES.privacy.es}>www.camybgs.com/privacidad</Link>.
        </p>
      </section>

      {/* ── 12 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">12. Disposiciones finales</h2>
        <p className="legal__p">
          12.1 Se aplica el derecho alemán. Para consumidores, esta elección no les priva de la
          protección de las normas imperativas del país donde tienen su residencia habitual.
        </p>
        <p className="legal__p">
          12.2 Si el cliente es empresario, el fuero competente es Colonia (Alemania).
        </p>
        <p className="legal__p">
          12.3 CAMY no está obligado ni dispuesto a participar en procedimientos de resolución de
          conflictos ante una junta arbitral de consumo.
        </p>
        <p className="legal__p">
          12.4 Si alguna cláusula fuera inválida, las demás siguen siendo válidas.
        </p>
      </section>

      {/* ── 13 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">13. Información sobre el derecho de desistimiento (solo consumidores)</h2>

        <h3 className="legal__h3">Derecho de desistimiento</h3>
        <p className="legal__p">
          Tiene usted derecho a desistir del presente contrato en un plazo de 14 días naturales
          sin necesidad de justificación.
        </p>
        <p className="legal__p">
          El plazo de desistimiento expirará a los 14 días naturales del día de la celebración
          del contrato.
        </p>
        <p className="legal__p">
          Para ejercer el derecho de desistimiento, deberá usted notificarnos (CAMY – Business
          Growth Solutions, Omar José Ocando Mederos, Von-Klespe-Straße 17, 50226 Frechen,
          Alemania, teléfono:{" "}
          <a className="legal__link" href={`tel:${CONTACT.phone}`}>+49 177 8587715</a>, correo
          electrónico: <Email />) su decisión de desistir del contrato a través de una
          declaración inequívoca (por ejemplo, una carta enviada por correo postal o un correo
          electrónico). Podrá utilizar el modelo de formulario de desistimiento que figura a
          continuación, aunque su uso no es obligatorio.
        </p>
        <p className="legal__p">
          Para cumplir el plazo de desistimiento, basta con que la comunicación relativa al
          ejercicio por su parte de este derecho sea enviada antes de que venza el plazo
          correspondiente.
        </p>

        <h3 className="legal__h3">Consecuencias del desistimiento</h3>
        <p className="legal__p">
          En caso de desistimiento por su parte, le devolveremos todos los pagos recibidos de
          usted, incluidos los gastos de entrega (con la excepción de los gastos adicionales
          resultantes de la elección por su parte de una modalidad de entrega diferente a la
          modalidad menos costosa de entrega ordinaria que ofrezcamos), sin ninguna demora
          indebida y, en todo caso, a más tardar 14 días naturales a partir de la fecha en la que
          se nos informe de su decisión de desistir del presente contrato. Procederemos a
          efectuar dicho reembolso utilizando el mismo medio de pago empleado por usted para la
          transacción inicial, a no ser que haya usted dispuesto expresamente lo contrario; en
          todo caso, no incurrirá en ningún gasto como consecuencia del reembolso.
        </p>
        <p className="legal__p">
          Si usted ha solicitado que la prestación de servicios dé comienzo durante el período de
          desistimiento, nos abonará un importe proporcional a la parte ya prestada del servicio
          en el momento en que nos haya comunicado su desistimiento, en relación con el objeto
          total del contrato.
        </p>

        <h3 className="legal__h3">Modelo de formulario de desistimiento</h3>
        <p className="legal__p">
          (Sólo debe cumplimentar y enviar el presente formulario si desea desistir del
          contrato.)
        </p>
        <p className="legal__p">
          – A la atención de CAMY – Business Growth Solutions, Omar José Ocando Mederos,
          Von-Klespe-Straße 17, 50226 Frechen, Alemania, correo electrónico: <Email />:<br />
          – Por la presente le comunico/comunicamos (*) que desisto de mi/desistimos de nuestro
          (*) contrato de venta del siguiente bien/prestación del siguiente servicio (*)<br />
          – Pedido el/recibido el (*)<br />
          – Nombre del consumidor o de los consumidores<br />
          – Domicilio del consumidor o de los consumidores<br />
          – Firma del consumidor o de los consumidores (solo si el presente formulario se
          presenta en papel)<br />
          – Fecha
        </p>
        <p className="legal__p">(*) Táchese lo que no proceda.</p>
      </section>

      <hr className="legal__divider" />
      <p className="legal__meta">Versión: octubre de 2026.</p>
    </>
  );
}

export default TermsEs;
