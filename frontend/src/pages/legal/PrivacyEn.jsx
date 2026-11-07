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
          answer your enquiries, to organise the Bond demo you book or process a purchase, or
          because you have given me your consent. This website (camybgs.com) does not use
          cookies, analytics or tracking tools, or advertising. Fonts, images, videos
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
          This website is hosted by <strong>Render Services, Inc.</strong> (USA). Every time you
          visit a page, Render's servers automatically process the technical data needed to
          deliver it to you: your IP address, the date and time of access, the requested page,
          the referring page, your browser and your operating system. Pages are delivered
          through Render's content delivery network (CDN), with servers in several countries.
          Render also runs, on servers in Frankfurt (Germany), the service that receives the
          contact form data (section 5). I have concluded a data processing agreement with
          Render (Art. 28 GDPR).
        </p>
        <p className="legal__p">
          <strong>Purpose and legal basis:</strong> the technical delivery, stability and
          security of the website (for example, defending against attacks). The legal basis
          is my legitimate interest in a secure and properly functioning website
          (Art. 6 (1) (f) GDPR).
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> Render keeps this log data for a limited period
          according to its terms and then deletes it. I do not combine it with other data or
          use it to identify you.
        </p>
        <p className="legal__p">
          <strong>Transfers to third countries:</strong> Render may process data in the USA.
          Render is certified under the EU-U.S. Data Privacy Framework, for which the European
          Commission has adopted an adequacy decision (Art. 45 GDPR). Should that framework
          cease to apply, the transfer is based on the European Commission's standard
          contractual clauses included in the agreement with Render (Art. 46(2)(c) GDPR). More
          information:{" "}
          <a className="legal__link" href="https://render.com/privacy" {...ext}>
            render.com/privacy
          </a>.
        </p>
      </section>

      {/* ── 4 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">4. Cookies and storage in your browser</h2>
        <p className="legal__p">
          This website (<strong>camybgs.com</strong>) does not use cookies or similar tracking
          technologies, and it does not store or read information on your device beyond what
          is technically necessary to display the pages you request (§&nbsp;25 (2) no. 2 TDDDG,
          the German Telecommunications and Digital Services Data Protection Act). You
          therefore do not need to accept any cookie notice on camybgs.com.
        </p>
        <p className="legal__p">
          The demo booking page (<strong>my.camybgs.com</strong>) and the shop
          (<strong>shop.camybgs.com</strong>) are hosted on Systeme.io (sections 8 and 9). They
          may use technically necessary cookies in order to work, for example to keep your
          session or your order. On the payment page, Stripe and PayPal also use cookies to
          prevent fraud. None of these pages use analytics or advertising cookies. The legal
          basis is the same: these cookies are essential for the service you request
          (§&nbsp;25 (2) no. 2 TDDDG).
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
            the content of your enquiry and, if you tick the email box, sends you the
            confirmation email described in section 6.
          </li>
          <li>
            <strong>Render</strong> (Render Services, Inc., USA; servers in Frankfurt,
            Germany): receives the form and passes it on to the services above (section 3).
          </li>
        </ul>
        <p className="legal__p">
          <strong>Transfers to third countries:</strong> MongoDB, Resend and Render are US
          companies, so access to the data from the USA cannot be ruled out. These transfers
          are based on the European Commission's adequacy decision for the EU-US Data Privacy
          Framework (Art. 45 GDPR), insofar as the company is certified, and on the European
          Commission's Standard Contractual Clauses (Art. 46 (2) (c) GDPR).
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> the enquiry you send through the form is automatically
          deleted from the database 24 months after it was sent (the record of your consent
          to receive emails, if you give it, is covered by section 6). In my other systems (email
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
          ideas, news and useful information for your business. If you do not tick it, I will
          only write to you to answer your enquiry.
        </p>
        <p className="legal__p">
          <strong>Confirmation (double opt-in):</strong> if you tick it, I send you a
          confirmation email with a link that is valid for 7 days. Only when you click that
          link is your subscription activated and your contact in Systeme.io given a tag that
          marks it as subscribed. This way I make sure that it was you who asked for it. If
          you do not confirm, you will not receive any emails of this kind.
        </p>
        <p className="legal__p">
          <strong>Legal basis:</strong> your consent (Art. 6 (1) (a) GDPR and §&nbsp;7 (2) UWG, the
          German Act against Unfair Competition).
        </p>
        <p className="legal__p">
          <strong>Proof of consent:</strong> to be able to demonstrate that you gave your
          consent (Art. 7 (1) GDPR), I keep your email address, the date you ticked the box, the
          date you confirmed your subscription, the exact wording of the checkbox you accepted
          and the version of that wording. This record is stored in
          MongoDB Atlas (servers in Frankfurt, Germany), separately from your enquiry and
          without the automatic deletion described in section 5. Legal basis: Art. 6 (1) (c)
          GDPR in conjunction with Art. 7 (1) GDPR. I keep this record for as long as you
          remain subscribed and delete it when you unsubscribe. If you do not confirm your
          subscription, the record is deleted automatically after 30 days.
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
        <h2 className="legal__h2">8. Booking a Bond demo and video call</h2>
        <p className="legal__p">
          If you book a Bond demo through my calendar at my.camybgs.com, I process the data you
          enter: first name, last name, email address, phone number, what you do and roughly
          how many clients you see per month, together with the date and time you choose.
        </p>
        <p className="legal__p">
          <strong>Purpose and legal basis:</strong> organising the demo, sending you the
          booking confirmation and two reminders by email, and preparing the call so that it
          fits your business. I only use your phone number to contact you if there is a
          problem with the appointment. The legal basis is taking steps at your request prior
          to entering into a contract (Art. 6 (1) (b) GDPR).
        </p>
        <p className="legal__p">
          <strong>Recipients:</strong> the calendar runs on <strong>Systeme.io</strong>{" "}
          (ITACWT Limited, Dublin, Ireland), which processes the data on my behalf as a
          processor (Art. 28 GDPR) and with which I have concluded a data processing
          agreement. According to that agreement, the data is hosted on Amazon Web Services
          servers in regions within the European Union.
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> the same as for enquiries sent through the form
          (section 5). If we do not end up working together, I delete your data no later than
          24 months after our last contact. If you sign up, the periods in section 9 apply.
        </p>

        <h3 className="legal__h3">Video call via Google Meet</h3>
        <p className="legal__p">
          The demo takes place as a video call on <strong>Google Meet</strong>. During the call,
          your name, your email address and, if you turn on your camera and microphone, your
          image and voice are processed. I do not record calls. Google Meet is a service of
          Google Ireland Limited (Dublin, Ireland), which processes the video call data
          according to its own privacy policy (
          <a className="legal__link" href="https://policies.google.com/privacy" {...ext}>
            policies.google.com/privacy
          </a>). The legal basis is the same as for the booking (Art. 6 (1) (b) GDPR).
        </p>
        <p className="legal__p">
          <strong>Transfers to third countries:</strong> Google may process data in the USA.
          Google LLC is certified under the EU-U.S. Data Privacy Framework, for which the
          European Commission has adopted an adequacy decision (Art. 45 GDPR).
        </p>
        <p className="legal__p">
          To create the video call link, the appointment (your name, your email address, the
          date and the time) is also saved in my Google Calendar, a service of Google Ireland
          Limited, on the same legal basis and with the same transfer to the USA described in
          the previous paragraph.
        </p>
      </section>

      {/* ── 9 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">9. Purchasing the Bond setup and payments</h2>
        <p className="legal__p">
          If you buy the Bond setup in my shop (shop.camybgs.com), I process your name, your
          email address, your billing address, the product you buy, the amount and the payment
          method you choose.
        </p>
        <p className="legal__p">
          <strong>Purpose and legal basis:</strong> processing your purchase, issuing the
          invoice and sending you the welcome email with what I need to prepare the setup.
          The legal basis is the performance of the contract (Art. 6 (1) (b) GDPR) and
          compliance with my tax and accounting obligations (Art. 6 (1) (c) GDPR).
        </p>
        <p className="legal__p">
          <strong>Recipients:</strong> the shop runs on <strong>Systeme.io</strong> (ITACWT
          Limited, Dublin, Ireland), as a processor under a data processing agreement
          (section 8).
        </p>
        <p className="legal__p">
          <strong>Payments:</strong> depending on the payment method you choose, your payment
          data is processed by:
        </p>
        <ul className="legal__list">
          <li>
            <strong>Stripe</strong> (Stripe Payments Europe, Ltd., Dublin, Ireland): card,
            Apple Pay and Klarna payments.
          </li>
          <li>
            <strong>Klarna</strong> (Klarna Bank AB, Stockholm, Sweden), if you choose Klarna.
          </li>
          <li>
            <strong>PayPal</strong> (PayPal (Europe) S.à r.l. et Cie, S.C.A., Luxembourg), if
            you choose PayPal.
          </li>
        </ul>
        <p className="legal__p">
          These providers process payment data as independent controllers, according to their
          own privacy policies. I do not see your full card or account details: I only
          receive confirmation of the payment.
        </p>
        <p className="legal__p">
          <strong>Retention:</strong> I keep invoices and purchase records for the statutory
          retention periods under German tax and commercial law (§&nbsp;147 AO, the German
          Fiscal Code, and §&nbsp;257 HGB, the German Commercial Code). After that, I delete
          them.
        </p>
      </section>

      {/* ── 10 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">10. If you sign up for Bond: your clients' data</h2>
        <p className="legal__p">
          If you sign up for Bond, I do not process your own clients' data stored on the
          platform as a controller, but as a processor on your behalf (Art. 28 GDPR). You are
          the controller of that data, and I only process it on your instructions, under the
          data processing agreement (DPA) we sign before we start. That processing is governed
          by the DPA, not by this policy.
        </p>
      </section>

      {/* ── 11 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">11. External links</h2>
        <p className="legal__p">
          This website contains links to other websites, such as my clients' websites. When
          you click them you leave my website, and the operator of the destination website is
          responsible for processing your data there. The booking page (my.camybgs.com) and
          the shop (shop.camybgs.com) are not external in this sense: although they are hosted
          on Systeme.io, I manage them and they are covered by this policy (sections 4, 8 and
          9). The Bond demo (demo.camybgs.com) has its own privacy policy, linked at the bottom
          of this page.
        </p>
      </section>

      {/* ── 12 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">12. SSL/TLS encryption</h2>
        <p className="legal__p">
          For security reasons, this website uses SSL/TLS encryption. You can recognise it by
          the address starting with "https://" and the padlock in your browser bar. This way,
          the data you send me cannot be read by third parties during transmission.
        </p>
      </section>

      {/* ── 13 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">13. Your rights</h2>
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

      {/* ── 14 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">14. Automated decision-making</h2>
        <p className="legal__p">
          I do not use automated decision-making or profiling within the meaning of
          Art. 22 GDPR.
        </p>
      </section>

      {/* ── 15 ── */}
      <hr className="legal__divider" />
      <section className="legal__section">
        <h2 className="legal__h2">15. Changes to this policy</h2>
        <p className="legal__p">
          I update this policy when the services I use or the applicable law change. The
          version published on this page is always the one in force.
        </p>
      </section>
    </>
  );
}

export default PrivacyEn;
