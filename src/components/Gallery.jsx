import { useState, useCallback, useEffect, useRef } from "react";
import { gallery } from "../data/content";
import SectionDivider from "./SectionDivider";

// Zoom icon SVG
const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Nav arrow icons
const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
  <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const lightboxRef = useRef(null);

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

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
    },
    [activeIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus lightbox on open
  useEffect(() => {
    if (activeIndex !== null) {
      lightboxRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeIndex]);

  const openLightbox = (index) => setActiveIndex(index);

  const handleLightboxBackdropClick = (e) => {
    if (e.target === e.currentTarget) setActiveIndex(null);
  };

  const activeImg = activeIndex !== null ? gallery[activeIndex] : null;

  return (
    <>
      <section id="galeri" className="section section--alt" ref={sectionRef} aria-labelledby="galeri-heading">
        <div className="container">
          <div className="section-intro">
            <div className="section-accent-bar reveal">
              <div className="section-accent-bar__line" />
              <span className="section-accent-bar__label">Galeri</span>
            </div>
            <h2 id="galeri-heading" className="section-heading reveal reveal-delay-1">
              Suasana & Momen di Gedung Ratu Ibu
            </h2>
            <p className="section-subtext reveal reveal-delay-2">
              Klik foto untuk memperbesar. Geser keyboard ← → untuk navigasi.
            </p>
          </div>

          {/* Gallery grid */}
          {/* GANTI: foto-foto ini ada di src/data/content.js → array gallery */}
          <div className="gallery__grid reveal reveal-delay-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                className="gallery__item"
                onClick={() => openLightbox(i)}
                aria-label={`Perbesar foto: ${img.alt}`}
                type="button"
              >
                {/* GANTI: ganti src foto di sini atau di content.js */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery__item-overlay" aria-hidden="true">
                  <span className="gallery__item-label">{img.label}</span>
                </div>
                <span className="gallery__zoom-icon" aria-hidden="true">
                  <ZoomIcon />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImg && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri foto: ${activeImg.alt}`}
          onClick={handleLightboxBackdropClick}
          ref={lightboxRef}
          tabIndex={-1}
        >
          <div className="lightbox__inner">
            {/* Close button */}
            <button
              className="lightbox__close"
              onClick={() => setActiveIndex(null)}
              aria-label="Tutup galeri"
              type="button"
            >
              <CloseIcon />
            </button>

            {/* Prev */}
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length)}
              aria-label="Foto sebelumnya"
              type="button"
            >
              <ChevronLeft />
            </button>

            {/* Image */}
            <img
              key={activeIndex}
              src={activeImg.src}
              alt={activeImg.alt}
              className="lightbox__img"
            />

            {/* Next */}
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={() => setActiveIndex((i) => (i + 1) % gallery.length)}
              aria-label="Foto berikutnya"
              type="button"
            >
              <ChevronRight />
            </button>

            {/* Caption & counter */}
            <p className="lightbox__caption">
              {activeImg.label} &nbsp;·&nbsp; {activeIndex + 1} / {gallery.length}
            </p>
          </div>
        </div>
      )}

      <SectionDivider />
    </>
  );
}
