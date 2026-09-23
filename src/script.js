/**
 * GEDUNG Ratu Ibu — Main JavaScript
 * Fitur: Navbar scroll, hamburger menu, scroll reveal,
 *        galeri filter + lightbox, testimoni carousel,
 *        form WhatsApp, back-to-top, active nav link.
 */

/* ============================================================
   CONFIG
   ============================================================ */
// GANTI: nomor WhatsApp default (tanpa tanda + dan spasi)
const WA_NUMBER = '6281234567890';

/* ============================================================
   UTILITY
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/**
 * Cek apakah elemen sedang terlihat di viewport
 */
function isInViewport(el, threshold = 0.15) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
}


/* ============================================================
   1. NAVBAR — Scroll & Hamburger
   ============================================================ */
(function initNavbar() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navMenu   = $('#nav-menu');
  const navLinks  = $$('.navbar__link');

  if (!navbar) return;

  // Scroll: toggle .scrolled class
  let lastScroll = 0;
  function handleNavbarScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  // Hamburger toggle (mobile)
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link based on scroll position
  const sections = $$('section[id], div[id]').filter(el => el.id);

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    let currentSection = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();


/* ============================================================
   2. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  function handleBackToTopVisibility() {
    if (window.scrollY > 400) {
      btn.hidden = false;
    } else {
      btn.hidden = true;
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  handleBackToTopVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   3. SCROLL REVEAL ANIMATIONS
   ============================================================ */
(function initScrollReveal() {
  // Add data-reveal attributes to sections
  const revealTargets = [
    { sel: '.section__header', attr: 'data-reveal' },
    { sel: '.tentang__image-wrap', attr: 'data-reveal', val: 'left' },
    { sel: '.tentang__content', attr: 'data-reveal', val: 'right' },
    { sel: '.paket__grid', attr: 'data-reveal-stagger' },
    { sel: '.galeri__grid', attr: 'data-reveal' },
    { sel: '.tentang__highlights', attr: 'data-reveal-stagger' },
    { sel: '.fasilitas__custom-note', attr: 'data-reveal' },
    { sel: '.kontak__info', attr: 'data-reveal', val: 'left' },
    { sel: '.kontak__form-wrap', attr: 'data-reveal', val: 'right' },
    { sel: '.carousel', attr: 'data-reveal' },
    { sel: '.hero__stats', attr: 'data-reveal' },
  ];

  revealTargets.forEach(({ sel, attr, val }) => {
    $$(sel).forEach(el => {
      el.setAttribute(attr, val || '');
    });
  });

  function checkReveal() {
    $$('[data-reveal], [data-reveal-stagger]').forEach(el => {
      if (isInViewport(el) && !el.classList.contains('revealed')) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  // Trigger on load (after short delay to let paint happen)
  setTimeout(checkReveal, 100);
})();


/* ============================================================
   4. GALERI — Filter + Lightbox
   ============================================================ */
(function initGallery() {
  const filterBtns = $$('.galeri__filter-btn');
  const galleryItems = $$('.galeri__item');
  const lightbox = $('#lightbox');
  const backdrop = $('#lightbox-backdrop');
  const lightboxImg = $('#lightbox-img');
  const lightboxCaption = $('#lightbox-caption');
  const closeBtn = $('#lightbox-close');
  const prevBtn = $('#lightbox-prev');
  const nextBtn = $('#lightbox-next');

  if (!filterBtns.length) return;

  // ---- FILTER ----
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter items
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.hidden = false;
          // Small animation
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = '';
          });
        } else {
          item.hidden = true;
        }
      });
    });
  });

  // ---- LIGHTBOX ----
  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return galleryItems.filter(item => !item.hidden);
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;

    currentIndex = index;
    const btn = visibleItems[currentIndex]?.querySelector('.galeri__btn');
    if (!btn) return;

    lightboxImg.src = btn.dataset.src || btn.querySelector('img')?.src || '';
    lightboxImg.alt = btn.querySelector('img')?.alt || '';
    lightboxCaption.textContent = btn.dataset.caption || '';

    lightbox.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.focus?.();

    // Update nav visibility
    prevBtn.style.display = visibleItems.length <= 1 ? 'none' : '';
    nextBtn.style.display = visibleItems.length <= 1 ? 'none' : '';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  function navigateLightbox(direction) {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    const btn = visibleItems[currentIndex]?.querySelector('.galeri__btn');
    if (!btn) return;

    // Fade transition
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = btn.dataset.src || btn.querySelector('img')?.src || '';
      lightboxImg.alt = btn.querySelector('img')?.alt || '';
      lightboxCaption.textContent = btn.dataset.caption || '';
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  lightboxImg.style.transition = 'opacity 0.15s ease';

  // Attach open events to gallery buttons
  galleryItems.forEach((item, i) => {
    const btn = item.querySelector('.galeri__btn');
    btn?.addEventListener('click', () => {
      const vis = getVisibleItems();
      const idx = vis.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  // Close on button / backdrop click
  closeBtn?.addEventListener('click', closeLightbox);
  backdrop?.addEventListener('click', closeLightbox);

  // Nav buttons
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    switch (e.key) {
      case 'Escape':    closeLightbox(); break;
      case 'ArrowLeft': navigateLightbox(-1); break;
      case 'ArrowRight':navigateLightbox(1); break;
    }
  });

  // Touch swipe support for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      navigateLightbox(deltaX < 0 ? 1 : -1);
    }
  }, { passive: true });
})();


