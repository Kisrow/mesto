export default class UserInfo {
  constructor(userData) {
    this._userNameElement = document.querySelector(userData.nameSelector);
    this._userInfoElement = document.querySelector(userData.infoSelector);
  }

  //собирает имя и о себе со страницы
  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    }
    return userInfo
  }
  //изменяет на странице имя и о себе на значения в массиве на входе
  setUserInfo(newUserData) {
    this._userNameElement.textContent = newUserData.name;
    this._userInfoElement.textContent = newUserData.about;
  }
}
