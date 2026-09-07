// ---------- Navbar: cambia de estilo al hacer scroll ----------
const navbar = document.getElementById('navbar');

function updateNavbar(){
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

// ---------- Cierra el scroll suave al hacer clic en los links del nav ----------
document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ---------- Marca las secciones para animar al entrar en pantalla ----------
const sectionsToReveal = document.querySelectorAll(
  '.feature-copy, .feature-media, .bleed-caption, .reach-copy, .reach-media, ' +
  '.dark-band h2, .dark-media, .dark-caption, .color-copy, .color-showcase img, ' +
  '.box-grid figure, .cta-final h2'
);

sectionsToReveal.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

sectionsToReveal.forEach(el => observer.observe(el));

// ---------- Pausa el video del hero si el usuario prefiere menos movimiento ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVideo = document.querySelector('.hero-video');
if (prefersReducedMotion && heroVideo) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}

// ---------- Botón para activar/desactivar el sonido del video ----------
const soundToggle = document.getElementById('soundToggle');
const soundLabel = soundToggle.querySelector('.sound-label');

soundToggle.addEventListener('click', () => {
  const willUnmute = heroVideo.muted;
  heroVideo.muted = !willUnmute;
  if (willUnmute) {
    heroVideo.play();
  }
  soundToggle.setAttribute('aria-pressed', String(willUnmute));
  soundLabel.textContent = willUnmute ? 'Silenciar' : 'Activar sonido';
});
