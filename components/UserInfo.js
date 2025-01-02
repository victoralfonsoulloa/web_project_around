export default class UserInfo {
  constructor({userName, userJob}) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    this._info = {

    };

    return this._info;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;

  }
}