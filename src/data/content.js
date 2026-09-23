// =====================================================================
// PUSAT DATA KONTEN — GEDUNG RATO EBHU
// =====================================================================
// Cara penggunaan:
// • Semua teks, nomor, URL yang bertanda // GANTI: perlu diisi klien.
// • Cukup ubah nilai di sini, komponen React akan menggunakannya otomatis.
// • Jangan hapus komentar // GANTI: agar mudah ditemukan saat review konten.
// =====================================================================

export const site = {
  name: "Gedung Rato Ebhu",
  tagline: "Gedung Serbaguna Premium Madura",
  whatsappNumber: "6281234567890", // GANTI: nomor WhatsApp aktif bisnis (format 62xxxxxxxxxx, tanpa + atau spasi)
  phoneDisplay: "+62 812-3456-7890", // GANTI: nomor telepon untuk ditampilkan
  email: "info@ratoebhu.com", // GANTI: email aktif
  address: "Jl. Contoh Raya No. 1, Bangkalan, Madura, Jawa Timur 69117", // GANTI: alamat lengkap gedung
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8343789146056!2d112.74597097504478!3d-7.028744992973068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd80588e4f24467%3A0xc97368d0bad5a5!2sGedung%20Serba%20Guna%20Rato%20Ebuh!5e0!3m2!1sen!2sus!4v1790123131495!5m2!1sen!2sus", // GANTI: URL embed Google Maps — buka Google Maps → cari lokasi → Share → Embed a map → salin URL src
  operationalHours: "Setiap hari, 08.00 – 21.00 WIB", // GANTI: jam operasional
  instagram: "https://instagram.com/ratoebhu", // GANTI: URL akun Instagram
  facebook: "https://facebook.com/ratoebhu", // GANTI: URL akun Facebook
};

export const hero = {
  badge: "Gedung Serbaguna di Jantung Madura", // GANTI: teks badge atas hero
  headline: "Rumah bagi setiap\nperayaan berharga", // Baris baru pakai \n
  headlineHighlight: "perayaan berharga", // kata yang dicetak miring merah
  subheadline:
    "Dari akad nikah hingga wisuda dan seminar profesional — Gedung Rato Ebhu menghadirkan ruang lapang bernuansa tradisional yang siap menampung momen terpenting hidup Anda.", // GANTI: tagline resmi dari klien
  stats: [
    { value: "500+", label: "Acara Sukses" }, // GANTI: angka asli
    { value: "500", label: "Kapasitas Tamu" }, // GANTI
    { value: "10+", label: "Tahun Pengalaman" }, // GANTI: hitung dari tahun berdiri
  ],
  frameCaption: "Momen Berharga,\nRuang yang Istimewa", // teks di dalam frame hero
};

export const about = {
  heading: "Tentang Rato Ebhu",
  paragraphs: [
    // GANTI: ganti seluruh paragraf ini dengan profil & sejarah asli dari klien
    "Berdiri sejak [GANTI: tahun], Gedung Rato Ebhu lahir dari tekad untuk menghadirkan ruang perayaan yang menghormati akar budaya Madura — bukan sekadar tempat, melainkan panggung bagi momen-momen yang akan dikenang selamanya.",
    "Nama Rato Ebhu sendiri berasal dari bahasa Madura yang bermakna [GANTI: arti nama / filosofi yang ingin disampaikan klien]. Nilai budaya ini tercermin dalam setiap detail arsitektur dan layanan yang kami berikan.",
    "Kami percaya bahwa setiap acara — sekecil rapat keluarga atau sebesar resepsi pernikahan ratusan tamu — pantas mendapat ruang yang tertata rapi, nyaman, aman, dan berkesan bagi semua yang hadir.",
  ],
  highlights: [
    { icon: "👥", label: "Kapasitas Maksimal", value: "500 Tamu" }, // GANTI: kapasitas nyata
    { icon: "📅", label: "Berpengalaman Sejak", value: "20XX" }, // GANTI: tahun berdiri
    { icon: "🚗", label: "Area Parkir", value: "Luas & Aman" }, // GANTI: deskripsi parkir
    { icon: "📍", label: "Lokasi", value: "Strategis" }, // GANTI: keunggulan lokasi
  ],
  // GANTI: jika ada foto interior dan eksterior, masukkan URL-nya di sini untuk section About
  photoMain: null, // contoh: "/images/interior.jpg"
  photoAccent: null, // contoh: "/images/fasad.jpg"
  yearFounded: "20XX", // GANTI: tahun berdiri untuk badge
};

