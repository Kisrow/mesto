// // объявил переменные
// const editProfileButton = document.querySelector('.profile__editor'); //кнопка редактирования профиля
// const addPicButton = document.querySelector('.profile__add-button'); //кнопка добавления картинки
// const profileName = document.querySelector('.profile__name'); //строка с фИО пользователя
// const profileJob = document.querySelector('.profile__job'); //строка с инфой о пользователе

// // записал содержимое template карточки в переменную, нашел элемент, куда отрисовываются клоны
// const feed__elementTemplate = document.querySelector('#feed__element').content;
// const feed__elements = document.querySelector('.feed__elements');

// // записал содержимое template popup в переменную, нашел элемент, куда отрисовываются клоны
// const popupTemplate = document.querySelector('#popup').content;
// const page = document.querySelector('.page');

// const photoViewer = document.querySelector('feed__element-viewer');

// //функция изменения ФИО
// const formSubmitHandler = (evt) => {
//   evt.preventDefault();

//   profileName.textContent =  popup.querySelector('#name').value;
//   profileJob.textContent =  popup.querySelector('#job').value;

//   popup.classList.remove('popup_on');
// // сбросил значения введенные во всплывающее окно
//   popup.querySelector('#name').value = '';
//   popup.querySelector('#job').value = '';
// };

// //попап редактирование профиля
// editProfileButton.addEventListener('click', () => {
//   const popup = popupTemplate.querySelector('.popup').cloneNode(true);
//   popup.querySelector('.popup__paragraph').textContent = 'Редактировать профиль';
//   popup.querySelector('#name').placeholder = 'ФИО';
//   popup.querySelector('#job').placeholder = 'О себе';
//   page.append(popup);
//   popup.classList.add('popup_on');
//   const closePopupButton = popup.querySelector('.popup__exit');
//   closePopupButton.addEventListener('click', () => popup.classList.remove('popup_on'));
//   const popupSaveButton = popup.querySelector('.popup__save');
//   popupSaveButton.addEventListener('submit', formSubmitHandler);
// });

// //попап вставки фото
// addPicButton.addEventListener('click', () => {
//   const popup = popupTemplate.querySelector('.popup').cloneNode(true);
//   popup.querySelector('.popup__paragraph').textContent = 'Новое место';
//   page.append(popup);
//   popup.classList.add('popup_on');
//   const closePopupButton = popup.querySelector('.popup__exit');
//   closePopupButton.addEventListener('click', () => popup.classList.remove('popup_on'));
// });





// // объявил массив с наполнением для карточек для секции feed
// const initialCards = [
//   {
//     name: 'Карачаевск',
//     link: './images/Karachayevsk.jpg'
//   },
//   {
//     name: 'Эльбрус',
//     link: './images/Elbrus_view.jpg'
//   },
//   {
//     name: 'Ночной Домбай',
//     link: './images/Dombay_Night.jpg'
//   },
//   {
//     name: 'Карачаевск',
//     link: './images/Karachayevsk_river.jpg'
//   },
//   {
//     name: 'Домбай',
//     link: './images/Dombay.jpg'
//   },
//   {
//     name: 'Вечерний Эльбрус',
//     link: './images/Elbrus_darktime.jpg'
//   },
// ];

// //функция клонирования карточки с отрисовкой в начало ленты
// const cloneCard = card => {
// // клонировал содержимое тега template карточки
//   const feed__element = feed__elementTemplate.querySelector('.feed__element').cloneNode(true);

// // наполнил содержимое карточек
//   feed__element.querySelector('.feed__element-pharagraph').textContent = card.name;
//   feed__element.querySelector('.feed__element-photo').src = card.link;
//   feed__element.querySelector('.feed__element-photo').alt = card.name;

// // отрисовал карточки
//   feed__elements.prepend(feed__element); //для краткости кода заменил append на prepend

// //в каждой карточке нашел их собственную лайк-кнопку
//   const likeButton = feed__element.querySelector('.feed__element-like');

// // нажал на лайк - поменял цвет лайка
//   likeButton.addEventListener('click', () => likeButton.classList.toggle('feed__element-like_active'));

// // в каждой карточке нашел их собственную мусорку
//  const trashButton = feed__element.querySelector('.feed__element-trash');

// // нажал на мусорку - удалил карточку
//   trashButton.addEventListener('click', () => trashButton.closest('.feed__element').remove());
// }
// // // просмотр фото
// // //!   feed__element.addEventListener('click', () => {
// // //!     formElement[2].remove();
// // //!     popups[2].querySelector('.popup__container').classList.add('popup__viewer');
// // //!     const viewerImage = document.createElement('img');
// // //!     viewerImage.src = card.link;
// // //!     viewerImage.classList.add('popup__viewer-image');
// // //!     popups[2].querySelector('.popup__container').prepend(viewerImage);
// // //!     popups[2].querySelector('.popup__paragraph').classList.add('popup__viewer-paragraph');
// // //!     openPopup(2);
// // //!   });
// // //! }

// initialCards.forEach ((card) => { // обход массива с отрисовкой 6 карточек на странице
//   cloneCard(card);
// });

// // //функция добавления карточки в начало ленты
// // const addPic = (evt) => {
// //   evt.preventDefault();

// //   initialCards.unshift(
// //   {
// //     name: inputs[2].value,
// //     link: inputs[3].value
// //   });

// //   cloneCard(initialCards[0]);

// //   closePopup(1);

// // // сбросил значения введенные во всплывающее окно
// //   inputs[2].value = '';
// //   inputs[3].value = '';
// // };

// // // //открыл всплывающее окно редактирования ФИО профиля
// // // .addEventListener('click', () => {
// // //   openPopueditProfileButtonp(0);
// // //   formElement[0].addEventListener('submit', formSubmitHandler);
// // //   });

// // // //открыл всплывающее окно добавления карточки
// // // addPicButton.addEventListener('click', () => {
// // //   openPopup(1);
// // //   formElement[1].addEventListener('submit', addPic);
// // //   })
