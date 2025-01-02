export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    this._info = {
      name: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
    };

    return this._info;
  }

  setUserInfo(name = "Victor Ulloa", userJob = "Software Engineer") {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = userJob;
  }
}

