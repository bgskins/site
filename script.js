/**
 * BG Skins - Landing premium com dupla conversão para WhatsApp.
 * Antes de publicar, troque WHATSAPP_NUMBER pelo número oficial em formato internacional.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5534996915717';

  const intents = {
    buy: (item) => `Olá! Vim pelo site da BG Skins e quero comprar ${item || 'uma skin'}.`,
    sell: () => 'Olá! Vim pelo site da BG Skins e quero vender minhas skins.',
    catalog: () => 'Olá! Vim pelo site da BG Skins e quero ver mais skins disponíveis.',
    inventory: (link) => `Olá! Vim pelo site da BG Skins e quero avaliar meu inventário.${link ? ` Meu link é: ${link}` : ''}`
  };

  const buildWhatsAppUrl = (message) => {
    if (WHATSAPP_NUMBER.includes('SEUNUMERO')) {
      alert('Configure o número do WhatsApp no arquivo script.js antes de publicar o site.');
      return '#';
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Navbar scroll + mobile menu
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.fade-up, .adv-card, .skin-card, .step-card, .review-card, .stat-card');
  revealElements.forEach((el) => el.classList.add('fade-up'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Stats counter
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsSection = document.querySelector('.stats');
  let statsAnimated = false;

  const animateStats = () => {
    statNumbers.forEach((stat) => {
      const target = Number(stat.dataset.target);
      const duration = 1800;
      const start = performance.now();

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        stat.textContent = `${value.toLocaleString('pt-BR')}${target >= 20000 ? '+' : ''}`;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    });
  };

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }

  // Hero particles
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    for (let i = 0; i < 30; i += 1) {
      const dot = document.createElement('span');
      dot.style.position = 'absolute';
      dot.style.width = `${Math.random() * 4 + 1}px`;
      dot.style.height = dot.style.width;
      dot.style.borderRadius = '50%';
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      dot.style.background = Math.random() > 0.5 ? 'var(--neon-blue)' : 'var(--neon-purple)';
      dot.style.boxShadow = `0 0 10px ${dot.style.background}`;

      const moveX = (Math.random() - 0.5) * 200;
      const moveY = (Math.random() - 0.5) * 200;
      dot.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${moveX}px, ${moveY}px)` }
      ], {
        duration: Math.random() * 10000 + 10000,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out'
      });
      particlesContainer.appendChild(dot);
    }
  }

  // Sell counter
  const sellCounterSpan = document.getElementById('sell-counter');
  if (sellCounterSpan) {
    let current = 134;
    setInterval(() => {
      current += Math.random() > 0.45 ? 1 : -1;
      if (current < 100) current = 100;
      if (current > 180) current = 180;
      sellCounterSpan.textContent = current;
    }, 7000);
  }

  // Countdown timers
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  document.querySelectorAll('.trigger-countdown').forEach((el) => {
    let timeLeft = parseInt(el.dataset.time || '0', 10);
    const timer = el.querySelector('.timer');

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(interval);
        if (timer) timer.textContent = '00:00:00';
      } else if (timer) {
        timer.textContent = formatTime(timeLeft);
      }
    }, 1000);
  });

  // WhatsApp links
  document.querySelectorAll('.wa-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const intent = link.dataset.waIntent;
      const item = link.dataset.item;
      const messageFactory = intents[intent];
      if (!messageFactory) return;
      const url = buildWhatsAppUrl(messageFactory(item));
      if (url !== '#') window.open(url, '_blank');
    });
  });

  const evaluateInventoryBtn = document.getElementById('evaluateInventoryBtn');
  const tradeLinkInput = document.getElementById('trade-link-input');
  if (evaluateInventoryBtn) {
    evaluateInventoryBtn.addEventListener('click', () => {
      const tradeLink = tradeLinkInput?.value.trim() || '';
      const url = buildWhatsAppUrl(intents.inventory(tradeLink));
      if (url !== '#') window.open(url, '_blank');
    });
  }

  // Search + filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skinCards = document.querySelectorAll('.skins-grid .skin-card');
  const searchInput = document.querySelector('.search-input');
  let activeFilter = 'all';

  const applyFilters = () => {
    const query = (searchInput?.value || '').toLowerCase().trim();

    skinCards.forEach((card) => {
      const category = card.dataset.category || '';
      const title = card.querySelector('.skin-name')?.textContent.toLowerCase() || '';
      const weapon = card.querySelector('.skin-weapon')?.textContent.toLowerCase() || '';
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !query || title.includes(query) || weapon.includes(query);
      card.style.display = matchesFilter && matchesQuery ? 'flex' : 'none';
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((button) => button.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter || 'all';
      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilters);
});
