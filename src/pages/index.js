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
import UserInfo from '../components/UserInfo.js';

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


//массив с данными карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: karachasevsk
  },
  {
    name: 'Эльбрус',
    link: elbrus
  },
  {
    name: 'Ночной Домбай',
    link: nightDombai
  },
  {
    name: 'Карачаевск',
    link: karachasevsk2
  },
  {
    name: 'Домбай',
    link: dombai
  },
  {
    name: 'Вечерний Эльбрус',
    link: nightElbrus
  }
];

//экземпляр - управлениет отображением информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
});

//экземпляр попап для просмотра фото
const popupWithImage = new PopupWithImage('.viewer');

//экземпляр - попап с формой, меняет имя и общую инфу
const popupWithFormProfile = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  userInfo.setUserInfo({
    userName: inputValues.name,
    userInfo: inputValues.job
  })
}}, '.edit-profile');

//экземпляр - попап с формой, который добавляет новую карточку
const popupWithFormAddCard = new PopupWithForm({ handleFormSubmit: (inputValues) => {
  const newCardElement = createCard({name: inputValues.nameCard, link: inputValues.link}, '.card-template_type_default');
  cardListSection.addItem(newCardElement);
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

//добавил исходные карточки
const cardListSection = new Section({
  items: initialCards,
  renderer: item => {
    const card = createCard(item, '.card-template_type_default');
    cardListSection.addItem(card)
  }
},'.feed__elements');

cardListSection.renderItems();

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


const addCardPopupValidation = new FormValidator(objectForValidate, addCardForm);
addCardPopupValidation.enableValidation();
const editProfilePopupValidation = new FormValidator(objectForValidate, editProfileForm);
editProfilePopupValidation.enableValidation();
