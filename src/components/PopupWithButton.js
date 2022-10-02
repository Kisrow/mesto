import Popup from './Popup.js';

export default class PopupWithButton extends Popup {
  constructor (popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__forms');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(){
    super.open();
  }

  submitDel(action) {
    this._action = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._action();
    })
  }

}
