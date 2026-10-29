import { CONTACT } from "../../config/site";
import { PROVIDER } from "./provider";

// Privacy policy for the Bond demo (demo.camybgs.com), in English
function PrivacyDemoEn() {
  const mail = (
    <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
  );

  return (
    <>
      <h1 className="legal__title">Bond Demo Privacy Policy</h1>
      <p className="legal__meta">Last updated: 29 October 2026</p>

      <p className="legal__p">
        This page explains what we do with your data when you try the Bond demo at
        demo.camybgs.com. The demo is there to show how the platform works: it is not a real
        coaching service.
      </p>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Who is responsible</h2>
        <address className="legal__address">
          {PROVIDER.name}, trading as {PROVIDER.business}.<br />
          {PROVIDER.street}, {PROVIDER.city} (Germany).<br />
          VAT ID: {PROVIDER.vatId}.<br />
          Email: {mail}.
        </address>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. What data we process and why</h2>
        <ul className="legal__list">
          <li>
            When you book: first name, last name (if you enter it), email, language, your
            browser's time zone and your consent. To save your appointment, send you the
            link to confirm it and the reminders about it.
          </li>
          <li>
            When you use your space: a technical session cookie and your appointments. To
            keep you logged in and show you your sessions.
          </li>
          <li>
            If you use them: your check-ins, your messages and your profile photo (optional,
            and you can remove it whenever you like).
          </li>
          <li>
            Payments: the demo uses Stripe's test mode. Nothing is really charged and you
            must not enter real card details.
          </li>
        </ul>
        <p className="legal__p">
          Messages, check-ins and notes may contain data about your health or well-being.
          That is why they are stored encrypted and can only be seen by the person they are
          addressed to.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Why we may process your data</h2>
        <ul className="legal__list">
          <li>To provide what you ask for when you book and use the demo.</li>
          <li>
            Any health or well-being data you share, only with your explicit consent, which
            you give by ticking the box when you book (Art. 9(2)(a) GDPR), and only to
            support you in the demo. You can withdraw it at any time by writing to {mail} or
            by deleting your account from "Your data".
          </li>
          <li>
            Legitimate interest: protecting the service, for example by limiting repeated
            login attempts.
          </li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Who we share your data with</h2>
        <p className="legal__p">
          We do not sell your data. We use these providers, who process it only on our behalf
          and under contract:
        </p>
        <ul className="legal__list">
          <li>Render (application hosting): Frankfurt, EU.</li>
          <li>MongoDB Atlas (database): Frankfurt, EU.</li>
          <li>Scaleway (encrypted backups): Paris, EU.</li>
          <li>Resend (login, booking and reminder emails): United States.</li>
          <li>Stripe (test payments): Stripe Payments Europe, Ireland.</li>
        </ul>
        <p className="legal__p">
          Render, MongoDB and Resend are US companies. Although Render and MongoDB store the
          data in Frankfurt, they can access it from there to provide their service. These
          transfers are protected by the European Union's standard contractual clauses and,
          for Render and Resend, by their certification under the EU-US Data Privacy
          Framework.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. How long we keep your data</h2>
        <ul className="legal__list">
          <li>Your account and everything in it: for as long as you have it. If you delete it, it is erased.</li>
          <li>An unconfirmed booking: 30 minutes.</li>
          <li>The login link sent by email: 15 minutes and single use.</li>
          <li>Your open session on a device: up to 90 days, renewed as you use it.</li>
          <li>
            Backups: 30 days at most. Deleted data may remain in a backup until it expires.
          </li>
        </ul>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Your rights</h2>
        <p className="legal__p">
          From "Your data", in your space, you can download a copy of your data, correct your
          name and language, and delete your account (you confirm it with a link sent to you
          by email). For any other right (objection, restriction, changing your email), write
          to {mail}. We reply within one month at most.
        </p>
        <p className="legal__p">
          If you think we have not handled your data properly, you can complain to the data
          protection authority of North Rhine-Westphalia (LDI NRW) or to the one in your
          country.
        </p>
      </section>

      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Security and cookies</h2>
        <p className="legal__p">
          Everything travels encrypted (HTTPS). Messages, notes and backups are stored
          encrypted. The demo uses a single cookie, technical and necessary, to keep your
          session. It does not use advertising or analytics cookies, and it does not load
          third-party scripts or fonts.
        </p>
      </section>
    </>
  );
}

export default PrivacyDemoEn;
