import { deleteCard, likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

/* 🟢 1. ОБРАБОТЧИКИ СОБЫТИЙ И ЛОГИКА ЛАЙКОВ */

/* --- Обрабатывает клик по лайку: ставит или снимает лайк с карточки --- */
export function handleLikeClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error('Ошибка при снятии лайка:', err));
  } else {
    likeCard(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error('Ошибка при добавлении лайка:', err));
  }
}

/* 🟡 2. ГЛАВНАЯ ЭКСПОРТИРУЕМАЯ ФУНКЦИЯ */

/* --- Создаёт DOM-элемент карточки на основе данных и переданных колбеков --- */
export function createCard(cardData, handleLike, handleClick, currentUserId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // Заполняем содержимое карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Если текущий пользователь уже лайкнул карточку — отмечаем лайк активным
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Кнопка удаления видна только владельцу карточки
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardData._id)
        .then(() => {
          cardElement.remove();
        })
        .catch(err => {
          console.error('Ошибка при удалении карточки:', err);
        });
    });
  }

  // Добавляем обработчики лайка и клика по изображению
  likeButton.addEventListener('click', () => {
    handleLike(cardData._id, likeButton, likeCount);
  });

  cardImage.addEventListener('click', handleClick);

  return cardElement;
}