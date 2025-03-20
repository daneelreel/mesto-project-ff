// @todo: Темплейт карточки

import './pages/index.css';
import { createCard, removeCard, handleLike } from './components/card';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal';

const cardsList = document.querySelector('.places__list');
const pictureAvatar = new URL('./images/avatar.jpg', import.meta.url);
const cardOne = new URL('./images/card_1.jpg', import.meta.url);
const cardTwo = new URL('./images/card_2.jpg', import.meta.url);
const cardThree = new URL('./images/card_3.jpg', import.meta.url)

const whoIsTheGoat = [
  { name: 'Picture Avatar', link: pictureAvatar },
  { name: 'Card One', link: cardOne },
  { name: 'Card Two', link: cardTwo },
  { name: 'Card Three', link: cardThree },
];

// Информация карточек
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
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

editProfileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));
closePopupOnOverlayClick(editProfilePopup);

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
});

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