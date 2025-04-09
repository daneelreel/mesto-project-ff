
import './pages/index.css';
import { createCard, removeCard, handleLike } from './components/card';
import { openPopup, closePopup, closePopupOnOverlayClick } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, getCards, updateProfile, addCard, updateAvatar } from './components/api.js';


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

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  minLength: 2,
  maxLength: 40,
  regex: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
});

// Сбрасываем ошибки при открытии попапа
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
  });
  openPopup(editProfilePopup);
});

editProfileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));
closePopupOnOverlayClick(editProfilePopup);

const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');

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
  newCardForm.reset();
  clearValidation(newCardForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
  });
});

addCardButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
  });
  openPopup(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => closePopup(newCardPopup));
closePopupOnOverlayClick(newCardPopup);



//Получение информации о пользователе

const token = 'f5953821-765c-46ef-84fb-8e85d777588f';
const cohortId = 'wff-cohort-35';

Promise.all([getUserInfo(cohortId, token), getCards(cohortId, token)])
  .then(([userData, cards]) => {
    const userId = userData._id; // сохраняем id текущего пользователя
    
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    // Отображаем карточки
    cards.forEach(cardInfo => {
      const card = createCard(
        cardInfo,
        userId,
        { openImagePopup, removeCard, handleLike }
      );
      cardsList.append(card);
    });
  })
  .catch(err => {
    console.error(err);
  });

  
  editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = editProfileForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
  
    updateProfile(nameInput.value, descriptionInput.value)
      .then(() => {
        closePopup(editProfilePopup);
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить'; 
      });
  });
  
  
  newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = newCardForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
  
    addCard(cardNameInput.value, cardLinkInput.value)
      .then(() => {
        closePopup(newCardPopup);
        newCardForm.reset();
        clearValidation(newCardForm, {
          inputSelector: '.popup__input',
          submitButtonSelector: '.popup__button',
        });
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить'; 
      });
  });
  

  
const editAvatarIcon = document.querySelector('.overlay');
const avatarEditPopup = document.querySelector('.popup_type_new-profile__picture');
const avatarForm = avatarEditPopup.querySelector('.popup__form');
const avatarInput = avatarEditPopup.querySelector('.popup__input_type_url_new-profile__picture');
const avatarCloseButton = avatarEditPopup.querySelector('.popup__close'); 

// Открытие попапа редактирования аватара
editAvatarIcon.addEventListener('click', () => {
  openPopup(avatarEditPopup);
  closePopupOnOverlayClick(avatarEditPopup); 
});

avatarCloseButton.addEventListener('click', () => {
  closePopup(avatarEditPopup);
});

// Обработка отправки формы обновления аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  updateAvatar(avatarInput.value)
    .then(() => {
      closePopup(avatarEditPopup);
      avatarForm.reset();
      clearValidation(avatarForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
      });
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'; 
    });
});


