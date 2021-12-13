// объявил переменные
let popup = document.querySelector('.popup');
let popupOn = document.querySelector('.profile__editor');
let popupOff = popup.querySelector('.popup__exit');
let formElement = popup.querySelector('.popup__forms');
let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#job');
let names = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

// открыл модальное окно, текст. значения из профиля перенеслись в модальное окно
function openPopup () {
  popup.classList.add('popup_on');
  nameInput.value = names.textContent;
  jobInput.value = job.textContent;
}
// закрыл модальное окно
function closePopup () {
  popup.classList.remove('popup_on');
}
// нажал кнопку сохранить, текст ушел из форм в профиль
function formSubmitHandler (evt) {
  evt.preventDefault();

  names.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup();
}
// вызвал функции
popupOn.addEventListener('click', openPopup);
popupOff.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
