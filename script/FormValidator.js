export class FormValidator {
  constructor(objectValidation, formElement) {
    this._formElement = formElement;
    this._inputSelector = objectValidation.inputSelector;
    this._submitButtonSelector = objectValidation.submitButtonSelector;
    this._inactiveButtonClass = objectValidation.inactiveButtonClass;
    this._inputErrorClass = objectValidation.inputErrorClass;
    this._errorClass = objectValidation.errorClass;
  }

  //функция показывающая ошибку
  _showInputError = (inputElement, errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent = errorMessage;
    this._formElement.querySelector(`.${inputElement.id}-error`).classList.add(this._errorClass);
  }

  //функция сокрытия ошибки
  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).classList.remove(this._errorClass);
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent = '';
  }

  //функция валидации формы
  _isValid = (inputElement) => {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

 //функция добавляющая обработчики всем формам
  enableValidationFunction = () => {
  this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListener();
 }

  //функция добавляющая обработчики всем полям формы
  _setEventListener = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this.toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  //функция управляющая активностью кнопки отправки формы
  toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled',true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //функция проверяющая валидность всех полей, настройка кнопки
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}
