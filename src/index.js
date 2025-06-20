import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, handleDeleteCard, handleLikeClick } from './components/card.js';
import { openModal, closeModal, addEventListeners } from './components/modal.js';
import profileAvatar from './images/avatar.jpg';

const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const editProfileForm = editPopup.querySelector('form[name="edit-profile"]');
const nameInput = editPopup.querySelector('input[name="name"]');
const descriptionInput = editPopup.querySelector('input[name="description"]');
const newCardForm = newCardPopup.querySelector('form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = newCardForm.querySelector('input[name="link"]');

document.querySelector('.profile__image').style.backgroundImage = `url(${profileAvatar})`;

addEventListeners(editPopup);
addEventListeners(newCardPopup);
addEventListeners(imagePopup);

initialCards.forEach(card => {
  const newCard = createCard(card, handleDeleteCard, handleLikeClick, handleImageClick);
  placesList.append(newCard);
});

function handleImageClick(evt) {
  const imgSrc = evt.target.src;
  const imgAlt = evt.target.alt;
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imgSrc;
  popupImage.alt = imgAlt;
  popupCaption.textContent = imgAlt;

  openModal(imagePopup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(editPopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const newCard = createCard({ name, link }, handleDeleteCard, handleLikeClick, handleImageClick);

  placesList.prepend(newCard);
  closeModal(newCardPopup);
  newCardForm.reset();
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  descriptionInput.value = document.querySelector('.profile__description').textContent;
  openModal(editPopup);
});

addPlaceButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

editProfileForm.addEventListener('submit', handleFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);
