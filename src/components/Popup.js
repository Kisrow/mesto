export default class Popup {

  constructor(popupSelector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__exit');
    this._overlay = this._popup.querySelector('.popup__overlay');
  }

  open() {
    this._popup.classList.add('popup_on');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_on');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._overlay.addEventListener('click', () => this.close());
  }
}
