import { site } from "../data/content";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Fasilitas & Paket", href: "#paket" },
  { label: "Galeri", href: "#galeri" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

// Instagram icon
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

// Facebook icon
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// WhatsApp icon
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Decorative batik SVG ornament
const BatikOrnament = () => (
  <svg
    width="200"
    height="32"
    viewBox="0 0 200 32"
    fill="none"
    aria-hidden="true"
    style={{ opacity: 0.15 }}
  >
    <path
      d="M0 16 Q10 4 20 16 Q30 28 40 16 Q50 4 60 16 Q70 28 80 16 Q90 4 100 16 Q110 28 120 16 Q130 4 140 16 Q150 28 160 16 Q170 4 180 16 Q190 28 200 16"
      stroke="#d4ac68"
      strokeWidth="1.5"
      fill="none"
    />
    {[20, 60, 100, 140, 180].map((x) => (
      <rect
        key={x}
        x={x - 3}
        y={13}
        width={6}
        height={6}
        fill="#d4ac68"
        transform={`rotate(45 ${x} 16)`}
      />
    ))}
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          {/* Brand column */}
          <div className="footer__brand">
            <span className="footer__logo">{site.name}</span>
            <span className="footer__logo-sub">{site.tagline}</span>
            <p className="footer__brand-desc">
              {/* GANTI: deskripsi singkat untuk footer */}
              Gedung serbaguna premium dengan sentuhan tradisi Madura untuk setiap momen berharga Anda.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {/* GANTI: URL sosial media ada di content.js */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Gedung Ratu Ibu"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(212,172,104,0.3)",
                  color: "rgba(245,237,224,0.7)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Gedung Ratu Ibu"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(212,172,104,0.3)",
                  color: "rgba(245,237,224,0.7)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Gedung Ratu Ibu"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(212,172,104,0.3)",
                  color: "rgba(245,237,224,0.7)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <WAIcon />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="footer__nav-group">
            <h4>Navigasi</h4>
            <nav className="footer__nav-links" aria-label="Menu footer">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="footer__nav-group">
            <h4>Hubungi Kami</h4>
            {/* GANTI: info kontak ada di content.js → objek site */}
            <div className="footer__contact-info">
              <span className="footer__contact-item">
                <span>{site.address}</span>
              </span>
              <span className="footer__contact-item">
                <span>{site.phoneDisplay}</span>
              </span>
              <span className="footer__contact-item">
                <span>{site.email}</span>
              </span>
              <span className="footer__contact-item">
                <span>{site.operationalHours}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Batik ornament divider */}
        <div style={{ display: "flex", justifyContent: "center", margin: "0 0 4px" }}>
          <BatikOrnament />
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>
            {/* GANTI: alamat singkat untuk copyright */}
            {site.address}
          </span>
          <span>
            &copy; {year} <strong>{site.name}</strong>. Seluruh hak cipta dilindungi.
          </span>
          <div className="footer__bottom-links">
            <a href="#beranda">Kembali ke Atas ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
