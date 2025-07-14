/* 🟢 1. ФУНКЦИИ-ОБРАБОТЧИКИ ВАЛИДАЦИИ И СОСТОЯНИЯ */

/* --- Проверяет валидность поля ввода и отображает сообщение об ошибке --- */
function checkInputValidity(formElement, inputElement, config) {
  const isPatternMismatch = inputElement.validity.patternMismatch;
  const customMessage = inputElement.dataset.errorMessage;
  if (isPatternMismatch && customMessage) {
    inputElement.setCustomValidity(customMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

/* --- Переключает состояние кнопки отправки в зависимости от валидности формы --- */
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

/* --- Устанавливает обработчики событий для всех полей формы --- */
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); // инициализация состояния кнопки

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

/* 🟡 2. ГЛАВНЫЕ ЭКСПОРТИРУЕМЫЕ ФУНКЦИИ */

/* --- Включает валидацию на всех формах согласно переданной конфигурации --- */
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

/* --- Сбрасывает ошибки валидации и состояние кнопки у формы --- */
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

/* 🔴 3. МАЛЕНЬКИЕ ФУНКЦИИ-ПОМОЩНИКИ */

/* --- Показывает сообщение об ошибке для поля ввода --- */
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

/* --- Скрывает сообщение об ошибке для поля ввода --- */
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

/* --- Проверяет наличие невалидного поля среди списка --- */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
