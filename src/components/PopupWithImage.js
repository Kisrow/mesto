import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._name = this._popup.querySelector('.popup__paragraph_type_viewer');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(data) {
    this._name.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }
}
