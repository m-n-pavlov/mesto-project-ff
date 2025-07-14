/* 🟢 1. ОБРАБОТЧИКИ СОБЫТИЙ */

/* --- Обрабатывает нажатие клавиши Escape для закрытия открытого модального окна --- */
const handleEscKeyDown = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

/* 🟡 2. ГЛАВНЫЕ ЭКСПОРТИРУЕМЫЕ ФУНКЦИИ */

/* --- Открывает модальное окно и добавляет слушатель для клавиши Escape --- */
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyDown);
};

/* --- Закрывает модальное окно и удаляет слушатель клавиши Escape --- */
export const closeModal= (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyDown);
};

/* --- Добавляет обработчики клика для кнопки закрытия и области вне содержимого модального окна --- */
export const addEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.popup__close');
  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
  });
  popupElement.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(popupElement);
    }
  });
}
