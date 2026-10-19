import { Link } from "react-router-dom";
import { CONTACT } from "../../config/site";
import { ROUTES } from "../../config/routes";

const Email = () => (
  <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
);

// General Terms and Conditions in English
function TermsEn() {
  return (
    <>
      <h1 className="legal__title">General Terms and Conditions</h1>

      {/* ── 1 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Scope</h2>
        <p className="legal__p">
          1.1 These terms apply to all web design and development, maintenance and related
          services provided by CAMY – Business Growth Solutions, Omar José Ocando Mederos,
          Von-Klespe-Straße 17, 50226 Frechen (Germany), <Email />, VAT ID: DE460427719
          ("CAMY"), to its clients.
        </p>
        <p className="legal__p">
          1.2 Anything agreed in writing in the proposal accepted by the client takes precedence.
          The client's own terms only apply if CAMY accepts them in writing.
        </p>
        <p className="legal__p">
          1.3 A "consumer" is any natural person who enters into a contract for purposes outside
          their trade, business or profession; a "business" is anyone acting in the course of
          such activity.
        </p>
      </section>

      {/* ── 2 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. Conclusion of the contract</h2>
        <p className="legal__p">
          2.1 Before the contract, CAMY sends the client a proposal stating the service, the
          final price, the timeline and the start date.
        </p>
        <p className="legal__p">
          2.2 The contract is concluded when the client accepts the proposal (in writing, by
          email or by paying the first amount on the payment page).
        </p>
      </section>

      {/* ── 3 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Services</h2>
        <p className="legal__p">
          3.1 The scope of each service (number of pages, features, languages, basic SEO, legal
          pages, etc.) is as described in the proposal.
        </p>
        <p className="legal__p">
          3.2 Delivery times start once CAMY has received the client's complete material (texts,
          images, logos, access details).
        </p>
        <p className="legal__p">
          3.3 CAMY presents the website design (structure and style) to the client for approval.
          Changes to the approved design (texts, images, colours and design adjustments) are
          unlimited until the delivery is accepted. Changes that alter the approved structure
          (new pages or sections, new features or a new structure) are quoted separately.
        </p>
      </section>

      {/* ── 4 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Prices and payment</h2>
        <p className="legal__p">
          4.1 Prices are final. Under §&nbsp;19 UStG (German small business scheme), CAMY does
          not charge VAT.
        </p>
        <p className="legal__p">
          4.2 Unless the proposal states otherwise, payment is made in two parts: 50&nbsp;% on
          acceptance of the proposal (this payment reserves the start date) and 50&nbsp;% on
          delivery, before the website is published or the files are handed over.
        </p>
        <p className="legal__p">
          4.3 Payment methods: card, Apple Pay, Google Pay, PayPal, bank transfer and Klarna.
          Bank transfers must be made within 7 days of the invoice date.
        </p>
        <p className="legal__p">
          4.4 Instalments with Klarna: if the client chooses Klarna, they enter into a financing
          agreement directly with Klarna under Klarna's terms. CAMY receives the full amount and
          is not a party to that financing.
        </p>
        <p className="legal__p">
          4.5 Monthly plans (maintenance, hosting, Basic, Plus) are paid in advance each month.
        </p>
      </section>

      {/* ── 5 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. Client cooperation</h2>
        <p className="legal__p">
          5.1 The client provides the necessary material within the agreed time and guarantees
          that they hold the rights to use all material they supply (texts, images, trademarks).
          The client indemnifies CAMY against third-party claims relating to that material.
        </p>
        <p className="legal__p">
          5.2 If the client does not provide the material or does not respond for more than 30
          days, CAMY may reschedule the project to the next available date. Payments already
          made remain allocated to that project.
        </p>
      </section>

      {/* ── 6 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Delivery and acceptance</h2>
        <p className="legal__p">
          6.1 CAMY delivers the website on a test link for review.
        </p>
        <p className="legal__p">
          6.2 The client reviews the delivery within 7 days and reports any defects in writing.
          If no material defects are reported within that period, or if the client publishes the
          website, the delivery is deemed accepted.
        </p>
      </section>

      {/* ── 7 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Rights of use and ownership</h2>
        <p className="legal__p">
          7.1 Upon full payment, the client receives exclusive rights of use, unlimited in time
          and territory, to the design and code created for their project.
        </p>
        <p className="legal__p">
          7.2 Third-party components (fonts, libraries, stock images, plugins) are subject to
          their own licences.
        </p>
        <p className="legal__p">
          7.3 CAMY may show the project in its portfolio and on its social media unless the
          client objects in writing.
        </p>
      </section>

      {/* ── 8 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">8. Domain, hosting and monthly plans</h2>
        <p className="legal__p">
          8.1 The domain is registered in the client's name. The client gives CAMY access to
          configure it.
        </p>
        <p className="legal__p">
          8.2 Monthly plans run for one month and renew automatically. They can be cancelled at
          any time, effective at the end of the current month.
        </p>
      </section>

      {/* ── 9 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">9. Right of withdrawal (consumers only)</h2>
        <p className="legal__p">
          9.1 Consumers have the right to withdraw from the contract within 14 days of its
          conclusion without giving any reason. A clear statement sent to <Email /> is
          sufficient. CAMY provides the withdrawal instructions and the model withdrawal form
          together with the proposal.
        </p>
        <p className="legal__p">
          9.2 If the consumer expressly requests that CAMY start work before the 14 days have
          expired and then withdraws, they must pay a proportionate amount for the work already
          carried out.
        </p>
        <p className="legal__p">
          9.3 The right of withdrawal expires once CAMY has fully performed the service, provided
          the consumer expressly requested an early start and acknowledged that they would lose
          this right once the service has been fully performed.
        </p>
      </section>

      {/* ── 10 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">10. Liability</h2>
        <p className="legal__p">
          10.1 CAMY is liable without limitation for intent and gross negligence, and for injury
          to life, body or health.
        </p>
        <p className="legal__p">
          10.2 For slight negligence, CAMY is only liable for breach of essential contractual
          obligations, limited to the typical, foreseeable damage.
        </p>
        <p className="legal__p">
          10.3 CAMY is not liable for content supplied by the client or for outages of
          third-party services (hosting providers, domain registrars, payment gateways, external
          platforms).
        </p>
      </section>

      {/* ── 11 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">11. Data protection</h2>
        <p className="legal__p">
          CAMY processes personal data in accordance with its privacy policy:{" "}
          <Link className="legal__link" to={ROUTES.privacy.en}>www.camybgs.com/en/privacy</Link>.
        </p>
      </section>

      {/* ── 12 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">12. Final provisions</h2>
        <p className="legal__p">
          12.1 German law applies. For consumers, this choice of law does not deprive them of the
          protection of the mandatory provisions of the country of their habitual residence.
        </p>
        <p className="legal__p">
          12.2 If the client is a business, the place of jurisdiction is Cologne (Germany).
        </p>
        <p className="legal__p">
          12.3 CAMY is neither obliged nor willing to take part in dispute resolution proceedings
          before a consumer arbitration board.
        </p>
        <p className="legal__p">
          12.4 If any provision is invalid, the remaining provisions remain valid.
        </p>
      </section>

      {/* ── 13 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">13. Information on the right of withdrawal (consumers only)</h2>

        <h3 className="legal__h3">Right of withdrawal</h3>
        <p className="legal__p">
          You have the right to withdraw from this contract within 14 days without giving any
          reason.
        </p>
        <p className="legal__p">
          The withdrawal period will expire after 14 days from the day of the conclusion of the
          contract.
        </p>
        <p className="legal__p">
          To exercise the right of withdrawal, you must inform us (CAMY – Business Growth
          Solutions, Omar José Ocando Mederos, Von-Klespe-Straße 17, 50226 Frechen, Germany,
          phone: <a className="legal__link" href={`tel:${CONTACT.phone}`}>+49 177 8587715</a>,
          email: <Email />) of your decision to withdraw from this contract by an unequivocal
          statement (e.g. a letter sent by post or email). You may use the attached model
          withdrawal form, but it is not obligatory.
        </p>
        <p className="legal__p">
          To meet the withdrawal deadline, it is sufficient for you to send your communication
          concerning your exercise of the right of withdrawal before the withdrawal period has
          expired.
        </p>

        <h3 className="legal__h3">Effects of withdrawal</h3>
        <p className="legal__p">
          If you withdraw from this contract, we shall reimburse to you all payments received
          from you, including the costs of delivery (with the exception of the supplementary
          costs resulting from your choice of a type of delivery other than the least expensive
          type of standard delivery offered by us), without undue delay and in any event not
          later than 14 days from the day on which we are informed about your decision to
          withdraw from this contract. We will carry out such reimbursement using the same means
          of payment as you used for the initial transaction, unless you have expressly agreed
          otherwise; in any event, you will not incur any fees as a result of such reimbursement.
        </p>
        <p className="legal__p">
          If you requested to begin the performance of services during the withdrawal period, you
          shall pay us an amount which is in proportion to what has been provided until you have
          communicated to us your withdrawal from this contract, in comparison with the full
          coverage of the contract.
        </p>

        <h3 className="legal__h3">Model withdrawal form</h3>
        <p className="legal__p">
          (Complete and return this form only if you wish to withdraw from the contract.)
        </p>
        <p className="legal__p">
          – To CAMY – Business Growth Solutions, Omar José Ocando Mederos, Von-Klespe-Straße 17,
          50226 Frechen, Germany, email: <Email />:<br />
          – I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale
          of the following goods (*)/for the provision of the following service (*)<br />
          – Ordered on (*)/received on (*)<br />
          – Name of consumer(s)<br />
          – Address of consumer(s)<br />
          – Signature of consumer(s) (only if this form is notified on paper)<br />
          – Date
        </p>
        <p className="legal__p">(*) Delete as appropriate.</p>
      </section>

      <hr className="legal__divider" />
      <p className="legal__meta">Version: October 2026.</p>
    </>
  );
}

export default TermsEn;
