import Card from './Card.js';
import FormValidator from './FormValidator.js';

const objectForValidate = {
  formSelector: '.popup__forms', //контейнер с инпутами
  inputSelector: '.popup__input', //инпут
  submitButtonSelector: '.popup__button', //кнопка создать/сохранить
  inactiveButtonClass: 'popup__button_disabled',  //класс для деактивации кнопки
  inputErrorClass: 'popup__input_type_error', //красная граница инпута при ошибки
  errorClass: 'popup__input-error_visible' //показывает ошибку
};

//объявил информационные строки страницы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//объявил контейнер для карточек
const cardsContainer = document.querySelector('.feed__elements');

//объявил кнопки страницы
const editProfileButton = document.querySelector('.profile__editor');
const addPicButton = document.querySelector('.profile__add-button');

//объявил окно редактирования профиля и его содержимое
const editProfilePopup = document.querySelector('.edit-profile');
const editProfileСlosePopupButton = editProfilePopup.querySelector('.popup__exit');
const editProfileNameInput = editProfilePopup.querySelector('#name-input');
const editProfileJobInput = editProfilePopup.querySelector('#job-input');
const editProfileForm = editProfilePopup.querySelector('.popup__forms');

//объявил окно добавления новой карточки и его содержимое
const addCardPopup = document.querySelector('.add-card');
const addCardСlosePopupButton = addCardPopup.querySelector('.popup__exit');
const addCardNameInput = addCardPopup.querySelector('#nameCard-input');
const addCardLinkInput = addCardPopup.querySelector('#link-input');
const addCardForm = addCardPopup.querySelector('.popup__forms');

//объявил окно просмотра фото и его содержимое
const viewerPopup = document.querySelector('.viewer');
const viewerName = viewerPopup.querySelector('.popup__paragraph_type_viewer');
const viewerImage = viewerPopup.querySelector('.popup__image');
const viewerСlosePopupButton = viewerPopup.querySelector('.popup__exit');


//массив с данными карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/Karachayevsk.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/Elbrus_view.jpg'
  },
  {
    name: 'Ночной Домбай',
    link: './images/Dombay_Night.jpg'
  },
  {
    name: 'Карачаевск',
    link: './images/Karachayevsk_river.jpg'
  },
  {
    name: 'Домбай',
    link: './images/Dombay.jpg'
  },
  {
    name: 'Вечерний Эльбрус',
    link: './images/Elbrus_darktime.jpg'
  }
];

const handleOpenPopupViewer = (name, link) => {
  viewerName.textContent = name;
  viewerImage.src = link;
  viewerImage.alt = name;
  openPopup(viewerPopup);
}

//закрыл просмотрщик
viewerСlosePopupButton.addEventListener('click', () => {
  closePopup(viewerPopup);
  viewerName.textContent = '';
  viewerImage.src = '';
  viewerImage.alt = '';
});

//функция открытия попап
const openPopup = element => {
  element.classList.add('popup_on');
  document.addEventListener('keydown', closePopupByEsc);
};

//функция закрытия попап
const closePopup = element => {
  element.classList.remove('popup_on');
  document.removeEventListener('keydown', closePopupByEsc);
};

//функция закрытия попап через esc
const closePopupByEsc = (evt) =>{
 if (evt.key === 'Escape') {
    const openedPopupElement = document.querySelector('.popup_on');
    closePopup(openedPopupElement);
  };
};

//поиск подложек
const editProfileOverlay = document.querySelector('.edit-profile-overlay');
const addCardOverlay = document.querySelector('.add-card-overlay');
const viewerOverlay = document.querySelector('.viewer-overlay');

//закрытие попапов при клике на подложку
editProfileOverlay.addEventListener('click', () => {
  closePopup(editProfilePopup);
});
addCardOverlay.addEventListener('click', () => {
  closePopup(addCardPopup);
});
viewerOverlay.addEventListener('click', () => {
  closePopup(viewerPopup);
});

//функция смени имени и информации о себе
const handleProfileFormSubmit = () => {
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;

  closePopup(editProfilePopup);
  editProfilePopupValidation.disableButton();
};

//слушатель на редактор профиля
editProfileButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
});

//закрыл редактор профиля
editProfileСlosePopupButton.addEventListener('click', () => closePopup(editProfilePopup));

//сохранил информацию из редактора профиля
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//Функция создания карточки по классу Card
const createCard = (data, templateSelector, handleOpenPopupViewer) => {
  const newCard = new Card(data, templateSelector, handleOpenPopupViewer);
  const newCardElement = newCard.generateCard();

  return newCardElement;
}

//функция добавления карточки по клику на кнопку создать
const addNewCard = () => {
  const newCardElement = createCard({name: addCardNameInput.value, link: addCardLinkInput.value}, '.card-template_type_default', handleOpenPopupViewer);

  cardsContainer.prepend(newCardElement);
  addCardForm.reset();
  addCardPopupValidation.disableButton();
  closePopup(addCardPopup);
}

//слушатель на форму добавления карточки
addPicButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

//закрыл форму добавления карточки
addCardСlosePopupButton.addEventListener('click', () => {
  closePopup(addCardPopup);
  addCardForm.reset();
});

//добавил новую карточку
addCardForm.addEventListener('submit', addNewCard);

initialCards.forEach((item) => {
  const cardElement = createCard(item, '.card-template_type_default', handleOpenPopupViewer);

  cardsContainer.append(cardElement);
})

const addCardPopupValidation = new FormValidator(objectForValidate, addCardForm);
addCardPopupValidation.enableValidation();
const editProfilePopupValidation = new FormValidator(objectForValidate, editProfileForm);
editProfilePopupValidation.enableValidation();
