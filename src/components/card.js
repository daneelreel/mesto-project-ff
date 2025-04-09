
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
  const token = 'f5953821-765c-46ef-84fb-8e85d777588f';
  const cohortId = 'wff-cohort-35';
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
  .then(res => {
    if (res.ok) {
      cardElement.remove();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .catch(err => {
    console.error(err);
  });
}


export function handleLike(likeButton, likeCount, isLiked, cardId) {
  const token = 'f5953821-765c-46ef-84fb-8e85d777588f';
  const cohortId = 'wff-cohort-35';
  const method = isLiked ? 'PUT' : 'DELETE';

  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then(data => {
    likeCount.textContent = data.likes.length;
  })
  .catch(err => {
    console.error(err);
  });
}

