

// Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose(popup));
  }
  
  // Закрытие
  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose(popup));
  }
  
  // Закрытие клавишей ESC
  export function handleEscClose(popup) {
    return (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    };
  }
  
  // Закрытие кликом на оверлей
  export function closePopupOnOverlayClick(popup) {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  }
  