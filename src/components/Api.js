  export default class Api {
  constructor(url) {
    this._url = url;
  }

  getUserInfo() {
    return fetch(this._url, {
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d'
      }
    });
  }

  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d'
      }
    });
  }

  patchEditProfileInformation(inputValues) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.job
      })
    });
  }

  //Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки
  postNewCard(inputValues) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
      method: 'POST',
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    });
  }

  putLike(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
        'Content-Type': 'application/json'
      }
    })
  }

  deleteLike(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
        'Content-Type': 'application/json'
      }
    })
  }
}
