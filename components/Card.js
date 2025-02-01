export default class Card {
  constructor(title, imageUrl, templateSelector, handleCardClick, handleCardDelete, isLiked) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // Passed function for opening the popup
    this._handleCardDelete = handleCardDelete;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    const imageElement = this._cardElement.querySelector(".card__image");
    this._cardElement.querySelector(".card__caption_title").textContent = this._title;
    imageElement.src = this._imageUrl;
    imageElement.alt = this._title;
    this._setEventListeners(this._cardElement, imageElement);
    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
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
      this._handleCardDelete();
    });
  }
}
