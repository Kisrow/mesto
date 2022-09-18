export default class UserInfo {
  constructor(userData) {
    this._userNameElement = document.querySelector(userData.nameSelector);
    this._userInfoElement = document.querySelector(userData.infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    }
    return userInfo
  }

  setUserInfo(newUserData) {
    this._userNameElement.textContent = newUserData.userName;
    this._userInfoElement.textContent = newUserData.userInfo;
  }
}
