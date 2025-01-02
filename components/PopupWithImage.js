// PopupWithImage.js

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(imageSrc, caption) {
    const imageElement = this._popup.querySelector('.popup-picture');
    const captionElement = this._popup.querySelector('.popup-caption');
    imageElement.src = imageSrc;
    imageElement.alt = caption;
    captionElement.textContent = caption;
    super.open();
  }
}