// Модальное окно
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

// Функция открытия модалки
function openModal() {
  // Сброс к форме
  formState.style.display = 'block';
  successState.style.display = 'none';
  // Очистка полей и ошибок
  bookingForm.reset();
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');
  nameError.classList.remove('visible');
  phoneError.classList.remove('visible');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // запрет скролла
}

// Функция закрытия модалки
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // восстановить скролл
}

// Обработчики для всех кнопок "Записаться на пробный урок"
document.querySelectorAll('.btn:not(.modal-btn)').forEach(btn => {
  if (btn.textContent.trim() === 'Записаться на пробный урок') {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
});

// Закрытие по крестику
closeBtn.addEventListener('click', closeModal);

// Закрытие по клику на фон (оверлей)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Кнопка "Вернуться" на экране успеха
backBtn.addEventListener('click', closeModal);

// Валидация формы
function validateName(value) {
  // Только буквы (русские и английские) и пробелы
  return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value.trim());
}

function validatePhone(value) {
  // Только цифры (разрешаем пробелы, дефисы, скобки, плюс – но проверяем, что есть цифры)
  const digits = value.replace(/[\s\-()+]/g, '');
  return /^\d+$/.test(digits) && digits.length >= 5; // минимум 5 цифр
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  // Проверка имени
  const name = nameInput.value;
  if (!validateName(name)) {
    nameInput.classList.add('error');
    nameError.classList.add('visible');
    isValid = false;
  } else {
    nameInput.classList.remove('error');
    nameError.classList.remove('visible');
  }

  // Проверка телефона
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
    // Показать экран успеха
    formState.style.display = 'none';
    successState.style.display = 'block';
  }
});
