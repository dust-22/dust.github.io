(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function splitHeading() {
    const heading = document.querySelector('.heading-reveal');
    if (!heading) return;
    const words = heading.textContent.trim().split(' ');
    heading.innerHTML = words.map((word) => `<span class="reveal-word">${word}</span>`).join(' ');
  }

  function animateIntro() {
    if (prefersReduced.matches || typeof gsap === 'undefined') return;
    const tl = gsap.timeline();
    tl.set('.hero', { opacity: 1 });
    tl.from('.grain-overlay', { opacity: 0, duration: 0.8 }, 0);
    tl.from('.site-header', { y: -30, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);
    tl.from('.reveal-word', { yPercent: 120, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.2);
    tl.from('.hero .lead', { y: 24, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    tl.from('.cta-group .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.5');
    tl.from('.hero-card', { scale: 0.96, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }

  function sectionReveal() {
    if (prefersReduced.matches || typeof ScrollTrigger === 'undefined') return;
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll('.section-title, .card, .project-card, .trust-card, .stat, .testimonial-card, .final-card'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        y: 24,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.12,
      });
    });
  }

  function parallaxMedia() {
    if (prefersReduced.matches || typeof ScrollTrigger === 'undefined') return;
    const media = document.querySelectorAll('.parallax, .parallax-img');
    media.forEach((item) => {
      const depth = parseFloat(item.dataset.depth || '0.04');
      gsap.to(item, {
        yPercent: depth * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          scrub: true,
        },
      });
    });
  }

  function countUp() {
    if (prefersReduced.matches || typeof ScrollTrigger === 'undefined') return;
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const target = Number(counter.dataset.value || 0);
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.6,
          ease: 'power1.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          onUpdate() {
            counter.textContent = Math.floor(counter.innerText);
          },
        }
      );
    });
  }

  function underlineDraw() {
    if (prefersReduced.matches || typeof ScrollTrigger === 'undefined') return;
    document.querySelectorAll('.heading-underline').forEach((heading) => {
      const line = heading.querySelector('.underline-line');
      if (!line) {
        const span = document.createElement('span');
        span.className = 'underline-line';
        heading.appendChild(span);
      }
      gsap.fromTo(
        heading.querySelector('.underline-line'),
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
          },
        }
      );
    });
  }

  function heroParallax() {
    if (prefersReduced.matches || typeof gsap === 'undefined') return;
    gsap.to('.hero', {
      backgroundPosition: '50% 60%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    sectionReveal();
    parallaxMedia();
    countUp();
    underlineDraw();
    heroParallax();
  }

  function initAnimations() {
    splitHeading();
    animateIntro();
    initScrollAnimations();
  }

  document.addEventListener('DOMContentLoaded', initAnimations);

  window.Anim = {
    initAnimations,
    initScrollAnimations,
  };
})();
