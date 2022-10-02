// возвращает заполненную рабочую карточку
export default class Card {
  constructor(cardDate, templateSelector, userDataId, { handleCardClick, handleTrashClick, toggleLike }) {
    this._counter = cardDate.likes.length;
    this._cardDate = cardDate;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
    // this._putLike = putLike;
    // this._deleteLike = deleteLike;
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
    this._element.querySelector('.feed__element-pharagraph').textContent = this._cardDate.name;
    this._counterElement.textContent = this._counter;
    this._cardPhoto.src = this._cardDate.link;
    this._cardPhoto.alt = this._cardDate.name;
    //отрисовка черных лайков при отрисовке карточек с сервера
    if (this.checkIsLiked(this._cardDate)) {
        this._likeButton.classList.add('feed__element-like_active');
    }

    //мусорка а значит и возможность удаления, только на карточках созданных пользователем
    if (this._cardDate.owner._id !== this._userDataId) {
      this._trashButton.remove();
    }

    return this._element;
  }

  //метод для проверки состояния текущей карточки, возвращает true или false
  checkIsLiked(date) {
    return date.likes.some(item => {
      return (item._id === this._userDataId)
    })
  }

  //метод для устанавки нового значения каунтера, а также в зависимости от результата вызова метода _checkIsLiked
  //либо устанавка, либо удалениеь класса закрашивания лайка
  _changeCounterValueAndStatusLikeElement(isLiked, likes) {
    if (isLiked) {
      this._likeButton.classList.add('feed__element-like_active');
    } else {
      this._likeButton.classList.remove('feed__element-like_active');
    }
    this._counterElement.textContent = likes.length;

  }

  //публичный метод для установки нового массива лайков и вызов метода _changeCounterValueAndStatusLikeElement после обновления массива
  like(newCardsDate, status) {
    this._cardDate = newCardsDate;
    this._likes = newCardsDate.likes;
    this._changeCounterValueAndStatusLikeElement(status, this._likes);
  }

  //ставит слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._cardDate);
    });
    this._trashButton = this._element.querySelector('.feed__element-trash');
    this._trashButton.addEventListener('click', () => {
      this._handleTrashClick(this._cardDate._id, this._element);
    });
    this._cardPhoto = this._element.querySelector('.feed__element-photo');
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardDate.name, this._cardDate.link);
    })
  }

  //ставит или убирает лайк на фото при нажатии на сердце
  // _like() {
  //   this._likeButton.classList.toggle('feed__element-like_active');
  //   if (this._element.querySelector('.feed__element-like_active')) {
  //     this._putLike(this._cardDate._id, this._element.querySelector('.feed__element-counter'))
  //   } else {
  //     this._deleteLike(this._cardDate._id, this._element.querySelector('.feed__element-counter'))
  //   }

  // }

  //удаляет карточку при нажатие на мусорку
  _removeCard() {
    this._element.remove();
    this._element = null; //remove удаляет только разметку из html, объект карточки остается в памяти приложения и потребляет ресурсы - зануляем
  }

}
