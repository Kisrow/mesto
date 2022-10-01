import './index.css';

import Card from '../components/Card';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithButton from '../components/PopupWithButton.js';

const objectForValidate = {
  formSelector: '.popup__forms', //контейнер с инпутами
  inputSelector: '.popup__input', //инпут
  submitButtonSelector: '.popup__button', //кнопка создать/сохранить
  inactiveButtonClass: 'popup__button_disabled',  //класс для деактивации кнопки
  inputErrorClass: 'popup__input_type_error', //красная граница инпута при ошибки
  errorClass: 'popup__input-error_visible' //показывает ошибку
};

//объявил кнопки страницы
const editProfileButton = document.querySelector('.profile__editor');
const addPicButton = document.querySelector('.profile__add-button');

//объявил аватар на старнице
const avatar = document.querySelector('.profile__avatar-edite');

//объявил окно редактирования профиля и его содержимое
const editProfilePopup = document.querySelector('.edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__forms');

//объявил окно добавления новой карточки и его содержимое
const addCardPopup = document.querySelector('.add-card');
const addCardForm = addCardPopup.querySelector('.popup__forms');

//объявил окно подверждения удаления карточки
const confirmationDeletePopup = document.querySelector('.confirmation-delete');
const confirmationDeleteForm = confirmationDeletePopup.querySelector('.popup__forms');

//объявил окно смены аватара
const changeAvatarPopup = document.querySelector('.change-avatar');
const changeAvatarForm = changeAvatarPopup.querySelector('.popup__forms');


//экземпляр - работа с сервером
const api = new Api('https://nomoreparties.co/v1/cohort-50/users/me');

//экземпляр - управлениет отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job',
  avatar: '.profile__avatar'
});

//при посещении страницы, запрос на сервер о пользователе, ставит из ответа имя и инфу "о себе"
//можно в принципе удалить класс UserInfo и в запросе ставить пользовательскую информацию
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res);
  });

//экземпляр - подтверждает удаление карточки
const popupWithButton = new PopupWithButton('.confirmation-delete', { handleFormSubmit: (cardId, cardElement) => {
  api.deleteCard(cardId);
  cardElement.remove();
}});

//экземпляр попап для просмотра фото
const popupWithImage = new PopupWithImage('.viewer');

//экземпляр - попап с формой, отправляет на сервер инфу об измении пользовательской информации и ставит новую на странице
//если класс UserInfo удалить, то также как при изначальной отрисовки имени и тд
const popupWithFormProfile = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  popupWithFormProfile.renderLoading(true);
  api.patchEditProfileInformation(inputValues)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => {
      popupWithFormProfile.renderLoading(false, 'Сохранить');
    });
}}, '.edit-profile');

//экземпляр - попап с формой, отправляет на сервер инфу об измении аватара пользователя и меняет его на странице
const popupWithFormAvatar = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  popupWithFormAvatar.renderLoading(true);
  api.patchAvatarProfile(inputValues)
    .then(res => {
      userInfo.setUserAvatar(res);
    })
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => {
      popupWithFormAvatar.renderLoading(false, 'Сохранить');
    });
}}, '.change-avatar');

//ставит слушатели на попапы
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithButton.setEventListeners();
popupWithFormAvatar.setEventListeners();

//?функция создания карточки
function createCard(cardDate, templateSelector, userInfo) {
  const newCard = new Card(cardDate, templateSelector, userInfo, { handleCardClick: () => {
    popupWithImage.open(cardDate);
  },
  putLike: (cardId, counterElement) => {
    api.putLike(cardId, counterElement)
      .then(returnedFromServerCard => {
        counterElement.textContent = returnedFromServerCard.likes.length;
      })
      .catch(err => console.log(`Ошибка ${err}`));
  },
  deleteLike: (idCard, counterElement) => {
    api.deleteLike(idCard, counterElement)
      .then(returnedFromServerCard => {
        counterElement.textContent = returnedFromServerCard.likes.length;
      })
      .catch(err => console.log(`Ошибка ${err}`));
  },
  handleTrashClick: (cardId, cardElement) => {
    popupWithButton.open();
    popupWithButton.transferCardinfo(cardId, cardElement);
  },
  });
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    const cardListSection = new Section({
      renderer: item => {
        const card = createCard(item, '.card-template_type_default', userInfo);
        cardListSection.addItem(card);
    }}, '.feed__elements');

    cardListSection.renderItems(cards.reverse());

  //экземпляр - попап с формой, который добавляет новую карточку
  const popupWithFormAddCard = new PopupWithForm({ handleFormSubmit: (inputValues) => {
    popupWithFormAddCard.renderLoading(true);
    api.postNewCard({name: inputValues.nameCard, link: inputValues.link})
      .then(res => {
        cardListSection.renderItems([res]); //массив, т.к. изначально отрисованные карточки приходят с серва в виде массива и функция ориентирована на массив
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => {
        popupWithFormAddCard.renderLoading(false, 'Создать');
      });
  }}, '.add-card');

  //слушатель на форму добавления карточки
  addPicButton.addEventListener('click', () => {
    addCardPopupValidation.disableButton();
    popupWithFormAddCard.open();
  });

  //ставит слушатели
  popupWithFormAddCard.setEventListeners();

  //экземпляр и инициализация валидации формы попапа добавления новой карточки
  //из-за области видимости внутри промиса
  const addCardPopupValidation = new FormValidator(objectForValidate, addCardForm);
  addCardPopupValidation.enableValidation();
  })
  .catch(err => console.log(`Ошибка ${err}`));

//слушатель на редактор профиля
editProfileButton.addEventListener('click', () => {
  editProfilePopupValidation.disableButton();
  popupWithFormProfile.open();
});
//слушатель на аватар
avatar.addEventListener('click', () => {
  avatarPopupValidation.disableButton();
  popupWithFormAvatar.open();
})


//экземпляры и инициализация валидации форм попапов
const editProfilePopupValidation = new FormValidator(objectForValidate, editProfileForm);
editProfilePopupValidation.enableValidation();
const confirmationDeletePopupValidation = new FormValidator(objectForValidate, confirmationDeleteForm);
confirmationDeletePopupValidation.enableValidation();
const avatarPopupValidation = new FormValidator(objectForValidate, changeAvatarForm);
avatarPopupValidation.enableValidation();
