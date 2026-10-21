import { CONTACT } from "../../config/site";
import { PROVIDER, LEGAL_UPDATED } from "./provider";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Privacy policy for the Bond demo (demo.camybgs.com), in English
function PrivacyDemoEn() {
  return (
    <>
      <h1 className="legal__title">Bond Demo Privacy Policy</h1>
      <p className="legal__meta">Last updated: {LEGAL_UPDATED.en}</p>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Controller</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Germany<br />
          <br />
          Email:{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
        <p className="legal__p">
          At demo.camybgs.com you can try Bond, my client management platform. It is a
          demo: payments run in test mode and nothing is actually charged. Please do not
          enter health data or any other sensitive data.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">What data I process</h2>
        <ul className="legal__list">
          <li>
            If you book a session: your name, your email, your browser&apos;s language and
            time zone, and the date and version of the consent you accept.
          </li>
          <li>
            If you log in to the portal: your appointments, your check-ins, your messages,
            shared summaries and your payments (amount and status).
          </li>
          <li>I do not use demo data to send you marketing.</li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Why, and on what legal basis</h2>
        <p className="legal__p">
          To manage your booking and your test account (Art. 6(1)(b) GDPR), to keep proof of
          your consent (Art. 6(1)(c) GDPR) and to keep the service secure (Art. 6(1)(f) GDPR).
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Who helps me</h2>
        <p className="legal__p">
          These providers are processors: they process the data on my behalf and on my
          instructions (Art. 28 GDPR), except for Stripe as explained below.
        </p>
        <ul className="legal__list">
          <li>Render (application hosting, servers in Frankfurt, Germany).</li>
          <li>MongoDB Atlas (database, servers in Frankfurt, Germany).</li>
          <li>Resend (sending the booking and login emails).</li>
          <li>Scaleway (encrypted backups, servers in Paris, France).</li>
          <li>
            Stripe Payments Europe Ltd., Ireland (payment page). Stripe collects the payment
            details on its own page; I never see or store your card details. For fraud
            prevention and its legal obligations, Stripe acts as an independent controller
            and keeps the payment data under its own privacy policy, even if you delete your
            demo account.
          </li>
        </ul>
        <p className="legal__p">
          Some of these providers belong to companies outside the EU; in that case, transfers
          are based on the European Commission&apos;s standard contractual clauses or on the
          EU-U.S. Data Privacy Framework.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">How long I keep it</h2>
        <p className="legal__p">
          Until you delete your account. Backups are kept for no more than 30 days; after
          that, deleted data is gone from them too. I may reset the demo at any time, which
          deletes its data.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">Your rights</h2>
        <p className="legal__p">
          In the &ldquo;Your data&rdquo; section of the portal you can download your data and
          delete your account yourself.
        </p>
        <p className="legal__p">
          Regarding your personal data, you have the right to:
        </p>
        <ul className="legal__list">
          <li>access it and find out how I process it (Art. 15 GDPR);</li>
          <li>have it corrected if it is inaccurate (Art. 16 GDPR);</li>
          <li>have it erased (Art. 17 GDPR);</li>
          <li>restrict its processing (Art. 18 GDPR);</li>
          <li>receive it in a structured format and transmit it to another controller (Art. 20 GDPR);</li>
          <li>withdraw any consent you have given at any time, with effect for the future (Art. 7 (3) GDPR);</li>
          <li>lodge a complaint with a supervisory authority (Art. 77 GDPR).</li>
        </ul>
        <p className="legal__p">
          To exercise these rights, simply write to me at{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          The supervisory authority responsible for me is the{" "}
          <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong>{" "}
          (Kavalleriestraße 2-4, 40213 Düsseldorf, Germany,{" "}
          <a className="legal__link" href="https://www.ldi.nrw.de" {...ext}>www.ldi.nrw.de</a>),
          but you may also contact the authority in your country of residence.
        </p>

        <h3 className="legal__h3">Right to object (Art. 21 GDPR)</h3>
        <p className="legal__p">
          <strong>
            Where I process your data on the basis of my legitimate interest
            (Art. 6 (1) (f) GDPR), you may object to this processing at any time on grounds
            relating to your particular situation. I will then stop processing it, unless
            there are compelling legitimate grounds that override your interests, or the
            processing serves to establish, exercise or defend legal claims.
          </strong>
        </p>
      </section>
    </>
  );
}

export default PrivacyDemoEn;
