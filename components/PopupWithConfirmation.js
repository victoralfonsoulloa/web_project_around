import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteFunction) {
    super(popupSelector);
    this._delete = deleteFunction;
    this._submitButton = this._popup.querySelector('.form__button');
  }

  open(elementId, handlerOnDelete) {
    super.open();
    this._elementId = elementId;
    this._handlerOnDelete = handlerOnDelete;
  }

  _updateButtonState(text, disabled) {
    this._submitButton.textContent = text;
    this._submitButton.disabled = disabled;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._updateButtonState('Deleting...', true);
      this._delete(this._elementId, this._handlerOnDelete)
        .then(() => {
          this.close();
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          this._updateButtonState('Delete', false);
        });
    });
  }
}