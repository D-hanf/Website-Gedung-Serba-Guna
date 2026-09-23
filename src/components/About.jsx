import { useEffect, useRef } from "react";
import { about } from "../data/content";
import SectionDivider from "./SectionDivider";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="tentang" className="section section--alt" ref={sectionRef} aria-labelledby="about-heading">
        <div className="container">
          <div className="about__grid">
            {/* Visual Block (hanya tampil di desktop via CSS) */}
            <div className="about__visual reveal">
              <div className="about__photo-stack">
                {/* GANTI: ganti div ini dengan <img> foto interior asli gedung */}
                <div className="about__photo-main" role="img" aria-label="Foto interior Gedung Rato Ebhu">
                  <svg
                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.15 }}
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="20" y="60" width="120" height="80" stroke="#d4ac68" strokeWidth="1.5" fill="none" />
                    <path d="M20 60 Q80 10 140 60" stroke="#d4ac68" strokeWidth="1.5" fill="none" />
                    <rect x="60" y="100" width="40" height="40" stroke="#d4ac68" strokeWidth="1" fill="none" />
                    <line x1="80" y1="60" x2="80" y2="10" stroke="#d4ac68" strokeWidth="1" />
                    <polygon points="80,2 84,12 80,10 76,12" fill="#d4ac68" />
                  </svg>
                  <div style={{
                    position: "absolute", bottom: 28, left: 28,
                    color: "rgba(240,219,160,0.8)",
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                  }}>
                    Foto Interior Gedung
                  </div>
                </div>

                {/* GANTI: ganti div ini dengan <img> foto eksterior/fasad */}
                <div className="about__photo-accent" role="img" aria-label="Foto eksterior Gedung Rato Ebhu">
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(30,21,16,0.6)",
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    textAlign: "center",
                    padding: "12px",
                  }}>
                    Foto Eksterior Gedung
                  </div>
                </div>

                {/* Badge tahun berdiri */}
                <div className="about__year-badge">
                  {/* GANTI: tahun berdiri */}
                  <span className="about__year-badge-num">{about.yearFounded}</span>
                  <span className="about__year-badge-lbl">Est.</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <div className="section-accent-bar reveal">
                <div className="section-accent-bar__line" />
                <span className="section-accent-bar__label">Tentang Kami</span>
              </div>

              <h2 id="about-heading" className="section-heading reveal reveal-delay-1">
                {about.heading}
              </h2>

              {/* GANTI: paragraf tentang profil & sejarah gedung */}
              <div className="about__copy reveal reveal-delay-2" style={{ marginTop: 24 }}>
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Highlight stats grid */}
              <ul className="about__highlights reveal reveal-delay-3">
                {about.highlights.map((h) => (
                  <li className="about__highlight-item" key={h.label}>
                    <span className="about__highlight-icon" aria-hidden="true">{h.icon}</span>
                    <span className="about__highlight-value">{h.value}</span>
                    <span className="about__highlight-label">{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
