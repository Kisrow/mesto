import './index.css';

import karachasevsk from '../images/Karachayevsk.jpg';
import elbrus from '../images/Elbrus_view.jpg';
import nightDombai from '../images/Dombay_Night.jpg';
import karachasevsk2 from '../images/Karachayevsk_river.jpg'
import dombai from '../images/Dombay.jpg'
import nightElbrus from '../images/Elbrus_darktime.jpg'

import Card from '../components/Card';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
// import UserInfo from '../components/UserInfo.js';
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

//элементы на странице содержащие имя и информацию пользователя
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__job');

//массив с данными карточек
// const initialCards = [
//   {
//     name: 'Карачаевск',
//     link: karachasevsk
//   },
//   {
//     name: 'Эльбрус',
//     link: elbrus
//   },
//   {
//     name: 'Ночной Домбай',
//     link: nightDombai
//   },
//   {
//     name: 'Карачаевск',
//     link: karachasevsk2
//   },
//   {
//     name: 'Домбай',
//     link: dombai
//   },
//   {
//     name: 'Вечерний Эльбрус',
//     link: nightElbrus
//   }
// ];
//экземпляр - работа с сервером
const api = new Api('https://nomoreparties.co/v1/cohort-50/users/me');

//получает имя и информацию пользователя и ставит соответствующее место на странице
api.getUserInfo()
  .then(res =>  res.json())
  .then(res => {
    userName.textContent = res.name;
    userAbout.textContent = res.about;
  });

//экземпляр - управлениет отображением информации о пользователе на странице
// const userInfo = new UserInfo({
//   nameSelector: '.profile__name',
//   infoSelector: '.profile__job'
// });

//экземпляр попап для просмотра фото
const popupWithImage = new PopupWithImage('.viewer');

//экземпляр - попап с формой, меняет имя и общую инфу
const popupWithFormProfile = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  api.patchEditProfileInformation(inputValues)
    .then(res => res.json())
    .then(res => {
      userName.textContent = res.name;
      userAbout.textContent = res.about;
    })
    .catch(err => console.log(`Ошибка ${err}`));
}}, '.edit-profile');

//экземпляр - попап с формой, который добавляет новую карточку
const popupWithFormAddCard = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  api.postNewCard({name: inputValues.nameCard, link: inputValues.link})
    .then(res => res.json())
    .then(res => {
      cardListSection.renderItems([{name: res.name, link: res.link}]);
    })
}}, '.add-card');

//ставит слушатели на попапы
popupWithFormProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithImage.setEventListeners();

//Функция создания карточки по классу Card
const createCard = (data, templateSelector) => {
  const newCard = new Card(data, templateSelector, { handleCardClick: () => {
    popupWithImage.open(data);
  }});
  const newCardElement = newCard.generateCard();

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
    cardListSection.renderItems(res.reverse());
  })

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
