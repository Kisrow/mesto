//объявил информационные строки страницы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//объявил кнопки страницы
const editProfileButton = document.querySelector('.profile__editor');
const addPicButton = document.querySelector('.profile__add-button');

//объявил контейнер для карточек
const containerCards = document.querySelector('.feed__elements');

//объявил содержимое темплейт карточки
const templateCard = document.querySelector('#feed-element').content;
const templateItem = templateCard.querySelector('.feed__element');

//объявил окно редактирования профиля и его содержимое
const editProfilePopup = document.querySelector('.edit-profile');
const editProfileСlosePopupButton = editProfilePopup.querySelector('.popup__exit');
const editProfileNameInput = editProfilePopup.querySelector('#name-input');
const editProfileJobInput = editProfilePopup.querySelector('#job-input');
const editProfileForm = editProfilePopup.querySelector(enableValidation.formSelector);

//объявил окно добавления новой карточки и его содержимое
const addCardPopup = document.querySelector('.add-card');
const addCardСlosePopupButton = addCardPopup.querySelector('.popup__exit');
const addCardNameInput = addCardPopup.querySelector('#nameCard-input');
const addCardLinkInput = addCardPopup.querySelector('#link-input');
const addCardForm = addCardPopup.querySelector(enableValidation.formSelector);

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

//функция просмотрщика
const viewer = (cardName, cardLink) => {
  openPopup(viewerPopup);
  viewerName.textContent = cardName;
  viewerImage.src = cardLink;
  viewerImage.alt = cardName;
};

//закрыл просмотрщик
viewerСlosePopupButton.addEventListener('click', () => closePopup(viewerPopup));

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

const editProfileOverlay = document.querySelector('.edit-profile-overlay');
const addCardOverlay = document.querySelector('.add-card-overlay');
const viewerOverlay = document.querySelector('.viewer-overlay');

editProfileOverlay.addEventListener('click', () => {
  closePopup(editProfilePopup);
});
addCardOverlay.addEventListener('click', () => {
  closePopup(addCardPopup);
});
viewerOverlay.addEventListener('click', () => {
  closePopup(viewerPopup);
});

//функция создания карточки
function cloneCard(cardName, cardLink) {
  //шаблон и наполнение
  const cloneTemplateCard = templateItem.cloneNode(true);

  const nameCard = cloneTemplateCard.querySelector('.feed__element-pharagraph');
  const imageCard = cloneTemplateCard.querySelector('.feed__element-photo');

  nameCard.textContent = cardName;
  imageCard.src = cardLink;
  imageCard.alt = cardName;
  //лайк
  cloneTemplateCard.querySelector('.feed__element-like').addEventListener('click', evt => evt.target.classList.toggle('feed__element-like_active'));
  //удаление по клику на мусорку
  cloneTemplateCard.querySelector('.feed__element-trash').addEventListener('click', evt => evt.target.closest('.feed__element').remove());
  //viewer
  cloneTemplateCard.querySelector('.feed__element-photo').addEventListener('click', () => viewer(cardName, cardLink));

  return cloneTemplateCard
};

//создание и отрисовка изначальных карточек
initialCards.forEach(arrItem => {
  containerCards.append(cloneCard(arrItem.name, arrItem.link));
});


//функция смени имени и информации о себе
const formSubmitHandler = (evt) => {
  evt.preventDefault();

  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;

  closePopup(editProfilePopup);
};

//слушатель на редактор профиля
editProfileButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
});

//закрыл редактор профиля
editProfileСlosePopupButton.addEventListener('click', () => closePopup(editProfilePopup));

//сохранил информацию из редактора профиля
editProfileForm.addEventListener('submit', formSubmitHandler);

//функция добавления карточки
const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = cloneCard(addCardNameInput.value, addCardLinkInput.value);
  containerCards.prepend(newCard);
  addCardForm.reset();
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
