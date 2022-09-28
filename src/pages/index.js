import './index.css';

import Card from '../components/Card';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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

//объявил окно редактирования профиля и его содержимое
const editProfilePopup = document.querySelector('.edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__forms');

//объявил окно добавления новой карточки и его содержимое
const addCardPopup = document.querySelector('.add-card');
const addCardForm = addCardPopup.querySelector('.popup__forms');

//экземпляр - работа с сервером
const api = new Api('https://nomoreparties.co/v1/cohort-50/users/me');

//экземпляр - управлениет отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
});

//при посещении страницы, запрос на сервер о пользователе, ставит из ответа имя и инфу "о себе"
//можно в принципе удалить класс UserInfo и в запросе ставить пользовательскую информацию
api.getUserInfo()
  .then(res =>  res.json())
  .then(res => {
    userInfo.setUserInfo(res);
  });

//экземпляр попап для просмотра фото
const popupWithImage = new PopupWithImage('.viewer');

//экземпляр - попап с формой, отправляет на сервер инфу об измении пользовательской информации и ставит новую на странице
//если класс UserInfo удалить, то также как при изначальной отрисовки имени и тд
const popupWithFormProfile = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  api.patchEditProfileInformation(inputValues)
    .then(res => res.json())
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => console.log(`Ошибка ${err}`));
}}, '.edit-profile');

//экземпляр - попап с формой, который добавляет новую карточку
const popupWithFormAddCard = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  api.postNewCard({name: inputValues.nameCard, link: inputValues.link})
    .then(res => res.json())
    .then(res => {
      console.log(res);
      cardListSection.renderItems([res]); //массив, т.к. изначально отрисованные карточки приходят с серва в виде массива и функция ориентирована на массив
    })
    .catch(err => console.log(`Ошибка ${err}`));
}}, '.add-card');

//ставит слушатели на попапы
popupWithFormProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithImage.setEventListeners();

//Функция создания карточки по классу Card
const createCard = (data, templateSelector) => {
  const newCard = new Card(data, templateSelector, { handleCardClick: () => {
    popupWithImage.open(data);
  },
  putLike: (idCard, counter) => {
    api.putLike(idCard, counter)
      .then(res => res.json())
      .then(res => {
        counter.textContent = res.likes.length;
      })
  },
  deleteLike: (idCard, counter) => {
    api.deleteLike(idCard, counter)
      .then(res => res.json())
      .then(res => {
        counter.textContent = res.likes.length;
      })
  },
});
  const newCardElement = newCard.generateCard({likeStatus: (likeButton, userslike) => {
    api.getUserInfo()
      .then(res => res.json())
      .then(res => {
        let status = userslike.some(item => {
          return  item._id === res._id;
        })
        if (status) {
          likeButton.classList.add('feed__element-like_active')
        }
      })
  }});

  return newCardElement;
}

//экземпляр - отвечает за отрисовку
const cardListSection = new Section({
  renderer: item => {
    const card = createCard(item, '.card-template_type_default');
    cardListSection.addItem(card)
  }
},'.feed__elements');

//добавил исходные карточки с сервера
api.getCards()
  .then(res => res.json())
  .then(res => {
    console.log(res);
    cardListSection.renderItems(res.reverse());
    })
  .catch(err => console.log(`Ошибка ${err}`));

//слушатель на форму добавления карточки
addPicButton.addEventListener('click', () => {
  addCardPopupValidation.disableButton();
  popupWithFormAddCard.open();
});

//слушатель на редактор профиля
editProfileButton.addEventListener('click', () => {
  editProfilePopupValidation.disableButton();
  popupWithFormProfile.open();
});

//экземпляры и инициализация валидации форм попапов
const addCardPopupValidation = new FormValidator(objectForValidate, addCardForm);
addCardPopupValidation.enableValidation();
const editProfilePopupValidation = new FormValidator(objectForValidate, editProfileForm);
editProfilePopupValidation.enableValidation();
