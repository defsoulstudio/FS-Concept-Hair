/* ==========================================================================
   FS CONCEPT HAIR | Barbearia Premium — Scripts Interativos
   Menu Mobile, Header Scroll, Accordions, Filtros e Smooth Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. HEADER COM BLUR AO ROLAR ──
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ── 2. MENU MOBILE ──
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar ao clicar em qualquer link do menu mobile
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── 3. FAQ ACCORDION ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Fecha todos os outros accordions
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ── 4. FILTRO DE SERVIÇOS ──
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
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
