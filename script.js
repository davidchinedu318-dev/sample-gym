/* Scroll-triggered reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.12 });

document.querySelectorAll('.program-card, .trainer-card, .pricing-card, .testimonial-card, section').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* Mobile nav toggle */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    /* close all */
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

    if (!isOpen) item.classList.add('open');
  });
});

/* ── CAROUSEL ── */
(function () {
  const TOTAL    = 8;
  const INTERVAL = 4500;

  const track    = document.getElementById('carousel-track');
  const slides   = Array.from(track.querySelectorAll('.carousel-slide'));
  const dotsWrap = document.getElementById('carousel-dots');
  const thumbsWrap = document.getElementById('carousel-thumbs');
  const fill     = document.getElementById('progress-fill');
  const idxEl    = document.getElementById('current-index');
  const idxEl2   = document.getElementById('current-index-2');
  const prevBtn  = document.getElementById('prev-btn');
  const nextBtn  = document.getElementById('next-btn');

  let current = 0;
  let timer   = null;

  const thumbSrcs = slides.map(s => s.querySelector('img').src);

  /* build dots */
  const dots = Array.from({ length: TOTAL }, (_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  /* build thumbs */
  const thumbs = thumbSrcs.map((src, i) => {
    const t = document.createElement('div');
    t.className = 'thumb' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src; img.alt = '';
    t.appendChild(img);
    t.addEventListener('click', () => goTo(i));
    thumbsWrap.appendChild(t);
    return t;
  });

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('active');
    thumbs[current].classList.remove('active');

    current = (idx + TOTAL) % TOTAL;
    track.style.transform = `translateX(-${current * 100}%)`;

    slides[current].classList.add('is-active');
    dots[current].classList.add('active');
    thumbs[current].classList.add('active');

    const label = String(current + 1).padStart(2, '0');
    if (idxEl) idxEl.textContent = label;
    if (idxEl2) idxEl2.textContent = label;

    resetProgress();
  }

  function resetProgress() {
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${INTERVAL}ms linear`;
      fill.style.width = '100%';
    }));
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }
  function stopAuto() {
    clearInterval(timer);
    fill.style.transition = 'none';
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  /* pause on hover */
  const galleryEl = document.getElementById('gallery');
  galleryEl.addEventListener('mouseenter', stopAuto);
  galleryEl.addEventListener('mouseleave', () => { resetProgress(); startAuto(); });

  /* touch swipe */
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  resetProgress();
  startAuto();
})();
const waBtn = document.getElementById("whatsapp-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    waBtn.classList.add("show");
  } else {
    waBtn.classList.remove("show");
  }
});