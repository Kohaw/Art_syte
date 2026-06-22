// ===== ВСЕ СКРИПТЫ (бургер, аккордеон, модалка, валидация) =====
document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. БУРГЕР-МЕНЮ =====
  const burger = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (burger && navMenu) {
    burger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      const icon = burger.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    document.querySelectorAll('nav a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        const icon = burger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ===== 2. АККОРДЕОН FAQ =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        faqItems.forEach(function(other) {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    }
  });

  // ===== 3. МОДАЛЬНОЕ ОКНО =====
  const modalOverlay = document.getElementById('modalOverlay');
  const formState = document.getElementById('formState');
  const successState = document.getElementById('successState');
  const closeBtn = document.getElementById('modalClose');
  const backBtn = document.getElementById('backButton');
  const bookingForm = document.getElementById('bookingForm');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  // Функция открытия
  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    // Сбрасываем форму к состоянию 1
    if (formState) formState.style.display = 'block';
    if (successState) successState.style.display = 'none';
    if (bookingForm) bookingForm.reset();
    if (nameInput) nameInput.classList.remove('error');
    if (phoneInput) phoneInput.classList.remove('error');
    if (nameError) nameError.classList.remove('visible');
    if (phoneError) phoneError.classList.remove('visible');
  }

  // Функция закрытия
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Навешиваем обработчики на кнопки с классом open-modal
  document.querySelectorAll('.open-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });

  // Закрытие по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Закрытие по клику на затемнённый фон
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Кнопка "Вернуться" на экране успеха
  if (backBtn) {
    backBtn.addEventListener('click', closeModal);
  }

  // ===== 4. ВАЛИДАЦИЯ ФОРМЫ =====
  function validateName(value) {
    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value.trim());
  }

  function validatePhone(value) {
    const digits = value.replace(/[\s\-()+]/g, '');
    return /^\d+$/.test(digits) && digits.length >= 5;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      const name = nameInput ? nameInput.value : '';
      if (!validateName(name)) {
        if (nameInput) nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        if (nameInput) nameInput.classList.remove('error');
        if (nameError) nameError.classList.remove('visible');
      }

      const phone = phoneInput ? phoneInput.value : '';
      if (!validatePhone(phone)) {
        if (phoneInput) phoneInput.classList.add('error');
        if (phoneError) phoneError.classList.add('visible');
        isValid = false;
      } else {
        if (phoneInput) phoneInput.classList.remove('error');
        if (phoneError) phoneError.classList.remove('visible');
      }

      if (isValid) {
        if (formState) formState.style.display = 'none';
        if (successState) successState.style.display = 'block';
      }
    });
  }

}); // конец DOMContentLoaded
