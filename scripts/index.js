// index.js

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { toggleModal, toggleButtonState } from "../utils/utils.js";
import {
  modals,
  buttons,
  inputFields,
  bioName,
  bioDescription,
  savedName,
  savedAboutMe,
  formEdit,
  formAdd,
  cardsContainer,
  modalImage,
  modalCaption,
  initialCards,
} from "../utils/constants.js";
import Section from "../components/Section.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardHandler = new Card(
        cardItem.name,
        cardItem.link,
        "#card-template"
      );
      const cardInstance = cardHandler.generateCard();
      cardList.addItem(cardInstance);
    },
  },
  ".cards"
);

cardList.renderItems();

// Bio Modal Event Listeners
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
    "#card-template"
  );
  const formCardInstance = formCardHandler.generateCard();
  cardList.addItem(formCardInstance);
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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    toggleModal(modals.image, false);
    toggleModal(modals.edit, false);
    toggleModal(modals.add, false);
  }
});

// Configuration object for form validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button-inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});
