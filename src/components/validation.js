
// Функция для валидации инпута
function validateInput(inputElement, errorElement, config) {
    const { minLength, maxLength, regex } = config;
    const currentLength = inputElement.value.length;
    const customErrorMessage = inputElement.dataset.errorMessage || 'Ошибка валидации';
    
    const errorMessage = inputElement.validity.valueMissing
      ? 'Вы пропустили это поле'
      : currentLength < minLength
      ? `Минимальное количество символов: ${minLength}. Длина текста сейчас: ${currentLength} символ${currentLength === 1 ? '' : 'а'}.`
      : inputElement.validity.tooLong
      ? `Максимальная длина: ${maxLength}`
      : !regex.test(inputElement.value)
      ? customErrorMessage
      : '';
  
    errorElement.textContent = errorMessage;
    return !errorMessage;
  }
  
  // Функция для управления состоянием кнопки
  function toggleButtonState(isFormValid, buttonElement) {
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle('button_disabled', !isFormValid);
  }
  
  // Функция для очистки ошибок валидации
  export function clearValidation(formElement, config) {
    const inputs = formElement.querySelectorAll(config.inputSelector);
    const buttons = formElement.querySelectorAll(config.submitButtonSelector);
  
    inputs.forEach(input => {
      const errorElement = formElement.querySelector(`#${input.id}-error`);
      errorElement.textContent = '';
    });
  
    buttons.forEach(button => toggleButtonState(false, button));
  }
  
  // Функция для включения валидации
  export function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
  
    forms.forEach(form => {
      form.addEventListener('input', (event) => {
        const input = event.target;
        const errorElement = form.querySelector(`#${input.id}-error`);
        const isInputValid = validateInput(input, errorElement, config);
        const isFormValid = Array.from(form.elements).every(element => element.validity.valid);
  
        toggleButtonState(isFormValid, form.querySelector(config.submitButtonSelector));
      });
  
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    });
  }
  