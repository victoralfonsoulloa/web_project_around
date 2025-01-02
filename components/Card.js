export default class Card {
  constructor(title, imageUrl, templateSelector, handleCardClick) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // Passed function for opening the popup
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
    this._setEventListeners(cardElement, imageElement);
    return cardElement;
  }

  _setEventListeners(cardElement, imageElement) {
    // Open the popup when the image is clicked
    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._imageUrl, this._title);
    });

    // Toggle like button state
    const likeButton = cardElement.querySelector(".card__caption-like_icon");
    likeButton.addEventListener("click", () => {
      likeButton.src = likeButton.src.includes("like-button_active.png")
        ? "images/like-button.png"
        : "images/like-button_active.png";
    });

    // Handle card deletion
    const deleteButton = cardElement.querySelector(".card__delete-image");
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }
}
