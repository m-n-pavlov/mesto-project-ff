const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function handleDeleteCard(evt) {
  const card = evt.target.closest('.places__item');
  card.remove();
}

function createCard(name, link, handleDelete) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', handleDelete);

  return cardElement;
}

initialCards.forEach(card => {
  const newCard = createCard(card.name, card.link, handleDeleteCard);
  placesList.append(newCard);
});