/* ============================================================
   5. TESTIMONI CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track      = $('#carousel-track');
  const slides     = $$('.carousel__slide');
  const prevBtn    = $('#carousel-prev');
  const nextBtn    = $('#carousel-next');
  const dotsWrap   = $('#carousel-dots');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  let autoPlayTimer = null;
  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1} dari ${slides.length}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.dataset.index = i;
    dotsWrap?.appendChild(dot);
    dot.addEventListener('click', () => goTo(i));
  });

  function getDots() {
    return $$('.carousel__dot', dotsWrap);
  }

  function goTo(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    getDots().forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', String(i === currentSlide));
    });

    // Update aria-label on slides
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== currentSlide));
    });

    resetAutoPlay();
  }

  function next() { goTo(currentSlide + 1); }
  function prev() { goTo(currentSlide - 1); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Auto play
  function startAutoPlay() {
    autoPlayTimer = setInterval(next, AUTO_PLAY_INTERVAL);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // Pause on hover
  const carousel = track?.closest('.carousel');
  carousel?.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  carousel?.addEventListener('mouseleave', startAutoPlay);

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    clearInterval(autoPlayTimer);
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? next() : prev();
    }
    startAutoPlay();
  }, { passive: true });

  // Keyboard navigation when carousel is focused
  carousel?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Init first slide
  goTo(0);
  startAutoPlay();
})();


/* ============================================================
   6. KONTAK FORM — Kirim via WhatsApp
   ============================================================ */
(function initContactForm() {
  const form = $('#booking-form');
  if (!form) return;

  const submitBtn = $('#btn-submit');

  // Set minimum date to today
  const tanggalInput = $('#form-tanggal');
  if (tanggalInput) {
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    tanggalInput.min = `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Simple field validation
   */
  function validateField(field) {
    const value   = field.value.trim();
    const id      = field.id;
    const errorEl = $(`#error-${id.replace('form-', '')}`);

    let msg = '';

    if (field.required && !value) {
      msg = 'Field ini wajib diisi.';
    } else if (id === 'form-wa') {
      // Validate phone — must be at least 9 digits
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length < 9) {
        msg = 'Masukkan nomor WhatsApp yang valid (min. 9 angka).';
      }
    } else if (id === 'form-tanggal' && value) {
      const selected = new Date(value);
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        msg = 'Tanggal acara tidak boleh di masa lalu.';
      }
    }

    if (errorEl) errorEl.textContent = msg;
    field.classList.toggle('error', !!msg);
    return !msg;
  }

  // Validate on blur
  $$('.form__input, .form__select', form).forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  /**
   * Format date to Indonesian format
   */
  function formatDateID(dateStr) {
    if (!dateStr) return '-';
    const [y, m, d] = dateStr.split('-');
    const months = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10)]} ${y}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const fieldsToValidate = $$('.form__input, .form__select', form);
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Gather values
    const nama     = $('#form-nama').value.trim();
    const wa       = $('#form-wa').value.trim().replace(/\D/g, '');
    const acara    = $('#form-acara').value;
    const tanggal  = formatDateID($('#form-tanggal').value);
    const tamu     = $('#form-tamu').value.trim() || '-';
    const pesan    = $('#form-pesan').value.trim() || '-';

    // GANTI: sesuaikan template pesan WhatsApp jika diperlukan
    const message = [
      `*PEMESANAN / PERTANYAAN — Gedung Ratu Ibu*`,
      ``,
      `*Nama Lengkap:* ${nama}`,
      `*No. WhatsApp:* ${wa}`,
      `*Jenis Acara:* ${acara}`,
      `*Tanggal Acara:* ${tanggal}`,
      `*Perkiraan Tamu:* ${tamu} orang`,
      ``,
      `*Pesan / Keterangan:*`,
      pesan,
      ``,
      `---`,
      `_Pesan ini dikirim melalui website Gedung Ratu Ibu._`,
    ].join('\n');

    // Get WA number from button data attribute (customizable)
    const waNumber = submitBtn?.dataset.wa || WA_NUMBER;
    const encoded  = encodeURIComponent(message);
    const url      = `https://wa.me/${waNumber}?text=${encoded}`;

    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');

    // Optional: reset form after submission
    // form.reset();
  });
})();


/* ============================================================
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-height'),
          10
        ) || 72;

        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


/* ============================================================
   8. SET MIN DATE INPUT — Avoid iOS quirk
   ============================================================ */
(function fixDateInput() {
  const input = document.getElementById('form-tanggal');
  if (!input) return;
  const today = new Date().toISOString().split('T')[0];
  input.setAttribute('min', today);
})();


/* ============================================================
   9. LAZY LOADING POLYFILL (for older browsers)
   ============================================================ */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
})();


/* ============================================================
   10. CONSOLE WELCOME MESSAGE
   ============================================================ */
console.log(
  '%cGedung Ratu Ibu%c\n%cWebsite dikembangkan untuk keperluan presentasi klien.\nUntuk customisasi & pengembangan lanjutan, hubungi developer.',
  'font-size:18px; font-weight:bold; color:#D4AF37;',
  '',
  'font-size:12px; color:#8B4513;'
);
