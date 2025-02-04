import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _updateButtonState(text, disabled) {
    this._submitButton.textContent = text;
    this._submitButton.disabled = disabled;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._updateButtonState('Saving...', true);
      this._handleFormSubmit(this._getInputValues())
        .finally(() => {
          this._updateButtonState('Save', false);
          this.close();
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

