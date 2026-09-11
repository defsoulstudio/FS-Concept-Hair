/* ==========================================================================
   FS CONCEPT HAIR | Barbearia Premium — Motor de Animações & Interações
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SCROLL REVEAL COM INTERSECTION OBSERVER ──
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Anima TODOS os contadores dentro do bloco revelado
          const counters = entry.target.querySelectorAll('.count-up');
          counters.forEach(counter => {
            if (!counter.dataset.animated) {
              animateCounter(counter);
            }
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ── 2. CONTADOR ANIMADO ──
  function animateCounter(el) {
    el.dataset.animated = "true";
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === "true";
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * target;

      if (isDecimal) {
        el.textContent = prefix + currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(currentVal).toLocaleString('pt-BR') + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (isDecimal) {
          el.textContent = prefix + target.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + target.toLocaleString('pt-BR') + suffix;
        }
      }
    }

    requestAnimationFrame(updateCount);
  }

  // ── 3. EFEITO RIPPLE AO CLICAR ──
  const rippleElements = document.querySelectorAll('.btn, .filter-btn, .service-card, .faq-question, .info-card');
  rippleElements.forEach(el => {
    el.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ── 4. HEADER COM BLUR AO ROLAR ──
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ── 5. MENU MOBILE ──
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── 6. FAQ ACCORDION ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ── 7. FILTRO DE SERVIÇOS ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (filterBtns.length > 0 && serviceCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        serviceCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            card.classList.add('is-visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
