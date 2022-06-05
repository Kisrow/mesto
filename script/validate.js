const enableValidation = {
  formSelector: '.popup__forms',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//функция показывающая ошибку
const showInputError = (formElement, inputElement, errorMessage, objectValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectValidation.errorClass);
};

//функция сокрытия ошибки
const hideInputError = (formElement, inputElement, objectValidation) => {
  inputElement.classList.remove(objectValidation.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(objectValidation.errorClass);
  errorElement.textContent = '';
}

//функция валидации формы
const isValid = (formElement, inputElement, objectValidation) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectValidation);
  } else {
    hideInputError(formElement, inputElement, objectValidation);
  }
};

//функция добавляющая обработчики всем полям формы
const setEventListener = (formElement, objectValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(objectValidation.inputSelector));
  const buttonElement = formElement.querySelector(objectValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, objectValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objectValidation);
      toggleButtonState(inputList, buttonElement, objectValidation);
    });
  });
};

//функция добавляющая обработчики всем формам
const enableValidationFunction = (objectValidation) => {
  const formList = Array.from(document.querySelectorAll(objectValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, objectValidation);
  });
};

//функция проверяющая валидность всех полей, настройка кнопки
const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция управляющая активностью кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, objectValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.classList.remove(objectValidation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//вызовем функцию которая добавит обработчики формам
enableValidationFunction(enableValidation);
