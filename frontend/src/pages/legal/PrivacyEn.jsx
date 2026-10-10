import { CONTACT } from "../../config/site";
import { PROVIDER, PHONE_DISPLAY, LEGAL_UPDATED } from "./provider";

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Privacy policy in English
function PrivacyEn() {
  return (
    <>
      <h1 className="legal__title">Privacy Policy</h1>
      <p className="legal__meta">Last updated: {LEGAL_UPDATED.en}</p>

      {/* ── 1 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">1. Controller</h2>
        <p className="legal__p">
          The controller responsible for processing your personal data on this website,
          within the meaning of the General Data Protection Regulation (GDPR), is:
        </p>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Germany<br />
          <br />
          Phone:{" "}
          <a className="legal__link" href={`tel:${CONTACT.phone}`}>{PHONE_DISPLAY}</a><br />
          Email:{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>
        <p className="legal__p">
          I am not required to appoint a data protection officer. For any question about your
          data, please write to me directly at the address above.
        </p>
      </section>

      {/* ── 2 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">2. Summary</h2>
        <p className="legal__p">
          I only process your personal data when it is necessary to show you this website, to
          answer your enquiries, or because you have given me your consent. This website does
          not use cookies, analytics or tracking tools, or advertising. Fonts, images, videos
          and music are hosted on the website itself and are not loaded from third-party
          servers.
        </p>
        <p className="legal__p">
          Below I explain which data is processed, for what purpose, on what legal basis, who
          receives it and how long it is kept.
        </p>
      </section>

      {/* ── 3 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">3. Hosting and delivery of the website</h2>
        <p className="legal__p">
          This website is hosted by <strong>Vercel Inc.</strong> (USA). Every time you visit a
          page, Vercel's server automatically processes the technical data needed to deliver
          it to you: your IP address, the date and time of access, the requested page, the
          referring page, your browser and your operating system. Vercel also runs the service
          that receives the contact form data (section 5).
        </p>
        <p className="legal__p">
          <strong>Purpose and legal basis:</strong> the technical delivery, stability and
          security of the website (for example, defending against attacks). The legal basis
          is my legitimate interest in a secure and properly functioning website
          (Art. 6 (1) (f) GDPR).
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> Vercel keeps this log data for a limited period
          according to its terms and then deletes it. I do not combine it with other data or
          use it to identify you.
        </p>
        <p className="legal__p">
          <strong>Transfers to third countries:</strong> Vercel may process data in the USA.
          The transfer is based on the European Commission's Standard Contractual Clauses
          (Art. 46 (2) (c) GDPR). More information:{" "}
          <a className="legal__link" href="https://vercel.com/legal/privacy-policy" {...ext}>
            vercel.com/legal/privacy-policy
          </a>.
        </p>
      </section>

      {/* ── 4 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Cookies and storage in your browser</h2>
        <p className="legal__p">
          This website does not use cookies or similar tracking technologies, and it does not
          store or read information on your device beyond what is technically necessary to
          display the pages you request (§ 25 (2) no. 2 TDDDG, the German Telecommunications
          and Digital Services Data Protection Act). You therefore do not need to accept any
          cookie notice.
        </p>
      </section>

      {/* ── 5 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">5. Contact form</h2>
        <p className="legal__p">
          If you write to me through the contact form, I process the data you enter: name,
          email address, profession or business, the service you are interested in and your
          message, together with the date it was sent. All fields are required to reply to
          you; without them I cannot handle your enquiry.
        </p>
        <p className="legal__p">
          <strong>Purpose and legal basis:</strong> answering your enquiry and, where
          appropriate, preparing a proposal. The legal basis is taking steps at your request
          prior to entering into a contract (Art. 6 (1) (b) GDPR) and, in all other cases, my
          legitimate interest in handling the enquiries I receive (Art. 6 (1) (f) GDPR).
        </p>
        <p className="legal__p">
          <strong>Recipients:</strong> to handle your enquiry I use the following providers,
          which process the data on my behalf as processors (Art. 28 GDPR):
        </p>
        <ul className="legal__list">
          <li>
            <strong>MongoDB Atlas</strong> (MongoDB, Inc., USA): the database in which your
            enquiry is stored. The data is stored on servers in Frankfurt (Germany).
          </li>
          <li>
            <strong>Systeme.io</strong> (ITACWT Limited, Dublin, Ireland): my contact
            management system (CRM). It receives your name, your email address and a tag with
            the service you are interested in. According to its privacy policy, its servers
            are located in Ireland (EU).
          </li>
          <li>
            <strong>Resend</strong> (Resend, Inc., USA): sends me an email notification with
            the content of your enquiry.
          </li>
          <li>
            <strong>Vercel</strong> (Vercel Inc., USA): receives the form and passes it on to
            the services above (section 3).
          </li>
        </ul>
        <p className="legal__p">
          <strong>Transfers to third countries:</strong> MongoDB, Resend and Vercel are US
          companies, so access to the data from the USA cannot be ruled out. These transfers
          are based on the European Commission's adequacy decision for the EU-US Data Privacy
          Framework (Art. 45 GDPR), insofar as the company is certified, and on the European
          Commission's Standard Contractual Clauses (Art. 46 (2) (c) GDPR).
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> the enquiry you send through the form is automatically
          deleted from the database 24 months after it was sent. In my other systems (email
          and Systeme.io) I keep your data for as long as necessary to handle your enquiry
          and, if we do not end up working together, I delete it no later than 24 months
          after our last contact. If a contract is concluded, the statutory retention periods
          under commercial and tax law apply.
        </p>
      </section>

      {/* ── 6 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">6. Occasional emails (optional consent)</h2>
        <p className="legal__p">
          In the contact form you can voluntarily tick a box to receive occasional emails with
          ideas, news and useful information for your business. Only if you tick it does your
          contact in Systeme.io receive a tag that marks it as subscribed, and I keep the date
          of your consent as proof. If you do not tick it, I will only write to you to answer
          your enquiry.
        </p>
        <p className="legal__p">
          <strong>Legal basis:</strong> your consent (Art. 6 (1) (a) GDPR and § 7 (2) UWG, the
          German Act against Unfair Competition).
        </p>
        <p className="legal__p">
          <strong>Unsubscribing:</strong> you can withdraw your consent at any time, free of
          charge, using the unsubscribe link in every email or by writing to me at{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          Withdrawal does not affect the lawfulness of emails sent before. After you
          unsubscribe, I stop sending these emails and remove the tag; I only keep the
          information needed to make sure I do not write to you again.
        </p>
      </section>

      {/* ── 7 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">7. Contact by email, phone or messaging apps</h2>
        <p className="legal__p">
          If you email or call me, I process the data you share with me (for example your
          name, phone number and the content of your enquiry) to handle your request. The
          legal basis is the same as in section 5.
        </p>
        <p className="legal__p">
          On this website you will find links to write to me via <strong>WhatsApp</strong>,{" "}
          <strong>Telegram</strong> or <strong>Signal</strong>. These are plain links: as long
          as you do not click them, no data is sent to these services. If you choose to
          contact me through one of them, the respective provider (WhatsApp Ireland Ltd.,
          Telegram FZ-LLC or Signal Technology Foundation) processes your data under its own
          responsibility and according to its own privacy policy. If you prefer not to use
          them, you can email me instead.
        </p>
      </section>

      {/* ── 8 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">8. External links</h2>
        <p className="legal__p">
          This website contains links to other websites, such as my clients' websites or pages
          hosted on Systeme.io. When you click them you leave my website, and the operator of
          the destination website is responsible for processing your data there.
        </p>
      </section>

      {/* ── 9 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">9. SSL/TLS encryption</h2>
        <p className="legal__p">
          For security reasons, this website uses SSL/TLS encryption. You can recognise it by
          the address starting with "https://" and the padlock in your browser bar. This way,
          the data you send me cannot be read by third parties during transmission.
        </p>
      </section>

      {/* ── 10 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">10. Your rights</h2>
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

      {/* ── 11 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">11. Automated decision-making</h2>
        <p className="legal__p">
          I do not use automated decision-making or profiling within the meaning of
          Art. 22 GDPR.
        </p>
      </section>

      {/* ── 12 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">12. Changes to this policy</h2>
        <p className="legal__p">
          I update this policy when the services I use or the applicable law change. The
          version published on this page is always the one in force.
        </p>
      </section>
    </>
  );
}

export default PrivacyEn;
