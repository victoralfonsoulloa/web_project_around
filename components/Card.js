export default class Card {
  constructor(title, imageUrl, templateSelector) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const imageElement = cardElement.querySelector(".card__image");
    cardElement.querySelector(".card__caption_title").textContent = this._title;
    imageElement.src = this._imageUrl;
    imageElement.alt = this._title;
    imageElement.setAttribute("data-caption", this._title);
    this._setEventListeners(cardElement);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    cardElement.addEventListener("click", (event) => {
      const target = event.target;
      if (target.closest(".card__caption-like_icon")) {
        const likeButtonIcon = target
          .closest(".card")
          .querySelector(".card__caption-like_icon");
        likeButtonIcon.src = likeButtonIcon.src.includes(
          "like-button_active.png"
        )
          ? "images/like-button.png"
          : "images/like-button_active.png";
      }
    });
  }

}

