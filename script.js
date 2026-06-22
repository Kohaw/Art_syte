// ===== БУРГЕР =====
const burger = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = burger.querySelector('i');
  icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.querySelector('i').className = 'fas fa-bars';
  });
});

// ===== FAQ АККОРДЕОН =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// ===== МОДАЛЬНОЕ ОКНО =====
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

// Открытие модалки
function openModal() {
  formState.style.display = 'block';
  successState.style.display = 'none';
  bookingForm.reset();
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');
  nameError.classList.remove('visible');
  phoneError.classList.remove('visible');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Закрытие модалки
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Вешаем обработчик на все кнопки с классом open-modal
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

// Закрытие по крестику
closeBtn.addEventListener('click', closeModal);

// Закрытие по клику на фон
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Кнопка "Вернуться" (успех)
backBtn.addEventListener('click', closeModal);

// ===== ВАЛИДАЦИЯ =====
function validateName(value) {
  return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value.trim());
}

function validatePhone(value) {
  const digits = value.replace(/[\s\-()+]/g, '');
  return /^\d+$/.test(digits) && digits.length >= 5;
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  const name = nameInput.value;
  if (!validateName(name)) {
    nameInput.classList.add('error');
    nameError.classList.add('visible');
    isValid = false;
  } else {
    nameInput.classList.remove('error');
    nameError.classList.remove('visible');
  }

  const phone = phoneInput.value;
  if (!validatePhone(phone)) {
    phoneInput.classList.add('error');
    phoneError.classList.add('visible');
    isValid = false;
  } else {
    phoneInput.classList.remove('error');
    phoneError.classList.remove('visible');
  }

  if (isValid) {
    formState.style.display = 'none';
    successState.style.display = 'block';
  }
});
