import {openPopup, viewerPopup, viewerName, viewerImage} from "./index.js";
// возвращает заполненную рабочую карточку
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = templateSelector;
  }

  //возвращает разметку карточки
  _cloneCard() {
    const cloneTemplateCard = document
    .querySelector(this._selector)
    .content
    .querySelector('.feed__element')
    .cloneNode(true);

    return cloneTemplateCard;
  }

  //возращает заполненную карточку
  generateCard() {
    this._element = this._cloneCard();
    this._setEventListeners();

    this._element.querySelector('.feed__element-pharagraph').textContent = this._name;
    this._element.querySelector('.feed__element-photo').src = this._link;

    return this._element;
  }

  //ставит слушатели
  _setEventListeners() {
    this._element.querySelector('.feed__element-like').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.feed__element-trash').addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector('.feed__element-photo').addEventListener('click', () => {
      this._viewer();
    })
  }

  //ставит или убирает лайк на фото при нажатии на сердце
  _like() {
    this._element.querySelector('.feed__element-like').classList.toggle('feed__element-like_active');
  }

  //удаляет карточку при нажатие на мусорку
  _removeCard() {
    this._element.querySelector('.feed__element-trash').closest('.feed__element').remove();
  }

  //режим просмотра фото карточки
  _viewer() {
    openPopup(viewerPopup);
    viewerName.textContent = this._name;
    viewerImage.src = this._link;
    viewerImage.alt = this._name;
  }
}
