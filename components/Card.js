export default class Card {
  constructor(title, imageUrl, templateSelector, handleCardClick, handleCardDelete, handleLikeToggle, isLiked, cardId) {
    this._title = title;
    this._imageUrl = imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeToggle = handleLikeToggle;
    this._isLiked = isLiked;
    this._cardId = cardId;
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
    this._updateLikeButton();
    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
  }

  _updateLikeButton() {
    const likeButton = this._cardElement.querySelector(".card__caption-like_icon");
    likeButton.src = this._isLiked
      ? "../images/like-button_active.png"
      : "../images/like-button.png";
  }

  _setEventListeners(cardElement, imageElement) {
    // Open the popup when the image is clicked
    imageElement.addEventListener("click", () => {
      this._handleCardClick(this._imageUrl, this._title);
    });

    // Toggle like button state
    const likeButton = cardElement.querySelector(".card__caption-like_icon");
    likeButton.addEventListener("click", () => {
      this._handleLikeToggle(this._cardId, this._isLiked)
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;
          this._updateLikeButton();
        })
        .catch((err) => console.error(err));
    });

    // Handle card deletion
    const deleteButton = cardElement.querySelector(".card__delete-image");
    deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }
}
