/* ==========================================================================
   FS CONCEPT HAIR | Barbearia Premium — Scripts Interativos & Robustos
   - Acordeão do FAQ 100% funcional (com alternância direta e animação suave)
   - Menu Mobile responsivo
   - Contadores numéricos
   - Filtros de serviços
   - Header com blur ao rolar
   ========================================================================== */

// ── FUNÇÃO GLOBAL DO FAQ (FUNCIONA 100% VIA ONCLICK OU LISTENER) ──
function toggleFaq(element) {
  const item = element.closest('.faq-item');
  if (!item) return;

  const isActive = item.classList.contains('active');
  
  // Fecha todos os outros itens para manter limpo
  document.querySelectorAll('.faq-item').forEach(other => {
    other.classList.remove('active');
  });

  // Alterna o item clicado
  if (!isActive) {
    item.classList.add('active');
  }
}

// ── FUNÇÃO GLOBAL DO MENU MOBILE ──
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  if (mobileNav) {
    mobileNav.classList.toggle('active');
    const isOpen = mobileNav.classList.contains('active');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', isOpen);
    }
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menuToggle');
  if (mobileNav) {
    mobileNav.classList.remove('active');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', false);
    }
  }
}

// ── FUNÇÃO GLOBAL DE FILTRO DE SERVIÇOS ──
function filterServicesCategory(btnElement, category) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  document.querySelectorAll('.service-card').forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
      card.classList.add('is-visible');
    } else {
      card.style.display = 'none';
    }
  });
}

// ── INICIALIZAÇÃO SEGURA (COMPATÍVEL COM QUALQUER AMBIENTE) ──
function initBarbershopApp() {

  // 1. Header com Blur ao Rolar
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Fechar Menu Mobile ao clicar em links
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // 3. Scroll Reveal e Contadores com IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && window.innerWidth > 768) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Anima contadores se existirem
          entry.target.querySelectorAll('.count-up').forEach(c => {
            if (!c.dataset.animated) animateCounter(c);
          });
          
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // No celular ou se não houver suporte, deixa tudo visível imediatamente
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Anima contadores de imediato caso já estejam visíveis
  document.querySelectorAll('.count-up').forEach(c => {
    if (!c.dataset.animated) animateCounter(c);
  });

  // 4. Função de Contador Numérico
  function animateCounter(el) {
    el.dataset.animated = "true";
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === "true";
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;

      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString('pt-BR') + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = isDecimal ? prefix + target.toFixed(1) + suffix : prefix + target.toLocaleString('pt-BR') + suffix;
      }
    }
    requestAnimationFrame(update);
  }
}

// Executa assim que o script carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBarbershopApp);
} else {
  initBarbershopApp();
}
