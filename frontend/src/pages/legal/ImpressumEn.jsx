import { CONTACT } from "../../config/site";
import { PROVIDER, PHONE_DISPLAY } from "./provider";

// Impressum in English. The name "Impressum" is kept: it is the German legal
// term (§ 5 DDG) that users in Germany look for.
function ImpressumEn() {
  return (
    <>
      <h1 className="legal__title">Impressum</h1>
      <p className="legal__meta">Information pursuant to §&nbsp;5 of the DDG (German Digital Services Act)</p>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Website provider</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.business}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Germany
        </address>
        <p className="legal__p">
          <strong>Phone:</strong>{" "}
          <a className="legal__link" href={`tel:${CONTACT.phone}`}>{PHONE_DISPLAY}</a>
          <br />
          <strong>Email:</strong>{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Tax information</h2>
        <p className="legal__p">
          <strong>Tax number (Steuernummer):</strong> {PROVIDER.taxNumber}
          <br />
          <strong>VAT identification number pursuant to §&nbsp;27a UStG:</strong> {PROVIDER.vatId}
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Responsible for content pursuant to §&nbsp;18 (2) MStV</h2>
        <address className="legal__address">
          {PROVIDER.name}<br />
          {PROVIDER.street}<br />
          {PROVIDER.city}<br />
          Germany
        </address>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Consumer dispute resolution</h2>
        <p className="legal__p">
          I am neither willing nor obliged to take part in dispute resolution proceedings
          before a consumer arbitration board (§&nbsp;36 VSBG). If you have a complaint, please
          write to me directly at{" "}
          <a className="legal__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{" "}
          and we will find a solution.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Liability for content</h2>
        <p className="legal__p">
          I create the content of this website with the greatest care. As a service provider,
          I am responsible for my own content under general law (§&nbsp;7 (1) DDG). Pursuant to
          §§&nbsp;8 to 10 DDG, I am not obliged to monitor third-party information that is
          transmitted or stored, or to investigate circumstances that indicate illegal
          activity. Obligations to remove or block the use of information under general law
          remain unaffected. Liability in this respect is only possible from the moment I
          become aware of a specific infringement. As soon as I become aware of an
          infringement, I will remove the content concerned immediately.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Liability for links</h2>
        <p className="legal__p">
          This website contains links to external third-party websites (for example WhatsApp,
          Telegram, Signal or my clients' websites), over whose content I have no influence.
          I therefore cannot accept any liability for this external content. The respective
          provider or operator is always responsible for the content of linked pages. The
          linked pages were checked for possible legal violations at the time of linking, and
          no illegal content was apparent. Permanent monitoring of linked pages is not
          reasonable without concrete indications of an infringement. As soon as I become
          aware of an infringement, I will remove such links immediately.
        </p>
      </section>

      <hr className="legal__divider" />

      <section className="legal__section">
        <h2 className="legal__h2">Copyright</h2>
        <p className="legal__p">
          The texts, designs, images and videos I created for this website are subject to
          German copyright law. Reproduction, editing, distribution or any kind of use beyond
          the limits of copyright law requires my prior written consent. Downloads and copies
          of this website are permitted for private, non-commercial use only.
        </p>
        <p className="legal__p">
          Testimonial videos and project images are published with the permission of the
          respective clients, who retain their rights. Where content was not created by me,
          the rights of third parties are respected. Should you nevertheless notice a possible
          copyright infringement, please let me know; as soon as I become aware of it, I will
          remove the content concerned immediately.
        </p>
      </section>
    </>
  );
}

export default ImpressumEn;
