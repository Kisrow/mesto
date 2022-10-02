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
const buttonEditProfile = document.querySelector('.profile__editor');
const buttonAddPic = document.querySelector('.profile__add-button');

//объявил аватар на старнице
const avatar = document.querySelector('.profile__avatar-edite');

//объявил окно редактирования профиля и его содержимое
const profileEditPopup = document.querySelector('.edit-profile');
const profileEditPopupForm = profileEditPopup.querySelector('.popup__forms');
const nameInput = profileEditPopup.querySelector('#name-input');
const jobInput = profileEditPopup.querySelector('#job-input');

//объявил окно добавления новой карточки и его содержимое
const cardAddPopup = document.querySelector('.add-card');
const cardAddPopupForm = cardAddPopup.querySelector('.popup__forms');

//объявил окно подверждения удаления карточки
const confirmationDeletePopup = document.querySelector('.confirmation-delete');
const confirmationDeleteForm = confirmationDeletePopup.querySelector('.popup__forms');

//объявил окно смены аватара
const avatarChangePopup = document.querySelector('.change-avatar');
const avatarChangePopupForm = avatarChangePopup.querySelector('.popup__forms');



//экземпляр - работа с сервером
const api = new Api({
  userToken: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
  url: 'https://nomoreparties.co/v1/cohort-50'
});

//экземпляр - управлениет отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job',
  avatar: '.profile__avatar'
});

//экземпляр - подтверждает удаление карточки
const popupWithButton = new PopupWithButton('.confirmation-delete', { handleFormSubmit: (cardId, cardElement) => {
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
function createCard(cardDate, templateSelector, userDataId) {
  const newCard = new Card(cardDate, templateSelector, userDataId, { handleCardClick: () => {
    popupWithImage.open(cardDate);
  },
  toggleLike: (cardDate) => {
    // console.log(newCard.checkIsLiked(cardDate));
    if (newCard.checkIsLiked(cardDate)) {
      api.deleteLike(cardDate._id)
        .then(res => {
          newCard.like(res, false);
        })
        .catch(err => console.log(`Ошибка ${err}`));
    } else {
      api.putLike(cardDate._id)
        .then(res => {
          newCard.like(res, true);
        })
        .catch(err => console.log(`Ошибка ${err}`));
    }
  },
  handleTrashClick: (cardId) => {
    popupWithButton.open();
    popupWithButton.submitDel(() => {
      api.deleteCard(cardId)
        .then(res => {
          newCard._removeCard();
        })
        .catch(err => console.log(`Ошибка ${err}`))
        .finally(() => {
          popupWithButton.close();
        })
    });
  },
  });
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

const cardListSection = new Section({
  renderer: (item, userDataId) => {
    const card = createCard(item, '.card-template_type_default', userDataId);
    cardListSection.addItem(card);
}}, '.feed__elements');

//экземпляр - попап с формой, который добавляет новую карточку
const popupWithFormAddCard = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  popupWithFormAddCard.renderLoading(true);
  api.postNewCard({name: inputValues.nameCard, link: inputValues.link})
    .then(res => {
      const newUserCard = createCard(res, '.card-template_type_default', res.owner._id);
      cardListSection.addUserItem(newUserCard);
    })
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => {
      popupWithFormAddCard.renderLoading(false, 'Создать');
    });
}}, '.add-card');

//слушатель на форму добавления карточки
buttonAddPic.addEventListener('click', () => {
  cardAddPopupValidation.disableButton();
  popupWithFormAddCard.open();
});

//ставит слушатели
popupWithFormAddCard.setEventListeners();

//экземпляр и инициализация валидации формы попапа добавления новой карточки
//из-за области видимости внутри промиса
const cardAddPopupValidation = new FormValidator(objectForValidate, cardAddPopupForm);
cardAddPopupValidation.enableValidation();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardListSection.renderItems(cards, userData._id);
  })
  .catch(err => console.log(`Ошибка ${err}`));

//слушатель на редактор профиля
buttonEditProfile.addEventListener('click', () => {
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.userName;
  jobInput.value = actualUserInfo.userInfo;
  profileEditPopupValidation.disableButton();
  popupWithFormProfile.open();
});

//слушатель на аватар
avatar.addEventListener('click', () => {
  avatarPopupValidation.disableButton();
  popupWithFormAvatar.open();
})


//экземпляры и инициализация валидации форм попапов
const profileEditPopupValidation = new FormValidator(objectForValidate, profileEditPopupForm);
profileEditPopupValidation.enableValidation();
const confirmationDeletePopupValidation = new FormValidator(objectForValidate, confirmationDeleteForm);
confirmationDeletePopupValidation.enableValidation();
const avatarPopupValidation = new FormValidator(objectForValidate, avatarChangePopupForm);
avatarPopupValidation.enableValidation();
