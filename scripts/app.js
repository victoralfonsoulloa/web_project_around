// Modal Elements
const modals = {
  popup: document.querySelectorAll(".popup"),
  popupContainer: document.querySelectorAll(".popup__container"),
  edit: document.querySelector("#popup--edit"),
  form: document.querySelectorAll(".form"),
  add: document.querySelector("#popup-add"),
  imageContainer: document.querySelector(
    ".popup__container-image"
  ),
  image: document.querySelector("#popup_img"),
};

// Button Elements
const buttons = {
  openEdit: document.querySelector("#popup__button--open"),
  closeEdit: document.querySelector("#popup__button--close"),
  closeAdd: document.querySelector("#popup__button--close-add"),
  save: document.querySelector(".form__button--save"),
  create: document.querySelector("#popup__button--create"),
  closeImage: document.querySelector("#popup__button--close-img"),
};

// Input Fields
const inputFields = {
  name: document.querySelector("#name"),
  aboutMe: document.querySelector("#aboutMe"),
  title: document.querySelector("#title"),
  image: document.querySelector("#imageUrl"),
};

// Profile Elements
let bioName = "Victor Alfonso"; // Default Name
let bioDescription = "Software Engineer"; // Default Bio

// Elements to display the saved data
const savedName = document.querySelector(".profile__bio_name");
const savedAboutMe = document.querySelector(".profile__bio_description");

// Forms
const formEdit = document.querySelector(".form--edit");
const formAdd = document.querySelector(".form--add");

// Cards Container
const cardsContainer = document.querySelector(".cards");

// Modal Image Elements
const modalImage = modals.image.querySelector(
  ".popup-picture"
);
const modalCaption = modals.image.querySelector(
  ".popup-caption"
);

// Initial Cards Data
const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];

// Utility Functions
function toggleModal(modal, isOpen) {
  modal.classList.toggle("popup--show", isOpen);
}

function toggleButtonState(button, fields) {
  const isDisabled = fields.some((field) => field.value === "");
  button.disabled = isDisabled;
}

// Card Management
class Card {
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

  _generateCard() {
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

  addCard() {
    const cardInstance = this._generateCard(title, imageUrl);
    cardsContainer.prepend(cardInstance);
  }
}

// Populate Initial Cards
initialCards.forEach((item) => {
  const cardHandler = new Card(item.name, item.link, "#card-template");
  cardHandler.addCard();
});

// Profile Bio Modal Event Listeners

modals.popup.forEach((container) => {
  container.addEventListener("click", () => {
    toggleModal(modals.edit, false);
    toggleModal(modals.add, false);
    toggleModal(modals.image, false);
  });
});

modals.popupContainer.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  });
});

modals.imageContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
});

buttons.openEdit.addEventListener("click", () => {
  // When opening the modal, fill inputs with the last saved values
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
  toggleModal(modals.edit, true);
});

buttons.closeEdit.addEventListener("click", (event) => {
  event.preventDefault();
  // Reset the input fields to the last saved values
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
  toggleModal(modals.edit, false);
});

buttons.closeAdd.addEventListener("click", () => {
  // Close modal without saving
  toggleModal(modals.add, false);
});

// Form Submission Handlers
formEdit.addEventListener("submit", (event) => {
  event.preventDefault();

  // Update the name and bio only when the user clicks Save
  bioName = inputFields.name.value;
  bioDescription = inputFields.aboutMe.value;

  // Update the displayed profile data
  savedName.textContent = bioName;
  savedAboutMe.textContent = bioDescription;

  // Close the modal after saving
  toggleModal(modals.edit, false);
});

// Form Validation for disabling save button if fields are empty
[inputFields.name, inputFields.aboutMe].forEach((field) => {
  field.addEventListener("input", () => {
    toggleButtonState(buttons.save, [inputFields.name, inputFields.aboutMe]);
  });
});

// Add Card Modal Event Listener
document.querySelector(".profile__bio_add").addEventListener("click", () => {
  toggleModal(modals.add, true);
  inputFields.title.value = "";
  inputFields.image.value = "";
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
});

// Add event listeners for title and image fields to enable/disable the create button
[inputFields.title, inputFields.image].forEach((field) => {
  field.addEventListener("input", () => {
    toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
  });
});

// Form Submission Handlers
formAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  formCardHandler = new Card(
    inputFields.title.value,
    inputFields.image.value,
    "#card-template"
  );
  formCardHandler.addCard();
  toggleModal(modals.add, false);
});

// Handle Card Click Events
cardsContainer.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("card__image")) {
    // Show image modal
    modalImage.src = target.src;
    modalCaption.textContent = target.getAttribute("data-caption");
    toggleModal(modals.image, true);
  }

  if (target.closest(".card__delete-image")) {
    target.closest(".card").remove();
  }
});

// Image Modal Close Button Event Listener
buttons.closeImage.addEventListener("click", () =>
  toggleModal(modals.image, false)
);

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }

  // Private method: Show input error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Private method: Hide input error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // Private method: Check input validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Private method: Check if any input is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method: Toggle button state
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Private method: Set event listeners for inputs
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  // Public method: Enable validation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent form submission
    });
    this._setEventListeners();
  }
}

// Configuration object
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button-inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
};

// Select all forms and apply validation
const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});