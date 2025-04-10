
import { deleteCard, toggleLike } from './api.js';

export function createCard(cardInfo, userId, callbacks) {
  const { openImagePopup, removeCard, handleLike } = callbacks;

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  cardImage.addEventListener('click', () => openImagePopup(cardInfo.link, cardInfo.name));
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardInfo.name;

  // Удаление и лайк
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardInfo.owner._id === userId) {
    deleteButton.addEventListener('click', () => removeCard(cardElement, cardInfo._id));
  } else {
    deleteButton.remove(); 
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = cardInfo.likes.length || 0; 

  likeButton.addEventListener('click', () => {
      const isLiked = likeButton.classList.toggle('card__like-button_active');
      handleLike(likeButton, likeCount, isLiked, cardInfo._id);
  });

  return cardElement;
}

export function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error(err);
    });
}

export function handleLike(likeButton, likeCount, isLiked, cardId) {
  toggleLike(cardId, isLiked)
    .then(data => {
      likeCount.textContent = data.likes.length;
      likeButton.classList.toggle('card__like-button_active', isLiked);
    })
    .catch(err => {
      console.error(err);
    });
}



