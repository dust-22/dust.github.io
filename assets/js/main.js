(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenisInstance = null;

  function toggleNav() {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function closeNavOnBlur(event) {
    if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function initMenu() {
    if (!navToggle) return;
    navToggle.addEventListener('click', toggleNav);
    document.addEventListener('click', closeNavOnBlur);
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initLenis() {
    const shouldReduce = prefersReduced.matches || window.innerWidth < 640;
    if (shouldReduce) return;
    try {
      lenisInstance = new Lenis({
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.08,
        normalizeWheel: true,
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Lenis yüklenemedi', err);
    }
  }

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    return new Swiper('.testimonial-swiper', {
      loop: true,
      speed: 700,
      spaceBetween: 24,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }

  function initTiltEffects() {
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const cards = document.querySelectorAll('.tilt');
    if (!supportsHover || prefersReduced.matches) {
      cards.forEach((card) => card.classList.remove('tilt'));
      return;
    }

    cards.forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      };

      const reset = () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', reset);
      card.addEventListener('focus', reset);
      card.addEventListener('blur', reset);
    });
  }

  function init() {
    initMenu();
    initLenis();
    initSwiper();
    initTiltEffects();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.App = {
    init,
    initMenu,
    initLenis,
    initSwiper,
  };
})();
