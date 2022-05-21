//объявил информационные строки страницы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//объявил кнопки страницы
const editProfileButton = document.querySelector('.profile__editor');
const addPicButton = document.querySelector('.profile__add-button');

//объявил контейнер для карточек
const containerCards = document.querySelector('.feed__elements');

//объявил содержимое темплейт карточки
const templateCard = document.querySelector('#feed__element').content;

//объявил окно редактирования профиля и его содержимое
const editProfilePopup = document.querySelector('.edit-profile');
const editProfileСlosePopupButton = editProfilePopup.querySelector('.popup__exit');
const editProfileSaveButton = editProfilePopup.querySelector('.popup__save');
const editProfileNameInput = editProfilePopup.querySelector('#name');
const editProfileJobInput = editProfilePopup.querySelector('#job');

//объявил окно добавления новой карточки и его содержимое
const addCardPopup = document.querySelector('.add-card');
const addCardСlosePopupButton = addCardPopup.querySelector('.popup__exit');
const addCardSaveButton = addCardPopup.querySelector('.popup__save');
const addCardNameInput = addCardPopup.querySelector('#name');
const addCardLinkInput = addCardPopup.querySelector('#link');

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
  },
];

//функция просмотрщика
const viewer = (card) => {
  openPopup(viewerPopup);
  viewerName.textContent = card.name;
  viewerImage.src = card.link;
  viewerImage.alt = card.name;
  viewerСlosePopupButton.addEventListener('click', () => closePopup(viewerPopup));
}

//функция открытия попап
const openPopup = element => {
  element.classList.add('popup_on');
}

//функция закрытия попап
const closePopup = element => {
  element.classList.remove('popup_on');
}

//функция отрисовки карточек
const cloneCard = card => {
  const cloneTemplateCard = templateCard.cloneNode(true);

  cloneTemplateCard.querySelector('.feed__element-like').addEventListener('click', evt => evt.target.classList.toggle('feed__element-like_active'));
  cloneTemplateCard.querySelector('.feed__element-trash').addEventListener('click', evt => evt.target.closest('.feed__element').remove());
  cloneTemplateCard.querySelector('.feed__element-photo').addEventListener('click', () => viewer(card));
  cloneTemplateCard.querySelector('.feed__element-pharagraph').textContent = card.name;
  cloneTemplateCard.querySelector('.feed__element-photo').src = card.link;
  cloneTemplateCard.querySelector('.feed__element-photo').alt = card.name;

  containerCards.prepend(cloneTemplateCard);
}

initialCards.forEach(card => cloneCard(card));

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
  editProfileСlosePopupButton.addEventListener('click', () => closePopup(editProfilePopup));
  editProfileSaveButton.addEventListener('click', formSubmitHandler); //? почему evt.preventDefault(); не останавливает отправку формы, если вместо click поставить submit
});

//функция добавления карточки
const addNewCard = (evt) => {
  evt.preventDefault();

  initialCards.unshift(
    {
      name: addCardNameInput.value,
      link: addCardLinkInput.value
    });
  cloneCard(initialCards[0]);
  addCardNameInput.value = '';
  addCardLinkInput.value= '';
  closePopup(addCardPopup);
}

//слушатель на форму добавления карточки
addPicButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  addCardСlosePopupButton.addEventListener('click', () => closePopup(addCardPopup));
  addCardSaveButton.addEventListener('click', addNewCard);
});
