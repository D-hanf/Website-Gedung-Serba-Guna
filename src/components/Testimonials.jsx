import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials } from "../data/content";
import SectionDivider from "./SectionDivider";

// Star icon
function Stars({ rating }) {
  return (
    <div className="testimonial-card__rating" aria-label={`Rating: ${rating} dari 5 bintang`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`testimonial-card__star${s > rating ? " testimonial-card__star--empty" : ""}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Get initials for avatar
function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Chevron icons
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  const total = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [next, isPaused]);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section id="testimoni" className="section" ref={sectionRef} aria-labelledby="testimoni-heading">
        <div className="container">
          <div className="section-intro">
            <div className="section-accent-bar reveal">
              <div className="section-accent-bar__line" />
              <span className="section-accent-bar__label">Testimoni</span>
            </div>
            <h2 id="testimoni-heading" className="section-heading reveal reveal-delay-1">
              Kata mereka yang sudah mempercayakan acara-nya kepada kami
            </h2>
          </div>

          {/* Carousel */}
          {/* GANTI: testimoni ini ada di src/data/content.js → array testimonials */}
          <div
            className="testimonials__carousel reveal reveal-delay-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="testimonials__track-wrapper">
              <div
                className="testimonials__track"
                style={{ transform: `translateX(-${current * 100}%)` }}
                aria-live="polite"
                aria-atomic="true"
              >
                {testimonials.map((t, i) => (
                  <article
                    key={t.name}
                    className="testimonial-card"
                    aria-label={`Testimoni dari ${t.name}`}
                    aria-hidden={i !== current}
                  >
                    {/* Quote column */}
                    <div>
                      <Stars rating={t.rating} />
                      <blockquote className="testimonial-card__quote">
                        {t.quote}
                      </blockquote>
                    </div>

                    {/* Author column */}
                    <div>
                      <div className="testimonial-card__meta">
                        {/* Avatar with initials */}
                        <div className="testimonial-card__avatar" aria-hidden="true">
                          {getInitials(t.name)}
                        </div>
                        <div>
                          <p className="testimonial-card__name">{t.name}</p>
                          {/* GANTI: jenis acara testimoni */}
                          <p className="testimonial-card__event">{t.event}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="testimonials__controls">
              <button
                className="testimonials__btn"
                onClick={prev}
                aria-label="Testimoni sebelumnya"
                type="button"
              >
                <ChevronLeft />
              </button>

              {/* Dots */}
              <div className="testimonials__dots" role="tablist" aria-label="Navigasi testimoni">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials__dot${i === current ? " testimonials__dot--active" : ""}`}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimoni ${i + 1}`}
                    type="button"
                  />
                ))}
              </div>

              <button
                className="testimonials__btn"
                onClick={next}
                aria-label="Testimoni berikutnya"
                type="button"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
