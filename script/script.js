let popup = document.querySelector('.popup');
let popupOn = document.querySelector('.profile__editor');
let popupOff = popup.querySelector('.popup__exit');
let formElement = popup.querySelector('.popup__forms');
let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#job');
let names = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

function openOrClosePopup () {
  popup.classList.toggle('popup_on');
  nameInput.value = names.textContent;
  jobInput.value = job.textContent;
}
function formSubmitHandler (evt) {
  evt.preventDefault();

  names.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popup.classList.remove('popup_on');
}

popupOn.addEventListener('click', openOrClosePopup);
popupOff.addEventListener('click', openOrClosePopup);
formElement.addEventListener('submit', formSubmitHandler);
