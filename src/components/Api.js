  export default class Api {
  constructor(config) {
    this._userToken = config.userToken;
    this._url = config.url;
  }

  _chekResponse(res) {
    if (res.ok) {
      return res.json();
    } else
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._userToken
      }
    })
    .then(this._chekResponse)  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._userToken
      }
    })
    .then(this._chekResponse)
  }

  patchEditProfileInformation(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.job
      })
    })
    .then(this._chekResponse)
  }

  //Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки
  postNewCard(inputValues) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    })
    .then(this._chekResponse)
  }

  putLike(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  deleteLike(idCard) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  //смена аватара
  patchAvatarProfile(inputValues) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputValues.link
      })
    })
    .then(this._chekResponse)
  }
}
