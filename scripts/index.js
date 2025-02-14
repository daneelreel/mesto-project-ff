// @todo: Темплейт карточки

const cardsList = document.querySelector('.places__list');

function addCard(cardInfo, removeCard) {

    // Клонируем содержимое карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // Работаем с картинкой
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardInfo.link; 
    cardImage.alt = cardInfo.name; 

    // Устанавливаем текст
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = cardInfo.name; 

    // Обработчик для удаления карточки
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
    removeCard(cardElement);
    });

    return cardElement;
}

// Функция для удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// Загрузка карточек на страницу
initialCards.forEach(function(cardInfo) {
    const card = addCard(cardInfo, removeCard);
    cardsList.append(card);
});



// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
