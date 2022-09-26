import { data } from "autoprefixer";

// возвращает заполненную рабочую карточку
export default class Card {
  constructor(data, templateSelector, { handleCardClick, handleLikeClick }) {
    this._name = data.name;
    this._link = data.link;
    this._counter = data.likes.length;
    this._infoList = data;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector('.feed__element-counter').textContent = this._counter;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  //ставит слушатели
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.feed__element-like');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._infoList, this._counter);
      this._like();
    });
    this._trashButton = this._element.querySelector('.feed__element-trash');
    this._trashButton.addEventListener('click', () => {
      this._removeCard();
    });
    this._cardPhoto = this._element.querySelector('.feed__element-photo');
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  //ставит или убирает лайк на фото при нажатии на сердце
  _like() {
    this._likeButton.classList.toggle('feed__element-like_active');
    this._element.querySelector('.feed__element-counter').textContent = this._counter + 1; //можно попробовать, если есть такой класс до добавить, если нет, то удалить, как и с counter
  }

  //удаляет карточку при нажатие на мусорку
  _removeCard() {
    this._element.remove();
    this._element = null; //remove удаляет только разметку из html, объект карточки остается в памяти приложения и потребляет ресурсы - зануляем
  }

}
