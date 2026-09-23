import { useState, useRef, useEffect } from "react";
import { site, contactFormFields } from "../data/content";

const initialForm = {
  name: "",
  phone: "",
  eventType: contactFormFields.eventTypes[0],
  eventDate: "",
  guestCount: "",
  message: "",
};

// Social media icons
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Info icons
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.59 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.5 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.29 6.29l1.61-1.61a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const contactInfoItems = [
  { icon: <MapPinIcon />, label: "Alamat", valueKey: "address" },
  { icon: <ClockIcon />, label: "Jam Operasional", valueKey: "operationalHours" },
  { icon: <PhoneIcon />, label: "Telepon / WhatsApp", valueKey: "phoneDisplay" },
  { icon: <MailIcon />, label: "Email", valueKey: "email" },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Format pesan WhatsApp
    const lines = [
      `Halo, saya ingin bertanya soal sewa *${site.name}*.`,
      ``,
      `*Data Pemesan:*`,
      `Nama: ${form.name}`,
      `No. WhatsApp: ${form.phone}`,
      `Jenis Acara: ${form.eventType}`,
      form.eventDate ? `Tanggal Acara: ${new Date(form.eventDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}` : null,
      form.guestCount ? `Perkiraan Tamu: ${form.guestCount} orang` : null,
      form.message ? `\nPesan Tambahan:\n${form.message}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    window.open(url, "_blank", "noreferrer");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="kontak" className="section section--alt" ref={sectionRef} aria-labelledby="kontak-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-intro">
          <div className="section-accent-bar reveal">
            <div className="section-accent-bar__line" />
            <span className="section-accent-bar__label">Kontak</span>
          </div>
          <h2 id="kontak-heading" className="section-heading reveal reveal-delay-1">
            Mari rencanakan acara Anda bersama kami
          </h2>
          <p className="section-subtext reveal reveal-delay-2">
            Isi formulir di bawah ini dan kami akan menghubungi Anda via WhatsApp,
            atau langsung hubungi kami melalui kontak yang tersedia.
          </p>
        </div>

        <div className="contact__grid">
          {/* Contact info & map */}
          <div className="reveal">
            <h3 className="contact__info-heading">Informasi Kontak</h3>

            {/* GANTI: data kontak ini ada di src/data/content.js → objek site */}
            <ul className="contact__info-list" aria-label="Informasi kontak gedung">
              {contactInfoItems.map((item) => (
                <li key={item.label} className="contact__info-item">
                  <div className="contact__info-icon">{item.icon}</div>
                  <div>
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{site[item.valueKey]}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Google Maps embed */}
            {/* GANTI: pastikan mapsEmbedUrl di content.js sudah diisi URL embed Maps yang benar */}
            <div className="contact__map" aria-label="Peta lokasi Gedung Ratu Ibu">
              {site.mapsEmbedUrl && site.mapsEmbedUrl.includes("pb=!") ? (
                <iframe
                  src={site.mapsEmbedUrl}
                  title="Lokasi Gedung Ratu Ibu di Google Maps"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "center" }}>
                  <span style={{ fontSize: "2rem" }}>📍</span>
                  <span>
                    Peta akan muncul setelah{" "}
                    <code style={{ fontSize: "0.8em", background: "rgba(0,0,0,0.08)", padding: "2px 6px", borderRadius: 2 }}>
                      mapsEmbedUrl
                    </code>{" "}
                    diisi di <em>content.js</em>
                  </span>
                </div>
              )}
            </div>

            {/* Social media links */}
            <div className="contact__social" aria-label="Media sosial">
              {/* GANTI: URL Instagram dan Facebook ada di content.js */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="contact__social-link"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="contact__social-link"
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </div>

          {/* Booking form */}
          <div className="reveal reveal-delay-2">
            <form className="contact__form" onSubmit={handleSubmit} noValidate aria-labelledby="form-heading">
              <h3 id="form-heading" className="contact__form-title">Formulir Pertanyaan / Booking</h3>
              <p className="contact__form-sub">
                Setelah submit, pesan akan terbuka otomatis di WhatsApp.
              </p>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Nama Lengkap *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Contoh: Budi Santoso"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">No. WhatsApp *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Contoh: 0812-xxxx-xxxx"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="eventType">Jenis Acara *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={form.eventType}
                    onChange={handleChange}
                  >
                    {/* GANTI: jenis acara ada di content.js → contactFormFields.eventTypes */}
                    {contactFormFields.eventTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="eventDate">Tanggal Acara</label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.eventDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="guestCount">Perkiraan Jumlah Tamu</label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min="1"
                  max="2000"
                  placeholder="Contoh: 200"
                  value={form.guestCount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field" style={{ marginBottom: 24 }}>
                <label htmlFor="message">Pesan / Pertanyaan</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Ceritakan kebutuhan acara Anda, atau tanyakan hal yang ingin diketahui..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact__form-submit"
              >
                <WAIcon />
                {submitted ? "Membuka WhatsApp..." : "Kirim via WhatsApp"}
              </button>

              {submitted && (
                <p
                  style={{
                    marginTop: 12,
                    fontSize: "0.85rem",
                    color: "var(--color-teal)",
                    textAlign: "center",
                  }}
                  role="status"
                  aria-live="polite"
                >
                  ✓ Pesan disiapkan — pastikan pop-up WhatsApp tidak diblokir browser.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
