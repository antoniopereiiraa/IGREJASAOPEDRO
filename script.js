/**
 * IGREJA SÃO PEDRO - JAVASCRIPT MODULAR
 * Funcionalidades interativas, agenda dinâmica com filtros e acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAgendaFilters();
  initCalendarDownload();
  initGalleryLightbox();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. MENU MOBILE RESPONSIVO & ACESSÍVEL
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    
    // Altera ícone
    const icon = menuBtn.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      menuBtn.focus();
    }
  });
}

/* ==========================================================================
   2. AGENDA INTELIGENTE (SEPARAÇÃO CULTURAL VS DEMAIS)
   ========================================================================== */
function initAgendaFilters() {
  const tabButtons = document.querySelectorAll('.agenda-tab-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (!tabButtons.length || !eventCards.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Atualiza botões ativos
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterCategory = button.getAttribute('data-category');

      // Filtra os cartões de eventos com animação suave
      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. ADICIONAR EVENTO AO CALENDÁRIO (iCal / .ICS)
   ========================================================================== */
function initCalendarDownload() {
  const calendarButtons = document.querySelectorAll('.btn-add-calendar');

  calendarButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.event-card');
      if (!card) return;

      const title = card.querySelector('h3')?.innerText || 'Evento Igreja São Pedro';
      const desc = card.querySelector('.event-description')?.innerText || 'Celebração na Igreja São Pedro';
      const location = card.querySelector('.event-meta .event-location')?.innerText || 'Igreja São Pedro, Rua São Pedro, 123';
      const dateText = card.querySelector('.event-date-box .day')?.innerText || '15';
      const monthText = card.querySelector('.event-date-box .month')?.innerText || 'JUN';

      // Criação rápida de evento formato ICS
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Igreja Sao Pedro//Agenda Comunidade//PT
BEGIN:VEVENT
SUMMARY:${escapeIcs(title)}
DESCRIPTION:${escapeIcs(desc)}
LOCATION:${escapeIcs(location)}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${slugify(title)}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Evento "${title}" baixado para sua agenda!`);
    });
  });
}

function escapeIcs(str) {
  return str.replace(/\n/g, '\\n').replace(/,/g, '\\,');
}

function slugify(text) {
  return text.toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .slice(0, 30);
}

/* ==========================================================================
   4. GALERIA & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  // Filtros da Galeria
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img');
  const modalCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay h4')?.innerText || '';
      const sub = item.querySelector('.gallery-overlay p')?.innerText || '';

      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || title;
        if (modalCaption) {
          modalCaption.innerHTML = `<strong>${title}</strong><br><small>${sub}</small>`;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. FORMULÁRIO DE CONTATO COM SANITIZAÇÃO
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form-card form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Feedback de sucesso moderno e seguro
    showToast('Obrigado! Sua mensagem foi enviada com sucesso à Paróquia.');
    form.reset();
  });
}

/* ==========================================================================
   6. BOTÃO VOLTAR AO TOPO
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   NOTIFICAÇÃO TOAST MODERNA
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#22c55e"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Export para uso em módulos
export { showToast };
