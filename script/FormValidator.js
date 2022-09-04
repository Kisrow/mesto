export class FormValidator {
  constructor(validationObject, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationObject.inputSelector;
    this._submitButtonSelector = validationObject.submitButtonSelector;
    this._inactiveButtonClass = validationObject.inactiveButtonClass;
    this._inputErrorClass = validationObject.inputErrorClass;
    this._errorClass = validationObject.errorClass;
  }

  //функция показывающая ошибку
  _showInputError = (inputElement, errorMessage) => {
    const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  }

  //функция сокрытия ошибки
  _hideInputError = (inputElement) => {
    const inputError = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = '';
  }

  //функция валидации формы
  _toggleInputError = (inputElement) => {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

 //функция добавляющая обработчики всем формам
  enableValidation = () => {
  this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListener();
 }

  //функция добавляющая обработчики всем полям формы
  _setEventListener = () => {
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //функция управляющая активностью кнопки отправки формы
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled',true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  //функция проверяющая валидность всех полей, настройка кнопки
  _hasInvalidInput = () => {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}
