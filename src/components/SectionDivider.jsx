// Komponen dekoratif pemisah antar-section
// Menggunakan motif belah ketupat khas ukiran gapura Madura

const DiamondIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    {/* Belah ketupat luar */}
    <path
      d="M12 2 L22 12 L12 22 L2 12 Z"
      stroke="var(--color-gold-soft)"
      strokeWidth="1"
      fill="none"
    />
    {/* Belah ketupat dalam */}
    <path
      d="M12 6 L18 12 L12 18 L6 12 Z"
      fill="var(--color-gold-soft)"
      opacity="0.4"
    />
    {/* Titik tengah */}
    <circle cx="12" cy="12" r="1.5" fill="var(--color-gold)" />
  </svg>
);

export default function SectionDivider() {
  return (
    <div
      className="ornament-divider"
      role="separator"
      aria-hidden="true"
    >
      <div className="ornament-divider__icon">
        <DiamondIcon />
      </div>
    </div>
  );
}
