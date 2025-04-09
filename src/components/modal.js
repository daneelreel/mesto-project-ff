
// Открытие попапа
  export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
  }
  
  // Закрытие
  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
  }
  
  // Закрытие клавишей ESC
  export function handleEscClose(evt) {
    if(evt.key === 'Escape') {
       closePopup(document.querySelector('.popup_opened'));
    }
 }
  
  // Закрытие кликом на оверлей
  export function closePopupOnOverlayClick(popup) {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  }
  