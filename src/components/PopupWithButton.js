import Popup from './Popup.js';

export default class PopupWithButton extends Popup {
  constructor (popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__forms');
    this._handleFormSubmit = handleFormSubmit;
    this._putSubmit = this._putSubmit.bind(this);
  }

  transferCardinfo(cardID, cardElement) {
    this._cardID = cardID;
    this._cardElement = cardElement;
  }

  _putSubmit() {
    this._handleFormSubmit(this._cardID, this._cardElement);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._putSubmit();
    })
  }
}
