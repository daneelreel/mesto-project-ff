

// Функция создания карточки
export function createCard(cardInfo, callbacks) {
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
    deleteButton.addEventListener('click', () => removeCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => handleLike(likeButton));
  
    return cardElement;
  }
  
  export function removeCard(cardElement) {
    cardElement.remove();
  }
  
  export function handleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_active');
  }