// index.js

import Card from './card.js';
import FormValidator from './FormValidator.js';
import { toggleModal, toggleButtonState } from './utils.js';

// Modal Elements
const modals = {
  popup: document.querySelectorAll(".popup"),
  popupContainer: document.querySelectorAll(".popup__container"),
  edit: document.querySelector("#popup--edit"),
  form: document.querySelectorAll(".form"),
  add: document.querySelector("#popup-add"),
  imageContainer: document.querySelector(".popup__container-image"),
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
const modalImage = modals.image.querySelector(".popup-picture");
const modalCaption = modals.image.querySelector(".popup-caption");

// Initial Cards Data
const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];

// Populate Initial Cards
initialCards.forEach((item) => {
  const cardHandler = new Card(item.name, item.link, "#card-template", cardsContainer);
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
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
  toggleModal(modals.edit, true);
});

buttons.closeEdit.addEventListener("click", (event) => {
  event.preventDefault();
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
  toggleModal(modals.edit, false);
});

buttons.closeAdd.addEventListener("click", () => {
  toggleModal(modals.add, false);
});

formEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  bioName = inputFields.name.value;
  bioDescription = inputFields.aboutMe.value;
  savedName.textContent = bioName;
  savedAboutMe.textContent = bioDescription;
  toggleModal(modals.edit, false);
});

[inputFields.name, inputFields.aboutMe].forEach((field) => {
  field.addEventListener("input", () => {
    toggleButtonState(buttons.save, [inputFields.name, inputFields.aboutMe]);
  });
});

document.querySelector(".profile__bio_add").addEventListener("click", () => {
  toggleModal(modals.add, true);
  inputFields.title.value = "";
  inputFields.image.value = "";
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
});

[inputFields.title, inputFields.image].forEach((field) => {
  field.addEventListener("input", () => {
    toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
  });
});

formAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const formCardHandler = new Card(
    inputFields.title.value,
    inputFields.image.value,
    "#card-template",
    cardsContainer
  );
  formCardHandler.addCard();
  toggleModal(modals.add, false);
});

cardsContainer.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("card__image")) {
    modalImage.src = target.src;
    modalCaption.textContent = target.getAttribute("data-caption");
    toggleModal(modals.image, true);
  }

  if (target.closest(".card__delete-image")) {
    target.closest(".card").remove();
  }
});

buttons.closeImage.addEventListener("click", () => {
  toggleModal(modals.image, false);
});

// Configuration object for form validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button-inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
};

const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});
