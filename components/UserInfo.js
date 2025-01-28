export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
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

  setUserId(userId) {
    this._userId = userId;
  }

  setUserAvatar(userAvatar) {
    this._userAvatarElement.src  = userAvatar;
  }
}

