import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteFunction) {
    super(popupSelector);
    this._delete = deleteFunction;
  }

  // Abre PopUp y recibe el evt.target del elemento, para acceder a su nodo padre
  open(elementId, handlerOnDelete) {
    super.open();
    this._elementId = elementId;
    this._handlerOndelete = handlerOnDelete;
  }

  // Añade detector de eventos al botón para borrar elemento
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".form__button").addEventListener("click", () => {
      this._delete(this._elementId, this._handlerOndelete);
      this.close();
    });
  }}