export const packages = [
  // GANTI: seluruh data paket ini dengan harga, fasilitas, dan durasi asli dari klien
  {
    id: "pernikahan",
    icon: "💍",
    title: "Paket Pernikahan",
    featured: true, // set true untuk tampilkan badge "Terpopuler"
    capacity: "Hingga 500 tamu",
    duration: "1 hari penuh",
    durationNote: "08.00 – 22.00 WIB",
    price: "Rp 25.000.000",
    priceNote: "Mulai dari / belum termasuk catering",
    facilities: [
      "Ruang utama ber-AC seluas 1.200 m²",
      "Panggung & dekorasi dasar pernikahan",
      "Sound system profesional & MC",
      "Kursi tamu 500 unit & meja prasmanan",
      "Area parkir luas (±200 kendaraan)",
      "Ruang rias pengantin",
      "Genset cadangan tersedia",
    ],
    // GANTI: nomor WhatsApp & pesan tanya paket bisa dikustomisasi per paket
  },
  {
    id: "wisuda",
    icon: "🎓",
    title: "Paket Wisuda & Akademik",
    featured: false,
    capacity: "Hingga 300 tamu",
    duration: "Setengah hari",
    durationNote: "4 jam fleksibel",
    price: "Rp 12.000.000",
    priceNote: "Mulai dari / per sesi",
    facilities: [
      "Ruang utama ber-AC",
      "Panggung wisuda & backdrop formal",
      "Sound system & mic wireless",
      "Kursi tamu 300 unit",
      "Proyektor & layar besar",
      "Dokumentasi foto (opsional)",
    ],
  },
  {
    id: "rapat",
    icon: "🤝",
    title: "Paket Rapat & Seminar",
    featured: false,
    capacity: "Hingga 150 peserta",
    duration: "Per 4 jam",
    durationNote: "Bisa diperpanjang",
    price: "Rp 5.000.000",
    priceNote: "Mulai dari / per sesi",
    facilities: [
      "Ruang meeting ber-AC",
      "Proyektor & layar & whiteboard",
      "Sound system & mic conference",
      "Meja & kursi meeting/seminar",
      "Akses WiFi",
      "Coffee break tersedia (opsional)",
    ],
  },
];

export const gallery = [
  // GANTI: ganti seluruh array ini dengan foto asli gedung begitu tersedia dari klien
  // Format: { src: "URL foto", alt: "Deskripsi foto untuk aksesibilitas", label: "Judul di hover" }
  {
    src: "https://placehold.co/1200x500/7b2d2d/f5ede0?text=Tampak+Depan+Gedung+Rato+Ebhu",
    alt: "Tampak depan Gedung Rato Ebhu",
    label: "Tampak Depan Gedung",
  },
  {
    src: "https://placehold.co/800x600/1e1510/f5ede0?text=Interior+Ruang+Utama",
    alt: "Interior ruang utama Gedung Rato Ebhu",
    label: "Ruang Utama",
  },
  {
    src: "https://placehold.co/800x600/b8922e/1e1510?text=Dekorasi+Pernikahan",
    alt: "Dekorasi acara pernikahan di Gedung Rato Ebhu",
    label: "Dekorasi Pernikahan",
  },
  {
    src: "https://placehold.co/800x600/3d5c4a/f5ede0?text=Panggung+Wisuda",
    alt: "Panggung acara wisuda",
    label: "Panggung Wisuda",
  },
  {
    src: "https://placehold.co/800x600/5c2020/f0dba0?text=Suasana+Resepsi+Malam",
    alt: "Suasana resepsi malam hari",
    label: "Resepsi Malam",
  },
  {
    src: "https://placehold.co/1200x500/1e1510/d4ac68?text=Area+Parkir+Luas+%26+Aman",
    alt: "Area parkir gedung yang luas dan aman",
    label: "Area Parkir",
  },
  {
    src: "https://placehold.co/800x600/7b2d2d/f5ede0?text=Ruang+Rapat+%26+Seminar",
    alt: "Ruang rapat dan seminar",
    label: "Ruang Rapat",
  },
  {
    src: "https://placehold.co/800x600/b8922e/f5ede0?text=Lobi+%26+Resepsi",
    alt: "Lobi dan area resepsi tamu",
    label: "Lobi & Resepsi",
  },
];

export const testimonials = [
  // GANTI: ganti seluruh testimoni dengan testimoni asli pelanggan (minta izin penggunaan nama)
  {
    name: "Ibu Siti Aminah",
    event: "Resepsi Pernikahan, Oktober 2024",
    rating: 5,
    quote:
      "Acara pernikahan anak kami berjalan sangat lancar. Ruangannya luas, bersih, dan pelayanan pihak gedung sangat responsif. Tamu undangan kami semua puas!",
  },
  {
    name: "Bapak Hendra Wijaya",
    event: "Wisuda Universitas, Juli 2024",
    rating: 5,
    quote:
      "Fasilitas panggung dan sound system sudah sangat memadai. Panitia kami tidak perlu repot-repot membawa peralatan tambahan. Sangat recommended untuk acara wisuda!",
  },
  {
    name: "Dinas Pendidikan Bangkalan",
    event: "Rapat Koordinasi, Maret 2024",
    rating: 5,
    quote:
      "Ruangannya nyaman dan sejuk untuk rapat setengah hari. Lokasi strategis dan mudah dijangkau dari berbagai penjuru kota. Pasti akan kami gunakan kembali.",
  },
  {
    name: "Komunitas Pengusaha Muda Madura",
    event: "Seminar & Networking, Februari 2024",
    rating: 5,
    quote:
      "Gedung yang sangat representatif untuk acara-acara profesional. Proyektor dan koneksi yang tersedia membuat seminar kami berjalan sangat profesional.",
  },
];

export const contactFormFields = {
  eventTypes: [
    "Pernikahan",
    "Wisuda & Akademik",
    "Rapat & Seminar",
    "Ulang Tahun / Pesta",
    "Acara Lainnya",
  ], // GANTI: sesuaikan jenis acara yang tersedia
};
