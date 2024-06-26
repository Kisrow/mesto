import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__forms');
    this._popupButtonDescription = this._popup.querySelector('.popup__button');
    this._inputFormList = Array.from(this._form.querySelectorAll('.popup__input'));
  }


  //собирает в объект новую введенную информацию инпутах попапа
  _getInputValues() {
    const inputFormValues = {};
    this._inputFormList.forEach(inputElement => {
      inputFormValues[inputElement.name] = inputElement.value;
    });
    return inputFormValues;
  }

  //закрывает попап и очищает форму
  close() {
    super.close();
    this._form.reset();
  }

  //публичный метод ставит слушатели родителя(закрытие на крест) + выполнения функции подданной на колбэк при сабмите
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  //публичный метод меняет надпись на кнопке во время загрузки
  renderLoading(isLoading, previousValue) {
    if (isLoading) {
      this._popupButtonDescription.textContent = 'Сохранение...';
    } else {
      this._popupButtonDescription.textContent = previousValue;
    }
  }
}
