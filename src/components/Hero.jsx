import { useEffect, useRef } from "react";
import { site, hero } from "../data/content";

// WhatsApp Icon
const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Render headline dengan highlight pada kata tertentu
function HighlightHeadline({ text, highlight }) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text.replace(/\n/g, "\n").split("\n").map((line, i, arr) => (
      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ))}</>;
  }
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => {
        const lines = part.replace(/\\n/g, "\n").split("\n");
        return (
          <span key={i}>
            {lines.map((line, j, arr) => (
              <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
            ))}
            {i < parts.length - 1 && <em>{highlight}</em>}
          </span>
        );
      })}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  // Scroll reveal untuk elemen hero
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Halo, saya ingin bertanya soal sewa ${site.name}.`
  )}`;

  return (
    <section id="beranda" className="hero" ref={sectionRef} aria-labelledby="hero-headline">
      {/* Background decorative elements */}
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__pattern" aria-hidden="true" />

      <div className="hero__inner">
        <div className="container">
          <div className="hero__grid">
            {/* Content */}
            <div className="hero__content">
              <div className="hero__badge reveal">
                <span className="hero__badge-dot" aria-hidden="true" />
                {hero.badge}
              </div>

              <h1
                id="hero-headline"
                className="hero__headline reveal reveal-delay-1"
              >
                <HighlightHeadline
                  text={hero.headline}
                  highlight={hero.headlineHighlight}
                />
              </h1>

              <p className="hero__sub reveal reveal-delay-2">
                {hero.subheadline}
              </p>

              <div className="hero__cta-row reveal reveal-delay-3">
                <a href="#paket" className="btn btn-primary">
                  Lihat Paket & Fasilitas
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <WAIcon />
                  Hubungi via WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="hero__stats reveal reveal-delay-4">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="hero__stat-value">{stat.value}</span>
                    <span className="hero__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Frame */}
            {/* GANTI: ganti .hero__frame dengan <img> foto gedung asli saat tersedia.
                Contoh:
                <div className="hero__frame-wrapper">
                  <img
                    src="/images/gedung-tampak-depan.jpg"
                    alt="Tampak depan Gedung Ratu Ibu"
                    className="hero__frame"
                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 4 }}
                    loading="eager"
                  />
                </div>
            */}
            <div className="hero__frame-wrapper reveal reveal-delay-2">
              {/* Floating ornament cards */}
              <div className="hero__ornament-card hero__ornament-card--1" aria-hidden="true">
                <span className="hero__ornament-card__value">5/5</span>
                <span className="hero__ornament-card__label">Rating Pelanggan</span>
              </div>
              <div className="hero__ornament-card hero__ornament-card--2" aria-hidden="true">
                <span className="hero__ornament-card__value">500+</span>
                <span className="hero__ornament-card__label">Acara Sukses</span>
              </div>

              {/* Main decorative frame */}
              <div
                className="hero__frame"
                role="img"
                aria-label="Ilustrasi Gedung Ratu Ibu — foto asli akan ditampilkan di sini"
              >
                <div className="hero__frame-texture" aria-hidden="true" />
                {/* Batik ornament SVG */}
                <svg
                  style={{
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: 0.2,
                  }}
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M60 10 L70 30 L90 30 L75 45 L80 65 L60 52 L40 65 L45 45 L30 30 L50 30 Z" fill="#d4ac68" />
                  <circle cx="60" cy="60" r="28" stroke="#d4ac68" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                  <path d="M60 32 L60 88 M32 60 L88 60" stroke="#d4ac68" strokeWidth="0.5" />
                  <path d="M41 41 L79 79 M79 41 L41 79" stroke="#d4ac68" strokeWidth="0.5" />
                </svg>
                <div className="hero__frame-caption">
                  <strong>{site.name}</strong>
                  {hero.frameCaption.split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>{line}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
