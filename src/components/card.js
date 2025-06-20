const cardTemplate = document.querySelector('#card-template').content;

export function handleDeleteCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
}

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function createCard(cardData, handleDelete, handleLike, handleClick) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', handleClick);

  return cardElement;
}
