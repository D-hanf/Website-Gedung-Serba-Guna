# Website Gedung Rato Ebhu (React + Vite)

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Untuk build produksi (menghasilkan folder `dist/` siap deploy ke hosting statis mana pun — Netlify, Vercel, cPanel, dsb):

```bash
npm run build
```

## Struktur folder

```
src/
  data/content.js      <- SEMUA teks, harga, foto, kontak dikumpulkan di sini
  components/          <- satu komponen per section
  App.jsx               <- merangkai semua section
  index.css             <- design tokens & styling (warna, font, layout)
```

## Cara mengisi konten yang belum ada

Buka **`src/data/content.js`**. Setiap baris yang masih placeholder ditandai komentar `// GANTI: ...`. Cukup ganti nilainya (teks, angka, URL foto, dsb) — tidak perlu menyentuh file komponen React sama sekali.

Urutan yang disarankan untuk dilengkapi bertahap:
1. `site` — nomor WhatsApp, alamat, jam operasional, email, link maps & sosial media
2. `hero` — tagline utama
3. `about` — profil & sejarah gedung
4. `packages` — harga & fasilitas tiap paket
5. `gallery` — ganti URL `placehold.co` dengan foto asli (taruh file foto di folder `public/` lalu isi `src: "/nama-file.jpg"`)
6. `testimonials` — testimoni pelanggan asli

## Palet & tipografi (untuk referensi desain)

- Maroon batik `#6E2A28` — aksen utama & tombol
- Emas antik `#A9812E` — border, ornamen
- Krem parchment `#F2E8D3` — latar belakang
- Hijau sawah `#4B5E4A` — aksen sekunder
- Font judul: **Fraunces** (serif) — Font isi: **Work Sans** (sans-serif)

## Tahap selanjutnya

Project ini masih murni frontend statis (tanpa backend). Beberapa pengembangan yang bisa ditambahkan setelah konten lengkap:
- Sistem cek ketersediaan tanggal (kalender booking)
- Form kontak yang terhubung ke email/database, bukan hanya WhatsApp
- Panel admin untuk klien mengelola galeri & paket sendiri
