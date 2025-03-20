// @todo: Темплейт карточки

import './pages/index.css';
import { createCard, removeCard, handleLike } from './components/card';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal';

const cardsList = document.querySelector('.places__list');
const initialCards = [ 
  { 
    name: "Архыз", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", 
  }, 
  { 
    name: "Челябинская область", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", 
  }, 
  { 
    name: "Иваново", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", 
  }, 
  { 
    name: "Камчатка", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", 
  }, 
  { 
    name: "Холмогорский район", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", 
  }, 
  { 
    name: "Байкал", 
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", 
  } 
]; 

// Загружаем карточки
for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(
    initialCards[i], 
    { openImagePopup: openImagePopup, removeCard: removeCard, handleLike: handleLike } 
  ); 
  cardsList.append(card); 
} 

// Попап с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
closePopupOnOverlayClick(imagePopup);

function openImagePopup(link, caption) {
  imagePopupImage.src = link;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;
  openPopup(imagePopup);
}

// Попап с редактированием профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
  nameInput.placeholder = profileName.textContent;
  descriptionInput.placeholder = profileDescription.textContent;
  nameInput.value = '';
  descriptionInput.value = '';
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (nameInput.value.trim()) profileName.textContent = nameInput.value;
  if (descriptionInput.value.trim()) profileDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});

editProfileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));
closePopupOnOverlayClick(editProfilePopup);

// Попап для добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');

addCardButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => closePopup(newCardPopup));
closePopupOnOverlayClick(newCardPopup);

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardTitle = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = createCard(
    { name: cardTitle, link: cardLink },
    { openImagePopup, removeCard, handleLike }
  );
  cardsList.prepend(newCard);
  closePopup(newCardPopup);
});