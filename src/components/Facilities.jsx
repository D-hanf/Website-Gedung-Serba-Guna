import { useEffect, useRef } from "react";
import { site, packages } from "../data/content";
import SectionDivider from "./SectionDivider";

// WhatsApp Icon
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Ikon-ikon metadata paket
const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function Facilities() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="paket" className="section" ref={sectionRef} aria-labelledby="paket-heading">
        <div className="container">
          {/* Section header */}
          <div className="section-intro">
            <div className="section-accent-bar reveal">
              <div className="section-accent-bar__line" />
              <span className="section-accent-bar__label">Fasilitas & Paket</span>
            </div>
            <h2 id="paket-heading" className="section-heading reveal reveal-delay-1">
              Paket yang menyesuaikan jenis acara Anda
            </h2>
            <p className="section-subtext reveal reveal-delay-2">
              Setiap paket dirancang untuk memberikan kenyamanan maksimal.
              Hubungi kami untuk konsultasi paket yang paling sesuai dengan kebutuhan Anda.
            </p>
          </div>

          {/* Package cards grid */}
          {/* GANTI: data paket ini ada di src/data/content.js → array packages */}
          <div className="packages__grid">
            {packages.map((pkg, i) => (
              <article
                key={pkg.id}
                className={`package-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                aria-labelledby={`pkg-title-${pkg.id}`}
              >
                <div className="package-card__header">
                  {/* Icon */}
                  <div className="package-card__icon" aria-hidden="true">
                    {pkg.icon}
                  </div>

                  {/* Title */}
                  <h3 id={`pkg-title-${pkg.id}`} className="package-card__title">
                    {pkg.title}
                  </h3>

                  {/* Capacity & duration meta */}
                  <div className="package-card__meta">
                    <span className="package-card__meta-item">
                      <UsersIcon />
                      {pkg.capacity}
                    </span>
                    <span className="package-card__meta-item">
                      <ClockIcon />
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                <div className="package-card__body">
                  {/* Price */}
                  {/* GANTI: harga ada di content.js */}
                  <p className="package-card__price">{pkg.price}</p>
                  <p className="package-card__price-note">{pkg.priceNote}</p>

                  <div className="package-card__divider" role="separator" />

                  {/* Facility list */}
                  {/* GANTI: fasilitas ada di content.js */}
                  <ul className="package-card__facilities" aria-label={`Fasilitas ${pkg.title}`}>
                    {pkg.facilities.map((f) => (
                      <li key={f} className="package-card__facility">
                        <span className="package-card__facility-check" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="package-card__footer">
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                      `Halo, saya tertarik dengan ${pkg.title} di ${site.name}.\nMohon informasi lebih lanjut.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn ${pkg.featured ? "btn-primary" : "btn-outline"} package-card__cta`}
                  >
                    <WAIcon />
                    Tanya Paket Ini
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom note */}
          <p
            className="reveal"
            style={{
              textAlign: "center",
              marginTop: 40,
              fontSize: "0.9rem",
              color: "var(--color-ink-muted)",
            }}
          >
            Semua paket dapat dikustomisasi sesuai kebutuhan.{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--color-maroon)", fontWeight: 600 }}
            >
              Konsultasikan via WhatsApp →
            </a>
          </p>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
