// возвращает заполненную рабочую карточку
export default class Card {
  constructor(cardData, templateSelector, userDataId, { handleCardClick, handleTrashClick, toggleLike }) {
    this._counter = cardData.likes.length;
    this._cardData = cardData;
    this._likes = cardData.likes;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._toggleLike = toggleLike;
    this._userDataId = userDataId;
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
    this._likeButton = this._element.querySelector('.feed__element-like');
    this._counterElement = this._element.querySelector('.feed__element-counter');
    this._setEventListeners();
    this._element.querySelector('.feed__element-pharagraph').textContent = this._cardData.name;
    this._cardPhoto.src = this._cardData.link;
    this._cardPhoto.alt = this._cardData.name;
    //отрисовка черных лайков при отрисовке карточек с сервера
    this._changeCounterValueAndStatusLikeElement();

    //мусорка а значит и возможность удаления, только на карточках созданных пользователем
    if (this._cardData.owner._id !== this._userDataId) {
      this._trashButton.remove();
    }

    return this._element;
  }

  //публичный метод для установки нового массива лайков и вызов метода _changeCounterValueAndStatusLikeElement после обновления массива
  like(newCardsDate) {
    this._likes = newCardsDate.likes;
    this._changeCounterValueAndStatusLikeElement();
  }

 //метод для проверки состояния текущей карточки, возвращает true или false
  checkIsLiked() {
    return this._likes.some(item => {
      return (item._id === this._userDataId)
    })
  }

 //метод для устанавки нового значения каунтера, а также в зависимости от результата вызова метода _checkIsLiked
  //либо устанавка, либо удалениеь класса закрашивания лайка
  _changeCounterValueAndStatusLikeElement() {
    if (this.checkIsLiked()) {
      this._likeButton.classList.add('feed__element-like_active');
    } else {
      this._likeButton.classList.remove('feed__element-like_active');
    }
    this._counterElement.textContent = this._likes.length;

  }

  //ставит слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._cardData);
    });
    this._trashButton = this._element.querySelector('.feed__element-trash');
    this._trashButton.addEventListener('click', () => {
      this._handleTrashClick(this._cardData._id, this._element);
    });
    this._cardPhoto = this._element.querySelector('.feed__element-photo');
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardData.name, this._cardData.link);
    })
  }

  //удаляет карточку при нажатие на мусорку
  _removeCard() {
    this._element.remove();
    this._element = null; //remove удаляет только разметку из html, объект карточки остается в памяти приложения и потребляет ресурсы - зануляем
  }
}
